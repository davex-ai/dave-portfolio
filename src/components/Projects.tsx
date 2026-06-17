import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight, ChevronDown } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Infra', 'Backend', 'Mobile', 'AI / ML', 'Research', 'Quant'] as const
type Category = typeof CATEGORIES[number]

interface Project {
  title: string
  subtitle: string
  category: Exclude<Category, 'All'>
  desc: string
  tags: string[]
  github: string
  live?: string
  featured?: boolean
  gradient: string
  pattern: 'grid' | 'dots' | 'hexagons' | 'circuit' | 'waves' | 'bars'
}

// ─── Real Project Data ────────────────────────────────────────────────────────
const projects: Project[] = [
  // ── Infra ──────────────────────────────────────────────────────────────────
  {
    title: 'Orbit',
    subtitle: 'Java Job Scheduler & Automation Engine',
    category: 'Infra',
    desc: 'Self-contained automation platform with thread-pooled execution, DAG orchestration, priority queuing, and retry logic — a lightweight alternative to cron/Airflow deployable via a shaded JAR. Ships a built-in REST API and web dashboard served directly from the Java process.',
    tags: ['Java 20', 'Maven', 'DAG', 'REST API', 'JDK HttpServer'],
    github: 'https://github.com/davex-ai/Orbit',
    featured: true,
    gradient: 'from-[#0f1923] via-[#0a2a1f] to-[#0d1f2d]',
    pattern: 'grid',
  },
  {
    title: 'Chronicle',
    subtitle: 'Cross-Platform Dev Journal CLI',
    category: 'Infra',
    desc: 'Portable Bash CLI that logs timestamped developer notes from any terminal — Linux, macOS, or Windows Git Bash. Auto-creates a Markdown dev log, supports custom messages and history lookups, and installs in one line via a shaded shell script.',
    tags: ['Bash', 'CLI', 'Markdown', 'Cross-Platform'],
    github: 'https://github.com/davex-ai/Chronicle',
    gradient: 'from-[#0d1a12] via-[#0a241c] to-[#0d2620]',
    pattern: 'grid',
  },
  {
    title: 'Decouple',
    subtitle: 'Cloud Vendor Lock-In Analyzer',
    category: 'Infra',
    desc: "FastAPI service that scans any GitHub repo's dependencies and imports to fingerprint AWS/GCP/Firebase/Azure usage, then scores how hard a migration would be — from S3-easy to DynamoDB-and-Lambda-hard — with a full per-service breakdown.",
    tags: ['Python', 'FastAPI', 'Static Analysis', 'Cloud Architecture'],
    github: 'https://github.com/davex-ai/Decouple',
    gradient: 'from-[#1a1206] via-[#1a160a] to-[#0d1f1a]',
    pattern: 'grid',
  },
  {
    title: 'Dirigent',
    subtitle: 'Real-Time AI File Organizer',
    category: 'Infra',
    desc: 'Watches your filesystem and sorts incoming files automatically — rule-based classification first, TF-IDF semantic tagging as a fallback for anything unrecognized, plus SHA-256 duplicate detection and a persistent activity log.',
    tags: ['Python', 'Watchdog', 'scikit-learn', 'Automation'],
    github: 'https://github.com/davex-ai/dirigent',
    gradient: 'from-[#0f1a0d] via-[#0a2014] to-[#0d231a]',
    pattern: 'grid',
  },

  // ── Backend ────────────────────────────────────────────────────────────────
  {
    title: 'Trustlyx',
    subtitle: 'Modular Multi-Tenant Auth SDK',
    category: 'Backend',
    desc: 'Framework-agnostic auth SDK (email/password, magic-link, Google OAuth) published to npm with tenant-scoped DB isolation on every query. bcrypt hashing, SHA-256 token storage, brute-force counters, and a clean adapter pattern for any email provider or cache backend.',
    tags: ['TypeScript', 'Node.js', 'JWT', 'bcrypt', 'Redis', 'OAuth 2.0'],
    github: 'https://github.com/davex-ai/trustlyx',
    gradient: 'from-[#1a0f23] via-[#1a1230] to-[#0d0d1f]',
    pattern: 'dots',
  },
  {
    title: 'DeltaForge',
    subtitle: 'Zero-Knowledge Encrypted Password Vault',
    category: 'Backend',
    desc: 'Pluggable Java library for AES-256-GCM encrypted credential storage with PBKDF2-HMAC-SHA256 key derivation, random per-vault salts/IVs, and a builder-pattern API designed to drop into desktop apps, CLIs, or microservices that need local secrets management.',
    tags: ['Java', 'AES-GCM', 'PBKDF2', 'Cryptography'],
    github: 'https://github.com/davex-ai/DeltaForge',
    gradient: 'from-[#1a0f1c] via-[#190d28] to-[#0d0d1f]',
    pattern: 'dots',
  },
  {
    title: 'Merq',
    subtitle: 'API Gateway for LLM Usage Billing',
    category: 'Backend',
    desc: 'Sits between your app and providers like OpenAI or Anthropic to track tokens and cost per API key, enforce budgets with Redis-backed rate limiting, and export usage data for billing — turning unpredictable LLM spend into something observable and enforceable.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'API Gateway'],
    github: 'https://github.com/davex-ai/Merq',
    gradient: 'from-[#1a1a06] via-[#171211] to-[#0d0d1f]',
    pattern: 'dots',
  },
  {
    title: 'Omni',
    subtitle: 'Real-Time Collaborative Presence Engine',
    category: 'Backend',
    desc: 'WebSocket + Yjs CRDT system powering live multiplayer cursors, room-based streamer/controller/viewer roles, and sub-100ms scroll and click synchronization across 1,000+ concurrent viewers, built on a Node.js/Express broadcast architecture.',
    tags: ['Node.js', 'WebSockets', 'Yjs', 'CRDT', 'React'],
    github: 'https://github.com/davex-ai/omni',
    gradient: 'from-[#120a1f] via-[#0d0f24] to-[#0d0d1f]',
    pattern: 'dots',
  },

  // ── Mobile ─────────────────────────────────────────────────────────────────
  {
    title: 'Aevra',
    subtitle: 'Mobile-First E-Commerce App',
    category: 'Mobile',
    desc: 'Production-grade mobile app with auth-aware navigation, persistent carts scoped by Firebase UID, real-time Firestore orders, and checkout reliability patterns — built on Expo with a clean context/adapter architecture that scales.',
    tags: ['React Native', 'Expo', 'Firebase', 'Firestore', 'TypeScript'],
    github: 'https://github.com/davex-ai/Aevra',
    gradient: 'from-[#1a1200] via-[#1a1a0a] to-[#0f1a0f]',
    pattern: 'hexagons',
  },
  {
    title: 'Instagram',
    subtitle: 'Instagram Clone — Mobile App',
    category: 'Mobile',
    desc: "A Flutter rebuild of Instagram's core mobile experience — feed, profile, and interaction patterns — built as a deep dive into replicating a production-grade social app's UI and navigation flow in Dart.",
    tags: ['Flutter', 'Dart', 'Mobile UI', 'Social'],
    github: 'https://github.com/davex-ai/instagram',
    gradient: 'from-[#1a0a14] via-[#1a0a1a] to-[#0f0a1a]',
    pattern: 'hexagons',
  },
  {
    title: 'XChange',
    subtitle: 'Flutter Currency Converter',
    category: 'Mobile',
    desc: 'Converts between 150+ currencies using live ExchangeRate API data, with dynamic from/to selection, currency symbol mapping, and safe input handling — a compact, Material Design Flutter app.',
    tags: ['Flutter', 'Dart', 'REST API', 'Material Design'],
    github: 'https://github.com/davex-ai/XChange',
    gradient: 'from-[#0a141a] via-[#0a1a1a] to-[#0d1a14]',
    pattern: 'hexagons',
  },
  {
    title: 'Vision Aid',
    subtitle: 'AI-Powered Accessibility Scanner',
    category: 'Mobile',
    desc: 'React Native + Expo app that turns a phone camera into an accessibility tool — Google Vision OCR extracts text from labels, menus, or letters, then reads it aloud via text-to-speech, with local-only scan history and no data leaving the device.',
    tags: ['React Native', 'Expo', 'Google Vision API', 'Accessibility'],
    github: 'https://github.com/davex-ai/vision-aid',
    gradient: 'from-[#1a1a1a] via-[#141414] to-[#0d0d0d]',
    pattern: 'hexagons',
  },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  {
    title: 'Archon',
    subtitle: 'AI-Powered Repo Interview Engine',
    category: 'AI / ML',
    desc: 'RAG pipeline that fetches any public GitHub repo, embeds chunks via SentenceTransformers, and retrieves top-k architecturally relevant sections via cosine similarity. Ships a heuristic fallback that generates senior-level questions without an LLM — 60%+ token reduction.',
    tags: ['Python', 'FastAPI', 'RAG', 'SentenceTransformers', 'React', 'OpenAPI'],
    github: 'https://github.com/davex-ai/Archon',
    live: 'https://huggingface.co/spaces/davex-ai/archon-backend',
    featured: true,
    gradient: 'from-[#001a1a] via-[#001520] to-[#0a0f1a]',
    pattern: 'circuit',
  },
  {
    title: 'NeuroLink',
    subtitle: 'Emotion-Aware AI API',
    category: 'AI / ML',
    desc: 'FastAPI service that fuses rule-based emotion cues, MiniLM sentence embeddings, and short-term conversation memory into a single emotional-intent signal, generating emotionally appropriate responses with voice input via the Web Speech API.',
    tags: ['Python', 'FastAPI', 'SentenceTransformers', 'NLP'],
    github: 'https://github.com/davex-ai/Neurolink',
    gradient: 'from-[#001a1f] via-[#001a14] to-[#0a0f1a]',
    pattern: 'circuit',
  },
  {
    title: 'Aistetic',
    subtitle: 'AI Body Measurement Engine',
    category: 'AI / ML',
    desc: 'Computer vision system that turns a webcam into a tape measure — MediaPipe pose detection calibrated against user height converts pixel distances into real clothing measurements like shoulder width and sleeve length, surfaced through a PyQt desktop interface.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt5'],
    github: 'https://github.com/davex-ai/Aistetic',
    gradient: 'from-[#0a1a1f] via-[#08151a] to-[#0a0f1a]',
    pattern: 'circuit',
  },
  {
    title: 'Sift',
    subtitle: 'Nigerian Price Intelligence Bot',
    category: 'AI / ML',
    desc: "Telegram shopping bot that parses natural-language and Nigerian-context queries (slang, budgets, 'tokunbo'), scrapes Jumia, Konga, Slot, Jiji, and Temu in parallel, deduplicates listings across stores, and uses Qwen2.5 to generate an AI-ranked best-value recommendation.",
    tags: ['Python', 'Telegram Bot', 'Qwen LLM', 'Web Scraping'],
    github: 'https://github.com/davex-ai/Sift',
    gradient: 'from-[#001f14] via-[#001a1a] to-[#0a0f1a]',
    pattern: 'circuit',
  },

  // ── Research ───────────────────────────────────────────────────────────────
  {
    title: 'CardioTrust',
    subtitle: 'AI Interpretability Tool for Healthcare',
    category: 'Research',
    desc: 'XGBoost heart-disease classifier achieving 85% accuracy and 0.90+ ROC AUC with Bayesian hyperparameter search (Optuna). SHAP TreeExplainer surfaces per-prediction attributions — identifying false negatives clustering around patients with healthy-looking vitals masking latent risk.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Optuna', 'Streamlit', 'Hugging Face'],
    github: 'https://github.com/davex-ai/CardioTrust---AI-Interpretability-Tool-for-Healthcare',
    live: 'https://huggingface.co/spaces/davex-ai/CardioTrust-xAI',
    gradient: 'from-[#1a0000] via-[#1a0a0a] to-[#1a0d0d]',
    pattern: 'waves',
  },
  {
    title: 'Hephaestus Oracle',
    subtitle: 'Autonomous CS Artifact Generator',
    category: 'Research',
    desc: 'A self-running forge that procedurally generates computer science artifacts on an autonomous GitHub workflow loop — algorithms, math formulas, synthetic datasets, neural architectures, and ASCII visualizations of its own evolving neural weights, cycling continuously without human input.',
    tags: ['Python', 'GitHub Actions', 'Procedural Generation', 'Automation'],
    github: 'https://github.com/davex-ai/hephaestus-oracle',
    gradient: 'from-[#1a0a00] via-[#1a0f0a] to-[#1a0d0d]',
    pattern: 'waves',
  },
  {
    title: 'KryoChain',
    subtitle: 'Minimal Blockchain From First Principles',
    category: 'Research',
    desc: 'A pure-Java blockchain built to learn the mechanics behind decentralized ledgers from the ground up — Proof-of-Work mining, ECDSA-signed transactions, public/private-key wallets, and full chain-integrity validation, without relying on any existing blockchain framework.',
    tags: ['Java', 'Cryptography', 'Proof-of-Work', 'ECDSA'],
    github: 'https://github.com/davex-ai/KryoChain',
    gradient: 'from-[#0d1a1f] via-[#0a151a] to-[#0d1515]',
    pattern: 'waves',
  },
  {
    title: 'SwiftScan',
    subtitle: 'Computer Vision Document Scanner',
    category: 'Research',
    desc: 'A from-scratch exploration of how scanning apps like CamScanner work — Kivy camera capture feeds an OpenCV pipeline that detects document edges, corrects perspective, and enhances contrast, then exports to PDF with Tesseract OCR and QR/barcode reading layered on top.',
    tags: ['Python', 'OpenCV', 'Kivy', 'OCR'],
    github: 'https://github.com/davex-ai/SwiftScan',
    gradient: 'from-[#1a0d00] via-[#1a1206] to-[#1a0d0d]',
    pattern: 'waves',
  },

  // ── Quant ──────────────────────────────────────────────────────────────────
  {
    title: 'Vector Alpha',
    subtitle: 'Cross-Sectional Equity Prediction Engine',
    category: 'Quant',
    desc: 'Cross-sectional ML model on 7 Mag-7 stocks over 11 years — 14 features across momentum, RSI, and volatility — achieving Sharpe 0.61, Calmar 1.27, Max Drawdown −11%, Profit Factor 1.30. Strict temporal boundaries, TimeSeriesSplit CV, 20bps TCA. Survived the full 2022 bear market.',
    tags: ['Python', 'pandas', 'scikit-learn', 'yfinance', 'Logistic Regression', 'Backtesting'],
    github: 'https://github.com/davex-ai/Vector-Alpha',
    live: 'https://huggingface.co/davex-ai/Vector-Alpha-Model',
    gradient: 'from-[#001a08] via-[#001a10] to-[#001510]',
    pattern: 'bars',
  },
  {
    title: 'Vantix',
    subtitle: 'High-Frequency Orderbook Analytics',
    category: 'Quant',
    desc: 'Distributed orderbook processing engine that ingests live Binance depth streams through Redis, maintains a custom B-Tree orderbook per asset, and streams spread, imbalance, liquidity-wall, and microprice metrics to a Zustand-powered React terminal in real time.',
    tags: ['TypeScript', 'Redis', 'WebSockets', 'Binance API', 'React'],
    github: 'https://github.com/davex-ai/Vantix',
    gradient: 'from-[#001a14] via-[#001a1a] to-[#00150f]',
    pattern: 'bars',
  },
  {
    title: 'EigenAlpha',
    subtitle: 'Multi-Factor Quant Research Engine',
    category: 'Quant',
    desc: 'A modular factor-investing lab modeling momentum, volatility, value, and mean-reversion signals, with monthly portfolio rebalancing, transaction-cost-aware backtesting, and Information-Coefficient-based factor evaluation — replicating the core research loop used inside hedge funds.',
    tags: ['Python', 'pandas', 'Factor Modeling', 'Backtesting'],
    github: 'https://github.com/davex-ai/EigenAlpha',
    gradient: 'from-[#001f10] via-[#001f1a] to-[#001510]',
    pattern: 'bars',
  },
]

