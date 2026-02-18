 
import './App.css'
import Header from './components/Header'
import HeroSlider from './components/home/HeroSlider' 
import ProjectsSection from './components/home/ProjectsSection'
import ServicesShowcase from './components/home/ServicesShowcase'
import ServicesSlider from './components/home/ServicesSlider'
import VideoBannerSection from './components/home/VideoBannerSection'

function App() { 

  return (
    <>
    <Header />
    <HeroSlider />
    <ServicesShowcase/> 
    <ProjectsSection/>
    <ServicesSlider/>
    <VideoBannerSection/>
    </>
  )
}

export default App
