import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ProjectsLanding from "./pages/ProjectsLanding";
import ProjectsList from "./pages/ProjectsList";
import ProjectDetail from "./pages/ProjectDetail";
import ContactUs from "./pages/ContactUs";
import WhatsAppButton from "./components/common/WhatsAppButton";


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/about" element={<AboutUs />} />

        
        <Route path="/projects" element={<ProjectsLanding />} />
<Route path="/projects/:category" element={<ProjectsList />} />
<Route path="/project/:id" element={<ProjectDetail />} />

<Route path="/contact" element={<ContactUs />} />

      </Routes>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
