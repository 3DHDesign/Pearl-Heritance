// src/components/ProjectsParallax.tsx
import { useEffect, useMemo, useRef, useState } from "react";

type ProjectCard = {
  id: number;
  title: string;
  tag: string;
  imageUrl: string;
  offset: number; // parallax strength
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ProjectsParallax() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const cards: ProjectCard[] = useMemo(
    () => [
      {
        id: 1,
        tag: "RESIDENTIAL",
        title: "Residential Buildings",
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        offset: 22,
      },
      {
        id: 2,
        tag: "TOURISM / ECO",
        title: "Tourist Amenities & eco-friendly buildings",
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
        offset: 30,
      },
      {
        id: 3,
        tag: "COMMERCIAL",
        title: "Commercial & other buildings",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
        offset: 26,
      },
      {
        id: 4,
        tag: "INTERIOR",
        title: "Interior",
        imageUrl:
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80",
        offset: 34,
      },
    ],
    []
  );

  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const el = wrapRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        // progress: 0 when section top hits bottom of viewport, 1 when section bottom hits top
        const total = rect.height + vh;
        const progressed = vh - rect.top;
        const p = clamp(progressed / total, 0, 1);

        // map to -1..1 for nicer up/down motion
        const t = (p - 0.5) * 2;

        setY(t);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={wrapRef} className="w-full bg-white py-16 md:py-24">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="text-xs font-semibold tracking-[0.22em] uppercase text-[color:var(--muted)]">
            Projects
          </div>

          <h2 className="heading-font text-3xl md:text-5xl font-semibold leading-tight text-[color:var(--text)] text-right max-w-[820px]">
            View Our Luxury Collection Of <br />
            Interior Masterpieces
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {cards.map((c, idx) => {
            // alternate vertical positions like reference
            const baseShift = idx % 2 === 0 ? -22 : 22;
            const translate = (baseShift + y * c.offset) * 1; // px
            return (
              <article
                key={c.id}
                className={[
                  "relative rounded-[28px] overflow-hidden",
                  "bg-[color:var(--surface)] border border-[color:var(--border)]",
                  "shadow-[0_18px_60px_-30px_rgba(0,0,0,0.35)]",
                  idx % 2 === 0 ? "md:translate-y-6" : "md:-translate-y-6",
                ].join(" ")}
              >
                <div className="relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden">
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="h-[110%] w-full object-cover"
                    style={{
                      transform: `translateY(${translate}px)`,
                      transition: "transform 80ms linear",
                    }}
                    loading="lazy"
                  />

                  {/* dark overlay for readable text */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* top tag */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/85 text-[color:var(--text)] text-xs font-semibold px-4 py-2 rounded-full border border-white/40">
                      {c.tag}
                    </span>
                  </div>

                  {/* title */}
                  <div className="absolute left-6 right-6 bottom-6">
                    <h3 className="heading-font text-2xl md:text-3xl font-semibold text-white leading-snug">
                      {c.title}
                    </h3>

                    <div className="mt-3 inline-flex items-center gap-2 text-white/85 text-sm font-medium">
                      <span>Explore</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>

                  {/* top-right button */}
                  <button
                    type="button"
                    className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 transition"
                    aria-label="Open project"
                  >
                    ↗
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
