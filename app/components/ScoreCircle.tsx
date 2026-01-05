import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    const radius = 40;
    const stroke = 7;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = animatedScore / 100;
    const strokeDashoffset = circumference * (1 - progress);

    // Animate score on mount
    useEffect(() => {
        const duration = 1000; // 1 second
        const steps = 60;
        const stepValue = score / steps;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.round(currentStep * stepValue));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [score]);

    // Color scheme based on score
    const getColorScheme = () => {
        if (score >= 70) return {
            gradient: { start: '#12B76A', end: '#039855' },
            text: 'text-emerald-700'
        };
        if (score >= 50) return {
            gradient: { start: '#F79009', end: '#DC6803' },
            text: 'text-amber-700'
        };
        return {
            gradient: { start: '#F04438', end: '#D92D20' },
            text: 'text-red-700'
        };
    };

    const colors = getColorScheme();

    return (
        <div className="relative w-[100px] h-[100px]">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#E4E7EC"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id={`score-grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.gradient.start} />
                        <stop offset="100%" stopColor={colors.gradient.end} />
                    </linearGradient>

                    {/* Subtle shadow filter */}
                    <filter id="score-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                        <feOffset dx="0" dy="1" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.1"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Progress circle with animation */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={`url(#score-grad-${score})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    filter="url(#score-shadow)"
                    style={{
                        transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                />
            </svg>

            {/* Score display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-bold text-base ${colors.text} tracking-tight`}>
                    {animatedScore}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">/ 100</span>
            </div>
        </div>
    );
};

export default ScoreCircle;