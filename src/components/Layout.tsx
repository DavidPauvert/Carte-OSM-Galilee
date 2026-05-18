import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoSite from "../assets/logo_site.png";

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Composant de mise en page (Layout) commun à toutes les pages.
 * Il gère l'affichage de l'en-tête, de la navigation et du pied de page.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    // Définition des éléments de navigation
    const navItems = [
        { name: "Accueil", path: "/" },
        { name: "Écoles", path: "/ecoles" },
        { name: "Contact", path: "/contact" },
        { name: "À propos", path: "/apropos" },
    ];

    /**
     * Détermine le titre de la page en fonction de l'URL actuelle.
     */
    const getPageTitle = () => {
        const current = navItems.find(
            (item) => item.path === location.pathname,
        );
        return current ? current.name : "Accueil";
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#AED0E4] via-[#AED0E4] to-[#D5BEDA]">
            {/* En-tête avec le logo et le titre dynamique */}
            <header className="bg-linear-to-b from-[#599BF1] to-[#2A78DE] h-20 flex items-center px-4 md:px-8 shadow-md">
                <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
                    <Link to="/">
                        <img
                            src={logoSite}
                            alt="Logo"
                            className="h-16 md:h-24 w-auto"
                        />
                    </Link>
                    <h1 className="text-white text-2xl md:text-4xl font-serif grow text-center md:text-left">
                        {getPageTitle()}
                    </h1>
                </div>
            </header>

            {/* Barre de navigation collante (sticky) */}
            <nav className="bg-linear-to-b from-[#1A66B7] to-[#2D77C5] shadow-lg sticky top-0 z-50">
                <ul className="flex justify-center items-center py-2 md:py-3 px-4 flex-wrap">
                    {navItems.map((item) => (
                        <li key={item.path} className="mx-2 md:mx-4">
                            <Link
                                to={item.path}
                                className={`text-sm md:text-lg font-bold transition-colors duration-200 px-2 py-1 rounded
                                ${
                                    location.pathname === item.path
                                        ? "text-white"
                                        : "text-[#BFDEFF] hover:text-white"
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Zone de contenu principal */}
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="bg-white rounded-[30px] md:rounded-[50px] border border-black shadow-2xl p-6 md:p-12 min-h-[60vh]">
                    {children}
                </div>
            </main>
        </div>
    );
};
