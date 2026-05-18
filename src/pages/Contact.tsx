import React from "react";

export const Contact: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Coordonnées de la Classe NSI Terminale au Lycée Galilée
            </h2>

            <div className="space-y-6 text-lg">
                <div className="flex items-start gap-4">
                    <div className="mt-1 text-[#499BF1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <p>
                        <span className="font-semibold block">Adresse :</span>
                        <a
                            href="https://www.openstreetmap.org/?mlat=47.33014027700496&mlon=-2.4184761167679847#map=16/47.33014027700496/-2.4184761167679847"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#499BF1] hover:underline transition-colors"
                        >
                            Av. Gustave Flaubert, 44350 Guérande
                        </a>
                    </p>
                </div>

                <div className="flex items-start gap-4">
                    <div className="mt-1 text-[#499BF1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </div>
                    <p>
                        <span className="font-semibold block">Téléphone :</span>
                        <span className="text-gray-700">02 40 62 05 97</span>
                    </p>
                </div>

                <form
                    action="mailto:galilee.projet@protonmail.com"
                    method="post"
                    encType="text/plain"
                    className="mt-12 space-y-4 pt-8 border-t border-gray-100"
                >
                    <div>
                        <label
                            htmlFor="subject"
                            className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider"
                        >
                            Sujet
                        </label>
                        <input
                            type="text"
                            id="sujet"
                            name="subject"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#499BF1] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#499BF1] focus:border-transparent outline-none transition-all resize-none"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#499BF1] hover:bg-[#1A66B7] text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                    >
                        Envoyer le message
                    </button>
                </form>
            </div>
        </div>
    );
};
