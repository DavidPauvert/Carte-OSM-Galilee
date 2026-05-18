import React, { useState, useEffect } from "react";

// Structure de données pour une école
interface School {
    id: string;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
    popup: string;
}

/**
 * Composant affichant la liste des écoles avec des fonctionnalités de recherche
 * et une interface d'administration pour ajouter de nouvelles écoles.
 */
export const Schools: React.FC = () => {
    // États pour les données et la recherche
    const [schools, setSchools] = useState<School[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // États pour l'authentification administrateur
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(false);
    
    // États pour le formulaire de ajout d'école
    const [newName, setNewName] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newLat, setNewLat] = useState("");
    const [newLng, setNewLng] = useState("");
    const [newPopup, setNewPopup] = useState("");
    const [message, setMessage] = useState("");

    /**
     * Récupère la liste des écoles depuis l'API backend.
     */
    const fetchSchools = () => {
        fetch("/api/schools")
            .then((res) => res.json())
            .then((data) => setSchools(data))
            .catch((err) => console.error("Erreur lors de la récupération des écoles :", err));
    };

    // Initialisation : chargement des écoles et vérification du jeton admin existant
    useEffect(() => {
        fetchSchools();
        const savedToken = localStorage.getItem("admin_token");
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);

    /**
     * Gère la connexion de l'administrateur.
     */
    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.token) {
                setToken(data.token);
                setIsLoggedIn(true);
                // Sauvegarde du jeton pour rester connecté après rafraîchissement
                localStorage.setItem("admin_token", data.token);
                setShowLoginForm(false);
                setMessage("");
            } else {
                setMessage("Mot de passe incorrect");
            }
        } catch (err) {
            console.error(err);
            setMessage("Erreur de connexion");
        }
    };

    /**
     * Déconnecte l'administrateur.
     */
    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken("");
        localStorage.removeItem("admin_token");
    };

    /**
     * Envoie les données d'une nouvelle école au serveur.
     */
    const handleAddSchool = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newName,
                    url: newUrl,
                    latitude: Number.parseFloat(newLat),
                    longitude: Number.parseFloat(newLng),
                    popup: newPopup || newName
                }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage("École ajoutée avec succès !");
                // Réinitialisation du formulaire
                setNewName("");
                setNewUrl("");
                setNewLat("");
                setNewLng("");
                setNewPopup("");
                // Rafraîchissement de la liste
                fetchSchools();
            } else {
                setMessage("Erreur : " + data.error);
            }
        } catch (err) {
            console.error(err)
            setMessage("Erreur lors de l'ajout");
        }
    };

    // Filtrage des écoles en fonction du terme de recherche
    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div>
            {/* En-tête avec titre et barre de recherche */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold">Liste Des Écoles</h2>
                
                <div className="flex items-center gap-4">
                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher une école..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#499BF1] outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                            Déconnexion
                        </button>
                    ) : (
                        <button 
                            onClick={() => setShowLoginForm(!showLoginForm)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Admin
                        </button>
                    )}
                </div>
            </div>

            {/* Formulaire de connexion administrateur (conditionnel) */}
            {showLoginForm && !isLoggedIn && (
                <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Connexion Administrateur</h3>
                    <form onSubmit={handleLogin} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="px-4 py-2 border border-gray-300 rounded-lg flex-1 outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="px-6 py-2 bg-[#499BF1] text-white rounded-lg hover:bg-[#1A66B7] transition-colors">
                            Se connecter
                        </button>
                    </form>
                    {message && <p className="mt-2 text-red-500 text-sm">{message}</p>}
                </div>
            )}

            {/* Formulaire d'ajout d'école pour l'admin (conditionnel) */}
            {isLoggedIn && (
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Ajouter une École</h3>
                    <form onSubmit={handleAddSchool} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Nom de l'école"
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <input
                            type="url"
                            placeholder="URL du site"
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Latitude (ex: 47.4)"
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={newLat}
                            onChange={(e) => setNewLat(e.target.value)}
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Longitude (ex: -0.5)"
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={newLng}
                            onChange={(e) => setNewLng(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Texte du popup (optionnel)"
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#499BF1]"
                            value={newPopup}
                            onChange={(e) => setNewPopup(e.target.value)}
                        />
                        <button type="submit" className="px-6 py-2 bg-[#499BF1] text-white rounded-lg hover:bg-[#1A66B7] transition-colors">
                            Ajouter
                        </button>
                    </form>
                    {message && <p className={`mt-4 text-sm ${message.includes("succès") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
                </div>
            )}

            {/* Affichage de la grille d'écoles */}
            {filteredSchools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchools.map((school) => (
                        <a
                            key={school.id}
                            href={school.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-[#499BF1] transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#1A66B7] transition-colors duration-300">
                                    {school.name}
                                </h3>
                            </div>
                            <div className="mt-4 text-[#499BF1] text-sm font-medium flex items-center gap-1 group-hover:underline">
                                Visiter le site
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    Aucune école ne correspond à votre recherche.
                </div>
            )}
        </div>
    );
};
