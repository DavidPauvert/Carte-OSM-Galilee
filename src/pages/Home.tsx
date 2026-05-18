import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markers } from "../data/markers";
import L from "leaflet";

// Fix for default marker icons in Leaflet with React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Home: React.FC = () => {
    const center: [number, number] = [47.333328, -2.43333];

    return (
        <div className="h-[60vh] w-full rounded-[30px] overflow-hidden">
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position as [number, number]}
                    >
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
