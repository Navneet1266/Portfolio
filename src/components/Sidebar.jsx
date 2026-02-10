import { useEffect } from 'react'
import { X, Home, User, Wrench, FolderGit2, BriefcaseBusiness, GraduationCap, Mail, Code2 } from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export default function Sidebar({ open, onClose, activeId }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const handleClick = (e, id) => {
    e.preventDefault()
    smoothScrollToHash(id, 600)
    history.replaceState(null, '', `#${id}`)
    onClose && onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-40 md:inset-y-0 md:left-0 md:w-20 ${
        open ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'
      }`}
    >
      {/* Mobile Overlay */}
      <div
        className={`md:hidden absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Sidebar"
        aria-hidden={!open}
        className={`absolute md:static top-0 left-0 h-full w-72 md:w-20 bg-surface/95 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 z-50 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center h-16 px-4 border-b border-white/5">
          <div className="flex items-center gap-2 md:hidden">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-brand-500">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Menu</span>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-brand-500">
              <Code2 className="w-5 h-5 text-white" />
            </div>
          </div>

          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className="p-3 flex flex-col gap-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {items.map(({ id, label, icon: Icon }) => {
            const active = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center md:flex-col gap-3 md:gap-1 px-4 py-3 md:py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-accent/10 text-accent border border-accent/30 shadow-lg shadow-accent/5'
                      : 'hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-accent' : ''}`} />
                  <span className="text-sm md:text-[10px] font-medium">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Footer (Mobile Only) */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <p className="text-xs text-slate-500 text-center">
            Navneet Kumar
          </p>
        </div>
      </aside>
    </div>
  )
}
