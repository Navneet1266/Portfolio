import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data'
import {
  Mail, Phone, MapPin, Github, Linkedin, Send,
  MessageSquare, Copy, Check,
} from 'lucide-react'

function CopyButton({ value, onToast, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      onToast?.(`${label} copied!`, 'success')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      title={`Copy ${label}`}
      className={`ml-auto p-1.5 rounded-lg transition-all duration-200 ${
        copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/15 hover:text-accent hover:border-accent/30'
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function ContactForm({ addToast }) {
  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Portfolio Contact — Let's Connect")
    const body = encodeURIComponent('Hi Navneet,\n\nI saw your portfolio and would like to connect about...\n\n')
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }, [])

  const contactItems = [
    { icon: Mail,     label: 'Email',    value: PROFILE.email,    href: `mailto:${PROFILE.email}`, copyable: true },
    { icon: Phone,    label: 'Phone',    value: PROFILE.phone,    href: `tel:${PROFILE.phone}`,    copyable: true },
    { icon: MapPin,   label: 'Location', value: PROFILE.location, href: null,                      copyable: false },
    { icon: Github,   label: 'GitHub',   value: 'Navneet1266',    href: PROFILE.github,             copyable: false },
    { icon: Linkedin, label: 'LinkedIn', value: 'navneetkumar1266', href: PROFILE.linkedin,         copyable: false },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* Contact Info Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="holo-card bg-gradient-to-br from-accent/10 via-brand-600/5 to-transparent rounded-2xl p-8 border border-white/10 hover:border-transparent transition-all duration-300"
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

        <ul className="space-y-3">
          {contactItems.map(({ icon: Icon, label, value, href, copyable }) => (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors shrink-0">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                    <div className="text-slate-200 group-hover:text-accent transition-colors text-sm truncate">{value}</div>
                  </div>
                  {copyable && (
                    <CopyButton value={value} onToast={addToast} label={label} />
                  )}
                </a>
              ) : (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                    <div className="text-slate-200 text-sm">{value}</div>
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
        className="holo-card bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/10 hover:border-transparent transition-all duration-300 flex flex-col"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-brand-600/20 border border-brand-500/30">
            <Send className="w-6 h-6 text-brand-400" />
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

            {/* Copy row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PROFILE.email)
                  addToast?.('Email copied!', 'success')
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 text-slate-400 hover:text-accent text-sm transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
                Copy Email
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PROFILE.phone)
                  addToast?.('Phone copied!', 'success')
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 text-slate-400 hover:text-accent text-sm transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
                Copy Phone
              </button>
            </div>

            <div className="flex gap-4">
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
