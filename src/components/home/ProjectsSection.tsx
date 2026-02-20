import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  tag: string;
  title: string;
  image: string;
  year: string;
  location: string;
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const leftRefs = useRef<HTMLDivElement[]>([]);
  const rightRefs = useRef<HTMLDivElement[]>([]);

  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        tag: "RESIDENCES",
        title: "Residential Buildings",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
        year: "2024",
        location: "Milan, IT",
      },
      {
        id: 2,
        tag: "ESTATES",
        title: "Tourist Amenities & Eco-Friendly Buildings",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80",
        year: "2023",
        location: "Geneva, CH",
      },
      {
        id: 3,
        tag: "COMMERCIAL",
        title: "Commercial & Other Buildings",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
        year: "2023",
        location: "Berlin, DE",
      },
      {
        id: 4,
        tag: "INTERIOR",
        title: "Interior",
        image:
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1800&q=80",
        year: "2024",
        location: "Paris, FR",
      },
    ],
    []
  );

  const leftProjects = useMemo(
    () => projects.filter((_, i) => i % 2 === 0),
    [projects]
  );
  const rightProjects = useMemo(
    () => projects.filter((_, i) => i % 2 === 1),
    [projects]
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.normalizeScroll(true);

    const ctx = gsap.context(() => {
      const leftCards = leftRefs.current.filter(Boolean);
      const rightCards = rightRefs.current.filter(Boolean);

      leftCards.forEach((card, i) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          zIndex: i + 1,
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 60,
          scale: i === 0 ? 1 : 0.97,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });
      });

      rightCards.forEach((card, i) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          zIndex: i + 1,
          opacity: 0,
          y: 60,
          scale: 0.97,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });
      });

      const steps = projects.length;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: `+=${steps * 650}`,
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(Math.floor(self.progress * steps), steps - 1);
            setActiveIndex(index);
          },
          snap: {
            snapTo: (value) => {
              const snapPoints = steps - 1;
              if (snapPoints <= 0) return value;
              return Math.round(value * snapPoints) / snapPoints;
            },
            duration: { min: 0.25, max: 0.5 },
            delay: 0.02,
            ease: "power2.inOut",
          },
        },
      });

      const revealCard = (card: HTMLElement) => {
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.55 }, ">+=0.18")
          .to(card, { scale: 1.01, duration: 0.25, ease: "power2.out" }, "<+=0.05")
          .to(card, { scale: 1, duration: 0.25, ease: "power2.out" }, "<+=0.12");
      };

      const pushBack = (card: HTMLElement) => {
        tl.to(card, { scale: 0.96, opacity: 0.72, duration: 0.45 }, "<");
      };

      const maxPairs = Math.max(leftCards.length, rightCards.length);
      for (let i = 0; i < maxPairs; i++) {
        if (leftCards[i]) {
          if (i > 0 && leftCards[i - 1]) pushBack(leftCards[i - 1]);
          revealCard(leftCards[i]);
        }
        if (rightCards[i]) {
          if (i > 0 && rightCards[i - 1]) pushBack(rightCards[i - 1]);
          revealCard(rightCards[i]);
        }
      }
    }, sectionRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 420px at 15% 20%, rgba(42,167,223,0.12), transparent 55%), linear-gradient(145deg, var(--bg), var(--surface))",
      }}
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          
          {/* LEFT PANEL */}
          <div className="flex flex-col h-full py-12 px-5 sm:px-8 lg:py-14 lg:px-12 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-0.5 bg-[var(--sky)] rounded-full" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--sky)]">
                  Selected Works
                </span>
              </div>

              <h2 className="heading-font text-[var(--text)] text-4xl md:text-5xl font-semibold leading-[1.1]">
                Luxury <br />
                <span className="text-[var(--sky)] relative">
                  Collection
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[var(--sky)]/30 rounded-full" />
                </span>
              </h2>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-[360px]">
                Precision, craft, and calm — every project a study in architectural restraint.
              </p>
            </div>

            {/* Left card stack */}
            <div className="relative flex-1 min-h-0">
              {leftProjects.map((p, i) => {
                const globalIndex = i * 2;
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      if (el) leftRefs.current[i] = el;
                    }}
                    className="absolute inset-0 group"
                  >
                    <ProjectCard
                      p={p}
                      index={globalIndex}
                      isActive={activeIndex === globalIndex}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-[var(--muted)]">
                  <span className="text-[var(--sky)] font-bold">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-[var(--border)]">/</span>
                  {String(projects.length).padStart(2, "0")}
                </div>

                <div className="text-xs font-semibold tracking-[0.16em] uppercase text-[var(--muted)]">
                  {projects[activeIndex]?.location}
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-1 bg-[var(--border)]/50 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-all duration-500"
                  style={{
                    width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col h-full py-12 px-5 sm:px-8 lg:py-14 lg:px-12">
            {/* Top tags */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-wrap gap-4">
                {projects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="text-[10px] font-bold tracking-[0.16em] uppercase cursor-default transition-all duration-300"
                    style={{
                      color: idx === activeIndex ? "var(--sky)" : "var(--muted)",
                      borderBottom:
                        idx === activeIndex
                          ? "2px solid var(--sky)"
                          : "2px solid transparent",
                      paddingBottom: 6,
                    }}
                  >
                    {p.tag}
                  </div>
                ))}
              </div>

              <button className="group relative overflow-hidden rounded-full bg-[var(--navy)] text-white text-[10px] tracking-[0.14em] uppercase py-2.5 px-5 font-semibold hover:bg-[var(--sky)] transition-all duration-300 shadow-md hover:shadow-lg">
                <span className="relative z-10">View All</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>

            {/* Right card stack */}
            <div className="relative flex-1 min-h-0">
              {rightProjects.map((p, i) => {
                const globalIndex = i * 2 + 1;
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      if (el) rightRefs.current[i] = el;
                    }}
                    className="absolute inset-0 group"
                  >
                    <ProjectCard
                      p={p}
                      index={globalIndex}
                      isActive={activeIndex === globalIndex}
                    />
                  </div>
                );
              })}

              {/* Placeholder */}
              {activeIndex % 2 === 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--sky)] to-transparent" />
                    <div className="text-xs font-bold tracking-[0.22em] uppercase text-[var(--muted)]">
                      Scroll to explore
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom dots */}
            <div className="mt-6 flex items-center gap-2 justify-end">
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: idx === activeIndex ? 28 : 6,
                    height: 6,
                    background:
                      idx === activeIndex 
                        ? "linear-gradient(90deg, var(--sky), var(--navy))" 
                        : "rgba(15,23,42,0.1)",
                    boxShadow: idx === activeIndex ? "0 0 10px rgba(42,167,223,0.3)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  index,
  isActive,
}: {
  p: Project;
  index: number;
  isActive: boolean;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-white group-hover:shadow-3xl transition-shadow duration-300">
      <img 
        src={p.image} 
        alt={p.title} 
        className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-1000 saturate-[0.95] group-hover:saturate-105" 
        loading="lazy" 
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/20 via-40% to-transparent pointer-events-none" />

      {/* Top meta */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/40 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--navy)] shadow-sm">
          {p.tag}
        </div>
        <div className="bg-black/35 backdrop-blur-sm border border-white/20 px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] text-white/90">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Explore button */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-20 w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm border border-white/60 text-[var(--navy)] shadow-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-500"
        role="button" 
        aria-label="View project"
      >
        <span className="text-[10px] font-semibold tracking-[0.12em] uppercase">VIEW</span>
        <span className="text-sm opacity-80">↗</span>
      </div>

      {/* Bottom meta */}
      <div className="absolute left-0 right-0 bottom-0 p-5 z-10 bg-gradient-to-t from-black/40 to-transparent rounded-b-2xl">
        {isActive && (
          <div className="absolute left-5 right-5 bottom-2 h-0.5 bg-[var(--sky)] rounded-full animate-[projLine_0.5s_cubic-bezier(.22,1,.36,1)_forwards] origin-left" />
        )}
        <h3 className="heading-font text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 drop-shadow-lg">
          {p.title}
        </h3>
        <div className="flex items-center justify-between gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[var(--sky)]" />
            {p.location}
          </span>
          <span className="font-mono">{p.year}</span>
        </div>
      </div>
    </div>
  );
}