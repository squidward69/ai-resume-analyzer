import React, {useEffect, useState} from 'react'
import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({resume: {id, companyName, jobTitle, feedback, imagePath}}:{resume: Resume}) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }
        loadResume();
    }, [imagePath]);

    return (
        <Link
            to={`/resume/${id}`}
            className="card-interactive group overflow-hidden animate-slide-up"
        >
            {/* Header Section */}
            <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {companyName && (
                        <h2 className="text-lg font-semibold text-gray-900 break-words group-hover:text-blue-600 transition-colors">
                            {companyName}
                        </h2>
                    )}
                    {jobTitle && (
                        <h3 className="text-sm text-gray-600 break-words line-clamp-2">
                            {jobTitle}
                        </h3>
                    )}
                    {!companyName && !jobTitle && (
                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Resume Analysis
                        </h2>
                    )}
                </div>

                {/* Score Badge */}
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {/* Resume Preview */}
            {resumeUrl && (
                <div className="border-t border-gray-100 relative overflow-hidden bg-gray-50">
                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
                    )}

                    <div className="relative w-full h-[350px] max-sm:h-[200px] overflow-hidden">
                        <img
                            src={resumeUrl}
                            alt="Resume preview"
                            className={`w-full h-full object-cover object-top transition-all duration-500 ${
                                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                            } group-hover:scale-105`}
                            onLoad={() => setImageLoaded(true)}
                        />

                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* View indicator */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                            View Details
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            )}
        </Link>
    )
}

export default ResumeCard