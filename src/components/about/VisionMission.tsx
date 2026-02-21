export default function VisionMission() {
  return (
    <section className="container-wide mt-20">
      {/* Section Header */}
      <div className="max-w-xl mb-10">
        <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--muted)]">
          Our Philosophy
        </p>
        <h2 className="mt-3 heading-font text-3xl md:text-4xl font-semibold text-[color:var(--navy)]">
          Vision & Mission
        </h2>
        <p className="mt-3 text-[15px] text-black/60 leading-relaxed">
          The principles that guide our decisions, projects, and long-term direction.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Vision */}
        <div
          className="
            group rounded-[28px]
            border border-[color:var(--border)]
            bg-white
            p-7 md:p-9
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_40px_rgba(2,6,23,0.08)]
          "
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[color:var(--sky)] rounded-full" />
            <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted)]">
              Our Vision
            </p>
          </div>

          <h3 className="heading-font text-2xl md:text-3xl font-semibold text-[color:var(--navy)]">
            Creating Elevated Value
          </h3>

          <p className="mt-3 text-[15px] text-black/70 leading-relaxed">
            Transforming properties to meet high-end commercial standards,
            ensuring long-term value, efficiency, and sustainable growth.
          </p>
        </div>

        {/* Mission */}
        <div
          className="
            group rounded-[28px]
            border border-[color:var(--border)]
            bg-white
            p-7 md:p-9
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_40px_rgba(2,6,23,0.08)]
          "
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[color:var(--navy)] rounded-full" />
            <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted)]">
              Our Mission
            </p>
          </div>

          <h3 className="heading-font text-2xl md:text-3xl font-semibold text-[color:var(--navy)]">
            Delivering Hassle-Free Expertise
          </h3>

          <p className="mt-3 text-[15px] text-black/70 leading-relaxed">
            Deliver client-focused, reliable, and professionally qualified
            services through a seamless, all-in-one consultancy and construction
            experience.
          </p>
        </div>
      </div>
    </section>
  );
}