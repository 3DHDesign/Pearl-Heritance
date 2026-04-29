import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import {
  getServiceHeroSliders,
  type ServiceSlide,
} from "../../api/serviceherosliders";
import { motion } from "framer-motion";
type ServiceSlideWithText = ServiceSlide & {
  longText?: string;
};


export default function ServicesHeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<ServiceSlide[]>([]); 
  const [selectedSlide, setSelectedSlide] = useState<ServiceSlideWithText | null>(null);

  
  const longDescriptions: Record<string, string> = {
    "Residential Buildings": `As we know, people are generally more sensitive about residential spaces compared to other types of environments. Therefore, we pay careful attention to functionality, spatial awareness, safety, and aesthetics—often even more so than our clients. Natural light and ventilation, along with air quality, are essential components of a living space. We strive to create practical, hassle-free living environments for everyone using our services. We are responsible for the statutory approval process and manage your project from its inception to completion and handover.`,
    "Commercial & other buildings": `Commercial buildings are always considered investments, so we prioritize creating quality and safe spaces at minimal cost and with low maintenance. Our aim is to develop cost-effective projects that minimize energy consumption...`,

    "Interior": `Interior arrangement transforms a space into a functional and aesthetically pleasing environment...`,

    "Renovations": `Renovating a building can completely transform its exterior or interior. Our approach focuses on preserving the existing structure...`,

    "Property Management": `We recognized that a property management service connected to the construction industry...`,

    "Maintenance": `Maintaining a building properly is essential for a good living environment...`,

    "Manufacturing": `Maintaining a building properly is essential for a good living environment and to preserve its condition...`,

    "Tourist Amenities & eco-friendly buildings": `Currently, the tourism industry is expanding in various areas, and Sri Lanka has emerged as an excellent destination for both cultural and environmental tourism. In our projects, we focus on developing sustainable buildings that utilize renewable energy sources. Our spaces are designed to harmonize with nature, capturing a sense of local cultural simplicity and richness. The approval process for these types of projects can sometimes be quite rigorous, but we manage everything from the conceptual stage to completion.`,
  };

  useEffect(() => {
    getServiceHeroSliders()
      .then((res) => {
        const data = res.data ?? [];
        setSlides(data);
        setActiveIndex(0);
      })
      .catch(console.error);
  }, []);

  const goTo = (idx: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(idx);
  };

  useEffect(() => {
    if (!slides.length) return;

    setActiveIndex((prev) => {
      if (prev >= slides.length) return 0;
      return prev;
    });
  }, [slides.length]);

  if (!slides.length) return null;


  return (
    <section className="w-full">
      <div className="container-wide pt-10">
        <div className="overflow-hidden rounded-[34px] border border-[var(--border)] bg-white shadow-md">
          {/* TOP: Tabs */}
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
                  <div key={`tab-wrap-${s.id}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        goTo(idx);
                      }}
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

                    {isActive && (
                      <div className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 lg:hidden">
                        <p className="text-sm leading-relaxed text-[var(--muted)]">
                          {s.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Slider */}
          <div className="relative h-[58vh] min-h-[420px] w-full sm:h-[64vh] sm:min-h-[500px] lg:h-[70vh] lg:min-h-[560px]">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop={slides.length > 1}
              speed={900}
              observer={true}
              observeParents={true}
              watchOverflow={true}
              autoplay={
                slides.length > 1
                  ? {
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                  : false
              }
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
              className="h-full w-full"
            >
              {slides.map((s, index) => (
                <SwiperSlide key={`slide-${s.id}-${index}`}>
                  <div className="relative h-full w-full">
                    <img
                      src={s.background_image}
                      alt={s.key_title}
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                      loading="lazy"
                      draggable={false}
                    />

                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {/* TEXT */}
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
                            <span key={activeIndex} className="relative mt-2 inline-block sm:mt-3">
  {/* TEXT */}
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
   className="relative z-10 italic text-[var(--sky)]"
  >
    {s.title_line2}
  </motion.span>

  {/* UNDERLINE */}
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="absolute bottom-0 left-0 h-[4px] w-full origin-left rounded-full bg-gradient-to-r from-[var(--sky)] via-[var(--navy)] to-[var(--sky)]"
  />
</span>
                          </h2>

                          <div className="mt-4 max-w-2xl sm:mt-5">
  <p className="text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
    {s.description}
  </p>

  {(() => {
  const key = s.key_title?.trim().toLowerCase();

  const longText = Object.entries(longDescriptions).find(([k]) =>
    k.toLowerCase() === key
  )?.[1];

  return longText ? (
    <button
      onClick={() => setSelectedSlide({ ...s, longText })}
      className="mt-2 text-[12px] font-semibold text-[var(--sky)] hover:underline"
    >
      View More
    </button>
  ) : null;
})()}
</div>

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

                    {/* Counter */}
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
      {selectedSlide && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">

    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl">

      {/* CLOSE */}
      <button
        onClick={() => setSelectedSlide(null)}
        className="absolute right-4 top-4 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="mb-3 text-lg font-bold">
        {selectedSlide.key_title}
      </h2>

      {/* FULL TEXT */}
      <p className="text-sm leading-relaxed text-gray-600">
      <p>{selectedSlide.longText}</p>
      </p>

    </div>
  </div>
)}
    </section>
  );
}