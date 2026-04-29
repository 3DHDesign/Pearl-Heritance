import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProject, type SingleProjectData } from "../api/singleProject";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<SingleProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getSingleProject(id);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch single project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const images = useMemo(() => {
    if (!project) return [];

    const galleryImages =
      project.gallery
        ?.filter((item) => item.is_active)
        .map((item) => item.image_url) ?? [];

    const allImages = [project.image_url, ...galleryImages].filter(Boolean);

    return [...new Set(allImages)];
  }, [project]);

  const activeImage = images[activeIndex] ?? project?.image_url ?? "";

  const handleThumb = (index: number) => {
    if (index === activeIndex) return;

    setImgOpacity(0);
    setTimeout(() => {
      setActiveIndex(index);
      setImgOpacity(1);
    }, 180);
  };

  useEffect(() => {
    setActiveIndex(0);
    setImgOpacity(1);
  }, [project?.id]);

  if (loading) {
    return (
      <div className="bg-[var(--bg)]">
        <section className="container-wide pt-12 pb-10">
          <div className="mb-8 h-5 w-40 animate-pulse rounded bg-[var(--border)]/40" />
          <div className="mb-4 h-4 w-32 animate-pulse rounded bg-[var(--border)]/40" />
          <div className="h-14 w-2/3 animate-pulse rounded bg-[var(--border)]/40" />
        </section>

        <section className="container-wide pb-20">
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="aspect-[4/3] animate-pulse rounded-[24px] bg-[var(--border)]/40" />
            <div className="space-y-5">
              <div className="h-40 animate-pulse rounded-[24px] bg-[var(--border)]/40" />
              <div className="h-32 animate-pulse rounded-[24px] bg-[var(--border)]/40" />
              <div className="h-32 animate-pulse rounded-[24px] bg-[var(--border)]/40" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-wide py-20 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--navy)]/[0.06]">
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
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        <h2 className="heading-font m-0 mb-3 text-[22px] font-bold text-[var(--navy)]">
          Project Not Found
        </h2>

        <p className="m-0 mb-6 text-[var(--muted)]">
          This project doesn&apos;t exist or has been removed.
        </p>

        <Link
          to="/projects"
          className="heading-font inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-[13px] font-semibold text-white no-underline transition-all duration-300 hover:bg-[var(--sky)]"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)]">
      {/* HEADER */}
      <section className="container-wide pb-10 pt-12">
        <Link
          to={`/projects/${encodeURIComponent(project.category_card || project.category)}`}
          className="group mb-8 inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--navy)]"
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
          Back to {project.category_card || project.category}
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-[2px] w-7 rounded-full bg-[var(--navy)]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--navy)] opacity-70">
            {project.category}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sky)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
          </span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="heading-font m-0 text-[clamp(28px,4.5vw,54px)] font-bold leading-[1.05] text-[var(--navy)]">
              {project.title}
            </h1>
            {/* LOGO */}
            {project.logo_url && project.logo_url !== "no" && (
              <img
                src={project.logo_url}
                alt={project.title}
                className="h-10 w-auto object-contain bg-white rounded px-2 py-1 shadow"
              />
            )}

            {/* TITLE */}

          </div>

          <div className="flex shrink-0 items-center gap-2 self-start md:self-end">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[12px] font-medium text-[var(--muted)]">
              {project.location} · {project.year ?? "Ongoing"}
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-wide pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* LEFT — gallery */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_8px_40px_rgba(11,45,75,0.14)]">
              <img
                src={activeImage}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: imgOpacity, transition: "opacity 0.25s ease" }}
                loading="lazy"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent" />
              <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />

              <div className="absolute right-4 top-4 z-10">
                <span className="heading-font rounded-full bg-black/30 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-sm">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.slice(0, 8).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => handleThumb(index)}
                    className={[
                      "relative aspect-square cursor-pointer overflow-hidden rounded-[14px] border-2 transition-all duration-300",
                      index === activeIndex
                        ? "border-[var(--sky)] shadow-[0_0_0_3px_rgba(42,167,223,0.15)]"
                        : "border-transparent opacity-60 hover:border-[var(--border)] hover:opacity-100",
                    ].join(" ")}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — info */}
          <div className="flex flex-col gap-5">
            {/* overview */}
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-[2px] w-5 rounded-full bg-[var(--sky)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navy)] opacity-60">
                  Project Overview
                </span>
              </div>

              <p className="m-0 whitespace-pre-line text-[14px] leading-[1.85] text-[var(--muted)]">
                {project.overview}
              </p>
            </div>

            {/* key features */}
            {project.key_features?.length > 0 && (
              <div className="rounded-[24px] border border-[var(--border)] bg-white p-7">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-[2px] w-5 rounded-full bg-[var(--navy)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navy)] opacity-60">
                    Key Features
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.key_features.map((feature) => (
                    <span
                      key={feature}
                      className="cursor-default rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-[11px] font-medium text-[var(--navy)] transition-colors duration-200 hover:border-[var(--sky)] hover:text-[var(--sky)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* meta */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Category", value: project.category },
                { label: "Location", value: project.location },
                { label: "Year", value: project.year ?? "Ongoing" },
                { label: "Status", value: project.status || "Completed" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-[var(--border)] bg-white px-5 py-4"
                >
                  <p className="mb-1 m-0 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="m-0 text-[14px] font-semibold text-[var(--navy)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={project.cta_link ?? "/contact"}
              className="
                heading-font flex items-center justify-center gap-2.5 rounded-[18px]
                bg-[var(--navy)] px-7 py-4 text-[14px] font-semibold text-white no-underline
                shadow-[0_4px_16px_rgba(11,45,75,0.22)]
                transition-all duration-300
                hover:scale-[1.02] hover:bg-[var(--sky)]
                active:scale-95
              "
            >
              {project.cta_text ?? "Start a Similar Project"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 13L13 3M13 3H6M13 3V10" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}