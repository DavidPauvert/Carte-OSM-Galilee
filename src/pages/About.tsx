import React from "react";

/**
 * Page "À propos" présentant l'objectif du site et son fonctionnement.
 */
export const About: React.FC = () => {
    return (
        <div className="prose prose-blue max-w-none">
            <h2 className="text-2xl font-bold text-center mb-6">
                À Propos de Notre Site
            </h2>
            <div className="space-y-4 text-lg text-justify text-gray-700 leading-relaxed">
                <p>
                    Notre site a pour objectif de répertorier les écoles
                    répertoriées sur le site{" "}
                    <a
                        href="https://loutrel.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#499BF1] font-bold hover:underline"
                    >
                        loutrel.fr
                    </a> (dans l'onglet{" "}
                    <a
                        href="https://loutrel.fr/index.php/2019-01-31-18-45-52/poursuite-d-etude-nsi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#499BF1] font-bold hover:underline"
                    >
                        orientation
                    </a>
                    ) et de fournir des informations détaillées sur chacune
                    d'elles. Nous visons à simplifier la recherche d'écoles pour
                    les étudiants, les parents et les chercheurs d'éducation.
                </p>
                <p>
                    Grâce à notre plateforme, vous pouvez facilement parcourir
                    les écoles, accéder à leurs informations telles que les
                    programmes offerts, les coordonnées et les avis, et même
                    avoir accès à des liens pour en savoir plus ou postuler.
                </p>

                <h2 className="text-xl font-bold text-center mt-8 mb-4 text-black">
                    Comment Utiliser Notre Site
                </h2>
                <p>
                    La navigation sur notre site est simple : utilisez la carte
                    interactive pour découvrir de nouvelles options ou consultez
                    la liste complète des écoles. En cliquant sur le nom d'une
                    école, vous accéderez à son site officiel pour obtenir
                    toutes les informations nécessaires.
                </p>
                <p>
                    Nous nous efforçons constamment d'améliorer notre base de
                    données pour inclure le plus grand nombre d'écoles possible
                    afin de vous offrir un choix varié et complet.
                </p>
                <p>
                    Nous espérons que notre site vous sera utile dans votre
                    recherche d'éducation !
                </p>
            </div>
        </div>
    );
};
