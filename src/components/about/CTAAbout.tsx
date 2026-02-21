// CTAAbout.tsx — Pearl Heritance
// Light CTA strip — no dark navy bg, border + surface, sky accents
// Pure Tailwind 4, container-wide

import { NavLink } from "react-router-dom";

export default function CTAAbout() {
  return (
    <section className="container-wide mt-14">
      <div className="relative rounded-[40px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-8 md:px-14 py-12 md:py-14">

        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* sky bloom top-right */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[var(--sky)]/[0.08] blur-[60px] pointer-events-none" />

        {/* navy bloom bottom-left */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[var(--navy)]/[0.05] blur-[60px] pointer-events-none" />

        {/* top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--navy)] via-[var(--sky)] to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* left text */}
          <div className="lg:col-span-8">
            {/* eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--navy)] opacity-60">
                Get Started
              </span>
            </div>

            <h3 className="heading-font m-0 mb-3 text-[clamp(24px,3vw,40px)] font-bold leading-[1.1] text-[var(--navy)]">
              Ready to transform
              <br />
              <span className="text-[var(--sky)]">your property?</span>
            </h3>

            <p className="m-0 text-[14px] leading-relaxed text-[var(--muted)] max-w-md">
              Tell us what you're planning — we'll guide you from concept to completion with our full team of licensed professionals.
            </p>
          </div>

          {/* right buttons */}
          <div className="lg:col-span-4 flex lg:justify-end gap-3 flex-wrap">
            <NavLink
              to="/contact"
              className="
                heading-font no-underline
                inline-flex items-center gap-2.5
                px-7 py-3.5 rounded-full
                bg-[var(--navy)] text-white text-[14px] font-semibold
                shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                transition-all duration-300
                hover:bg-[var(--sky)] hover:scale-105
                active:scale-95
              "
            >
              Contact Us
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13L13 3M13 3H6M13 3V10" />
              </svg>
            </NavLink>

            <NavLink
              to="/projects"
              className="
                heading-font no-underline
                inline-flex items-center gap-2.5
                px-7 py-3.5 rounded-full
                bg-white text-[var(--navy)] text-[14px] font-semibold
                border border-[var(--border)]
                shadow-[0_2px_8px_rgba(11,45,75,0.08)]
                transition-all duration-300
                hover:border-[var(--navy)] hover:scale-105
                active:scale-95
              "
            >
              View Work
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}