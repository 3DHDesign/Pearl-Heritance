 // src/components/HeroSlider.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import cornerSvg from "../../assets/images/corner.svg";

// Import Swiper CSS
import "swiper/css";

type Slide = {
  id: number;
  serviceIndex: number;
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

  // Preload nearby slides for smooth transitions
  useEffect(() => {
    const count = slides.length;
    if (!count) return;

    const idxs = [
      activeIndex,
      (activeIndex + 1) % count,
      (activeIndex + 2) % count,
      (activeIndex - 1 + count) % count,
    ];

    idxs.forEach((i) => {
      const s = slides[i];
      if (!s) return;
      const img = new Image();
      img.src = s.imageUrl;
    });
  }, [activeIndex, slides]);

  const activeServiceIndex = slides[activeIndex]?.serviceIndex ?? 0;

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  const goToService = (serviceIndex: number) => {
    const slideIndex = slides.findIndex((s) => s.serviceIndex === serviceIndex);
    if (slideIndex >= 0) swiperRef.current?.slideToLoop(slideIndex);
  };

  return (
    <section className="w-full bg-gradient-to-b   pt-8 pb-4">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-10 border border-[var(--border)] shadow-2xl shadow-black/5">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* LEFT COLUMN */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                {/* Animated badge */}
                <div className="inline-flex items-center gap-2 group">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--navy)]">
                    Design & Build
                  </span>
                </div>

                {/* Headline with gradient */}
                <h1 className="heading-font text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-[1.1] tracking-tight">
                  Creating Homes That
                  <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]">
                      Tell Your Story
                    </span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--sky)]/20 -rotate-1 rounded-lg -z-0" />
                  </span>
                </h1>

                {/* Tagline with fade effect */}
                <p
                  key={activeIndex}
                  className="text-[var(--muted)] text-lg leading-relaxed max-w-[520px] font-light transition-opacity duration-500"
                >
                  {slides[activeIndex]?.tagline}
                </p>
              </div>

              {/* Services grid with blur effect */}
              <div className="pt-4">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)] mb-5">
                  Our Services
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((name, idx) => {
                    const isActive = idx === activeServiceIndex;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => goToService(idx)}
                        className={`
                          group relative text-left px-4 py-3 rounded-xl transition-all duration-500
                          ${isActive 
                            ? 'bg-[var(--navy)]/5' 
                            : 'hover:bg-[var(--surface)]'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {/* Animated dot */}
                          <span className={`
                            w-2 h-2 rounded-full transition-all duration-500
                            ${isActive
                              ? 'bg-[var(--sky)] scale-110'
                              : 'bg-[var(--border)] scale-90 group-hover:scale-100 group-hover:bg-[var(--navy)]/40'
                            }
                          `} />
                          
                          {/* Service name with blur effect */}
                          <span className={`
                            text-[15px] font-medium transition-all duration-500
                            ${isActive
                              ? 'text-[var(--navy)] blur-0'
                              : 'text-[var(--muted)] blur-[0.5px] group-hover:blur-0 group-hover:text-[var(--navy)]'
                            }
                          `}>
                            {name}
                          </span>
                        </div>

                        {/* Active indicator line */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--sky)] to-transparent rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Image Slider */}
            <div className="relative h-[400px] md:h-[460px] lg:h-[500px] group">
              {/* Image container */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
                <Swiper
                  modules={[Autoplay]}
                  effect="slide"
                  slidesPerView={1}
                  spaceBetween={0}
                  speed={800}
                  loop
                  loopAdditionalSlides={2}
                  watchSlidesProgress
                  resistanceRatio={0.85}
                  autoplay={{ 
                    delay: 5000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true 
                  }}
                  onSwiper={(sw) => (swiperRef.current = sw)}
                  onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
                  className="h-full w-full"
                >
                  {slides.map((s, idx) => (
                    <SwiperSlide key={s.id}>
                      <div className="relative h-full w-full">
                        <img
                          src={s.imageUrl}
                          alt={s.projectName}
                          className="h-full w-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                          loading="eager"
                          decoding="async"
                          fetchPriority={idx === 0 ? "high" : "auto"}
                          draggable={false}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Corner SVG panel */}
              <div className="absolute bottom-[-2px] right-[-2px] z-20 w-[340px] sm:w-[380px] transform transition-transform duration-500 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]">
                <img
                  src={cornerSvg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto pointer-events-none select-none"
                  style={{
                    filter: 'brightness(0.98)',
                  }}
                />

                <div className="absolute inset-0 pt-16 pb-6 px-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      Featured Project
                    </p>
                    <h3 className="heading-font text-xl md:text-2xl font-semibold text-[var(--navy)]">
                      {slides[activeIndex]?.projectName}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-snug line-clamp-2">
                      {slides[activeIndex]?.projectDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="h-10 w-10 rounded-full bg-white border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                      aria-label="Previous slide"
                    >
                      <span className="text-lg">←</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="h-10 w-10 rounded-full bg-white border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                      aria-label="Next slide"
                    >
                      <span className="text-lg">→</span>
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-[var(--navy)]">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-[var(--muted)]">/</span>
                      <span className="text-xs text-[var(--muted)]">
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-2 left-6 right-6 h-0.5 bg-[var(--border)]/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-all duration-300"
                      style={{ 
                        width: `${((activeIndex + 1) / slides.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Active indicator */}
              <div className="absolute top-4 left-4 z-30">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono text-[var(--navy)] border border-[var(--border)] shadow-sm">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}