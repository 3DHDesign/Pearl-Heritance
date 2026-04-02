import { useEffect, useState } from "react";
import BlogCard from "../components/blog/BlogCard";
import { getBlogs, type BlogItem } from "../api/blogs";
import SEO from "../components/SEO"; // Added Import

type BlogCardData = {
  id: number;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  category: string | null;
  date: string | null;
  imageUrl: string | null;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();

        const mapped = data.map((blog: BlogItem) => ({
          id: blog.id,
          slug: blog.slug ?? String(blog.id),
          title: blog.title,
          excerpt: blog.excerpt ?? blog.description ?? "",
          category: blog.category,
          date: blog.published_date ?? blog.created_at,
          imageUrl: blog.image_url,
        }));

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
    <main className="bg-[var(--bg)] py-16 md:py-24">
      {/* Added SEO Tag */}
      <SEO 
        title="Design Stories & Architecture Insights | Blog"
        description="Explore Pearl Heritance's blog for the latest trends in Sri Lankan architecture, interior design ideas, and expert construction advice."
        keywords="architecture blog Sri Lanka, interior design trends, construction insights Colombo, sustainable building tips, home renovation ideas, Pearl Heritance blog"
      />

      <div className="container-wide">
        {/* HEADER */}
        <div className="mb-14 max-w-3xl md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-7 rounded-full bg-[var(--navy)]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
              Our Blog
            </p>
          </div>

          <h1 className="heading-font text-[clamp(30px,4vw,52px)] font-bold leading-[1.05] text-[var(--navy)]">
            Design Stories
            <br />
            <span className="text-[var(--sky)]">&amp; Ideas</span>
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
            Articles about architecture, interiors, trends, and practical insights
            to help you plan smarter and build better.
          </p>
        </div>

        {/* BLOG GRID */}
        {loading ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[16/14] animate-pulse rounded-[28px] bg-white/60"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-12 text-center">
            <h3 className="heading-font text-[22px] font-semibold text-[var(--navy)]">
              No Blog Posts Yet
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              Blog articles have not been published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="transition-all duration-500 hover:-translate-y-1.5"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}