import { useEffect } from 'react'
import { X, Home, User, Wrench, FolderGit2, BriefcaseBusiness, GraduationCap, Mail } from 'lucide-react'
import { smoothScrollToHash } from '../utils/smoothScroll'
const items = [{id:'home',label:'Home',icon:Home},{id:'about',label:'About',icon:User},{id:'skills',label:'Skills',icon:Wrench},{id:'projects',label:'Projects',icon:FolderGit2},{id:'experience',label:'Experience',icon:BriefcaseBusiness},{id:'education',label:'Education',icon:GraduationCap},{id:'contact',label:'Contact',icon:Mail}]
export default function Sidebar({ open, onClose, activeId }) {
  useEffect(()=>{ document.body.style.overflow = open ? 'hidden' : '' },[open])
  const handleClick = (e,id)=>{ e.preventDefault(); smoothScrollToHash(id,600); history.replaceState(null,'',`#${id}`); onClose && onClose() }
  return (
    <div className={`fixed inset-y-0 left-0 z-40 md:w-24 ${open ? '' : 'pointer-events-none md:pointer-events-auto'}`}>
      <div className={`md:hidden absolute inset-0 bg-black/60 transition ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute md:static top-0 left-0 h-full w-72 md:w-24 bg-surface/95 backdrop-blur border-r border-white/10 transition-transform ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between md:justify-center h-16 px-4 border-b border-white/10">
          <span className="font-semibold hidden md:block">Menu</span>
          <button className="md:hidden p-2 rounded-xl hover:bg-white/10" onClick={onClose}><X/></button>
        </div>
        <ul className="p-4 flex md:flex-col gap-3 md:gap-4">
          {items.map(({id,label,icon:Icon})=>{ const active = activeId===id; return (
            <li key={id}>
              <a href={`#${id}`} onClick={(e)=>handleClick(e,id)} className={`group flex items-center md:flex-col gap-3 p-3 rounded-xl border border-white/5 transition ${active ? 'text-glow shadow-glow' : 'hover:bg-white/5 hover:border-white/10 hover:text-accent'}`}>
                <Icon className="w-5 h-5 shrink-0"/><span className="md:text-xs">{label}</span>
              </a>
            </li>
          )})}
        </ul>
      </aside>
    </div>
  )
}
