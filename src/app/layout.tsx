import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";

const font = Urbanist({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "A simple store built with Next.js 16 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.variable}
      >
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
