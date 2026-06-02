import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Components
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import ProjectModal from './components/ProjectModal';
import BriefBuilder from './components/BriefBuilder';
import Toolkit from './components/Toolkit';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Types
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);

  // Smooth Intersection Observer to highlight floating navigation items on scroll
  useEffect(() => {
    const sections = ['about', 'work', 'toolkit', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // triggers when item is around active vertical viewing column
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Handle home/hero section trigger individually
    const handleHeroScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleHeroScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleHeroScroll);
    };
  }, []);

  const handleScrollToWorks = () => {
    const target = document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mesh-gradient min-h-screen relative text-[#131313] selection:bg-[#131313]/90 selection:text-white antialiased">
      
      {/* Precision custom interaction cursor */}
      <Cursor />

      {/* Structured Floating Navigation bar */}
      <Navigation
        activeSection={activeSection}
        onOpenBrief={() => setIsBriefOpen(true)}
      />

      {/* Main interactive portfolio screens */}
      <main>
        {/* Landing screen */}
        <div id="home">
          <Hero onScrollToWorks={handleScrollToWorks} />
        </div>

        {/* Experience & stats studio presentation */}
        <About />

        {/* Curation case study list */}
        <Works onSelectProject={(project) => setSelectedProject(project)} />

        {/* Bento grid visual toolbox stack */}
        <Toolkit />

        {/* Connection consultation workspace */}
        <Contact />
      </main>

      {/* Institutional Credentials Footer footer */}
      <Footer />

      {/* ANIMATION MANAGED DIALOG FLOATING COVERS */}
      <AnimatePresence>
        {/* Cases review model */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* AI Estimation Proposal Brief compiler */}
        {isBriefOpen && (
          <BriefBuilder
            isOpen={isBriefOpen}
            onClose={() => setIsBriefOpen(false)}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}
