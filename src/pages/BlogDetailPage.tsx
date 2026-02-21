// BlogDetailPage.tsx — Pearl Heritance
// Revamped: sticky sidebar layout, premium hero image, navy/sky system
// Pure Tailwind 4, container-wide

import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, blogPosts } from "../utils/blogData";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = useMemo(() => (slug ? getBlogBySlug(slug) : undefined), [slug]);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <main className="py-20 bg-[var(--bg)]">
        <div className="container-wide text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--navy)]/[0.06] border border-[var(--border)] flex items-center justify-center mx-auto mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <h2 className="heading-font m-0 mb-3 text-[22px] font-bold text-[var(--navy)]">Post Not Found</h2>
          <p className="m-0 mb-6 text-[var(--muted)]">This article doesn't exist or has been removed.</p>
          <Link to="/blog" className="heading-font no-underline inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--navy)] text-white text-[13px] font-semibold hover:bg-[var(--sky)] transition-all duration-300">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--bg)] pb-20">

      {/* ── HERO IMAGE ── */}
      <div className="container-wide pt-10">
        <div className="relative w-full h-[45vh] min-h-[320px] max-h-[520px] overflow-hidden rounded-[28px]">
          <img
            src={post.cover}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-[var(--navy)]/20 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--navy)] to-[var(--sky)] rounded-t-[28px]" />

          {/* category + date over image */}
          <div className="absolute bottom-7 left-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white bg-[var(--sky)] rounded-full px-3.5 py-1.5">
                {post.category}
              </span>
              <span className="text-[11px] font-medium text-white/60">{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container-wide pt-10">

        {/* back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted)] hover:text-[var(--navy)] transition-colors duration-200 no-underline mb-8 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1">
            <path d="M13 3L3 13M3 13H10M3 13V6" />
          </svg>
          Back to Blog
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">

          {/* ── ARTICLE ── */}
          <div>
            {/* title */}
            <h1 className="heading-font m-0 mb-4 text-[clamp(26px,4vw,50px)] font-bold leading-[1.1] text-[var(--navy)]">
              {post.title}
            </h1>

            {/* excerpt */}
            <p className="m-0 mb-8 text-[16px] leading-[1.7] text-[var(--muted)] border-l-[3px] border-[var(--sky)] pl-5">
              {post.excerpt}
            </p>

            {/* divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--muted)]">Article</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* content */}
            <div className="space-y-5">
              {post.content.split("\n").filter(Boolean).map((line, idx) => (
                <p key={idx} className="m-0 text-[15px] leading-[1.85] text-[var(--text)]">
                  {line}
                </p>
              ))}
            </div>

            {/* bottom CTA */}
            <div className="mt-14 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="heading-font m-0 mb-1 text-[18px] font-bold text-[var(--navy)]">
                  Inspired by this article?
                </h3>
                <p className="m-0 text-[13px] text-[var(--muted)]">
                  Let's talk about your next project.
                </p>
              </div>
              <Link
                to="/contact"
                className="heading-font no-underline shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--navy)] text-white text-[13px] font-semibold shadow-[0_4px_16px_rgba(11,45,75,0.22)] transition-all duration-300 hover:bg-[var(--sky)] hover:scale-105 active:scale-95"
              >
                Contact Us
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13L13 3M13 3H6M13 3V10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-5">

            {/* post meta card */}
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-5 h-[2px] rounded-full bg-[var(--navy)]" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--navy)] opacity-60">Post Info</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Category", value: post.category },
                  { label: "Published", value: post.date },
                  { label: "Reading Time", value: `${Math.max(1, Math.ceil(post.content.split(" ").length / 200))} min read` },
                ].map((m) => (
                  <div key={m.label} className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">{m.label}</span>
                    <span className="text-[12px] font-semibold text-[var(--navy)] text-right">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* related posts */}
            {related.length > 0 && (
              <div className="rounded-[20px] border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-[2px] rounded-full bg-[var(--sky)]" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--navy)] opacity-60">Related Posts</span>
                </div>
                <div className="flex flex-col gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="group flex gap-3 no-underline"
                    >
                      <div className="w-16 h-16 rounded-[12px] overflow-hidden shrink-0">
                        <img src={r.cover} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="m-0 text-[10px] font-medium tracking-wide uppercase text-[var(--sky)] mb-1">{r.category}</p>
                        <h4 className="heading-font m-0 text-[13px] font-semibold text-[var(--navy)] leading-snug line-clamp-2 group-hover:text-[var(--sky)] transition-colors duration-200">
                          {r.title}
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