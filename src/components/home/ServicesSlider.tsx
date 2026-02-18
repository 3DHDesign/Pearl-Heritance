import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css";

import { Autoplay, Mousewheel } from "swiper/modules";
type Service = {
  id: string;
  title: string;
  desc?: string;
};

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Residential Buildings",
    desc: "Thoughtful residential planning and construction for modern living.",
  },
  { id: "02", title: "Tourist Amenities & Eco-Friendly Buildings" },
  { id: "03", title: "Commercial & Other Buildings" },
  { id: "04", title: "Interior" },
];

export default function ServicesSection() {
  return (
    <section className="py-14 bg-[var(--bg)]">
      <div className="container">
        <div className="mb-6">
          <p className="text-sm font-medium text-[var(--muted)]">What we do</p>
          <h2 className="heading-font text-2xl md:text-3xl font-semibold text-[var(--text)]">
            Core Services
          </h2>
        </div>

        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />

          <Swiper
            modules={[Autoplay, Mousewheel]}
            mousewheel={{ forceToAxis: true }}
            loop
            speed={700}
            grabCursor
            spaceBetween={16}
            slidesPerView={1.15}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // IMPORTANT
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.6 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {SERVICES.map((s) => (
              <SwiperSlide key={s.id}>
                <article
                  className="
                    h-full rounded-2xl border border-[var(--border)]
                    bg-white px-6 py-5
                    shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]
                  "
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-[var(--muted)]">
                      {s.id}
                    </span>
                    <span className="h-[2px] w-10 rounded-full bg-[var(--sky)]/60" />
                  </div>

                  <h3 className="heading-font text-lg md:text-xl font-semibold text-[var(--text)] leading-snug">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-[var(--muted)]">
                    {s.desc ??
                      "Tailored planning and delivery aligned to your project goals."}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
