import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface WorksProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Dashboard', 'Fintech', 'E-commerce', 'AI & SaaS'];

export default function Works({ onSelectProject }: WorksProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(proj => proj.category === selectedCategory);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#131313] text-[#ffffff] overflow-hidden rounded-t-[40px] md:rounded-t-[60px] relative z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-20">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.1]"
            >
              Selected <br />Works (2022-2024)
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-base md:text-lg text-[#eeeeee]/60 max-w-sm leading-relaxed"
          >
            A curation of projects across diverse industries that pushed the boundaries of digital possibility.
          </motion.p>
        </div>

        {/* Dynamic Interactive Category Tabs */}
        <div className="flex flex-wrap gap-4 md:gap-3 mb-12 border-b border-white/10 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs tracking-widest uppercase font-semibold px-4 py-2.5 rounded-full transition-all duration-300 relative ${selectedCategory === cat
                  ? 'text-[#131313]'
                  : 'text-[#eeeeee]/65 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className="relative z-10">{cat}</span>
              {selectedCategory === cat && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Imitating the staggered aesthetic: odd index cards are pushed slightly lower on desktop grids
              const isPushed = index % 2 === 1;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, type: 'tween' }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => onSelectProject(project)}
                  className={`group relative cursor-pointer interactive-card ${isPushed ? 'md:mt-24' : 'mt-0'
                    }`}
                >
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#eeeeee]/5 relative border border-white/5 shadow-2xl transition-all duration-700">
                    {/* Lazy load direct render image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Standard overlay gradient on hover */}
                    <div className="absolute inset-0 bg-[#131313]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12">
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#eeeeee]/70 mb-4 inline-block font-semibold">
                        {project.category}
                      </span>

                      <h3 className="font-display text-2xl md:text-3.5xl font-bold text-white mb-6 uppercase">
                        {project.title}
                      </h3>

                      <p className="font-sans text-sm text-[#eeeeee]/75 mb-8 line-clamp-2 max-w-sm">
                        {project.subtitle}
                      </p>

                      <button
                        onClick={(e) => {
                        e.stopPropagation(); // Prevents the card click
                     
    }}
                      className="w-fit flex items-center gap-3 font-sans text-xs uppercase tracking-widest border border-white/30 rounded-full px-8 py-3.5 hover:bg-white hover:text-on-background hover:scale-105 active:scale-95 transition-all text-black font-bold"
                      >
                      View Project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Passive visual card elements */}
                  <div className="absolute bottom-6 right-6 p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                  {/* Standard subtitle display underneath when cards fit naturally */ }
              <div className="mt-6 flex justify-between items-center px-2 group-hover:translate-x-1 transition-transform duration-300">
                <div>
                  <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                    {project.title}
                  </h4>
                  <p className="font-sans text-xs text-[#eeeeee]/50 mt-1 uppercase tracking-widest font-semibold">
                    {project.category} • {project.year}
                  </p>
                </div>
              </div>
                </motion.div>
        );
            })}
      </AnimatePresence>
    </motion.div>

      </div >
    </section >
  );
}
