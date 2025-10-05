// import { useMemo } from 'react'
// import { PROFILE } from '../data'
// export default function ContactForm(){
//   const mailto = useMemo(()=>{
//     const subject=encodeURIComponent('Portfolio Contact')
//     const body=encodeURIComponent('Hi Navneet,\n\nI saw your portfolio and would like to connect about…')
//     return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
//   },[])
//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       <form className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
//         <div className="grid sm:grid-cols-2 gap-4">
//           <input required placeholder="Navneet Kumar" className="input" />
//           <input required type="email" placeholder="navneetkumar1266@gmail.com" className="input" />
//         </div>
//         <input placeholder="Subject" className="input" />
//         <textarea placeholder="Message" rows={6} className="input" />
//         <div className="flex gap-3">
//           <a href={mailto} className="btn">Quick Email</a>
//           <a href={`tel:${PROFILE.phone}`} className="btn-secondary">Call</a>
//         </div>
//         {/* <p className="text-xs text-slate-400">This demo form uses mailto() & tel: links so you can contact instantly without backend keys.</p> */}
//       </form>
//       <div className="bg-gradient-to-br from-glow/20 to-accent/20 rounded-2xl p-6 border border-white/10">
//         <h4 className="font-semibold text-lg">Contact Details</h4>
//         <ul className="mt-4 space-y-2 text-slate-200">
//           <li><strong>Email:</strong> {PROFILE.email}</li>
//           <li><strong>Phone:</strong> {PROFILE.phone}</li>
//           <li><strong>Location:</strong> {PROFILE.location}</li>
//           <li><strong>GitHub:</strong> <a className="underline hover:text-accent" href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.github}</a></li>
//           <li><strong>LinkedIn:</strong> <a className="underline hover:text-accent" href={PROFILE.linkedin} target="_blank" rel="noreferrer">{PROFILE.linkedin}</a></li>
//         </ul>
//         <p className="mt-4 text-slate-300">Open to full‑time roles and exciting freelance opportunities.</p>
//       </div>
//     </div>
//   )
// }


// import { useMemo } from 'react'
// import { PROFILE } from '../data'
// import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

// export default function ContactForm() {
//   const mailto = useMemo(() => {
//     const subject = encodeURIComponent('Portfolio Contact')
//     const body = encodeURIComponent('Hi Navneet,\n\nI saw your portfolio and would like to connect about…')
//     return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
//   }, [])

//   return (
//     <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
//       {/* ---------- Contact Form ---------- */}
//       <form className="space-y-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
//         <h3 className="text-2xl font-semibold text-accent text-center mb-2">Let's Connect 💬</h3>
//         <p className="text-sm text-slate-400 text-center mb-4">
//           Fill out the form or use the quick contact options below.
//         </p>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <input required placeholder="Your Name" className="input focus:ring-2 focus:ring-accent" />
//           <input required type="email" placeholder="Your Email" className="input focus:ring-2 focus:ring-accent" />
//         </div>
//         <input placeholder="Subject" className="input focus:ring-2 focus:ring-accent" />
//         <textarea placeholder="Message" rows={6} className="input focus:ring-2 focus:ring-accent" />

//         <div className="flex gap-4 justify-center mt-4">
//           <a
//             href={mailto}
//             className="btn bg-accent hover:bg-accent/90 shadow-md hover:shadow-accent/30 transition-all duration-200"
//           >
//             ✉️ Quick Email
//           </a>
//           <a
//             href={`tel:${PROFILE.phone}`}
//             className="btn-secondary hover:bg-white/20 transition-all duration-200"
//           >
//             📞 Call
//           </a>
//         </div>

//         <p className="text-xs text-slate-400 text-center pt-2">
//           No backend required — uses mailto() and tel: links for instant contact.
//         </p>
//       </form>

//       {/* ---------- Contact Info Card ---------- */}
//       <div className="bg-gradient-to-br from-accent/10 via-slate-800/50 to-accent/5 rounded-2xl p-8 border border-white/10 hover:border-accent/40 transition-all duration-300 shadow-md">
//         <h4 className="font-semibold text-2xl mb-4 text-accent">Contact Details</h4>
//         <ul className="space-y-3 text-slate-200">
//           <li className="flex items-center gap-2"><Mail size={18} /> <strong>Email:</strong> {PROFILE.email}</li>
//           <li className="flex items-center gap-2"><Phone size={18} /> <strong>Phone:</strong> {PROFILE.phone}</li>
//           <li className="flex items-center gap-2"><MapPin size={18} /> <strong>Location:</strong> {PROFILE.location}</li>
//           <li className="flex items-center gap-2"><Github size={18} /> <strong>GitHub:</strong>
//             <a className="underline hover:text-accent transition-colors" href={PROFILE.github} target="_blank" rel="noreferrer">
//               {PROFILE.github}
//             </a>
//           </li>
//           <li className="flex items-center gap-2"><Linkedin size={18} /> <strong>LinkedIn:</strong>
//             <a className="underline hover:text-accent transition-colors" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
//               {PROFILE.linkedin}
//             </a>
//           </li>
//         </ul>

//         <p className="mt-5 text-slate-300 italic">
//           🚀 Open to <span className="text-accent font-semibold">full-time roles</span> and exciting freelance opportunities.
//         </p>
//       </div>
//     </div>
//   )
// }


import { useMemo } from 'react'
import { PROFILE } from '../data'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

export default function ContactForm() {
  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Portfolio Contact')
    const body = encodeURIComponent('Hi Navneet,\n\nI saw your portfolio and would like to connect about…')
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">

      {/* ---------- Contact Info Card ---------- */}
      <div className="bg-gradient-to-br from-accent/10 via-slate-800/50 to-accent/5 rounded-2xl p-8 border border-white/10 hover:border-accent/40 transition-all duration-300 shadow-md">
        <h4 className="font-semibold text-2xl mb-4 text-accent">Contact Details</h4>
        <ul className="space-y-3 text-slate-200">
          <li className="flex items-center gap-2"><Mail size={18} /> <strong>Email:</strong> {PROFILE.email}</li>
          <li className="flex items-center gap-2"><Phone size={18} /> <strong>Phone:</strong> {PROFILE.phone}</li>
          <li className="flex items-center gap-2"><MapPin size={18} /> <strong>Location:</strong> {PROFILE.location}</li>
          <li className="flex items-center gap-2"><Github size={18} /> <strong>GitHub:</strong>
            <a className="underline hover:text-accent transition-colors" href={PROFILE.github} target="_blank" rel="noreferrer">
              {PROFILE.github}
            </a>
          </li>
          <li className="flex items-center gap-2"><Linkedin size={18} /> <strong>LinkedIn:</strong>
            <a className="underline hover:text-accent transition-colors" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              {PROFILE.linkedin}
            </a>
          </li>
        </ul>

        <p className="mt-5 text-slate-300 italic">
          🚀 Open to <span className="text-accent font-semibold">full-time roles</span> and exciting freelance opportunities.
        </p>
      </div>
    </div>
  )
}
