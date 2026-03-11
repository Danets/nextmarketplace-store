/**
 * RatingRenderer - Single Responsibility: Render rating stars
 * Open/Closed: Can be extended for different rating styles
 */

export interface IRatingRenderer {
  getStarColor(index: number, rating: number): string;
  getStars(rating: number): number[];
}

export class StarRatingRenderer implements IRatingRenderer {
  getStarColor(index: number, rating: number): string {
    return index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300";
  }

  getStars(rating: number): number[] {
    return [...Array(5)].map((_, i) => i);
  }
}

export class RatingRenderer {
  constructor(private renderer: IRatingRenderer = new StarRatingRenderer()) {}

  getStarColor(index: number, rating: number): string {
    return this.renderer.getStarColor(index, rating);
  }

  getStars(rating: number): number[] {
    return this.renderer.getStars(rating);
  }
}
