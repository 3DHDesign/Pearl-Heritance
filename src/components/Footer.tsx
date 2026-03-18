import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import footerShape from "../assets/images/side.svg";
import logo from "../assets/images/logo.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";
import { getContactPage, type ContactPageResponse } from "../api/contact";

const pageLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

function FooterLink({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group inline-flex items-center gap-2 text-[14px] no-underline transition-all duration-200",
          isActive
            ? "text-[color:var(--sky)] font-medium"
            : "text-[color:var(--text)]/60 hover:text-[color:var(--navy)]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "w-3 h-[1.5px] rounded-full shrink-0 transition-all duration-200",
              isActive
                ? "bg-[color:var(--sky)] w-4"
                : "bg-[color:var(--border)] group-hover:bg-[color:var(--navy)] group-hover:w-4",
            ].join(" ")}
          />
          {label}
        </>
      )}
    </NavLink>
  );
}

type SocialItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
};

export default function Footer() {
  const [contactData, setContactData] = useState<ContactPageResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await getContactPage();
        setContactData(response.data);
      } catch (error) {
        console.error("Failed to fetch footer contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const socials = useMemo<SocialItem[]>(() => {
    if (!contactData?.social_links?.is_active) return [];

    const items: SocialItem[] = [];

    if (contactData.social_links.facebook) {
      items.push({
        label: "Facebook",
        href: contactData.social_links.facebook,
        Icon: FaFacebookF,
      });
    }

    if (contactData.social_links.instagram) {
      items.push({
        label: "Instagram",
        href: contactData.social_links.instagram,
        Icon: FaInstagram,
      });
    }

    if (contactData.social_links.linkedin) {
      items.push({
        label: "LinkedIn",
        href: contactData.social_links.linkedin,
        Icon: FaLinkedinIn,
      });
    }

    if (contactData.social_links.tiktok) {
      items.push({
        label: "TikTok",
        href: contactData.social_links.tiktok,
        Icon: FaTiktok,
      });
    }

    return items;
  }, [contactData]);

  const email = contactData?.contact_details?.email || "info@pearlheritance.com";
  const phone = contactData?.contact_details?.phone || "+94 77 000 0000";
  const address = contactData?.contact_details?.address || "Colombo, Sri Lanka";

  return (
    <footer className="py-10 md:py-14">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[40px] bg-[color:var(--surface)] px-6 py-12 md:px-14 md:py-16">
          {/* decorative */}
          <img
            src={footerShape}
            aria-hidden="true"
            className="pointer-events-none absolute right-[-40px] top-[-10px] z-0 w-[clamp(200px,30vw,480px)] select-none"
            style={{
              filter: "brightness(2.5) contrast(0.8) saturate(0)",
              mixBlendMode: "screen",
              opacity: 0.85,
            }}
          />

          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--sky)]/10 blur-[70px]" />

          {/* brand row */}
          <div className="relative z-10 mb-12 flex flex-col items-center gap-4">
            <NavLink to="/" className="flex items-center gap-3 no-underline">
              <img
                src={logo}
                alt="Pearl Heritance"
                className="h-11 w-auto object-contain"
              />
              <span className="heading-font text-[22px] font-bold tracking-tight text-[color:var(--navy)]">
                Pearl Heritance
              </span>
            </NavLink>

            <p className="max-w-xs text-center text-[14px] leading-relaxed text-[color:var(--muted)]">
              Building comfortable futures with precision, craft, and timeless design.
            </p>

            <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-[color:var(--navy)] to-[color:var(--sky)]" />
          </div>

          {/* main grid */}
          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            {/* left */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-6">
              <h3 className="heading-font max-w-sm text-[clamp(24px,3vw,36px)] font-bold leading-[1.2] text-[color:var(--navy)]">
                We build a comfortable future{" "}
                <span className="text-[color:var(--sky)]">for our clients.</span>
              </h3>

              {!loading && socials.length > 0 && (
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Follow Us
                  </p>

                  <div className="flex gap-2.5">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex h-10 w-10 items-center justify-center rounded-full
                          border border-[color:var(--border)] bg-white
                          text-[color:var(--navy)]
                          shadow-[0_2px_8px_rgba(11,45,75,0.08)]
                          transition-all duration-300
                          hover:scale-110 hover:border-[color:var(--navy)] hover:bg-[color:var(--navy)] hover:text-white
                          hover:shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                          active:scale-95
                        "
                      >
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* right */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6">
              {/* page links */}
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Page Links
                </p>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {pageLinks.map((link) => (
                    <li key={link.label}>
                      <FooterLink to={link.to} label={link.label} end={link.to === "/"} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* contact */}
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Say Hello
                </p>

                <div className="flex flex-col gap-5">
                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[color:var(--muted)]/70">
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="
                        group inline-flex items-center gap-1.5
                        text-[14px] text-[color:var(--text)]/70 no-underline
                        transition-colors duration-200 hover:text-[color:var(--navy)]
                      "
                    >
                      {email}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <path d="M3 13L13 3M13 3H6M13 3V10" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[color:var(--muted)]/70">
                      Contact Us
                    </p>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-[14px] text-[color:var(--text)]/70 no-underline transition-colors duration-200 hover:text-[color:var(--navy)]"
                    >
                      {phone}
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[color:var(--muted)]/70">
                      Location
                    </p>
                    <p className="m-0 text-[14px] leading-snug text-[color:var(--text)]/70">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="relative z-10 mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/[0.07] pt-7 sm:flex-row">
            <p className="m-0 text-center text-[13px] text-[color:var(--muted)] sm:text-left">
              © {new Date().getFullYear()} Pearl Heritance. All rights reserved.
            </p>
          </div>

          {/* scroll to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="
              absolute bottom-6 right-6 z-10
              flex h-11 w-11 items-center justify-center rounded-full
              bg-[color:var(--navy)] text-white
              shadow-[0_4px_16px_rgba(11,45,75,0.30)]
              transition-all duration-300
              hover:scale-110 hover:bg-[color:var(--sky)]
              hover:shadow-[0_6px_20px_rgba(42,167,223,0.35)]
              active:scale-95
            "
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 16V4M4 10l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}