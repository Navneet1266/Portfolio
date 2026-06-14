import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ExternalLink, Github, Mail, Bot, Server, ArrowUpRight, Kanban } from 'lucide-react'

const ICONS = { bot: Bot, email: Mail, server: Server, kanban: Kanban }

// Pull numbers out of highlights for the stat bar
function extractStat(text) {
  const m = text.match(/([\d,.]+\s*[%x+]?|[x\d]+x|\d+\.\d+)/)
  if (!m) return null
  const label = text.replace(m[0], '').replace(/[—–-]/g, '').trim().slice(0, 28)
  return { value: m[0], label }
}

export default function ProjectCard({ p }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['6deg', '-6deg']), { stiffness: 120, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-6deg', '6deg']),  { stiffness: 120, damping: 22 })

  const onMove  = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2))
    y.set((e.clientY - (r.top  + r.height / 2)) / (r.height / 2))
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Icon   = ICONS[p.icon] || ExternalLink
  const stats  = (p.highlights || []).slice(0, 3).map(extractStat).filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      layout
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group h-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm hover:border-accent/30 transition-all duration-500"
        whileHover={{ boxShadow: `0 0 0 1px rgba(168,85,247,0.2), 0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(168,85,247,0.08)` }}
      >
        {/* ── Header band ── */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${p.color} p-7 flex flex-col gap-5`}
          style={{ minHeight: 168 }}
        >
          {/* subtle inner grid */}
          <div className="absolute inset-0 bg-grid opacity-[0.08]" />

          {/* Top row: icon + year */}
          <div className="relative flex items-start justify-between">
            <div
              className="p-3 rounded-2xl backdrop-blur-sm"
              style={{ background: `${p.accent}22`, border: `1px solid ${p.accent}44` }}
            >
              <Icon className="w-7 h-7" style={{ color: p.accent }} />
            </div>
            <span
              className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}40` }}
            >
              {p.year}
            </span>
          </div>

          {/* Stat bar */}
          {stats.length > 0 && (
            <div className="relative flex gap-3 flex-wrap">
              {stats.map(({ value, label }, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[72px] rounded-xl p-3 backdrop-blur-md"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="text-xl font-black leading-none"
                    style={{ color: p.accent }}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] text-white/50 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-accent/90 transition-colors duration-300">
                {p.name}
              </h3>
              {p.subtitle && (
                <p className="text-[11px] text-slate-500 mt-0.5">{p.subtitle}</p>
              )}
            </div>
            <div className="flex gap-1.5 shrink-0">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/12 border border-white/8 hover:border-accent/40 transition-all">
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {p.link && !p.github && (
                <a href={p.link} target="_blank" rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/12 border border-white/8 hover:border-accent/40 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-[13px] leading-relaxed mt-3 mb-5 flex-1">
            {p.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
            {p.stack.map((s, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all duration-200"
                style={{
                  background:   `${p.accent}12`,
                  border:       `1px solid ${p.accent}30`,
                  color:        p.accent,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
