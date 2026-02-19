import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/projects";

export default function ProjectsLanding() {
  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-10 text-center">
        <p className="text-xs tracking-[0.22em] uppercase text-[#8B5E3C]">
          Our Projects
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Choose a Category
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Residential, Tourism & Eco, Commercial, and Interior projects.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={`/projects/${encodeURIComponent(c.key)}`}
              className="group block"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <div className="relative h-44">
                  <img
                    src={c.cover}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs tracking-[0.18em] uppercase text-[#8B5E3C]">
                  {c.label}
                </p>
                <h3 className="mt-2 text-base font-bold text-gray-900 leading-snug">
                  {c.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
