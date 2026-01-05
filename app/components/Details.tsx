import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
    const getScheme = () => {
        if (score > 69) return {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            border: 'border-emerald-200'
        };
        if (score > 39) return {
            bg: 'bg-amber-100',
            text: 'text-amber-700',
            border: 'border-amber-200'
        };
        return {
            bg: 'bg-red-100',
            text: 'text-red-700',
            border: 'border-red-200'
        };
    };

    const scheme = getScheme();

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${scheme.bg} ${scheme.text} ${scheme.border}`}>
            {score > 69 ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )}
            <span>{score}/100</span>
        </div>
    );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex items-center gap-3 py-1">
            <h3 className="text-lg font-semibold text-gray-900">
                {title}
            </h3>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
                             tips,
                         }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
    const goodTips = tips.filter(t => t.type === "good");
    const improveTips = tips.filter(t => t.type === "improve");

    return (
        <div className="space-y-6">
            {/* Quick Overview Grid */}
            {tips.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Overview</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2.5">
                                <div className="flex-shrink-0 mt-0.5">
                                    {tip.type === "good" ? (
                                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detailed Feedback */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">Detailed Feedback</h4>

                {/* Strengths */}
                {goodTips.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-emerald-900">Strengths</span>
                        </div>
                        {goodTips.map((tip, index) => (
                            <div
                                key={`good-${index}`}
                                className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start gap-2.5">
                                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-base font-semibold text-emerald-900">{tip.tip}</p>
                                </div>
                                <p className="text-sm text-emerald-800 leading-relaxed pl-7">
                                    {tip.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Areas for Improvement */}
                {improveTips.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-amber-900">Areas for Improvement</span>
                        </div>
                        {improveTips.map((tip, index) => (
                            <div
                                key={`improve-${index}`}
                                className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-2 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start gap-2.5">
                                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="text-base font-semibold text-amber-900">{tip.tip}</p>
                                </div>
                                <p className="text-sm text-amber-800 leading-relaxed pl-7">
                                    {tip.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="space-y-4 animate-slide-up stagger-2">
            <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis</h2>
            </div>

            <Accordion defaultOpen="tone-style">
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader
                            title="Content Quality"
                            categoryScore={feedback.content.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader
                            title="Structure & Layout"
                            categoryScore={feedback.structure.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader
                            title="Skills & Keywords"
                            categoryScore={feedback.skills.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;