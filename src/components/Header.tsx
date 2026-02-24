import { NavLink } from "react-router-dom";
import headerShape from "../assets/images/side.svg";
import logoSvg from "../assets/images/logo.svg";
import { useState } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full   py-5 relative z-50">
      <div className="container-wide">
        <div className="@container relative flex items-center justify-between rounded-[34px] bg-white px-8 md:px-12 py-5 overflow-hidden shadow-md border border-[var(--border)]">
          {/* Decorative SVG - Very subtle, just a hint */}
          <img
            src={headerShape}
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-0 h-full object-contain pointer-events-none"
            style={{
              opacity: 0.08,
              filter: 'brightness(0.5)',
              mixBlendMode: 'multiply'
            }}
          />

          {/* Brand with Logo */}
          <NavLink to="/" className="relative flex items-center gap-3 group z-10">
            <div className="relative">
              <img 
                src={logoSvg}
                alt="Pearl Heritance"
                className="h-11 w-auto object-contain"
              />
            </div>

            {/* Company Name and Tagline - Hidden on mobile */}
            <div className="hidden sm:block">
              <span className="heading-font text-[20px] font-semibold text-[var(--navy)] block leading-tight">
                Pearl H
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--muted)] block">
                Bridging Vision and Development
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="relative hidden md:flex items-center gap-8 lg:gap-10 z-10">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-[15px] font-medium transition relative",
                    isActive
                      ? "text-[var(--navy)]"
                      : "text-[var(--muted)] hover:text-[var(--navy)]",
                  ].join(" ")
                }
                end={item.to === "/"}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--sky)] to-transparent" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-20 h-10 w-10 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--navy)] hover:bg-[var(--surface)] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 rounded-[34px] bg-white border border-[var(--border)] shadow-lg overflow-hidden animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col p-4">
              {navItems.map((item,) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "py-4 px-6 text-[15px] font-medium transition relative border-b border-[var(--border)] last:border-0",
                      isActive
                        ? "text-[var(--navy)] bg-[var(--surface)]"
                        : "text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--surface)]",
                    ].join(" ")
                  }
                  end={item.to === "/"}
                >
                  {({ isActive }) => (
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky)]" />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}