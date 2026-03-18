import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  getSelectedWorks,
  type SelectedWorksSection,
} from "../../api/Selectedworksapi";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_BASE = "https://admin.pearlhe.com/storage/";

const TAG_MAP: Record<number, string> = {
  0: "RESIDENCES",
  1: "TOURISM & ECO",
  2: "COMMERCIAL & OTHER BUILDINGS",
  3: "INTERIORS",
};

type Project = {
  id: string;
  tag: string;
  title: string;
  image: string;
  year: string;
  location: string;
  project_link: string | null;
};

function buildProjects(data: SelectedWorksSection): Project[] {
  return data.projects.map((p, i) => ({
    id: p.id,
    tag: TAG_MAP[i] ?? data.category_name,
    title: p.title,
    image: p.image_url?.startsWith("http")
      ? p.image_url
      : `${IMAGE_BASE}${p.image_url}`,
    year: p.year,
    location: p.location,
    project_link: p.project_link,
  }));
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [section, setSection] = useState<SelectedWorksSection | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const leftRefs = useRef<HTMLDivElement[]>([]);
  const rightRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    getSelectedWorks()
      .then((res) => {
        setSection(res.data);
        setProjects(buildProjects(res.data));
      })
      .catch(console.error);
  }, []);

  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (!sectionRef.current || !projects.length) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

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

  if (!section || !projects.length) return null;

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
        {/* MOBILE */}
        <div className="py-14 lg:hidden">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.5 w-7 rounded-full bg-[var(--sky)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--sky)]">
                {section.eyebrow}
              </span>
            </div>

            <h2 className="heading-font text-[var(--text)] text-4xl font-semibold leading-[1.08]">
              {section.title_line1}
              <br />
              <span className="relative text-[var(--sky)]">
                {section.title_line2}
                <span className="absolute -bottom-1 left-0 h-0.5 w-12 rounded-full bg-[var(--sky)]/30" />
              </span>
            </h2>

            <p className="mt-4 max-w-[340px] text-sm leading-relaxed text-[var(--muted)]">
              {section.description}
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1.08}
            spaceBetween={16}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="projects-mobile-swiper"
          >
            {projects.map((p, index) => (
              <SwiperSlide key={p.id}>
                <MobileProjectCard
                  p={p}
                  index={index}
                  total={projects.length}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex justify-center">
            <a
              href={section.view_all_link ?? "/projects"}
              className="rounded-full bg-[var(--navy)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[var(--sky)]"
            >
              {section.view_all_text}
            </a>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden h-screen grid-cols-1 lg:grid lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="flex h-full flex-col border-b border-[var(--border)] px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-0.5 w-7 rounded-full bg-[var(--sky)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--sky)]">
                  {section.eyebrow}
                </span>
              </div>

              <h2 className="heading-font text-[var(--text)] text-4xl font-semibold leading-[1.1] md:text-5xl">
                {section.title_line1} <br />
                <span className="relative text-[var(--sky)]">
                  {section.title_line2}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-12 rounded-full bg-[var(--sky)]/30" />
                </span>
              </h2>

              <p className="mt-4 max-w-[360px] text-sm leading-relaxed text-[var(--muted)]">
                {section.description}
              </p>
            </div>

            <div className="relative min-h-0 flex-1">
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

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-[var(--muted)]">
                  <span className="font-bold text-[var(--sky)]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-[var(--border)]">/</span>
                  {String(projects.length).padStart(2, "0")}
                </div>

                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {projects[activeIndex]?.location}
                </div>
              </div>

              <div className="relative h-1 w-full overflow-hidden rounded-full bg-[var(--border)]/50">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex h-full flex-col px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                {projects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="cursor-default text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300"
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

              <a
                href={section.view_all_link ?? "/projects"}
                className="group relative overflow-hidden rounded-full bg-[var(--navy)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-md transition-all duration-300 hover:bg-[var(--sky)] hover:shadow-lg"
              >
                <span className="relative z-10">{section.view_all_text}</span>
                <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
              </a>
            </div>

            <div className="relative min-h-0 flex-1">
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

              {activeIndex % 2 === 0 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--sky)] to-transparent" />
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Scroll to explore
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
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
                    boxShadow:
                      idx === activeIndex ? "0 0 10px rgba(42,167,223,0.3)" : "none",
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
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl transition-shadow duration-300 group-hover:shadow-3xl">
      <img
        src={p.image}
        alt={p.title}
        className="h-full w-full scale-[1.02] object-cover saturate-[0.95] transition-transform duration-1000 group-hover:scale-110 group-hover:saturate-105"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/20 via-40% to-transparent" />

      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
        <div className="rounded-full border border-white/40 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--navy)] shadow-sm backdrop-blur-sm">
          {p.tag}
        </div>
        <div className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-white/90 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <a
        href={p.project_link ?? "/projects"}
        className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-90 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border border-white/60 bg-white/95 text-[var(--navy)] opacity-0 shadow-2xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
        aria-label="View project"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
          VIEW
        </span>
        <span className="text-sm opacity-80">↗</span>
      </a>

      <div className="absolute bottom-0 left-0 right-0 z-10 rounded-b-2xl bg-gradient-to-t from-black/40 to-transparent p-5">
        {isActive && (
          <div className="absolute bottom-2 left-5 right-5 h-0.5 origin-left rounded-full bg-[var(--sky)] animate-[projLine_0.5s_cubic-bezier(.22,1,.36,1)_forwards]" />
        )}
        <h3 className="heading-font mb-2 text-lg font-semibold text-white drop-shadow-lg md:text-xl lg:text-2xl">
          {p.title}
        </h3>
        <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--sky)]" />
            {p.location}
          </span>
          <span className="font-mono">{p.year}</span>
        </div>
      </div>
    </div>
  );
}

function MobileProjectCard({
  p,
  index,
  total,
}: {
  p: Project;
  index: number;
  total: number;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
      <div className="relative h-[430px]">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-[#020617]/25 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <div className="rounded-full border border-white/40 bg-white/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--navy)] backdrop-blur">
            {p.tag}
          </div>

          <div className="rounded-full bg-black/35 px-2.5 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sky)]" />
              {p.location}
            </span>
            <span>{p.year}</span>
          </div>

          <h3 className="heading-font text-2xl font-semibold leading-snug text-white drop-shadow">
            {p.title}
          </h3>

          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)]"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <a
            href={p.project_link ?? "/projects"}
            className="mt-5 inline-flex items-center rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--navy)] transition hover:bg-[var(--sky)] hover:text-white"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}