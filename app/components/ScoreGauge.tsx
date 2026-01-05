import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = animatedScore / 100;

    // Animate score number
    useEffect(() => {
        const duration = 1200;
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

    // Calculate path length
    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Color scheme based on score
    const getColorScheme = () => {
        if (score >= 70) return {
            gradient: { start: '#12B76A', end: '#039855' },
            text: 'text-emerald-700',
            glow: 'rgba(18, 183, 106, 0.2)'
        };
        if (score >= 50) return {
            gradient: { start: '#F79009', end: '#DC6803' },
            text: 'text-amber-700',
            glow: 'rgba(247, 144, 9, 0.2)'
        };
        return {
            gradient: { start: '#F04438', end: '#D92D20' },
            text: 'text-red-700',
            glow: 'rgba(240, 68, 56, 0.2)'
        };
    };

    const colors = getColorScheme();

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-24">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <defs>
                        {/* Gradient for arc */}
                        <linearGradient
                            id={`gaugeGrad-${score}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={colors.gradient.start} />
                            <stop offset="100%" stopColor={colors.gradient.end} />
                        </linearGradient>

                        {/* Subtle shadow */}
                        <filter id="gauge-shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                            <feOffset dx="0" dy="2" result="offsetblur"/>
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.15"/>
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M10,45 A40,40 0 0,1 90,45"
                        fill="none"
                        stroke="#E4E7EC"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc with gradient and shadow */}
                    <path
                        ref={pathRef}
                        d="M10,45 A40,40 0 0,1 90,45"
                        fill="none"
                        stroke={`url(#gaugeGrad-${score})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        filter="url(#gauge-shadow)"
                        style={{
                            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />
                </svg>

                {/* Score display */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${colors.text} tracking-tight`}>
                            {animatedScore}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                            /100
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">
                        Overall Score
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;