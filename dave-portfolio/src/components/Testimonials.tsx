import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    text: "Dave's attention to system architecture is exceptional. He re-architected our entire data pipeline, reducing query times by 80%. He doesn't just write code — he solves problems.",
    name: 'Sarah Chen',
    role: 'CTO, Finstack Inc.',
    initials: 'SC',
  },
  {
    text: "Working with Dave was a game-changer for our startup. He built our MVP in 6 weeks, handled the AWS infra, and left us with documentation that actually made sense. Rare combination.",
    name: 'Marcus Webb',
    role: 'Founder, Launchpad',
    initials: 'MW',
  },
  {
    text: "Dave delivered an API platform that's been running in production for 18 months without a single outage. His code is clean, his tests are thorough, and his communication is top-tier.",
    name: 'Priya Nair',
    role: 'Engineering Lead, NovaTech',
    initials: 'PN',
  },
  {
    text: "He transformed a legacy monolith into a modern microservices architecture over 3 months. The migration was seamless — zero downtime, and our team learned a ton from reviewing his PRs.",
    name: 'Jordan Miles',
    role: 'VP Engineering, CloudServe',
    initials: 'JM',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 }
    )
    const elements = sectionRef.current?.querySelectorAll('.section-reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      goNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [active])

  const goTo = (index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 300)
  }

  const goPrev = () => goTo((active - 1 + testimonials.length) % testimonials.length)
  const goNext = () => goTo((active + 1) % testimonials.length)

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.5) 50%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">05 / Reviews</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 section-reveal">
          <div>
            <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">What they say</p>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
              <span className="text-pearl">Client</span>
              <br />
              <span className="text-gradient-animated">Reviews</span>
            </h2>
          </div>
        </div>

        <div className="section-reveal">
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {testimonials.map((t, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                className={`testimonial-card glass-card rounded-3xl p-8 border cursor-pointer transition-all duration-500 ${
                  i === active
                    ? 'border-white/20 bg-white/6 scale-[1.01]'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-6">
                  <Quote
                    size={24}
                    className={`flex-shrink-0 transition-colors duration-300 ${i === active ? 'text-silver' : 'text-iron'}`}
                    strokeWidth={1.5}
                  />
                </div>

                <p
                  className={`font-body text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                    i === active ? 'text-mist' : 'text-smoke'
                  }`}
                  style={{
                    opacity: animating && i === active ? 0 : 1,
                    transform: animating && i === active ? 'translateY(8px)' : 'translateY(0)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-sm transition-colors duration-300 ${
                      i === active ? 'bg-white/15 text-pearl' : 'bg-white/6 text-ash'
                    }`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className={`font-body font-semibold text-sm transition-colors ${i === active ? 'text-pearl' : 'text-mist'}`}>
                      {t.name}
                    </p>
                    <p className="font-mono text-xs text-ash">{t.role}</p>
                  </div>
                  {i === active && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 h-2 bg-white/60' : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full glass-card border border-white/8 flex items-center justify-center text-ash hover:text-pearl hover:border-white/20 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full glass-card border border-white/8 flex items-center justify-center text-ash hover:text-pearl hover:border-white/20 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
