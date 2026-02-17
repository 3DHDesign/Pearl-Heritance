import headerShape from "../assets/images/side.svg";

const navItems = ["Home", "About Us", "Projects", "Blogs", "Contact Us"];

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
          <div className="relative flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white border border-[color:var(--border)] flex items-center justify-center">
              <span className="heading-font text-[color:var(--navy)] font-semibold">
                P
              </span>
            </div>

            <span className="heading-font text-[20px] font-semibold text-[color:var(--text)]">
              Pearl Heritance
            </span>
          </div>

          {/* Nav */}
          <nav className="relative hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((label) => {
              const isActive = label === "Home"; // later we’ll replace with router active
              return (
                <a
                  key={label}
                  href="#"
                  className={[
                    "text-[15px] font-medium transition",
                    isActive
                      ? "text-[color:var(--navy)] underline underline-offset-8 decoration-[color:var(--sky)] decoration-2"
                      : "text-black/70 hover:text-[color:var(--navy)]",
                  ].join(" ")}
                >
                  {label}
                </a>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}
