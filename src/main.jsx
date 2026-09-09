import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    number: '01',
    title: 'Shuttle Operation Portal',
    eyebrow: 'Mobility operations',
    image: '/assets/shuttle-operation-portal.png',
    imageAlt: 'Login screen for Shuttle Operation Portal',
    accent: 'blue',
    summary:
      'A clean, secure front door for managing company transportation from one workspace.',
    detail:
      'A focused operations portal designed around a simple truth: movement becomes easier to manage when requests, access, and accountability meet in one clear interface.',
    outcomes: ['Centralized trip requests', 'Role-aware access', 'Clear operational handoff'],
    tags: ['Operations', 'Workflow', 'Access control'],
    label: 'Move with confidence'
  },
  {
    number: '02',
    title: 'FGIMS',
    eyebrow: 'Finished goods inventory',
    image: '/assets/fgims-dashboard.png',
    imageAlt: 'FGIMS dashboard showing stock metrics and inventory charts',
    accent: 'violet',
    summary:
      'An inventory command view for stock, shipments, warehouse returns, and slow-moving items.',
    detail:
      'Finished Goods Inventory Management System combines a WinForms barcode and QR workflow with a Razor-based admin experience, REST API protection, offline synchronization, and Excel-ledger reporting.',
    outcomes: ['Barcode + QR workflows', 'Offline background sync', 'Excel ledger and variance reports'],
    tags: ['.NET', 'WinForms', 'ASP.NET Core', 'SQL Server'],
    label: 'Inventory, in focus'
  },
  {
    number: '03',
    title: 'Injection Mold Tracking System',
    eyebrow: 'Production traceability',
    image: '/assets/injection-mold-tracking.png',
    imageAlt: 'Injection Mold Tracking System transaction history screen',
    accent: 'green',
    summary:
      'A floor-ready traceability system for the lifecycle, location, and movement of production molds.',
    detail:
      'A Windows desktop system that makes mold monitoring practical: check-in and check-out history, production-floor locations, maintenance visibility, QR lookup, SQL Server traceability, and audit exports.',
    outcomes: ['Mold lifecycle history', 'QR-assisted lookup', 'Excel-ready audit trail'],
    tags: ['Desktop system', 'QR scanning', 'SQL Server', 'Reporting'],
    label: 'Trace every movement'
  },
  {
    number: '04',
    title: 'Rack Viewer',
    eyebrow: 'Warehouse wayfinding',
    image: '/assets/rack-viewer.png',
    imageAlt: 'Rack Viewer interface showing color-coded warehouse locations',
    accent: 'amber',
    summary:
      'A visual warehouse map that turns a part-number search into an exact rack location and stock detail.',
    detail:
      'Rather than bury locations in a table, Rack Viewer lets people read the warehouse at a glance. Color-coded positions, part lookup, quantities, and ledgers bring a physical layout into a usable digital map.',
    outcomes: ['Visual rack availability', 'Part-number lookup', 'Location-level stock detail'],
    tags: ['Inventory UX', 'Warehouse map', 'Search', 'Ledger'],
    label: 'Find it, fast'
  },
  {
    number: '05',
    title: 'Request for Material',
    eyebrow: 'Procurement workflow',
    image: '/assets/request-for-material.png',
    imageAlt: 'Request for Material dashboard with RFQ status chart and request list',
    accent: 'cyan',
    summary:
      'A request-to-approval workspace built to make procurement status, verification, and history easy to follow.',
    detail:
      'A multi-user management experience for request and quotation workflows, pairing clear dashboard status with approval checks, comparison work, historical visibility, and role-based access.',
    outcomes: ['Workflow status visibility', 'Verification + checklists', 'Historical request trail'],
    tags: ['PHP', 'MySQL', 'RBAC', 'AJAX'],
    label: 'Make requests visible'
  }
]

const capabilities = [
  {
    id: 'A',
    name: 'Operational software',
    note: 'Systems that help people, materials, and approvals keep moving.',
    tools: 'C# · .NET · WinForms · ASP.NET Core'
  },
  {
    id: 'B',
    name: 'Inventory intelligence',
    note: 'Clearer visibility for stock, location, variance, and traceability.',
    tools: 'SQL Server · MySQL · T-SQL · Excel'
  },
  {
    id: 'C',
    name: 'Connected workflows',
    note: 'Practical interfaces across desktop, web, APIs, and the production floor.',
    tools: 'REST APIs · QR / barcode · IIS · Azure'
  }
]

