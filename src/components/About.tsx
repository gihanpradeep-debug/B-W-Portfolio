import { motion } from 'motion/react';

export default function About() {
  const stats = [
    { value: '04+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '15+', label: 'Design Awards' }
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-[#131313]/10 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

        {/* Left Side: Portrait Image with premium hover dynamics */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-[32px] overflow-hidden bg-[#eeeeee] relative group shadow-[0_16px_40px_rgba(0,0,0,0.03)] border border-[#131313]/5"
          >
            <motion.img
              src="images\hero.jpeg"
              alt="Gihan Portrait"
              className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 filter"
              whileHover={{ scale: 1.05 }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Philosophy and Stat counters */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#131313] mb-8 leading-[1.1] tracking-[-0.03em] uppercase"
          >
            DESIGNER. DEVELOPER. VISIONARY.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-base md:text-lg text-[#44474c] mb-12 max-w-2xl leading-relaxed"
          >
            Hey, I’m Gihan—a UI/UX designer and front-end developer with a passion for creating beautiful, user-friendly digital experiences. With over four years of experience, I specialize in designing landing pages, home pages, and full-scale digital products that not only look great but also feel intuitive to use.
            From wireframing and prototyping to UX research and UI design, I focus on crafting seamless experiences that help businesses grow. But I don’t stop at design—I also bring ideas to life with front-end development, using HTML, CSS, JavaScript, and React to build interactive and responsive websites.
            I love blending creativity with functionality, making sure every design is both visually appealing and technically optimized. Let’s create something amazing together!
          </motion.p>

          {/* Stats Counters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-[#131313]/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group cursor-default"
              >
                <div className="font-display text-4xl md:text-5xl text-[#131313] font-bold mb-1 transition-all group-hover:translate-x-1 duration-300">
                  {stat.value}
                </div>
                <div className="font-sans text-xs uppercase tracking-widest text-[#64748b] font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
