import { useEffect, useMemo, useRef, useState } from "react";

type ServiceItem = {
  id: number;
  title: string;
  shortDesc: string;
  details: string;
  imageUrl: string;
  points: string[];
};

export default function ServicesShowcase() {
  const services: ServiceItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Residential Buildings",
        shortDesc: "Thoughtful residential planning and construction for modern living.",
        details:
          "As we know, people are generally more sensitive about residential spaces compared to other types of environments. Therefore, we pay careful attention to functionality, spatial awareness, safety, and aesthetics—often even more so than our clients. Natural light and ventilation, along with air quality, are essential components of a living space. We strive to create practical, hassle-free living environments for everyone using our services. We are responsible for the statutory approval process and manage your project from its inception to completion and handover.",
        points: [
          "Functionality + spatial awareness",
          "Natural light & ventilation focus",
          "Statutory approvals handled",
          "End-to-end project management",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 2,
        title: "Tourist Amenities & eco-friendly buildings",
        shortDesc: "Sustainable spaces designed for comfort, tourism, and long-term value.",
        details:
          "Currently, the tourism industry is expanding in various areas, and Sri Lanka has emerged as an excellent destination for both cultural and environmental tourism. In our projects, we focus on developing sustainable buildings that utilize renewable energy sources. Our spaces are designed to harmonize with nature, capturing a sense of local cultural simplicity and richness. The approval process for these types of projects can sometimes be quite rigorous, but we manage everything from the conceptual stage to completion.",
        points: [
          "Renewable & sustainable approaches",
          "Designs that harmonize with nature",
          "Cultural simplicity & richness",
          "Rigor-heavy approvals managed",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 3,
        title: "Commercial & other buildings",
        shortDesc: "Efficient commercial spaces built to support operations and brand presence.",
        details:
          "Commercial buildings are always considered investments, so we prioritize creating quality and safe spaces at minimal cost and with low maintenance. Our aim is to develop cost effective projects that minimize energy consumption. We design flexible spaces that can adapt to multiple functions over time. All projects must comply with building regulations and meet ISO and green building standards. Fire safety and other safety factors are critical in commercial projects. Obtaining statutory approval and the Certificate of Conformity (COC) for these projects is essential. We are responsible for both the project execution and the maintenance period.",
        points: [
          "Cost-effective + low maintenance",
          "Energy-conscious design",
          "Flexible multi-use spaces",
          "ISO / green building compliance",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 4,
        title: "Interior",
        shortDesc: "Interior concepts that balance aesthetics, comfort, and functionality.",
        details:
          "Interior arrangement transforms a space into a functional and aesthetically pleasing environment, marking the true completion of a building project. It should be practical, affordable, and elegant, seamlessly blending with the architecture of the area. Our goal is to create a sense of comfort and style while keeping costs to a minimum. We always strive to be attentive to our clients' needs and carefully study the architecture of the space to deliver the best results. We provide comprehensive solutions for all your interior requirements.",
        points: [
          "Practical + elegant solutions",
          "Matches architectural character",
          "Comfort + style with cost control",
          "Full interior requirements covered",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 5,
        title: "Renovations",
        shortDesc: "Upgrades and renewals that respect structure, timeline, and budget.",
        details:
          "Renovating a building can completely transform its exterior or interior. Our approach focuses on preserving the existing structure as much as possible while making minimal alterations and additions. We assess the current situation, adhere to building regulations, and consider the renovation’s purpose to ensure you achieve the best return on your investment.",
        points: [
          "Preserve existing structure",
          "Minimal alterations / additions",
          "Regulation-aligned process",
          "ROI-focused decisions",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 6,
        title: "Property Management",
        shortDesc: "Reliable ongoing care to keep assets maintained and profitable.",
        details:
          "We recognized that a property management service connected to the construction industry and development consulting would be highly beneficial for our clients. We take responsibility for letting, purchasing, and selling properties. Additionally, we offer services for property development and renovation, and assist with legal processes and advertising related to your properties.",
        points: [
          "Letting / purchasing / selling",
          "Development + renovation support",
          "Legal process assistance",
          "Advertising support",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 7,
        title: "Maintenance",
        shortDesc: "Preventive and responsive maintenance for peace of mind year-round.",
        details:
          "Maintaining a building properly is essential for a good living environment and to preserve its condition. We offer services through skilled professionals under expert supervision.",
        points: [
          "Skilled professionals",
          "Expert supervision",
          "Condition preservation",
          "Healthy living environments",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=80",
      },
      {
        id: 8,
        title: "Manufacturing",
        shortDesc: "Precision manufacturing support for custom components and finishes.",
        details:
          "Doors, windows, and wooden furniture. We provide manufacturing support for custom components and finishes through skilled professionals under expert supervision.",
        points: [
          "Doors & windows",
          "Wooden furniture",
          "Custom components & finishes",
          "Quality under supervision",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1800&q=80",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pause, setPause] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (pause) return;

    intervalRef.current = window.setInterval(() => {
      setActive((p) => (p + 1) % services.length);
    }, 5000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [pause, services.length]);

  const current = services[active];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container-wide">
        <div className="bg-[color:var(--surface)] rounded-[34px] p-6 md:p-10">
          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[color:var(--muted)]">
              OUR SERVICES
            </p>

            <h2 className="heading-font mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[color:var(--text)]">
              Professional Interior Solutions For{" "}
              <br className="hidden md:block" />
              Distinctive Homes
            </h2>
          </div>

          {/* BODY */}
          <div
            className="mt-12 grid lg:grid-cols-2 gap-10 items-start"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
          >
            {/* LEFT – LIST */}
            <div className="space-y-2">
              {services.map((s, idx) => {
                const isActive = idx === active;
                const isHovered = idx === hovered;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(idx)}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className="w-full text-left"
                  >
                    <div
                      className={[
                        "group relative px-4 py-5 rounded-2xl transition-all duration-300 border",
                        isActive
                          ? "bg-white border-[color:var(--border)] shadow-sm"
                          : "bg-transparent border-transparent hover:bg-white/60 hover:border-[color:var(--border)]",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-5">
                        {/* NUMBER */}
                        <div
                          className={[
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition",
                            isActive
                              ? "bg-[color:var(--navy)] text-white"
                              : "bg-white/70 border border-[color:var(--border)] text-[color:var(--muted)]",
                          ].join(" ")}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>

                        {/* TITLE */}
                        <div className="flex-1">
                          <h3
                            className={[
                              "heading-font text-lg md:text-xl font-semibold transition",
                              isActive
                                ? "text-[color:var(--navy)]"
                                : "text-[color:var(--text)] group-hover:text-[color:var(--navy)]",
                            ].join(" ")}
                          >
                            {s.title}
                          </h3>

                          {/* UNDERLINE */}
                          <div
                            className={[
                              "mt-1 h-[2px] rounded-full transition-all duration-300",
                              isActive ? "w-16 bg-[color:var(--sky)]/40" : "w-0",
                            ].join(" ")}
                          />
                        </div>

                        {/* ARROW */}
                        <span
                          className={[
                            "text-lg transition",
                            isActive
                              ? "opacity-60 text-[color:var(--muted)]"
                              : "opacity-0 group-hover:opacity-30 text-[color:var(--muted)]",
                          ].join(" ")}
                        >
                          →
                        </span>
                      </div>

                      {/* SHORT DESCRIPTION REVEAL */}
                      <div
                        className={[
                          "overflow-hidden transition-all duration-300",
                          isActive || isHovered ? "max-h-24 mt-2" : "max-h-0",
                        ].join(" ")}
                      >
                        <p className="text-sm text-[color:var(--muted)] pl-[60px]">
                          {s.shortDesc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT – IMAGE + LONG CONTENT */}
            <div className="rounded-[26px] overflow-hidden bg-white border border-[color:var(--border)] shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
              {/* image */}
              <div className="relative h-[280px] md:h-[340px]">
                <img
                  key={active}
                  src={current.imageUrl}
                  alt={current.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                {/* title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-4 py-2 border border-white/40">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--navy)]">
                      Featured Service
                    </p>
                  </div>

                  <h3 className="heading-font mt-3 text-2xl md:text-3xl font-semibold text-white drop-shadow">
                    {current.title}
                  </h3>
                </div>
              </div>

              {/* content */}
              <div className="p-6 md:p-7">
                {/* points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.points.map((p) => (
                    <div
                      key={p}
                      className="flex items-start gap-2 rounded-xl bg-[color:var(--surface)] px-3 py-2 border border-[color:var(--border)]"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                      <p className="text-sm text-[color:var(--text)]">{p}</p>
                    </div>
                  ))}
                </div>

                {/* long text (scrollable, neat) */}
                <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white p-4">
                  <div className="max-h-[200px] overflow-y-auto pr-2">
                    <p className="text-sm md:text-[15px] leading-relaxed text-[color:var(--muted)] whitespace-pre-line">
                      {current.details}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="rounded-full bg-[color:var(--navy)] text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
                  >
                    Discuss Your Project →
                  </a>
                  <a
                    href="/projects"
                    className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] hover:bg-[color:var(--surface)] transition"
                  >
                    View Projects
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}