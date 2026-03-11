/**
 * QuantitySelector - Single Responsibility: Handle quantity selection
 * Open/Closed: Can be extended for different quantity handling
 */
import { useState } from 'react';

interface QuantitySelectorProps {
    initialQuantity?: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
}

export function QuantitySelector({
    initialQuantity = 1,
    onQuantityChange,
    min = 1,
    max = 999,
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleChange = (newQuantity: number) => {
        if (newQuantity >= min && newQuantity <= max) {
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleDecrement = () => handleChange(quantity - 1);
    const handleIncrement = () => handleChange(quantity + 1);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            handleChange(value);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
                <button
                    onClick={handleDecrement}
                    disabled={quantity <= min}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                >
                    −
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    className="w-12 border-0 bg-transparent text-center outline-none"
                />
                <button
                    onClick={handleIncrement}
                    disabled={quantity >= max}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                >
                    +
                </button>
            </div>
        </div>
    );
}
