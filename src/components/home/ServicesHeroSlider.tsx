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
    "Residential Buildings": `As we know, people are generally more sensitive about residential spaces compared to
other types of environments. Therefore, we pay careful attention to functionality, spatial
awareness, safety, and aesthetics-often even more so than our clients. Natural light and
ventilation, along with air quality, are essential components of a living space. We strive to
create practical, hassle-free living environments for everyone using our services, We are
responsible for the statutory approval process and manage your project from its incep-
tion to completion and handover`,
    "Commercial & other buildings": `Commercial buildings are always considered investments, so we prioritize creating quali-
ty and safe spaces at minimal cost and with low maintenance. Our aim is to develop cost
effective projects that minimize energy consumption. We design flexible spaces that
can adapt to multiple functions over time. All projects must comply with building regula-
tions and meet ISO and green building standards, Fire safety and other safety factors are
critical in commercial projects. Obtaining statutory approval and the Certificate of Con-
formity (COC) for these projects is essential. We are responsible for both the project
execution and the maintenance period.`,

    "Interior": `Interior arrangement transforms a space into a functional and aesthetically pleasing environment, marking the true completion of a building project. It should be practical,affordable, and elegant, seamlessly blend-
ing with the architecture of the area. Our goal is to create a sense of comfort and style while keeping costs to a minimum. We always strive to be attentive to our clients'
needs and carefully study the architecture of the space to deliver the best results. We
provide comprehensive solutions for all your interior requirements.`,

    "Renovations": `Renovating a building can completely transform its exterior or interior. Our approach focuses on preserving the existing structure as much as possible while making minimal alterations and additions. We assess the current situation, adhere to building regulations, and consider the renovation's purpose to ensure you achieve the best return on your investment.`,

    "Property Management": `We recognized that a property management service connected to the construction industry and development consulting would be highly beneficial for our clients. We take responsibility for letting. purchasing, and selling properties. Additionally, we offer services for property development and renovation, and assist with legal processes and advertising related to your properties.`,

    "Maintenance": `Maintaining a building properly is essential for a good living environment and to pre-serve its condition. We offer services through skilled professionals under expert supervision.`,

    "Manufacturing": `Maintaining a building properly is essential for a good living environment and to preserve its condition. We offer services through skilled professionals under expert supervision.`,

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

  function SubtitleTypewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
  
    useEffect(() => {
      let i = 0;
      setDisplayedText(""); 
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50); // Adjust speed here (lower is faster)
      return () => clearInterval(timer);
    }, [text]);
  
    return <>{displayedText}</>;
  }


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
    {/* TYPING TEXT */}
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 italic text-[var(--sky)]"
    >
      <SubtitleTypewriter text={s.title_line2 ?? ""} />
    </motion.span>

    {/* SLOWER UNDERLINE */}
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ 
        duration: 0.8, // Slightly slower to match typing
        delay: 0.2, 
        ease: "easeOut" 
      }}
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
                                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider text-[var(--sky)] hover:opacity-80 lg:hidden"
                                >
                                  View 
                                  <span className="text-lg">→</span>
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
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
    {/* Backdrop with Blur */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setSelectedSlide(null)}
      className="absolute inset-0 bg-[var(--navy)]/40 backdrop-blur-md"
    />

    {/* Modal Content */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative max-h-[85vh] w-full max-w-xl overflow-hidden rounded-[32px] border border-white/20 bg-white shadow-2xl"
    >
      {/* Decorative Header Area */}
      <div className="h-2 w-full bg-gradient-to-r from-[var(--sky)] via-[var(--navy)] to-[var(--sky)]" />
      
      <div className="p-8 sm:p-10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sky)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Service Details</p>
            </div>
            <h2 className="heading-font text-2xl font-bold  text-[var(--navy)]">
              {selectedSlide.key_title}
            </h2>
          </div>
          
          <button
            onClick={() => setSelectedSlide(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--navy)] transition hover:bg-[var(--navy)] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-base leading-relaxed text-justify text-gray-600">
            {selectedSlide.longText}
          </p>
        </div>

         
      </div>
    </motion.div>
  </div>
)}
    </section>
  );
}