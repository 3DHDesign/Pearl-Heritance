import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectsByCategory, type ProjectItem } from "../api/projects";
import SEO from "../components/SEO"; // Added Import

export default function ProjectsList() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category ?? "");

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!decodedCategory) {
        setProjects([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getProjectsByCategory(decodedCategory);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [decodedCategory]);

  return (
    <div className="bg-[var(--bg)]">
      {/* Added Dynamic SEO Tag */}
      <SEO 
        title={`${decodedCategory || "Projects"} | Pearl Heritance Portfolio`} 
        description={`Explore our collection of ${decodedCategory} projects. High-quality architectural and design solutions by Pearl Heritance in Sri Lanka.`}
        keywords={`${decodedCategory} design, ${decodedCategory} architecture Sri Lanka, Pearl Heritance ${decodedCategory}`}
      />

      {/* HEADER */}
      <section className="container-wide pb-10 pt-12">
        <Link
          to="/projects"
          className="group mb-8 inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--navy)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            <path d="M13 3L3 13M3 13H10M3 13V6" />
          </svg>
          Back to Categories
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[2px] w-7 rounded-full bg-[var(--navy)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--navy)] opacity-70">
                Our Projects
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
            </div>

            <h1 className="heading-font m-0 text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] text-[var(--navy)]">
              {decodedCategory || "Projects"}
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5">
              <span className="heading-font text-[14px] font-bold text-[var(--navy)]">
                {projects.length}
              </span>
              <span className="ml-1.5 text-[12px] text-[var(--muted)]">
                {projects.length === 1 ? "Project" : "Projects"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="container-wide pb-20">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-[24px] bg-[var(--border)]/40"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--navy)]/[0.06]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </div>
            <h3 className="heading-font m-0 mb-2 text-[18px] font-semibold text-[var(--navy)]">
              No Projects Yet
            </h3>
            <p className="m-0 text-[14px] text-[var(--muted)]">
              No projects added yet for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group block no-underline"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_4px_20px_rgba(11,45,75,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_56px_rgba(11,45,75,0.18)]">
                  {/* image */}
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/75 via-[var(--navy)]/15 to-transparent" />

                  {/* hover top stripe */}
                  <div className="absolute left-0 right-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] transition-transform duration-500 group-hover:scale-x-100" />

                  {/* number badge */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="heading-font rounded-full bg-black/30 px-2.5 py-1 text-[12px] font-bold text-white backdrop-blur-sm">
                      {project.number || String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* year */}
                  <div className="absolute right-4 top-4 z-10">
                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      {project.year ?? "Ongoing"}
                    </span>
                  </div>

                  {/* bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                    <p className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                      {project.location}
                    </p>

                    <h3 className="heading-font m-0 mb-2 text-[18px] font-bold leading-snug text-white">
                      {project.title}
                    </h3>

                    <div className="translate-y-2 opacity-0 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sky)] transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      View Project
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 13L13 3M13 3H6M13 3V10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}