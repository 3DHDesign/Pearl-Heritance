import BlogCard from "../blog/BlogCard";
import { blogPosts } from "../../utils/blogData";
import { Link } from "react-router-dom";

export default function BlogSection() {
  const top3 = blogPosts.slice(0, 3);

  return (
    <section className="py-20">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm tracking-widest uppercase text-[color:var(--muted)]">
            Our Blog
          </p>
          <h2 className="mt-3 heading-font text-4xl md:text-5xl font-semibold leading-tight">
            Transforming Spaces With Insightful <br className="hidden md:block" />
            Design Stories
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          <BlogCard post={top3[0]} />
          <BlogCard post={top3[1]} variant="featured" />
          <BlogCard post={top3[2]} />
        </div>

        <div className="mt-14 flex justify-center">
          <Link to="/blog" className="btn-primary">
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
