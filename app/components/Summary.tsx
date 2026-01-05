import React from 'react'
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score } : { title: string, score: number } ) => {
    const getScoreColor = () => {
        if (score > 70) return 'text-emerald-600';
        if (score > 49) return 'text-amber-600';
        return 'text-red-600';
    };

    return (
        <div className="group py-5 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/50">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-gray-900">
                            {title}
                        </h4>
                        <ScoreBadge score={score} />
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${getScoreColor()}`}>
                        {score}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">/100</span>
                </div>
            </div>
        </div>
    )
}

const Summary = ({ feedback } : { feedback: Feedback}) => {
    return (
        <div className="card shadow-elevated overflow-hidden animate-slide-up">
            {/* Header with Score Gauge */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-violet-50 p-8 border-b border-gray-200">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-0" />

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-shrink-0">
                        <ScoreGauge score={feedback.overallScore} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Overall Resume Score
                        </h2>
                        <p className="text-sm text-gray-600 max-w-xl">
                            Your resume has been analyzed across multiple dimensions including tone, content quality, structure, and skills presentation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="p-8">
                <div className="space-y-1">
                    <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                    <Category title="Content Quality" score={feedback.content.score} />
                    <Category title="Structure & Layout" score={feedback.structure.score} />
                    <Category title="Skills & Keywords" score={feedback.skills.score} />
                </div>
            </div>
        </div>
    )
}
export default Summary
