import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, Code2 } from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'

const links = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education' },
  { id: 'contact',    label: 'Contact' },
]

export default function Navbar({ onOpenSidebar, activeId }) {
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  let lastY = 0

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : true
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset
      setScrolled(y > 24)
      const delta = y - lastY
      if (y > 100 && delta > 8) setHidden(true)
      else if (delta < -8) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    smoothScrollToHash(id, 600)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl bg-surface/85 border-b border-white/5 transition-all duration-300 transform ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'h-14 shadow-lg shadow-black/20' : 'h-16'}`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between relative">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="#home"
            onClick={(e) => handleClick(e, 'home')}
            className="flex items-center gap-2 font-extrabold text-lg hover:text-accent transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-brand-500 shadow-md">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">Navneet</span>
            <span className="text-accent hidden sm:inline">Kumar</span>
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = activeId === l.id
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleClick(e, l.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-accent bg-accent/8'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-brand-500/20 border border-accent/30 text-accent text-sm font-semibold hover:from-accent/30 hover:to-brand-500/30 transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation"
            aria-label="Toggle theme"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

      </nav>
    </header>
  )
}
