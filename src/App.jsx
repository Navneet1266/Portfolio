import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import TimelineItem from './components/TimelineItem'
import SkillPill from './components/SkillPill'
import ContactForm from './components/ContactForm'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'
import Footer from './components/Footer'
import { PROFILE, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS, ACHIEVEMENTS } from './data'
import {
  ArrowDownToLine, Github, Linkedin, Mail, Phone,
  Monitor, Server, Code2, BrainCircuit, Cloud,
  TrendingUp, Zap, Rocket, Target, Star,
  Users, GitFork, CheckCircle2, Info, Filter,
} from 'lucide-react'
import useActiveSection from './hooks/useActiveSection'

// ── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pauseMs = 2200) {
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const full = words[idx]
    if (!deleting && display === full) { const t = setTimeout(() => setDeleting(true), pauseMs); return () => clearTimeout(t) }
    if (deleting && display === '') { setDeleting(false); setIdx(i => (i + 1) % words.length); return }
    const t = setTimeout(() => {
      setDisplay(deleting ? full.slice(0, display.length - 1) : full.slice(0, display.length + 1))
    }, deleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(t)
  }, [display, deleting, idx, words, typeSpeed, deleteSpeed, pauseMs])
  return display
}

// ── Toast system ─────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([])
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200)
  }
  return { toasts, addToast }
}

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 pointer-events-none flex flex-col gap-2 items-end" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm font-medium ${
              t.type === 'success'
                ? 'bg-green-500/15 border-green-500/30 text-green-400'
                : t.type === 'error'
                ? 'bg-red-500/15 border-red-500/30 text-red-400'
                : 'bg-accent/15 border-accent/30 text-accent'
            }`}
          >
            {t.type === 'success'
              ? <CheckCircle2 className="w-4 h-4 shrink-0" />
              : <Info className="w-4 h-4 shrink-0" />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── GitHub stats ─────────────────────────────────────────────────────────────
function useGithubStats(username) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(d => setStats({ repos: d.public_repos, followers: d.followers }))
      .catch(() => {})
  }, [username])
  return stats
}

// ── Hero stat count-up on mount ───────────────────────────────────────────────
function useHeroStat(value, delay = 700, duration = 1800) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    const timer = setTimeout(() => {
      const m = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
      if (!m) { setDisplay(value); return }
      const [, pre, numStr, suf] = m
      const num = parseFloat(numStr)
      const isFloat = numStr.includes('.')
      let t0 = null
      const tick = (ts) => {
        if (!t0) t0 = ts
        const p = Math.min((ts - t0) / duration, 1)
        const e = 1 - (1 - p) ** 3
        setDisplay(`${pre}${isFloat ? (e * num).toFixed(2) : Math.round(e * num)}${suf}`)
        if (p < 1) requestAnimationFrame(tick)
        else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay, duration])
  return display
}

// ── Achievement count-up via IntersectionObserver ───────────────────────────
function AnimatedValue({ value, duration = 1800 }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return
      done.current = true; obs.disconnect()
      const m = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
      if (!m) { setDisplay(value); return }
      const [, pre, numStr, suf] = m
      const num = parseFloat(numStr); const isFloat = numStr.includes('.')
      let t0 = null
      const tick = (ts) => {
        if (!t0) t0 = ts
        const p = Math.min((ts - t0) / duration, 1); const ease = 1 - (1 - p) ** 3
        setDisplay(`${pre}${isFloat ? (ease * num).toFixed(2) : Math.round(ease * num)}${suf}`)
        if (p < 1) requestAnimationFrame(tick); else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [value, duration])
  return <span ref={ref}>{display}</span>
}

// ── Proficiency bar ──────────────────────────────────────────────────────────
function ProficiencyBar({ label, level, color }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-sm text-slate-300 w-[130px] shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-[width] duration-[1200ms] ease-out`}
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
      <span className="text-[11px] text-slate-500 w-8 text-right font-mono">{level}%</span>
    </div>
  )
}

