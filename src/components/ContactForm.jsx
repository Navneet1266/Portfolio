import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data'
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Portfolio Contact - Let\'s Connect')
    const body = encodeURIComponent('Hi Navneet,\n\nI saw your portfolio and would like to connect about...\n\n')
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }, [])

  const contactItems = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: MapPin, label: 'Location', value: PROFILE.location, href: null },
    { icon: Github, label: 'GitHub', value: 'Navneet1266', href: PROFILE.github },
    { icon: Linkedin, label: 'LinkedIn', value: 'navneetkumar1266', href: PROFILE.linkedin },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Info Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-accent/10 via-brand-600/5 to-transparent rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-accent/20 border border-accent/30">
            <MessageSquare className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-xl text-white">Get in Touch</h4>
            <p className="text-slate-400 text-sm">I'd love to hear from you</p>
          </div>
        </div>

        <ul className="space-y-4">
          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                    <div className="text-slate-200 group-hover:text-accent transition-colors">{value}</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                    <div className="text-slate-200">{value}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-slate-400 text-sm leading-relaxed">
          Open to <span className="text-accent font-medium">full-time roles</span> and exciting freelance opportunities. Let's build something amazing together!
        </p>
      </motion.div>

      {/* Quick Contact Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 flex flex-col"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-brand-600/20 border border-brand-500/30">
            <Send className="w-6 h-6 text-brand-500" />
          </div>
          <div>
            <h4 className="font-semibold text-xl text-white">Quick Contact</h4>
            <p className="text-slate-400 text-sm">Reach out directly</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            <a
              href={mailto}
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent text-slate-900 font-semibold transition-all duration-300 shadow-lg hover:shadow-accent/25 hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5" />
              Send an Email
            </a>

            <a
              href={`tel:${PROFILE.phone}`}
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-accent/30 font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>

            <div className="flex gap-4 pt-4">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-slate-500 text-xs">
          Response time: Usually within 24 hours
        </p>
      </motion.div>
    </div>
  )
}
