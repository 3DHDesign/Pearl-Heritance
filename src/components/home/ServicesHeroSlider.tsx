import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import axiosInstance from "../../api/axios"; // Adjust path to your axios instance

// Define API type based on your JSON
type ServiceApiData = {
  id: number;
  background_image: string;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  key_title: string;
  is_active: boolean;
};

export default function ServicesHeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<ServiceApiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/service-hero-sliders/active")
      .then((res) => {
        // Only use active slides
        const activeSlides = res.data.data.filter((s: ServiceApiData) => s.is_active);
        setSlides(activeSlides);
      })
      .catch((err) => console.error("Slider API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const goTo = (idx: number) => swiperRef.current?.slideToLoop(idx);

  if (loading || slides.length === 0) {
    return <div className="w-full h-[50vh] flex items-center justify-center text-[var(--muted)]">Loading Services...</div>;
  }

  return (
    <section className="w-full">
      <div className="container-wide pt-10">
        <div className="rounded-[34px] border border-[var(--border)] bg-white shadow-md overflow-hidden">
          
          {/* TOP: Service tabs (Pills) */}
          <div className="px-6 sm:px-10 py-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted)]">
                Our Services
              </p>
            </div>

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
                        {s.key_title}
                      </span>
                    </div>

                    {isActive && (
                      <span className="absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full bg-gradient-to-r from-[var(--sky)] to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Swiper Image Area */}
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
                      src={s.background_image}
                      alt={s.key_title}
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {/* Text Content */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container-wide">
                        <div className="max-w-3xl rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-sm p-6 sm:p-8">
                          <div className="mb-4 inline-flex items-center gap-2 text-white/80">
                            <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
                            <span className="text-xs tracking-[0.22em] uppercase">
                              {s.eyebrow}
                            </span>
                          </div>

                          <h2 className="heading-font text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                            {s.title_line1}
                            <br />
                            <span className="relative inline-block mt-3">
                              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]">
                                {s.title_line2}
                              </span>
                              <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--sky)]/20 -rotate-1 rounded-lg -z-0" />
                            </span>
                          </h2>

                          <p className="mt-5 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                            {s.description}
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

                    {/* Count Badge */}
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