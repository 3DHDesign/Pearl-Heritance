import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type ServiceSlide = {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
};

export default function ServicesHeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: ServiceSlide[] = useMemo(
    () => [
      {
        id: 1,
        title: "Residential Buildings",
        desc: "Design and build residential spaces that feel calm, premium, and practical.",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 2,
        title: "Tourist Amenities & eco-friendly buildings",
        desc: "Eco-first builds that blend comfort, function, and sustainability.",
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 3,
        title: "Commercial & other buildings",
        desc: "Commercial developments optimized for flow, visibility, and lasting value.",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 4,
        title: "Interior",
        desc: "Interior design that elevates everyday living with refined details.",
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 5,
        title: "Renovations",
        desc: "Renovations that refresh spaces while respecting structure and budget.",
        imageUrl:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 6,
        title: "Property Management",
        desc: "End-to-end care that keeps your asset maintained and profitable.",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 7,
        title: "Maintenance",
        desc: "Preventive maintenance that protects quality and reduces long-term costs.",
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2400&q=80",
      },
      {
        id: 8,
        title: "Manufacturing",
        desc: "Precision fabrication workflows that support consistent delivery.",
        imageUrl:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=2400&q=80",
      },
    ],
    []
  );

  const goTo = (idx: number) => swiperRef.current?.slideToLoop(idx);

  return (
    <section className="w-full">
      <div className="container-wide pt-10">
        <div className="rounded-[34px] border border-[var(--border)] bg-white shadow-md overflow-hidden">
          {/* TOP: Service tabs */}
          <div className="px-6 sm:px-10 py-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted)]">
                Our Services
              </p>
            </div>

            {/* two columns, clean pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slides.map((s, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={[
                      "relative w-full text-left rounded-2xl px-4 py-3 transition",
                      "border",
                      isActive
                        ? "bg-[var(--navy)] border-[var(--navy)] text-white shadow-sm"
                        : "bg-white border-[var(--border)] text-[var(--navy)] hover:bg-[var(--surface)]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full transition",
                          isActive ? "bg-[var(--sky)]" : "bg-[var(--border)]",
                        ].join(" ")}
                      />
                      <span className="text-[15px] font-semibold leading-snug">
                        {s.title}
                      </span>
                    </div>

                    {/* active underline accent */}
                    {isActive && (
                      <span className="absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full bg-gradient-to-r from-[var(--sky)] to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Full-width image */}
          <div className="relative w-full h-[70vh] min-h-[560px]">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop
              speed={900}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
              className="h-full w-full"
            >
              {slides.map((s) => (
                <SwiperSlide key={s.id}>
                  <div className="relative h-full w-full">
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* overlay for readability */}
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {/* TEXT PANEL (guaranteed readable) */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container-wide">
                        <div className="max-w-3xl rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-sm p-6 sm:p-8">
                          <div className="mb-4 inline-flex items-center gap-2 text-white/80">
                            <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
                            <span className="text-xs tracking-[0.22em] uppercase">
                              Service
                            </span>
                          </div>

                          {/* Keep your gradient style */}
                          <h2 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                            Strategic Expertise For
                            <br />
                            <span className="relative inline-block mt-3">
                              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]">
                                {s.title}
                              </span>
                              <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--sky)]/20 -rotate-1 rounded-lg -z-0" />
                            </span>
                          </h2>

                          <p className="mt-5 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                            {s.desc}
                          </p>

                          <div className="mt-7 flex flex-wrap gap-3">
                            <a
                              href="/contact"
                              className="rounded-full bg-[var(--sky)] px-6 py-3 text-sm font-semibold text-white hover:brightness-95 transition"
                            >
                              Get In Touch
                            </a>
                            <a
                              href="/projects"
                              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                            >
                              View Projects
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* slide count badge */}
                    <div className="absolute top-5 right-5 z-20 rounded-full bg-black/45 backdrop-blur px-4 py-2 text-white text-xs border border-white/15">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(slides.length).padStart(2, "0")}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}