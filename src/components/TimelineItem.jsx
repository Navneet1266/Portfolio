import { motion } from 'framer-motion'
export default function TimelineItem({ item }) {
  return (
    <motion.div initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}} className="relative pl-8 border-l border-white/10">
      <span className="absolute -left-2 top-1.5 w-3 h-3 rounded-full bg-accent shadow-glowSoft" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="font-semibold">{item.role || item.degree}</h3>
        <span className="text-sm text-slate-400">{item.period}</span>
      </div>
      <p className="text-slate-300">{item.company || item.school}{item.meta ? ` • ${item.meta}` : ''}</p>
      {item.location && <p className="text-slate-400 text-sm">{item.location}</p>}
      {item.bullets && <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">{item.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>}
    </motion.div>
  )
}
