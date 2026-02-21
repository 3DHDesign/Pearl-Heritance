import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper CSS
 

type Service = {
  id: string;
  title: string;
  desc: string;
};

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Residential Buildings",
    desc: "Thoughtful residential planning and construction for modern living.",
  },
  {
    id: "02",
    title: "Tourist Amenities & Eco-Friendly Buildings",
    desc: "Sustainable spaces designed for comfort, tourism, and long-term value.",
  },
  {
    id: "03",
    title: "Commercial & Other Buildings",
    desc: "Efficient commercial spaces built to support operations and brand presence.",
  },
  {
    id: "04",
    title: "Interior",
    desc: "Interior concepts that balance aesthetics, comfort, and functionality.",
  },
  {
    id: "05",
    title: "Renovations",
    desc: "Upgrades and renewals that respect structure, timeline, and budget.",
  },
  {
    id: "06",
    title: "Property Management",
    desc: "Reliable ongoing care to keep assets maintained and profitable.",
  },
  {
    id: "07",
    title: "Maintenance",
    desc: "Preventive and responsive maintenance for peace of mind year-round.",
  },
  {
    id: "08",
    title: "Manufacturing",
    desc: "Precision manufacturing support for custom components and finishes.",
  },
];

export default function ServicesSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="container-wide py-16 bg-[var(--bg)]">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[var(--sky)]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted)]">
              What we do
            </span>
          </div>
          <h2 className="heading-font text-3xl md:text-4xl font-semibold text-[var(--navy)]">
            Core Services
          </h2>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 rounded-full border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors flex items-center justify-center"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 rounded-full border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors flex items-center justify-center"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        {/* Swiper */}
        <div className="relative -mx-2">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            speed={600}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!px-2"
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id}>
                {({ isActive }) => (
                  <div
                    className={`
                      h-full p-6 rounded-xl border transition-all duration-500
                      ${isActive
                        ? 'bg-white border-[var(--sky)] shadow-xl scale-[1.02]'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:bg-white hover:border-[var(--sky)]/50'
                      }
                    `}
                  >
                    {/* Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`
                        text-sm font-mono font-medium
                        ${isActive ? 'text-[var(--sky)]' : 'text-[var(--muted)]'}
                      `}>
                        {service.id}
                      </span>
                      <span className={`
                        w-8 h-px transition-all duration-500
                        ${isActive ? 'bg-[var(--sky)] w-12' : 'bg-[var(--border)]'}
                      `} />
                    </div>

                    {/* Title */}
                    <h3 className={`
                      heading-font text-lg md:text-xl font-semibold mb-3 transition-colors
                      ${isActive ? 'text-[var(--navy)]' : 'text-[var(--text)]'}
                    `}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className={`
                      text-sm leading-relaxed transition-colors
                      ${isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]'}
                    `}>
                      {service.desc}
                    </p>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--sky)] to-transparent" />
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-8">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={`
                h-1 rounded-full transition-all duration-300
                ${idx === 0 ? 'w-6 bg-[var(--sky)]' : 'w-1.5 bg-[var(--border)] hover:bg-[var(--muted)]'}
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}