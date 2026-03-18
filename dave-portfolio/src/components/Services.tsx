import { useEffect, useRef } from 'react'
import { Code2, Globe, Smartphone, GitBranch, Shield, Cpu } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    desc: 'End-to-end web application development using modern frameworks and best practices for performance, scalability, and maintainability.',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    icon: Globe,
    title: 'Web Architecture',
    desc: 'Designing robust, scalable system architectures that handle real-world load with clean separation of concerns and fault tolerance.',
    tags: ['Microservices', 'REST', 'GraphQL'],
    featured: true,
  },
  {
    icon: Smartphone,
    title: 'API Design',
    desc: 'Building well-documented, versioned REST and GraphQL APIs with proper auth, rate limiting, and developer-friendly DX.',
    tags: ['OpenAPI', 'Auth', 'Caching'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    desc: 'Streamlined deployment pipelines, containerisation, and infrastructure as code to ship confidently and recover fast.',
    tags: ['Docker', 'K8s', 'GitHub Actions'],
  },
  {
    icon: Shield,
    title: 'Security Auditing',
    desc: 'Identifying vulnerabilities in authentication flows, data handling, and third-party integrations before they become incidents.',
    tags: ['OWASP', 'Pen Testing', 'JWT'],
  },
  {
    icon: Cpu,
    title: 'Performance Tuning',
    desc: 'Profiling and optimising slow systems — database queries, frontend renders, API latency — to deliver sub-100ms experiences.',
    tags: ['Profiling', 'Caching', 'CDN'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

    const elements = sectionRef.current?.querySelectorAll('.section-reveal, .section-reveal-left')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(20,20,20,0.4) 50%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">03 / Services</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 section-reveal">
          <div>
            <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">What I offer</p>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
              <span className="text-pearl">My</span>
              <br />
              <span className="text-gradient-animated">Services</span>
            </h2>
          </div>
          <p className="text-ash font-body text-sm leading-relaxed max-w-xs mt-6 lg:mt-0">
            Transforming ideas into scalable, efficient digital solutions — from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc, tags, featured }, i) => (
            <div
              key={title}
              className={`section-reveal service-card rounded-3xl p-8 border ${
                featured
                  ? 'glass-card-strong border-white/12 bg-gradient-to-br from-white/6 to-white/2'
                  : 'glass-card border-white/6'
              }`}
              style={{ transitionDelay: `${i * 0.08}s`, animationDelay: `${i * 0.1}s` }}
            >
              {featured && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/12 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  <span className="font-mono text-xs text-silver">Popular</span>
                </div>
              )}

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors">
                <Icon size={24} className="text-silver" strokeWidth={1.5} />
              </div>

              <h3 className="font-body font-semibold text-pearl text-lg mb-3">{title}</h3>
              <p className="font-body text-ash text-sm leading-relaxed mb-6">{desc}</p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-white/4 border border-white/6 font-mono text-xs text-smoke"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