// ── Hero IDE card ────────────────────────────────────────────────────────────
function HeroCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7 }}
      className="w-full mt-5 bg-[#0d1117] rounded-2xl border border-white/[0.07] shadow-2xl overflow-hidden hover:border-accent/20 transition-all duration-500"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="flex-1 text-center text-[11px] text-slate-500 font-mono">navneet.profile.ts</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400/80 border border-blue-500/20 font-mono">TS</span>
      </div>
      <div className="px-4 py-3 font-mono text-[11.5px] leading-[1.85] select-none">
        {[
          ['1', <><span className="text-slate-600">{'// 👋 My developer snapshot'}</span></>],
          ['2', <><span className="text-purple-400">const </span><span className="text-blue-300">dev</span><span className="text-slate-300"> = {'{'}</span></>],
          ['3', <><span className="pl-5 text-cyan-300">role</span><span className="text-slate-300">: </span><span className="text-emerald-400">"Full Stack Dev"</span><span className="text-slate-500">,</span></>],
          ['4', <><span className="pl-5 text-cyan-300">company</span><span className="text-slate-300">: </span><span className="text-emerald-400">"Globiva Services"</span><span className="text-slate-500">,</span></>],
          ['5', <><span className="pl-5 text-cyan-300">exp</span><span className="text-slate-300">: </span><span className="text-amber-300">1.5</span><span className="text-slate-600 ml-2">{'// years'}</span></>],
          ['6', <><span className="pl-5 text-cyan-300">projects</span><span className="text-slate-300">: </span><span className="text-amber-300">10</span><span className="text-slate-500">,</span></>],
          ['7', <><span className="pl-5 text-cyan-300">cgpa</span><span className="text-slate-300">: </span><span className="text-amber-300">8.02</span><span className="text-slate-600 ml-2">{'// /10'}</span></>],
          ['8', <><span className="pl-5 text-cyan-300">status</span><span className="text-slate-300">: </span><span className="text-green-400">"open_to_work ✅"</span></>],
          ['9', <><span className="text-slate-300">{'}'}</span></>],
        ].map(([n, content]) => (
          <div key={n}><span className="text-slate-600 mr-3 text-[10px]">{n}</span>{content}</div>
        ))}
        <div className="flex items-center mt-0.5">
          <span className="text-slate-600 mr-3 text-[10px]">10</span>
          <span className="inline-block w-[7px] h-[13px] bg-accent/70 rounded-[1px] animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}

// ── Local time ────────────────────────────────────────────────────────────────
function LocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Kolkata', hour12: true,
      }))
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="flex items-center gap-1.5 text-slate-600 text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse inline-block" />
      Bengaluru, India · IST {time}
    </span>
  )
}

// ── Skill category meta ──────────────────────────────────────────────────────
const skillCategories = [
  { key: 'frontend',  label: 'Frontend',      icon: Monitor,      color: 'blue',   span: '' },
  { key: 'backend',   label: 'Backend',        icon: Server,       color: 'green',  span: '' },
  { key: 'languages', label: 'Languages',      icon: Code2,        color: 'yellow', span: '' },
  { key: 'data',      label: 'Data & ML',      icon: BrainCircuit, color: 'purple', span: '' },
  { key: 'devops',    label: 'DevOps & Tools', icon: Cloud,        color: 'orange', span: 'md:col-span-2 lg:col-span-2' },
]
const iconColorMap = {
  blue:   'text-blue-400 bg-blue-500/10 border-blue-500/20',
  green:  'text-green-400 bg-green-500/10 border-green-500/20',
  yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
}
const borderColorMap = {
  blue:   'hover:border-blue-400/40',
  green:  'hover:border-green-400/40',
  yellow: 'hover:border-yellow-400/40',
  purple: 'hover:border-purple-400/40',
  orange: 'hover:border-orange-400/40',
}

const SKILL_PROFICIENCY = [
  { label: 'Frontend Dev',    level: 88, color: 'from-blue-500 to-cyan-400' },
  { label: 'Backend / APIs',  level: 85, color: 'from-green-500 to-emerald-400' },
  { label: 'DevOps & Cloud',  level: 78, color: 'from-orange-500 to-amber-400' },
  { label: 'Languages',       level: 80, color: 'from-yellow-500 to-yellow-300' },
  { label: 'AI / ML',         level: 65, color: 'from-purple-500 to-violet-400' },
]

