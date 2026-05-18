import { serve } from "bun";
import { Database } from "bun:sqlite";
import { SignJWT, jwtVerify } from "jose";
import index from "./index.html";

// Initialisation de la base de données SQLite
const db = new Database("data.db");

// Configuration du secret JWT et du mot de passe administrateur à partir des variables d'environnement
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

/**
 * Vérifie la validité du jeton JWT présent dans les en-têtes de la requête.
 * @param req La requête entrante
 * @returns Le contenu du jeton si valide, sinon null
 */
async function verifyToken(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Démarrage du serveur Bun
const server = serve({
    routes: {
        // Sert le fichier index.html pour toutes les routes qui ne correspondent pas à l'API.
        // Cela permet à React Router de gérer la navigation côté client.
        "/*": index,

        // Point de terminaison pour récupérer ou ajouter des écoles
        "/api/schools": {
            async GET(req) {
                // Récupère toutes les écoles de la base de données
                const schools = db.query("SELECT * FROM schools").all();
                return Response.json(schools);
            },
            async POST(req) {
                // Vérifie que l'utilisateur est authentifié pour ajouter une école
                const payload = await verifyToken(req);
                if (!payload) {
                    return new Response(JSON.stringify({ error: "Non autorisé" }), { 
                        status: 401, 
                        headers: { "Content-Type": "application/json" } 
                    });
                }

                try {
                    const body = await req.json();
                    const { name, url, latitude, longitude, popup } = body;
                    
                    // Validation des champs obligatoires
                    if (!name || !url || latitude === undefined || longitude === undefined) {
                        return new Response(JSON.stringify({ error: "Champs requis manquants" }), { 
                            status: 400,
                            headers: { "Content-Type": "application/json" }
                        });
                    }

                    // Génération d'un identifiant unique basé sur le nom
                    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    
                    // Insertion dans la base de données
                    db.run(
                        "INSERT INTO schools (id, name, url, latitude, longitude, popup) VALUES (?, ?, ?, ?, ?, ?)",
                        [id, name, url, latitude, longitude, popup || name]
                    );

                    return Response.json({ success: true, id });
                } catch (e) {
                    console.error(e);
                    return new Response(JSON.stringify({ error: "Échec de l'ajout de l'école" }), { 
                        status: 500,
                        headers: { "Content-Type": "application/json" }
                    });
                }
            }
        },

        // Point de terminaison pour l'authentification administrateur
        "/api/login": {
            async POST(req) {
                try {
                    const { password } = await req.json();
                    // Vérifie si le mot de passe correspond au mot de passe admin configuré
                    if (password === ADMIN_PASSWORD) {
                        // Génère un jeton JWT valable 2 heures
                        const token = await new SignJWT({ role: "admin" })
                            .setProtectedHeader({ alg: "HS256" })
                            .setIssuedAt()
                            .setExpirationTime("2h")
                            .sign(JWT_SECRET);
                        return Response.json({ token });
                    }
                    return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), { 
                        status: 401,
                        headers: { "Content-Type": "application/json" }
                    });
                } catch (e) {
                    console.error(e)
                    return new Response(JSON.stringify({ error: "Échec de la connexion" }), { 
                        status: 500,
                        headers: { "Content-Type": "application/json" }
                    });
                }
            }
        }
    },

    // Configuration du rechargement à chaud (HMR) en mode développement
    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },
});

console.log(`🚀 Serveur lancé sur ${server.url}`);
