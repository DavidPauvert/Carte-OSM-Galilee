import React, { useState } from "react";
import { schools } from "../data/schools";

export const Schools: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold">Liste Des Écoles</h2>
                <div className="relative w-full md:w-64 lg:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher une école..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#499BF1] focus:border-transparent sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
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
