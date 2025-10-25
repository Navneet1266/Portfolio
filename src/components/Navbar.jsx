import { useEffect, useState, useRef } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'
const links = [{id:'home',label:'Home'},{id:'about',label:'About'},{id:'skills',label:'Skills'},{id:'projects',label:'Projects'},{id:'experience',label:'Experience'},{id:'education',label:'Education'},{id:'contact',label:'Contact'}]
export default function Navbar({ onOpenSidebar, activeId }) {
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)
  useEffect(()=>{ const saved=localStorage.getItem('theme'); const isDark = saved ? saved==='dark' : true; setDark(isDark); document.documentElement.classList.toggle('dark', isDark)},[])
  // shrink header and position indicator on scroll/resize/active change
  useEffect(()=>{
    const update = ()=>{
      const y = window.scrollY || window.pageYOffset
      setScrolled(y > 24)
      // auto-hide on scroll down, reveal on scroll up
      const delta = y - lastY.current
      if (y > 100 && delta > 8) setHidden(true)
      else if (delta < -8) setHidden(false)
      lastY.current = y
      if (!navRef.current || !indicatorRef.current) return
      const anchor = navRef.current.querySelector(`a[href="#${activeId}"]`)
      if (!anchor) { indicatorRef.current.style.opacity = '0'; return }
      const rect = anchor.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      const left = rect.left - navRect.left
      indicatorRef.current.style.width = `${rect.width}px`
      indicatorRef.current.style.transform = `translateX(${left}px)`
      indicatorRef.current.style.opacity = '1'
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, {passive:true})
    return ()=>{ window.removeEventListener('resize', update); window.removeEventListener('scroll', update) }
  },[activeId])
  const toggleTheme = ()=>{ const next=!dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('theme', next?'dark':'light') }
  const handleClick = (e,id)=>{ e.preventDefault(); smoothScrollToHash(id,600); history.replaceState(null,'',`#${id}`) }
  return (
    <header className={`sticky top-0 z-40 backdrop-blur bg-surface/60 border-b border-white/10 transition-all transform ${hidden ? '-translate-y-full' : 'translate-y-0'} ${scrolled ? 'h-14' : 'h-16'}`}>
      <nav ref={navRef} className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-3 rounded-xl hover:bg-white/10 touch-manipulation" onClick={onOpenSidebar} aria-label="Open sidebar"><Menu className="w-5 h-5"/></button>
          <a href="#home" onClick={(e)=>handleClick(e,'home')} className="font-semibold text-base sm:text-lg">Navneet Kumar</a>
        </div>
        <div className="hidden md:block relative">
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {links.map(l=>{ const active = activeId===l.id; return (
              <li key={l.id} className="relative">
                <a href={`#${l.id}`} onClick={(e)=>handleClick(e,l.id)} className={`opacity-90 transition px-2 py-1 rounded-md ${active ? 'text-glow shadow-glow' : 'hover:text-accent hover:opacity-100'}`}>{l.label}</a>
              </li>
            )})}
          </ul>
          {/* animated indicator */}
          <span ref={indicatorRef} className="absolute bottom-0 left-0 h-0.5 bg-accent rounded transition-all duration-300 opacity-0" style={{willChange:'transform,width,left'}} />
        </div>
  <button onClick={toggleTheme} className="p-3 rounded-xl hover:bg-white/10 touch-manipulation" aria-label="Toggle theme">{dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}</button>
      </nav>
    </header>
  )
}
