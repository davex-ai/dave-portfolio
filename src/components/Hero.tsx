import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'

const roles = ['Software Engineer', 'Machine Learning Engineer', 'Systems Architect', 'Open Source Contributor']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [currentAvatar, setCurrentAvatar] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatar(prev => prev === 0 ? 1 : 0)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 40 : 80

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1800)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex(r => (r + 1) % roles.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxX = (mousePos.x - 0.5) * 20
  const parallaxY = (mousePos.y - 0.5) * 10

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div
        className="absolute w-[600px] h-[600px] rounded-full orb-1 pointer-events-none"
        style={{
          top: '10%',
          right: '5%',
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full orb-2 pointer-events-none"
        style={{
          bottom: '20%',
          left: '5%',
          transform: `translate(${-parallaxX * 0.3}px, ${-parallaxY * 0.3}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full orb-3 pointer-events-none"
        style={{
          top: '50%',
          left: '40%',
          transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
          transition: 'transform 0.3s ease',
        }}
      />

      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}px`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0.2 + Math.random() * 0.4,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          <div
            className="space-y-8"
            style={{ animation: 'fadeInLeft 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.2s' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/8">
              <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              <span className="font-mono text-xs text-ash tracking-widest uppercase">Available for work</span>
            </div>

            <div className="space-y-2">
              <p className="font-body text-sm text-ash tracking-[0.3em] uppercase">Welcome to my world</p>
              <h1 className="font-display text-7xl lg:text-9xl tracking-wide leading-none">
                Hi, I'm
                <br />
                <span className="text-gradient">Dave</span>
              </h1>
            </div>

            <div className="flex items-center gap-3 h-12">
              <div className="w-1 h-8 bg-white/20 rounded-full" />
              <span className="font-body text-xl lg:text-2xl text-silver font-light">
                {displayText}
                <span className="inline-block w-0.5 h-5 bg-white/70 ml-1 align-middle" style={{ animation: 'blink 1s ease infinite' }} />
              </span>
            </div>

            <p className="font-body text-ash text-base lg:text-lg leading-relaxed max-w-md">
              Building data-driven systems and ML-integrated software that solve complex problems at scale. Focused on model efficiency and system reliability. Precision-driven. Detail-obsessed.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('projects')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                View Projects
                <ArrowDown size={14} />
              </button>
              <a
                href="https://drive.google.com/file/d/1YSwtOWPSpYSvxUbZ4yhzsZOs6b28B2zV/view?usp=sharing"
                className="btn-outline px-8 py-3.5 rounded-full text-sm font-semibold"
                download
              >
                View Resume
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: Github, href: 'https://github.com/davex-ai' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: 'https://x.com/dayvex_ai' },
                { icon: Mail, href: '#contact' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full glass-card border border-white/6 flex items-center justify-center text-ash hover:text-pearl transition-all duration-300 hover:scale-110 hover:border-white/20"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="flex justify-center lg:justify-end"
            style={{ animation: 'fadeInRight 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.4s' }}
          >
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(150,150,150,0.08) 0%, transparent 70%)',
                  animation: 'orbPulse 5s ease-in-out infinite',
                }}
              />

              <div
                className="absolute w-24 h-24 rounded-2xl glass-card border border-white/8 flex flex-col items-center justify-center gap-1"
                style={{
                  top: '-20px',
                  left: '-40px',
                  animation: 'floatY 7s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              >
                <span className="font-display text-3xl text-pearl">4+</span>
                <span className="font-mono text-xs text-ash text-center leading-tight">Years<br />Exp</span>
              </div>

              <div
                className="absolute w-28 h-16 rounded-2xl glass-card border border-white/8 flex items-center gap-3 px-3"
                style={{
                  bottom: '60px',
                  right: '-50px',
                  animation: 'floatY 6s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs">✦</span>
                </div>
                <div>
                  <div className="font-display text-lg text-pearl leading-none">50+</div>
                  <div className="font-mono text-xs text-ash">Projects</div>
                </div>
              </div>

              <div
                className="absolute w-20 h-20 rounded-2xl glass-card border border-white/6 flex flex-col items-center justify-center"
                style={{
                  top: '40px',
                  right: '-30px',
                  animation: 'floatY 9s ease-in-out infinite',
                  animationDelay: '0.5s',
                }}
              >
                <span className="text-xl">⚡</span>
                <span className="font-mono text-xs text-ash mt-1">Fast</span>
              </div>

              <div className="avatar-container w-72 h-80 lg:w-80 lg:h-96 animate-float-avatar">
                <img
                  src={currentAvatar === 0 ? avatar1 : avatar2}
                  alt="Dave - Software Engineer"
                  className="w-full h-full object-cover object-top transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs text-ash tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
