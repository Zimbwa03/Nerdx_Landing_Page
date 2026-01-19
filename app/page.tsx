"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import Lenis from "lenis";
import ImageSequence from "../components/ImageSequence";

const SCROLL_HEIGHT = 8000; // Total scrollable height in pixels

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize smooth scrolling with Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy()
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the progress for the image sequence so it feels "buttery"
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // --- Animation Transforms for Text Sections ---

    // 1. Hero (0 - 15%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    // 2. Engineering Reveal (15 - 40%)
    const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
    const engX = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [-50, 0, 0, -50]);

    // 3. Noise/Labs (40 - 65%)
    const labsOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
    const labsX = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [50, 0, 0, 50]);

    // 4. Sound/Practice (65 - 85%)
    const soundOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
    const soundY = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [30, 0, 0, -30]);

    // 5. CTA (85 - 100%)
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
    const ctaScale = useTransform(scrollYProgress, [0.85, 0.9], [0.95, 1]);


    return (
        <main ref={containerRef} className="relative bg-background" style={{ height: `${SCROLL_HEIGHT}px` }}>

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Background Gradients */}
                <div className="absolute inset-0 bg-background pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#050815] rounded-full blur-[120px] opacity-40"></div>
                </div>

                {/* Canvas Layer */}
                <div className="relative z-10 w-full h-full max-w-[1600px] flex items-center justify-center">
                    {/* Pass standard (not smooth) progress to canvas if we want absolute sync, 
                 or smoothProgress for inertia. The prompt asks for "buttery", let's use smooth. 
                 But wait, Framer Motion useSpring returns a MotionValue, we need a plain number for the component 
                 UNLESS the component subscribes to it.
                 Let's make a wrapper to extract the value for the canvas.
              */}
                    <CanvasWrapper progress={smoothProgress} />
                </div>

                {/* --- Story Overlays (Z-Index 20) --- */}

                {/* 1. Hero */}
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute z-20 top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="text-center max-w-4xl px-4">
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
                            NerdX
                        </h1>
                        <p className="text-2xl md:text-3xl font-medium text-accent-primary mb-2">
                            Master Science, Powered by AI.
                        </p>
                        <p className="text-white/60 text-lg md:text-xl font-light tracking-wide">
                            The world's best mobile educator app for O-Level and A-Level sciences.
                        </p>
                    </div>
                </motion.div>

                {/* 2. Engineering */}
                <motion.div
                    style={{ opacity: engOpacity, x: engX }}
                    className="absolute z-20 top-0 left-0 w-full h-full flex items-center px-6 md:px-24 pointer-events-none"
                >
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Deep Knowledge Tracing,<br /><span className="text-gray-500">Engineered for You.</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-4 border-l-2 border-accent-secondary pl-6">
                            Our proprietary AI predicts exactly what you know and don't know, adapting every question in real-time.
                        </p>
                        <p className="text-lg text-white/70 pl-6">
                            Every interaction trains a unique knowledge map—no two students learn the same way.
                        </p>
                    </div>
                </motion.div>

                {/* 3. Labs */}
                <motion.div
                    style={{ opacity: labsOpacity, x: labsX }}
                    className="absolute z-20 top-0 right-0 w-full h-full flex items-center justify-end px-6 md:px-24 pointer-events-none"
                >
                    <div className="max-w-xl text-right">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Immersive Virtual Labs,<br /><span className="text-accent-primary">Redefined.</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-4 border-r-2 border-accent-primary pr-6">
                            Interactive titration, dissection, and circuit simulations with haptic feedback.
                        </p>
                        <p className="text-lg text-white/70 pr-6">
                            Real-time physics and chemistry verification ensures 100% accuracy.
                        </p>
                    </div>
                </motion.div>

                {/* 4. Sound/Practice */}
                <motion.div
                    style={{ opacity: soundOpacity, y: soundY }}
                    className="absolute z-20 top-0 left-0 w-full h-full flex items-end pb-32 justify-center px-6 md:px-24 pointer-events-none"
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Infinite Practice, Perfect Retention.
                        </h2>
                        <p className="text-lg text-white/70">
                            AI-generated problems verified for accuracy unlock detail, depth, and mastery in every subject.
                        </p>
                    </div>
                </motion.div>

                {/* 5. Reassembly / CTA */}
                <motion.div
                    style={{ opacity: ctaOpacity, scale: ctaScale }}
                    className="absolute z-20 top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-auto"
                >
                    <div className="text-center max-w-4xl px-4 mt-[30vh]"> {/* Push down a bit so phone is visible above */}
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                            Master Every Concept.<br />Ace Every Exam.
                        </h2>
                        <p className="text-xl md:text-2xl text-white/60 mb-10">
                            NerdX. Designed for excellence, crafted for every student.
                        </p>
                        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-accent-secondary to-accent-primary text-white font-bold rounded-full text-lg shadow-[0_0_40px_-10px_rgba(0,214,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(0,214,255,0.7)] transition-shadow scale-100 hover:scale-105 duration-300">
                                Download NerdX APK
                            </button>
                            <button className="text-white/80 hover:text-white font-medium text-lg border-b border-white/20 hover:border-white transition-colors pb-1">
                                View Full Features
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}

// Helper to extract MotionValue to number for Canvas
function CanvasWrapper({ progress }: { progress: any }) {
    const [val, setVal] = useState(0);

    useEffect(() => {
        return progress.onChange((v: number) => {
            setVal(v);
        })
    }, [progress]);

    return <ImageSequence progress={val} />;
}
