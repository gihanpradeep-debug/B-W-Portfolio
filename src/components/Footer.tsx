import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/gihanpradeep-debug' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gihan-pradeep-uiuxdesigner/' },
    { name: 'Behance', url: 'https://www.behance.net/gihanpradeep' }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#131313] text-white pt-20 pb-12 rounded-b-[40px] md:rounded-b-[60px] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Banner Logo Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-16 border-b border-white/10">
          <div>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tighter text-white">
              GIHAN
            </h2>
            <p className="font-sans text-xs text-[#eeeeee]/50 mt-2 uppercase tracking-widest font-semibold">
              Designer & Developer based in the Sri Lanka.
            </p>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-2.5 font-sans text-xs uppercase tracking-widest border border-white/10 rounded-full px-5 py-3 hover:border-white hover:bg-white hover:text-[#131313] transition-all font-semibold"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Links and Copyrights */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-12 gap-8">
          <p className="font-sans text-[11px] text-[#eeeeee]/40 uppercase tracking-wider font-semibold">
            © 2026 GIHAN. All Rights Reserved. Created by Gihan Build.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-widest text-[#eeeeee]/60 hover:text-white transition-colors relative group py-1 font-bold"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