const PROJECT_FILTER_TAGS = ['All', 'React.js', 'Node.js', 'Socket.io', 'Docker', 'MongoDB', 'Redis', 'MySQL', 'Python']

const achievementIcons = [TrendingUp, Zap, Rocket, Target]

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [cmdOpen,     setCmdOpen]       = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const { toasts, addToast }            = useToast()
  const ghStats                         = useGithubStats('Navneet1266')

  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
  const activeId   = useActiveSection(sectionIds)

  const roles      = ['Full Stack Developer', 'React & Node.js Expert', 'Backend Architect', 'AI/ML Enthusiast']
  const displayRole = useTypewriter(roles)

  // ⌘K listener
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Filtered projects
  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.stack.includes(activeFilter))

  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      <CustomCursor />
      <Toast toasts={toasts} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onToast={addToast} />

      <div className="min-h-screen bg-surface text-slate-100 md:pl-24 relative" style={{ zIndex: 1 }}>
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          activeId={activeId}
          onOpenCmd={() => setCmdOpen(true)}
        />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeId={activeId} />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
          {/* Aurora background */}
          <div className="aurora-wrap">
            <div className="aurora-orb aurora-orb-1" />
            <div className="aurora-orb aurora-orb-2" />
            <div className="aurora-orb aurora-orb-3" />
          </div>
          <div className="absolute -z-10 inset-0 bg-grid opacity-20" />

          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center w-full">

            {/* LEFT */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to full-time opportunities
              </motion.div>

              <h1 className="font-black leading-[0.92] tracking-tight">
                <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] text-white">Navneet</span>
                <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] text-shimmer">Kumar.</span>
              </h1>

              <div className="mt-5 text-base sm:text-lg text-slate-400 font-medium h-7 flex items-center gap-1.5">
                <span className="text-accent/70 font-mono text-sm">▸</span>
                <span className="text-slate-300">{displayRole}</span>
                <span className="typewriter-cursor" />
              </div>

              <p className="mt-5 text-slate-400 max-w-lg leading-relaxed text-sm sm:text-[15px]">{PROFILE.summary}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_36px_rgba(168,85,247,0.6)] hover:scale-105 hover:-translate-y-0.5">
                  View Projects
                </a>
                <a
                  href="/Navneet_Full_Stack_Developer.pdf"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 hover:border-accent/40 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  Resume
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-accent/40 text-slate-400 hover:text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                  Contact
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3">
                {[
                  { href: PROFILE.github,            icon: Github,   label: 'GitHub' },
                  { href: PROFILE.linkedin,           icon: Linkedin, label: 'LinkedIn' },
                  { href: `mailto:${PROFILE.email}`, icon: Mail,     label: 'Email' },
                  { href: `tel:${PROFILE.phone}`,    icon: Phone,    label: 'Phone' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={label}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/10 hover:border-accent/50 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
                <span className="text-slate-500 text-sm ml-1">Let's connect</span>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 animate-float">
                <div className="absolute inset-0 rounded-full border border-accent/15 animate-orbit-cw" />
                <div className="absolute inset-0 rounded-full border border-purple-400/10 animate-orbit-ccw" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-accent to-purple-500 blur-2xl opacity-20 animate-spin-slow" />
                <img
                  src="/profile.jpg"
                  alt="Navneet Kumar"
                  className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-accent/50 object-cover object-[50%_2%] shadow-2xl hover:scale-105 transition-transform duration-500"
                  style={{ boxShadow: '0 0 40px rgba(6,182,212,0.22), 0 0 80px rgba(168,85,247,0.1)' }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: 'spring', stiffness: 260, damping: 18 }}
                  className="absolute bottom-1 right-1 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur text-[11px] text-green-400 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available
                </motion.div>
              </div>

              <HeroCodeCard />

              {/* GitHub live stats */}
              <AnimatePresence>
                {ghStats && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-5 mt-4 text-[12px] text-slate-500"
                  >
                    <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                      <GitFork className="w-3.5 h-3.5" />
                      {ghStats.repos} repos
                    </a>
                    <span className="text-white/10">·</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {ghStats.followers} followers
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs">
            <span>Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDownToLine className="w-4 h-4" />
            </motion.div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS ─────────────────────────────────────────── */}
        <div className="relative py-14 border-y border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-brand-600/5 to-surface" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative max-w-6xl mx-auto px-4">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-10"
            >
              Key Impact &amp; Achievements
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = achievementIcons[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 mb-3 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300 stat-number">
                      <AnimatedValue value={a.value} />
                    </div>
                    <div className="text-white font-semibold text-sm mt-1">{a.label}</div>
                    <div className="text-slate-500 text-xs mt-1 leading-tight">{a.desc}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <Section id="about" num="01" title="About Me" subtitle="The person behind the code.">
          {/* Opening statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-semibold text-white/90 leading-snug mb-10 max-w-3xl border-l-2 border-accent pl-5"
          >
            I don't just write code — I architect solutions. From breaking apart monoliths to
            shipping AI pipelines, I care about the{' '}
            <span className="text-accent">outcome</span>, not just the output.
          </motion.p>

          {/* Specialty cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: Monitor,
                title: 'Frontend Craft',
                desc: 'React, Next.js, Vue.js, TypeScript, Redux Toolkit, Tailwind CSS, Framer Motion — pixel-perfect UIs that are fast, accessible, and a joy to use.',
                grad: 'from-blue-500/15 to-cyan-500/5',
                border: 'hover:border-blue-400/50',
                iconCls: 'bg-blue-500/15 border-blue-500/25 text-blue-400',
                tag: 'React · Next.js · Vue.js · TypeScript · Redux · Tailwind · D3.js',
              },
              {
                icon: Server,
                title: 'Backend & Systems',
                desc: 'Node.js, Express.js, REST APIs, GraphQL, Socket.io, Docker microservices, Redis, MySQL, MongoDB, PostgreSQL, CI/CD — production-grade from day one.',
                grad: 'from-green-500/15 to-emerald-500/5',
                border: 'hover:border-green-400/50',
                iconCls: 'bg-green-500/15 border-green-500/25 text-green-400',
                tag: 'Node.js · Express.js · Docker · Redis · MySQL · MongoDB · GraphQL · Socket.io · JWT · OAuth 2.0',
              },
              {
                icon: BrainCircuit,
                title: 'AI & LLM Integration',
                desc: 'RAG pipelines, vector search, NLP, TensorFlow, Scikit-learn — bringing real intelligence into products that ship.',
                grad: 'from-purple-500/15 to-violet-500/5',
                border: 'hover:border-purple-400/50',
                iconCls: 'bg-purple-500/15 border-purple-500/25 text-purple-400',
                tag: 'LLMs · RAG · ChromaDB · SentenceTransformers · NLP · TensorFlow',
              },
            ].map(({ icon: Icon, title, desc, grad, border, iconCls, tag }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group rounded-2xl p-5 bg-gradient-to-br ${grad} border border-white/8 ${border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`inline-flex p-2.5 rounded-xl border ${iconCls} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-2">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{desc}</p>
                <span className="text-[11px] font-mono text-slate-600">{tag}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: story + quick info */}
          <div className="grid md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 space-y-5"
            >
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  I graduated with a <span className="text-white font-semibold">B.Tech in CS from KIIT (8.02 CGPA)</span> and joined{' '}
                  <span className="text-white font-semibold">Globiva Services</span> where I now architect and ship enterprise software used by real teams daily — Incident Reporting, Asset Management, Task Tracking, and more.
                </p>
                <p>
                  I also built an email automation system for <span className="text-white font-semibold">Tata Motors</span> that handles 500+ emails a day, and a RAG-based chatbot that improved semantic accuracy by 28%. The common thread: solving hard, real problems with clean, maintainable code.
                </p>
                <p className="text-slate-400">
                  Outside of work I'm deep into AI/ML, system design, and pushing the craft of full-stack engineering. I'm actively looking for a team where the bar is high and the work actually matters.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">Currently shipping with</p>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Redis', 'Redux Toolkit', 'Docker', 'Jenkins', 'GitLab CI/CD', 'REST APIs', 'Socket.io', 'JWT'].map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-accent/8 border border-accent/15 text-accent/80 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="md:col-span-2 holo-card rounded-2xl p-6 bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-transparent transition-all duration-300"
            >
              <h4 className="font-bold text-sm text-accent mb-5 flex items-center gap-2 uppercase tracking-wide">
                <Star className="w-3.5 h-3.5" /> Quick Info
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Name',      val: PROFILE.name },
                  { label: 'Role',      val: 'Full Stack Developer' },
                  { label: 'Company',   val: 'Globiva Services' },
                  { label: 'Location',  val: 'Bengaluru, Karnataka' },
                  { label: 'Education', val: 'B.Tech CSE, KIIT · 8.02' },
                  { label: 'Status',    val: '🟢 Open to Opportunities', green: true },
                ].map(({ label, val, green }) => (
                  <li key={label} className="flex gap-2 py-1 border-b border-white/[0.04] last:border-0">
                    <span className="text-slate-600 w-20 shrink-0">{label}</span>
                    <span className={green ? 'text-green-400 font-semibold' : 'text-slate-200 font-medium'}>{val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* ── SKILLS ───────────────────────────────────────────────── */}
        <Section id="skills" num="02" title="Technical Skills" subtitle="Tools and technologies I use to ship quality software.">
          {/* Proficiency overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 bg-white/[0.03] rounded-2xl p-6 border border-white/8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Proficiency Overview
            </p>
            <div className="space-y-3.5">
              {SKILL_PROFICIENCY.map(s => <ProficiencyBar key={s.label} {...s} />)}
            </div>
          </motion.div>

          {/* Category cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map(({ key, label, icon: Icon, color, span }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-2xl p-5 transition-all duration-300 ${borderColorMap[color]} hover:bg-white/[0.06] ${span}`}
              >
                <h4 className="font-semibold text-sm text-white mb-4 flex items-center gap-2.5">
                  <span className={`p-1.5 rounded-lg border ${iconColorMap[color]}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  {label}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS[key].map(s => <SkillPill key={s} label={s} category={key} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── PROJECTS ─────────────────────────────────────────────── */}
        <Section id="projects" num="03" title="Featured Projects" subtitle="Selected work — real problems solved, real impact delivered.">
          {/* Tech filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8 items-center"
          >
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            {PROJECT_FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeFilter === tag
                    ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(p => <ProjectCard key={p.name} p={p} />)}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No projects match <span className="text-accent">{activeFilter}</span>. Try another filter.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-slate-400 text-sm mb-4">More projects and open-source contributions on GitHub</p>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-accent/40 text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              View GitHub Profile
            </a>
          </motion.div>
        </Section>

        {/* ── EXPERIENCE ───────────────────────────────────────────── */}
        <Section id="experience" num="04" title="Work Experience" subtitle="Where I've worked and the impact I've made.">
          <div className="space-y-12">
            {EXPERIENCE.map((e, idx) => <TimelineItem key={idx} item={e} />)}
          </div>
        </Section>

        {/* ── EDUCATION ────────────────────────────────────────────── */}
        <Section id="education" num="05" title="Education" subtitle="My academic background and credentials.">
          <div className="space-y-8">
            {EDUCATION.map((e, idx) => <TimelineItem key={idx} item={e} />)}
          </div>
          {CERTIFICATIONS.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <h4 className="font-semibold text-base text-accent mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" /> Certifications
              </h4>
              <ul className="space-y-3 text-slate-300">
                {CERTIFICATIONS.map((c, i) => (
                  <li key={i} className="flex items-center justify-between flex-wrap gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <div>
                      <span className="font-medium text-white">{c.name}</span>
                      <span className="text-slate-400"> — {c.issuer}</span>
                    </div>
                    <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{c.date}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </Section>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <Section id="contact" num="06" title="Let's Connect" subtitle="I'm always excited to talk about new opportunities and collaborations.">
          <ContactForm addToast={addToast} />
        </Section>

        <Footer />
      </div>
    </>
  )
}
