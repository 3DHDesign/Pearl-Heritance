 
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

type HeroResponse = {
  data: {
    id: number;
    background_image: string;
    eyebrow: string;
    title_line1: string;
    title_line2: string;
    description: string;
    is_active: boolean;
  };
};

export default function ExpertiseHero() {
  const [heroData, setHeroData] = useState<HeroResponse["data"] | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get<HeroResponse>(
          "http://admin.pearlhe.com/api/hero-sections/active"
        );
        setHeroData(res.data.data);
      } catch (error) {
        console.error("Hero API failed:", error);
      }
    };

    fetchHero();
  }, []);

  if (!heroData) return null;

  return (
    <section className="relative w-full overflow-hidden -mt-32">
      <div className="relative h-[100vh] min-h-[520px] w-full">

        {/* Background Image */}
        <img
          src={heroData.background_image}
          alt="Corporate architecture and professionals"
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
                  {heroData.eyebrow}
                </span>
              </div>

              <h1 className="heading-font text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                {heroData.title_line1}
                <br />
                <span className="relative inline-block mt-3">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]">
                    {heroData.title_line2}
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--sky)]/20 -rotate-1 rounded-lg -z-0" />
                </span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                {heroData.description}
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