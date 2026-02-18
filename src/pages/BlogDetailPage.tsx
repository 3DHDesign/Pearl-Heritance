import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../utils/blogData";

export default function BlogDetailPage() {
  const { slug } = useParams();

  const post = useMemo(() => (slug ? getBlogBySlug(slug) : undefined), [slug]);

  if (!post) {
    return (
      <main className="py-20">
        <div className="container-xxl">
          <p className="text-lg font-semibold">Blog not found.</p>
          <Link to="/blog" className="mt-6 inline-block btn-primary">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-14">
      <div className="container-xxl">
        <Link to="/blog" className="text-sm text-[color:var(--muted)] hover:underline">
          ← Back to Blog
        </Link>

        <div className="mt-6 max-w-4xl">
          <div className="flex items-center gap-4 text-xs tracking-wide">
            <span className="uppercase text-[color:var(--sky)] font-semibold">
              {post.category}
            </span>
            <span className="uppercase text-[color:var(--muted)]">{post.date}</span>
          </div>

          <h1 className="mt-3 heading-font text-4xl md:text-5xl font-semibold leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-[color:var(--muted)]">{post.excerpt}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)]">
          <img src={post.cover} alt={post.title} className="w-full h-[420px] object-cover" />
        </div>

        <article className="mt-10 max-w-4xl prose prose-slate">
          {post.content.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
