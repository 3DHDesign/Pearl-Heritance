import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogById, type BlogDetailData } from "../api/blogDetail";

function formatDate(date?: string | null) {
  if (!date) return "Recent";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function stripHtml(html?: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const data = await getBlogById(slug);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch blog detail:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const related = useMemo(() => post?.related_posts ?? [], [post]);

  if (loading) {
    return (
      <main className="bg-[var(--bg)] pb-20">
        <div className="container-wide pt-10">
          <div className="h-[45vh] min-h-[320px] max-h-[520px] animate-pulse rounded-[28px] bg-[var(--border)]/40" />
        </div>

        <div className="container-wide pt-10">
          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-[var(--border)]/40" />
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 h-14 w-3/4 animate-pulse rounded bg-[var(--border)]/40" />
              <div className="mb-8 h-20 w-full animate-pulse rounded bg-[var(--border)]/30" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-full animate-pulse rounded bg-[var(--border)]/30"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="h-56 animate-pulse rounded-[20px] bg-[var(--border)]/40" />
              <div className="h-40 animate-pulse rounded-[20px] bg-[var(--border)]/30" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="bg-[var(--bg)] py-20">
        <div className="container-wide text-center">
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

          <h2 className="heading-font mb-3 text-[22px] font-bold text-[var(--navy)]">
            Post Not Found
          </h2>
          <p className="mb-6 text-[var(--muted)]">
            This article doesn&apos;t exist or has been removed.
          </p>

          <Link
            to="/blog"
            className="heading-font inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-[13px] font-semibold text-white no-underline transition-all duration-300 hover:bg-[var(--sky)]"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const published = formatDate(
    post.sidebar_post_info?.published_date ?? post.published_date
  );

  const category =
    post.sidebar_post_info?.category?.trim() ||
    post.category?.trim() ||
    "Blog";

  const readTime =
    post.sidebar_post_info?.read_time?.trim() ||
    post.read_time?.trim() ||
    `${Math.max(1, Math.ceil(stripHtml(post.content).split(/\s+/).filter(Boolean).length / 200))} min read`;

  return (
    <main className="bg-[var(--bg)] pb-20">
      {/* HERO IMAGE */}
      <div className="container-wide pt-10">
        <div className="relative h-[45vh] min-h-[320px] max-h-[520px] w-full overflow-hidden rounded-[28px]">
          <img
            src={
              post.featured_image ||
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
            }
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-[var(--navy)]/20 to-transparent" />
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-[28px] bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />

          <div className="absolute bottom-7 left-7">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[var(--sky)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                {category}
              </span>
              <span className="text-[11px] font-medium text-white/60">
                {published}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container-wide pt-10">
        <Link
          to="/blog"
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
          Back to Blog
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          {/* ARTICLE */}
          <div>
            <h1 className="heading-font mb-4 text-[clamp(26px,4vw,50px)] font-bold leading-[1.1] text-[var(--navy)]">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mb-8 border-l-[3px] border-[var(--sky)] pl-5 text-[16px] leading-[1.7] text-[var(--muted)]">
                {post.subtitle}
              </p>
            )}

            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                Article
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <div
              className="
                prose prose-sm max-w-none
                prose-p:my-0 prose-p:mb-5 prose-p:text-[15px] prose-p:leading-[1.85] prose-p:text-[var(--text)]
                prose-strong:text-[var(--navy)]
                prose-headings:font-semibold prose-headings:text-[var(--navy)]
                prose-a:text-[var(--sky)]
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-8 sm:flex-row sm:items-center">
              <div>
                <h3 className="heading-font mb-1 text-[18px] font-bold text-[var(--navy)]">
                  Inspired by this article?
                </h3>
                <p className="text-[13px] text-[var(--muted)]">
                  Let&apos;s talk about your next project.
                </p>
              </div>

              <Link
                to="/contact"
                className="heading-font inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[var(--navy)] px-6 py-3 text-[13px] font-semibold text-white no-underline shadow-[0_4px_16px_rgba(11,45,75,0.22)] transition-all duration-300 hover:scale-105 hover:bg-[var(--sky)] active:scale-95"
              >
                Contact Us
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 13L13 3M13 3H6M13 3V10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-[2px] w-5 rounded-full bg-[var(--navy)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navy)] opacity-60">
                  Post Info
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Category", value: category },
                  { label: "Published", value: published },
                  { label: "Reading Time", value: readTime },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                      {item.label}
                    </span>
                    <span className="text-right text-[12px] font-semibold text-[var(--navy)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="rounded-[20px] border border-[var(--border)] bg-white p-6">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-[2px] w-5 rounded-full bg-[var(--sky)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navy)] opacity-60">
                    Related Posts
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.id}`}
                      className="group flex gap-3 no-underline"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[12px]">
                        <img
                          src={
                            item.featured_image ||
                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
                          }
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[var(--sky)]">
                          {item.category || "Blog"}
                        </p>
                        <h4 className="heading-font line-clamp-2 text-[13px] font-semibold leading-snug text-[var(--navy)] transition-colors duration-200 group-hover:text-[var(--sky)]">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}