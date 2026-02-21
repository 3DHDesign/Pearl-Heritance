// ProjectsShowcase.tsx — Pearl Heritance
// Light surface bg, sticky scroll, smooth image fade, pure Tailwind 4

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number; number: string; title: string;
  location: string; category: string; description: string; image: string;
};

const projects: Project[] = [
  {
    id: 1, number: "01",
    title: "Kensington House", location: "Colombo 07, Sri Lanka",
    category: "Residential Buildings",
    description: "Thoughtful residential planning and construction for modern living — spaces that feel calm, premium and practical.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 2, number: "02",
    title: "Serenity Eco Lodge", location: "Galle, Sri Lanka",
    category: "Tourist Amenities",
    description: "Sustainable luxury with breathtaking coastal views and eco-conscious material choices throughout.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 3, number: "03",
    title: "Heritance Business Hub", location: "Rajagiriya, Sri Lanka",
    category: "Commercial Buildings",
    description: "Bold commercial complex delivering purpose-driven spatial planning and modern façades for growing enterprises.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 4, number: "04",
    title: "The Pearl Penthouse", location: "Colombo 03, Sri Lanka",
    category: "Interior Design",
    description: "Curated interior design balancing warmth, texture and function — transforming raw space into a refined experience.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const prevIndex = useRef(0);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    setImgOpacity(0);
    const t = setTimeout(() => { setImgOpacity(1); prevIndex.current = activeIndex; }, 180);
    return () => clearTimeout(t);
  }, [activeIndex]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${projects.length * 85}%`,
        pin: true, pinSpacing: true, anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * projects.length), projects.length - 1);
          setActiveIndex(idx);
        },
      });
    }, sectionRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((s) => s.kill()); };
  }, []);

  const p = projects[activeIndex];

  const scrollToProject = (idx: number) => {
    const st = ScrollTrigger.getAll().find((s) => s.trigger === sectionRef.current);
    if (!st) return;
    window.scrollTo({ top: st.start + (st.end - st.start) * (idx / projects.length) + 10, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden  "
      style={{ height: "100vh" }}
    >


      {/* ── MAIN LAYOUT ── */}
      <div className="container-wide h-full flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full py-10">

          {/* ══ LEFT — info ══ */}
          <div className="flex flex-col justify-center">

            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-7 h-[2px] rounded-full bg-[var(--navy)]" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--navy)] opacity-70">
                Featured Projects
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
            </div>

            {/* heading */}
            <h2 className="heading-font m-0 mb-9 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.1] text-[var(--navy)]">
              Beautiful Spaces With
              <br />
              <span className="text-[var(--sky)]">Lasting Appeal</span>
            </h2>

            {/* project list */}
            <div className="flex flex-col gap-1.5 mb-9">
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => scrollToProject(idx)}
                    className={[
                      "group relative flex items-center gap-5 px-5 py-4 rounded-2xl text-left cursor-pointer border transition-all duration-350",
                      isActive
                        ? "bg-white border-[var(--border)] shadow-[0_4px_20px_rgba(11,45,75,0.08)]"
                        : "bg-transparent border-transparent hover:bg-white/60 hover:border-[var(--border)]",
                    ].join(" ")}
                  >
                    {/* active left bar */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[var(--sky)] to-[var(--navy)]" />
                    )}

                    {/* number */}
                    <span className={[
                      "heading-font text-[22px] font-bold w-10 shrink-0 transition-colors duration-300",
                      isActive ? "text-[var(--sky)]" : "text-[var(--border)] group-hover:text-[var(--muted)]",
                    ].join(" ")}>
                      {proj.number}
                    </span>

                    {/* title + location */}
                    <div className="flex-1 min-w-0">
                      <h3 className={[
                        "heading-font m-0 text-[16px] font-semibold leading-tight transition-colors duration-300",
                        isActive ? "text-[var(--navy)]" : "text-[var(--muted)] group-hover:text-[var(--navy)]",
                      ].join(" ")}>
                        {proj.title}
                      </h3>
                      <p className="m-0 text-[11px] text-[var(--muted)] mt-0.5 tracking-wide opacity-70">{proj.location}</p>
                    </div>

                    {/* category pill */}
                    <span className={[
                      "hidden sm:block text-[9px] font-medium tracking-[0.14em] uppercase px-3 py-1 rounded-full border whitespace-nowrap transition-all duration-300",
                      isActive
                        ? "bg-[var(--sky)] border-[var(--sky)] text-white"
                        : "border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--sky)]/50",
                    ].join(" ")}>
                      {proj.category.split(" ")[0]}
                    </span>

                    {/* arrow */}
                    <svg
                      width="13" height="13" viewBox="0 0 16 16" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                      className={[
                        "shrink-0 transition-all duration-300",
                        isActive ? "text-[var(--sky)] opacity-100" : "text-[var(--border)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--navy)]",
                      ].join(" ")}
                    >
                      <path d="M3 13L13 3M13 3H6M13 3V10" />
                    </svg>
                  </button>
                );
              })}
            </div>

            {/* footer row */}
            <div className="flex items-center justify-between">
              <Link
                to="/projects"
                className="
                  heading-font no-underline
                  inline-flex items-center gap-2.5
                  px-6 py-3 rounded-full
                  bg-[var(--navy)] text-white text-[13px] font-semibold
                  shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                  transition-all duration-300
                  hover:bg-[var(--sky)] hover:scale-105
                  active:scale-95
                "
              >
                View All Projects
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13L13 3M13 3H6M13 3V10" />
                </svg>
              </Link>

              {/* counter */}
              <div className="flex items-baseline gap-1.5">
                <span className="heading-font text-[28px] font-bold text-[var(--navy)] leading-none">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[var(--muted)] text-[14px]">/</span>
                <span className="text-[var(--muted)] text-[14px]">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — image ══ */}
          <div className="relative">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_24px_64px_rgba(11,45,75,0.18)]">

              {projects.map((proj, idx) => (
                <img
                  key={proj.id}
                  src={proj.image}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: idx === activeIndex ? imgOpacity : 0, transition: "opacity 0.35s ease" }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/55 via-transparent to-transparent pointer-events-none" />

              {/* category badge */}
              <div className="absolute top-5 left-5 z-20">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky)]" />
                  <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-white">{p.category}</span>
                </div>
              </div>

              {/* number */}
              <div className="absolute top-5 right-5 z-20">
                <span className="heading-font text-[13px] font-semibold text-white/50">
                  {p.number} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* bottom info */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 p-6"
                style={{ opacity: imgOpacity, transition: "opacity 0.35s ease" }}
              >
                <p className="m-0 mb-1 text-[11px] font-medium tracking-wide text-white/55">{p.location}</p>
                <h3 className="heading-font m-0 mb-2 text-[20px] font-bold text-white leading-tight">{p.title}</h3>
                <p className="m-0 text-[12px] leading-relaxed text-white/60 max-w-xs">{p.description}</p>
              </div>

              {/* progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
                <div
                  className="h-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                />
              </div>
            </div>

            {/* dot indicators */}
            <div className="flex gap-2 mt-4 justify-center">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToProject(i)}
                  className={[
                    "h-1.5 rounded-full transition-all duration-400 border-none cursor-pointer",
                    i === activeIndex ? "w-8 bg-[var(--sky)]" : "w-3 bg-[var(--border)] hover:bg-[var(--muted)]",
                  ].join(" ")}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right edge progress */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[var(--border)] z-20">
        <div
          className="w-full bg-gradient-to-b from-[var(--sky)] to-[var(--navy)] transition-all duration-300"
          style={{ height: `${((activeIndex + 1) / projects.length) * 100}%` }}
        />
      </div>

    </section>
  );
}