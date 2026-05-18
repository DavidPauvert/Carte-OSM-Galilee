/**
 * Ce fichier est le point d'entrée de l'application React.
 * Il configure l'élément racine et affiche le composant App dans le DOM.
 *
 * Il est inclus dans `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Récupération de l'élément HTML où l'application sera injectée
const elem = document.getElementById("root");
if (!elem) {
    throw new Error("Impossible de trouver l'élément racine avec l'id 'root'");
}

// Définition de la structure de l'application avec le mode strict activé
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);

// Gestion du Hot Module Replacement (HMR) spécifique à Bun
// Cela permet de mettre à jour l'application sans recharger toute la page
// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
const root = import.meta.hot
    ? (import.meta.hot.data.root ??= createRoot(elem))
    : createRoot(elem);

// Rendu effectif de l'application
root.render(app);
