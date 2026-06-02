import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Removed Autoplay to fix TS warning
import { getOurServices, type OurServicesSection } from "../../api/ourservices";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// Swiper styles 

export default function ServicesShowcase() {
  const [section, setSection] = useState<OurServicesSection | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pause, setPause] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getOurServices()
      .then((res) => {
        const nextSection = res.data[0] ?? null;
        setSection(nextSection);
        setActive(0);
      })
      .catch((error) => console.error("Failed to fetch services:", error));
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const services = section?.services.filter((service) => service.is_active) ?? [];

  useEffect(() => {
    if (!services.length) return;
    setActive((prev) => (prev >= services.length ? 0 : prev));
  }, [services.length]);

  // Desktop Autoplay Logic (Using your interval)
  useEffect(() => {
    if (isMobile || pause || services.length <= 1) return;

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isMobile, pause, services.length]);

  if (!section) return null;

  if (!services.length) return null;

  const current = services[active] ?? services[0];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container-wide">
        <div className="rounded-[34px] bg-[color:var(--surface)] p-5 md:p-8 lg:p-10">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)]">
              {section.eyebrow}
            </p>
            <h2 className="heading-font mt-3 text-3xl font-semibold leading-tight text-[color:var(--text)] md:text-4xl lg:text-5xl">
              {section.title_line1}
              <br className="hidden md:block" />
              {section.title_line2}
            </h2>
          </div>

          {/* Mobile / Tablet Slider - Manual Only */}
          <div className="relative mt-10 lg:hidden px-2">
            <button className="services-prev absolute -left-2 top-[30%] z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--text)] shadow-md transition-transform active:scale-90">
              <IoChevronBack size={18} />
            </button>
            <button className="services-next absolute -right-2 top-[30%] z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--text)] shadow-md transition-transform active:scale-90">
              <IoChevronForward size={18} />
            </button>

            <Swiper
              modules={[Pagination, Navigation]} 
              spaceBetween={20}
              slidesPerView={1}
              loop={services.length > 1}
              navigation={{
                prevEl: ".services-prev",
                nextEl: ".services-next",
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              onSlideChange={(swiper) => setActive(swiper.realIndex)}
              className="services-mobile-swiper !pb-12"
            >
              {services.map((service) => (
                <SwiperSlide key={`service-mobile-${service.id}`}>
                  <div className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
                    <div className="relative h-[250px] sm:h-[300px]">
                      <img src={service.image} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-[color:var(--navy)] shadow">
                          {service.number}
                        </div>
                        <h3 className="heading-font text-2xl font-semibold leading-snug text-white drop-shadow">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 gap-2">
                        {service.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[color:var(--sky)]" />
                            <p className="text-sm font-medium text-[color:var(--text)]">{highlight.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white p-4">
                        <p className="text-sm leading-relaxed text-[color:var(--muted)]">{service.short_description}</p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href={service.primary_link ?? "/contact"} className="rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white">{service.primary_text} →</a>
                        <a href={service.secondary_link ?? "/projects"} className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)]">{service.secondary_text}</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Layout - Autoplays via the interval logic above */}
          {current && (
            <div
              className="mt-12 hidden items-start gap-10 lg:grid lg:grid-cols-2"
              onMouseEnter={() => setPause(true)}
              onMouseLeave={() => setPause(false)}
            >
              <div className="space-y-2">
                {services.map((service, idx) => {
                  const isActive = idx === active;
                  const isHovered = idx === hovered;
                  return (
                    <button
                      key={`service-desktop-${service.id}`}
                      type="button"
                      onClick={() => setActive(idx)}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                      className="w-full text-left"
                    >
                      <div className={`group relative rounded-2xl border px-4 py-5 transition-all duration-300 ${isActive ? "border-[color:var(--border)] bg-white shadow-sm" : "border-transparent bg-transparent hover:border-[color:var(--border)] hover:bg-white/60"}`}>
                        <div className="flex items-center gap-5">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${isActive ? "bg-[color:var(--navy)] text-white" : "border border-[color:var(--border)] bg-white/70 text-[color:var(--muted)]"}`}>
                            {service.number}
                          </div>
                          <div className="flex-1">
                            <h3 className={`heading-font text-lg font-semibold transition md:text-xl ${isActive ? "text-[color:var(--navy)]" : "text-[color:var(--text)] group-hover:text-[color:var(--navy)]"}`}>
                              {service.title}
                            </h3>
                            <div className={`mt-1 h-[2px] rounded-full transition-all duration-300 ${isActive ? "w-16 bg-[color:var(--sky)]/40" : "w-0"}`} />
                          </div>
                          <span className={`text-lg transition ${isActive ? "text-[color:var(--muted)] opacity-60" : "text-[color:var(--muted)] opacity-0 group-hover:opacity-30"}`}>→</span>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${isActive || isHovered ? "mt-2 max-h-24" : "max-h-0"}`}>
                          <p className="pl-[60px] text-sm text-[color:var(--muted)]">{service.short_description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Side Featured Card */}
              <div className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
                <div className="relative h-[280px] md:h-[340px]">
                  <img key={`img-${current.id}`} src={current.image} alt={current.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="heading-font mt-3 text-2xl font-semibold text-white drop-shadow md:text-3xl">{current.title}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {current.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                        <p className="text-sm text-[color:var(--text)]">{h.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white p-4">
                    <div className="max-h-[200px] overflow-y-auto pr-2">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-[color:var(--muted)] md:text-[15px]">{current.description}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={current.primary_link ?? "/contact"} className="rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">{current.primary_text} →</a>
                    <a href={current.secondary_link ?? "/projects"} className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] transition hover:bg-[color:var(--surface)]">{current.secondary_text}</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}