import React from 'react'
import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo with refined styling */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group transition-opacity duration-200 hover:opacity-90"
                    >
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            {/* Subtle glow on hover */}
                            <div className="absolute inset-0 bg-blue-400 rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity -z-10" />
                        </div>
                        <span className="text-xl font-semibold text-gray-900 tracking-tight">
                            ResumeIQ
                        </span>
                    </Link>

                    {/* CTA Button with refined styling */}
                    <Link
                        to="/upload"
                        className="primary-button"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        Upload Resume
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
