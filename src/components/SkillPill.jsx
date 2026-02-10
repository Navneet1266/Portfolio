export default function SkillPill({ label }) {
  return (
    <span className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all duration-300 inline-block cursor-default">
      {label}
    </span>
  )
}
