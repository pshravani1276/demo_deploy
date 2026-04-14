"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const TOTAL_FRAMES = 176;
const SEQUENCE_PATH = (i: number) =>
  `/sequence/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

interface Beat {
  id: string;
  startPct: number;
  endPct: number;
  title: string;
  subtitle: string;
  isLast?: boolean;
}

const BEATS: Beat[] = [
  {
    id: "a",
    startPct: 0,
    endPct: 20,
    title: "THE FLOATING\nCAKE HOUSE",
    subtitle: "Gravity is the only ingredient we left out.",
  },
  {
    id: "b",
    startPct: 25,
    endPct: 45,
    title: "THE DESCENT",
    subtitle: "A singular cherry meets a landscape of velvet chocolate.",
  },
  {
    id: "c",
    startPct: 50,
    endPct: 75,
    title: "CULINARY\nIMPACT",
    subtitle: "An explosion of whipped cream captured in frozen time.",
  },
  {
    id: "d",
    startPct: 80,
    endPct: 100,
    title: "SURRENDER TO\nSWEETNESS.",
    subtitle: "",
    isLast: true,
  },
];

/* ─────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────── */
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Decorative ring */}
      <div className="relative mb-10">
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-20">
          <circle
            cx="60" cy="60" r="54"
            fill="none" stroke="#E11D48" strokeWidth="1"
            strokeDasharray="4 8"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-playfair text-4xl font-bold text-shimmer"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            V
          </span>
        </div>
      </div>

      <p
        className="mb-1 text-xs tracking-[0.3em] text-[#52525b] uppercase"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Velvet &amp; Void
      </p>
      <p
        className="mb-8 text-[10px] tracking-[0.2em] text-[#3f3f46] uppercase"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Preparing the experience
      </p>

      {/* Bar */}
      <div className="relative w-48 h-px bg-[#27272a]">
        <div
          className="absolute left-0 top-0 h-full bg-[#E11D48] loading-bar transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        className="mt-4 text-[11px] tabular-nums text-[#52525b]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BEAT TEXT OVERLAY
───────────────────────────────────────────── */
function BeatText({
  beat,
  scrollPct,
}: {
  beat: Beat;
  scrollPct: number;
}) {
  const range = beat.endPct - beat.startPct;
  const local = (scrollPct - beat.startPct) / range; // 0 → 1 within beat
  const visible = scrollPct >= beat.startPct && scrollPct <= beat.endPct;

  // Fade in first 20%, hold middle, fade out last 20%
  let opacity = 0;
  let y = 30;

  if (visible) {
    if (local < 0.2) {
      opacity = local / 0.2;
      y = 30 * (1 - local / 0.2);
    } else if (local > 0.8) {
      opacity = 1 - (local - 0.8) / 0.2;
      y = -30 * ((local - 0.8) / 0.2);
    } else {
      opacity = 1;
      y = 0;
    }
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end pb-16 pl-10 md:pl-20"
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        transition: "opacity 0.05s linear, transform 0.05s linear",
        willChange: "opacity, transform",
      }}
    >
      {/* Accent line */}
      <div
        className="mb-4 h-px w-10 bg-[#E11D48]"
        style={{ opacity: opacity > 0.1 ? 1 : 0, transition: "opacity 0.3s" }}
      />

      <h2
        className="mb-3 whitespace-pre-line text-shimmer leading-tight"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          letterSpacing: "-0.01em",
        }}
      >
        {beat.title}
      </h2>

      {beat.subtitle && (
        <p
          className="max-w-xs text-[#A1A1AA] md:max-w-sm"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          {beat.subtitle}
        </p>
      )}

      {beat.isLast && (
        <motion.a
          href="#order"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: opacity, y: 0 }}
          className="mt-6 group flex items-center gap-3 cursor-pointer"
          style={{ pointerEvents: opacity > 0.5 ? "auto" : "none" }}
        >
          <span
            className="rounded-none border border-[#E11D48] bg-transparent px-7 py-3 text-xs tracking-[0.25em] text-[#E11D48] uppercase transition-all duration-300 group-hover:bg-[#E11D48] group-hover:text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Order the Velvet Slice
          </span>
          <svg
            className="w-4 h-4 text-[#E11D48] transition-transform duration-300 group-hover:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV / HEADER
───────────────────────────────────────────── */
function NavBar({ scrollPct }: { scrollPct: number }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-700"
      style={{ opacity: 1 }}
    >
      <span
        className="text-xs tracking-[0.35em] text-[#52525b] uppercase"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Velvet &amp; Void
      </span>

      <div className="flex items-center gap-1">
        {BEATS.map((b) => (
          <div
            key={b.id}
            className="h-px w-5 transition-all duration-500"
            style={{
              background:
                scrollPct >= b.startPct && scrollPct <= b.endPct
                  ? "#E11D48"
                  : "#27272a",
              width:
                scrollPct >= b.startPct && scrollPct <= b.endPct
                  ? "24px"
                  : "12px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL INDICATOR
───────────────────────────────────────────── */
function ScrollIndicator({ scrollPct }: { scrollPct: number }) {
  return (
    <div
      className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-2 transition-opacity duration-500"
      style={{ opacity: scrollPct < 5 ? 1 : 0 }}
    >
      <span
        className="text-[9px] tracking-[0.25em] text-[#3f3f46] uppercase rotate-90 origin-center"
        style={{ fontFamily: "'Inter', sans-serif", writingMode: "vertical-rl" }}
      >
        Scroll
      </span>
      <div className="h-10 w-px overflow-hidden bg-[#27272a]">
        <div
          className="h-full w-full bg-[#E11D48] origin-top"
          style={{
            transform: "scaleY(1)",
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes scrollBounce {
          0%,100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN CAKE EXPERIENCE
───────────────────────────────────────────── */
export default function CakeExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  /* ── Scroll tracking ── */
  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  /* ── Update scrollPct for text overlays ── */
  useEffect(() => {
    return springProgress.on("change", (v) => {
      setScrollPct(v * 100);
    });
  }, [springProgress]);

  /* ── Frame index derived from spring ── */
  const frameIndex = useTransform(
    springProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  /* ── Draw frame on canvas ── */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const i = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, index)));
      if (i === lastFrameRef.current) return;
      lastFrameRef.current = i;

      const img = imagesRef.current[i];
      if (!img?.complete) return;

      // Fit the image to canvas maintaining aspect ratio
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  /* ── Subscribe to frame changes ── */
  useEffect(() => {
    if (!loaded) return;
    return frameIndex.on("change", drawFrame);
  }, [frameIndex, drawFrame, loaded]);

  /* ── Preload all frames ── */
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES });

    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (mounted) {
            loaded++;
            setLoadProgress((loaded / TOTAL_FRAMES) * 100);
            if (loaded === TOTAL_FRAMES) setLoaded(true);
          }
          resolve();
        };
        img.src = SEQUENCE_PATH(i);
        images[i] = img;
      });

    // Load in batches for performance
    const loadBatch = async () => {
      const batchSize = 8;
      for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
        const batch = Array.from(
          { length: Math.min(batchSize, TOTAL_FRAMES - i) },
          (_, k) => loadImage(i + k)
        );
        await Promise.all(batch);
        imagesRef.current = images;
      }
    };

    loadBatch();
    return () => { mounted = false; };
  }, []);

  /* ── Draw first frame once loaded ── */
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  /* ── Canvas size handling ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────*/
  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LoadingScreen progress={loadProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <NavBar scrollPct={scrollPct} />

      {/* Scroll indicator */}
      <ScrollIndicator scrollPct={scrollPct} />

      {/* 400vh scrollable wrapper */}
      <div ref={wrapperRef} style={{ height: "400vh", position: "relative" }}>
        {/* Sticky full-screen canvas container */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />

          {/* Vignette overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Beat overlays */}
          {BEATS.map((beat) => (
            <BeatText key={beat.id} beat={beat} scrollPct={scrollPct} />
          ))}
        </div>
      </div>

      {/* Footer section */}
      <footer
        id="order"
        className="relative bg-black px-10 md:px-20 py-24 border-t border-[#18181b]"
      >
        {/* Top rule */}
        <div className="mb-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#27272a]" />
          <span
            className="text-[10px] tracking-[0.3em] text-[#52525b] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Est. 2024
          </span>
          <div className="h-px flex-1 bg-[#27272a]" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3
              className="mb-4 text-shimmer"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              Velvet &amp; Void
            </h3>
            <p
              className="text-sm leading-relaxed text-[#52525b]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Anti-gravity desserts crafted in the dark.<br />
              Where physics surrenders to flavor.
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              className="mb-5 text-[10px] tracking-[0.3em] text-[#3f3f46] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Menu
            </p>
            {["The Velvet Slice", "Cherry Descent", "Ganache Explosion", "Whipped Abyss"].map((item) => (
              <p
                key={item}
                className="mb-3 cursor-pointer text-sm text-[#52525b] transition-colors hover:text-[#E11D48]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div>
            <p
              className="mb-5 text-[10px] tracking-[0.3em] text-[#3f3f46] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Reserve
            </p>
            <p
              className="mb-6 text-sm leading-relaxed text-[#52525b]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Limited floating slices available daily.<br />
              Reserve yours before gravity wins.
            </p>
            <a
              href="#order"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="rounded-none border border-[#E11D48] bg-transparent px-7 py-3 text-xs tracking-[0.25em] text-[#E11D48] uppercase transition-all duration-300 group-hover:bg-[#E11D48] group-hover:text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Order the Velvet Slice
              </span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-[10px] tracking-widest text-[#27272a]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © 2024 Velvet &amp; Void. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-widest text-[#27272a]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Anti-Gravity Division
          </p>
        </div>
      </footer>
    </>
  );
}
