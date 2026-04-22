import { motion } from 'framer-motion'

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60"></div>
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
              {title}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/60"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {subtitle && (
            <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </section>
  )
}
