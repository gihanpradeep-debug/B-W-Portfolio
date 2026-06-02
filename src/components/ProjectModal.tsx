import { motion } from 'motion/react';
import { X, Calendar, User, Briefcase, Award } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Dimmed backdrop background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#131313]/70 backdrop-blur-md"
      />

      {/* Slide-over case study container panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="relative w-full max-w-3xl h-full bg-[#fcfcfc] shadow-[0_0_60px_rgba(0,0,0,0.15)] flex flex-col pointer-events-auto z-10 overflow-hidden"
      >
        {/* Header toolbar */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#131313]/10 hover:bg-[#131313] hover:text-[#ffffff] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Cover Hero Banner Image */}
          <div className="h-[320px] md:h-[400px] w-full relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-[#131313]/30 to-[#131313]/40" />
            
            <div className="absolute bottom-8 left-8 right-8 text-left">
              <span className="inline-block px-3 py-1 bg-[#131313]/45 backdrop-blur-md text-white border border-white/20 text-[10px] uppercase tracking-widest font-bold rounded-full mb-3">
                {project.category}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Core metadata panel */}
          <div className="px-6 md:px-12 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-[24px] bg-[#eeeeee]/50 border border-[#131313]/5 mb-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/90 shadow-sm border border-[#131313]/5 text-[#64748b]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold">Client</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-[#131313]">{project.client}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/90 shadow-sm border border-[#131313]/5 text-[#64748b]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold">Role</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-[#131313]">{project.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/90 shadow-sm border border-[#131313]/5 text-[#64748b]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold">Year</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-[#131313]">{project.year}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/90 shadow-sm border border-[#131313]/5 text-[#64748b]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold">Focus</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-[#131313]">{project.category}</span>
                </div>
              </div>
            </div>

            {/* Core Narrative case details */}
            <div className="space-y-10">
              {/* Long Description and Tags */}
              <div className="space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wider font-bold text-[#131313] border-l-2 border-[#131313] pl-3">
                  Overview
                </h3>
                <p className="font-sans text-sm md:text-base text-[#44474c] leading-relaxed">
                  {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 bg-[#eeeeee]/60 border border-[#131313]/5 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#64748b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges segment */}
              <div className="space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wider font-bold text-[#131313] border-l-2 border-[#131313] pl-3">
                  The Design Challenge
                </h3>
                <p className="font-sans text-sm md:text-base text-[#44474c] leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              {/* Outcomes list card elements */}
              <div className="space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wider font-bold text-[#131313] border-l-2 border-[#131313] pl-3">
                  Success Outcomes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.outcomes.map((outcome, flagIdx) => (
                    <div
                      key={flagIdx}
                      className="p-5 bg-white border border-[#131313]/5 rounded-[20px] shadow-sm flex gap-3.5 items-start hover:border-[#131313]/10 transition-all duration-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#131313]/5 font-mono text-[10px] font-bold text-[#131313] flex items-center justify-center">
                        {flagIdx + 1}
                      </span>
                      <p className="font-sans text-xs md:text-sm text-[#44474c] leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Handshake bar */}
        <div className="p-6 bg-[#eeeeee]/30 border-t border-[#131313]/5 flex justify-between items-center">
          <p className="font-sans text-xs text-[#64748b] font-medium hidden sm:block">
            Interested in building a similar concept?
          </p>
          <button
            onClick={() => {
              onClose();
              const contactSec = document.getElementById('contact');
              if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-[#131313] text-white px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#64748b] transition-all duration-300 text-center"
          >
            Start Proposal Brief
          </button>
        </div>
      </motion.div>
    </div>
  );
}
