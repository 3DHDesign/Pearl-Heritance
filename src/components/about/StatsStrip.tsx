const stats = [
    { label: "Years of Experience", value: "20+" },
    { label: "Projects Supported", value: "150+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Service Areas", value: "Islandwide" },
  ];
  
  export default function StatsStrip() {
    return (
      <section className="container-wide mt-14">
        <div className="rounded-[28px] bg-[color:var(--surface)] border border-[color:var(--border)] p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="heading-font text-3xl md:text-4xl font-semibold text-[color:var(--navy)]">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-black/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  