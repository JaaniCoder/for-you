"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Heart, X } from "lucide-react";

export default function Scrapbook() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  useEffect(() => {
    // 👇 YOUR ANNIVERSARY DATE (YYYY-MM-DD)
    const anniversaryDate = new Date("2025-03-26"); 
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - anniversaryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  return (
    <>
      <CursorTrail />

      <AnimatePresence>
        {isLetterOpen && <TypewriterLetter onClose={() => setIsLetterOpen(false)} />}
      </AnimatePresence>

      <div className="relative w-full h-full min-h-screen p-4 md:p-8 overflow-y-auto md:overflow-hidden bg-[#fdfbf3]">
        <FloatingHearts />

        {/* PORTAL TO UNIVERSE */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-4 md:top-12 md:bottom-auto md:right-10 z-50"
        >
          <Link href="/universe" className="bg-rose-500 text-white px-5 py-3 rounded-full font-serif text-sm md:text-base shadow-xl hover:bg-rose-600 transition-colors flex items-center gap-2">
            Take me to the stars ✨
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="relative md:absolute top-4 left-4 md:top-10 md:left-10 text-4xl md:text-6xl font-serif italic text-red-800 drop-shadow-md z-10 pointer-events-none mb-6 md:mb-0"
        >
          Favorite <br className="hidden md:block" /> Person
        </motion.h1>

        <div className="relative w-full h-full flex flex-wrap md:block items-center justify-center gap-10 pt-10 pb-52 md:pt-0 md:pb-0">
          
          <DraggableItem defaultClass="relative md:absolute md:left-[5%] md:top-[28%]" rotation={-6} delay={0.3}>
            <div className="bg-white p-4 md:p-5 shadow-2xl rounded-xl w-44 md:w-48 border border-rose-100 flex flex-col items-center">
              <h3 className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-gray-400 mb-1">Days with you</h3>
              <div className="text-4xl md:text-5xl font-serif text-rose-500 my-1 md:my-2">{daysTogether}</div>
              <div className="w-full h-px bg-rose-100 my-2" />
              <p className="font-serif italic text-xs md:text-sm text-gray-600 text-center">...and I&apos;ve loved every single one. ❤️</p>
            </div>
          </DraggableItem>

          <DraggableItem defaultClass="relative md:absolute md:left-[5%] md:top-[62%]" rotation={-10} delay={0.7}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLetterOpen(true)}
              className="bg-[#f3e8c9] p-4 md:p-6 shadow-2xl rounded-md w-48 md:w-56 h-32 md:h-36 flex flex-col items-center justify-center border-2 border-[#e5d8b8] cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 w-0 h-0 border-l-95 md:border-l-110 border-r-95 md:border-r-110 border-t-70 md:border-t-80 border-transparent border-t-[#e5d8b8]/50" />
              <Mail className="text-rose-800 w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-2 z-10" />
              <p className="font-serif italic text-rose-900 font-bold z-10 text-center text-sm md:text-base">Open Me 💌</p>
            </motion.div>
          </DraggableItem>

          {/* Polaroid 1 */}
          <DraggableItem defaultClass="relative md:absolute md:left-[23%] md:top-[12%]" rotation={-4} delay={0.2}>
            <div className="bg-white p-3 md:p-4 pb-8 md:pb-10 shadow-2xl rounded-sm w-56 md:w-64 border border-gray-100 flex flex-col">
              <div className="w-full aspect-square bg-gray-200 overflow-hidden relative rounded-sm">
                <Image src="/photo1.jpeg" alt="Our first date" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover object-[50%_5%] scale-[1.1] filter sepia-[0.15]" />
              </div>
              <p className="font-serif italic text-lg md:text-xl text-center mt-3 text-gray-800">Our first date ❤️</p>
            </div>
          </DraggableItem>

          <DraggableItem defaultClass="relative md:absolute md:left-[23%] md:top-[60%]" rotation={4} delay={0.5}>
            <ReasonGenerator />
          </DraggableItem>

          {/* Polaroid 2 */}
          <DraggableItem defaultClass="relative md:absolute md:left-[45%] md:top-[8%]" rotation={6} delay={0.4}>
            <div className="bg-white p-3 md:p-4 pb-8 md:pb-10 shadow-2xl rounded-sm w-60 md:w-64 border border-gray-100 flex flex-col">
              <div className="w-full aspect-square bg-gray-200 overflow-hidden relative rounded-sm">
                <Image src="/photo2.jpeg" alt="You and Me" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover object-[15%_85%] scale-[1.6] filter sepia-[0.1]" />
              </div>
              <p className="font-serif italic text-lg md:text-xl text-center mt-3 text-gray-800">You & Me ✨</p>
            </div>
          </DraggableItem>

          <DraggableItem defaultClass="relative md:absolute md:left-[67%] md:top-[8%]" rotation={3} delay={0.6}>
            <div className="bg-[#fcf9f2] p-5 md:p-6 shadow-xl rounded-md w-64 md:w-72 border border-amber-200 font-serif text-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold">Love</h2>
              <p className="italic text-xs md:text-sm text-gray-500">[luv] noun</p>
              <div className="w-full h-px bg-amber-200 my-2" />
              <p className="text-sm md:text-base leading-relaxed">Strong affection for another arising out of kinship or personal ties... and exactly what I feel for you every single day.</p>
            </div>
          </DraggableItem>

          {/* Polaroid 3 */}
          <DraggableItem defaultClass="relative md:absolute md:left-[47%] md:top-[56%]" rotation={-5} delay={0.5}>
            <div className="bg-white p-3 md:p-4 pb-8 md:pb-10 shadow-2xl rounded-sm w-56 md:w-60 border border-gray-100 flex flex-col">
              <div className="w-full aspect-square bg-gray-200 overflow-hidden relative rounded-sm">
                <Image src="/photo3.jpeg" alt="Forever" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover object-[90%_45%] scale-[1.6] filter sepia-[0.15]" />
              </div>
              <p className="font-serif italic text-lg md:text-xl text-center mt-3 text-gray-800">Forever 💕</p>
            </div>
          </DraggableItem>

          <DraggableItem defaultClass="relative md:absolute md:left-[68%] md:top-[56%]" rotation={-2} delay={0.8}>
            <div className="w-72 md:w-80 shadow-2xl rounded-2xl overflow-hidden bg-black p-2 pointer-events-auto">
              <iframe 
                src="https://open.spotify.com/embed/track/3OWDmRdxNsRjEMBsuRGwlr?si=KuhbF6-hTJqwTJiXFvmcTg&utm_source=copy-link&sci=spotify%3Acard-config%3A32cNw7VHPBxPhNy6vgLaL8" 
                width="100%" height="152" frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </DraggableItem>

          {/* 🏃‍♀️ Uncatchable Question */}
          <DraggableItem defaultClass="relative md:absolute md:left-[10%] md:top-[80%]" rotation={-4} delay={0.9}>
            <UncatchableQuestion />
          </DraggableItem>

          {/* 💓 Heartbeat Sync */}
          <DraggableItem defaultClass="relative md:absolute md:left-[80%] md:top-[85%]" rotation={5} delay={1}>
            <HeartbeatSync />
          </DraggableItem>

        </div>
      </div>
    </>
  );
}

// --- SUB-COMPONENTS ---

const UncatchableQuestion = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [saidYes, setSaidYes] = useState(false);

  const moveNo = (e: any) => {
    e.preventDefault();
    setNoPosition({
      x: (Math.random() - 0.5) * 150, 
      y: (Math.random() - 0.5) * 100, 
    });
  };

  return (
    <div className="bg-white p-6 shadow-2xl rounded-sm w-64 border border-gray-100 flex flex-col items-center text-center">
      <h3 className="font-serif italic text-lg text-rose-900 mb-4">
        {saidYes ? "I knew you'd say yes! 🥰" : "Will you be my girl for another year?"}
      </h3>
      {!saidYes && (
        <div className="flex gap-4 relative w-full justify-center h-10">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaidYes(true)}
            className="bg-rose-500 text-white px-4 py-2 rounded-full font-sans text-sm tracking-wide z-10 hover:bg-rose-600 transition-colors"
          >
            Yes!
          </motion.button>
          <motion.button 
            animate={{ x: noPosition.x, y: noPosition.y }}
            onHoverStart={moveNo}
            onPointerDown={moveNo} 
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full font-sans text-sm tracking-wide absolute right-4 z-20"
          >
            No
          </motion.button>
        </div>
      )}
    </div>
  );
};

