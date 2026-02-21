// ProjectDetail.tsx — Pearl Heritance
// Revamped: navy/sky system, no brown, premium gallery, pure Tailwind 4

import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../utils/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = useMemo(() => PROJECTS.find((p) => p.id === id), [id]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);

  if (!project) {
    return (
      <div className="container-wide py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--navy)]/[0.06] border border-[var(--border)] flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <h2 className="heading-font m-0 mb-3 text-[22px] font-bold text-[var(--navy)]">Project Not Found</h2>
        <p className="m-0 mb-6 text-[var(--muted)]">This project doesn't exist or has been removed.</p>
        <Link to="/projects" className="heading-font no-underline inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--navy)] text-white text-[13px] font-semibold hover:bg-[var(--sky)] transition-all duration-300">
          Back to Projects
        </Link>
      </div>
    );
  }

  const active = project.images[activeIndex] ?? project.cover;

  const handleThumb = (idx: number) => {
    if (idx === activeIndex) return;
    setImgOpacity(0);
    setTimeout(() => { setActiveIndex(idx); setImgOpacity(1); }, 180);
  };

  return (
    <div className="bg-[var(--bg)]">

      {/* ── HEADER ── */}
      <section className="container-wide pt-12 pb-10">

        {/* back link */}
        <Link
          to={`/projects/${encodeURIComponent(project.category)}`}
          className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted)] hover:text-[var(--navy)] transition-colors duration-200 no-underline mb-8 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1">
            <path d="M13 3L3 13M3 13H10M3 13V6" />
          </svg>
          Back to {project.category}
        </Link>

        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-[2px] rounded-full bg-[var(--navy)]" />
          <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--navy)] opacity-70">
            {project.category}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="heading-font m-0 text-[clamp(28px,4.5vw,54px)] font-bold leading-[1.05] text-[var(--navy)]">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 shrink-0 self-start md:self-end">
            <span className="text-[12px] font-medium text-[var(--muted)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2">
              {project.location} · {project.year}
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="container-wide pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">

          {/* ── LEFT — gallery ── */}
          <div className="lg:sticky lg:top-24">

            {/* main image */}
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_8px_40px_rgba(11,45,75,0.14)]">
              <img
                src={active}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: imgOpacity, transition: "opacity 0.25s ease" }}
              />
              {/* gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent pointer-events-none" />

              {/* top stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />

              {/* counter top-right */}
              <div className="absolute top-4 right-4 z-10">
                <span className="heading-font text-[12px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* thumbnails */}
            {project.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {project.images.slice(0, 8).map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => handleThumb(idx)}
                    className={[
                      "relative rounded-[14px] overflow-hidden aspect-square cursor-pointer border-2 transition-all duration-300",
                      idx === activeIndex
                        ? "border-[var(--sky)] shadow-[0_0_0_3px_rgba(42,167,223,0.15)]"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-[var(--border)]",
                    ].join(" ")}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="thumb" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT — info ── */}
          <div className="flex flex-col gap-5">

            {/* overview card */}
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-5 h-[2px] rounded-full bg-[var(--sky)]" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--navy)] opacity-60">
                  Project Overview
                </span>
              </div>
              <p className="m-0 text-[14px] leading-[1.85] text-[var(--muted)]">
                {project.description}
              </p>
            </div>

            {/* tags */}
            {project.tags?.length ? (
              <div className="rounded-[24px] border border-[var(--border)] bg-white p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-5 h-[2px] rounded-full bg-[var(--navy)]" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--navy)] opacity-60">
                    Key Features
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[var(--navy)] bg-[var(--surface)] hover:border-[var(--sky)] hover:text-[var(--sky)] transition-colors duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* meta row */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Category", value: project.category },
                { label: "Location", value: project.location },
                { label: "Year", value: project.year },
                { label: "Status", value: "Completed" },
              ].map((m) => (
                <div key={m.label} className="rounded-[18px] border border-[var(--border)] bg-white px-5 py-4">
                  <p className="m-0 text-[10px] font-medium tracking-[0.16em] uppercase text-[var(--muted)] mb-1">{m.label}</p>
                  <p className="m-0 text-[14px] font-semibold text-[var(--navy)]">{m.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="
                heading-font no-underline
                flex items-center justify-center gap-2.5
                px-7 py-4 rounded-[18px]
                bg-[var(--navy)] text-white text-[14px] font-semibold
                shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                transition-all duration-300
                hover:bg-[var(--sky)] hover:scale-[1.02]
                active:scale-95
              "
            >
              Start a Similar Project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13L13 3M13 3H6M13 3V10" />
              </svg>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}