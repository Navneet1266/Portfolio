export function smoothScrollToHash(hash, duration = 600) {
  const id = hash?.startsWith('#') ? hash.slice(1) : hash
  const target = document.getElementById(id)
  if (!target) return
  const start = window.scrollY || window.pageYOffset
  const end = target.getBoundingClientRect().top + start - 70
  const change = end - start
  const startTime = performance.now()
  const easeInOutQuad = t => (t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t)
  const animate = now => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutQuad(progress)
    window.scrollTo(0, start + change * eased)
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}
