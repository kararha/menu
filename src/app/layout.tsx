import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumière - Fine Dining Restaurant",
  description: "Experience refined flavors at Lumière. Explore our seasonal menu, chef's specials, and place your order online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
