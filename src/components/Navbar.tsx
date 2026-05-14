import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-nav-slide ${
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home') }}
            className="font-display text-2xl tracking-widest text-pearl hover:text-white transition-colors"
          >
            D<span className="text-ash">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`nav-link font-body text-sm tracking-wide transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-pearl'
                      : 'text-ash hover:text-mist'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Hire Me
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-mist hover:text-pearl transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <ul className="px-6 pb-6 pt-2 space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="block w-full text-left text-mist hover:text-pearl font-body text-sm tracking-wide py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary w-full px-6 py-3 rounded-full text-sm font-semibold mt-2"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
