import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import {
  getServiceHeroSliders,
  type ServiceSlide,
} from "../../api/serviceherosliders";

export default function ServicesHeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<ServiceSlide[]>([]);

  useEffect(() => {
    getServiceHeroSliders()
      .then((res) => setSlides(res.data))
      .catch(console.error);
  }, []);

  const goTo = (idx: number) => swiperRef.current?.slideToLoop(idx);

  if (!slides.length) return null;

  return (
    <section className="w-full">
      <div className="container-wide pt-10">
        <div className="overflow-hidden rounded-[34px] border border-[var(--border)] bg-white shadow-md">
          {/* TOP: Service tabs */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Our Services
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {slides.map((s, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={[
                      "relative w-full rounded-2xl border px-4 py-3 text-left transition",
                      isActive
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-sm"
                        : "border-[var(--border)] bg-white text-[var(--navy)] hover:bg-[var(--surface)]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full transition",
                          isActive ? "bg-[var(--sky)]" : "bg-[var(--border)]",
                        ].join(" ")}
                      />
                      <span className="text-[14px] font-semibold leading-snug sm:text-[15px]">
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

          {/* BOTTOM: Hero image */}
          <div className="relative h-[58vh] min-h-[420px] w-full sm:h-[64vh] sm:min-h-[500px] lg:h-[70vh] lg:min-h-[560px]">
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

                    {/* overlays */}
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {/* TEXT PANEL */}
                    <div className="relative z-10 flex h-full items-center">
                      <div className="container-wide">
                        <div className="max-w-3xl rounded-[24px] border border-white/10 bg-black/35 p-5 backdrop-blur-sm sm:rounded-[28px] sm:p-6 lg:p-8">
                          <div className="mb-3 inline-flex items-center gap-2 text-white/80 sm:mb-4">
                            <span className="h-2 w-2 rounded-full bg-[var(--sky)]" />
                            <span className="text-[10px] uppercase tracking-[0.22em] sm:text-xs">
                              {s.eyebrow}
                            </span>
                          </div>

                          <h2 className="heading-font text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                            {s.title_line1}
                            <br />
                            <span className="relative mt-2 inline-block sm:mt-3">
                              <span className="relative z-10 bg-gradient-to-r from-[var(--navy)] to-[var(--sky)] bg-clip-text text-transparent">
                                {s.title_line2}
                              </span>
                              <span className="absolute bottom-1 left-0 h-2 w-full rounded-lg bg-[var(--sky)]/20 -rotate-1 sm:bottom-2 sm:h-3" />
                            </span>
                          </h2>

                          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg">
                            {s.description}
                          </p>

                          {/* hide buttons on mobile */}
                          <div className="mt-7 hidden flex-wrap gap-3 sm:flex">
                            <a
                              href={s.primary_button_link ?? "/contact"}
                              className="rounded-full bg-[var(--sky)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                            >
                              {s.primary_button_text}
                            </a>
                            <a
                              href={s.secondary_button_link ?? "/projects"}
                              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                              {s.secondary_button_text}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* count badge */}
                    <div className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] text-white backdrop-blur sm:right-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
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