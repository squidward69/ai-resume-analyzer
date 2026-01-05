interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const getBadgeScheme = () => {
        if (score > 70) {
            return {
                className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                text: 'Strong'
            };
        } else if (score > 49) {
            return {
                className: 'bg-amber-100 text-amber-700 border-amber-200',
                text: 'Good'
            };
        } else {
            return {
                className: 'bg-red-100 text-red-700 border-red-200',
                text: 'Needs Work'
            };
        }
    };

    const { className, text } = getBadgeScheme();

    return (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${className}`}>
            {text}
        </div>
    );
};

export default ScoreBadge;