import AboutHero from "../components/about/AboutHero";
import AboutIntro from "../components/about/AboutIntro";
import StatsStrip from "../components/about/StatsStrip";
import VisionMission from "../components/about/VisionMission";
import ServicesGrid from "../components/about/ServicesGrid";
import ValuesGrid from "../components/about/ValuesGrid";
import CTAAbout from "../components/about/CTAAbout";
import AboutProjectsScroll from "../components/about/AboutProjectsScroll";
import FAQSection from "../components/about/Faq";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Our Expertise | Architects & Consultants"
        description="Pearl Heritance is a collective of chartered architects, structural engineers, and project managers in Sri Lanka. We offer end-to-end solutions for residential, commercial, and sustainable design."
        keywords="chartered architects Sri Lanka, multi-disciplinary architectural firm, chartered structural engineers Colombo, professional quantity surveyors, certified project managers Sri Lanka, real estate legal advisors, building compliance experts, property management consultants, luxury villa design experts, sustainable architecture specialists, construction consultancy Sri Lanka, interior design professionals, architectural fabrication experts, facility management services"
        // No url prop needed! 
        // The SEO component now automatically generates the URL based on the current path.
      />

      <main>
        <AboutHero />
        <AboutIntro />
        <AboutProjectsScroll />
        <StatsStrip />
        <FAQSection />
        <VisionMission />
        <ServicesGrid />
        <ValuesGrid />
        <CTAAbout />
      </main>
    </>
  );
}