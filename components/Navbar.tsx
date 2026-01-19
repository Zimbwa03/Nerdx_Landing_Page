"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Transform opacity based on scroll position
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.75)"]
    );

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <motion.nav
            style={{ backgroundColor, backdropFilter: backdropBlur }}
            className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 border-b border-white/0 transition-colors duration-500"
        >
            <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-medium tracking-tight text-white">
                    NerdX
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
                    {["Overview", "AI Features", "Virtual Labs", "Curriculum"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="hover:text-white transition-colors duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Mobile menu could go here */}
                <Link
                    href="#"
                    className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-white/10 px-4 text-xs font-semibold text-white transition-all hover:bg-white/20 active:scale-95 border border-white/10 hover:border-accent-primary/50"
                >
                    Download
                </Link>
                <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-accent-secondary to-accent-primary px-4 text-xs font-bold text-white shadow-lg shadow-accent-secondary/20 transition-transform active:scale-95 hover:shadow-accent-primary/40"
                >
                    Get NerdX APK
                </Link>
            </div>
        </motion.nav>
    );
}
