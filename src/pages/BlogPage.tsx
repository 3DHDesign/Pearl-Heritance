import { blogPosts } from "../utils/blogData";
import BlogCard from "../components/blog/BlogCard";

export default function BlogPage() {
  return (
    <main className="py-16">
      <div className="container-xxl">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest uppercase text-[color:var(--muted)]">
            Our Blog
          </p>
          <h1 className="mt-3 heading-font text-4xl md:text-5xl font-semibold">
            Design Stories & Ideas
          </h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Articles about architecture, interiors, trends, and practical tips.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
