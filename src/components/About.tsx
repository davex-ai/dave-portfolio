import { useEffect, useRef } from 'react'
import { Brain, Cpu, CheckCircle2, Network, Layers } from 'lucide-react'
import avatar2 from '../assets/avatar2.png'

const skills = [
  'TypeScript', 'React', 'Node.js', 'Java', 'Python', 'MongoDB', 'AWS', 'Azure', 'MySQL',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'C', 'Pandas/NumPy', 'Scikit-learn', 'Firebase',
  'React-Native', 'WebSockets', 'CI/CD', 'System Design', 'Distributed Systems', 'Flutter', 'React Native',
]


const highlights = [
  { icon: Brain, label: 'ML Operations', desc: 'End-to-end model lifecycle: Training, validation, and explainability' },
  { icon: Network, label: 'Distributed Systems', desc: 'High-throughput backends, fault tolerance, and scalable infrastructure' },
  { icon: Cpu, label: 'Optimization & Latency', desc: 'Low-latency inference, model quantization, and memory-efficient code' },
]


export default function About() {
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
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.section-reveal, .section-reveal-left, .section-reveal-right')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-20 section-reveal">
          <span className="font-mono text-xs text-ash tracking-widest uppercase">02 / About</span>
          <div className="flex-1 h-px section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 section-reveal-left">
            <div>
              <p className="font-mono text-xs text-ash tracking-widest uppercase mb-3">Who I am</p>
              <h2 className="font-display text-5xl lg:text-7xl tracking-wide">
                <span className="text-gradient-animated">About</span>
                <br />
                <span className="text-pearl">Me</span>
              </h2>
            </div>

            <p className="font-body text-ash leading-relaxed text-base">
              I'm Dave — a software engineer focused on building production-grade ML systems and scalable data infrastructure. My work spans the lifecycle of intelligent software, from optimizing high-throughput backends to deploying performant deep learning models in distributed environments.
            </p>

            <p className="font-body text-ash leading-relaxed text-base">
              I care deeply about the intersection of system design and algorithmic efficiency: building robust pipelines, ensuring model explainability, and architecting systems that handle data at scale. I thrive where technical precision meets the complexity of machine learning operations.
            </p>

            <div className="space-y-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-white/6 group transition-all duration-300 hover:border-white/12">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <Icon size={18} className="text-silver" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-pearl text-sm mb-1">{label}</p>
                    <p className="font-body text-ash text-xs leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-white/20 flex-shrink-0 mt-0.5 ml-auto group-hover:text-white/40 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 section-reveal-right">
            <div className="relative flex justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(150,150,150,0.08) 0%, transparent 70%)',
                    animation: 'orbPulse 5s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-white/8 animate-rotate-slow"
                  style={{ margin: '-12px' }}
                >
                  {[0, 90, 180, 270].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-2 h-2 rounded-full bg-white/20"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${deg}deg) translateX(calc(50% + 60px)) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>

                <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.9)' }}>
                  <img src={avatar2} alt="Dave" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-ash tracking-widest uppercase mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1.5 rounded-full border border-white/8 font-mono text-xs text-ash cursor-default"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '10+', label: 'Open Source Contributions' },
                { num: '50+', label: 'Projects Shipped' },
                { num: '12+', label: 'Clients Served' },
              ].map(({ num, label }) => (
                <div key={label} className="stat-card text-center p-4 rounded-2xl glass-card border border-white/6">
                  <div className="font-display text-4xl text-pearl">{num}</div>
                  <div className="font-mono text-xs text-ash mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
