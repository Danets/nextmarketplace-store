"use client";

import { RatingRenderer } from "@/lib/formatters";

/**
 * useRatingRenderer - Provides rating rendering functionality
 * Single Responsibility: Render ratings
 */
export function useRatingRenderer() {
  const renderer = new RatingRenderer();

  return {
    getStarColor: (index: number, rating: number) =>
      renderer.getStarColor(index, rating),
    getStars: (rating: number) => renderer.getStars(rating),
  };
}
