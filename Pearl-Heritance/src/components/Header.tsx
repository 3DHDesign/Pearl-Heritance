import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import headerShape from "../assets/images/side.svg";
import logoSvg from "../assets/images/logo.svg";
import { getContactPage } from "../api/contact"; // Adjust path as needed

const navItems = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Projects",   to: "/projects" },
  { label: "Blogs",      to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // State for dynamic phone number
  const [phone, setPhone] = useState("+94 77 772 5999"); // Initial fallback

  useEffect(() => {
    // 1. Handle Scroll
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    // 2. Fetch Phone from API
    getContactPage()
      .then((res) => {
        if (res.data.header_contact_strip.is_active) {
          setPhone(res.data.header_contact_strip.phone);
        }
      })
      .catch((err) => console.error("Header API Error:", err));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  
  // Create safe link for tel:
  const phoneLink = `tel:${phone.replace(/\s+/g, '')}`;

  return (
    <header className="w-full sticky top-0 z-50 pointer-events-none">
      <div className="container-wide pt-6 pb-4 pointer-events-auto">
        {/* MAIN BAR */}
        <div
          className={[
            "relative flex items-center justify-between",
            "rounded-[36px] px-5 lg:px-8",
            scrolled ? "py-2.5" : "py-3",
            "bg-white border border-[var(--border)]",
            "overflow-hidden transition-all duration-400",
            scrolled
              ? "shadow-[0_8px_40px_rgba(11,45,75,0.12)]"
              : "shadow-[0_4px_24px_rgba(11,45,75,0.08)]",
          ].join(" ")}
        >
          {/* Decorative SVG */}
          <img
            src={headerShape}
            alt=""
            aria-hidden="true"
            className="absolute -right-10 top-0 h-full object-contain pointer-events-none select-none"
            style={{
              opacity: 0.07,
              filter: "brightness(0.4)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Top Accent Stripe */}
          <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-[var(--navy)] via-[var(--sky)] to-transparent opacity-60" />

          {/* LEFT: Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="relative z-10 flex items-center shrink-0"
          >
            <img
              src={logoSvg}
              alt="Pearl Heritance"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain transition-all duration-300 hover:opacity-85"
            />
          </NavLink>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 relative z-10">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "relative px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-250",
                    isActive
                      ? "text-[var(--navy)] bg-[var(--surface)]"
                      : "text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--surface)]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--sky)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Phone + Hamburger */}
          <div className="relative z-10 flex items-center gap-2.5">
            {/* Desktop Phone */}
            <a
              href={phoneLink}
              className="
                hidden lg:inline-flex items-center gap-2.5
                px-5 py-2.5 rounded-full
                bg-[var(--navy)] text-white text-[13px] font-semibold
                shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                transition-all duration-300
                hover:bg-[var(--sky)] hover:scale-105
                hover:shadow-[0_6_24px_rgba(42,167,223,0.3)]
                active:scale-95
              "
            >
              <FiPhoneCall className="text-[15px] shrink-0" />
              <span className="whitespace-nowrap">{phone}</span>
            </a>

            {/* Mobile/Tablet Phone icon */}
            <a
              href={phoneLink}
              className="
                lg:hidden w-10 h-10 rounded-full
                bg-[var(--navy)] text-white
                flex items-center justify-center
                shadow-[0_4px_12px_rgba(11,45,75,0.22)]
                transition-all duration-300
                hover:bg-[var(--sky)]
                active:scale-95
              "
              aria-label="Call us"
            >
              <FiPhoneCall className="text-[16px]" />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                lg:hidden w-10 h-10 rounded-full
                bg-[var(--surface)] border border-[var(--border)]
                flex flex-col items-center justify-center gap-[5px]
                transition-all duration-300
                hover:border-[var(--navy)]
                active:scale-95
              "
            >
              <span className={["block h-[1.5px] rounded-full bg-[var(--navy)] transition-all duration-300", menuOpen ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"].join(" ")} />
              <span className={["block h-[1.5px] rounded-full bg-[var(--navy)] transition-all duration-300", menuOpen ? "opacity-0 w-0" : "w-3"].join(" ")} />
              <span className={["block h-[1.5px] rounded-full bg-[var(--navy)] transition-all duration-300", menuOpen ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"].join(" ")} />
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div
          className={[
            "lg:hidden mt-2 rounded-[28px] bg-white border border-[var(--border)]",
            "overflow-hidden transition-all duration-400 origin-top",
            menuOpen
              ? "opacity-100 scale-y-100 shadow-[0_16px_48px_rgba(11,45,75,0.14)] max-h-[520px]"
              : "opacity-0 scale-y-95 max-h-0 pointer-events-none border-transparent",
          ].join(" ")}
        >
          <div className="h-[2px] bg-gradient-to-r from-[var(--navy)] via-[var(--sky)] to-transparent rounded-t-[28px]" />
          <nav className="flex flex-col px-4 py-3">
            {navItems.map((item, i) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between px-5 py-4 rounded-[16px] text-[15px] font-medium transition-all duration-200",
                    i < navItems.length - 1 ? "mb-1" : "",
                    isActive ? "bg-[var(--navy)] text-white" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--navy)]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky)]" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <a
              href={phoneLink}
              className="
                flex items-center justify-center gap-2.5
                w-full py-3.5 rounded-[16px]
                bg-[var(--navy)] text-white text-[14px] font-semibold
                transition-all duration-300
                hover:bg-[var(--sky)]
                active:scale-95
              "
            >
              <FiPhoneCall className="text-[16px]" />
              {phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}