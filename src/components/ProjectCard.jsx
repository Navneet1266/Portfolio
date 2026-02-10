import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ p }) {
  const [imgSrc, setImgSrc] = useState(p.image)
  const [imgStatus, setImgStatus] = useState('loading')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-accent/30 backdrop-blur shadow-lg hover:shadow-accent/10 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-brand-600/20 to-accent/20">
        <img
          src={imgSrc}
          alt={`${p.name} screenshot`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onLoad={() => setImgStatus('loaded')}
          onError={() => {
            setImgStatus('error')
            setImgSrc('/images/project-fallback.svg')
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-accent border border-accent/30">
          {p.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
            {p.name}
          </h3>
          {p.link && p.link !== '#' && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/50 transition-all duration-300"
            >
              {p.link.includes('github') ? (
                <Github className="w-4 h-4" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
            </a>
          )}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {p.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
