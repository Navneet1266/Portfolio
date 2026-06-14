import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }
    let W = 0, H = 0

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const N = Math.min(60, Math.floor(window.innerWidth / 22))
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
    }))
    const LINK = 125, MLINK = 170

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N; i++) {
        const p = dots[i]
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < MLINK && md > 0) {
          const f = ((MLINK - md) / MLINK) * 0.14
          p.vx += (mdx / md) * f; p.vy += (mdy / md) * f
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(168,85,247,${(1 - md / MLINK) * 0.4})`
          ctx.lineWidth = 0.7; ctx.stroke()
        }
        for (let j = i + 1; j < N; j++) {
          const dx = p.x - dots[j].x, dy = p.y - dots[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / LINK) * 0.2})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
        p.vx *= 0.994; p.vy *= 0.994
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167,139,250,0.5)'; ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.5 }} aria-hidden="true" />
  )
}
