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

      // Init stacks
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

      // Order: L0 -> R0 -> L1 -> R1
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
          "radial-gradient(900px 420px at 15% 20%, rgba(42,167,223,0.10), transparent 55%), linear-gradient(var(--bg), var(--surface))",
      }}
    >
      {/* CSS scoped to this component */}
      <style>{`
        .proj-grid{
          display:grid;
          grid-template-columns: 1fr;
          height: 100vh;
        }
        @media (min-width: 1024px){
          .proj-grid{
            grid-template-columns: 1fr 1fr;
          }
        }

        .proj-panel{
          display:flex;
          flex-direction:column;
          height:100%;
          padding: 48px 22px 36px;
        }
        @media (min-width: 1024px){
          .proj-panel{
            padding: 56px 42px 40px;
          }
        }

        .proj-left{
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 1024px){
          .proj-left{
            border-right: 1px solid var(--border);
            border-bottom: none;
          }
        }

        .proj-eyebrow{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom: 10px;
          color: var(--sky);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .proj-eyebrow:before{
          content:"";
          width: 26px;
          height: 2px;
          background: var(--sky);
          border-radius: 999px;
        }

        .proj-desc{
          margin-top: 12px;
          font-size: 14px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 360px;
        }

        .proj-progress-line{
          position: relative;
          width: 100%;
          height: 3px;
          background: rgba(15,23,42,0.10);
          border-radius: 999px;
          overflow: hidden;
        }
        .proj-progress-fill{
          position:absolute;
          left:0; top:0;
          height:100%;
          background: var(--sky);
          border-radius: 999px;
          transition: width .45s cubic-bezier(.22,1,.36,1);
        }

        .proj-card-inner{
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.70);
          box-shadow: 0 26px 70px -42px rgba(2,6,23,0.35);
          background: #fff;
        }

        .proj-card-inner img{
          width:100%;
          height:100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform .9s cubic-bezier(.22,1,.36,1);
        }

        .proj-card-outer:hover .proj-card-inner img{
          transform: scale(1.06);
        }

        /* Overlay to keep text readable */
        .proj-overlay{
          position:absolute;
          inset:0;
          background: linear-gradient(to top, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.12) 45%, transparent 75%);
          z-index:2;
        }

        .proj-top-meta{
          position:absolute;
          top:16px;
          left:16px;
          right:16px;
          z-index:3;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
        }

        .proj-pill{
          display:inline-flex;
          align-items:center;
          gap:8px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(15,23,42,0.10);
          padding: 6px 12px;
          border-radius: 999px;
          backdrop-filter: blur(10px);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(15,23,42,0.75);
        }

        .proj-index{
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(15,23,42,0.10);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .12em;
          color: rgba(15,23,42,0.55);
          backdrop-filter: blur(10px);
        }

        .proj-explore{
          position:absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%) scale(.92);
          opacity: 0;
          z-index: 5;
          width: 84px;
          height: 84px;
          border-radius: 999px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          gap:4px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(15,23,42,0.12);
          color: var(--navy);
          box-shadow: 0 25px 70px -38px rgba(2,6,23,0.45);
          transition: all .35s cubic-bezier(.22,1,.36,1);
          cursor:pointer;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          font-size: 11px;
        }
        .proj-card-outer:hover .proj-explore{
          opacity: 1;
          transform: translate(-50%,-50%) scale(1);
        }

        .proj-meta{
          position:absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 18px 18px;
          z-index: 3;
        }

        .proj-title{
          font-family: var(--font-heading);
          font-size: clamp(18px, 2.1vw, 26px);
          font-weight: 600;
          line-height: 1.2;
          color: #fff;
          margin: 0 0 10px 0;
          text-shadow: 0 14px 30px rgba(2,6,23,0.35);
        }

        .proj-meta-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap: 12px;
          font-size: 12px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          font-weight: 600;
        }

        .proj-active-line{
          position:absolute;
          left:18px;
          right:18px;
          bottom: 10px;
          height: 3px;
          border-radius: 999px;
          background: var(--sky);
          transform: scaleX(0);
          transform-origin: left;
          animation: projLine .55s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes projLine { to { transform: scaleX(1); } }
      `}</style>

      <div className="container-wide">
        <div className="proj-grid">
          {/* LEFT */}
          <div className="proj-panel proj-left">
            {/* Header */}
            <div className="mb-6">
              <div className="proj-eyebrow">Selected Works</div>

              <h2 className="heading-font text-[color:var(--text)] text-4xl md:text-5xl font-semibold leading-[1.05]">
                Luxury <br />
                <span className="text-[color:var(--sky)]">Collection</span>
              </h2>

              <p className="proj-desc">
                Precision, craft, and calm — every project a study in architectural restraint.
              </p>
            </div>

            {/* Left stack */}
            <div className="relative flex-1">
              {leftProjects.map((p, i) => {
                const globalIndex = i * 2;
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      if (el) leftRefs.current[i] = el;
                    }}
                    className="proj-card-outer"
                    style={{ position: "absolute", inset: 0 }}
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
                <div className="text-sm font-semibold text-[color:var(--muted)]">
                  <span className="text-[color:var(--sky)]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-[color:var(--muted)]">/</span>
                  {String(projects.length).padStart(2, "0")}
                </div>

                <div className="text-xs font-semibold tracking-[0.16em] uppercase text-[color:var(--muted)]">
                  {projects[activeIndex]?.location}
                </div>
              </div>

              <div className="proj-progress-line">
                <div
                  className="proj-progress-fill"
                  style={{
                    width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="proj-panel">
            {/* Top tags */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-wrap gap-3">
                {projects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="text-[10px] font-bold tracking-[0.16em] uppercase"
                    style={{
                      color: idx === activeIndex ? "var(--sky)" : "var(--muted)",
                      borderBottom:
                        idx === activeIndex
                          ? "2px solid var(--sky)"
                          : "2px solid transparent",
                      paddingBottom: 6,
                      transition: "all .25s ease",
                    }}
                  >
                    {p.tag}
                  </div>
                ))}
              </div>

              <button className="btn-accent text-[10px] tracking-[0.14em] uppercase py-2 px-4">
                View All
              </button>
            </div>

            {/* Right stack */}
            <div className="relative flex-1">
              {rightProjects.map((p, i) => {
                const globalIndex = i * 2 + 1;
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      if (el) rightRefs.current[i] = el;
                    }}
                    className="proj-card-outer"
                    style={{ position: "absolute", inset: 0 }}
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
                <div className="absolute inset-0 grid place-items-center opacity-60">
                  <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--muted)]">
                    Scroll to explore
                  </div>
                </div>
              )}
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center gap-2 justify-end">
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === activeIndex ? 26 : 6,
                    height: 6,
                    borderRadius: 999,
                    background:
                      idx === activeIndex ? "var(--sky)" : "rgba(15,23,42,0.14)",
                    transition: "all .4s cubic-bezier(.22,1,.36,1)",
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
    <div className="proj-card-inner">
      <img src={p.image} alt={p.title} loading="lazy" />

      <div className="proj-overlay" />

      {/* top meta */}
      <div className="proj-top-meta">
        <div className="proj-pill">{p.tag}</div>
        <div className="proj-index">{String(index + 1).padStart(2, "0")}</div>
      </div>

      {/* explore */}
      <div className="proj-explore" role="button" aria-label="View project">
        <span>VIEW</span>
        <span style={{ fontSize: 10, opacity: 0.75 }}>↗</span>
      </div>

      {/* bottom meta */}
      <div className="proj-meta">
        {isActive && <div className="proj-active-line" />}
        <h3 className="proj-title">{p.title}</h3>
        <div className="proj-meta-row">
          <span>{p.location}</span>
          <span>{p.year}</span>
        </div>
      </div>
    </div>
  );
}
