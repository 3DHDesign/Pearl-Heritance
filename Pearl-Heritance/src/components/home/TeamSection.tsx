import { useEffect, useState } from "react";
import {
  getExpertTeamSections,
  type ExpertTeamItem,
} from "../../api/expertTeam";

function TeamIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("architect")) {
    return (
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
    );
  }

  if (normalized.includes("engineer")) {
    return (
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
    );
  }

  if (normalized.includes("quantity")) {
    return (
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
    );
  }

  if (normalized.includes("project manager")) {
    return (
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
    );
  }

  if (normalized.includes("business advisor") || normalized.includes("marketing advisor")) {
    return (
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
    );
  }

  if (normalized.includes("attorney") || normalized.includes("law")) {
    return (
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
        <circle
          cx="28"
          cy="28"
          r="6"
          className="fill-[color:var(--navy)] stroke-[color:var(--navy)]"
        />
        <path d="M26 28l1.5 1.5L30 26" stroke="#fff" strokeWidth="1.5" />
      </svg>
    );
  }

  if (normalized.includes("property consultant")) {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M9 31V15l11-8 11 8v16" />
        <path d="M15 31v-8h10v8" />
        <path d="M13 18h14" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <circle cx="20" cy="14" r="5" />
      <path d="M10 31c1.8-5 6-8 10-8s8.2 3 10 8" />
    </svg>
  );
}

function formatMembersCount(count: number) {
  return `${count} member${count === 1 ? "" : "s"}`;
}

export default function TeamSection() {
  const [roles, setRoles] = useState<ExpertTeamItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getExpertTeamSections();

        const activeRoles = res.data
          .filter((item) => item.is_active)
          .sort((a, b) => {
            const numA = parseInt(a.number, 10);
            const numB = parseInt(b.number, 10);
            return numA - numB;
          });

        setRoles(activeRoles);
      } catch (error) {
        console.error("Failed to fetch expert team sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="bg-[color:var(--bg)] py-[90px] pb-[100px]">
        <div className="container-wide">
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--navy)]">
                Our Team
              </span>
              <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
            </div>

            <h2 className="heading-font text-[42px] font-semibold leading-[50px] text-[color:var(--navy)] md:text-[46px] md:leading-[54px]">
              The Experts Behind
              <br />
              Every Project
            </h2>

            <p className="mt-3 text-[16px] leading-[26px] text-[color:var(--muted)] md:text-[18px]">
              A multidisciplinary team of licensed professionals — each bringing deep expertise to deliver outstanding results.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-[color:var(--border)]/70 bg-white p-7"
              >
                <div className="mb-5 h-[54px] w-[54px] rounded-xl bg-[color:var(--navy)]/[0.06]" />
                <div className="h-3 w-10 rounded bg-[color:var(--navy)]/[0.08]" />
                <div className="mt-3 h-6 w-2/3 rounded bg-[color:var(--navy)]/[0.08]" />
                <div className="mt-2 h-4 w-full rounded bg-[color:var(--navy)]/[0.06]" />
                <div className="mt-2 h-4 w-5/6 rounded bg-[color:var(--navy)]/[0.06]" />
                <div className="mt-6 h-px w-full bg-[color:var(--navy)]/[0.08]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!roles.length) return null;

  return (
    <section className="bg-[color:var(--bg)] py-[90px] pb-[100px]">
      <div className="container-wide">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--navy)]">
              Our Team
            </span>
            <span className="h-[2px] w-6 rounded-full bg-[color:var(--navy)]/90" />
          </div>

          <h2 className="heading-font text-[42px] font-semibold leading-[50px] text-[color:var(--navy)] md:text-[46px] md:leading-[54px]">
            The Experts Behind
            <br />
            Every Project
          </h2>

          <p className="mt-3 text-[16px] leading-[26px] text-[color:var(--muted)] md:text-[18px]">
            A multidisciplinary team of licensed professionals — each bringing deep expertise to deliver outstanding results.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((role) => (
            <div
              key={role.id}
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
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-[linear-gradient(135deg,rgba(11,45,75,0.06)_0%,transparent_60%)]
                "
              />

              <span className="pointer-events-none absolute -top-2 right-4 select-none text-[92px] font-semibold leading-none text-[color:var(--navy)]/[0.06] transition-colors duration-300 group-hover:text-[color:var(--navy)]/[0.10]">
                {role.number}
              </span>

              <div
                className="
                  relative z-[1]
                  mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-xl
                  border border-[color:var(--navy)]/15
                  bg-[color:var(--navy)]/[0.06]
                  text-[color:var(--navy)]
                  transition-all duration-300
                  group-hover:rotate-[-3deg] group-hover:scale-[1.06]
                  group-hover:border-[color:var(--navy)]
                  group-hover:bg-[color:var(--navy)]
                  group-hover:text-white
                "
              >
                <TeamIcon title={role.title} />
              </div>

              <div className="relative z-[1] text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--sky)]/80">
                {role.number}
              </div>

              <h3 className="heading-font relative z-[1] mt-1 whitespace-pre-line text-[22px] font-semibold leading-[30px] text-[color:var(--navy)]">
                {role.title}
              </h3>

              <p className="relative z-[1] mt-2 min-h-[66px] text-[14px] leading-[22px] text-[color:var(--muted)]">
                {role.description ?? "Specialized expertise supporting the successful delivery of high-value projects."}
              </p>

              <div className="relative z-[1] mt-5 flex items-center justify-between border-t border-[color:var(--navy)]/10 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-[3px]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-100" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-60" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--sky)] opacity-40" />
                  </div>
                  <span className="text-[11px] font-medium tracking-[0.08em] text-[color:var(--muted)]">
                    {formatMembersCount(role.members_count)}
                  </span>
                </div>

               
              </div>

              <div
                className="
                  absolute bottom-0 left-0 right-0 h-[3px]
                  origin-left scale-x-0
                  bg-[linear-gradient(90deg,var(--navy)_0%,var(--sky)_100%)]
                  transition-transform duration-300
                  group-hover:scale-x-100
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}