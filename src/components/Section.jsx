import { motion } from 'framer-motion'

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-accent to-transparent"></div>
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              {title}
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-accent to-transparent"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {subtitle && (
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-center text-lg">
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
