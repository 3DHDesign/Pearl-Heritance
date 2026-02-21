// ProjectsLanding.tsx — Pearl Heritance
// Revamped: full-height image cards, navy/sky system, no brown, pure Tailwind 4

import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/projects";

export default function ProjectsLanding() {
  return (
    <div className="bg-[var(--bg)]">

      {/* ── HERO HEADER ── */}
      <section className="container-wide pt-14 pb-12">
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
            <h1 className="heading-font m-0 text-[clamp(30px,5vw,58px)] font-bold leading-[1.05] text-[var(--navy)]">
              Work That Speaks
              <br />
              <span className="text-[var(--sky)]">For Itself</span>
            </h1>
          </div>
          <p className="m-0 text-[15px] leading-relaxed text-[var(--muted)] max-w-sm md:text-right">
            Residential, Tourism &amp; Eco, Commercial, and Interior projects — each delivered with precision and purpose.
          </p>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="container-wide pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.key}
              to={`/projects/${encodeURIComponent(c.key)}`}
              className="group block no-underline"
            >
              {/* image card — tall portrait */}
              <div className="relative rounded-[24px] overflow-hidden aspect-[3/4] shadow-[0_4px_20px_rgba(11,45,75,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_56px_rgba(11,45,75,0.2)] group-hover:-translate-y-2">

                {/* image */}
                <img
                  src={c.cover}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[var(--navy)]/20 to-transparent" />

                {/* top sky stripe on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-10" />

                {/* number top-left */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="heading-font text-[13px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* category pill top-right */}
                <div className="absolute top-5 right-5 z-10">
                  <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                    {c.label}
                  </span>
                </div>

                {/* bottom content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <h3 className="heading-font m-0 text-[20px] font-bold text-white leading-snug mb-2">
                    {c.title}
                  </h3>

                  {/* arrow pill — slides up on hover */}
                  <div className="
                    flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-[var(--sky)]
                    opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-400
                  ">
                    View Projects
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 13L13 3M13 3H6M13 3V10" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}