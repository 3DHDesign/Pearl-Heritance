// TestimonialsSection.tsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import sideSvg from "../../assets/images/side.svg";

// Import Swiper CSS
import "swiper/css";

// ── testimonials data ──────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    stars: 5,
    quote:
      "From start to finish the process was smooth and professional. The team managed every challenge with creativity and dedication, turning my office into a space that inspires productivity, sophistication, and genuine appreciation daily!",
    name: "Michael Brown",
    role: "Business Consultant",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    stars: 5,
    quote:
      "I was impressed by how effortlessly they balanced aesthetics with functionality. Every room is not only visually striking but also comfortable, making my daily living more enjoyable and stylish while adding real value to my home!",
    name: "Emma Williams",
    role: "Creative Strategist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    stars: 5,
    quote:
      "Their approach to design completely exceeded my expectations — combining textures, colors, and lighting in ways that elevated my apartment. The professionalism of the entire team ensured a seamless and rewarding experience!",
    name: "James Anderson",
    role: "Tech Entrepreneur",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    stars: 5,
    quote:
      "Working with this team was genuinely transformative. Their attention to detail and ability to translate our vision into reality was extraordinary. Every corner of our new headquarters reflects purpose and precision.",
    name: "Sophia Laine",
    role: "Operations Director",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    stars: 5,
    quote:
      "Exceptional service from concept to handover. They brought ideas we hadn't even imagined and executed them flawlessly. Our clients constantly remark on how impressive our space looks — it's been a total game changer.",
    name: "Daniel Osei",
    role: "Managing Partner",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

// ── stars ──────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="var(--navy)">
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="container-wide rounded-3xl relative py-24 bg-[var(--surface)] overflow-hidden">
      <style>{`
        .swiper {
          overflow: visible !important;
        }
        
        .swiper-wrapper {
          align-items: stretch !important;
        }
        
        .swiper-slide {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          height: auto !important;
          opacity: 0.45;
          transform: scale(0.94);
        }
        
        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1.03) !important;
          z-index: 10;
        }
        
        .swiper-slide-next,
        .swiper-slide-prev {
          opacity: 0.7 !important;
          transform: scale(0.98) !important;
        }
        
        .testimonial-card {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      {/* Background grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Decorative side SVG - WHITE */}
      <img 
        src={sideSvg} 
        alt="" 
        className="absolute right-[-40px] top-[-10px] w-[clamp(220px,30vw,480px)] pointer-events-none select-none z-0"
        style={{
          filter: 'brightness(2.5) contrast(0.8) saturate(0)',
          mixBlendMode: 'screen',
          opacity: 0.9
        }}
      />

      {/* Decorative circles */}
      <div className="absolute left-10 bottom-10 w-64 h-64 rounded-full bg-[var(--navy)]/5 blur-3xl" />
      <div className="absolute right-10 top-40 w-80 h-80 rounded-full bg-[var(--sky)]/5 blur-3xl" />

      <div className="container-wide px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-[var(--navy)] rounded-full" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--navy)]">
                Testimonials
              </span>
              <div className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--navy)] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--navy)]" />
              </div>
            </div>
            
            <h2 className="heading-font text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--navy)] leading-tight">
              What Our Clients
              <br />
              <span className="text-[var(--sky)]">Are Saying</span>
            </h2>
            
            <p className="font-body text-sm text-[var(--muted)] mt-3 max-w-md">
              Real feedback from the people we've had the pleasure of working with
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 pb-2">
            <button
              className="group w-12 h-12 rounded-full bg-white border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl"
              aria-label="Previous testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 4l-6 6 6 6" />
              </svg>
            </button>
            <button
              className="group w-12 h-12 rounded-full bg-white border border-[var(--border)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl"
              aria-label="Next testimonial"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 4l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── SWIPER ── */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(sw) => { swiperRef.current = sw; }}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={24}
            loop={true}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false, 
              pauseOnMouseEnter: true 
            }}
            breakpoints={{
              0:   { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              900: { slidesPerView: 2.2, spaceBetween: 24 },
              1200:{ slidesPerView: 2.8, spaceBetween: 24 },
            }}
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide 
                key={t.id} 
                style={{ width: 520, maxWidth: "90vw" }}
              >
                <div className="bg-white rounded-[32px] border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all duration-500 p-8 h-full relative group">
                  {/* Quote mark decor */}
                  <div className="absolute top-6 right-8 text-[120px] leading-none font-serif text-[var(--navy)]/5 pointer-events-none select-none">
                    &quot;
                  </div>

                  {/* Star rating */}
                  <Stars count={t.stars} />

                  {/* Quote text */}
                  <blockquote className="font-body text-[15px] leading-relaxed text-[var(--text)] mb-6 relative z-10">
                    "{t.quote}"
                  </blockquote>

                  {/* Divider with gradient */}
                  <div className="h-px mb-6 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  {/* Author section - NO VERIFIED BADGE */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with ring */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-[var(--border)] group-hover:border-[var(--sky)]/30 transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-[var(--sky)] scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                    </div>

                    {/* Name & role */}
                    <div>
                      <h3 className="heading-font text-lg font-semibold text-[var(--navy)]">
                        {t.name}
                      </h3>
                      <p className="font-body text-xs font-medium tracking-wider uppercase text-[var(--sky)]">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-transparent via-transparent to-[var(--sky)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── RATING SUMMARY BAR ── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-[var(--border)]">
          <div className="text-center">
            <div className="heading-font text-3xl font-bold text-[var(--navy)]">4.9</div>
            <div className="flex gap-1 justify-center my-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--navy)">
                  <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
                </svg>
              ))}
            </div>
            <div className="font-body text-xs text-[var(--muted)]">Average Rating</div>
          </div>

          <div className="w-px h-12 bg-[var(--border)]" />

          <div className="text-center">
            <div className="heading-font text-3xl font-bold text-[var(--navy)]">120+</div>
            <div className="font-body text-xs text-[var(--muted)] mt-1">Happy Clients</div>
          </div>

          <div className="w-px h-12 bg-[var(--border)]" />

          <div className="text-center">
            <div className="heading-font text-3xl font-bold text-[var(--navy)]">98%</div>
            <div className="font-body text-xs text-[var(--muted)] mt-1">Would Recommend</div>
          </div>

          <div className="w-px h-12 bg-[var(--border)]" />

          <div className="text-center">
            <div className="heading-font text-3xl font-bold text-[var(--navy)]">15+</div>
            <div className="font-body text-xs text-[var(--muted)] mt-1">Years Trusted</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--sky)]" />
            Trusted by industry leaders
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--sky)]" />
            Verified reviews
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--sky)]" />
            100% confidential
          </span>
        </div>
      </div>
    </section>
  );
}