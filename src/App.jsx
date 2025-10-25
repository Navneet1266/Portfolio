import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import TimelineItem from './components/TimelineItem'
import SkillPill from './components/SkillPill'
import ContactForm from './components/ContactForm'
import { PROFILE, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS } from './data'
import { motion } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'
import useActiveSection from './hooks/useActiveSection'

const GlobalStyles = () => (
  <style>{`
    .input { @apply w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/60; }
    .btn { @apply inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 transition border border-white/10; }
    .btn-secondary { @apply inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10; }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  `}</style>
)

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
  const activeId = useActiveSection(sectionIds)

  return (
    <div className="min-h-screen bg-surface text-slate-100 md:pl-24 relative z-0">
      <GlobalStyles />
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} activeId={activeId} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeId={activeId} />

      {/* ---------- HERO / HOME SECTION ---------- */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/40 via-surface to-surface" />
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 grid md:grid-cols-2 gap-10 items-center">

          {/* ---------- LEFT CONTENT ---------- */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
            >
              {PROFILE.name}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-glow to-accent">
                {PROFILE.title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-slate-300 max-w-xl"
            >
              {PROFILE.summary}
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn">View Projects</a>
              <a href="#contact" className="btn-secondary">Contact</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn bg-accent hover:bg-accent/80">Download Resume</a>
            </div>

            <div className="mt-10 flex items-center gap-2 text-slate-400 text-sm">
              <ArrowDownToLine className="w-4 h-4" />
              <span>Scroll to explore</span>
            </div>
          </div>

          {/* ---------- PROFILE IMAGE SECTION ---------- */}
         

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              {/* Glowing animated border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 blur-xl opacity-50 animate-spin-slow"></div>

              {/* Centered profile image */}
              <img
                src="/profile.jpg"
                alt="Navneet Kumar"
                className="
        relative z-10
        w-60 h-60 sm:w-68 sm:h-68 md:w-72 md:h-72
        rounded-full
        border-4 border-cyan-400
        object-cover
        object-[50%_2%]   /* <– This line adjusts vertical centering */
        shadow-[0_0_40px_rgba(56,189,248,0.5)]
        transition-transform duration-500 ease-in-out
        hover:scale-105 hover:shadow-[0_0_60px_rgba(56,189,248,0.7)]
      "
              />
            </div>

            {/* Name & Title */}
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-cyan-400">
              Navneet Kumar
            </h2>
            <p className="mt-2 text-slate-400 text-base sm:text-lg">
              Full-Stack Developer &nbsp;
            </p>
          </motion.div>


        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <Section id="about" title="About Me" subtitle="A quick snapshot of who I am and what I love building.">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3 text-slate-300">
            <p>I design and build full-stack applications with a focus on performance, clean code, and user-first experiences. I enjoy solving complex problems end-to-end — from database schema and API design to polished UI.</p>
            <p>Recently, I’ve worked on a production-grade video chat app and an LLM-powered chatbot with robust RAG pipelines.</p>
            <p>Outside of work, I keep sharpening my skills, explore new tech, and collaborate on impact-driven projects.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h4 className="font-semibold">Quick Info</h4>
            <ul className="mt-3 space-y-2 text-slate-200">
              <li><strong>Name:</strong> {PROFILE.name}</li>
              <li><strong>Location:</strong> {PROFILE.location}</li>
              <li><strong>Email:</strong> {PROFILE.email}</li>
              <li><strong>Phone:</strong> {PROFILE.phone}</li>
              <li><strong>Portfolio:</strong> This page 😉</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- SKILLS SECTION ---------- */}
      <Section id="skills" title="Skills" subtitle="Tools and technologies I use to ship quality software.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3"><h4 className="font-semibold">Frontend</h4><div className="flex flex-wrap gap-2">{SKILLS.frontend.map(s => <SkillPill key={s} label={s} />)}</div></div>
          <div className="space-y-3"><h4 className="font-semibold">Backend</h4><div className="flex flex-wrap gap-2">{SKILLS.backend.map(s => <SkillPill key={s} label={s} />)}</div></div>
          <div className="space-y-3"><h4 className="font-semibold">Languages</h4><div className="flex flex-wrap gap-2">{SKILLS.languages.map(s => <SkillPill key={s} label={s} />)}</div></div>
          <div className="space-y-3"><h4 className="font-semibold">Data / ML</h4><div className="flex flex-wrap gap-2">{SKILLS.data.map(s => <SkillPill key={s} label={s} />)}</div></div>
        </div>
      </Section>

      {/* ---------- PROJECTS SECTION ---------- */}
      <Section id="projects" title="Projects" subtitle="A selection of things I’ve built and shipped.">
        <div className="grid md:grid-cols-2 gap-6">{PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}</div>
      </Section>

      {/* ---------- EXPERIENCE SECTION ---------- */}
      <Section id="experience" title="Experience" subtitle="Where I’ve worked and what I contributed.">
        <div className="space-y-8">{EXPERIENCE.map((e, idx) => <TimelineItem key={idx} item={e} />)}</div>
      </Section>

      {/* ---------- EDUCATION SECTION ---------- */}
      <Section id="education" title="Education">
        <div className="space-y-8">{EDUCATION.map((e, idx) => <TimelineItem key={idx} item={e} />)}</div>
        <div className="mt-10">
          <h4 className="font-semibold">Certifications</h4>
          <ul className="mt-3 space-y-2 text-slate-300">
            {CERTIFICATIONS.map((c, i) => (
              <li key={i} className="flex items-center justify-between flex-wrap gap-2">
                <span>{c.name} — {c.issuer}</span>
                <span className="text-sm text-slate-400">{c.date} • {c.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- CONTACT SECTION ---------- */}
      <Section id="contact" title="Let’s Connect" subtitle="I’m always excited to talk about new opportunities and collaborations.">
        <ContactForm />
      </Section>

      {/* ---------- FOOTER ---------- */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind & Framer Motion.
        </div>
      </footer>
    </div>
  )
}
