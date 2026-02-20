import { NavLink } from "react-router-dom";
import headerShape from "../assets/images/side.svg";
import logo from "../assets/images/logo.svg";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blog" }, // IMPORTANT: your route is /blog (not /blogs)
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  return (
    <header className="w-full bg-white py-5">
      <div className="container-wide">
        <div className="@container relative flex items-center justify-between rounded-[34px] bg-[color:var(--surface)] px-8 md:px-12 py-5 overflow-hidden">
          {/* Decorative SVG */}
          <img
            src={headerShape}
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-0 h-full object-contain pointer-events-none"
          />

          {/* Brand */}
          <NavLink to="/" className="relative flex items-center gap-3">
            <img
              src={logo}
              alt="Pearl Heritage"
              className="h-10 w-auto object-contain"
            />

             
          </NavLink>

          {/* Nav */}
          <nav className="relative hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-[15px] font-medium transition",
                    isActive
                      ? "text-[color:var(--navy)] underline underline-offset-8 decoration-[color:var(--sky)] decoration-2"
                      : "text-black/70 hover:text-[color:var(--navy)]",
                  ].join(" ")
                }
                end={item.to === "/"} // makes Home active only on "/"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
