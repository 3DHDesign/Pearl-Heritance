// src/components/about/ProjectsShowcase.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  number: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Kensington House",
    location: "Kensington, London",
    category: "Residential Buildings",
    description: "Thoughtful residential planning and construction for modern living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 2,
    number: "02",
    title: "Hudson Penthouse",
    location: "Hudson Yards, New York",
    category: "Tourist Amenities",
    description: "Sustainable luxury with breathtaking city views and eco-conscious design.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 3,
    number: "03",
    title: "Soho Loft",
    location: "Soho, New York",
    category: "Commercial Buildings",
    description: "Industrial-chic commercial space designed for creative enterprises.",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 4,
    number: "04",
    title: "Mayfair Residence",
    location: "Mayfair, London",
    category: "Interior Design",
    description: "Elegant interior design with bespoke finishes and timeless appeal.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); 
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Simple pin with no complex animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${projects.length * 80}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
        },
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [activeIndex]);

  // Separate effect for image changes (no animation fighting)
  useEffect(() => {
    if (imageRef.current) {
      // Simple opacity change
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [activeIndex]);

  const currentProject = projects[activeIndex];

  return (
    <section 
      ref={sectionRef} 
      className="container-wide relative bg-[var(--surface)]"
      style={{ height: "100vh" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--sky)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--navy)]/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="container-wide px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT - Project Info */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
              </span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--navy)]">
                Featured Projects
              </span>
            </div>

            {/* Title */}
            <h2 className="heading-font text-4xl md:text-5xl font-bold text-[var(--navy)] leading-tight mb-8">
              Beautiful Interiors With
              <br />
              <span className="text-[var(--sky)]">Lasting Appeal</span>
            </h2>

            {/* Project Navigation */}
            <div className="space-y-6 mb-10">
              {projects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => {
                    const st = ScrollTrigger.getAll().find(
                      st => st.trigger === sectionRef.current
                    );
                    if (st) {
                      const progress = idx / (projects.length - 1);
                      st.scroll(st.start + (st.end - st.start) * progress);
                    }
                  }}
                  className="group w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Number with active indicator */}
                    <span className={`
                      heading-font text-2xl font-bold transition-all duration-300 w-12
                      ${idx === activeIndex 
                        ? 'text-[var(--sky)]' 
                        : 'text-[var(--muted)] group-hover:text-[var(--navy)]'
                      }
                    `}>
                      {project.number}
                    </span>

                    {/* Title and Location */}
                    <div className="flex-1">
                      <h3 className={`
                        heading-font text-lg font-semibold transition-all duration-300
                        ${idx === activeIndex 
                          ? 'text-[var(--navy)]' 
                          : 'text-[var(--muted)] group-hover:text-[var(--navy)]'
                        }
                      `}>
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-[var(--muted)]">
                        {project.location}
                      </p>
                    </div>

                    {/* Category tag */}
                    <span className={`
                      text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border transition-all duration-300 whitespace-nowrap
                      ${idx === activeIndex 
                        ? 'bg-[var(--sky)] border-[var(--sky)] text-white' 
                        : 'border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--sky)]'
                      }
                    `}>
                      {project.category.split(' ')[0]}
                    </span>
                  </div>

                  {/* Active line indicator */}
                  {idx === activeIndex && (
                    <div className="mt-2 ml-16 h-0.5 w-12 bg-gradient-to-r from-[var(--sky)] to-transparent" />
                  )}
                </button>
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="flex items-center gap-6">
              <button className="group flex items-center gap-3 text-[var(--navy)] hover:text-[var(--sky)] transition-colors">
                <span className="heading-font font-semibold">View All Projects</span>
                <span className="w-8 h-8 rounded-full bg-[var(--navy)] group-hover:bg-[var(--sky)] text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <FaArrowRight className="text-xs" />
                </span>
              </button>

              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[var(--muted)]">/</span>
                <span className="text-sm text-[var(--muted)]">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT - Project Image */}
          <div className="relative z-10">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Image with fade transition */}
              <div className="relative w-full h-full">
                {projects.map((project, idx) => (
                  <img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ 
                      opacity: idx === activeIndex ? 1 : 0,
                      pointerEvents: idx === activeIndex ? 'auto' : 'none'
                    }}
                    loading="lazy"
                  />
                ))}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Category badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[var(--navy)] border border-[var(--border)]">
                  {currentProject.category}
                </span>
              </div>

              {/* Location badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-[var(--border)]">
                  <h4 className="heading-font text-xl font-semibold text-[var(--navy)] mb-1">
                    {currentProject.title}
                  </h4>
                  <p className="font-body text-sm text-[var(--muted)] mb-2">
                    {currentProject.location}
                  </p>
                  <p className="font-body text-xs text-[var(--muted)]">
                    {currentProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--sky)]/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Simple Progress Bar */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[var(--border)] z-20">
        <div 
          className="w-full bg-gradient-to-b from-[var(--sky)] to-[var(--navy)] transition-all duration-300"
          style={{ 
            height: `${((activeIndex + 1) / projects.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}