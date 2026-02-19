import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string; // if no `to`, it renders as plain text
};

type PageHeroProps = {
  title: string;
  subtitle?: string; // optional (small text under title)
  bgImage: string;   // url or local import
  crumbs?: Crumb[];  // e.g. [{label:"Home",to:"/"},{label:"Contact Us"}]
};

export default function PageHero({ title, subtitle, bgImage, crumbs }: PageHeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="relative overflow-hidden rounded-[28px]">
        {/* Background image */}
        <img
          src={bgImage}
          alt={title}
          className="h-[280px] md:h-[360px] w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-3 text-white/85 text-sm md:text-base">{subtitle}</p>
            ) : null}

            {crumbs?.length ? (
              <div className="mt-4 text-white/80 text-sm">
                {crumbs.map((c, i) => (
                  <span key={`${c.label}-${i}`}>
                    {c.to ? (
                      <Link to={c.to} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 ? <span className="mx-2">/</span> : null}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
