"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Cloud, Moon, Star } from "lucide-react";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const correctPin = "0108"; // August 1st

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === correctPin) {
        setTimeout(onUnlock, 600);
      } else if (newPin.length === 4) {
        setTimeout(() => setPin(""), 500);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }} // Slight zoom out on unlock
      className="relative flex flex-col items-center justify-center h-full w-full bg-linear-to-b from-[#f3e8c9] to-[#fdfbf3] overflow-hidden"
    >
      {/* --- AMBIENT BACKGROUND ELEMENTS --- */}
      
      {/* Swaying Moon */}
      <motion.div 
        animate={{ rotate: [-5, 5, -5] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-20 right-32 text-amber-300"
      >
        <Moon size={80} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* Floating Clouds */}
      <motion.div 
        animate={{ x: [-20, 20, -20], y: [-5, 5, -5] }} 
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-32 left-20 text-white drop-shadow-md"
      >
        <Cloud size={100} fill="currentColor" strokeWidth={0} />
      </motion.div>

      <motion.div 
        animate={{ x: [20, -20, 20], y: [5, -5, 5] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-40 right-20 text-white drop-shadow-md opacity-80"
      >
        <Cloud size={120} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* Twinkling Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
          className="absolute text-amber-400"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + (i % 2) * 70}%`,
          }}
        >
          <Star size={20} fill="currentColor" strokeWidth={0} />
        </motion.div>
      ))}

      {/* --- FOREGROUND INTERFACE --- */}
      <div className="relative z-10 text-center mb-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Lock className="w-12 h-12 mx-auto text-amber-600 mb-6 drop-shadow-sm" />
        </motion.div>
        
        <h1 className="text-3xl font-serif text-amber-900 italic mb-2 tracking-wide">
          For My Love
        </h1>
        <p className="text-amber-700/70 text-sm font-serif mb-6">Enter our special date</p>
        
        {/* PIN Indicators */}
        <div className="flex gap-4 mt-4 justify-center">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={pin.length > i ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              className={`w-4 h-4 rounded-full border-2 border-amber-600 transition-colors duration-300 ${pin.length > i ? 'bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]' : 'bg-transparent'}`} 
            />
          ))}
        </div>
      </div>

      {/* Interactive Keypad */}
      <div className="relative z-10 grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((btn, i) => (
          <motion.button
            key={i}
            whileHover={btn !== "" ? { scale: 1.1, backgroundColor: "#fef3c7" } : {}}
            whileTap={btn !== "" ? { scale: 0.9 } : {}}
            onClick={() => btn === "⌫" ? setPin(pin.slice(0, -1)) : btn !== "" && handlePress(btn.toString())}
            className={`w-20 h-20 rounded-full text-2xl text-amber-900 flex items-center justify-center font-serif transition-colors ${
              !btn && btn !== 0 ? 'invisible' : 'bg-white/80 backdrop-blur-sm shadow-lg border border-white/50'
            }`}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}