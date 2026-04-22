import { motion } from 'framer-motion'
import { ExternalLink, Github, CheckCircle2, Mail, Bot, Server } from 'lucide-react'

function ProjectIcon({ type }) {
  if (type === 'bot') return <Bot className="w-8 h-8 text-purple-300" />
  if (type === 'email') return <Mail className="w-8 h-8 text-cyan-300" />
  if (type === 'server') return <Server className="w-8 h-8 text-emerald-300" />
  return <ExternalLink className="w-8 h-8 text-slate-300" />
}

export default function ProjectCard({ p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-accent/40 shadow-lg hover:shadow-accent/10 transition-all duration-500 flex flex-col"
    >
      {/* Visual Header */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${p.color} p-6 border-b border-white/8`} style={{ minHeight: '160px' }}>
        {/* Terminal Window */}
        <div className="relative z-10 bg-slate-900/75 backdrop-blur rounded-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-400/80"></span>
            <span className="terminal-dot bg-yellow-400/80"></span>
            <span className="terminal-dot bg-green-400/80"></span>
            <span className="ml-2 text-xs text-slate-500 font-mono truncate">{p.name.toLowerCase().replace(/\s+/g, '-')}.js</span>
          </div>
          {/* Terminal body */}
          <div className="p-4 font-mono text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-slate-300">npm run {p.name.split(' ')[0].toLowerCase()}</span>
            </div>
            {p.highlights?.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-400">
                <span className="text-accent mt-0.5">✓</span>
                <span>{h}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 text-slate-500">
              <span className="text-accent animate-pulse">▊</span>
              <span>Ready</span>
            </div>
          </div>
        </div>

        {/* Year + icon badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-accent border border-accent/30">
            {p.year}
          </span>
        </div>

        {/* Big icon watermark */}
        <div className="absolute -bottom-3 -left-3 opacity-10">
          <ProjectIcon type={p.icon} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
              {p.name}
            </h3>
            {p.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{p.subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                title="View on GitHub"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent/50 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {p.link && !p.github && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent/50 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mt-3 mb-4 flex-1">
          {p.description}
        </p>

        {/* Key Highlights */}
        {p.highlights && (
          <div className="mb-4 space-y-1.5">
            {p.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {p.stack.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-accent/8 border border-accent/20 text-accent/90 font-medium hover:bg-accent/15 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
