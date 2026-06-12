import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Game Theory Playground | Learn by Playing",
  description: "Discover how strategic decisions shape economics, psychology, and outcomes through interactive game experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-main text-text-main">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}

