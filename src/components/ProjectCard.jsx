import { motion } from 'framer-motion'
export default function ProjectCard({ p }) {
  return (
    <motion.a href={p.link} target={p.link?.startsWith('#') ? undefined : '_blank'} rel={p.link?.startsWith('#') ? undefined : 'noreferrer'} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur shadow-glowSoft">
      <div className="aspect-video overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/></div>
      <div className="p-5"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{p.name}</h3><span className="text-xs text-slate-400">{p.year}</span></div><p className="mt-2 text-slate-300">{p.description}</p></div>
      <div className="px-5 pb-5 flex flex-wrap gap-2">{p.stack.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded-full bg-brand-500/20 border border-brand-500/30">{s}</span>))}</div>
    </motion.a>
  )
}
