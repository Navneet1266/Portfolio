import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight, Zap, GraduationCap, Briefcase } from 'lucide-react'

function CompanyBadge({ name, current }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div className="relative shrink-0">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-lg"
        style={{
          background: current
            ? 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          boxShadow: current ? '0 0 24px rgba(6,182,212,0.3)' : undefined,
        }}
      >
        {initials}
      </div>
      {current && (
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-surface animate-pulse" />
      )}
    </div>
  )
}

export default function TimelineItem({ item }) {
  const isEducation = !!item.degree
  const Icon = isEducation ? GraduationCap : Briefcase

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8 hover:border-accent/30 transition-all duration-500 hover:bg-white/[0.06] overflow-hidden">

        {/* Background glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-brand-600/0 group-hover:from-accent/[0.03] group-hover:to-brand-600/[0.03] transition-all duration-500 pointer-events-none" />

        {/* Corner icon */}
        <div className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-xl bg-white/5 border border-white/8 text-slate-600 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
          <Icon className="w-4 h-4" />
        </div>

        {/* Top row — badge + title */}
        <div className="flex items-start gap-4 pr-12">
          <CompanyBadge name={item.company || item.school} current={item.current} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-extrabold text-lg sm:text-xl text-white leading-snug">
                {item.role || item.degree}
              </h3>
              {item.current && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/15 border border-green-500/35 text-green-400 uppercase tracking-wide">
                  <Zap className="w-2.5 h-2.5" />
                  Current
                </span>
              )}
            </div>

            <a
              href={item.link || '#'}
              target={item.link ? '_blank' : undefined}
              rel="noreferrer"
              className={`inline-flex items-center gap-1 font-semibold text-accent text-sm sm:text-base ${item.link ? 'hover:underline underline-offset-2' : 'pointer-events-none'}`}
            >
              {item.company || item.school}
              {item.link && <ArrowUpRight className="w-3.5 h-3.5" />}
            </a>
            {item.meta && (
              <span className="ml-2 text-slate-400 text-sm font-normal">· {item.meta}</span>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">
                <Calendar className="w-3 h-3 text-accent/60" />
                {item.period}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3 h-3 text-accent/60" />
                  {item.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        {(item.bullets || item.tech) && (
          <div className="mt-6 mb-5 h-px bg-gradient-to-r from-white/10 via-accent/15 to-transparent" />
        )}

        {/* Bullet points */}
        {item.bullets && (
          <ul className="space-y-3 mb-5">
            {item.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent to-cyan-400 shrink-0" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Tech tags */}
        {item.tech && item.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-600/10 border border-brand-500/20 text-brand-400 font-semibold hover:bg-brand-600/20 hover:border-brand-500/40 transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
