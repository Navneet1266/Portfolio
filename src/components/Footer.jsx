import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Github, Linkedin, Mail, Phone,
  ArrowDownToLine, MapPin, ExternalLink,
  Zap, ArrowUpRight, Code2,
} from 'lucide-react'
import { PROFILE } from '../data'
import { smoothScrollToHash } from '../utils/smoothScroll'

const NAV_LINKS = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education' },
  { id: 'contact',    label: 'Contact' },
]

const SOCIAL = [
  { icon: Github,   label: 'GitHub',    sub: 'Navneet1266',          href: PROFILE.github,              color: 'hover:border-slate-400/60 hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn',  sub: 'navneetkumar1266',     href: PROFILE.linkedin,            color: 'hover:border-blue-400/60 hover:text-blue-400' },
  { icon: Mail,     label: 'Email',     sub: PROFILE.email,          href: `mailto:${PROFILE.email}`,   color: 'hover:border-accent/60 hover:text-accent' },
  { icon: Phone,    label: 'Phone',     sub: `+91 ${PROFILE.phone}`, href: `tel:${PROFILE.phone}`,      color: 'hover:border-green-400/60 hover:text-green-400' },
]

const STACK = [
  'React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io', 'JWT', 'OAuth 2.0',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
  'Docker', 'Nginx', 'Jenkins', 'GitLab CI/CD', 'AWS', 'GCP', 'Linux',
  'Python', 'TensorFlow', 'LLMs', 'RAG', 'ChromaDB',
]

function LocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Kolkata', hour12: true,
      }))
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      IST {time}
    </span>
  )
}

export default function Footer() {
  const nav = (id) => { smoothScrollToHash(id, 600); history.replaceState(null, '', `#${id}`) }

  return (
    <footer className="relative overflow-hidden">

      {/* ── Top glowing divider ── */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      {/* ── CTA Hero band ── */}
      <div className="relative py-20 px-4 overflow-hidden">
        {/* aurora bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-brand-600/8 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold mb-6 tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for full-time roles
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Let's build something
            <span className="block text-shimmer mt-1">extraordinary.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            I'm actively looking for my next challenge. Whether it's a startup, scale-up, or an enterprise team — let's talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => nav('contact')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)] hover:scale-105 hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 group-hover:animate-bounce" />
              Hire Me
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>

            <a
              href="/Navneet_Full_Stack_Developer.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <ArrowDownToLine className="w-4 h-4" />
              Resume
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand col */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-brand-500 shadow-md">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-accent to-brand-400">
              Navneet Kumar
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Full Stack Developer crafting performant, scalable web apps with modern JavaScript ecosystems.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            Bengaluru, Karnataka, India
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <LocalTime />
          </div>
        </motion.div>

        {/* Quick Nav */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Navigation</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => nav(id)}
                  className="text-slate-400 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-0 group-hover:w-2.5 h-px bg-accent transition-all duration-200 rounded" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Connect</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIAL.map(({ icon: Icon, label, sub, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className={`group flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.02] ${color} transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5`}
              >
                <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white">{label}</div>
                  <div className="text-[11px] text-slate-500 truncate">{sub}</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Tech stack ribbon ── */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-3.5">Core Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {STACK.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-400 border border-white/8 bg-white/[0.03] hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.05] bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <span>&copy; {new Date().getFullYear()} Navneet Kumar. All rights reserved.</span>
          <span>React · Tailwind · Framer Motion · Vite</span>
        </div>
      </div>
    </footer>
  )
}
