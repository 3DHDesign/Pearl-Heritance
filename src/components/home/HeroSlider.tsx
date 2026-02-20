// src/components/HeroSlider.tsx
import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import cornerSvg from "../../assets/images/corner.svg";

 

// your white corner panel svg

type Slide = {
  id: number;
  serviceIndex: number; // 0..7
  projectName: string;
  projectDesc: string;
  tagline: string;
  imageUrl: string;
};

const services = [
  "Residential Buildings",
  "Tourist Amenities & eco-friendly buildings",
  "Commercial & other buildings",
  "Interior",
  "Renovations",
  "Property Management",
  "Maintenance",
  "Manufacturing",
];

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Internet images (temporary). Replace later with API.
  const slides: Slide[] = useMemo(
    () => [
      {
        id: 1,
        serviceIndex: 0,
        projectName: "Pearl Residence",
        projectDesc: "Elegant family living with modern architectural balance.",
        tagline:
          "We design and build residential spaces that feel calm, premium, and practical.",
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 2,
        serviceIndex: 1,
        projectName: "Eco Retreat Villa",
        projectDesc: "Tourist amenity concept with sustainable materials.",
        tagline:
          "Eco-friendly builds that blend comfort, function, and nature-first design.",
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 3,
        serviceIndex: 2,
        projectName: "Commerce Hub",
        projectDesc:
          "Commercial spaces built for performance and brand presence.",
        tagline:
          "Commercial projects that optimize flow, visibility, and lasting value.",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 4,
        serviceIndex: 3,
        projectName: "Interior Studio",
        projectDesc: "Minimal interiors with warm textures and clean geometry.",
        tagline:
          "Interior design that elevates everyday living with thoughtful details.",
        imageUrl:
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 5,
        serviceIndex: 4,
        projectName: "Renovation Renewal",
        projectDesc: "Modern upgrades without losing the original character.",
        tagline:
          "Renovations that refresh spaces while respecting structure and budget.",
        imageUrl:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 6,
        serviceIndex: 5,
        projectName: "Managed Property",
        projectDesc:
          "End-to-end care for smooth operations and tenant comfort.",
        tagline:
          "Property management that keeps your asset maintained and profitable.",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 7,
        serviceIndex: 6,
        projectName: "Care & Maintain",
        projectDesc: "Preventive maintenance for peace of mind all year round.",
        tagline:
          "Maintenance services that protect quality and reduce long-term costs.",
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 8,
        serviceIndex: 7,
        projectName: "Build & Manufacture",
        projectDesc:
          "Manufacturing support for custom components and finishes.",
        tagline:
          "Manufacturing workflows that support precision and consistent delivery.",
        imageUrl:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    []
  );

  const activeServiceIndex = slides[activeIndex]?.serviceIndex ?? 0;

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  const goToService = (serviceIndex: number) => {
    const slideIndex = slides.findIndex((s) => s.serviceIndex === serviceIndex);
    if (slideIndex >= 0) swiperRef.current?.slideToLoop(slideIndex);
  };

  return (
    <section className="w-full bg-white pt-6">
      <div className="container-wide">
        <div className="bg-[color:var(--surface)] rounded-[34px] p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* LEFT */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[color:var(--navy)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sky)]" />
                  Design &amp; Build
                </div>

                <h1 className="heading-font mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] text-[color:var(--text)]">
                  Creating Homes That <br />
                  Tell Your Story
                </h1>

                <p className="mt-5 text-[color:var(--muted)] text-lg leading-relaxed max-w-[520px]">
                  {slides[activeIndex]?.tagline}
                </p>
              </div>

              {/* Services list */}
              <div className="mt-10">
                <p className="text-xs uppercase tracking-wider text-[color:var(--muted)] font-semibold">
                  Services
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                  {services.map((name, idx) => {
                    const isActive = idx === activeServiceIndex;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => goToService(idx)}
                        className={[
                          "text-left text-[15px] leading-snug transition",
                          "cursor-pointer select-none",
                          isActive
                            ? "opacity-100 blur-0 text-[color:var(--navy)] font-semibold"
                            : "opacity-40 blur-[1px] text-[color:var(--text)] hover:opacity-70 hover:blur-0",
                        ].join(" ")}
                      >
                        <span className="inline-flex items-start gap-3">
                          <span
                            className={[
                              "mt-2 h-2 w-2 rounded-full flex-none",
                              isActive
                                ? "bg-[color:var(--sky)]"
                                : "bg-black/20",
                            ].join(" ")}
                          />
                          <span>{name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative h-[360px] md:h-[420px] lg:h-[460px]">
              {/* Image area (clipped) */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden">
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={900}
                  loop
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  onSwiper={(sw) => (swiperRef.current = sw)}
                  onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
                  className="h-full w-full"
                >
                  {slides.map((s) => (
                    <SwiperSlide key={s.id}>
                      <div className="relative h-full w-full">
                        <img
                          src={s.imageUrl}
                          alt={s.projectName}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Corner SVG panel (NOT clipped) */}
              <div className="absolute bottom-[-2px] right-[-2px] z-20 w-[320px] sm:w-[360px]">
                <img
                  src={cornerSvg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto pointer-events-none select-none"
                />

                {/* ✅ FIX: text moved DOWN slightly */}
                <div className="absolute inset-0 pt-14 pb-5 px-5 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--muted)]">
                      Project
                    </p>
                    <h3 className="heading-font mt-1 text-xl font-semibold text-[color:var(--text)]">
                      {slides[activeIndex]?.projectName}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-snug">
                      {slides[activeIndex]?.projectDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="h-10 w-10 rounded-full bg-white border border-[color:var(--border)] text-[color:var(--navy)] hover:bg-black/5 transition"
                      aria-label="Previous slide"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="h-10 w-10 rounded-full bg-white border border-[color:var(--border)] text-[color:var(--navy)] hover:bg-black/5 transition"
                      aria-label="Next slide"
                    >
                      →
                    </button>

                    <div className="ml-auto text-xs font-semibold text-[color:var(--muted)]">
                      {String(activeIndex + 1).padStart(2, "0")} / 08
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end RIGHT */}
          </div>
        </div>
      </div>
    </section>
  );
}
