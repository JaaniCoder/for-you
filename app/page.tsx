"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Scrapbook from "@/components/Scrapbook";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);

  const handleUnlock = () => {
    setIsBlooming(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsBlooming(false);
    }, 3000);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#fdfbf3]">
      <AnimatePresence mode="wait">
        {!isUnlocked && !isBlooming && (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        )}
        
        {isBlooming && (
          <FlowerBurstTransition key="bloom" />
        )}

        {isUnlocked && (
          <Scrapbook key="scrapbook" />
        )}
      </AnimatePresence>
    </main>
  );
}

// 🌸 High-Performance, Lag-Free Rose Burst Transition
const FlowerBurstTransition = () => {
  return (
    <motion.div
      className="absolute inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#fdfbf3]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 1. The Lightweight CSS Petal Explosion (Adds volume with zero lag) */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute bg-rose-400 mix-blend-multiply opacity-60"
          // CSS trick to make a perfect petal shape without an image
          style={{
            width: '40px', 
            height: '40px',
            borderRadius: '0 50% 50% 50%',
            willChange: 'transform, opacity' // Hardware Acceleration trigger
          }}
          initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            scale: [0, Math.random() * 4 + 3],
            x: (Math.random() - 0.5) * 1500, // Explode outward
            y: (Math.random() - 0.5) * 1500,
            rotate: Math.random() * 720
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      ))}

      {/* 2. The Real Roses (Optimized scaling without shadows) */}
      {[...Array(12)].map((_, i) => (
        <motion.img
          key={`rose-${i}`}
          src="/rose.png" 
          alt="Blooming Rose"
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2 + i * 0.5, 8 + (i * 1.5)], 
            rotate: i % 2 === 0 ? [0, 90] : [0, -90], 
            opacity: [0, 1, 1, 0] // Fading out as they pass the camera saves memory
          }}
          transition={{ 
            duration: 3, 
            ease: [0.25, 0.1, 0.25, 1], // Cinematic ease curve
            delay: i * 0.12 // Staggered tunnel effect
          }}
          className="absolute object-contain pointer-events-none"
          style={{
            width: '30vh',
            height: '30vh',
            marginLeft: `${(i % 3) * 15 - 15}vw`,
            marginTop: `${(i % 4) * 15 - 20}vh`,
            willChange: 'transform, opacity' // Hardware Acceleration trigger
          }}
        />
      ))}
      
      {/* 3. The Seamless White Flash Reveal */}
      <motion.div 
        className="absolute inset-0 bg-white z-101 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 3, times: [0, 0.8, 1] }}
      />
    </motion.div>
  );
};