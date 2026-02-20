import { Link } from "react-router-dom";

type BlogPost = {
  id?: string | number;
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
  imageUrl?: string; // fallback if your data uses this
};

type Props = {
  post: BlogPost;
  variant?: "default" | "featured";
};

function safeText(v: unknown, fallback: string) {
  return typeof v === "string" && v.trim().length ? v : fallback;
}

function safeImg(p: BlogPost) {
  const img = p.image ?? p.imageUrl;
  if (typeof img === "string" && img.trim().length) return img;
  // fallback image (neutral)
  return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80";
}

export default function BlogCard({ post, variant = "default" }: Props) {
  const title = safeText(post.title, "Untitled Article");
  const excerpt = safeText(
    post.excerpt,
    "A short insight from our studio — planning, materials, and design thinking."
  );
  const category = safeText(post.category, "Design");
  const date = safeText(post.date, "Sep 13, 2025");
  const slug = safeText(post.slug, "/blog");
  const href = slug.startsWith("/") ? slug : `/blog/${slug}`;
  const img = safeImg(post);

  const isFeatured = variant === "featured";

  return (
    <article
      className={[
        "group relative rounded-[28px] border border-[color:var(--border)] bg-white",
        "shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(2,6,23,0.12)]",
        isFeatured ? "rounded-[32px]" : "",
      ].join(" ")}
    >
      {/* Decorative layer (clipped) - ONLY for visuals, NOT content */}
      <div className={["pointer-events-none absolute inset-0 overflow-hidden", isFeatured ? "rounded-[32px]" : "rounded-[28px]"].join(" ")}>
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,var(--sky),transparent)] opacity-70" />
        <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-[color:var(--sky)]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[color:var(--navy)]/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content wrapper: IMPORTANT => no overflow-hidden here (prevents crop) */}
      <div className="relative p-4">
        {/* Image */}
        <Link
          to={href}
          className={[
            "relative block rounded-[22px]",
            "border border-[color:var(--border)]/70",
            "bg-[color:var(--surface)]",
            "overflow-hidden", // image can clip, but text won't
            isFeatured ? "aspect-[16/10]" : "aspect-[16/11]",
          ].join(" ")}
        >
          <img
            src={img}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-80" />

          {/* top meta chip */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            {isFeatured && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-[color:var(--navy)] border border-[color:var(--border)]">
                <span className="h-2 w-2 rounded-full bg-[color:var(--sky)]" />
                Featured
              </span>
            )}
          </div>

          {/* bottom meta */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 border border-[color:var(--border)]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--sky)]">
                {category}
              </span>
              <span className="h-3 w-px bg-[color:var(--border)]" />
              <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-[color:var(--muted)]">
                {date}
              </span>
            </div>

            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur border border-[color:var(--border)] text-[color:var(--navy)] transition group-hover:bg-[color:var(--navy)] group-hover:text-white group-hover:border-[color:var(--navy)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12L12 4" />
                <path d="M6 4h6v6" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Text */}
        <div className={isFeatured ? "mt-6 px-1 pb-2" : "mt-5 px-1 pb-2"}>
          <h3
            className={[
              "heading-font text-[color:var(--text)]",
              isFeatured ? "text-2xl md:text-[26px] leading-[1.15] font-semibold" : "text-xl leading-[1.2] font-semibold",
            ].join(" ")}
          >
            <Link to={href} className="hover:text-[color:var(--navy)] transition">
              {title}
            </Link>
          </h3>

          {/* IMPORTANT: no hard height, no overflow hidden => no crop */}
          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-[color:var(--muted)]">
            {excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] hover:text-[color:var(--sky)] transition"
            >
              Read article
              <span className="translate-x-0 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <span className="text-[11px] tracking-[0.14em] uppercase text-[color:var(--muted)]">
              5 min read
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}