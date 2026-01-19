import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "NerdX - Master Science, Powered by AI",
    description: "The world's best mobile educator app for O-Level and A-Level sciences.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans bg-background text-white antialiased selection:bg-accent-primary/30`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
