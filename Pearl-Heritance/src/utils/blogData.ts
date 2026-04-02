export type BlogCategory = "Luxury" | "Design" | "Architecture";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  date: string; // "Sep 13, 2025"
  cover: string; // image url
  author?: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "timeless-decor-ideas-for-modern-living",
    title: "Timeless Decor Ideas for Modern Living",
    excerpt:
      "Explore elegant design principles and decor choices that stay relevant through changing trends.",
    content:
      "This is dummy content. Later replace with real content or API.\n\nAdd paragraphs, headings, tips, etc.",
    category: "Luxury",
    date: "Sep 13, 2025",
    cover:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    author: "Pearl Heritage",
  },
  {
    id: "2",
    slug: "color-trends-that-transform-your-home",
    title: "Color Trends That Transform Your Home",
    excerpt:
      "From warm neutrals to bold accents—learn how to use color to elevate spaces without overdoing it.",
    content:
      "This is dummy content. Add more sections later.\n\n- Trend 1\n- Trend 2\n- Trend 3",
    category: "Design",
    date: "Sep 13, 2025",
    cover:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    author: "Pearl Heritage",
  },
  {
    id: "3",
    slug: "creating-elegant-spaces-on-any-budget",
    title: "Creating Elegant Spaces on Any Budget",
    excerpt:
      "Smart styling moves, affordable materials, and layout tricks that make rooms look premium.",
    content:
      "Dummy content. Explain budget hacks and styling approach.\n\nAdd images later if needed.",
    category: "Luxury",
    date: "Sep 13, 2025",
    cover:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    author: "Pearl Heritage",
  },
];

export const getBlogBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
