import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, ListTodo, FlaskConical, Network, 
  AlertTriangle, ChevronDown, ChevronUp, Zap, Shield, Eye,
  FileText, BarChart3, Target, Heart, Github, Star,
  XCircle, RefreshCw, Plus, GitMerge, FileDown, Kanban,
  Sparkles, BrainCircuit, DollarSign, SearchCode, Globe, Bot
} from 'lucide-react';

/* ═══════════ CUSTOM LOGO SVG ═══════════ */
function InitPhaseMark({ size = 28, dark = false }) {
  const bg = dark ? '#0f1115' : '#e4e4e7';
  const fg = dark ? '#e4e4e7' : '#0f1115';
  return (
    <div style={{ 
      width: `${size}px`, height: `${size}px`, backgroundColor: bg, borderRadius: `${size * 0.25}px`, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        {/* Stylized ">_" terminal prompt — unique to InitPhase */}
        <path d="M4 6L12 12L4 18" stroke={fg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 18H20" stroke={fg} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function InitPhaseLogo({ size = 28, fontSize = '1.2rem' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <InitPhaseMark size={size} />
      <span style={{ color: '#fafafa', fontSize, fontWeight: '800', fontFamily: 'var(--font-heading)' }}>InitPhase</span>
    </div>
  );
}

/* ═══════════ SCROLL ANIMATION HOOK ═══════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

function AnimatedSection({ children, delay = 0, style = {} }) {
  const [ref, isVisible] = useInView(0.1);
  return (
    <div ref={ref} style={{ 
      ...style,
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is InitPhase and who is it for?',
      a: 'InitPhase is an AI-powered project management workspace designed for developers and students who want to follow Object-Oriented Software Engineering (OOSE) principles. Whether you\'re building software for a class project or a production app, InitPhase handles everything from turning rough ideas into structured BRDs, all the way through test execution and documentation export.'
    },
    {
      q: 'Do I need to know OOSE to use this?',
      a: 'Not at all. InitPhase is specifically designed for beginners. The app guides you through each step: brainstorm an idea with AI, define requirements, write test cases, and view your traceability matrix. Each module explains what it does in simple terms.'
    },
    {
      q: 'Is this free to use?',
      a: 'Yes, InitPhase is completely free — including all AI-powered features. Create an account, start a project, and use all features without any restrictions or paywalls.'
    },
    {
      q: 'Can I use this for college assignments and portfolios?',
      a: 'Absolutely. InitPhase is perfect for academic projects where you need to demonstrate proper software engineering processes. It helps you create professional documentation that shows structured planning and testing — complete with AI-generated BRDs and exportable PDFs.'
    },
    {
      q: 'How does the AI work?',
      a: 'InitPhase uses Groq-powered LLMs (Llama 3.1) on the backend. When you submit a rough idea, the AI structures it into a full Business Requirement Document with stakeholders, risks, and functional specs. For Change Impact Analysis, it scans your GitHub repo and predicts which files are affected by a proposed change — including cost estimates. All AI outputs are normalized and validated server-side.'
    },
    {
      q: 'Can I connect my GitHub repository?',
      a: 'Yes! The Change Impact Analyzer lets you paste any public GitHub repo URL. InitPhase fetches the repo structure, identifies key files (routes, controllers, models, pages), and generates an architecture summary using AI. You can then describe a change request, and it predicts affected files, complexity, and engineering cost.'
    },
    {
      q: 'What technologies does InitPhase use?',
      a: 'InitPhase is built with React on the frontend, Node.js/Express on the backend, and MongoDB as the database. It uses JWT authentication for secure access, Groq API for AI features, and the GitHub API for repository analysis. Deployed on Vercel and Render.'
    }
  ];

  /* SVG coverage ring helper */
  const coveragePercent = 100;
  const ringRadius = 40;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (coveragePercent / 100) * ringCircumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#09090b', color: '#fafafa' }}>
      
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="responsive-nav" style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(9, 9, 11, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'
      }}>
        <InitPhaseLogo />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="https://github.com/RiteshJha912/InitPhase" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="hide-mobile">
            <button style={{ 
              padding: '7px 14px', backgroundColor: 'transparent', color: '#a1a1aa', 
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' 
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fafafa'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa'; }}>
              <Github size={14} /> <Star size={12} /> Star
            </button>
          </a>
          <Link to="/login" style={{ textDecoration: 'none' }} className="hide-mobile">
            <button style={{ 
              padding: '7px 16px', backgroundColor: 'transparent', color: '#a1a1aa', 
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', 
              fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' 
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fafafa'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa'; }}>
              Log In
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '7px 16px', backgroundColor: '#fafafa', color: '#09090b', 
              border: 'none', borderRadius: '8px', 
              fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' 
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = '#fafafa'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="hero-section" style={{ 
        position: 'relative', overflow: 'hidden',
        padding: '24px 24px',
        minHeight: 'calc(100vh - 58px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* ── Crosshatch subtle background (dark mode, faded edges) ── */}
        <div style={{
          position: 'absolute', inset: 0, 
          backgroundImage: `
            repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 3px, transparent 3px, transparent 8px)
          `,
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* ── Primary radial glow ── */}
        <div className="hero-glow" style={{ 
          position: 'absolute', top: '-200px', left: '30%', transform: 'translateX(-50%)',
          width: '900px', height: '700px', 
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        {/* ── Secondary accent glow (right side, AI purple tint) ── */}
        <div className="hero-glow-2" style={{ 
          position: 'absolute', top: '60px', right: '-120px',
          width: '600px', height: '500px', 
          background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div className="landing-hero-grid" style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* ══ LEFT: Text & CTA ══ */}
          <div>
            {/* Badges row */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div className="hero-badge" style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '5px 14px', backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', 
                fontSize: '0.75rem', color: '#a1a1aa', fontWeight: '500'
              }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }} />
                Open Source &amp; Free
              </div>
              <div className="hero-badge" style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '5px 14px', 
                backgroundColor: 'rgba(168,85,247,0.08)', 
                border: '1px solid rgba(168,85,247,0.2)', borderRadius: '9999px', 
                fontSize: '0.75rem', color: '#c084fc', fontWeight: '500'
              }}>
                <Sparkles size={12} className="ai-sparkle" />
                AI-Powered
              </div>
            </div>

            <h1 className="hero-title" style={{ 
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)', fontWeight: '800', fontFamily: 'var(--font-heading)', 
              lineHeight: '1.08', letterSpacing: '-0.04em', color: '#fafafa', marginBottom: '18px'
            }}>
              AI-Powered Software<br/>Engineering, Idea to Ship.
            </h1>

            <p className="hero-desc" style={{ 
              fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: '#a1a1aa', lineHeight: '1.65', 
              marginBottom: '28px', maxWidth: '440px'
            }}>
              Turn rough ideas into structured BRDs with AI, define requirements, trace test execution, diagram sequence flows, analyze change impact on GitHub repos, and export documentation — all in one workspace.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="cta-glow-btn" style={{ 
                  padding: '11px 26px', backgroundColor: '#fafafa', color: '#09090b', 
                  border: 'none', borderRadius: '9px', display: 'flex', alignItems: 'center', gap: '7px',
                  fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.25s',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Start for Free <ArrowRight size={15} />
                </button>
              </Link>
              <a href="#how-it-works" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  padding: '11px 24px', backgroundColor: 'transparent', color: '#a1a1aa', 
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '9px', display: 'flex', alignItems: 'center', gap: '7px',
                  fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fafafa'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#a1a1aa'; }}>
                  See How It Works
                </button>
              </a>
            </div>
          </div>

          {/* ══ RIGHT: Advanced Product Preview Dashboard ══ */}
          <div className="hero-terminal" style={{ minWidth: 0 }}>
            <div style={{ 
              backgroundColor: '#0d0d10', 
              border: '1px solid rgba(255,255,255,0.07)', 
              borderRadius: '8px', overflow: 'hidden', 
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset',
              maxWidth: '100%',
            }}>
              {/* ── Window chrome ── */}
              <div style={{ 
                padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)', 
                background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ef4444', opacity: 0.7 }} />
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#f59e0b', opacity: 0.7 }} />
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10b981', opacity: 0.7 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#10b981', animation: 'glowPulse 2s ease-in-out infinite' }} />
                  <span style={{ fontSize: '0.58rem', color: '#52525b', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live Preview</span>
                </div>
              </div>

              {/* ── Dashboard body ── */}
              <div style={{ padding: '12px' }}>
                {/* Project header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '26px', height: '26px', borderRadius: '7px', 
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(16,185,129,0.2))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <Target size={12} color="#a1a1aa" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#fafafa', fontFamily: 'var(--font-heading)' }}>E-Commerce Platform</div>
                      <div style={{ fontSize: '0.55rem', color: '#3f3f46' }}>Updated 2h ago - Sprint 4</div>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '2px 8px', borderRadius: '9999px', fontSize: '0.52rem', fontWeight: '700',
                    backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)',
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                  }}>On Track</div>
                </div>

                {/* ── Stat cards with shimmer ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                  {[
                    { label: 'Requirements', value: '12', sub: '+3 from AI BRD', color: '#e4e4e7' },
                    { label: 'Test Cases', value: '28', sub: '24 automated', color: '#a855f7' },
                    { label: 'Coverage', value: '100%', sub: 'All mapped', color: '#10b981' },
                  ].map((s, i) => (
                    <div className="dash-stat-card" key={i} style={{ 
                      padding: '7px 8px', 
                      backgroundColor: 'rgba(255,255,255,0.02)', 
                      border: '1px solid rgba(255,255,255,0.06)', 
                      borderRadius: '8px', 
                      textAlign: 'center',
                      transition: 'all 0.3s'
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: s.color, fontFamily: 'var(--font-heading)', animation: 'countUp 0.8s ease-out both', animationDelay: `${0.3 + i * 0.15}s` }}>{s.value}</div>
                      <div style={{ fontSize: '0.52rem', color: '#52525b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1px' }}>{s.label}</div>
                      <div style={{ fontSize: '0.48rem', color: '#3f3f46', marginTop: '2px' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* ── Two column layout: Coverage ring + Test results ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6px', marginBottom: '8px' }}>
                  
                  {/* Coverage ring */}
                  <div style={{ 
                    padding: '10px 8px', backgroundColor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                      <svg width="56" height="56" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                        <circle 
                          className="ring-progress"
                          cx="50" cy="50" r={ringRadius} fill="none" 
                          stroke="#10b981" strokeWidth="7" strokeLinecap="round"
                          strokeDasharray={ringCircumference}
                          strokeDashoffset={ringOffset}
                        />
                      </svg>
                      <div style={{ 
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.78rem', fontWeight: '800', color: '#fafafa', fontFamily: 'var(--font-heading)'
                      }}>100%</div>
                    </div>
                    <div style={{ fontSize: '0.52rem', color: '#52525b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>RTM Coverage</div>
                  </div>

                  {/* Test execution breakdown */}
                  <div style={{ 
                    padding: '9px 10px', backgroundColor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px',
                  }}>
                    <div style={{ fontSize: '0.54rem', fontWeight: '700', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Test Execution</div>
                    {[
                      { label: 'Passed', count: 24, total: 28, color: '#10b981' },
                      { label: 'Failed', count: 1, total: 28, color: '#ef4444' },
                      { label: 'Pending', count: 3, total: 28, color: '#f59e0b' },
                    ].map((t, i) => (
                      <div key={i} style={{ marginBottom: i < 2 ? '6px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontSize: '0.58rem', color: '#71717a' }}>{t.label}</span>
                          <span style={{ fontSize: '0.55rem', color: t.color, fontWeight: '700' }}>{t.count}/{t.total}</span>
                        </div>
                        <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div className="bar-anim" style={{ 
                            height: '100%', backgroundColor: t.color, borderRadius: '9999px',
                            width: `${(t.count / t.total) * 100}%`,
                            animationDelay: `${0.6 + i * 0.2}s`
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Requirements Table (mini) with AI badge ── */}
                <div style={{ 
                  marginBottom: '8px', backgroundColor: 'rgba(255,255,255,0.015)', 
                  border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden'
                }}>
                  {/* Table header */}
                  <div style={{ 
                    display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px',
                    padding: '5px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    backgroundColor: 'rgba(255,255,255,0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '0.52rem', fontWeight: '700', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Requirement</span>
                      <Sparkles size={8} color="#a855f7" style={{ opacity: 0.6 }} />
                    </div>
                    <span style={{ fontSize: '0.52rem', fontWeight: '700', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>Priority</span>
                    <span style={{ fontSize: '0.52rem', fontWeight: '700', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>Tests</span>
                  </div>
                  {/* Table rows */}
                  {[
                    { name: 'User login with email/password', priority: 'Must-Have', pColor: '#ef4444', tests: 8 },
                    { name: 'Product search & filtering', priority: 'Must-Have', pColor: '#ef4444', tests: 6 },
                    { name: 'Shopping cart management', priority: 'Should-Have', pColor: '#f59e0b', tests: 9 },
                    { name: 'Order history page', priority: 'Nice-to-Have', pColor: '#10b981', tests: 5 },
                  ].map((r, i) => (
                    <div key={i} style={{ 
                      display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px', alignItems: 'center',
                      padding: '4px 10px', 
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={9} color="#10b981" />
                        <span style={{ fontSize: '0.62rem', color: '#a1a1aa' }}>{r.name}</span>
                      </div>
                      <span style={{ 
                        fontSize: '0.5rem', fontWeight: '700', color: r.pColor, 
                        padding: '1px 6px', backgroundColor: `${r.pColor}12`, borderRadius: '9999px',
                        whiteSpace: 'nowrap'
                      }}>{r.priority}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
                        <FlaskConical size={8} color="#71717a" />
                        <span style={{ fontSize: '0.55rem', color: '#71717a', fontWeight: '600' }}>{r.tests}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Activity ticker (updated with AI events) ── */}
                <div style={{ 
                  marginBottom: '8px', overflow: 'hidden', borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                  padding: '4px 0'
                }}>
                  <div className="ticker-track" style={{ display: 'flex', gap: '28px', whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
                    {[
                      { icon: Sparkles, color: '#a855f7', text: 'BRD generated from idea in 3s' },
                      { icon: CheckCircle, color: '#10b981', text: 'Test "Login redirect" passed' },
                      { icon: SearchCode, color: '#3b82f6', text: 'Change impact: 4 files affected' },
                      { icon: Plus, color: '#a855f7', text: 'Requirement "Wishlist" added' },
                      { icon: XCircle, color: '#ef4444', text: 'Test "Tax calc" failed' },
                      { icon: RefreshCw, color: '#f59e0b', text: 'Status changed to Pass' },
                      { icon: CheckCircle, color: '#10b981', text: 'Coverage reached 100%' },
                      { icon: Sparkles, color: '#a855f7', text: 'BRD generated from idea in 3s' },
                      { icon: CheckCircle, color: '#10b981', text: 'Test "Login redirect" passed' },
                      { icon: SearchCode, color: '#3b82f6', text: 'Change impact: 4 files affected' },
                      { icon: Plus, color: '#a855f7', text: 'Requirement "Wishlist" added' },
                      { icon: XCircle, color: '#ef4444', text: 'Test "Tax calc" failed' },
                    ].map((item, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.6rem', color: '#3f3f46', fontWeight: '500' }}>
                        <item.icon size={10} color={item.color} />
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Ship-ready footer ── */}
                <div style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '7px 10px', 
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))', 
                  border: '1px solid rgba(16,185,129,0.15)', borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={11} color="#10b981" />
                    <span style={{ fontSize: '0.62rem', color: '#10b981', fontWeight: '600' }}>All requirements covered</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.52rem', color: '#10b981', fontWeight: '700', 
                    padding: '2px 7px', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '9999px',
                    letterSpacing: '0.04em', textTransform: 'uppercase'
                  }}>Ready to Ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF STRIP ═══════════════ */}
      <section style={{ 
        padding: '18px 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ 
          display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap', 
          maxWidth: '900px', margin: '0 auto', alignItems: 'center'
        }}>
          {[
            { icon: Sparkles, text: 'AI-Powered' },
            { icon: CheckCircle, text: 'OOSE Compliant' },
            { icon: Zap, text: 'Free Forever' },
            { icon: Shield, text: 'Secure Auth' },
            { icon: Eye, text: 'Real-time Tracking' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71717a', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <item.icon size={13} color={i === 0 ? '#a855f7' : '#52525b'} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PROBLEM SECTION ═══════════════ */}
      <section className="section-padding" style={{ padding: 'clamp(60px, 10vw, 100px) 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <AnimatedSection>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
              The Problem
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
              Most projects fail because nobody<br/>tracks what was actually built.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#a1a1aa', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 48px auto' }}>
              Developers jump straight into coding without documenting requirements. Tests are written randomly. 
              There's no way to know if the final product matches what was planned. Sound familiar?
            </p>
          </AnimatedSection>
          
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'left' }}>
            {[
              { icon: AlertTriangle, title: 'No Written Requirements', desc: 'Features are discussed verbally and forgotten. There\'s no single source of truth.' },
              { icon: AlertTriangle, title: 'Random Testing', desc: 'Tests are written ad-hoc without linking them back to the actual requirements.' },
              { icon: AlertTriangle, title: 'Zero Traceability', desc: 'No one knows which features have been tested and which are shipping untested.' }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div style={{ 
                  padding: '24px', backgroundColor: '#111113', border: '1px solid rgba(255,255,255,0.06)', 
                  borderRadius: '12px', transition: 'border-color 0.3s',
                  height: '100%', boxSizing: 'border-box'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                  <item.icon size={20} color="#ef4444" style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: '#fafafa', fontSize: '1rem', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{item.title}</h4>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ AI SPOTLIGHT SECTION ═══════════════ */}
      <section className="section-padding" style={{
        padding: 'clamp(60px, 10vw, 100px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Subtle purple glow behind the section */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', backgroundColor: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)', borderRadius: '9999px',
                fontSize: '0.8rem', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px'
              }}>
                <BrainCircuit size={14} />
                AI That Actually Helps
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                From rough idea to structured BRD.<br/>From change request to impact report.
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                InitPhase integrates AI directly into your software engineering workflow — not as a gimmick, but as a real productivity multiplier.
              </p>
            </div>
          </AnimatedSection>

          <div className="ai-spotlight-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* AI Feature 1: Idea → BRD */}
            <AnimatedSection delay={0.1}>
              <div className="ai-glow-card" style={{
                padding: '28px', backgroundColor: '#0d0d10',
                border: '1px solid rgba(168,85,247,0.15)', borderRadius: '14px',
                height: '100%', boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(168,85,247,0.2)'
                  }}>
                    <Sparkles size={18} color="#a855f7" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: 'var(--font-heading)', color: '#e4e4e7', margin: 0 }}>Idea → BRD Generator</h4>
                    <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: '600' }}>Powered by Llama 3.1</span>
                  </div>
                </div>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  Paste a rough product idea. AI generates a complete Business Requirement Document — executive summary, stakeholders, functional requirements with priorities, risks, and success metrics.
                </p>

                {/* Mini BRD preview */}
                <div style={{
                  padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px',
                  fontFamily: 'monospace', fontSize: '0.68rem', color: '#71717a', lineHeight: '1.7'
                }}>
                  <div style={{ color: '#a855f7', fontWeight: '700', marginBottom: '4px' }}>AI Output Preview</div>
                  <div><span style={{ color: '#52525b' }}>Executive Summary:</span> "A mobile-first..."</div>
                  <div><span style={{ color: '#52525b' }}>Stakeholders:</span> Product Team, QA Lead</div>
                  <div><span style={{ color: '#52525b' }}>Functional Reqs:</span> 6 items (3 Must-Have)</div>
                  <div><span style={{ color: '#52525b' }}>Risks:</span> 2 identified</div>
                </div>
              </div>
            </AnimatedSection>

            {/* AI Feature 2: Change Impact */}
            <AnimatedSection delay={0.2}>
              <div className="ai-glow-card" style={{
                padding: '28px', backgroundColor: '#0d0d10',
                border: '1px solid rgba(59,130,246,0.15)', borderRadius: '14px',
                height: '100%', boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(59,130,246,0.2)'
                  }}>
                    <SearchCode size={18} color="#3b82f6" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: 'var(--font-heading)', color: '#e4e4e7', margin: 0 }}>Change Impact Analyzer</h4>
                    <span style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: '600' }}>GitHub + AI Analysis</span>
                  </div>
                </div>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  Link any public GitHub repo. AI scans the architecture, then predicts which files a change request will affect — with complexity rating, estimated hours, and cost analysis.
                </p>

                {/* Mini impact preview */}
                <div style={{
                  padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px',
                  fontFamily: 'monospace', fontSize: '0.68rem', color: '#71717a', lineHeight: '1.7'
                }}>
                  <div style={{ color: '#3b82f6', fontWeight: '700', marginBottom: '4px' }}>Impact Report Preview</div>
                  <div><span style={{ color: '#52525b' }}>Complexity:</span> <span style={{ color: '#f59e0b' }}>Medium</span></div>
                  <div><span style={{ color: '#52525b' }}>Affected Files:</span> 4 (routes, controller, model, page)</div>
                  <div><span style={{ color: '#52525b' }}>Estimated Hours:</span> 4-16h</div>
                  <div><span style={{ color: '#52525b' }}>Estimated Cost:</span> $250 - $1,200</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="section-padding" style={{ 
        padding: 'clamp(60px, 10vw, 100px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
                How It Works
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                AI-Assisted Lifecycle Management.
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                InitPhase guides you through the complete software engineering process — from brainstorming with AI to shipping with confidence.
              </p>
            </div>
          </AnimatedSection>

          {/* Vertical timeline layout */}
          <div className="how-it-works-content" style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            {/* Vertical line - hidden on mobile via CSS class or handled via before */}
            <div className="timeline-line" style={{ 
              position: 'absolute', left: '23px', top: '36px', bottom: '36px', width: '1px', 
              background: 'linear-gradient(to bottom, rgba(168,85,247,0.3), rgba(255,255,255,0.1), rgba(16,185,129,0.3))'
            }} />

            {[
              {
                num: '01', icon: Sparkles, color: '#a855f7',
                title: 'Brainstorm with AI',
                desc: 'Describe your rough product idea in plain language. AI transforms it into a structured Business Requirement Document with stakeholders, scope, risks, and prioritized functional requirements.',
                detail: '"I want a food delivery app" → Full BRD in 3 seconds',
                isAi: true
              },
              {
                num: '02', icon: ArrowRight, color: '#c084fc',
                title: 'Push Requirements from BRD',
                desc: 'One-click push from your AI-generated BRD directly into the Requirements module. Each functional requirement lands with its priority already set — no manual re-entry.',
                detail: 'BRD → Push All → 6 Requirements Created',
                isAi: true
              },
              {
                num: '03', icon: ListTodo, color: '#e4e4e7',
                title: 'Define Your Requirements',
                desc: 'Fine-tune, add, or manually author requirements. Each gets a priority level — Must-Have, Should-Have, or Nice-to-Have, setting a strong baseline.',
                detail: '"System must calculate geo-tax" -> Must-Have'
              },
              {
                num: '04', icon: GitMerge, color: '#3b82f6',
                title: 'Model Sequence Flows',
                desc: 'Visually map out how your system architecture will handle requests using our built-in Sequence Diagram builder before a single line of code is written.',
                detail: 'Client -> API -> Database -> Return Response'
              },
              {
                num: '05', icon: FlaskConical, color: '#a855f7',
                title: 'Execute Verification Tests',
                desc: 'Create rigid test cases tethered directly to your requirements. Execute them simulating real workflows to ensure exact functionality passes without errors.',
                detail: 'Test #23: Validate Tax Calculation -> PASSED'
              },
              {
                num: '06', icon: Kanban, color: '#f59e0b',
                title: 'Track Bugs via Kanban',
                desc: 'When tests fail, drag and drop bugs directly into the integrated issues tracker. Assign them to your team natively within your workspace environment.',
                detail: 'Move "Timeout Bug" -> In Progress'
              },
              {
                num: '07', icon: Network, color: '#10b981',
                title: 'Trace Everything Back',
                desc: 'Ensure compliance before launch. InitPhase auto-calculates total requirement coverage and instantly alerts you if an original specification was never tested.',
                detail: 'Coverage calculation complete: 100% Ready'
              },
              {
                num: '08', icon: SearchCode, color: '#3b82f6',
                title: 'Analyze Change Impact',
                desc: 'Link your GitHub repo and describe any proposed change. AI scans the codebase, predicts affected files, and estimates engineering hours and cost — before you write a single line.',
                detail: '"Add PayPal" → 4 files affected, ~$800, Medium complexity',
                isAi: true
              }
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="how-it-works-item" style={{ 
                  display: 'flex', gap: '24px', padding: '28px 0', alignItems: 'flex-start'
                }}>
                  {/* Step circle on timeline */}
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#111113', border: `2px solid ${step.color}40`,
                    position: 'relative', zIndex: 1
                  }}>
                    <step.icon size={20} color={step.color} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Step {step.num}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 10px 0', color: '#fafafa' }}>{step.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 14px 0' }}>{step.desc}</p>
                    <div style={{ 
                      display: 'inline-block', padding: '8px 14px', backgroundColor: 'rgba(255,255,255,0.04)', 
                      border: `1px solid ${step.isAi ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '8px',
                      fontFamily: 'monospace', fontSize: '0.8rem', color: '#71717a'
                    }}>
                      {step.detail}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES SECTION ═══════════════ */}
      <section className="section-padding" style={{ 
        padding: 'clamp(48px, 8vw, 100px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        backgroundColor: '#0c0c0e'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
                Features
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                Everything you need, nothing you don't.
              </h2>
            </div>
          </AnimatedSection>

          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { icon: Sparkles, title: 'AI Idea → BRD', desc: 'Paste a rough idea. AI generates a production-ready Business Requirement Document with stakeholders, scope, risks, and success metrics — in seconds.', isAi: true },
              { icon: FileText, title: 'Requirements Manager', desc: 'Capture business needs with custom priority levels. Push directly from AI-generated BRDs or author manually. Structure your exact functional expectations.' },
              { icon: GitMerge, title: 'Visual Sequence Flows', desc: 'Design system interactions via an intuitive UI builder. Auto-renders into beautiful cross-system architectural diagrams.' },
              { icon: FlaskConical, title: 'Test Execution Engine', desc: 'Map dedicated verification tests directly against your requirements. Execute workflows and log specific pass/fail telemetry.' },
              { icon: Network, title: 'Live Traceability Matrix', desc: 'Real-time Analytics Dashboard that calculates test coverage percentages and specifically isolates unverified requirements.' },
              { icon: Kanban, title: 'Integrated Issue Tracker', desc: 'A built-in HTML5 drag-and-drop Kanban board designed for tracking localized sprint tasks, bugs, and enhancements.' },
              { icon: Globe, title: 'GitHub Repo Analyzer', desc: 'Link any public GitHub repo. AI scans the codebase, identifies the tech stack, architecture, and maps important files automatically.', isAi: true },
              { icon: DollarSign, title: 'Change Impact & Cost', desc: 'Describe a change request. AI predicts affected files, estimates engineering hours, and calculates cost — grounded in your actual codebase.', isAi: true },
              { icon: FileDown, title: 'Documentation Export', desc: 'Automated generation of your entire Software Test Document (STD) with visual sequence diagrams, packaged into structured, PDF-ready files.' }
            ].map((f, i) => (
              <AnimatedSection key={i} delay={(i % 3) * 0.08}>
                <div style={{ 
                  padding: '28px', backgroundColor: '#111113', 
                  border: `1px solid ${f.isAi ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.06)'}`, 
                  borderRadius: '14px', transition: 'all 0.3s', cursor: 'default', height: '100%', boxSizing: 'border-box',
                  position: 'relative', overflow: 'hidden'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = f.isAi ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = f.isAi ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <f.icon size={22} color={f.isAi ? '#a855f7' : '#71717a'} style={{ marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-heading)', color: '#e4e4e7' }}>{f.title}</h4>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="section-padding" style={{ 
        padding: 'clamp(60px, 10vw, 100px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
                FAQ
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                Common questions, straight answers.
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      backgroundColor: 'transparent', border: 'none', color: '#e4e4e7', fontSize: '1rem', fontWeight: '600',
                      cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={e => e.currentTarget.style.color = '#e4e4e7'}
                  >
                    <span style={{ paddingRight: '16px' }}>{faq.q}</span>
                    <div style={{ 
                      flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)',
                      transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <ChevronDown size={16} color="#71717a" />
                    </div>
                  </button>
                  <div style={{ 
                    maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s',
                    padding: openFaq === i ? '0 0 20px 0' : '0'
                  }}>
                    <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section style={{ 
        padding: 'clamp(60px, 10vw, 100px) 24px', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px', 
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <AnimatedSection style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', 
            marginBottom: '16px', lineHeight: '1.15', letterSpacing: '-0.03em' 
          }}>
            Ready to build software<br/>the right way?
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.05rem', marginBottom: '36px', lineHeight: '1.6' }}>
            Create a free account and start structuring your project with AI in under 2 minutes.
          </p>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="cta-glow-btn" style={{ 
              padding: '16px 36px', backgroundColor: '#fafafa', color: '#09090b', 
              border: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.25s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Get Started Free <ArrowRight size={18} />
            </button>
          </Link>
          <p style={{ marginTop: '16px', color: '#71717a', fontSize: '0.85rem' }}>
            No credit card required. No limits. AI included.
          </p>
        </AnimatedSection>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="landing-footer" style={{ 
        padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InitPhaseMark size={20} />
            <span style={{ color: '#52525b', fontSize: '0.82rem' }}>&copy; 2026 InitPhase</span>
          </div>
        </div>
        
        <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ color: '#71717a', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            Made with <Heart size={14} color="#ef4444" fill="#ef4444" /> by{' '}
            <a href="https://github.com/RiteshJha912" target="_blank" rel="noopener noreferrer" 
               style={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}
               onMouseOver={e => e.currentTarget.style.color = '#fafafa'}
               onMouseOut={e => e.currentTarget.style.color = '#a1a1aa'}>
              Ritesh Jha
            </a>
          </span>
          <a href="https://github.com/RiteshJha912/InitPhase" target="_blank" rel="noopener noreferrer"
             style={{ 
               color: '#71717a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
               fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s',
               padding: '6px 12px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px'
             }}
             onMouseOver={e => { e.currentTarget.style.color = '#fafafa'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
             onMouseOut={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
            <Github size={14} /> Star on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
