import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, ChevronRight, Github, Linkedin, Mail,
  Download, Hash, Phone, Briefcase, GraduationCap,
  Code2, User, Layers,
} from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'
import { PROFILE } from '../data'

const NAV_COMMANDS = [
  { id: 'home',       label: 'Home',       group: 'Navigate', icon: Hash,          action: 'nav',    target: 'home' },
  { id: 'about',      label: 'About Me',   group: 'Navigate', icon: User,          action: 'nav',    target: 'about' },
  { id: 'skills',     label: 'Skills',     group: 'Navigate', icon: Code2,         action: 'nav',    target: 'skills' },
  { id: 'projects',   label: 'Projects',   group: 'Navigate', icon: Layers,        action: 'nav',    target: 'projects' },
  { id: 'experience', label: 'Experience', group: 'Navigate', icon: Briefcase,     action: 'nav',    target: 'experience' },
  { id: 'education',  label: 'Education',  group: 'Navigate', icon: GraduationCap, action: 'nav',    target: 'education' },
  { id: 'contact',    label: 'Contact',    group: 'Navigate', icon: Mail,          action: 'nav',    target: 'contact' },
]

const ACTION_COMMANDS = [
  { id: 'github',   label: 'Open GitHub',         group: 'Links',   icon: Github,   action: 'open', target: PROFILE.github },
  { id: 'linkedin', label: 'Open LinkedIn',        group: 'Links',   icon: Linkedin, action: 'open', target: PROFILE.linkedin },
  { id: 'resume',   label: 'Download Resume',      group: 'Links',   icon: Download, action: 'open', target: '/Navneet_Full_Stack_Developer.pdf' },
  { id: 'email',    label: 'Copy Email Address',   group: 'Actions', icon: Mail,     action: 'copy', target: PROFILE.email },
  { id: 'phone',    label: 'Copy Phone Number',    group: 'Actions', icon: Phone,    action: 'copy', target: PROFILE.phone },
]

const ALL_COMMANDS = [...NAV_COMMANDS, ...ACTION_COMMANDS]

export default function CommandPalette({ open, onClose, onToast }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = ALL_COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  )

  const groups = [...new Set(filtered.map(c => c.group))]

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  const run = (cmd) => {
    if (cmd.action === 'nav') {
      smoothScrollToHash(cmd.target, 600)
      history.replaceState(null, '', `#${cmd.target}`)
    } else if (cmd.action === 'open') {
      window.open(cmd.target, '_blank')
    } else if (cmd.action === 'copy') {
      navigator.clipboard.writeText(cmd.target).then(() => {
        onToast?.(`${cmd.id === 'email' ? 'Email' : 'Phone'} copied!`, 'success')
      })
    }
    onClose()
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) run(filtered[selected])
    if (e.key === 'Escape') onClose()
  }

  // Build flat indexed list for keyboard nav
  let flatIdx = 0

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            style={{ zIndex: 490 }}
          />

          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-[12%] left-1/2 -translate-x-1/2 w-full max-w-[520px] px-4"
            style={{ zIndex: 500 }}
          >
            <div
              className="bg-[#0a0f1a]/95 backdrop-blur-xl border border-white/12 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.25), 0 30px 80px rgba(0,0,0,0.8)' }}
            >
              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                <Search className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Search commands, navigate, copy..."
                  className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 outline-none text-sm font-sans"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto py-1.5">
                {filtered.length === 0 ? (
                  <div className="px-4 py-10 text-center text-slate-600 text-sm">
                    No commands match <span className="text-slate-400">"{query}"</span>
                  </div>
                ) : (
                  groups.map(group => {
                    const items = filtered.filter(c => c.group === group)
                    return (
                      <div key={group}>
                        <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                          {group}
                        </div>
                        {items.map(cmd => {
                          const idx = flatIdx++
                          const Icon = cmd.icon
                          const isSelected = selected === idx
                          return (
                            <button
                              key={cmd.id}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={() => run(cmd)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-100 ${
                                isSelected
                                  ? 'bg-accent/10'
                                  : 'hover:bg-white/4'
                              }`}
                            >
                              <span className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                                isSelected
                                  ? 'bg-accent/20 text-accent'
                                  : 'bg-white/5 text-slate-500'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className={`flex-1 text-sm font-medium transition-colors ${
                                isSelected ? 'text-white' : 'text-slate-400'
                              }`}>
                                {cmd.label}
                              </span>
                              {isSelected && (
                                <ChevronRight className="w-3.5 h-3.5 text-accent/60 shrink-0" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/8 font-mono border border-white/10">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/8 font-mono border border-white/10">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/8 font-mono border border-white/10">Esc</kbd>
                    close
                  </span>
                </div>
                <span className="text-[10px] text-slate-700 font-mono">Ctrl+K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
