"use client";

import React, { useRef, useEffect, useState } from "react";

interface ImageSequenceProps {
    progress: number; // 0 to 1
}

export default function ImageSequence({ progress }: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Hardcoded for now based on the file list (240 files)
    const frameCount = 240;

    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                // Construct filename: ezgif-frame-001.jpg, ezgif-frame-010.jpg, ezgif-frame-100.jpg
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === frameCount) {
                        setIsLoaded(true);
                    }
                };
                imgs.push(img);
            }
            setImages(imgs);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate frame index
        let frameIndex = Math.floor(progress * (frameCount - 1));
        // Clamp
        frameIndex = Math.min(frameCount - 1, Math.max(0, frameIndex));

        const img = images[frameIndex];

        // Clear and draw
        // Use requestAnimationFrame for smoother playback if strictly needed,
        // but React effect is okay for this scroll-driven approach since progress updates are frequent.
        if (img && img.complete && img.naturalWidth > 0) {
            // Draw image covering the canvas while maintaining aspect ratio (object-fit: contain equivalent)
            // Actually the prompt asks for it to fit cleanly.
            // Let's just draw it centered.

            requestAnimationFrame(() => {
                // Handle High DPI
                const dpr = window.devicePixelRatio || 1;
                // Assume canvas size is set by CSS to window size
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.scale(dpr, dpr);

                // Draw Logic
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                // Calculate scaling to 'contain' the image
                const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (canvasWidth - w) / 2;
                const y = (canvasHeight - h) / 2;

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, x, y, w, h);
            })
        }
    }, [progress, images, isLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-contain"
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        />
    );
}
