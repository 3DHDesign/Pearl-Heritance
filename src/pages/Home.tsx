import HeroSlider from "../components/home/HeroSlider"
import ProjectsSection from "../components/home/ProjectsSection"
import ServicesShowcase from "../components/home/ServicesShowcase"
import TeamSection from "../components/home/TeamSection"
import TestimonialsSection from "../components/home/Testimonialssection"
import VideoBannerSection from "../components/home/VideoBannerSection"

import ServicesSlider from '../components/home/ServicesSlider'
import BlogSection from "../components/home/BlogSection"
 
const Home = () => {
  return (
    <div>
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