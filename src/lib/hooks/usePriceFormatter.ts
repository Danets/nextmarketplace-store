"use client";

import { PriceFormatter } from "@/lib/formatters";

/**
 * usePriceFormatter - Provides price formatting functionality
 * Single Responsibility: Format prices
 */
export function usePriceFormatter() {
  const formatter = new PriceFormatter();

  return {
    format: (price: number) => formatter.format(price),
    getDiscountedPrice: (price: number, discount: number) =>
      formatter.getDiscountedPrice(price, discount),
  };
}
