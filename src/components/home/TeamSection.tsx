// src/components/about/TeamSection.tsx
// Tailwind-only (uses your global tokens + container-wide). No inline <style> blocks.

export default function TeamSection() {
  const roles = [
    {
      tag: "01",
      title: "Chartered Architects",
      desc: "Licensed to design, plan and oversee construction of buildings across residential, commercial and civic sectors.",
      count: "5 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect x="5" y="8" width="30" height="22" rx="2" />
          <path d="M14 30v4M26 30v4M10 34h20" />
          <path d="M11 14h18M11 19h12" />
          <path d="M25 22l4 4" />
        </svg>
      ),
    },
    {
      tag: "02",
      title: "Chartered Engineers",
      desc: "Structural and civil specialists ensuring every build meets safety codes and performs with precision.",
      count: "6 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="20" cy="20" r="12" />
          <path d="M20 8v4M20 28v4M8 20h4M28 20h4" />
          <path d="M20 20l5-5" />
          <circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      tag: "03",
      title: "Quantity Surveyors",
      desc: "Managing project costs from initial estimates through to final accounts with full financial transparency.",
      count: "4 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M8 32L20 10l12 22H8z" />
          <path d="M14 32v-6h12v6" />
          <path d="M17 26v-4h6v4" />
        </svg>
      ),
    },
    {
      tag: "04",
      title: "Project Managers",
      desc: "Orchestrating timelines, teams and resources so every project is delivered on time and within scope.",
      count: "6 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect x="7" y="12" width="26" height="20" rx="2" />
          <path d="M14 12V9a6 6 0 0112 0v3" />
          <circle cx="20" cy="22" r="3" />
          <path d="M20 25v4" />
        </svg>
      ),
    },
    {
      tag: "05",
      title: "Business Advisors",
      desc: "Strategic consultants aligning every architectural decision with commercial viability and long-term value.",
      count: "4 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M10 30V16l10-8 10 8v14" />
          <rect x="16" y="22" width="8" height="8" />
          <path d="M6 16l14-12 14 12" />
        </svg>
      ),
    },
    {
      tag: "06",
      title: "Attorneys at Law",
      desc: "Legal experts handling contracts, compliance, land rights and dispute resolution across all project phases.",
      count: "2 members",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect x="8" y="6" width="24" height="30" rx="2" />
          <path d="M13 14h14M13 19h14M13 24h8" />
          <circle cx="28" cy="28" r="6" className="fill-[color:var(--navy)] stroke-[color:var(--navy)]" />
          <path d="M26 28l1.5 1.5L30 26" stroke="#fff" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];
 

  return (
    <section className="py-[90px] pb-[100px] bg-[color:var(--bg)]">
      <div className="container-wide">
        {/* HEADER */}
        <div className="mx-auto max-w-[680px] text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[color:var(--navy)]">
              Our Team
            </span>
            <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
          </div>

          <h2 className="heading-font text-[42px] leading-[50px] md:text-[46px] md:leading-[54px] font-semibold text-[color:var(--navy)]">
            The Experts Behind
            <br />
            Every Project
          </h2>

          <p className="mt-3 text-[16px] md:text-[18px] leading-[26px] text-[color:var(--muted)]">
            A multidisciplinary team of licensed professionals — each bringing deep expertise to deliver outstanding results.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role) => (
            <div
              key={role.tag}
              className="
                group relative overflow-hidden rounded-2xl bg-white
                border border-[color:var(--border)]/70
                p-7
                shadow-[0_4px_16px_rgba(11,45,75,0.06)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(11,45,75,0.16)]
                hover:border-[color:var(--navy)]/90
              "
            >
              {/* subtle gradient hover wash */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-[linear-gradient(135deg,rgba(11,45,75,0.06)_0%,transparent_60%)]
                "
              />

              {/* big background number */}
              <span className="absolute -top-2 right-4 text-[92px] font-semibold leading-none text-[color:var(--navy)]/[0.06] select-none pointer-events-none transition-colors duration-300 group-hover:text-[color:var(--navy)]/[0.10]">
                {role.tag}
              </span>

              {/* icon */}
              <div
                className="
                  relative z-[1]
                  mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-xl
                  border border-[color:var(--navy)]/15
                  bg-[color:var(--navy)]/[0.06]
                  text-[color:var(--navy)]
                  transition-all duration-300
                  group-hover:bg-[color:var(--navy)]
                  group-hover:border-[color:var(--navy)]
                  group-hover:text-white
                  group-hover:rotate-[-3deg] group-hover:scale-[1.06]
                "
              >
                {role.icon}
              </div>

              {/* tag */}
              <div className="relative z-[1] text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--sky)]/80">
                {role.tag}
              </div>

              {/* title */}
              <h3 className="relative z-[1] heading-font mt-1 text-[22px] leading-[30px] font-semibold text-[color:var(--navy)] whitespace-pre-line">
                {role.title}
              </h3>

              {/* desc */}
              <p className="relative z-[1] mt-2 text-[14px] leading-[22px] text-[color:var(--muted)]">
                {role.desc}
              </p>

              {/* footer */}
              <div className="relative z-[1] mt-5 pt-4 border-t border-[color:var(--navy)]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-[3px]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-100" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-60" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-40" />
                  </div>
                  <span className="text-[11px] font-medium tracking-[0.08em] text-[color:var(--muted)]">
                    {role.count}
                  </span>
                </div>

                <div
                  className="
                    h-8 w-8 rounded-full border border-[color:var(--navy)]/20
                    grid place-items-center
                    text-[color:var(--navy)]
                    opacity-0 -translate-x-1
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-x-0
                    hover:bg-[color:var(--navy)] hover:text-white hover:border-[color:var(--navy)]
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 13L13 3M13 3H6M13 3V10" />
                  </svg>
                </div>
              </div>

              {/* bottom active line */}
              <div
                className="
                  absolute bottom-0 left-0 right-0 h-[3px]
                  bg-[linear-gradient(90deg,var(--navy)_0%,var(--sky)_100%)]
                  origin-left scale-x-0
                  transition-transform duration-300
                  group-hover:scale-x-100
                "
              />
            </div>
          ))}
        </div>

        {/* STATS BAR */}
     
      </div>
    </section>
  );
}