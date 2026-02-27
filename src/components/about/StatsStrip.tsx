const stats = [
  { label: "Years of Experience", value: "20+" },
  { label: "Service Areas", value: "Islandwide" },
];

export default function StatsStrip() {
  return (
    <section className="container-wide mt-20">
      <div
        className="
          relative rounded-[32px]
          border border-[color:var(--border)]
          bg-[color:var(--surface)]
          px-6 md:px-10 py-8 md:py-10
          shadow-[0_18px_60px_rgba(2,6,23,0.06)]
        "
      >
        {/* subtle glow accent */}
        <div className="absolute inset-0 rounded-[32px] pointer-events-none">
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-[color:var(--sky)]/10 blur-3xl" />
        </div>

        {/* ✅ CENTERED GRID */}
        <div className="relative flex justify-center">
          <div className="grid grid-cols-2 gap-10 md:gap-20">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group text-center px-6 relative"
              >
                {/* divider between the two */}
                {i === 0 && (
                  <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-[color:var(--border)]" />
                )}

                <p
                  className="
                    heading-font text-3xl md:text-4xl font-semibold
                    text-[color:var(--navy)]
                    tracking-tight
                    transition-all duration-300
                    group-hover:text-[color:var(--sky)]
                  "
                >
                  {s.value}
                </p>

                <p
                  className="
                    mt-2 text-sm md:text-[15px]
                    text-[color:var(--muted)]
                  "
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}