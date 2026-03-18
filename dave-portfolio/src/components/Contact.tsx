import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Send, Sparkles } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.section-reveal, .section-reveal-left, .section-reveal-right')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(80,80,80,0.06) 0%, transparent 70%)',
          animation: 'orbPulse 7s ease-in-out infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">06 / Contact</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10 section-reveal-left">
            <div>
              <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">Get in touch</p>
              <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
                <span className="text-pearl">Let's Build</span>
                <br />
                <span className="text-gradient-animated">Something</span>
                <br />
                <span className="text-pearl">Amazing</span>
              </h2>
            </div>

            <p className="font-body text-ash text-base leading-relaxed max-w-sm">
              Have a project in mind? Want to discuss a technical challenge? Or just want to say hi? My inbox is always open.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'dave@engineer.dev' },
                { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-silver" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-ash mb-0.5">{label}</p>
                    <p className="font-body text-sm text-pearl">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 p-4 rounded-2xl glass-card border border-white/6">
              <div className="flex -space-x-2">
                {['SC', 'MW', 'PN'].map((init) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-body text-xs text-ash"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body font-semibold text-pearl text-sm">12+ happy clients</p>
                <p className="font-mono text-xs text-ash">Worldwide</p>
              </div>
            </div>
          </div>

          <div className="section-reveal-right">
            {sent ? (
              <div className="glass-card border border-white/8 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/8 flex items-center justify-center mx-auto">
                  <Sparkles size={28} className="text-silver" />
                </div>
                <h3 className="font-display text-3xl text-pearl tracking-wide">Message Sent!</h3>
                <p className="font-body text-ash text-sm">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                  className="btn-outline px-6 py-2.5 rounded-full text-xs font-semibold mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card border border-white/8 rounded-3xl p-8 space-y-5"
              >
                <div>
                  <label className="font-mono text-xs text-ash tracking-wide block mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    className="contact-input w-full rounded-xl px-4 py-3 text-sm font-body"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-ash tracking-wide block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    className="contact-input w-full rounded-xl px-4 py-3 text-sm font-body"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-ash tracking-wide block mb-2">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    className="contact-input w-full rounded-xl px-4 py-3 text-sm font-body resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border border-graphite/40 border-t-graphite rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
