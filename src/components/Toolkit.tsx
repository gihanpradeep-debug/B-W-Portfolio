import { motion } from 'motion/react';
import { Layout, Code, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { toolkitItems, tagsData } from '../data';

// Dynamically map icon names from our data file to the Lucide icon set
const iconMap: { [key: string]: any } = {
  Layout: Layout,
  Code: Code,
  Sparkles: Sparkles,
  Sliders: Sliders,
};

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-[#131313]/10 relative z-10">
      
      {/* Title block */}
      <div className="text-left mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-xs uppercase tracking-[0.25em] text-[#64748b] font-bold mb-4 inline-block"
        >
          Specialist Capability
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#131313]"
        >
          Studio Toolkit & Stack
        </motion.h2>
      </div>

      {/* Bento Grid layout for core toolkitItems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {toolkitItems.map((item, index) => {
          const IconComponent = iconMap[item.iconName] || Code;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, shadow: '0 20px 40px rgba(0,0,0,0.03)' }}
              className="p-8 bg-white border border-[#131313]/5 rounded-[24px] shadow-xs flex flex-col justify-between hover:border-[#131313]/15 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1 block">
                  {item.category}
                </span>
                
                <h3 className="font-display text-lg font-bold text-[#131313] mb-4 uppercase mt-2">
                  {item.name}
                </h3>
                
                <p className="font-sans text-xs text-[#44474c] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="p-3.5 rounded-2xl bg-[#eeeeee]/40 border border-[#131313]/5 text-[#131313] group-hover:bg-[#131313] group-hover:text-white transition-all duration-500">
                  <IconComponent className="w-5 h-5 stroke-1.8" />
                </div>
                
                {/* Micro visual checkbox sign */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-[10px] font-mono font-bold text-[#131313]">
                  ACTIVE <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Auxiliary stack capabilities */}
      <div className="p-8 md:p-10 bg-[#eeeeee]/40 rounded-[28px] border border-[#131313]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h4 className="font-display text-sm font-bold uppercase text-[#131313] tracking-wide mb-1.5">
            Interdisciplinary Technologies
          </h4>
          <p className="font-sans text-xs text-[#64748b] max-w-md">
            Complementary libraries and design suites I actively leverage to deliver pixel-perfect digital ecosystems.
          </p>
        </div>

        {/* Dynamic decorative chips */}
        <div className="flex flex-wrap gap-2 max-w-xl justify-start md:justify-end">
          {tagsData.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2.5 bg-white border border-[#131313]/5 rounded-full text-xs font-semibold text-[#131313] hover:border-[#131313] hover:text-[#64748b] transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
