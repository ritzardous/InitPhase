import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  FileText,
  FlaskConical,
  GitMerge,
  LayoutDashboard,
  ListTodo,
  Menu,
  MoreHorizontal,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Network,
  SearchCode,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import BrandLogo from "../components/BrandLogo";
import "../styles/Workspace.css";

function CompletionBadge({ complete }) {
  return (
    <span
      style={{
        marginLeft: "auto",
        color: complete ? "var(--success)" : "var(--text-tertiary)",
        display: "inline-flex",
      }}
    >
      {complete ? <CheckCircle2 size={15} /> : <Circle size={13} />}
    </span>
  );
}

export default function ProjectWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );
  const menuButtonRef = useRef(null);
  const drawerTriggerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const updateViewport = (event) => setIsCompact(event.matches);
    const closeWithEscape = (event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    media.addEventListener("change", updateViewport);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      media.removeEventListener("change", updateViewport);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen && isCompact) {
      document.querySelector(".saas-drawer-close")?.focus();
    } else if (drawerTriggerRef.current) {
      drawerTriggerRef.current.focus();
      drawerTriggerRef.current = null;
    }
  }, [isMobileMenuOpen, isCompact]);

  // Close mobile menu and scroll content to top on route change
  useEffect(() => {
    void Promise.resolve().then(() => {
      setIsMobileMenuOpen(false);
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: "instant" });
      }
    });
  }, [location.pathname]);

  // Data states
  const [requirements, setRequirements] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [rtmData, setRtmData] = useState([]);
  const [coveragePct, setCoveragePct] = useState(0);
  const [sequenceFlows, setSequenceFlows] = useState([]);
  const [issues, setIssues] = useState([]);
  const [brds, setBrds] = useState([]);

  const fetchProject = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else {
          setError("Failed to load project or unauthorized.");
        }
      } catch {
        setError("Error connecting to server.");
      }
    },
    [id],
  );

  const fetchRtm = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/rtm/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setRtmData(data.rtmData);
          setCoveragePct(data.overallCoveragePercentage);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  const fetchRequirements = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/requirements/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setRequirements(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  const fetchTestCases = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/testcases/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setTestCases(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  const fetchSequenceFlows = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/sequence/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setSequenceFlows(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  const fetchIssues = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/issues/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setIssues(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  const fetchBrds = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/brds/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setBrds(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [id],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    void Promise.resolve().then(() => {
      fetchProject(token);
      fetchRequirements(token);
      fetchTestCases(token);
      fetchRtm(token);
      fetchSequenceFlows(token);
      fetchIssues(token);
      fetchBrds(token);
    });
  }, [
    id,
    navigate,
    fetchProject,
    fetchRequirements,
    fetchTestCases,
    fetchRtm,
    fetchSequenceFlows,
    fetchIssues,
    fetchBrds,
  ]);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "var(--bg-base)",
        }}
      >
        <p
          style={{
            color: "var(--danger)",
            fontSize: "1.25rem",
            marginBottom: "16px",
          }}
        >
          {error}
        </p>
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!project) {
    return (
      <LoadingState
        title="Connecting to Workspace Core"
        message="Warming up the project flow..."
      />
    );
  }

  const openIssues = issues.filter((issue) => issue.status === "Open").length;
  const criticalIssues = issues.filter(
    (issue) =>
      issue.priority === "Critical" &&
      issue.status !== "Resolved" &&
      issue.status !== "Closed",
  ).length;
  const lifecycleSteps = [
    { key: "overview", label: "Overview", complete: true },
    { key: "idea-brd", label: "BRD", complete: brds.length > 0 },
    {
      key: "requirements",
      label: "Requirements",
      complete: requirements.length > 0,
    },
    { key: "sequence", label: "Flows", complete: sequenceFlows.length > 0 },
    { key: "testcases", label: "Tests", complete: testCases.length > 0 },
    {
      key: "issues",
      label: "Issues",
      complete: openIssues === 0 && criticalIssues === 0,
    },
    {
      key: "rtm",
      label: "Coverage",
      complete: coveragePct === 100 && requirements.length > 0,
    },
    {
      key: "documentation",
      label: "Docs",
      complete: requirements.length > 0 && coveragePct === 100,
    },
  ];
  const completedSteps = lifecycleSteps.filter((step) => step.complete).length;
  const healthLabel =
    criticalIssues > 0
      ? `${criticalIssues} critical blocker${criticalIssues === 1 ? "" : "s"}`
      : coveragePct === 100 && requirements.length > 0
        ? "Ready for docs"
        : `${coveragePct}% covered`;

  const navLinkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
    backgroundColor: isActive ? "var(--bg-card-hover)" : "transparent",
    textDecoration: "none",
    fontWeight: isActive ? "600" : "500",
    borderLeft: isActive
      ? "4px solid var(--accent-color)"
      : "4px solid transparent",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    transition: "all 0.2s ease-in-out",
    margin: "4px 16px 4px 0",
    borderRadius: "0 var(--radius-md) var(--radius-md) 0",
    width: "calc(100% - 16px)",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    outline: "none",
  });

  const navItems = [
    {
      key: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      badge: <CompletionBadge complete />,
    },
    {
      key: "idea-brd",
      label: "Idea to BRD",
      icon: Sparkles,
      badge: <CompletionBadge complete={brds.length > 0} />,
    },
    {
      key: "requirements",
      label: "Requirements",
      icon: ListTodo,
      badge: <CompletionBadge complete={requirements.length > 0} />,
    },
    {
      key: "sequence",
      label: "Sequence Flow",
      icon: GitMerge,
      badge: <CompletionBadge complete={sequenceFlows.length > 0} />,
    },
    {
      key: "testcases",
      label: "Test Execution",
      icon: FlaskConical,
      badge: <CompletionBadge complete={testCases.length > 0} />,
    },
    {
      key: "issues",
      label: "Issues",
      icon: Ticket,
      badge: (
        <CompletionBadge complete={openIssues === 0 && criticalIssues === 0} />
      ),
    },
    {
      key: "rtm",
      label: "Traceability",
      icon: Network,
      badge: (
        <CompletionBadge
          complete={coveragePct === 100 && requirements.length > 0}
        />
      ),
    },
    { key: "change-impact", label: "Change Impact", icon: SearchCode },
    {
      key: "documentation",
      label: "Documentation",
      icon: FileText,
      badge: (
        <CompletionBadge
          complete={requirements.length > 0 && coveragePct === 100}
        />
      ),
    },
  ];

  return (
    <div
      className="workspace-shell saas-ui"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <nav
        className="responsive-nav app-nav saas-workspace-topbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 32px",
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-color)",
          color: "var(--text-primary)",
          height: "64px",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            ref={menuButtonRef}
            className="hamburger-btn"
            aria-label={
              isMobileMenuOpen
                ? "Close workspace navigation"
                : "Open workspace navigation"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="workspace-navigation"
            onClick={(event) => {
              drawerTriggerRef.current = event.currentTarget;
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <BrandLogo to="/dashboard" />
        </div>
        <div className="saas-workspace-breadcrumb">
          <span className="saas-project-mini">
            <Layers size={15} />
          </span>
          <span>{project.name}</span>
          <ChevronRight size={13} />
          <strong>
            {navItems.find((item) => location.pathname.endsWith("/" + item.key))
              ?.label || "Overview"}
          </strong>
        </div>
        <div className="saas-workspace-top-actions">
          <span className="saas-health" data-blocked={criticalIssues > 0}>
            <i />
            {healthLabel}
          </span>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Back to projects"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={15} />
            <span className="hide-on-mobile">All projects</span>
          </Button>
        </div>
      </nav>

      <div
        className="workspace-layout"
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Left vertical sidebar */}
        <aside
          id="workspace-navigation"
          aria-label="Workspace navigation"
          inert={isCompact && !isMobileMenuOpen ? true : undefined}
          className={`workspace-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
          style={{
            width: "280px",
            backgroundColor: "var(--bg-surface)",
            borderRight: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            paddingTop: "32px",
            zIndex: 50,
          }}
        >
          <div className="saas-project-switcher">
            <span className="saas-project-symbol">
              {project.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <strong>{project.name}</strong>
              <small>Project workspace</small>
            </div>
            <button
              className="saas-drawer-close saas-icon-button"
              aria-label="Close workspace navigation"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <X size={17} />
            </button>
          </div>
          <div className="saas-nav-caption">PROJECT OVERVIEW</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.key === "overview"
                ? location.pathname.endsWith("/overview") ||
                  location.pathname.endsWith(`/${id}`) ||
                  location.pathname.endsWith(`/${id}/`)
                : location.pathname.includes(`/${item.key}`);

            return (
              <div className="saas-nav-item-wrap" key={item.key}>
                {item.key === "idea-brd" && (
                  <div className="saas-nav-caption">PLAN & DESIGN</div>
                )}
                {item.key === "testcases" && (
                  <div className="saas-nav-caption">VERIFY & IMPROVE</div>
                )}
                {item.key === "documentation" && (
                  <div className="saas-nav-caption">HANDOFF</div>
                )}
                <button
                  key={item.key}
                  type="button"
                  onClick={() => navigate(item.key)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link-item ${isActive ? "active" : ""}`}
                  style={navLinkStyle(isActive)}
                >
                  <Icon size={20} className="module-icon" />
                  <span>{item.label}</span>
                  {item.badge}
                </button>
              </div>
            );
          })}
          <div className="saas-sidebar-progress">
            <div>
              <span>Workflow progress</span>
              <strong>
                {completedSteps}/{lifecycleSteps.length}
              </strong>
            </div>
            <progress
              value={completedSteps}
              max={lifecycleSteps.length}
              aria-label="Workflow progress"
            />
            <p>Every step brings your project into focus.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className="workspace-main"
          inert={isCompact && isMobileMenuOpen ? true : undefined}
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "var(--bg-base)",
          }}
        >
          <details className="saas-workflow-disclosure">
            <summary>
              <span>Project path</span>
              <span>
                {completedSteps} of {lifecycleSteps.length} steps complete
              </span>
              <ChevronDown size={14} />
            </summary>
            <div
              className="workspace-flow-strip"
              aria-label="Project workflow"
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-surface)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                overflowX: "auto",
              }}
            >
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                Flow {completedSteps}/{lifecycleSteps.length}
              </div>
              {lifecycleSteps.map((step, index) => (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => navigate(step.key)}
                  aria-current={
                    location.pathname.endsWith("/" + step.key)
                      ? "page"
                      : undefined
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 10px",
                    borderRadius: "999px",
                    border: `1px solid ${step.complete ? "rgba(16, 185, 129, 0.45)" : "var(--border-color)"}`,
                    backgroundColor: step.complete
                      ? "var(--success-bg)"
                      : "var(--bg-card)",
                    color: step.complete
                      ? "var(--success)"
                      : "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.complete ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Circle size={12} />
                  )}
                  {index + 1}. {step.label}
                </button>
              ))}
            </div>
          </details>
          <Outlet
            context={{
              projectId: id,
              project,
              brds,
              fetchBrds,
              requirements,
              fetchRequirements,
              testCases,
              fetchTestCases,
              rtmData,
              fetchRtm,
              coveragePct,
              sequenceFlows,
              fetchSequenceFlows,
              issues,
              fetchIssues,
            }}
          />
        </main>
      </div>
      <nav
        className="saas-mobile-tabs"
        aria-label="Quick workspace navigation"
        inert={isCompact && isMobileMenuOpen ? true : undefined}
      >
        {[
          { key: "overview", label: "Overview", icon: LayoutDashboard },
          { key: "requirements", label: "Plan", icon: ListTodo },
          { key: "testcases", label: "Tests", icon: FlaskConical },
          { key: "issues", label: "Issues", icon: Ticket },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              aria-current={
                location.pathname.endsWith("/" + item.key) ? "page" : undefined
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          aria-label="More workspace modules"
          aria-expanded={isMobileMenuOpen}
          aria-controls="workspace-navigation"
          onClick={(event) => {
            drawerTriggerRef.current = event.currentTarget;
            setIsMobileMenuOpen(true);
          }}
        >
          <MoreHorizontal size={20} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
