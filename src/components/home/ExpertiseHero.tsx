import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getActiveHeroSection, type HeroSection } from "../../api/hero";

export default function ExpertiseHero() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getActiveHeroSection();
        setHero(data);
      } catch (error) {
        console.error("Failed to fetch hero section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden -mt-32">
        <div className="relative h-[100vh] min-h-[520px] w-full bg-black" />
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden -mt-29">
      <div className="relative h-[100vh] min-h-[525px] w-full">
        {/* Background Image */}
        <img
          src={hero.background_image}
          alt={hero.title_line2 || "Hero background"}
          className="absolute inset-0 h-full w-full object-cover grayscale"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container-wide">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 text-white/80">
                <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
                <span className="text-xs tracking-[0.22em] uppercase">
                  {hero.eyebrow}
                </span>
              </div>

              <h1 className="heading-font leading-[1.06] tracking-tight">
                <span className="block text-3xl font-medium text-white/65 md:text-4xl lg:text-5xl">
                  {hero.title_line1}
                </span>

                <span className="mt-3 block max-w-4xl text-4xl font-extrabold leading-[1.05] text-[#2FAFE8] md:text-5xl lg:text-6xl">
                  {hero.title_line2}
                </span>
              </h1>
              
              <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--sky)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-95 transition"
                >
                  Get In Touch <FaArrowRight className="text-xs" />
                </a>

                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </section>
  );
}