export default function SkillPill({ label, category }) {
  const categoryStyles = {
    frontend: 'hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-300',
    backend: 'hover:border-green-400/60 hover:bg-green-500/10 hover:text-green-300',
    languages: 'hover:border-yellow-400/60 hover:bg-yellow-500/10 hover:text-yellow-300',
    data: 'hover:border-purple-400/60 hover:bg-purple-500/10 hover:text-purple-300',
    devops: 'hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-orange-300',
  }

  const hoverClass = category ? (categoryStyles[category] || 'hover:border-accent/50 hover:bg-accent/10 hover:text-accent') : 'hover:border-accent/50 hover:bg-accent/10 hover:text-accent'

  return (
    <span className={`px-3 py-1.5 rounded-lg text-sm bg-white/[0.04] border border-white/10 transition-all duration-300 inline-block cursor-default select-none text-slate-300 ${hoverClass}`}>
      {label}
    </span>
  )
}
