// ProjectsList.tsx — Pearl Heritance
// Revamped: navy/sky system, portrait image cards, no brown, pure Tailwind 4

import { Link, useParams } from "react-router-dom";
import { PROJECTS, type ProjectCategory } from "../utils/projects";

export default function ProjectsList() {
  const { category } = useParams();
  const decoded = decodeURIComponent(category ?? "") as ProjectCategory;
  const filtered = PROJECTS.filter((p) => p.category === decoded);

  return (
    <div className="bg-[var(--bg)]">

      {/* ── HEADER ── */}
      <section className="container-wide pt-12 pb-10">

        {/* back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-[var(--muted)] hover:text-[var(--navy)] transition-colors duration-200 no-underline mb-8 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1">
            <path d="M13 3L3 13M3 13H10M3 13V6" />
          </svg>
          Back to Categories
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-[2px] rounded-full bg-[var(--navy)]" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--navy)] opacity-70">
                Our Projects
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
            </div>
            <h1 className="heading-font m-0 text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] text-[var(--navy)]">
              {decoded || "Projects"}
            </h1>
          </div>

          {/* project count badge */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)]">
              <span className="heading-font text-[14px] font-bold text-[var(--navy)]">{filtered.length}</span>
              <span className="text-[12px] text-[var(--muted)] ml-1.5">
                {filtered.length === 1 ? "Project" : "Projects"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="container-wide pb-20">
        {filtered.length === 0 ? (
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--navy)]/[0.06] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </div>
            <h3 className="heading-font m-0 mb-2 text-[18px] font-semibold text-[var(--navy)]">No Projects Yet</h3>
            <p className="m-0 text-[14px] text-[var(--muted)]">No projects added yet for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="group block no-underline"
              >
                <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_4px_20px_rgba(11,45,75,0.08)] transition-all duration-500 group-hover:shadow-[0_20px_56px_rgba(11,45,75,0.18)] group-hover:-translate-y-2">

                  {/* image */}
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/75 via-[var(--navy)]/15 to-transparent" />

                  {/* sky top stripe on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-10" />

                  {/* number badge top-left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="heading-font text-[12px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* year + location top-right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                      {p.year}
                    </span>
                  </div>

                  {/* bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                    <p className="m-0 mb-1 text-[10px] font-medium tracking-[0.14em] uppercase text-white/55">
                      {p.location}
                    </p>
                    <h3 className="heading-font m-0 mb-2 text-[18px] font-bold text-white leading-snug">
                      {p.title}
                    </h3>

                    {/* view link slides up on hover */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--sky)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      View Project
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13L13 3M13 3H6M13 3V10" />
                      </svg>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}