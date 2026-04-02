import { useEffect, useState } from "react";
import BlogCard from "../blog/BlogCard";
import { Link } from "react-router-dom";
import { getBlogs, type BlogItem } from "../../api/blogs";

type BlogCardData = {
  id: number;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  category: string | null;
  date: string | null;
  imageUrl: string | null;
};

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();

        const mapped = data
          .map((blog: BlogItem) => ({
            id: blog.id,
            slug: blog.slug ?? String(blog.id),
            title: blog.title,
            excerpt: blog.excerpt ?? blog.description ?? "",
            category: blog.category,
            date: blog.published_date ?? blog.created_at,
            imageUrl: blog.image_url,
          }))
          .sort((a, b) => {
            const dateA = new Date(a.date ?? "").getTime();
            const dateB = new Date(b.date ?? "").getTime();
            return dateB - dateA;
          })
          .slice(0, 3);

        setPosts(mapped);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[color:var(--bg)] py-20">
      <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[color:var(--sky)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-[color:var(--navy)]/10 blur-3xl" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-7 rounded-full bg-[color:var(--navy)]/80" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Our Blog
            </p>
            <span className="h-[2px] w-7 rounded-full bg-[color:var(--navy)]/80" />
          </div>

          <h2 className="mt-4 heading-font text-4xl font-semibold leading-[1.05] text-[color:var(--text)] md:text-5xl">
            Transforming Spaces With Insightful{" "}
            <span className="text-[color:var(--sky)]">Design Stories</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] md:text-[15px]">
            Case studies, interior tips, and planning insights — written with clarity and
            real-world value.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {loading ? (
            <>
              <div className="lg:col-span-4 h-[420px] animate-pulse rounded-[28px] bg-white/60" />
              <div className="lg:col-span-4 h-[460px] animate-pulse rounded-[28px] bg-white/60" />
              <div className="lg:col-span-4 h-[420px] animate-pulse rounded-[28px] bg-white/60" />
            </>
          ) : posts.length === 0 ? (
            <div className="lg:col-span-12 rounded-[24px] border border-[var(--border)] bg-white p-12 text-center">
              <h3 className="heading-font text-[22px] font-semibold text-[var(--navy)]">
                No Blog Posts Yet
              </h3>
              <p className="mt-2 text-[var(--muted)]">
                Blog articles have not been published yet.
              </p>
            </div>
          ) : (
            <>
              {posts[0] && (
                <div className="lg:col-span-4">
                  <BlogCard post={posts[0]} />
                </div>
              )}

              {posts[1] && (
                <div className="lg:col-span-4 lg:-mt-5">
                  <BlogCard post={posts[1]} variant="featured" />
                </div>
              )}

              {posts[2] && (
                <div className="lg:col-span-4">
                  <BlogCard post={posts[2]} />
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/blog" className="btn-primary">
            View All Blogs
          </Link>

          <Link
            to="/contact"
            className="
              inline-flex items-center justify-center rounded-full
              border border-[color:var(--border)]
              bg-white px-6 py-3 font-semibold text-[color:var(--navy)]
              transition hover:bg-black/5
            "
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}