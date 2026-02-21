import { blogPosts } from "../utils/blogData";
import BlogCard from "../components/blog/BlogCard";

export default function BlogPage() {
  return (
    <main className="bg-[var(--bg)] py-16 md:py-24">
      <div className="container-wide">

        {/* ── HEADER ── */}
        <div className="max-w-3xl mb-14 md:mb-20">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-[2px] rounded-full bg-[var(--navy)]" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--muted)] font-medium">
              Our Blog
            </p>
          </div>

          <h1 className="heading-font text-[clamp(30px,4vw,52px)] font-bold leading-[1.05] text-[var(--navy)]">
            Design Stories
            <br />
            <span className="text-[var(--sky)]">&amp; Ideas</span>
          </h1>

          <p className="mt-4 text-[15px] text-[var(--muted)] leading-relaxed">
            Articles about architecture, interiors, trends, and practical insights 
            to help you plan smarter and build better.
          </p>
        </div>

        {/* ── BLOG GRID ── */}
        <div className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-7 md:gap-10
        ">
          {blogPosts.map((p) => (
            <div
              key={p.id}
              className="
                transition-all duration-500
                hover:-translate-y-1.5
              "
            >
              <BlogCard post={p} />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}