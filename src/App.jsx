import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import TimelineItem from './components/TimelineItem'
import SkillPill from './components/SkillPill'
import ContactForm from './components/ContactForm'
import { PROFILE, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS, ACHIEVEMENTS } from './data'
import { motion } from 'framer-motion'
import {
  ArrowDownToLine, Github, Linkedin, Mail, Phone,
  Monitor, Server, Code2, BrainCircuit, Cloud,
  TrendingUp, Zap, Rocket, Target, Star
} from 'lucide-react'
import useActiveSection from './hooks/useActiveSection'

// ── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pauseMs = 2200) {
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = words[idx]
    if (!deleting && display === full) {
      const t = setTimeout(() => setDeleting(true), pauseMs)
      return () => clearTimeout(t)
    }
    if (deleting && display === '') {
      setDeleting(false)
      setIdx(i => (i + 1) % words.length)
      return
    }
    const speed = deleting ? deleteSpeed : typeSpeed
    const t = setTimeout(() => {
      setDisplay(deleting ? full.slice(0, display.length - 1) : full.slice(0, display.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [display, deleting, idx, words, typeSpeed, deleteSpeed, pauseMs])

  return display
}

// ── Skill category meta ──────────────────────────────────────────────────────
const skillCategories = [
  { key: 'frontend', label: 'Frontend', icon: Monitor, color: 'blue', span: '' },
  { key: 'backend',  label: 'Backend',  icon: Server,  color: 'green', span: '' },
  { key: 'languages', label: 'Languages', icon: Code2, color: 'yellow', span: '' },
  { key: 'data',     label: 'Data & ML', icon: BrainCircuit, color: 'purple', span: '' },
  { key: 'devops',   label: 'DevOps & Tools', icon: Cloud, color: 'orange', span: 'md:col-span-2 lg:col-span-2' },
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

const achievementIcons = [TrendingUp, Zap, Rocket, Target]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
  const activeId = useActiveSection(sectionIds)

  const roles = ['Full Stack Developer', 'React & Node.js Expert', 'Backend Architect', 'AI/ML Enthusiast']
  const displayRole = useTypewriter(roles)

  return (
    <div className="min-h-screen bg-surface text-slate-100 md:pl-24 relative z-0">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} activeId={activeId} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeId={activeId} />

      {/* ──────────── HERO ──────────── */}
      <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(79,70,229,0.35),transparent)]" />
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(6,182,212,0.12),transparent)]" />
        <div className="absolute -z-10 inset-0 bg-grid opacity-25" />

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Open to full-time opportunities
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I'm
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-brand-400 mt-2">
                {PROFILE.name}
              </span>
            </h1>

            {/* Typewriter */}
            <div className="mt-3 text-xl sm:text-2xl text-slate-300 font-semibold h-9 flex items-center">
              <span>{displayRole}</span>
              <span className="typewriter-cursor" />
            </div>

            <p className="mt-6 text-slate-400 max-w-xl leading-relaxed text-[15px]">
              {PROFILE.summary}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 transition-all duration-300 border border-white/10 font-medium shadow-lg hover:shadow-brand-500/30 hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 transition-all duration-300 border border-white/15 font-medium hover:scale-105"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent text-slate-900 font-semibold transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:scale-105"
              >
                <ArrowDownToLine className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-10 flex items-center gap-3">
              {[
                { href: PROFILE.github, icon: Github, label: 'GitHub' },
                { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' },
                { href: `tel:${PROFILE.phone}`, icon: Phone, label: 'Phone' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/12 hover:border-accent/50 hover:text-accent transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
              <span className="text-slate-500 text-sm ml-1">Let's connect</span>
            </div>
          </motion.div>

          {/* RIGHT — Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-accent to-brand-500 blur-2xl opacity-35 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-600/50 to-accent/50 blur-xl opacity-50"></div>
              <img
                src="/profile.jpg"
                alt="Navneet Kumar"
                className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-4 border-accent/60 object-cover object-[50%_2%] shadow-2xl animate-pulse-glow transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 w-full max-w-sm">
              {[
                { num: '1+', label: 'Yrs Exp' },
                { num: '10+', label: 'Projects' },
                { num: '8.02', label: 'CGPA' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
                  <div className="text-2xl font-extrabold text-accent group-hover:scale-110 inline-block transition-transform stat-number">{num}</div>
                  <div className="text-xs text-slate-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs">
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDownToLine className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ──────────── ACHIEVEMENTS METRICS BAR ──────────── */}
      <div className="relative py-14 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-brand-600/5 to-surface" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-10"
          >
            Key Impact & Achievements
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
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300 stat-number">
                    {a.value}
                  </div>
                  <div className="text-white font-semibold text-sm mt-1">{a.label}</div>
                  <div className="text-slate-500 text-xs mt-1 leading-tight">{a.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ──────────── ABOUT ──────────── */}
      <Section id="about" title="About Me" subtitle="A quick snapshot of who I am and what I love building.">
        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-4 text-slate-300"
          >
            <p className="text-base sm:text-lg leading-relaxed">
              I design and build full-stack applications with a focus on{' '}
              <span className="text-accent font-semibold">performance</span>,{' '}
              <span className="text-accent font-semibold">clean code</span>, and{' '}
              <span className="text-accent font-semibold">user-first experiences</span>. I thrive on solving complex problems end-to-end — from database schema and API design all the way to polished, responsive UIs.
            </p>
            <p className="leading-relaxed">
              Currently at <span className="text-white font-semibold">Globiva Services</span>, I architect scalable web frameworks and build critical enterprise modules including Incident Reporting, Asset Management, and Task Tracking systems that are used daily by teams.
            </p>
            <p className="leading-relaxed">
              I've shipped an enterprise <span className="text-white font-semibold">Email Management System for Tata Motors</span> processing 500+ emails daily, and built an <span className="text-white font-semibold">LLM-powered RAG chatbot</span> with 28% improved semantic accuracy. Passionate about AI, LLMs, and cloud-native architecture.
            </p>

            {/* What I'm currently using */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Currently working with</p>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'MySQL', 'Jenkins'].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-accent/8 border border-accent/20 text-accent/90">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-base text-accent mb-5 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Quick Info
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-200">
              {[
                { label: 'Name', val: PROFILE.name },
                { label: 'Role', val: 'Full Stack Developer' },
                { label: 'Location', val: PROFILE.location },
                { label: 'Email', val: PROFILE.email },
                { label: 'Phone', val: PROFILE.phone },
                { label: 'Education', val: 'B.Tech CSE, KIIT (8.02 CGPA)' },
                { label: 'Status', val: 'Open to Opportunities' },
              ].map(({ label, val }) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="text-accent/70 mt-0.5">▸</span>
                  <div>
                    <span className="text-slate-500">{label}: </span>
                    <span className={label === 'Status' ? 'text-green-400 font-medium' : 'text-white'}>{val}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ──────────── SKILLS ──────────── */}
      <Section id="skills" title="Technical Skills" subtitle="Tools and technologies I use to ship quality software.">
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

      {/* ──────────── PROJECTS ──────────── */}
      <Section id="projects" title="Featured Projects" subtitle="Selected work — real problems solved, real impact delivered.">
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>

        {/* GitHub CTA */}
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

      {/* ──────────── EXPERIENCE ──────────── */}
      <Section id="experience" title="Work Experience" subtitle="Where I've worked and the impact I've made.">
        <div className="space-y-12">
          {EXPERIENCE.map((e, idx) => <TimelineItem key={idx} item={e} />)}
        </div>
      </Section>

      {/* ──────────── EDUCATION ──────────── */}
      <Section id="education" title="Education" subtitle="My academic background and credentials.">
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
              <Star className="w-4 h-4" />
              Certifications
            </h4>
            <ul className="space-y-3 text-slate-300">
              {CERTIFICATIONS.map((c, i) => (
                <li key={i} className="flex items-center justify-between flex-wrap gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <div>
                    <span className="font-medium text-white">{c.name}</span>
                    <span className="text-slate-400 font-normal"> — {c.issuer}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{c.date}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </Section>

      {/* ──────────── CONTACT ──────────── */}
      <Section id="contact" title="Let's Connect" subtitle="I'm always excited to talk about new opportunities and collaborations.">
        <ContactForm />
      </Section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="py-12 border-t border-white/8 bg-gradient-to-t from-black/30 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-brand-400">
                {PROFILE.name}
              </div>
              <div className="text-slate-400 text-sm mt-1">{PROFILE.title} · Bengaluru, India</div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: PROFILE.github, icon: Github },
                { href: PROFILE.linkedin, icon: Linkedin },
                { href: `mailto:${PROFILE.email}`, icon: Mail },
              ].map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="p-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 hover:text-accent"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-xs">
            <span>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
            <span>Built with React · Tailwind CSS · Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
