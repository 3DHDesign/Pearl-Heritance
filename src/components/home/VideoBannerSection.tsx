// VideoBannerSection.tsx — Pearl Heritance
// Premium video banner — dark overlay, large play button, side.svg top-right preserved

import { useEffect, useState } from "react";
import sideSvg from "../../assets/images/side.svg";

export default function VideoBannerSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const youtubeId = "zumJJUL_ruM";
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container-wide">

        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] rounded-full bg-[var(--navy)]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--navy)] opacity-70">
              Visual Experience
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
            </span>
            <div className="w-6 h-[2px] rounded-full bg-[var(--navy)]" />
          </div>
          <h2 className="heading-font m-0 text-[clamp(24px,3.5vw,42px)] font-bold leading-[1.15] text-[var(--navy)] max-w-2xl">
            A quick look into our design
            <br />
            <span className="text-[var(--sky)]">approach and quality</span>
          </h2>
          <p className="m-0 mt-3 text-[14px] text-[var(--muted)] max-w-md">
            Video Tour — See our craftsmanship in action
          </p>
        </div>

        {/* ── BANNER ── */}
        <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_64px_rgba(11,45,75,0.18)] border border-[var(--border)]">

          {/* background image */}
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Interior showcase"
            className="w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] object-cover block"
          />

          {/* dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/65 via-[var(--navy)]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/30 via-transparent to-transparent" />

          {/* ✅ side.svg — top-right, preserved exactly as requested */}
          <img
            src={sideSvg}
            alt=""
            aria-hidden="true"
            className="absolute right-[-45px] top-0 z-10 w-[280px] sm:w-[360px] md:w-[460px] lg:w-[520px] max-w-none pointer-events-none select-none"
            style={{ filter: "brightness(0) invert(1)", mixBlendMode: "screen",   }}
          />

          {/* ── PLAY BUTTON ── */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group"
            aria-label="Play video"
          >
            {/* pulse rings */}
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            <span className="absolute -inset-3 rounded-full border border-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />

            {/* button circle */}
            <div className="
              relative w-20 h-20 md:w-24 md:h-24 rounded-full
              bg-white
              flex items-center justify-center
              shadow-[0_8px_40px_rgba(11,45,75,0.35)]
              transition-all duration-350
              group-hover:scale-110 group-hover:shadow-[0_16px_56px_rgba(42,167,223,0.45)]
              active:scale-95
            ">
              {/* play triangle */}
              <div className="ml-1.5 w-0 h-0 border-y-[11px] border-y-transparent border-l-[18px] border-l-[var(--navy)] transition-transform duration-300 group-hover:scale-110" />
            </div>
          </button>

          {/* ── BOTTOM LEFT LABEL ── */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
              <span className="text-white text-[12px] font-medium tracking-wide">
                Click to watch project showcase
              </span>
            </div>
          </div>

          {/* ── BOTTOM RIGHT DURATION BADGE ── */}
          <div className="absolute bottom-6 right-6 z-20">
            <div className="bg-[var(--navy)]/70 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5">
              <span className="text-white/80 text-[11px] font-medium tracking-wider">
                Pearl Heritance — Showcase
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── VIDEO MODAL ── */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-[var(--navy)]/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* modal top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/70 to-transparent">
              <span className="text-white text-[13px] font-medium flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
                </span>
                Now Playing — Project Showcase
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-[13px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* iframe */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="Pearl Heritance Project Showcase"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* modal bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-5 py-2.5 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
              <span className="text-white/70 text-[11px] tracking-wide">Pearl Heritance Collection</span>
              <span className="text-white/40 text-[11px]">Premium Design & Craftsmanship</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}