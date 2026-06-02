import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollToWorks: () => void;
}

export default function Hero({ onScrollToWorks }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 px-6 md:px-20 max-w-7xl mx-auto overflow-hidden relative">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center w-full relative z-10">
        
        {/* Left Side: Typography and Introductions */}
        <div className="xl:col-span-7 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-[#64748b] mb-6 font-bold"
          >
            Design & Development Portfolio
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.04em] font-extrabold text-[#131313] mb-12 uppercase"
          >
            Creating <span className="text-outline text-slate-800">Digital</span> Experiences That People Remember.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 justify-start"
          >
            <p className="font-sans text-base md:text-lg text-[#44474c] max-w-md leading-relaxed">
              Crafting high-end digital products with a focus on minimalist aesthetics and flawless functionality.
            </p>
            
            <button
              onClick={onScrollToWorks}
              className="group flex items-center gap-3 font-sans text-xs uppercase tracking-widest font-bold text-[#131313] hover:text-[#64748b] transition-all py-2"
            >
              View Selected Works
              <span className="p-2 rounded-full border border-[#131313]/10 group-hover:border-[#131313]/30 transition-transform group-hover:translate-x-1.5 duration-300">
                <ArrowRight className="w-4 h-4 text-[#131313]" />
              </span>
            </button>
          </motion.div>
        </div>


      </div>

      {/* Decorative light atmospheric accents */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#b7c8e1]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-[#e3c199]/15 rounded-full blur-[100px] pointer-events-none z-0"></div>
    </section>
  );
}
