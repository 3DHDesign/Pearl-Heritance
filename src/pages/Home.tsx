import HeroSlider from "../components/home/HeroSlider"
import ProjectsSection from "../components/home/ProjectsSection"
import ServicesShowcase from "../components/home/ServicesShowcase"
import TeamSection from "../components/home/TeamSection"
import TestimonialsSection from "../components/home/Testimonialssection"
import VideoBannerSection from "../components/home/VideoBannerSection"

import ServicesSlider from '../components/home/ServicesSlider'
import BlogSection from "../components/home/BlogSection"
import ExpertiseHero from "../components/home/ExpertiseHero"
import ServicesHeroSlider from "../components/home/ServicesHeroSlider"
 
const Home = () => {
  return (
    <div>
      <ExpertiseHero/>
      <ServicesHeroSlider/>
         <HeroSlider />
    <ServicesShowcase/> 
    <ProjectsSection/>
    <ServicesSlider />
    <VideoBannerSection/>
    <TeamSection/>
    <TestimonialsSection/>
    <BlogSection/>
    </div>
  )
}

export default Home