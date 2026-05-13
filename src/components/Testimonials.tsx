import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Award } from 'lucide-react'

const certificates = [
  { title: 'GraphQL using Node.js', issuer: 'Educative', link: 'https://drive.google.com/file/d/1B8VpCZKQQh96kSQNrwSFcz9HaQPhVp0n/view?usp=sharing' },
  { title: 'Intro to Machine Learning', issuer: 'Kaggle', link: 'https://drive.google.com/file/d/17gk5ua7knjj9KaDmrT5GQFhtBG78Sob0/view?usp=sharing' },
  { title: 'Cloud Computing Fundamentals', issuer: 'Educative', link: 'https://drive.google.com/file/d/1vZBl0OENzh67yOHA8wunlxMf2SSQyLMH/view?usp=sharing' },
  { title: 'CS50', issuer: 'Harvard University', link: 'https://drive.google.com/file/d/1vZBl0OENzh67yOHA8wunlxMf2SSQyLMH/view?usp=sharing' },
  { title: 'Data Analysis with Python', issuer: 'IBM', link: 'https://drive.google.com/file/d/1nYlQwvkHODK8KrkobWcQMbttkgo1uKum/view?usp=sharing' },
  { title: 'Data Fundamentals', issuer: 'IBM', link: 'https://drive.google.com/file/d/1nYlQwvkHODK8KrkobWcQMbttkgo1uKum/view?usp=sharing' },
  { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM', link: 'https://drive.google.com/file/d/1nYlQwvkHODK8KrkobWcQMbttkgo1uKum/view?usp=sharing' },
  { title: 'MCP Fundamentals for Building Agents', issuer: 'Educative', link: 'https://drive.google.com/file/d/1_cezi54-Zr8tS2nTLpUXyr5Y-hLKjRnW/view?usp=sharing' },
  { title: 'Make Your Own Neural Network in Python', issuer: 'Educative', link: 'https://drive.google.com/file/d/1Ocmm85M1InwdWSxegUCDjhJodM9NUM1T/view?usp=sharing' },
  { title: 'Python', issuer: 'freeCodeCamp', link: 'https://drive.google.com/file/d/10nify51JjsMOWY1LV1FCGDffLxM578ya/view?usp=sharing' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', link: 'https://drive.google.com/file/d/10nify51JjsMOWY1LV1FCGDffLxM578ya/view?usp=sharing' },
  { title: 'Additional Certificate', issuer: '', link: 'https://drive.google.com/file/d/1Qm0zLZ-yo62gseK5n3RMBTu_p9YDOJiv/view?usp=drive_link' },
]

const PREVIEW_COUNT = 6

const issuerColors: Record<string, string> = {
  'IBM': 'text-blue-400',
  'Kaggle': 'text-cyan-400',
  'Harvard University': 'text-red-400',
  'Educative': 'text-purple-400',
  'freeCodeCamp': 'text-green-400',
}

export default function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.15 }
    )
    const elements = sectionRef.current?.querySelectorAll('.section-reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = showAll ? certificates : certificates.slice(0, PREVIEW_COUNT)

  return (
    <section id="certificates" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.5) 50%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">06 / Credentials</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 section-reveal">
          <div>
            <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">Verified learning</p>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
              <span className="text-pearl">My</span>
              <br />
              <span className="text-gradient-animated">Certificates</span>
            </h2>
          </div>
        </div>

        <div className="section-reveal">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {visible.map((cert, i) => (

              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/20 hover:bg-white/6 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <Award size={20} className="text-iron group-hover:text-silver transition-colors" strokeWidth={1.5} />
                  <ExternalLink size={14} className="text-iron group-hover:text-ash transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                <div>
                  <p className="font-body font-semibold text-sm text-mist group-hover:text-pearl transition-colors leading-snug mb-1">
                    {cert.title}
                  </p>
                  <p className={`font-mono text-xs ${issuerColors[cert.issuer] ?? 'text-ash'}`}>
                    {cert.issuer || '—'}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {!showAll && certificates.length > PREVIEW_COUNT && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="font-mono text-xs text-ash hover:text-pearl border border-white/10 hover:border-white/25 rounded-full px-6 py-3 transition-all duration-300"
              >
                Show all {certificates.length} certificates ↓
              </button>
            </div>
          )}

          {showAll && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(false)}
                className="font-mono text-xs text-ash hover:text-pearl border border-white/10 hover:border-white/25 rounded-full px-6 py-3 transition-all duration-300"
              >
                Show less ↑
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}