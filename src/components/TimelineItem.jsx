import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'

export default function TimelineItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 border-l-2 border-accent/30 hover:border-accent transition-colors duration-300"
    >
      {/* Timeline dot */}
      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface border-2 border-accent shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-lg text-white">
            {item.role || item.degree}
          </h3>
          <p className="text-accent font-medium">
            {item.company || item.school}
            {item.meta && <span className="text-slate-400 font-normal ml-2">({item.meta})</span>}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {item.period}
          </span>
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {item.location}
            </span>
          )}
        </div>
      </div>

      {/* Bullets */}
      {item.bullets && (
        <ul className="mt-4 space-y-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