// ─── Category accent colours ──────────────────────────────────────────────────
const ACCENT: Record<Exclude<Category, 'All'>, string> = {
  'Infra':    '#4ade80',
  'Backend':  '#a78bfa',
  'Mobile':   '#fbbf24',
  'AI / ML':  '#38bdf8',
  'Research': '#f87171',
  'Quant':    '#34d399',
}

// ─── SVG Patterns ─────────────────────────────────────────────────────────────
function PatternSVG({ type, id }: { type: Project['pattern']; id: string }) {
  const pid = `${type}-${id}`
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
      <defs>
        {type === 'grid' && (
          <pattern id={pid} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.6"/>
          </pattern>
        )}
        {type === 'dots' && (
          <pattern id={pid} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="white"/>
          </pattern>
        )}
        {type === 'hexagons' && (
          <pattern id={pid} width="30" height="26" patternUnits="userSpaceOnUse">
            <polygon points="15,1 27,8 27,18 15,25 3,18 3,8" fill="none" stroke="white" strokeWidth="0.6"/>
          </pattern>
        )}
        {type === 'circuit' && (
          <pattern id={pid} width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M10 30 H28 V10 M32 10 H50 M50 30 H32 V50" fill="none" stroke="white" strokeWidth="0.6"/>
            <circle cx="10" cy="30" r="2" fill="white" opacity="0.6"/>
            <circle cx="50" cy="10" r="2" fill="white" opacity="0.6"/>
            <circle cx="50" cy="50" r="2" fill="white" opacity="0.6"/>
          </pattern>
        )}
        {type === 'waves' && (
          <pattern id={pid} width="80" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 12 Q20 2 40 12 Q60 22 80 12" fill="none" stroke="white" strokeWidth="0.6"/>
          </pattern>
        )}
        {type === 'bars' && (
          <pattern id={pid} width="18" height="44" patternUnits="userSpaceOnUse">
            <rect x="5" y="12" width="8" height="20" fill="none" stroke="white" strokeWidth="0.6"/>
            <rect x="5" y="6" width="8" height="5" fill="white" opacity="0.4"/>
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`}/>
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Category>('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  const visibleProjects = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reset back to the first page whenever the category changes, so switching
  // categories doesn't carry over an expanded count from a previous one.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filter])

  // ─── The actual bug ────────────────────────────────────────────────────────
  // `.section-reveal` starts at opacity: 0 in globals.css and only becomes visible
  // once this observer adds the `.revealed` class to it. The original effect ran
  // ONCE on mount (dependency array `[]`) and only ever observed the cards that
  // existed in the DOM at that moment (the initial "All" set). Every time `filter`
  // (or now `visibleCount`) changes, React swaps in a brand-new set of card
  // elements — but since the observer never re-ran, those new elements were never
  // observed, so they never got `.revealed` and stayed permanently invisible.
  // That's why switching categories displayed nothing until a full page reload
  // remounted the section with the observer wired to the cards already on screen.
  // Fixing it just means re-running this effect whenever the rendered card set
  // can change.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.05 }
    )
    const els = sectionRef.current?.querySelectorAll('.section-reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [filter, visibleCount])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
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
            A selection of work across infra, AI, quant research, and mobile — built to solve real problems.
          </p>
        </div>

        {/*
          Filter Pills — useState, no reload.
          NOTE: every pill is explicitly type="button". Without that, a <button> inside
          any ancestor <form> defaults to type="submit" — clicking it fires a native form
          submission / full page reload *before* React's onClick/setFilter ever runs. That
          reload snaps the UI back to its initial "All" render, which looks exactly like
          "I selected a category and now nothing else is selectable." Being explicit here
          removes that failure mode regardless of what this component ends up nested inside.
        */}
        <div className="flex flex-wrap gap-3 mb-12 section-reveal scrollbar-hidden overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat
            const accent = cat !== 'All' ? ACCENT[cat as Exclude<Category, 'All'>] : '#ffffff'
            const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={isActive}
                style={isActive && cat !== 'All' ? {
                  borderColor: accent + '55',
                  color: accent,
                  backgroundColor: accent + '14',
                } : {}}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  isActive
                    ? cat === 'All'
                      ? 'bg-white/10 border border-white/20 text-pearl'
                      : 'border'
                    : 'border border-white/6 text-ash hover:border-white/15 hover:text-mist'
                }`}
              >
                {cat}
                <span className="ml-1.5 opacity-40">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((proj, i) => {
            const accent = ACCENT[proj.category]
            return (
              <div
                key={proj.title}
                className="section-reveal project-card rounded-3xl overflow-hidden border border-white/6 flex flex-col"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                {/* Visual header */}
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${proj.gradient} flex-shrink-0`}>
                  <PatternSVG type={proj.pattern} id={proj.title} />

                  {/* Radial glow */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(ellipse at 25% 60%, ${accent}55 0%, transparent 65%)`, opacity: 0.6 }}
                  />

                  {/* Category pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="px-2.5 py-1 rounded-full font-mono text-xs tracking-wide border backdrop-blur-sm"
                      style={{ color: accent, borderColor: accent + '44', backgroundColor: accent + '18' }}
                    >
                      {proj.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {proj.featured && (
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                      <span className="font-mono text-xs text-silver">Featured</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="project-card-overlay z-20">
                    <div className="flex gap-3">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/15 hover:bg-white/20 transition-colors"
                        title="View on GitHub"
                      >
                        <Github size={15} className="text-pearl" />
                      </a>
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/15 hover:bg-white/20 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={15} className="text-pearl" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-body font-semibold text-pearl text-base leading-tight">{proj.title}</h3>
                      <p className="font-mono text-xs mt-0.5" style={{ color: accent + 'bb' }}>{proj.subtitle}</p>
                    </div>
                    <ArrowRight size={14} className="text-smoke flex-shrink-0 mt-1" />
                  </div>

                  <p className="font-body text-ash text-xs leading-relaxed flex-1">{proj.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/4 border border-white/6 font-mono text-xs text-smoke"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer links */}
                  <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-ash hover:text-pearl transition-colors"
                    >
                      <Github size={11} />
                      GitHub
                    </a>
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs hover:opacity-100 opacity-75 transition-opacity"
                        style={{ color: accent }}
                      >
                        <ExternalLink size={11} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* See More — reveals the next page within the current category */}
        {hasMore && (
          <div className="text-center mt-8 section-reveal">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="border border-white/10 text-ash hover:text-pearl hover:border-white/25 transition-all duration-300 px-8 py-3.5 rounded-full text-sm font-mono inline-flex items-center gap-2"
            >
              See {Math.min(PAGE_SIZE, filtered.length - visibleCount)} More
              <ChevronDown size={14} />
            </button>
          </div>
        )}

        {/* See All */}
        <div className="text-center mt-12 section-reveal">
          <a
            href="https://github.com/davex-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
          >
            See All on GitHub
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  )
}
