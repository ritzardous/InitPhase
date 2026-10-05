import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Github,
  FileText,
  GitMerge,
  FlaskConical,
  Network,
  Kanban,
  Globe,
  DollarSign,
  FileDown,
  Check,
  Plus,
  ShieldCheck,
  Zap,
  Terminal,
  Pause,
  Play,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs, features, steps } from "../components/landing/content";
import BrandLogo from "../components/BrandLogo";
import ConnectionAtlas from "../components/landing/ConnectionAtlas";
import "./Landing.css";

const EngineeringScene = lazy(
  () => import("../components/landing/EngineeringScene"),
);
const icons = {
  Sparkles,
  FileText,
  GitMerge,
  FlaskConical,
  Network,
  Kanban,
  Globe,
  DollarSign,
  FileDown,
};
const phases = ["The idea", "The structure", "The confidence"];
gsap.registerPlugin(ScrollTrigger);

function InitPhaseLogo() {
  return <BrandLogo className="ip-logo" />;
}

function WorkspacePreview({ phase }) {
  const views = [
    {
      label: "Idea → BRD",
      title: "A better beginning.",
      subtitle: "From a rough idea to a clear plan.",
      rows: [
        "Executive summary",
        "Stakeholders & scope",
        "Functional requirements",
        "Risks & success metrics",
      ],
    },
    {
      label: "Requirements",
      title: "Every detail, defined.",
      subtitle: "A single source of truth for your project.",
      rows: [
        "Secure user authentication",
        "Product catalog & search",
        "Shopping cart & checkout",
        "Order tracking dashboard",
      ],
    },
    {
      label: "Traceability",
      title: "Ship with confidence.",
      subtitle: "Every requirement connected to its tests.",
      rows: [
        "Authentication → TC-001",
        "Product search → TC-008",
        "Checkout flow → TC-014",
        "Order tracking → TC-021",
      ],
    },
  ];
  const view = views[phase];
  return (
    <div className={`ip-workspace ip-workspace-phase-${phase}`}>
      <div className="ip-window-bar">
        <div className="ip-window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>initphase / workspace</span>
        <span className="ip-example">Example project</span>
      </div>
      <div className="ip-workspace-body">
        <aside>
          <Terminal size={20} />
          <div className="ip-side-line" />
          <Sparkles size={17} />
          <FileText size={17} />
          <FlaskConical size={17} />
          <Network size={17} />
          <Kanban size={17} />
        </aside>
        <div className="ip-preview-content" key={phase}>
          <div className="ip-preview-top">
            <span>
              E-Commerce Platform <span>/ {view.label}</span>
            </span>
            <span className="ip-status">
              <i /> On track
            </span>
          </div>
          <div className="ip-preview-heading">
            <div>
              <h3>{view.title}</h3>
              <p>{view.subtitle}</p>
            </div>
            <span className="ip-preview-icon">
              {phase === 0 ? (
                <Sparkles />
              ) : phase === 1 ? (
                <GitMerge />
              ) : (
                <ShieldCheck />
              )}
            </span>
          </div>
          <div className="ip-preview-demo" aria-live="polite">
            {phase === 0 ? (
              <div className="ip-idea-layout">
                <div className="ip-idea-prompt">
                  <span className="ip-demo-label">
                    <Sparkles size={12} /> THE INITIAL SPARK
                  </span>
                  <p>
                    “A mobile-first commerce platform with secure checkout and
                    live order tracking.”
                  </p>
                  <span className="ip-demo-generated">
                    <Check size={12} /> BRD generated from your idea
                  </span>
                </div>
                <div className="ip-brd-document">
                  <span className="ip-demo-label">
                    <FileText size={12} /> BUSINESS REQUIREMENT DOCUMENT
                  </span>
                  <h4>E-Commerce Platform</h4>
                  <p>
                    A clear foundation for a faster, safer shopping experience.
                  </p>
                  {view.rows.map((row, i) => (
                    <div key={row}>
                      <span>0{i + 1}</span>
                      <strong>{row}</strong>
                      <i />
                    </div>
                  ))}
                </div>
              </div>
            ) : phase === 1 ? (
              <div className="ip-requirement-board">
                {[
                  {
                    label: "MUST-HAVE",
                    color: "purple",
                    items: view.rows.slice(0, 2),
                  },
                  {
                    label: "SHOULD-HAVE",
                    color: "blue",
                    items: [view.rows[2]],
                  },
                  {
                    label: "NICE-TO-HAVE",
                    color: "rose",
                    items: [view.rows[3]],
                  },
                ].map((column) => (
                  <div
                    className={`ip-priority-column ip-priority-${column.color}`}
                    key={column.label}
                  >
                    <header>
                      <i />
                      {column.label}
                      <span>{column.items.length}</span>
                    </header>
                    {column.items.map((item, i) => (
                      <div className="ip-requirement-card" key={item}>
                        <span>
                          REQ-
                          {String(view.rows.indexOf(item) + 1).padStart(3, "0")}
                        </span>
                        <strong>{item}</strong>
                        <p>
                          {
                            [
                              "Clear acceptance criteria",
                              "Linked to your project scope",
                            ][i % 2]
                          }
                        </p>
                        <span>
                          <FileText size={10} /> Defined
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="ip-verification-layout">
                <div className="ip-coverage">
                  <div>
                    <strong>
                      100<span>%</span>
                    </strong>
                    <span>MAPPED COVERAGE</span>
                  </div>
                  <p>
                    <ShieldCheck size={14} /> Every requirement verified
                  </p>
                  <span>4 requirements · 4 linked tests</span>
                </div>
                <div className="ip-verification-links">
                  <div className="ip-demo-label">
                    <span>REQUIREMENT</span>
                    <span>TEST CASE / RESULT</span>
                  </div>
                  {view.rows.map((row) => {
                    const [requirement, test] = row.split(" → ");
                    return (
                      <div className="ip-verification-row" key={row}>
                        <span>{requirement}</span>
                        <i />
                        <span>
                          {test}
                          <Check size={12} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="ip-preview-foot">
            <span>
              <span className="ip-live-dot" /> Everything connected. Nothing
              overlooked.
            </span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const root = useRef(null);
  const [phase, setPhase] = useState(0);
  const [previewPhase, setPreviewPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".ip-hero-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        });
        gsap.from(".ip-hero-art", {
          opacity: 0,
          y: 35,
          duration: 1.3,
          ease: "power3.out",
        });
        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        gsap.to(".ip-hero-art", {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: ".ip-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".ip-scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        });
      },
      root,
    );
    media.add(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".ip-product-stage .ip-workspace",
          { rotationX: 18, rotationY: -8, scale: 0.86, y: 65 },
          {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".ip-product-stage",
              start: "top 85%",
              end: "center 50%",
              scrub: 1,
            },
          },
        );
        gsap.utils.toArray(".ip-chapter-band").forEach((band) =>
          gsap.fromTo(
            band.firstElementChild,
            { x: 0 },
            {
              x: () =>
                Math.min(
                  0,
                  band.clientWidth - band.firstElementChild.scrollWidth,
                ),
              ease: "none",
              scrollTrigger: {
                trigger: band,
                start: "top 90%",
                end: "top 35%",
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            },
          ),
        );
        gsap.utils.toArray(".ip-problem-list > div").forEach((card, i) =>
          gsap.fromTo(
            card,
            { x: 70 + i * 30, rotation: 5 - i * 4 },
            {
              x: 0,
              rotation: 0,
              scrollTrigger: {
                trigger: ".ip-problem",
                start: "top 80%",
                end: "bottom 65%",
                scrub: 1,
              },
            },
          ),
        );
        gsap.fromTo(
          ".ip-ai-signal i",
          { scaleX: 0 },
          {
            scaleX: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".ip-ai-signal",
              start: "top 80%",
              end: "bottom 45%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".ip-atlas-map",
          { scale: 0.9, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: ".ip-atlas",
              start: "top 75%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".ip-launch-rings",
          { scale: 0.65, rotation: -18 },
          {
            scale: 1.2,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".ip-final",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
        gsap.to(".ip-final-watermark", {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".ip-final",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".ip-journey-line-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".ip-journey-steps",
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        });
        gsap.utils.toArray(".ip-step").forEach((element, index) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setPhase(index < 2 ? 0 : index < 4 ? 1 : 2),
            onEnterBack: () => setPhase(index < 2 ? 0 : index < 4 ? 1 : 2),
          });
        });
      },
      root,
    );
    return () => media.revert();
  }, []);

  return (
    <div ref={root} className="ip-landing">
      <a className="ip-skip" href="#main">
        Skip to content
      </a>
      <header className="ip-nav">
        <div className="ip-nav-inner">
          <InitPhaseLogo />
          <nav
            className={`ip-nav-links ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQs
            </a>
            <a
              href="https://github.com/RiteshJha912/InitPhase"
              target="_blank"
              rel="noreferrer"
            >
              Open source <ArrowUpRight size={12} />
            </a>
          </nav>
          <div className="ip-nav-actions">
            <Link className="ip-login" to="/login">
              Log in
            </Link>
            <Link className="ip-button ip-button-small" to="/register">
              Get started <ArrowUpRight size={15} />
            </Link>
            <button
              className="ip-menu-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="ip-scroll-progress" />
      </header>

      <main id="main">
        <section className="ip-hero ip-container">
          <div className="ip-hero-copy">
            <h1>
              From a spark.
              <br />
              To a structure.
              <br />
              <span>To shipped.</span>
            </h1>
            <p className="ip-hero-subtitle">
              AI-powered software engineering.
              <br />
              One connected workspace. Idea to ship.
            </p>
            <p className="ip-hero-description">
              Turn rough ideas into structured BRDs, define requirements, trace
              test execution, diagram sequence flows, and analyze change impact.
              Build with clarity, every step of the way.
            </p>
            <div className="ip-hero-actions">
              <Link className="ip-button" to="/register">
                Start building for free <ArrowUpRight size={18} />
              </Link>
              <a className="ip-text-link" href="#how-it-works">
                Explore the workflow <ArrowDown size={15} />
              </a>
            </div>
            <div className="ip-hero-note">
              <span>
                <Check size={13} /> Free forever
              </span>
              <span>
                <Check size={13} /> No credit card
              </span>
              <span>
                <Check size={13} /> AI included
              </span>
            </div>
          </div>
          <div className="ip-hero-art">
            <div className="ip-art-grid" />
            <div className="ip-art-orbit" />
            <div className="ip-art-caption">
              <span className="ip-live-dot" /> THE CONNECTED ENGINEERING STACK{" "}
              <span>01—03</span>
            </div>
            <Suspense
              fallback={
                <div className="ip-scene">
                  <div className="ip-scene-fallback">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              }
            >
              <EngineeringScene phase={phase} paused={paused} />
            </Suspense>
            <div
              className={`ip-layer-label ip-layer-label-0 ${phase === 0 ? "active" : ""}`}
            >
              <Sparkles size={13} />
              <span>01 / IDEATE</span>
            </div>
            <div
              className={`ip-layer-label ip-layer-label-1 ${phase === 1 ? "active" : ""}`}
            >
              <GitMerge size={13} />
              <span>02 / STRUCTURE</span>
            </div>
            <div
              className={`ip-layer-label ip-layer-label-2 ${phase === 2 ? "active" : ""}`}
            >
              <ShieldCheck size={13} />
              <span>03 / VERIFY</span>
            </div>
            <div className="ip-art-bottom">
              <span>One idea. Every layer connected.</span>
              <button
                aria-label={paused ? "Play 3D motion" : "Pause 3D motion"}
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={13} /> : <Pause size={13} />}
              </button>
            </div>
          </div>
        </section>
        <div className="ip-principles ip-container">
          <span>
            Built for the way
            <br />
            <strong>good software happens.</strong>
          </span>
          <span>
            <Sparkles /> AI-powered
          </span>
          <span>
            <Network /> OOSE principles
          </span>
          <span>
            <Zap /> Free & open source
          </span>
          <span>
            <ShieldCheck /> Secure by design
          </span>
        </div>

        <div className="ip-chapter-band" aria-hidden="true">
          <div>
            IDEA <span>→</span> STRUCTURE <span>→</span> SHIPPED <span>↗</span>
          </div>
        </div>
        <section className="ip-product ip-container">
          <div className="ip-section-top">
            <span className="ip-eyebrow">LESS FRICTION. MORE FORWARD.</span>
            <span className="ip-mini-label">YOUR ENTIRE PROJECT, IN FOCUS</span>
          </div>
          <div className="ip-product-heading">
            <h2>
              Big picture.
              <br />
              <span>Every little detail.</span>
            </h2>
            <p>
              From your first idea to your final test, keep the plan, the
              progress, and the proof in one place.
            </p>
          </div>
          <div
            className="ip-phase-tabs"
            role="group"
            aria-label="Explore workspace preview"
          >
            {phases.map((label, i) => (
              <button
                key={label}
                aria-pressed={previewPhase === i}
                className={previewPhase === i ? "active" : ""}
                onClick={() => setPreviewPhase(i)}
              >
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div className={`ip-product-stage ip-product-stage-${previewPhase}`}>
            <div className="ip-stage-halo" aria-hidden="true" />
            <span className="ip-stage-caption">
              CONNECTED BY DESIGN / BUILT FOR CLARITY
            </span>
            <WorkspacePreview phase={previewPhase} />
            <div className="ip-stage-tags" aria-hidden="true">
              <span>
                <FileText size={13} /> Your plan
              </span>
              <span>
                <GitMerge size={13} /> Your progress
              </span>
              <span>
                <ShieldCheck size={13} /> Your proof
              </span>
            </div>
          </div>
        </section>

        <section className="ip-problem ip-container">
          <div data-reveal>
            <span className="ip-eyebrow">
              THE GAP BETWEEN PLANNED AND BUILT
            </span>
            <h2>
              Great ideas deserve
              <br />
              <span>better than guesswork.</span>
            </h2>
            <p>
              Developers jump straight into coding without documenting
              requirements. Tests are written randomly. There’s no way to know
              if the final product matches what was planned. Sound familiar?
            </p>
          </div>
          <div className="ip-problem-list">
            {[
              [
                "No written requirements",
                "Features are discussed verbally and forgotten. There’s no single source of truth.",
              ],
              [
                "Random testing",
                "Tests are written ad-hoc without linking them back to the actual requirements.",
              ],
              [
                "Zero traceability",
                "No one knows which features have been tested and which are shipping untested.",
              ],
            ].map(([title, desc], i) => (
              <div data-reveal key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <span className="ip-problem-cross">×</span>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="ip-journey ip-container">
          <div className="ip-journey-sticky">
            <span className="ip-eyebrow">A WORKFLOW, NOT A WORKAROUND</span>
            <h2>
              One continuous
              <br />
              <span>line of clarity.</span>
            </h2>
            <p>
              Follow your project from the first brainstorm to the final
              verification. Every decision connects to what comes next.
            </p>
            <div
              className="ip-journey-machine"
              aria-label={`Current workflow phase: ${phases[phase]}`}
            >
              <div className="ip-machine-orbits" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="ip-machine-number">0{phase + 1}</span>
              <strong>{phases[phase]}</strong>
              <div className="ip-machine-stages">
                {phases.map((label, i) => (
                  <span
                    key={label}
                    className={previewPhase === i ? "active" : ""}
                  >
                    <Check size={12} />
                    {label}
                  </span>
                ))}
              </div>
              <span className="ip-machine-caption">
                {
                  [
                    "A rough idea becomes a clear foundation.",
                    "Every requirement finds its place.",
                    "Every test traces back to your plan.",
                  ][phase]
                }
              </span>
            </div>
            <a className="ip-text-link" href="#features">
              Meet your toolkit <ArrowRight size={16} />
            </a>
          </div>
          <div className="ip-journey-steps">
            <div className="ip-journey-line">
              <div className="ip-journey-line-fill" />
            </div>
            {steps.map((step, i) => (
              <article
                className={`ip-step ${phase === (i < 2 ? 0 : i < 4 ? 1 : 2) ? "ip-step-active" : ""}`}
                data-reveal
                key={step.title}
              >
                <span className="ip-step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ip-eyebrow">
                  {i < 2
                    ? "01 / IDEATE"
                    : i < 4
                      ? "02 / STRUCTURE"
                      : "03 / VERIFY & EVOLVE"}
                </span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div
          className="ip-chapter-band ip-chapter-band-light"
          aria-hidden="true"
        >
          <div>
            LESS GUESSWORK <span>↗</span> MORE MOMENTUM <span>↗</span>
          </div>
        </div>
        <section className="ip-ai-section">
          <div className="ip-container">
            <div className="ip-ai-heading" data-reveal>
              <span className="ip-eyebrow">
                <Sparkles size={14} /> AI THAT ACTUALLY HELPS
              </span>
              <h2>
                A head start.
                <br />
                <span>Not a shortcut.</span>
              </h2>
              <p>
                From rough idea to structured BRD. From change request to impact
                report. AI integrated directly into your software engineering
                workflow.
              </p>
            </div>
            <div className="ip-ai-signal" aria-hidden="true">
              <span>YOUR IDEA</span>
              <i />
              <div>
                <Sparkles size={28} />
                <small>INITPHASE AI</small>
              </div>
              <i />
              <span>ACTIONABLE CLARITY</span>
            </div>
            <div className="ip-ai-cards">
              <article data-reveal>
                <span className="ip-ai-icon">
                  <Sparkles />
                </span>
                <span className="ip-eyebrow">THINK IT. STRUCTURE IT.</span>
                <h3>Idea → BRD Generator</h3>
                <p>
                  Paste a rough product idea. AI generates a complete Business
                  Requirement Document — executive summary, stakeholders,
                  functional requirements with priorities, risks, and success
                  metrics.
                </p>
                <div className="ip-brd-illustration">
                  <div>
                    <Terminal size={15} /> “A mobile-first commerce platform…”
                  </div>
                  <span className="ip-ai-connector">↓</span>
                  <div>
                    <FileText size={17} />
                    <span>
                      Business Requirement Document
                      <small>6 requirements · 3 must-have · 2 risks</small>
                    </span>
                    <Check size={15} />
                  </div>
                </div>
                <Link to="/register" className="ip-text-link">
                  Give your idea a foundation <ArrowUpRight size={16} />
                </Link>
              </article>
              <article data-reveal>
                <span className="ip-ai-icon">
                  <Github />
                </span>
                <span className="ip-eyebrow">CHANGE WITH YOUR EYES OPEN.</span>
                <h3>Change Impact Analyzer</h3>
                <p>
                  Link any public GitHub repo. AI scans the architecture, then
                  predicts which files a change request will affect — with
                  complexity rating, estimated hours, and cost analysis.
                </p>
                <div className="ip-impact-illustration">
                  <div>
                    <span>CHANGE REQUEST</span>
                    <strong>Add a payment gateway</strong>
                  </div>
                  <div>
                    <span>4 affected files</span>
                    <span>Medium complexity</span>
                  </div>
                  <div className="ip-file-paths">
                    routes/ → controller/ → model/ → page/
                  </div>
                </div>
                <Link to="/register" className="ip-text-link">
                  Understand the impact first <ArrowUpRight size={16} />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="ip-features ip-container">
          <div className="ip-section-top" data-reveal>
            <div>
              <span className="ip-eyebrow">
                THE WHOLE TOOLKIT. ZERO TOOL-HOPPING.
              </span>
              <h2>
                Everything you need.
                <br />
                <span>Already connected.</span>
              </h2>
            </div>
            <p>
              Nine purposeful modules.
              <br />
              One workspace built for developers
              <br />
              and students who care how they build.
            </p>
          </div>
          <ConnectionAtlas />
          <div className="ip-feature-grid">
            {features.map((feature, i) => {
              const Icon = icons[feature.icon];
              return (
                <article data-reveal key={feature.title}>
                  <div className="ip-feature-top">
                    <Icon size={22} />
                    <span>/{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="faq" className="ip-faq ip-container">
          <div data-reveal>
            <span className="ip-eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
            <h2>
              A little more
              <br />
              <span>clarity.</span>
            </h2>
            <p>
              New to software engineering?
              <br />
              You’re in the right place.
            </p>
            <div className="ip-faq-symbol" aria-hidden="true">
              <span>?</span>
              <i />
              <small>EVERY QUESTION CONNECTS.</small>
            </div>
            <a
              className="ip-text-link"
              href="https://github.com/RiteshJha912/InitPhase"
              target="_blank"
              rel="noreferrer"
            >
              Explore on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="ip-faq-list">
            {faqs.map((faq, i) => (
              <div className="ip-faq-item" key={faq.q}>
                <h3>
                  <button
                    id={`faq-question-${i}`}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <Plus
                      size={18}
                      className={openFaq === i ? "is-open" : ""}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ip-final">
          <div className="ip-final-grid" />
          <div className="ip-launch-rings" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="ip-final-watermark" aria-hidden="true">
            INITPHASE
          </span>
          <div data-reveal>
            <span className="ip-eyebrow">
              <span className="ip-live-dot" /> YOUR NEXT CHAPTER
            </span>
            <h2>
              Great software starts
              <br />
              with a <span>clear first step.</span>
            </h2>
            <p>
              Create a free account and start structuring your project
              <br />
              with AI in under 2 minutes.
            </p>
            <Link className="ip-button" to="/register">
              Let’s build something great <ArrowUpRight size={18} />
            </Link>
            <span className="ip-final-note">
              No credit card required. No limits. AI included.
            </span>
          </div>
        </section>
      </main>
      <footer className="ip-footer ip-container">
        <div>
          <InitPhaseLogo />
          <p>Clarity from idea to ship.</p>
        </div>
        <span>© {new Date().getFullYear()} InitPhase</span>
        <div>
          <a
            href="https://github.com/RiteshJha912"
            target="_blank"
            rel="noreferrer"
          >
            Built by Ritesh Jha <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/RiteshJha912/InitPhase"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> Star on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
