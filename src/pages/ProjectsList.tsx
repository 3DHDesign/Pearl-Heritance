import { Link, useParams } from "react-router-dom";
import { PROJECTS, type ProjectCategory } from "../utils/projects";

export default function ProjectsList() {
  const { category } = useParams();
  const decoded = decodeURIComponent(category ?? "") as ProjectCategory;

  const filtered = PROJECTS.filter((p) => p.category === decoded);

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <Link to="/projects" className="text-sm text-gray-500 hover:text-gray-800">
          ← Back to Categories
        </Link>

        <h1 className="mt-4 text-2xl md:text-4xl font-extrabold text-gray-900">
          {decoded || "Projects"}
        </h1>
        <p className="mt-3 text-gray-600">
          Browse projects under this category.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-6 text-gray-700">
            No projects added yet for this category.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition"
              >
                <div className="relative h-56">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors" />
                </div>

                <div className="p-5">
                  <p className="text-xs tracking-[0.16em] uppercase text-[#8B5E3C]">
                    {p.year} • {p.location}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
