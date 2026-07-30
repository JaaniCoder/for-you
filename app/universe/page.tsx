"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Float,
  Html,
  OrbitControls,
} from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import Link from "next/link";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function UniversePage() {
  const [isCometOpen, setIsCometOpen] = useState(false);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);

  return (
    <main className="w-screen h-dvh bg-black overflow-hidden relative">
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 text-white/50 hover:text-white font-serif italic text-base md:text-xl transition-colors"
      >
        ← Back to Scrapbook
      </Link>

      <AmbientAudio />

      {/* 💫 OVERLAYS: Outside of the Canvas so they render correctly */}
      <AnimatePresence>
        {isCometOpen && <CometMessage onClose={() => setIsCometOpen(false)} />}
        {isCapsuleOpen && (
          <TimeCapsuleModal onClose={() => setIsCapsuleOpen(false)} />
        )}
      </AnimatePresence>

      <div className="absolute bottom-16 md:bottom-10 w-full text-center z-40 pointer-events-none">
        <h1 className="text-pink-300 font-serif italic text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
          My whole universe ❤️
        </h1>
        <p className="text-white/60 text-xs md:text-sm mt-2">
          Drag to explore the stars
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 20] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />

          <CameraIntro />
          <ParticleGalaxy />
          <MagicalCore />

          <MagicalComet onCatch={() => setIsCometOpen(true)} />
          <TimeCapsule
            position={[0, -2.5, 2]}
            onOpen={() => setIsCapsuleOpen(true)}
          />

          {[...Array(15)].map((_, i) => (
            <ShootingStar key={i} />
          ))}

          <FloatingPhoto 
            position={[-1.8, 1.2, -1]} 
            rotation={[0, 0.2, -0.1]} 
            imgUrl="/photo1.jpeg" 
            text="Our Beginning" 
            message="I still remember exactly what you were wearing on this day. My heart hasn't stopped beating fast since."
            cropClass="object-[50%_5%] scale-[1.1]" 
          />
          <FloatingPhoto 
            position={[1.8, -1.2, 0]} 
            rotation={[0, -0.2, 0.1]} 
            imgUrl="/photo2.jpeg" 
            text="You & Me" 
            message="You are the most beautiful thing that has ever happened to me. Thank you for existing." 
            cropClass="object-[15%_85%] scale-[1.6]" 
          />
          <FloatingPhoto 
            position={[0, 2.2, -1.5]} 
            rotation={[0.1, 0, 0]} 
            imgUrl="/photo3.jpeg" 
            text="Forever" 
            message="No matter where we are in the universe, my soul will always look for yours. Happy Girlfriend's Day." 
            cropClass="object-[90%_45%] scale-[1.6]" 
          />
          <FloatingHeart position={[-3, -3, 1]} scale={0.5} speed={2} />
          <FloatingHeart position={[3, 3, -2]} scale={0.3} speed={1.5} />
          <FloatingHeart position={[0, -4, -1]} scale={0.6} speed={2.5} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxDistance={12}
            minDistance={3}
          />
        </Suspense>
      </Canvas>
    </main>
  );
}

// --- AUDIO COMPONENT ---
function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-12 md:bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/audio.mp3" loop />
      <button
        onClick={toggleMusic}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,192,203,0.3)]"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

// --- TIME CAPSULE COMPONENT ---
function TimeCapsule({
  position,
  onOpen,
}: {
  position: any;
  onOpen: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group
        position={position}
        onPointerDown={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
      >
        <mesh ref={meshRef}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#fcd34d"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <Html
          center
          transform
          distanceFactor={5}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex flex-col items-center pointer-events-none">
            <div className="text-amber-300 text-3xl drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
              🔒
            </div>
            <div className="mt-2 text-white/90 text-[10px] font-sans tracking-widest uppercase text-center whitespace-nowrap bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
              Time Capsule
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// --- COMET COMPONENT ---
function MagicalComet({ onCatch }: { onCatch: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.x = Math.sin(t * 0.4) * 8;
      groupRef.current.position.y = Math.sin(t * 0.2) * 3;
      groupRef.current.position.z = Math.cos(t * 0.4) * 8;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        onCatch();
      }}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "auto")}
    >
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#ff7eb3"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <pointLight color="#ff7eb3" intensity={15} distance={20} />

      <Html
        center
        transform
        distanceFactor={5}
        style={{ pointerEvents: "none" }}
      >
        <div className="pointer-events-none mt-10 text-white/90 text-xs font-sans tracking-widest uppercase animate-pulse bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 whitespace-nowrap">
          Catch Me ✨
        </div>
      </Html>
    </group>
  );
}

