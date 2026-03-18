import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="font-display text-4xl tracking-widest text-pearl mb-2">
              D<span className="text-ash">.</span>
            </div>
            <p className="font-mono text-xs text-smoke">Software Engineer · Builder · Creator</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Mail, href: '#contact' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 rounded-full glass-card border border-white/6 flex items-center justify-center text-ash hover:text-pearl hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <button
            onClick={scrollTop}
            className="w-12 h-12 rounded-full glass-card border border-white/8 flex items-center justify-center text-ash hover:text-pearl hover:border-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-smoke">
            © {new Date().getFullYear()} Dave. All rights reserved.
          </p>
          <p className="font-mono text-xs text-smoke">
            Built with React · TypeScript · Tailwind
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 100%)' }}
      />
    </footer>
  )
}
