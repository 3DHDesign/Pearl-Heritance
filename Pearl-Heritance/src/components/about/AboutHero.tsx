import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getActiveAboutHero,
  type AboutHeroData,
} from "../../api/aboutHero";

export default function AboutHero() {
  const [hero, setHero] = useState<AboutHeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getActiveAboutHero();
        setHero(data);
      } catch (error) {
        console.error("Failed to fetch about hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <section className="container-wide">
        <div className="relative min-h-[320px] overflow-hidden rounded-[44px] bg-[var(--navy)] md:min-h-[420px]" />
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section className="container-wide">
      <div className="relative overflow-hidden rounded-[44px] bg-black">
        {/* background image */}
        <img
          src={hero.background_image}
          alt={hero.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* centered title */}
        <div className="relative z-10 flex min-h-[320px] items-center justify-center px-6 text-center md:min-h-[420px]">
          <div>
            <h1 className="heading-font text-4xl font-semibold text-white md:text-6xl">
              {hero.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-white/85">
              {hero.breadcrumb?.map((item, index) => {
                const isLast = index === hero.breadcrumb.length - 1;
                const path =
                  item.link ||
                  (item.label.toLowerCase() === "home" ? "/" : undefined);

                return (
                  <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {!isLast && path ? (
                      <NavLink to={path} className="transition hover:text-white">
                        {item.label}
                      </NavLink>
                    ) : (
                      <span>{item.label}</span>
                    )}

                    {!isLast && <span className="opacity-70">/</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
    </section>
  );
}