const timeline = [
  {
    when: '2024 — present',
    role: 'Programmer / IT Technical Support',
    place: 'Nidec Instruments Philippines Corporation',
    note: 'Business applications, manufacturing and warehouse automation, database work, UAT, deployments, and technical support.'
  },
  {
    when: '2021 — 2024',
    role: 'Production Encoder',
    place: 'Nidec Instruments Philippines Corporation',
    note: 'Built firsthand understanding of ERP transactions, material flow, inventory variance, labeling, inspection, and floor operations.'
  },
  {
    when: '2021-2024',
    role: 'Production Support ',
    place: 'Nidec Instruments Philippines Corporation',
    note: 'Inspect products for defects or inconsistencies before packing.'
  }
]

function Arrow({ diagonal = false }) {
  return (
    <svg className={diagonal ? 'icon icon--diagonal' : 'icon'} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function GridMark() {
  return (
    <svg className="grid-mark" viewBox="0 0 38 38" aria-hidden="true">
      <path d="M2 2h12v12H2zM24 2h12v12H24zM2 24h12v12H2zM24 24h12v12H24z" />
      <path d="M19 0v38M0 19h38" className="grid-mark__line" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg className="signal-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18.5a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0M11 11.5a2 2 0 0 1 2 0" />
      <circle cx="12" cy="19" r="1.2" />
    </svg>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sonny Boy Del Rosario — home" onClick={closeMenu}>
          <span className="brand__mark">SB</span>
          <span className="brand__name">SONNY DEL ROSARIO</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Systems</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav__contact" href="#contact" onClick={closeMenu}>Let’s talk <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__noise" />
        <div className="hero__grid" />
        <div className="hero__content" data-reveal>
          <div className="eyebrow eyebrow--light"><span className="status-dot" /> Available for meaningful system work</div>
          <h1>
            Building the digital<br />
            <em>control rooms</em><br />
            behind real operations.
          </h1>
          <p className="hero__lede">
            I’m Sonny Boy Del Rosario, a .NET and full-stack developer designing practical software for manufacturing, inventory, procurement, and movement.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">Explore selected systems <Arrow /></a>
            <a className="button button--quiet" href="/documents/Sonny_Boy_Del_Rosario_CV.docx" download>Download CV <Arrow diagonal /></a>
          </div>
          <div className="hero__signals" aria-label="Specialties">
            <span>WEB SYSTEMS</span><i />
            <span>OPERATIONS</span><i />
            <span>INVENTORY</span><i />
            <span>DASHBOARDS</span>
          </div>
        </div>

        <aside className="identity-card" data-reveal>
          <div className="identity-card__topline"><SignalIcon /><span>PROFILE / 2026</span></div>
          <div className="portrait-wrap">
            <img src="/assets/sonny-del-rosario.jpg" alt="Sonny Boy Del Rosario" className="portrait" />
            <div className="portrait-wrap__shade" />
            <span className="portrait-wrap__corner portrait-wrap__corner--tl" />
            <span className="portrait-wrap__corner portrait-wrap__corner--br" />
          </div>
          <div className="identity-card__footer">
            <div><strong>SONNY BOY</strong><span>DEL ROSARIO</span></div>
            <GridMark />
          </div>
          <p>SYSTEMS DEVELOPER<br /><span>MANUFACTURING / OPERATIONS</span></p>
        </aside>

        <div className="hero__route" aria-hidden="true">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M-10,295 C155,195 206,360 388,237 C533,139 595,313 758,215 C886,138 950,261 1113,161 C1257,73 1312,174 1450,50" /></svg>
          <span className="route-node route-node--one" /><span className="route-node route-node--two" /><span className="route-node route-node--three" />
        </div>
        <div className="hero__index"><span>01</span><span>05</span></div>
        <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><b>↓</b></a>
      </section>

      <section className="intro-band">
        <p data-reveal>
          I build the layer between the <strong>factory floor</strong> and the <strong>decision-maker</strong> — translating movement, inventory, and workflow into systems people can trust.
        </p>
        <div className="intro-band__stamp" data-reveal><span>DESIGNING FOR</span><strong>CLARITY<br />IN MOTION</strong></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading" data-reveal>
          <div>
            <span className="kicker">SELECTED SYSTEMS</span>
            <h2>Work that makes<br /><em>operations legible.</em></h2>
          </div>
          <p>Five interfaces, one focus: giving teams a clearer way to see what needs attention and act with confidence.</p>
        </div>

        <div className="projects">
          {projects.map((project, index) => (
            <article className={`project project--${project.accent} ${index % 2 === 1 ? 'project--flip' : ''}`} key={project.title} data-reveal>
              <div className="project__copy">
                <div className="project__meta"><span>{project.number} / 05</span><span>{project.eyebrow}</span></div>
                <h3>{project.title}</h3>
                <p className="project__summary">{project.summary}</p>
                <div className="project__tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button className="project__link" type="button" onClick={() => setSelectedProject(project)}>
                  Open system brief <Arrow />
                </button>
              </div>
              <button className="project__visual" type="button" onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} project details`}>
                <span className="project__visual-label">{project.label}</span>
                <img src={project.image} alt={project.imageAlt} />
                <span className="project__expand"><Arrow diagonal /></span>
                <span className="project__gridlines" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="capabilities__aside" data-reveal>
          <span className="kicker">CAPABILITY MAP</span>
          <h2>One developer.<br /><em>Several connected</em><br />ways to help.</h2>
          <p>I bring the software layer, the data layer, and an on-the-ground understanding of operations together in the same build.</p>
        </div>
        <div className="capability-map" data-reveal>
          <div className="capability-map__line capability-map__line--one" />
          <div className="capability-map__line capability-map__line--two" />
          {capabilities.map((capability) => (
            <article className="capability-node" key={capability.id}>
              <span className="capability-node__id">{capability.id}</span>
              <h3>{capability.name}</h3>
              <p>{capability.note}</p>
              <small>{capability.tools}</small>
            </article>
          ))}
          <div className="capability-map__core"><GridMark /><span>SONNY<br />DEL<br />ROSARIO</span></div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about__header" data-reveal>
          <span className="kicker">THE OPERATOR’S PERSPECTIVE</span>
          <h2>I don’t just build<br />for the floor. <em>I’ve worked on it.</em></h2>
        </div>
        <div className="timeline" data-reveal>
          {timeline.map((entry) => (
            <article className="timeline__item" key={entry.when + entry.role}>
              <span className="timeline__when">{entry.when}</span>
              <div className="timeline__body"><h3>{entry.role}</h3><h4>{entry.place}</h4><p>{entry.note}</p></div>
              <span className="timeline__marker" />
            </article>
          ))}
        </div>
        <div className="credentials" data-reveal>
          <span>BS INFORMATION TECHNOLOGY / TRIMEX COLLEGES</span>
          <span>TESDA NC II / COMPUTER HARDWARE SERVICING</span>
          <span>TESDA NC II / ELECTRICAL INSTALLATION &amp; MAINTENANCE</span>
        </div>
      </section>

      <section className="closing" id="contact">
        <div className="closing__route" aria-hidden="true"><svg viewBox="0 0 1200 190" preserveAspectRatio="none"><path d="M-40 167C159 43 242 239 412 108S722 201 840 94s237 31 409-89" /></svg></div>
        <span className="kicker kicker--light" data-reveal>START A CONVERSATION</span>
        <h2 data-reveal>Have an operational<br />problem worth <em>simplifying?</em></h2>
        <a className="closing__email" href="mailto:sonnydelrosario819@gmail.com" data-reveal>sonnydelrosario819@gmail.com <Arrow /></a>
        <div className="closing__footer" data-reveal>
          <span>© {new Date().getFullYear()} SONNY BOY DEL ROSARIO</span>
          <a href="https://www.linkedin.com/in/sonny-boy-del-rosario-5400801ab" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal /></a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </section>

      {selectedProject && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" aria-label="Close project brief" onClick={() => setSelectedProject(null)}>×</button>
            <div className={`dialog-panel dialog-panel--${selectedProject.accent}`}>
              <div className="dialog-panel__head"><span>{selectedProject.number} / SYSTEM BRIEF</span><span>{selectedProject.eyebrow}</span></div>
              <img src={selectedProject.image} alt={selectedProject.imageAlt} />
            </div>
            <div className="dialog-copy">
              <span className="kicker">{selectedProject.label}</span>
              <h2 id="dialog-title">{selectedProject.title}</h2>
              <p>{selectedProject.detail}</p>
              <div className="dialog-outcomes">
                {selectedProject.outcomes.map((outcome) => <span key={outcome}>✓&nbsp; {outcome}</span>)}
              </div>
              <div className="project__tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
