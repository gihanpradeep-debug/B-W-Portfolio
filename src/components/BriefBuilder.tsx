import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ArrowLeft, Loader2, Copy, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { ProjectBrief } from '../types';

interface BriefBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

// Available standard premium services
const SERVICES_OPTIONS = [
  { id: 'ui-ux', name: 'UI/UX Design', desc: 'Sleek wireframes, user testing, and interactive squircle designs.' },
  { id: 'fe-dev', name: 'Front-End Development', desc: 'Responsive screens built with clean React 19 and custom motion systems.' },
  { id: 'full-saas', name: 'Full-Stack SaaS Product', desc: 'Secure backend proxy APIs combined with premium web frontends.' },
  { id: 'brand', name: 'Interactive Brand Strategy', desc: 'Visual identity vectors, design guidelines, and typography curation.' },
  { id: 'threejs', name: '3D & Immersive Design', desc: 'Visual WebGL coordinates, physics simulations, and custom shader work.' }
];

const TIMELINE_OPTIONS = [
  '1-3 weeks (Sprint)',
  '4-6 weeks (Standard)',
  '2-3 months (Scale)',
  'Flexible timeline'
];

const BUDGET_OPTIONS = [
  '£5,000 - £10,000',
  '£10,000 - £20,000',
  '£20,000 - £50,000',
  '£50,000+'
];

const LOADING_STEPS = [
  'Analyzing visual brand constraints...',
  'Synthesizing luxury UI layout architectures...',
  'Calculating performance frame rate targets...',
  'Draping premium editorial whitespace grids...',
  'Polishing tailored co-pilot cost matrices...'
];

