import { useEffect, useState } from "react";
import ProjectsSection from "../components/home/ProjectsSection";
import ServicesShowcase from "../components/home/ServicesShowcase";
import TeamSection from "../components/home/TeamSection";
import TestimonialsSection from "../components/home/Testimonialssection";
import VideoBannerSection from "../components/home/VideoBannerSection";
import ServicesSlider from "../components/home/ServicesSlider";
import BlogSection from "../components/home/BlogSection";
import ExpertiseHero from "../components/home/ExpertiseHero";
import ServicesHeroSlider from "../components/home/ServicesHeroSlider";

function SectionLoader() {
  return (
    <div className="flex min-h-[220px] w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--sky)]" />
    </div>
  );
}

function SafeMount({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  if (!mounted) return <SectionLoader />;

  return <>{children}</>;
}

const Home = () => {
  return (
    <div>
      <ExpertiseHero />

      <SafeMount delay={100}>
        <ServicesHeroSlider />
      </SafeMount>

      <SafeMount delay={200}>
        <ServicesShowcase />
      </SafeMount>

      <SafeMount delay={300}>
        <ProjectsSection />
      </SafeMount>

      <SafeMount delay={400}>
        <ServicesSlider />
      </SafeMount>

      <SafeMount delay={500}>
        <VideoBannerSection />
      </SafeMount>

      <SafeMount delay={600}>
        <TeamSection />
      </SafeMount>

      <SafeMount delay={700}>
        <TestimonialsSection />
      </SafeMount>

      <SafeMount delay={800}>
        <BlogSection />
      </SafeMount>
    </div>
  );
};

export default Home;