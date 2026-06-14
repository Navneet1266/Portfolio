import { motion } from 'framer-motion'

export default function Section({ id, title, subtitle, num, children }) {
  return (
    <section id={id} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.07]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 relative">
          {/* Big faded number decoration */}
          {num && (
            <span
              className="absolute -top-6 right-0 text-[110px] sm:text-[140px] font-black leading-none select-none pointer-events-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(99,102,241,0.1)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num}
            </span>
          )}

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            {/* Overline label */}
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
              <span className="inline-block w-6 h-px bg-accent" />
              {num && <span className="text-accent/40 font-mono">{num}</span>}
              {title}
            </p>

            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight">
              <span className="text-white">{title.split(' ').slice(0, -1).join(' ')} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-brand-400">
                {title.split(' ').slice(-1)[0]}
              </span>
            </h2>

            {subtitle && (
              <p className="mt-3 text-slate-400 max-w-lg text-sm sm:text-base leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="mt-6 h-px w-24 bg-gradient-to-r from-accent to-transparent origin-left"
            />
          </motion.div>
        </div>

        <div>{children}</div>
      </div>
    </section>
  )
}
