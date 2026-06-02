import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, MapPin, GalleryVerticalEnd } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNo, setTicketNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError('');

    try {
      await emailjs.send(
  "service_tej2bh7",    // 👈 paste your real Service ID
  "template_loixwor",   // 👈 paste your real Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  },
  "xg979wez_32NeM2xy"     // 👈 paste your real Public Key
);

      setTicketNo(Math.floor(Math.random() * 900000) + 100000);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-[#131313]/10 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6 text-left">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#64748b] font-bold mb-4 inline-block">
              Connection
            </span>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#131313]">
              Start a <br />Conversa<br />tion.
            </h2>
            
            <p className="font-sans text-xs md:text-sm text-[#44474c] max-w-sm leading-relaxed">
              Have a bold digital concept you want to realize? Or just looking to chat about potential creative collaborations? Gihan's inbox is always ready.
            </p>
          </div>

          {/* Spinning Say Hello */}
          <div className="my-12">
            <motion.a
              href="mailto:pgihan29@gmail.com"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:pgihan29@gmail.com';
              }}
              whileHover={{ scale: 1.90 }}
              whileTap={{ scale: 0.95 }}
              className="w-40 h-40 rounded-full border border-[#131313]/10 flex flex-col justify-center items-center relative group select-none cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute inset-[4px] border border-dashed border-[#131313]/10 rounded-full group-hover:border-[#131313]/30"
              />
              <span className="block text-center font-display text-xl uppercase tracking-[0.4em] font-extrabold text-[#131313]">
                SAY HELLO
              </span>
              <ArrowRight className="w-5 h-5 text-[#64748b] mt-3 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Location details */}
          <div className="space-y-4 text-left border-t border-[#131313]/10 pt-6">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#44474c]">
              <MapPin className="w-4 h-4 text-[#131313]" />
              <span>Mirigama, Sri Lanka (GMT)</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-semibold text-[#44474c]">
              <Mail className="w-4 h-4 text-[#131313]" />
              <a href="mailto:pgihan29@gmail.com" className="hover:text-[#131313] transition-colors underline underline-offset-4 decoration-1 decoration-[#131313]/20">
                pgihan29@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#44474c]">
              <GalleryVerticalEnd className="w-4 h-4 text-[#131313]" />
              <a href="https://www.behance.net/gihanpradeep" className="hover:text-[#131313] transition-colors underline underline-offset-4 decoration-1 decoration-[#131313]/20">
                More projects on behance
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-12 bg-white rounded-[32px] border border-[#131313]/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Liam Sterling"
                        className="w-full bg-slate-50 border border-[#131313]/10 focus:border-[#131313] px-4 py-3.5 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g. business@domain.com"
                        className="w-full bg-slate-50 border border-[#131313]/10 focus:border-[#131313] px-4 py-3.5 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g. Digital Design Project Inquiry"
                      className="w-full bg-slate-50 border border-[#131313]/10 focus:border-[#131313] px-4 py-3.5 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share your timeline, approximate feature goals, and target aesthetics..."
                      className="w-full bg-slate-50 border border-[#131313]/10 focus:border-[#131313] px-4 py-3.5 text-xs md:text-sm text-[#131313] rounded-xl outline-hidden focus:ring-1 focus:ring-[#131313] transition-all min-h-[120px]"
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                      ⚠️ {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#131313] text-[#ffffff] py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all hover:bg-[#64748b] flex justify-center items-center gap-2 hover:scale-[1.01] active:scale-99 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col justify-center items-center text-center space-y-6"
                >
                  <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm animate-bounce">
                    <CheckCircle2 className="w-10 h-10 stroke-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display text-lg font-bold uppercase tracking-wide text-[#131313]">
                      Message Received
                    </h4>
                    <p className="font-sans text-xs text-[#64748b] leading-relaxed max-w-sm">
                      Thank you for reaching out! Gihan has safely received your message.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-[#131313]/5 text-[11px] font-mono text-[#64748b] w-full max-w-xs">
                    TICKET REF: #{ticketNo} <br />
                    AUTOREPLY TRIGGERED VIA GM-API
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-full border border-[#131313]/10 font-sans text-[10px] uppercase tracking-widest font-extrabold hover:border-[#131313] transition-colors bg-white mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}