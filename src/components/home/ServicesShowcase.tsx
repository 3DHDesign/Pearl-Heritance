import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getOurServices, type OurServicesSection } from "../../api/ourservices";

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

  const services = section?.services ?? [];

  useEffect(() => {
    if (!services.length) return;

    setActive((prev) => {
      if (prev >= services.length) return 0;
      return prev;
    });
  }, [services.length]);

  useEffect(() => {
    if (isMobile || pause || services.length <= 1) return;

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isMobile, pause, services.length]);

  if (!section) return null;

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

          {/* Mobile / Tablet Slider */}
          <div className="mt-10 lg:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              observer={true}
              observeParents={true}
              watchOverflow={true}
              loop={services.length > 1}
              autoplay={
                services.length > 1
                  ? {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: false,
                    }
                  : false
              }
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActive(swiper.realIndex)}
              className="services-mobile-swiper"
            >
              {services.map((service) => (
                <SwiperSlide key={`service-mobile-${service.id}`}>
                  <div className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
                    {/* Image */}
                    <div className="relative h-[250px] sm:h-[300px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

                      <div className="absolute left-4 top-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-4 py-2 backdrop-blur">
                          <span className="h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--navy)]">
                            Featured Service
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-[color:var(--navy)] shadow">
                          {service.number}
                        </div>

                        <h3 className="heading-font text-2xl font-semibold leading-snug text-white drop-shadow">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="grid grid-cols-1 gap-2">
                        {service.highlights.map((highlight, highlightIndex) => (
                          <div
                            key={`${service.id}-mobile-highlight-${highlightIndex}-${highlight.text}`}
                            className="flex items-start gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-3"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                            <p className="text-sm leading-relaxed text-[color:var(--text)]">
                              {highlight.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white p-4">
                        <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                          {service.short_description}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <a
                          href={service.primary_link ?? "/contact"}
                          className="rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          {service.primary_text} →
                        </a>

                        <a
                          href={service.secondary_link ?? "/projects"}
                          className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] transition hover:bg-[color:var(--surface)]"
                        >
                          {service.secondary_text}
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Layout */}
          {current && (
            <div
              className="mt-12 hidden items-start gap-10 lg:grid lg:grid-cols-2"
              onMouseEnter={() => setPause(true)}
              onMouseLeave={() => setPause(false)}
            >
              {/* Left List */}
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
                      <div
                        className={[
                          "group relative rounded-2xl border px-4 py-5 transition-all duration-300",
                          isActive
                            ? "border-[color:var(--border)] bg-white shadow-sm"
                            : "border-transparent bg-transparent hover:border-[color:var(--border)] hover:bg-white/60",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className={[
                              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition",
                              isActive
                                ? "bg-[color:var(--navy)] text-white"
                                : "border border-[color:var(--border)] bg-white/70 text-[color:var(--muted)]",
                            ].join(" ")}
                          >
                            {service.number}
                          </div>

                          <div className="flex-1">
                            <h3
                              className={[
                                "heading-font text-lg font-semibold transition md:text-xl",
                                isActive
                                  ? "text-[color:var(--navy)]"
                                  : "text-[color:var(--text)] group-hover:text-[color:var(--navy)]",
                              ].join(" ")}
                            >
                              {service.title}
                            </h3>

                            <div
                              className={[
                                "mt-1 h-[2px] rounded-full transition-all duration-300",
                                isActive ? "w-16 bg-[color:var(--sky)]/40" : "w-0",
                              ].join(" ")}
                            />
                          </div>

                          <span
                            className={[
                              "text-lg transition",
                              isActive
                                ? "text-[color:var(--muted)] opacity-60"
                                : "text-[color:var(--muted)] opacity-0 group-hover:opacity-30",
                            ].join(" ")}
                          >
                            →
                          </span>
                        </div>

                        <div
                          className={[
                            "overflow-hidden transition-all duration-300",
                            isActive || isHovered ? "mt-2 max-h-24" : "max-h-0",
                          ].join(" ")}
                        >
                          <p className="pl-[60px] text-sm text-[color:var(--muted)]">
                            {service.short_description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Featured Card */}
              <div className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
                <div className="relative h-[280px] md:h-[340px]">
                  <img
                    key={`featured-image-${current.id}-${active}`}
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-4 py-2 backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--navy)]">
                        Featured Service
                      </p>
                    </div>

                    <h3 className="heading-font mt-3 text-2xl font-semibold text-white drop-shadow md:text-3xl">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {current.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={`${current.id}-desktop-highlight-${highlightIndex}-${highlight.text}`}
                        className="flex items-start gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                        <p className="text-sm text-[color:var(--text)]">
                          {highlight.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white p-4">
                    <div className="max-h-[200px] overflow-y-auto pr-2">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-[color:var(--muted)] md:text-[15px]">
                        {current.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={current.primary_link ?? "/contact"}
                      className="rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {current.primary_text} →
                    </a>

                    <a
                      href={current.secondary_link ?? "/projects"}
                      className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] transition hover:bg-[color:var(--surface)]"
                    >
                      {current.secondary_text}
                    </a>
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