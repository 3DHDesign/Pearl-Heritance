import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  getActiveFeaturedProjects,
  type FeaturedProjectsSection,
  type FeaturedProjectItem,
} from "../../api/featuredProjects";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  number: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  projectLink: string | null;
};

function mapProjects(section: FeaturedProjectsSection): Project[] {
  return section.projects.map((project: FeaturedProjectItem) => ({
    id: project.id,
    number: project.number,
    title: project.title,
    location: project.location,
    category: project.tag?.trim() || "Project",
    description:
      project.description?.trim() ||
      "A carefully crafted project that reflects functionality, aesthetics, and lasting value.",
    image: project.image_url,
    projectLink: project.project_link,
  }));
}

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const prevIndex = useRef(0);

  const [sectionData, setSectionData] = useState<FeaturedProjectsSection | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const data = await getActiveFeaturedProjects();
        if (!data) return;

        setSectionData(data);
        setProjects(mapProjects(data));
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;

    setImgOpacity(0);
    const timeout = setTimeout(() => {
      setImgOpacity(1);
      prevIndex.current = activeIndex;
    }, 180);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    if (!sectionRef.current || !projects.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${projects.length * 85}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * projects.length),
            projects.length - 1
          );
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects.length]);

  const scrollToProject = (idx: number) => {
    const trigger = ScrollTrigger.getAll().find(
      (item) => item.trigger === sectionRef.current
    );

    if (!trigger || !projects.length) return;

    window.scrollTo({
      top: trigger.start + ((trigger.end - trigger.start) * idx) / projects.length + 10,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        <div className="container-wide relative z-10 flex h-full items-center">
          <div className="grid w-full items-center gap-10 py-10 lg:grid-cols-2 xl:gap-16">
            <div className="animate-pulse">
              <div className="mb-7 h-4 w-32 rounded bg-[var(--border)]" />
              <div className="mb-4 h-10 w-3/4 rounded bg-[var(--border)]" />
              <div className="mb-9 h-10 w-2/3 rounded bg-[var(--border)]" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 rounded-2xl bg-[var(--border)]/50"
                  />
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] animate-pulse rounded-[24px] bg-[var(--border)]/50" />
          </div>
        </div>
      </section>
    );
  }

  if (!sectionData || !projects.length) return null;

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="container-wide relative z-10 flex h-full items-center">
        <div className="grid w-full items-center gap-10 py-10 lg:grid-cols-2 xl:gap-16">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <div className="mb-7 flex items-center gap-3">
              <div className="h-[2px] w-7 rounded-full bg-[var(--navy)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--navy)] opacity-70">
                {sectionData.eyebrow}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
            </div>

            <h2 className="heading-font m-0 mb-9 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.1] text-[var(--navy)]">
              {sectionData.title_line1}
              <br />
              <span className="text-[var(--sky)]">{sectionData.title_line2}</span>
            </h2>

            <div className="mb-9 flex flex-col gap-1.5">
              {projects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => scrollToProject(idx)}
                    className={[
                      "group relative flex cursor-pointer items-center gap-5 rounded-2xl border px-5 py-4 text-left transition-all duration-350",
                      isActive
                        ? "border-[var(--border)] bg-white shadow-[0_4px_20px_rgba(11,45,75,0.08)]"
                        : "border-transparent bg-transparent hover:border-[var(--border)] hover:bg-white/60",
                    ].join(" ")}
                  >
                    {isActive && (
                      <div className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-[var(--sky)] to-[var(--navy)]" />
                    )}

                    <span
                      className={[
                        "heading-font w-10 shrink-0 text-[22px] font-bold transition-colors duration-300",
                        isActive
                          ? "text-[var(--sky)]"
                          : "text-[var(--border)] group-hover:text-[var(--muted)]",
                      ].join(" ")}
                    >
                      {project.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={[
                          "heading-font m-0 text-[16px] font-semibold leading-tight transition-colors duration-300",
                          isActive
                            ? "text-[var(--navy)]"
                            : "text-[var(--muted)] group-hover:text-[var(--navy)]",
                        ].join(" ")}
                      >
                        {project.title}
                      </h3>
                      <p className="m-0 mt-0.5 text-[11px] tracking-wide text-[var(--muted)] opacity-70">
                        {project.location}
                      </p>
                    </div>

                    <span
                      className={[
                        "hidden whitespace-nowrap rounded-full border px-3 py-1 text-[9px] font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:block",
                        isActive
                          ? "border-[var(--sky)] bg-[var(--sky)] text-white"
                          : "border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--sky)]/50",
                      ].join(" ")}
                    >
                      {project.category.split(" ")[0]}
                    </span>

                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={[
                        "shrink-0 transition-all duration-300",
                        isActive
                          ? "text-[var(--sky)] opacity-100"
                          : "text-[var(--border)] opacity-0 group-hover:text-[var(--navy)] group-hover:opacity-100",
                      ].join(" ")}
                    >
                      <path d="M3 13L13 3M13 3H6M13 3V10" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to={sectionData.view_all_link ?? "/projects"}
                className="
                  heading-font inline-flex items-center gap-2.5 rounded-full
                  bg-[var(--navy)] px-6 py-3 text-[13px] font-semibold text-white no-underline
                  shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                  transition-all duration-300
                  hover:scale-105 hover:bg-[var(--sky)]
                  active:scale-95
                "
              >
                {sectionData.view_all_text}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 13L13 3M13 3H6M13 3V10" />
                </svg>
              </Link>

              <div className="flex items-baseline gap-1.5">
                <span className="heading-font text-[28px] font-bold leading-none text-[var(--navy)]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] text-[var(--muted)]">/</span>
                <span className="text-[14px] text-[var(--muted)]">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_24px_64px_rgba(11,45,75,0.18)]">
              {projects.map((project, idx) => (
                <img
                  key={project.id}
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: idx === activeIndex ? imgOpacity : 0,
                    transition: "opacity 0.35s ease",
                  }}
                  loading="lazy"
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy)]/55 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 z-20">
                <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sky)]" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {activeProject.category}
                  </span>
                </div>
              </div>

              <div className="absolute right-5 top-5 z-20">
                <span className="heading-font text-[13px] font-semibold text-white/50">
                  {activeProject.number} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 z-20 p-6"
                style={{ opacity: imgOpacity, transition: "opacity 0.35s ease" }}
              >
                <p className="m-0 mb-1 text-[11px] font-medium tracking-wide text-white/55">
                  {activeProject.location}
                </p>
                <h3 className="heading-font m-0 mb-2 text-[20px] font-bold leading-tight text-white">
                  {activeProject.title}
                </h3>
                <p className="m-0 max-w-xs text-[12px] leading-relaxed text-white/60">
                  {activeProject.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={[
                    "h-1.5 rounded-full border-none transition-all duration-400",
                    idx === activeIndex
                      ? "w-8 bg-[var(--sky)]"
                      : "w-3 bg-[var(--border)] hover:bg-[var(--muted)]",
                  ].join(" ")}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-20 w-1 bg-[var(--border)]">
        <div
          className="w-full bg-gradient-to-b from-[var(--sky)] to-[var(--navy)] transition-all duration-300"
          style={{ height: `${((activeIndex + 1) / projects.length) * 100}%` }}
        />
      </div>
    </section>
  );
}