import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction pour les icônes de marqueurs par défaut dans Leaflet avec React
// Ces imports sont nécessaires car les chemins relatifs des images sont souvent cassés lors du bundling
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Définition de la structure de données pour une école
interface School {
    id: string;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
    popup: string;
}

/**
 * Page d'accueil affichant la carte interactive avec les écoles.
 */
export const Home: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);
    // Coordonnées de centrage de la carte (environ au milieu de l'ouest de la France)
    const center: [number, number] = [47.333328, -2.43333];

    // Chargement des données des écoles au montage du composant
    useEffect(() => {
        fetch("/api/schools")
            .then((res) => res.json())
            .then((data) => setSchools(data))
            .catch((err) => console.error("Erreur lors de la récupération des écoles :", err));
    }, []);

    return (
        <div className="h-[60vh] w-full rounded-[30px] overflow-hidden">
            {/* Conteneur principal de la carte Leaflet */}
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
            >
                {/* Couche de tuiles OpenStreetMap */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Affichage d'un marqueur pour chaque école récupérée via l'API */}
                {schools.map((school) => (
                    <Marker
                        key={school.id}
                        position={[school.latitude, school.longitude]}
                    >
                        {/* Fenêtre surgissante affichée au clic sur le marqueur */}
                        <Popup>{school.popup}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
