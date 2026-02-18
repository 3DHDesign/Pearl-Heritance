// Footer.tsx — Pearl Heritance
// Light --surface card bg, Tailwind 4, --navy/--sky/--border vars, Outfit + Inter
// Uses NavLink from react-router-dom + react-icons/fa6

import { NavLink } from "react-router-dom";
import footerShape from "../assets/images/side.svg";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const pageLinks = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Projects",   to: "/projects" },
  { label: "Blog",       to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const usefulLinks = [
  { label: "Style Guide",    to: "/style-guide" },
  { label: "License",        to: "/license" },
  { label: "Changelog",      to: "/changelog" },
  { label: "Privacy Policy", to: "/privacy" },
];

const socials = [
  { label: "Facebook",  href: "#", Icon: FaFacebookF },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn",  href: "#", Icon: FaLinkedinIn },
  { label: "X",         href: "#", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="py-10 md:py-14">
      <div className="container-wide">

        {/* ── outer rounded card ── */}
        <div className="relative overflow-hidden rounded-[40px] bg-[var(--surface)] px-6 md:px-14 py-12 md:py-16">

          {/* ── decorative SVG top-right ── */}
          <img
            src={footerShape}
            aria-hidden="true"
            className="absolute right-[-40px] top-[-10px] w-[clamp(200px,30vw,480px)] pointer-events-none select-none z-0"
            style={{ filter: "brightness(2.5) contrast(0.8) saturate(0)", mixBlendMode: "screen", opacity: 0.85 }}
          />

          {/* ── soft sky bloom top-left ── */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--sky)]/[0.07] blur-[70px] pointer-events-none" />

          {/* ══════════ BRAND ROW ══════════ */}
          <div className="relative z-10 flex flex-col items-center gap-4 mb-12">

            {/* logo lockup */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[var(--navy)] flex items-center justify-center shadow-[0_4px_16px_rgba(11,45,75,0.25)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V9l9-6 9 6v12" />
                  <path d="M9 21V15h6v6" />
                </svg>
              </div>
              <span className="heading-font text-[22px] font-bold text-[var(--navy)] tracking-tight">
                Pearl Heritance
              </span>
            </div>

            {/* tagline */}
            <p className="text-[14px] text-[var(--muted)] text-center max-w-xs leading-relaxed">
              Building comfortable futures with precision, craft, and timeless design.
            </p>

            {/* thin navy accent line */}
            <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />
          </div>

          {/* ══════════ MAIN GRID ══════════ */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* ── col 1: follow + headline ── */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">

              {/* big headline */}
              <h3 className="heading-font text-[clamp(24px,3vw,36px)] font-bold text-[var(--navy)] leading-[1.2] max-w-sm">
                We build a comfortable future{" "}
                <span className="text-[var(--sky)]">for our clients.</span>
              </h3>

              {/* follow us */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] mb-4">
                  Follow Us
                </p>
                <div className="flex gap-2.5">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="
                        w-10 h-10 rounded-full
                        bg-white border border-[var(--border)]
                        text-[var(--navy)] flex items-center justify-center
                        shadow-[0_2px_8px_rgba(11,45,75,0.08)]
                        transition-all duration-300
                        hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white
                        hover:shadow-[0_4px_16px_rgba(11,45,75,0.22)] hover:scale-110
                        active:scale-95
                      "
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── col 2: links + contact ── */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">

              {/* page links */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] mb-5">
                  Page Links
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {pageLinks.map((l) => (
                    <li key={l.label}>
                      <NavLink
                        to={l.to}
                        end={l.to === "/"}
                        className={({ isActive }) => [
                          "flex items-center gap-2 text-[14px] no-underline transition-all duration-200 group",
                          isActive
                            ? "text-[var(--sky)] font-medium"
                            : "text-[var(--text)]/60 hover:text-[var(--navy)]",
                        ].join(" ")}
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={[
                                "w-3 h-[1.5px] rounded-full shrink-0 transition-all duration-200",
                                isActive
                                  ? "bg-[var(--sky)] w-4"
                                  : "bg-[var(--border)] group-hover:bg-[var(--navy)] group-hover:w-4",
                              ].join(" ")}
                            />
                            {l.label}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* useful links */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] mb-5">
                  Useful Links
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {usefulLinks.map((l) => (
                    <li key={l.label}>
                      <NavLink
                        to={l.to}
                        className={({ isActive }) => [
                          "flex items-center gap-2 text-[14px] no-underline transition-all duration-200 group",
                          isActive
                            ? "text-[var(--sky)] font-medium"
                            : "text-[var(--text)]/60 hover:text-[var(--navy)]",
                        ].join(" ")}
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={[
                                "w-3 h-[1.5px] rounded-full shrink-0 transition-all duration-200",
                                isActive
                                  ? "bg-[var(--sky)] w-4"
                                  : "bg-[var(--border)] group-hover:bg-[var(--navy)] group-hover:w-4",
                              ].join(" ")}
                            />
                            {l.label}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* contact */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] mb-5">
                  Say Hello
                </p>

                <div className="flex flex-col gap-5">
                  {/* email */}
                  <div>
                    <p className="m-0 mb-1 text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--muted)]/70">
                      Email
                    </p>
                    <a
                      href="mailto:info@pearlheritance.com"
                      className="
                        text-[14px] text-[var(--text)]/70 no-underline
                        hover:text-[var(--navy)] transition-colors duration-200
                        flex items-center gap-1.5 group
                      "
                    >
                      info@pearlheritance.com
                      <svg
                        width="11" height="11" viewBox="0 0 16 16"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      >
                        <path d="M3 13L13 3M13 3H6M13 3V10" />
                      </svg>
                    </a>
                  </div>

                  {/* phone */}
                  <div>
                    <p className="m-0 mb-1 text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--muted)]/70">
                      Contact Us
                    </p>
                    <a
                      href="tel:+94770000000"
                      className="
                        text-[14px] text-[var(--text)]/70 no-underline
                        hover:text-[var(--navy)] transition-colors duration-200
                      "
                    >
                      +94 77 000 0000
                    </a>
                  </div>

                  {/* location */}
                  <div>
                    <p className="m-0 mb-1 text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--muted)]/70">
                      Location
                    </p>
                    <p className="m-0 text-[14px] text-[var(--text)]/70 leading-snug">
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ══════════ BOTTOM BAR ══════════ */}
          <div className="relative z-10 mt-12 pt-7 border-t border-black/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="m-0 text-[13px] text-[var(--muted)] text-center sm:text-left">
              © {new Date().getFullYear()} Pearl Heritance. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Use"].map((l) => (
                <NavLink
                  key={l}
                  to={`/${l.toLowerCase().replace(/ /g, "-")}`}
                  className="text-[12px] text-[var(--muted)] hover:text-[var(--navy)] no-underline transition-colors duration-200"
                >
                  {l}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ── scroll to top ── */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="
              absolute right-6 bottom-6 z-10
              w-11 h-11 rounded-full
              bg-[var(--navy)] text-white
              flex items-center justify-center
              shadow-[0_4px_16px_rgba(11,45,75,0.30)]
              transition-all duration-300
              hover:bg-[var(--sky)] hover:scale-110
              hover:shadow-[0_6px_20px_rgba(42,167,223,0.35)]
              active:scale-95
            "
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 16V4M4 10l6-6 6 6" />
            </svg>
          </button>

        </div>
      </div>
    </footer>
  );
}