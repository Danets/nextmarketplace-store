'use client';

/**
 * ProductFeatures - Single Responsibility: Display product features
 * Open/Closed: Can be extended with feature icons or descriptions
 */
interface ProductFeaturesProps {
    features: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
    return (
        <div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Features:</h3>
            <ul className="space-y-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-blue-600">✓</span>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}
