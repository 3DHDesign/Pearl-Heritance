import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

type Outcome = {
  label: string;
  value: string;
  note?: string;
};

type Service = {
  id: string;
  kicker: string;
  title: string;
  desc: string;
  bullets: string[];
  outcomes: Outcome[];
};

export default function ServicesGrid() {
  const services: Service[] = useMemo(
    () => [
      {
        id: "01",
        kicker: "Consultation",
        title: "Construction Project Consultation",
        desc: "Strategic planning and technical guidance to reduce risk, improve feasibility, and align delivery with real-world constraints.",
        bullets: [
          "Feasibility + scope definition",
          "Budget & timeline planning",
          "Authority approvals guidance",
          "Contractor selection support",
        ],
        outcomes: [
          {
            label: "Typical Engagement",
            value: "Varies",
            note: "Depends on the scale and nature of the project.",
          },
          { label: "Best For", value: "New Builds" },
        ],
      },
      {
        id: "02",
        kicker: "Development",
        title: "Property Development",
        desc: "End-to-end development support from concept to execution — ensuring commercial viability, design clarity, and build quality.",
        bullets: [
          "Concept + planning strategy",
          "Design coordination",
          "Cost control checkpoints",
          "Delivery supervision support",
        ],
        outcomes: [
          {
            label: "Typical Engagement",
            value: "Varies",
            note: "Depends on the scale and nature of the project.",
          },
          { label: "Best For", value: "Investors" },
        ],
      },
      {
        id: "03",
        kicker: "Operations",
        title: "Property Management",
        desc: "Practical management services that maximize property value through organized maintenance, tenant handling, and cost visibility.",
        bullets: [
          "Maintenance coordination",
          "Tenant communication",
          "Periodic reporting",
          "Value improvement plans",
        ],
        outcomes: [
          { label: "Typical Engagement", value: "Ongoing" },
          { label: "Best For", value: "Owners" },
        ],
      },
      {
        id: "04",
        kicker: "Build",
        title: "Construction Services",
        desc: "Reliable execution with structured planning and clear quality controls — built for timelines, safety, and long-term performance.",
        bullets: [
          "Site execution planning",
          "Quality checkpoints",
          "Progress reporting",
          "On-site coordination",
        ],
        outcomes: [
          {
            label: "Typical Engagement",
            value: "Varies",
            note: "Depends on the scale and nature of the project.",
          },
          { label: "Best For", value: "Turnkey" },
        ],
      },
      {
        id: "05",
        kicker: "Upgrade",
        title: "Renovations & Extensions",
        desc: "Modernize, expand, or reconfigure with minimal disruption — improving usability and increasing commercial value.",
        bullets: [
          "Space optimization",
          "Material + finishes guidance",
          "Structural + services coordination",
          "Phased execution support",
        ],
        outcomes: [
          {
            label: "Typical Engagement",
            value: "Varies",
            note: "Depends on the scale and nature of the project.",
          },
          { label: "Best For", value: "Existing Homes" },
        ],
      },
      {
        id: "06",
        kicker: "Strategy",
        title: "Business Advisory for Projects",
        desc: "Align architecture and development decisions with business outcomes — ensuring your property works as an asset.",
        bullets: [
          "Commercial positioning",
          "Tenant / customer flow thinking",
          "Risk + compliance awareness",
          "Value maximization strategy",
        ],
        outcomes: [
          {
            label: "Typical Engagement",
            value: "Varies",
            note: "Depends on the scale and nature of the project.",
          },
          { label: "Best For", value: "Commercial" },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState<Service>(services[0]);

  return (
    <section className="container-wide mt-20">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--muted)]">
            What We Do
          </p>

          <h2 className="mt-2 heading-font text-3xl md:text-4xl font-semibold text-[color:var(--navy)]">
            Services & <span className="text-[color:var(--sky)]">Expertise</span>
          </h2>

          <p className="mt-2 text-sm text-black/60 max-w-xl">
            Choose a service to view scope, outcomes, and what you can expect from our process.
          </p>
        </div>

        <NavLink to="/contact" className="btn-primary">
          Get a Quote
        </NavLink>
      </div>

      {/* Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Navigator */}
        <div className="lg:col-span-5">
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-3">
            {services.map((s) => {
              const isActive = s.id === active.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s)}
                  className={[
                    "w-full text-left rounded-[22px] px-4 py-4 transition-all duration-300",
                    "flex items-center gap-4",
                    isActive
                      ? "bg-[color:var(--surface)] border border-[color:var(--border)]"
                      : "hover:bg-black/[0.03]",
                  ].join(" ")}
                >
                  {/* number */}
                  <div
                    className={[
                      "heading-font text-2xl font-semibold w-12 shrink-0",
                      isActive ? "text-[color:var(--sky)]" : "text-black/20",
                    ].join(" ")}
                  >
                    {s.id}
                  </div>

                  {/* text */}
                  <div className="flex-1">
                    <div className="text-[11px] tracking-[0.24em] uppercase text-[color:var(--muted)]">
                      {s.kicker}
                    </div>
                    <div
                      className={[
                        "mt-1 heading-font text-[16px] md:text-[17px] font-semibold leading-snug",
                        isActive ? "text-[color:var(--navy)]" : "text-black/70",
                      ].join(" ")}
                    >
                      {s.title}
                    </div>
                  </div>

                  {/* arrow */}
                  <div
                    className={[
                      "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "border-[color:var(--sky)] text-[color:var(--sky)]"
                        : "border-[color:var(--border)] text-black/40",
                    ].join(" ")}
                  >
                    <FiArrowUpRight />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-[color:var(--muted)]">
            All services backed by 20+ years of industry experience.
          </p>
        </div>

        {/* Right: Detail Panel */}
        <div className="lg:col-span-7">
          <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-7 md:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.24em] uppercase text-[color:var(--muted)]">
                  Selected Service
                </p>
                <h3 className="mt-2 heading-font text-2xl md:text-3xl font-semibold text-[color:var(--navy)] leading-tight">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-black/60 max-w-2xl">
                  {active.desc}
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-2">
                <div className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2">
                  <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--navy)]">
                    {active.kicker}
                  </span>
                </div>
              </div>
            </div>

            <div className="my-7 h-px bg-[color:var(--border)]/70" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* bullets */}
              <div className="md:col-span-7">
                <p className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--muted)]">
                  What’s Included
                </p>

                <ul className="mt-4 space-y-3">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--navy)]">
                        <FiCheck size={14} />
                      </span>
                      <span className="text-sm text-black/70">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* outcomes */}
              <div className="md:col-span-5">
                <p className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--muted)]">
                  Outcomes
                </p>

                <div className="mt-4 space-y-3">
                  {active.outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="rounded-[18px] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4"
                    >
                      <p className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--muted)]">
                        {o.label}
                      </p>
                      <p className="mt-1 heading-font text-lg font-semibold text-[color:var(--navy)]">
                        {o.value}
                      </p>

                      {o.note && (
                        <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">
                          {o.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <NavLink
                  to="/contact"
                  className="
                    mt-5 inline-flex w-full items-center justify-center gap-2
                    rounded-full border border-[color:var(--border)]
                    bg-white px-5 py-3
                    font-semibold text-[color:var(--navy)]
                    hover:bg-black/[0.03] transition
                  "
                >
                  Discuss This Service <FiArrowUpRight />
                </NavLink>
              </div>
            </div>

            <div className="mt-8 h-[2px] w-24 bg-gradient-to-r from-[color:var(--sky)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}