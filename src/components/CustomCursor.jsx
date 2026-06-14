import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let rafId

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const animate = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }

    const onDown = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(0.4)'
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)'
    }
    const onUp = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    const setHover = (active) => () => {
      if (active) ring.classList.add('cursor-hover')
      else ring.classList.remove('cursor-hover')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', setHover(true))
      el.addEventListener('mouseleave', setHover(false))
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
