/**
 * PriceDisplay - Single Responsibility: Display price information
 * Open/Closed: Extensible through props
 */
import { usePriceFormatter } from '@/lib/hooks/usePriceFormatter';

interface PriceDisplayProps {
    price: number;
    originalPrice?: number;
    size?: 'sm' | 'md' | 'lg';
    discount?: number;
}

export function PriceDisplay({
    price,
    originalPrice,
    size = 'md',
    discount,
}: PriceDisplayProps) {
    const { format, getDiscountedPrice } = usePriceFormatter();

    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-3xl',
    };

    const displayPrice = discount ? getDiscountedPrice(price, discount) : price;

    return (
        <div className="flex items-center gap-2">
            <span className={`font-bold text-gray-900 dark:text-white ${sizeClasses[size]}`}>
                ${price.toFixed(2)}
            </span>
            {(originalPrice || discount) && (
                <span className={`line-through text-gray-500 dark:text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                    ${(originalPrice || price).toFixed(2)}
                </span>
            )}
        </div>
    );
}