const HeartbeatSync = () => {
  const [isBeating, setIsBeating] = useState(false);

  const startHeartbeat = () => {
    setIsBeating(true);
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 100, 100]); 
    }
  };

  const stopHeartbeat = () => setIsBeating(false);

  return (
    <div className="bg-[#f3e8c9] p-5 shadow-2xl rounded-full w-36 h-36 border-2 border-[#e5d8b8] flex flex-col items-center justify-center cursor-pointer">
      <motion.div
        onPanStart={startHeartbeat}
        onPanEnd={stopHeartbeat}
        onPointerDown={startHeartbeat}
        onPointerUp={stopHeartbeat}
        onPointerLeave={stopHeartbeat}
        animate={isBeating ? { scale: [1, 1.2, 1, 1.2, 1] } : { scale: 1 }}
        transition={isBeating ? { repeat: Infinity, duration: 1 } : {}}
        className="text-rose-500 text-5xl drop-shadow-md mb-2"
      >
        <Heart fill="currentColor" size={48} />
      </motion.div>
      <span className="font-sans text-[10px] uppercase tracking-widest text-rose-800 font-bold opacity-70 text-center leading-tight">
        Press & Hold <br/> to feel
      </span>
    </div>
  );
};

const ReasonGenerator = () => {
  const reasons = [
    "The way your nose scrunches when you laugh.",
    "How you always know exactly how to comfort me.",
    "The beautiful sound of your voice.",
    "How safe I feel when I'm with you.",
    "Your absolutely breathtaking smile.",
    "The way you look at me when you think I'm not watching.",
    "Your kindness towards everyone you meet.",
    "How we can talk for hours and it feels like minutes.",
    "Because you are my favorite person in the universe."
  ];

  const [currentReason, setCurrentReason] = useState("Click the heart to see why I love you...");

  const generateReason = () => {
    let newReason = currentReason;
    while (newReason === currentReason) {
      newReason = reasons[Math.floor(Math.random() * reasons.length)];
    }
    setCurrentReason(newReason);
  };

  return (
    <div className="bg-[#fcf9f2] p-5 shadow-xl rounded-2xl w-64 md:w-72 border border-rose-200 flex flex-col items-center text-center">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={generateReason}
        className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-3 shadow-sm"
      >
        <Heart fill="currentColor" size={20} />
      </motion.button>
      <h3 className="font-sans uppercase text-[10px] md:text-xs tracking-widest text-rose-400 mb-1">Why I Love You</h3>
      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentReason}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-serif text-sm md:text-lg text-gray-800 italic"
          >
            &ldquo;{currentReason}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TypewriterLetter = ({ onClose }: { onClose: () => void }) => {
  const fullText = "My dearest,\n\nIf you are reading this, I want you to know how incredibly special you are to me. Building this little universe was just a small way to show you how much space you take up in my heart.\n\nEvery day with you is a gift, and I can't wait to make a million more memories together.\n\nHappy National Girlfriend's Day.\n\nForever yours,\nMe.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        className="bg-[#fcf9f2] w-full max-w-lg p-6 md:p-10 rounded-sm shadow-2xl relative max-h-[80vh] overflow-y-auto"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"><X size={24} /></button>
        <p className="font-serif text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {displayedText}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1 h-5 bg-rose-400 ml-1 translate-y-1" />
        </p>
      </motion.div>
    </motion.div>
  );
};

const CursorTrail = () => {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => [...prev.slice(-10), { id: idCounter++, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.8, scale: 1, y: item.y, x: item.x }}
            animate={{ opacity: 0, scale: 0, y: item.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-pink-300 drop-shadow-md text-xs"
            style={{ left: "-10px", top: "-10px" }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const DraggableItem = ({ children, defaultClass, rotation, delay }: any) => (
  <motion.div
    drag
    dragMomentum={false}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 15, stiffness: 100, delay }}
    whileHover={{ scale: 1.05, zIndex: 50 }}
    whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
    className={`${defaultClass} cursor-grab active:cursor-grabbing z-20`}
  >
    <motion.div
      animate={{ y: [-4, 4, -4], rotate: [rotation, rotation + 1.5, rotation - 1, rotation] }}
      transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.5, opacity: Math.random() * 0.5 + 0.3 }}
        animate={{ y: '-10vh', rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15 + Math.random() * 15, ease: "linear", delay: Math.random() * 10 }}
        className="absolute text-red-500 text-2xl md:text-3xl"
      >
        ❤
      </motion.div>
    ))}
  </div>
);