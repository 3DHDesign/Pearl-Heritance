import BlogCard from "../blog/BlogCard";
import { blogPosts } from "../../utils/blogData";
import { Link } from "react-router-dom";

export default function BlogSection() {
  const top3 = blogPosts.slice(0, 3);

  return (
    <section className="relative py-20 bg-[color:var(--bg)] overflow-hidden">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[color:var(--sky)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-[color:var(--navy)]/10 blur-3xl" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-7 rounded-full bg-[color:var(--navy)]/80" />
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[color:var(--muted)]">
              Our Blog
            </p>
            <span className="h-[2px] w-7 rounded-full bg-[color:var(--navy)]/80" />
          </div>

          <h2 className="mt-4 heading-font text-4xl md:text-5xl font-semibold leading-[1.05] text-[color:var(--text)]">
            Transforming Spaces With Insightful{" "}
            <span className="text-[color:var(--sky)]">Design Stories</span>
          </h2>

          <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-[color:var(--muted)]">
            Case studies, interior tips, and planning insights — written with clarity and
            real-world value.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          {/* Left */}
          <div className="lg:col-span-4">
            <BlogCard post={top3[0]} />
          </div>

          {/* Featured */}
          <div className="lg:col-span-4 lg:-mt-5">
            <BlogCard post={top3[1]} variant="featured" />
          </div>

          {/* Right */}
          <div className="lg:col-span-4">
            <BlogCard post={top3[2]} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/blog" className="btn-primary">
            View All Blogs
          </Link>

          <Link
            to="/contact"
            className="
              inline-flex items-center justify-center rounded-full
              border border-[color:var(--border)]
              bg-white text-[color:var(--navy)]
              px-6 py-3 font-semibold
              hover:bg-black/5 transition
            "
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}