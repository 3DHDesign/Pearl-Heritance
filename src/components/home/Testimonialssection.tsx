// TestimonialsSection.tsx
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import sideSvg from "../../assets/images/side.svg";
import {
  getActiveTestimonials,
  type TestimonialApiItem,
} from "../../api/testimonials";
 

type TestimonialCard = {
  id: number;
  stars: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

function Stars({ count }: { count: number }) {
  return (
    <div className="mb-4 flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="var(--navy)"
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getActiveTestimonials();

        const mappedData: TestimonialCard[] = data.map(
          (item: TestimonialApiItem) => ({
            id: item.id,
            stars: 5,
            quote: item.description,
            name: item.name,
            role: item.designation,
            avatar: item.image_url,
          })
        );

        setTestimonials(mappedData);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <section className="container-wide relative overflow-x-hidden bg-[var(--surface)] py-16 md:py-24">
      <style>{`
        .testimonials-swiper {
          overflow: visible !important;
        }

        .testimonials-swiper .swiper-wrapper {
          align-items: stretch !important;
        }

        .testimonials-swiper .swiper-slide {
          height: auto !important;
          opacity: 1;
          transform: none !important;
          transition: all 0.45s ease !important;
        }

        @media (min-width: 768px) {
          .testimonials-swiper .swiper-slide {
            opacity: 0.5;
            transform: scale(0.95) !important;
          }

          .testimonials-swiper .swiper-slide-active {
            opacity: 1 !important;
            transform: scale(1) !important;
            z-index: 10;
          }

          .testimonials-swiper .swiper-slide-next,
          .testimonials-swiper .swiper-slide-prev {
            opacity: 0.75 !important;
            transform: scale(0.98) !important;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <img
        src={sideSvg}
        alt=""
        className="pointer-events-none absolute right-[-40px] top-[-10px] z-0 w-[clamp(220px,30vw,480px)] select-none"
        style={{
          filter: "brightness(2.5) contrast(0.8) saturate(0)",
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      />

      <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-[var(--navy)]/5 blur-3xl" />
      <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-[var(--sky)]/5 blur-3xl" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-6 rounded-full bg-[var(--navy)]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy)]">
                Testimonials
              </span>
              <div className="relative ml-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--navy)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--navy)]" />
              </div>
            </div>

            <h2 className="heading-font text-3xl font-bold leading-tight text-[var(--navy)] md:text-4xl lg:text-5xl">
              What Our Clients
              <br />
              <span className="text-[var(--sky)]">Are Saying</span>
            </h2>

            <p className="mt-3 max-w-md text-sm text-[var(--muted)]">
              Real feedback from the people we&apos;ve had the pleasure of
              working with
            </p>
          </div>

          <div className="flex gap-3 pb-2">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--navy)] shadow-md transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:shadow-xl"
              aria-label="Previous testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 4l-6 6 6 6" />
              </svg>
            </button>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--navy)] shadow-md transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:shadow-xl"
              aria-label="Next testimonial"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-[var(--navy)]">
            Loading testimonials...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="py-10 text-center text-[var(--navy)]">
            No testimonials available right now.
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              centeredSlides={true}
              spaceBetween={24}
              loop={testimonials.length > 1}
              autoplay={
                testimonials.length > 1
                  ? {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 14 },
                640: { slidesPerView: 1.15, spaceBetween: 16 },
                768: { slidesPerView: 1.5, spaceBetween: 20 },
                1024: { slidesPerView: 2.2, spaceBetween: 24 },
                1280: { slidesPerView: 2.8, spaceBetween: 24 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} className="!h-auto">
                  <div className="group relative h-full rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-lg transition-all duration-500 hover:shadow-2xl md:rounded-[32px] md:p-8">
                    <div className="pointer-events-none absolute right-5 top-4 select-none font-serif text-[80px] leading-none text-[var(--navy)]/5 md:right-8 md:top-6 md:text-[120px]">
                      &quot;
                    </div>

                    <Stars count={t.stars} />

                    <blockquote className="relative z-10 mb-6 text-[14px] leading-relaxed text-[var(--text)] md:text-[15px]">
                      &quot;{t.quote}&quot;
                    </blockquote>

                    <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-12 w-12 rounded-full border-2 border-[var(--border)] object-cover transition-all duration-300 group-hover:border-[var(--sky)]/30 md:h-14 md:w-14"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-[var(--sky)] opacity-0 transition-all duration-300 group-hover:opacity-100 scale-110" />
                      </div>

                      <div>
                        <h3 className="heading-font text-base font-semibold text-[var(--navy)] md:text-lg">
                          {t.name}
                        </h3>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--sky)] md:text-xs">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-transparent via-transparent to-[var(--sky)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:rounded-[32px]" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}