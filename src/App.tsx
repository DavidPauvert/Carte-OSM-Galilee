import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Schools } from "./pages/Schools";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import "./index.css";

/**
 * Composant principal de l'application qui définit les routes
 * et enveloppe le contenu dans un Layout commun.
 */
export function App() {
    return (
        <Router>
            {/* Le Layout contient la barre de navigation et le pied de page */}
            <Layout>
                <Routes>
                    {/* Définition des différentes pages de l'application */}
                    <Route path="/" element={<Home />} />
                    <Route path="/ecoles" element={<Schools />} />
                    <Route path="/apropos" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
