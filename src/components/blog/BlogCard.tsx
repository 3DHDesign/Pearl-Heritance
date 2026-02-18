import { Link } from "react-router-dom";
import type { BlogPost } from "../../utils/blogData";

type Props = {
  post: BlogPost;
  variant?: "normal" | "featured";
};

export default function BlogCard({ post, variant = "normal" }: Props) {
  const featured = variant === "featured";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block rounded-3xl bg-white ${
        featured ? "md:translate-y-6" : ""
      }`}
    >
      {/* IMAGE ONLY should be clipped */}
      <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] aspect-[4/3]">
        <img
          src={post.cover}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* Give text a little padding so no clipping */}
      <div className="pt-5 px-1">
        <div className="flex items-center gap-4 text-xs tracking-wide">
          <span className="uppercase text-[color:var(--sky)] font-semibold">
            {post.category}
          </span>
          <span className="uppercase text-[color:var(--muted)]">{post.date}</span>
        </div>

        <h3 className="mt-2 text-xl font-semibold leading-[1.3] text-[color:var(--text)]">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
