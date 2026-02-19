export default function AboutIntro() {
    return (
      <section className="container-wide mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="heading-font text-3xl md:text-4xl font-semibold">
              Who we are
            </h2>
  
            <div className="mt-5 space-y-5 text-black/70 leading-relaxed text-[15px] md:text-[16px]">
              <p>
                Pearl Heritance (Pvt) Ltd. is a well-established and leading company
                (Reg. No. PV 00309762) located in the Western Province of Sri Lanka.
              </p>
  
              <p>
                We specialize in{" "}
                <strong className="text-[color:var(--text)]">
                  construction project consultation, property development, property management,
                  and construction services
                </strong>
                .
              </p>
  
              <p>
                For the past twenty years, we observed that many properties in Sri Lanka are not
                utilized to their fullest potential. There is a significant gap in trusted
                professional property management services in the country.
              </p>
  
              <p>
                By analyzing market requirements, we offer the best solutions for your property,
                enhancing its commercial value.
              </p>
            </div>
          </div>
  
          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-7">
              <p className="text-sm uppercase tracking-widest text-[color:var(--muted)]">
                Our Team
              </p>
              <h3 className="mt-2 heading-font text-2xl font-semibold">
                Multi-disciplinary expertise
              </h3>
  
              <p className="mt-4 text-black/70 leading-relaxed text-[15px]">
                Our team comprises professionally qualified{" "}
                <strong className="text-[color:var(--text)]">
                  architects, engineers, finance consultants, business advisors, marketers, and lawyers
                </strong>{" "}
                to assist you with development consultancy, business concepts, and construction
                services including renovations and extensions.
              </p>
  
              <div className="mt-6 flex flex-wrap gap-2">
                {["Architecture", "Engineering", "Finance", "Legal", "Marketing"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-black/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  