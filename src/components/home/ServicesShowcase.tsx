import { useEffect, useMemo, useRef, useState } from "react";

type ServiceItem = {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
};

export default function ServicesShowcase() {
  const services: ServiceItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Residential Buildings",
        desc: "Thoughtful residential planning and construction for modern living.",
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 2,
        title: "Tourist Amenities & eco-friendly buildings",
        desc: "Sustainable spaces designed for comfort, tourism, and long-term value.",
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 3,
        title: "Commercial & other buildings",
        desc: "Efficient commercial spaces built to support operations and brand presence.",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 4,
        title: "Interior",
        desc: "Interior concepts that balance aesthetics, comfort, and functionality.",
        imageUrl:
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 5,
        title: "Renovations",
        desc: "Upgrades and renewals that respect structure, timeline, and budget.",
        imageUrl:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 6,
        title: "Property Management",
        desc: "Reliable ongoing care to keep assets maintained and profitable.",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 7,
        title: "Maintenance",
        desc: "Preventive and responsive maintenance for peace of mind year-round.",
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: 8,
        title: "Manufacturing",
        desc: "Precision manufacturing support for custom components and finishes.",
        imageUrl:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pause, setPause] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // ✅ Autoplay rotation
  useEffect(() => {
    if (pause) return;

    intervalRef.current = window.setInterval(() => {
      setActive((p) => (p + 1) % services.length);
    }, 4000);

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
              Professional Interior Solutions For <br className="hidden md:block" />
              Distinctive Homes
            </h2>
          </div>

          {/* BODY */}
          <div
            className="mt-12 grid lg:grid-cols-2 gap-10 items-center"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
          >

            {/* LEFT – LIST */}
            <div className="space-y-1">
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
                      className={`
                        group relative px-4 py-5 rounded-2xl transition-all duration-300
                        ${isActive ? "bg-white shadow-sm" : "hover:bg-white/60"}
                      `}
                    >
                      <div className="flex items-center gap-5">
                        
                        {/* NUMBER */}
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            text-sm font-semibold transition
                            ${isActive
                              ? "bg-[color:var(--navy)] text-white"
                              : "bg-gray-100 text-gray-400"}
                          `}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>

                        {/* TITLE */}
                        <div className="flex-1">
                          <h3
                            className={`
                              heading-font text-lg md:text-xl font-semibold transition
                              ${isActive
                                ? "text-[color:var(--navy)]"
                                : "text-[color:var(--text)] group-hover:text-[color:var(--navy)]"}
                            `}
                          >
                            {s.title}
                          </h3>

                          {/* UNDERLINE */}
                          <div
                            className={`
                              mt-1 h-[2px] rounded-full transition-all duration-300
                              ${isActive ? "w-16 bg-[color:var(--sky)]/40" : "w-0"}
                            `}
                          />
                        </div>

                        {/* ARROW */}
                        <span
                          className={`
                            text-lg transition
                            ${isActive ? "opacity-60" : "opacity-0 group-hover:opacity-30"}
                          `}
                        >
                          →
                        </span>
                      </div>

                      {/* DESCRIPTION REVEAL */}
                      <div
                        className={`
                          overflow-hidden transition-all duration-400
                          ${isActive || isHovered ? "max-h-20 mt-2" : "max-h-0"}
                        `}
                      >
                        <p className="text-sm text-[color:var(--muted)] pl-[60px]">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT – IMAGE */}
            <div className="rounded-[26px] overflow-hidden bg-white border border-[color:var(--border)] shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
              
              <div className="relative h-[300px] md:h-[360px]">
                <img
                  key={active}
                  src={current.imageUrl}
                  alt={current.title}
                  className="h-full w-full object-cover transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
                  Featured Service
                </p>

                <h3 className="heading-font mt-2 text-xl font-semibold text-[color:var(--text)]">
                  {current.title}
                </h3>

                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {current.desc}
                </p>

                <button className="mt-4 text-sm font-semibold text-[color:var(--navy)] hover:opacity-70 transition">
                  Learn more →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
