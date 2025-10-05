import { motion } from 'framer-motion'
export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.6}} className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-glow to-accent bg-clip-text text-transparent">{title}</span>
        </motion.h2>
        {subtitle && <motion.p initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.05}} className="mt-2 text-slate-300 max-w-2xl">{subtitle}</motion.p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
