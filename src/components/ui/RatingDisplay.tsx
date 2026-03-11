/**
 * RatingDisplay - Single Responsibility: Display rating information
 * Open/Closed: Extensible through props
 */
import { useRatingRenderer } from '@/lib/hooks/useRatingRenderer';

interface RatingDisplayProps {
    rating: number;
    reviews: number;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

const sizeClasses = {
    sm: 'text-xs',
    md: 'text-lg',
    lg: 'text-xl',
};

const countClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
};

export function RatingDisplay({
    rating,
    reviews,
    size = 'md',
    showCount = true,
}: RatingDisplayProps) {
    const { getStarColor, getStars } = useRatingRenderer();
    const stars = getStars(rating);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                {stars.map((i) => (
                    <span
                        key={i}
                        className={`${sizeClasses[size]} ${getStarColor(i, rating)}`}
                    >
                        ★
                    </span>
                ))}
            </div>
            {showCount && (
                <span className={`text-gray-500 dark:text-gray-400 ${countClasses[size]}`}>
                    ({reviews})
                </span>
            )}
        </div>
    );
}
