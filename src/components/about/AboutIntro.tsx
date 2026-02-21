export default function AboutIntro() {
  const tags = ["Architecture", "Engineering", "Finance", "Legal", "Marketing"];

  return (
    <section className="mt-14">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT */}
          <div className="lg:col-span-7">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[color:var(--navy)]/80" />
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[color:var(--muted)]">
                About Pearl Heritance
              </span>
            </div>

            <h2 className="mt-4 heading-font text-3xl md:text-4xl font-semibold text-[color:var(--text)] leading-[1.08]">
              Who we are
            </h2>

            <div className="mt-6 space-y-5 text-[color:var(--muted)] leading-relaxed text-[15px] md:text-[16px]">
              <p>
                Pearl Heritance (Pvt) Ltd. is a well-established company (Reg. No.
                PV 00309762) based in the Western Province of Sri Lanka.
              </p>

              <p>
                We specialize in{" "}
                <span className="font-semibold text-[color:var(--text)]">
                  construction project consultation, property development, property
                  management, and construction services
                </span>
                .
              </p>

              <p>
                For the past twenty years, we’ve observed that many properties in Sri
                Lanka are not utilized to their fullest potential. There is also a
                clear gap in trusted professional property management services.
              </p>

              <p>
                By analyzing market requirements, we deliver practical solutions that
                improve performance and enhance{" "}
                <span className="font-semibold text-[color:var(--text)]">
                  long-term commercial value
                </span>
                .
              </p>
            </div>

            {/* quick stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { k: "20+", v: "Years" },
                { k: "120+", v: "Projects" },
                { k: "6+", v: "Disciplines" },
                { k: "100%", v: "Professional" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4"
                >
                  <div className="heading-font text-xl font-bold text-[color:var(--navy)] leading-none">
                    {s.k}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--muted)]">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white p-7 shadow-[0_16px_50px_rgba(2,6,23,0.08)]">
              {/* subtle accent */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[color:var(--sky)]/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[color:var(--navy)] to-[color:var(--sky)] opacity-80" />
              </div>

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[color:var(--muted)]">
                  Our Team
                </p>

                <h3 className="mt-2 heading-font text-2xl font-semibold text-[color:var(--navy)] leading-tight">
                  Multi-disciplinary expertise
                </h3>

                <p className="mt-4 text-[color:var(--muted)] leading-relaxed text-[15px]">
                  Our team includes professionally qualified{" "}
                  <span className="font-semibold text-[color:var(--text)]">
                    architects, engineers, finance consultants, business advisors,
                    marketers, and lawyers
                  </span>{" "}
                  — supporting development consultancy, business concepts, and full
                  construction delivery (renovations and extensions included).
                </p>

                {/* tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="
                        rounded-full border border-[color:var(--border)]
                        bg-[color:var(--surface)]
                        px-3 py-1 text-xs
                        text-[color:var(--muted)]
                        hover:text-[color:var(--navy)]
                        hover:border-[color:var(--navy)]/30
                        transition
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a href="/contact" className="btn-primary text-center">
                    Talk to Us
                  </a>
                  <a
                    href="/projects"
                    className="
                      inline-flex items-center justify-center rounded-full
                      border border-[color:var(--border)]
                      bg-white px-6 py-3 font-semibold
                      text-[color:var(--navy)]
                      hover:bg-black/5 transition
                    "
                  >
                    View Projects
                  </a>
                </div>
              </div>
            </div>

            {/* small note under card */}
            <p className="mt-4 text-xs text-[color:var(--muted)] leading-relaxed">
              * Professional guidance from concept to completion, aligned with Sri Lankan market realities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}