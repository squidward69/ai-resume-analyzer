const ATS = ({
                 score,
                 suggestions,
             }: {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
    const getScoreScheme = () => {
        if (score > 69) return {
            bg: 'from-emerald-50 to-white',
            border: 'border-emerald-200',
            iconBg: 'bg-emerald-100',
            icon: 'text-emerald-600',
            badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            badgeText: 'Excellent'
        };
        if (score > 49) return {
            bg: 'from-amber-50 to-white',
            border: 'border-amber-200',
            iconBg: 'bg-amber-100',
            icon: 'text-amber-600',
            badge: 'bg-amber-100 text-amber-700 border-amber-200',
            badgeText: 'Good'
        };
        return {
            bg: 'from-red-50 to-white',
            border: 'border-red-200',
            iconBg: 'bg-red-100',
            icon: 'text-red-600',
            badge: 'bg-red-100 text-red-700 border-red-200',
            badgeText: 'Needs Work'
        };
    };

    const scheme = getScoreScheme();

    return (
        <div className={`card border-2 ${scheme.border} bg-gradient-to-br ${scheme.bg} overflow-hidden animate-slide-up stagger-1`}>
            <div className="p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-5">
                    <div className={`p-4 ${scheme.iconBg} rounded-2xl flex-shrink-0 shadow-sm`}>
                        <svg
                            className={`w-8 h-8 ${scheme.icon}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl font-bold text-gray-900">
                                ATS Compatibility
                            </h2>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${scheme.badge}`}>
                                {score}/100 - {scheme.badgeText}
                            </span>
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Applicant Tracking Systems (ATS) scan resumes before human eyes see them. Your resume scored <span className="font-semibold text-gray-900">{score} out of 100</span> for ATS compatibility.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Analysis Results */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Key Findings
                        </h3>
                    </div>

                    <div className="space-y-2.5">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    {suggestion.type === "good" ? (
                                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3.5 h-3.5 text-emerald-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3.5 h-3.5 text-amber-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed flex-1">
                                    {suggestion.tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-sm text-blue-900 leading-relaxed">
                                <span className="font-semibold">Pro tip:</span> Apply the suggestions below to improve your ATS score and increase your chances of getting past automated screening.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATS;