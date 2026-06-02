import { useState, useEffect } from 'react';

interface NavigationProps {
  onOpenBrief: () => void;
  activeSection: string;
}

export default function Navigation({ onOpenBrief, activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#ffffff]/80 backdrop-blur-xl border-b border-[#131313]/6 shadow-sm shadow-[#131313]/2'
          : 'py-7 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-bold tracking-tighter text-[#131313]"
        >
          GIHAN
        </a>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-12">
          {['work', 'about', 'toolkit', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 relative py-1 ${
                activeSection === section
                  ? 'text-[#131313]'
                  : 'text-[#44474c] hover:text-[#131313]'
              }`}
            >
              {section === 'work' ? 'Work' : section === 'about' ? 'Studio' : section === 'toolkit' ? 'Toolkit' : 'Contact'}
              {activeSection === section && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#131313]" />
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenBrief}
          className="bg-[#131313] text-[#ffffff] px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#64748b] active:scale-95 shadow-sm"
        >
          Start Project
        </button>
      </div>
    </nav>
  );
}
