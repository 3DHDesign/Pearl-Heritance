import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjectCategories, type ProjectCategory } from "../api/projectCategories";
import SEO from "../components/SEO"; // Added Import

export default function ProjectsLanding() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProjectCategories();
  
        const sorted = [...data].sort(
          (a, b) => Number(a.number) - Number(b.number)
        );
  
        setCategories(sorted);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container-wide py-20 text-center text-[var(--muted)]">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)]">
      {/* Added SEO Tag */}
      <SEO 
        title="Our Projects | Luxury & Sustainable Architecture Portfolio"
        description="{cat.title} Explore Pearl Heritance's architectural projects in Sri Lanka, ranging from luxury residential villas and commercial spaces to eco-friendly tourism developments."
        keywords="architecture portfolio Sri Lanka, luxury villa designs, eco-resort architects, commercial building projects, interior design gallery Colombo, Pearl Heritance projects"
      />

      {/* HERO */}
      <section className="container-wide pt-14 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-[2px] rounded-full bg-[var(--navy)]" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--navy)] opacity-70">
                Our Projects
              </span>

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sky)]" />
              </span>
            </div>

            <h1 className="heading-font m-0 text-[clamp(30px,5vw,58px)] font-bold leading-[1.05] text-[var(--navy)]">
              Work That Speaks
              <br />
              <span className="text-[var(--sky)]">For Itself</span>
            </h1>
          </div>

          <p className="m-0 text-[15px] leading-relaxed text-[var(--muted)] max-w-sm md:text-right">
            Residential, Tourism & Eco, Commercial, and Interior projects — each delivered with precision and purpose.
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="container-wide pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/projects/${encodeURIComponent(cat.tag)}`}
              className="group block no-underline"
            >
              <div className="relative rounded-[24px] overflow-hidden aspect-[3/4] shadow-[0_4px_20px_rgba(11,45,75,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_56px_rgba(11,45,75,0.2)] group-hover:-translate-y-2">

                {/* IMAGE */}
                <img
                  src={cat.image_url}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[var(--navy)]/20 to-transparent" />

                {/* HOVER TOP BAR */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--sky)] to-[var(--navy)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-10" />

                {/* NUMBER */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="heading-font text-[13px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                    {cat.number}
                  </span>
                </div>

                {/* TAG */}
                <div className="absolute top-5 right-5 z-10">
                  <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                    {cat.tag}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <h3 className="heading-font m-0 text-[20px] font-bold text-white leading-snug mb-2">
                    {cat.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--sky)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    View Projects
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M3 13L13 3M13 3H6M13 3V10" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  );
}