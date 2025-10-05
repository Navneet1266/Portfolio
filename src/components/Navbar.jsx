import { useEffect, useState } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'
const links = [{id:'home',label:'Home'},{id:'about',label:'About'},{id:'skills',label:'Skills'},{id:'projects',label:'Projects'},{id:'experience',label:'Experience'},{id:'education',label:'Education'},{id:'contact',label:'Contact'}]
export default function Navbar({ onOpenSidebar, activeId }) {
  const [dark, setDark] = useState(true)
  useEffect(()=>{ const saved=localStorage.getItem('theme'); const isDark = saved ? saved==='dark' : true; setDark(isDark); document.documentElement.classList.toggle('dark', isDark)},[])
  const toggleTheme = ()=>{ const next=!dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('theme', next?'dark':'light') }
  const handleClick = (e,id)=>{ e.preventDefault(); smoothScrollToHash(id,600); history.replaceState(null,'',`#${id}`) }
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-surface/60 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-xl hover:bg-white/10" onClick={onOpenSidebar} aria-label="Open sidebar"><Menu className="w-5 h-5"/></button>
          <a href="#home" onClick={(e)=>handleClick(e,'home')} className="font-semibold text-lg">Navneet Kumar</a>
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l=>{ const active = activeId===l.id; return (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e)=>handleClick(e,l.id)} className={`opacity-90 transition px-2 py-1 rounded-md ${active ? 'text-glow shadow-glow' : 'hover:text-accent hover:opacity-100'}`}>{l.label}</a>
            </li>
          )})}
        </ul>
        <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-white/10" aria-label="Toggle theme">{dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}</button>
      </nav>
    </header>
  )
}
