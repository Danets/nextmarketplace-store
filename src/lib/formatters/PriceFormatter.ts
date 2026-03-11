/**
 * PriceFormatter - Single Responsibility: Format price values
 * Open/Closed: Can be extended for different currencies/locales
 */

export interface IPriceFormatter {
  format(price: number): string;
  getDiscountedPrice(originalPrice: number, discount: number): number;
}

export class USDPriceFormatter implements IPriceFormatter {
  format(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  getDiscountedPrice(originalPrice: number, discount: number): number {
    return originalPrice * (1 - discount / 100);
  }
}

export class PriceFormatter implements IPriceFormatter {
  constructor(private formatter: IPriceFormatter = new USDPriceFormatter()) {}

  format(price: number): string {
    return this.formatter.format(price);
  }

  getDiscountedPrice(originalPrice: number, discount: number): number {
    return this.formatter.getDiscountedPrice(originalPrice, discount);
  }
}