// --- MODALS ---
function CometMessage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-linear-to-b from-[#1a0b2e] to-black border border-pink-500/30 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(244,114,182,0.4)] text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-xl"
        >
          ✕
        </button>
        <div className="text-5xl mb-4 animate-bounce">🪐</div>
        <h2 className="font-serif italic text-2xl text-pink-300 mb-4">
          A message from the stars...
        </h2>
        <div className="w-full h-px bg-pink-500/20 my-4" />
        <p className="text-white/80 leading-relaxed font-serif text-lg">
          &ldquo;To the girl who holds my universe together. Thank you for
          making every day feel like magic. Here&apos;s to us-today, tomorrow,
          and across all galaxies.&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
}

function TimeCapsuleModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-linear-to-b from-amber-900/40 to-black border border-amber-500/30 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(251,191,36,0.2)] text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer text-xl"
        >
          ✕
        </button>
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="font-serif italic text-2xl text-amber-300 mb-2">
          Locked.
        </h2>
        <p className="text-white/60 text-sm font-sans tracking-widest uppercase mb-6">
          Unlocks: August 1st, 2027
        </p>
        <div className="w-full h-px bg-amber-500/20 my-4" />
        <p className="text-white/80 leading-relaxed font-serif text-lg">
          &ldquo;I&apos;ve placed a letter in here for you. We have a whole year
          of memories to make before you can read it. See you next year.&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
}

// --- CORE 3D COMPONENTS ---
function FloatingPhoto({
  position,
  rotation,
  imgUrl,
  text,
  message,
  cropClass = "",
}: any) {
  const [hovered, setHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Float
      speed={hovered ? 0.5 : 1.5}
      rotationIntensity={0.5}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <group position={position} rotation={rotation}>
        <Html transform center distanceFactor={4} zIndexRange={[100, 0]}>
          <div
            style={{ perspective: "1000px", WebkitPerspective: "1000px" }}
            className="w-40 md:w-48 h-64 md:h-76"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{
                rotateY: isFlipped ? 180 : 0,
                scale: hovered || isFlipped ? 1.08 : 1,
              }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
              style={{
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              className="relative w-full h-full cursor-pointer"
            >
              <div
                className={`absolute inset-0 w-full h-full bg-white p-2 md:p-3 pb-8 rounded-sm flex flex-col items-center transition-shadow duration-300 ${hovered || isFlipped ? "shadow-[0_0_30px_rgba(255,192,203,0.8)]" : "shadow-[0_0_15px_rgba(255,192,203,0.3)]"}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  zIndex: isFlipped ? 0 : 10,
                  transform: "rotateY(0deg)",
                }}
              >
                <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-2 pointer-events-none rounded-sm relative">
                  <Image
                    src={imgUrl}
                    alt="memory"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={`object-cover ${cropClass}`}
                  />
                </div>
                <span className="font-serif italic text-pink-900 text-lg md:text-xl mt-1">
                  {text}
                </span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute bottom-2 md:bottom-3 text-[8px] md:text-[10px] text-pink-400 font-sans tracking-widest uppercase"
                >
                  Tap to flip ✨
                </motion.span>
              </div>
              <div
                className={`absolute inset-0 w-full h-full bg-[#fdfbf3] p-4 md:p-5 rounded-sm flex flex-col items-center justify-center border border-pink-100 transition-shadow duration-300 ${hovered || isFlipped ? "shadow-[0_0_30px_rgba(255,192,203,0.8)]" : "shadow-[0_0_15px_rgba(255,192,203,0.3)]"}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  zIndex: isFlipped ? 10 : 0,
                  backgroundImage:
                    'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                }}
              >
                <p className="font-serif italic text-pink-900 text-center leading-relaxed text-sm md:text-base">
                  &ldquo;{message}&rdquo;
                </p>
                <div className="mt-4 text-pink-300 text-xl md:text-2xl">❤️</div>
              </div>
            </motion.div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function CameraIntro() {
  useFrame((state) => {
    state.camera.position.z += (8 - state.camera.position.z) * 0.02;
  });
  return null;
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const [startPos] = useState(() => [
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30,
    -20 - Math.random() * 20,
  ]);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z += delta * 25;
      if (ref.current.position.z > 10) {
        ref.current.position.z = -30;
        ref.current.position.x = (Math.random() - 0.5) * 30;
        ref.current.position.y = (Math.random() - 0.5) * 30;
      }
    }
  });
  return (
    <mesh ref={ref} position={startPos as [number, number, number]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
}

function MagicalCore() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.1;
      ref.current.scale.set(scale, scale, scale);
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });
  return (
    <group ref={ref}>
      <pointLight color="#ff1eb3" intensity={10} distance={15} />
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#ff7eb3" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffc0cb" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ParticleGalaxy(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(4000 * 3), { radius: 7 }),
  );
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ff7eb3"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingHeart({ position, scale, speed }: any) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={3}>
      <group position={position} scale={scale}>
        <Html center transform>
          <div className="text-pink-500 text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-pulse">
            ❤️
          </div>
        </Html>
      </group>
    </Float>
  );
}
