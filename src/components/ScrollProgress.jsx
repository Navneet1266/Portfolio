import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setPct(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 150 }} aria-hidden="true">
      <div
        style={{
          width: `${pct}%`,
          height: '2px',
          background: 'linear-gradient(90deg, #7c3aed, #a855f7, #d946ef, #f0abfc)',
          boxShadow: '0 0 12px rgba(168,85,247,0.8), 0 0 28px rgba(217,70,239,0.4)',
          transition: 'width 80ms linear',
        }}
      />
    </div>
  )
}
