import { useEffect, useState } from 'react'
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] || 'home')
  useEffect(()=>{
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-50% 0px -40% 0px', threshold: [0,0.25,0.5,0.75,1] })
    sections.forEach(s => obs.observe(s))
    return ()=>obs.disconnect()
  }, [ids.join(',')])
  return active
}
