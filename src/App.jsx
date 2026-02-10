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
import { ArrowDownToLine, Github, Linkedin, Mail, Phone } from 'lucide-react'
import useActiveSection from './hooks/useActiveSection'

const GlobalStyles = () => (
  <style>{`
    .input { @apply w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all duration-300; }
    .btn { @apply inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 transition-all duration-300 border border-white/10 font-medium shadow-lg hover:shadow-brand-500/25 hover:scale-105; }
    .btn-secondary { @apply inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 font-medium hover:scale-105; }
    .btn-accent { @apply inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent text-slate-900 font-semibold transition-all duration-300 shadow-lg hover:shadow-accent/25 hover:scale-105; }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
    @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.4); } 50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); } }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
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
      <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/40 via-surface to-surface" />
        <div className="absolute -z-10 inset-0 bg-grid opacity-30" />

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* ---------- LEFT CONTENT ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              Available for opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I'm
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-brand-500 mt-2">
                {PROFILE.name}
              </span>
            </h1>

            <p className="mt-2 text-xl sm:text-2xl text-slate-300 font-medium">
              {PROFILE.title}
            </p>

            <p className="mt-6 text-slate-400 max-w-xl leading-relaxed">
              {PROFILE.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="btn">View Projects</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
              <a href="/Navneet_Full_Stack_Developer.pdf" target="_blank" rel="noreferrer" className="btn-accent">
                <ArrowDownToLine className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center gap-4">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
              <a href={`tel:${PROFILE.phone}`} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-110">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* ---------- PROFILE IMAGE SECTION ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 animate-float">
              {/* Glowing animated border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-accent to-brand-500 blur-2xl opacity-40 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-600/50 to-accent/50 blur-xl opacity-60"></div>

              {/* Centered profile image */}
              <img
                src="/profile.jpg"
                alt="Navneet Kumar"
                className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-4 border-accent/60 object-cover object-[50%_2%] shadow-2xl animate-pulse-glow transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>

            {/* Stats Cards */}
            <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-sm">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-accent">1+</div>
                <div className="text-xs text-slate-400 mt-1">Years Exp</div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-accent">10+</div>
                <div className="text-xs text-slate-400 mt-1">Projects</div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-accent">8.02</div>
                <div className="text-xs text-slate-400 mt-1">CGPA</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDownToLine className="w-5 h-5" />
          </motion.div>
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <Section id="about" title="About Me" subtitle="A quick snapshot of who I am and what I love building.">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4 text-slate-300"
          >
            <p className="text-lg leading-relaxed">
              I design and build full-stack applications with a focus on <span className="text-accent font-medium">performance</span>, <span className="text-accent font-medium">clean code</span>, and <span className="text-accent font-medium">user-first experiences</span>. I enjoy solving complex problems end-to-end from database schema and API design to polished UI.
            </p>
            <p className="leading-relaxed">
              Currently working at <span className="text-white font-medium">Globiva Services</span> where I architect scalable web frameworks and build key modules including Incident Reporting, Asset Management, and Task Tracking systems.
            </p>
            <p className="leading-relaxed">
              I've also built an enterprise Email Management System for <span className="text-white font-medium">Tata Motors</span> and an LLM-powered chatbot using RAG pipelines. Passionate about AI, LLMs, and cloud computing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-lg text-accent mb-4">Quick Info</h4>
            <ul className="space-y-3 text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-accent">&#9656;</span>
                <div><strong className="text-white">Name:</strong> {PROFILE.name}</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">&#9656;</span>
                <div><strong className="text-white">Location:</strong> {PROFILE.location}</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">&#9656;</span>
                <div><strong className="text-white">Email:</strong> {PROFILE.email}</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">&#9656;</span>
                <div><strong className="text-white">Phone:</strong> {PROFILE.phone}</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">&#9656;</span>
                <div><strong className="text-white">Education:</strong> B.Tech CSE, KIIT</div>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ---------- SKILLS SECTION ---------- */}
      <Section id="skills" title="Technical Skills" subtitle="Tools and technologies I use to ship quality software.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.frontend.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.backend.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.languages.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Data & ML
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.data.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 md:col-span-2 lg:col-span-2"
          >
            <h4 className="font-semibold text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              DevOps & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.devops.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ---------- PROJECTS SECTION ---------- */}
      <Section id="projects" title="Featured Projects" subtitle="A selection of things I've built and shipped.">
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
      </Section>

      {/* ---------- EXPERIENCE SECTION ---------- */}
      <Section id="experience" title="Work Experience" subtitle="Where I've worked and what I contributed.">
        <div className="space-y-10">
          {EXPERIENCE.map((e, idx) => <TimelineItem key={idx} item={e} />)}
        </div>
      </Section>

      {/* ---------- EDUCATION SECTION ---------- */}
      <Section id="education" title="Education" subtitle="My academic background.">
        <div className="space-y-8">
          {EDUCATION.map((e, idx) => <TimelineItem key={idx} item={e} />)}
        </div>

        {CERTIFICATIONS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6"
          >
            <h4 className="font-semibold text-lg text-accent mb-4">Certifications</h4>
            <ul className="space-y-3 text-slate-300">
              {CERTIFICATIONS.map((c, i) => (
                <li key={i} className="flex items-center justify-between flex-wrap gap-2 py-2 border-b border-white/5 last:border-0">
                  <span className="font-medium text-white">{c.name} <span className="text-slate-400 font-normal">- {c.issuer}</span></span>
                  <span className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full">{c.date}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </Section>

      {/* ---------- CONTACT SECTION ---------- */}
      <Section id="contact" title="Let's Connect" subtitle="I'm always excited to talk about new opportunities and collaborations.">
        <ContactForm />
      </Section>

      {/* ---------- FOOTER ---------- */}
      <footer className="py-12 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-accent">{PROFILE.name}</div>
              <div className="text-slate-400 text-sm mt-1">{PROFILE.title}</div>
            </div>

            <div className="flex items-center gap-4">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-slate-400 hover:text-accent" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-accent" />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-slate-400 hover:text-accent" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind CSS & Framer Motion.
          </div>
        </div>
      </footer>
    </div>
  )
}
