import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'

const projects = [
  {
    title: 'Nexus API Platform',
    category: 'Backend Systems',
    desc: 'High-throughput REST & GraphQL gateway handling 10M+ daily requests with dynamic rate limiting, circuit breakers, and real-time telemetry.',
    image: avatar1,
    tags: ['Go', 'Redis', 'Postgres', 'K8s'],
    featured: true,
  },
  {
    title: 'Strata Dashboard',
    category: 'Web Application',
    desc: 'Real-time analytics platform with WebSocket-driven live updates, customisable widgets, and multi-tenant support.',
    image: avatar2,
    tags: ['React', 'TypeScript', 'WebSockets'],
  },
  {
    title: 'AuthForge',
    category: 'Developer Tool',
    desc: 'Drop-in auth SDK supporting OAuth 2.0, SAML, and magic links — used by 500+ developers in production.',
    image: avatar1,
    tags: ['Node.js', 'JWT', 'OAuth'],
  },
  {
    title: 'PulseML',
    category: 'AI/ML Integration',
    desc: 'Intelligent anomaly detection service for SaaS metrics, trained on time-series data with automated alerting pipelines.',
    image: avatar2,
    tags: ['Python', 'TensorFlow', 'AWS'],
    featured: true,
  },
  {
    title: 'Drift CLI',
    category: 'Open Source',
    desc: 'A developer tool for managing environment config drift across multi-environment deployments with semantic diffs.',
    image: avatar1,
    tags: ['Rust', 'CLI', 'YAML'],
  },
  {
    title: 'S-Roll Media',
    category: 'Full Stack App',
    desc: 'Content delivery platform with adaptive bitrate streaming, CDN integration, and creator monetisation tools.',
    image: avatar2,
    tags: ['Next.js', 'FFmpeg', 'CloudFront'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

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
    const elements = sectionRef.current?.querySelectorAll('.section-reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">04 / Projects</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 section-reveal">
          <div>
            <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">What I've built</p>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
              <span className="text-pearl">My</span>
              <br />
              <span className="text-gradient-animated">Projects</span>
            </h2>
          </div>
          <p className="text-ash font-body text-sm leading-relaxed max-w-xs mt-6 lg:mt-0">
            A selection of work that showcases my passion for building things that matter.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 section-reveal scrollbar-hidden overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-300 flex-shrink-0 ${
                filter === cat
                  ? 'bg-white/10 border border-white/20 text-pearl'
                  : 'border border-white/6 text-ash hover:border-white/15 hover:text-mist'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ title, category, desc, image, tags, featured }, i) => (
            <div
              key={title}
              className={`section-reveal project-card rounded-3xl overflow-hidden border border-white/6 ${
                featured ? 'md:col-span-1' : ''
              }`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="relative h-48 overflow-hidden bg-graphite">
                <img src={image} alt={title} className="w-full h-full object-cover object-top" />
                <div className="project-card-overlay">
                  <div className="flex gap-3">
                    <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/15 hover:bg-white/20 transition-colors">
                      <Github size={15} className="text-pearl" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/15 hover:bg-white/20 transition-colors">
                      <ExternalLink size={15} className="text-pearl" />
                    </button>
                  </div>
                </div>

                {featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                    <span className="font-mono text-xs text-silver">Featured</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ash tracking-wide">{category}</span>
                  <ArrowRight size={14} className="text-smoke" />
                </div>
                <h3 className="font-body font-semibold text-pearl text-base">{title}</h3>
                <p className="font-body text-ash text-xs leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/4 border border-white/6 font-mono text-xs text-smoke"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 section-reveal">
          <button className="btn-outline px-8 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            See All Projects
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
