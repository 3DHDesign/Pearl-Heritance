import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../utils/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = useMemo(() => PROJECTS.find((p) => p.id === id), [id]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-gray-700">Project not found.</p>
        <Link to="/projects" className="text-[#8B5E3C] font-semibold">
          Back to Projects
        </Link>
      </div>
    );
  }

  const active = project.images[activeIndex] ?? project.cover;

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <Link
          to={`/projects/${encodeURIComponent(project.category)}`}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back to {project.category}
        </Link>

        <p className="mt-4 text-xs tracking-[0.18em] uppercase text-[#8B5E3C]">
          {project.category}
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-gray-900">
          {project.title}
        </h1>
        <p className="mt-3 text-gray-600">
          {project.location} • {project.year}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={active}
              alt={project.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {project.images.slice(0, 8).map((img, idx) => (
              <button
                key={img}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-xl overflow-hidden border transition ${
                  idx === activeIndex ? "border-[#8B5E3C]" : "border-gray-200"
                }`}
                aria-label={`Open image ${idx + 1}`}
              >
                <img src={img} alt="thumb" className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:pt-2">
          <div className="rounded-2xl border border-gray-200 p-6 md:p-7">
            <h2 className="text-xl font-bold text-gray-900">Project Overview</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {project.description}
            </p>

            {project.tags?.length ? (
              <>
                <h3 className="mt-8 text-sm font-semibold text-gray-900">
                  Key Features
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border border-gray-200 px-3 py-1 text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#8B5E3C] px-5 py-3 text-white font-semibold hover:opacity-90"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