export default function BriefBuilder({ isOpen, onClose }: BriefBuilderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProjectBrief>({
    services: [],
    timeline: '',
    budget: '',
    name: '',
    email: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STEPS[0]);
  const [copied, setCopied] = useState(false);
  const [aiBriefResult, setAiBriefResult] = useState<any | null>(null);

  // Cycling helpful design messages during calculation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % LOADING_STEPS.length;
        setLoadingText(LOADING_STEPS[idx]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!isOpen) return null;

  const handleToggleService = (serviceName: string) => {
    setFormData(prev => {
      const isSelected = prev.services.includes(serviceName);
      return {
        ...prev,
        services: isSelected 
          ? prev.services.filter(s => s !== serviceName)
          : [...prev.services, serviceName]
      };
    });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmitBrief = async () => {
    setLoading(true);
    setStep(4); // transition to loading screen
    
    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failure fetching brief estimation');
      }

      const rawData = await response.json();
      setAiBriefResult(rawData);
      setStep(5); // Show result screen
    } catch (err) {
      console.error(err);
      // Fallback fallback if API gets interrupted
      setAiBriefResult({
        estimatedTimeline: formData.timeline || "4-6 weeks",
        estimatedCost: formData.budget || "£12,000 - £18,000",
        visualDirections: [
          "Pure Minimalist layout utilizing luxurious whitespace and bold Syne display headings.",
          "Subtle glassmorphic elevations with tactile spring interactions.",
          "High-contrast light interface backed by slow smooth enter transitions."
        ],
        engineeringApproach: "Built with React 19, TypeScript, and Tailwind CSS. Leveraging custom component modules and hardware-accelerated Framer Motion interactions to guarantee 60fps scrolling.",
        recommendedMilestones: [
          "Milestone 1: Wireframing & Interactive Prototypes (Weeks 1-2)",
          "Milestone 2: Immersive 3D/Texture Art Directions & Asset Prep (Week 3)",
          "Milestone 3: High-Fidelity Front-end Engineering and API Bridges (Week 4)",
          "Milestone 4: Deployment, Performance Fine-tuning & Handover (Week 5)"
        ],
        conceptSummary: `Hello ${formData.name || "Visionary Client"}, your concept for "${formData.description.substring(0, 40)}..." is outstanding. Gihan is ready with high-end creative visual design details, precision front-end development, and London-studio-grade execution guidelines.`
      });
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResultToClipboard = () => {
    if (!aiBriefResult) return;
    const textToCopy = `
=== PROJECT PROPOSAL BRIEF CO-PILOT ===
Client Name: ${formData.name}
Client Email: ${formData.email}
Services Desired: ${formData.services.join(', ')}

--- ESTIMATES ---
Calculated Timeline: ${aiBriefResult.estimatedTimeline}
Estimated Agency Cost Scope: ${aiBriefResult.estimatedCost}

--- BRIEF ANALYSIS ---
Concept Summary: ${aiBriefResult.conceptSummary}

--- VISUAL DIRECTIONS ---
${aiBriefResult.visualDirections.map((v: string) => `- ${v}`).join('\n')}

--- ENGINEERING APPROACH ---
${aiBriefResult.engineeringApproach}

--- RECOMMENDED ROADMAP ---
${aiBriefResult.recommendedMilestones.map((m: string) => `- ${m}`).join('\n')}

Generated confidential digital brief by GIHAN Portfolio.
    `;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#131313]/60 backdrop-blur-md"
      />

      {/* Brief Card Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#fcfcfc] w-full max-w-4xl h-full md:h-[90vh] md:max-h-[750px] md:rounded-[36px] overflow-hidden shadow-2xl flex flex-col pointer-events-auto border border-[#131313]/5"
      >
        
        {/* Top Header toolbar */}
        <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-[#131313]/5 bg-[#fcfcfc] z-20">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#131313] rounded-full animate-pulse" />
            <span className="font-display text-[#131313] text-xs font-bold uppercase tracking-widest">
              AI Project Brief Estimator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#131313]/5 text-[#44474c] hover:text-[#131313] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Content Area with dynamic height scrolling */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SERVICES SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h3 className="font-display text-2xl md:text-3.5xl font-bold uppercase tracking-tight text-[#131313]">
                    What can we help you build?
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#44474c] mt-2">
                    Select one or more services to unlock custom resource recommendations.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {SERVICES_OPTIONS.map((service) => {
                    const isSelected = formData.services.includes(service.name);
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleToggleService(service.name)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex justify-between items-center hover:scale-[1.01] ${
                          isSelected
                            ? 'bg-[#131313]/5 border-[#131313] shadow-sm'
                            : 'bg-white border-[#131313]/5 hover:border-[#131313]/20 shadow-xs'
                        }`}
                      >
                        <div className="max-w-[85%]">
                          <h4 className="font-display text-sm font-bold uppercase text-[#131313]">
                            {service.name}
                          </h4>
                          <p className="font-sans text-xs text-[#64748b] mt-1 line-clamp-1">
                            {service.desc}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isSelected 
                            ? 'bg-[#131313] border-[#131313] text-white' 
                            : 'border-[#131313]/20 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: TIMELINES & BUDGET */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                <div>
                  <h3 className="font-display text-2xl md:text-3.5xl font-bold uppercase tracking-tight text-[#131313]">
                    Timeline & Budget Scope
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#44474c] mt-2">
                    These metrics help our co-pilot design realistic sprints and feature sets.
                  </p>
                </div>

                {/* Timelines radio selectors */}
                <div className="space-y-4">
                  <h4 className="font-display text-xs uppercase tracking-widest text-[#131313] font-extrabold">
                    Desired Delivery Timeline
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMELINE_OPTIONS.map((time) => {
                      const isSelected = formData.timeline === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setFormData(prev => ({ ...prev, timeline: time }))}
                          className={`p-3.5 rounded-xl border text-left font-sans text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#131313] border-[#131313] text-white'
                              : 'bg-white border-[#131313]/5 hover:border-[#131313]/25 text-[#44474c]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budgets radio selectors */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-display text-xs uppercase tracking-widest text-[#131313] font-extrabold">
                    Project Budget Range
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {BUDGET_OPTIONS.map((budget) => {
                      const isSelected = formData.budget === budget;
                      return (
                        <button
                          key={budget}
                          onClick={() => setFormData(prev => ({ ...prev, budget }))}
                          className={`p-3.5 rounded-xl border text-left font-sans text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#131313] border-[#131313] text-white'
                              : 'bg-white border-[#131313]/5 hover:border-[#131313]/25 text-[#44474c]'
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONTACT DETAILS & PROJECT SUMMARY DESCRIPTION */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h3 className="font-display text-2xl md:text-3.5xl font-bold uppercase tracking-tight text-[#131313]">
                    Tell us your vision
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#44474c] mt-2">
                    Enter your concepts. Gihan's AI Co-Pilot will parse this description to model the final proposal parameters.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Liam Sterling"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-[#131313]/10 focus:border-[#131313] px-4 py-3 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. business@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-[#131313]/10 focus:border-[#131313] px-4 py-3 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1.5">
                      Describe your core project concept
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Share what makes this project important. Detail who the audience is, any tech preferences, and major benchmark designs you are highly inspired by..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-white border border-[#131313]/10 focus:border-[#131313] px-4 py-3 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] min-h-[120px] transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: INTERACTIVE LOADING SCREEN */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[360px] flex flex-col justify-center items-center text-center space-y-6"
              >
                <div className="relative flex items-center justify-center">
                  <Loader2 className="w-16 h-16 text-[#131313] animate-spin stroke-1" />
                  <Sparkles className="w-6 h-6 text-[#64748b] absolute animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-sm uppercase tracking-widest font-extrabold text-[#131313]">
                    Assembling Dynamic Blueprint
                  </h4>
                  <p className="font-sans text-xs text-[#64748b] min-h-[20px] animate-pulse">
                    {loadingText}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: DETAILED AI BLUEPRINT RESULTS SCREEN */}
            {step === 5 && aiBriefResult && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 text-left"
              >
                {/* Result header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-[#131313]/5 bg-white shadow-xs rounded-[24px] gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 stroke-1.5" />
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase text-[#131313]">
                        Confidential Studio Brief Prepared
                      </h4>
                      <p className="font-sans text-[11px] text-[#64748b]">
                        Address: London Office • Code: GPB-${Math.floor(Math.random() * 9000) + 1000}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyResultToClipboard}
                      className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-[#131313]/10 hover:border-[#131313] font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors bg-white hover:bg-[#131313]/5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Blueprint'}
                    </button>
                  </div>
                </div>

                {/* Concept and estimates block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Estimates and Services */}
                  <div className="md:col-span-4 p-6 rounded-[24px] bg-white border border-[#131313]/5 space-y-6">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1">
                        SERVICES KEYED
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {formData.services.map(s => (
                          <span key={s} className="px-2 py-1 bg-[#131313]/5 text-[10px] uppercase tracking-wider font-semibold rounded-md">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1">
                        ESTIMATED TIMELINE
                      </span>
                      <p className="font-display text-lg font-bold uppercase text-[#131313]">
                        {aiBriefResult.estimatedTimeline}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-1">
                        ESTIMATED COST SCOPE
                      </span>
                      <p className="font-display text-lg font-bold uppercase text-emerald-800">
                        {aiBriefResult.estimatedCost}
                      </p>
                    </div>
                  </div>

                  {/* Concept Summary from Gihan AI */}
                  <div className="md:col-span-8 p-6 rounded-[24px] bg-[#eeeeee]/40 border border-[#131313]/5">
                    <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">
                      CORE CONCEPT SUMMARY
                    </span>
                    <p className="font-sans text-xs md:text-sm text-[#44474c] leading-relaxed italic">
                      "{aiBriefResult.conceptSummary}"
                    </p>
                  </div>
                </div>

                {/* Aesthetic Directions & Dev Stack recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vis instructions */}
                  <div className="space-y-4">
                    <h5 className="font-display text-xs uppercase tracking-widest text-[#131313] font-bold border-l-2 border-[#131313] pl-2">
                       STUDIO ETHOS & VISUAL DIRECTIVES
                    </h5>
                    <div className="space-y-2.5">
                      {aiBriefResult.visualDirections.map((dir: string, dIdx: number) => (
                        <div key={dIdx} className="p-4 rounded-xl border border-[#131313]/5 bg-white text-xs text-[#44474c] leading-relaxed">
                          {dir}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dev Instructions */}
                  <div className="space-y-4">
                    <h5 className="font-display text-xs uppercase tracking-widest text-[#131313] font-bold border-l-2 border-[#131313] pl-2">
                       ENGINEERING DESIGN BLUEPRINT
                    </h5>
                    <div className="p-4 rounded-2xl border border-[#131313]/5 bg-white text-xs text-[#44474c] leading-relaxed space-y-4">
                      <p>{aiBriefResult.engineeringApproach}</p>
                      
                      <div className="pt-2 border-t border-[#131313]/5 space-y-2">
                        <span className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold">
                          RECOMMENDED MILESTONES
                        </span>
                        {aiBriefResult.recommendedMilestones.map((ms: string, msIdx: number) => (
                          <div key={msIdx} className="flex gap-2 items-start text-[11px] text-[#44474c]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] mt-1.5 flex-shrink-0" />
                            <span>{ms}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Navigation toolbar */}
        {step < 4 && (
          <div className="px-6 md:px-10 py-5 bg-[#eeeeee]/30 border-t border-[#131313]/5 flex justify-between items-center z-10">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="py-2.5 px-4 rounded-full hover:bg-[#131313]/5 text-[#131313] font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-[#131313]/10"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={step === 1 && formData.services.length === 0}
                className={`py-2.5 px-5 rounded-full font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${
                  step === 1 && formData.services.length === 0
                    ? 'bg-[#131313]/10 text-[#131313]/30 cursor-not-allowed'
                    : 'bg-[#131313] text-white hover:bg-[#64748b] transition-all hover:translate-x-0.5'
                }`}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitBrief}
                disabled={!formData.name || !formData.email || !formData.description}
                className={`py-2.5 px-5 rounded-full font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${
                  (!formData.name || !formData.email || !formData.description)
                    ? 'bg-[#131313]/10 text-[#131313]/30 cursor-not-allowed'
                    : 'bg-[#131313] text-white hover:bg-[#64748b] transition-all hover:scale-103'
                }`}
              >
                Generate Dynamic Brief <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Results view bottom footer dismissal */}
        {step === 5 && (
          <div className="px-6 md:px-10 py-5 bg-[#eeeeee]/30 border-t border-[#131313]/5 flex justify-end items-center z-10">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-full bg-[#131313] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#64748b] transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
