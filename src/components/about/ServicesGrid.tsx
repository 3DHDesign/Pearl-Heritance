import { NavLink } from "react-router-dom";

const services = [
  "Construction Project Consultation",
  "Property Development",
  "Property Management",
  "Construction Services",
  "Renovations & Extensions",
  "Business Advisory for Projects",
];

export default function ServicesGrid() {
  return (
    <section className="container-wide mt-14">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-sm tracking-widest uppercase text-[color:var(--muted)]">
            What We Do
          </p>
          <h2 className="mt-2 heading-font text-3xl md:text-4xl font-semibold">
            Services & Expertise
          </h2>
        </div>

        <NavLink to="/contact" className="btn-primary">
          Get a Quote
        </NavLink>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s}
            className="rounded-[24px] border border-[color:var(--border)] bg-white p-6 hover:shadow-sm transition"
          >
            <p className="text-[15px] font-semibold text-[color:var(--text)]">{s}</p>
            <p className="mt-2 text-sm text-black/70 leading-relaxed">
              Professional planning, guidance, and execution tailored to your goals.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
