import { motion } from 'framer-motion'
import { MapPin, Calendar, Zap } from 'lucide-react'

export default function TimelineItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 border-l-2 border-accent/25 hover:border-accent/60 transition-colors duration-500 group"
    >
      {/* Timeline dot */}
      <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] transition-shadow duration-300" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-lg text-white leading-snug">
              {item.role || item.degree}
            </h3>
            {item.current && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/15 border border-accent/40 text-accent">
                <Zap className="w-3 h-3" />
                Current
              </span>
            )}
          </div>
          <p className="text-accent font-semibold mt-0.5">
            {item.company || item.school}
            {item.meta && <span className="text-slate-400 font-normal ml-2 text-sm">({item.meta})</span>}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-sm text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/8">
            <Calendar className="w-3.5 h-3.5 text-accent/70" />
            {item.period}
          </span>
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent/60" />
              {item.location}
            </span>
          )}
        </div>
      </div>

      {/* Bullets */}
      {item.bullets && (
        <ul className="space-y-2.5 mb-4">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech tags */}
      {item.tech && item.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-brand-600/10 border border-brand-500/20 text-brand-400 font-medium hover:bg-brand-600/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
