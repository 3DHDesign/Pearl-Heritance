import AboutHero from "../components/about/AboutHero";
import AboutIntro from "../components/about/AboutIntro";
import StatsStrip from "../components/about/StatsStrip";
import VisionMission from "../components/about/VisionMission";
import ServicesGrid from "../components/about/ServicesGrid";
import ValuesGrid from "../components/about/ValuesGrid";
import CTAAbout from "../components/about/CTAAbout";
import AboutProjectsScroll from "../components/about/AboutProjectsScroll";
import FAQSection from "../components/about/Faq";

export default function AboutPage() {
  return (
    <main className="py-10 md:py-14">
      <AboutHero />
      <AboutIntro />
      <AboutProjectsScroll/>
      <StatsStrip />
      <FAQSection/>
      <VisionMission />
      <ServicesGrid />
      <ValuesGrid />
      <CTAAbout />
    </main>
  );
}
