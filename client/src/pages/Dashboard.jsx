import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import BrandLogo from "../components/BrandLogo";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Search,
  LayoutGrid,
  List,
  FolderOpen,
  Layers,
  Sparkles,
  ShieldCheck,
  Edit3,
  Trash2,
  Save,
  X,
  LogOut,
  Github,
  Clock,
  LoaderCircle,
} from "lucide-react";
import "../styles/Workspace.css";

const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
const dateValue = (project) =>
  Date.parse(project.updatedAt || project.createdAt) || 0;
function projectDate(project) {
  const value = dateValue(project);
  return value
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
        value,
      )
    : "Ready to build";
}
export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState("grid");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const createButton = useRef(null);
  const creationPanel = useRef(null);
  const fetchProjects = useCallback(
    async (token) => {
      try {
        const res = await fetch(`${api}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (!res.ok)
          throw new Error("Could not load your projects. Please try again.");
        setProjects(await res.json());
        setError("");
      } catch (err) {
        setError(err.message || "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    void Promise.resolve().then(() => fetchProjects(token));
  }, [navigate, fetchProjects]);
  useEffect(() => {
    if (showForm) {
      creationPanel.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      });
      creationPanel.current
        ?.querySelector("input")
        ?.focus({ preventScroll: true });
    }
  }, [showForm]);
  function closeForm() {
    setShowForm(false);
    createButton.current?.focus();
  }
  async function handleCreateProject(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(`${api}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not create project.");
      navigate(`/projects/${data._id}/idea-brd`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function handleUpdateProject(event, id) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(`${api}/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: editName.trim(),
          description: editDescription.trim(),
        }),
      });
      if (!res.ok)
        throw new Error("Could not update project. Please try again.");
      setEditingProjectId(null);
      await fetchProjects(localStorage.getItem("token"));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function handleDeleteProject(id) {
    if (
      !window.confirm(
        "Delete this project and all its data? This cannot be undone.",
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${api}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok)
        throw new Error("Could not delete project. Please try again.");
      await fetchProjects(localStorage.getItem("token"));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  const filtered = projects
    .filter((project) =>
      `${project.name} ${project.description || ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : dateValue(b) - dateValue(a),
    );
  const recentlyUpdated = projects.filter(
    (project) => dateValue(project) > Date.now() - 7 * 86400000,
  ).length;
  function startProject() {
    setShowForm(true);
    setError("");
    setName("");
    setDescription("");
  }
  return (
    <div className="saas-dashboard saas-ui">
      <aside className="saas-home-sidebar" aria-label="Application navigation">
        <BrandLogo to="/dashboard" />
        <span className="saas-nav-caption">WORKSPACE</span>
        <a
          href="#projects"
          className="saas-home-link active"
          aria-current="page"
        >
          <FolderOpen size={18} />
          All projects<span>{projects.length}</span>
        </a>
        <button className="saas-home-link" onClick={startProject}>
          <Plus size={18} />
          Create project
        </button>
        <div className="saas-sidebar-tip">
          <Sparkles size={20} />
          <h3>Start with a spark.</h3>
          <p>Turn your next idea into a clear plan with AI.</p>
          <button onClick={startProject}>
            Build something new <ArrowRight size={14} />
          </button>
        </div>
        <div className="saas-home-bottom">
          <a
            href="https://github.com/ritzardous/InitPhase"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            Open source <ArrowUpRight size={12} />
          </a>
          <div className="saas-account">
            <span>IP</span>
            <div>
              <strong>Your workspace</strong>
              <small>Free plan · AI included</small>
            </div>
            <button
              aria-label="Log out"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
      <div className="saas-dashboard-main">
        <header className="saas-topbar">
          <div className="saas-desktop-breadcrumb">
            <Layers size={15} />
            <span>Workspace</span>
            <span>/</span>
            <strong>All projects</strong>
          </div>
          <div className="saas-mobile-brand">
            <BrandLogo to="/dashboard" />
          </div>
          <div className="saas-topbar-right">
            <span className="saas-plan">
              <ShieldCheck size={13} />
              Free plan
            </span>
            <button
              className="saas-icon-button saas-mobile-logout"
              aria-label="Log out"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut size={17} />
            </button>
          </div>
        </header>
        <main className="saas-dashboard-content" id="projects">
          <div className="saas-page-heading">
            <div>
              <span className="saas-overline">YOUR IDEAS, IN MOTION</span>
              <h1>
                Your projects<span>.</span>
              </h1>
              <p>A clear home for everything you’re building.</p>
            </div>
            <Button
              onClick={() => (showForm ? closeForm() : startProject())}
              disabled={busy}
              aria-expanded={showForm}
              aria-controls="new-project-form"
              ref={createButton}
            >
              <Plus size={16} />
              {showForm ? "Close form" : "New project"}
            </Button>
          </div>
          <div className="saas-project-summary">
            <div>
              <span>
                <FolderOpen size={16} />
                Projects
              </span>
              <strong>{loading ? "—" : projects.length}</strong>
            </div>
            <div>
              <span>
                <Clock size={16} />
                Updated this week
              </span>
              <strong>{loading ? "—" : recentlyUpdated}</strong>
            </div>
            <div>
              <span>
                <Sparkles size={16} />
                Your toolkit
              </span>
              <strong>
                9 <small>connected modules</small>
              </strong>
            </div>
          </div>
          {error && (
            <div className="saas-error" role="alert">
              {error}
              {!busy && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => fetchProjects(localStorage.getItem("token"))}
                >
                  Retry
                </Button>
              )}
            </div>
          )}
          {showForm && (
            <section
              className="saas-create-panel"
              id="new-project-form"
              ref={creationPanel}
              aria-labelledby="create-project-title"
            >
              <div>
                <span className="saas-project-symbol">
                  <Sparkles size={22} />
                </span>
                <h2 id="create-project-title">Give your idea a home.</h2>
                <p>You can refine the details as you go.</p>
              </div>
              <form onSubmit={handleCreateProject}>
                <label htmlFor="project-name">Project name</label>
                <input
                  id="project-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E-Commerce Platform"
                  required
                  maxLength={200}
                />
                <label htmlFor="project-description">
                  Description <span>optional</span>
                </label>
                <textarea
                  id="project-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What are you planning to build?"
                  rows={2}
                />
                <div className="saas-form-actions">
                  <Button type="button" variant="ghost" onClick={closeForm} disabled={busy}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={busy || !name.trim()}>
                    {busy ? (
                      <LoaderCircle size={15} className="app-spinner" />
                    ) : (
                      <ArrowRight size={15} />
                    )}
                    Create project
                  </Button>
                </div>
              </form>
            </section>
          )}
          <section aria-label="Your projects">
            <div className="saas-project-toolbar">
              <label className="saas-search">
                <Search size={17} />
                <input
                  aria-label="Search projects"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects…"
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
              <div className="saas-project-controls">
                <select
                  aria-label="Sort projects"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="recent">Recently updated</option>
                  <option value="name">Name A–Z</option>
                </select>
                <div
                  className="saas-view-toggle"
                  role="group"
                  aria-label="Project view"
                >
                  <button
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="saas-project-count" role="status">
              {loading
                ? "Loading your workspace…"
                : `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}${query ? " found" : ""}`}
            </div>
            {loading ? (
              <div
                className="saas-projects-grid"
                aria-label="Loading projects"
                aria-busy="true"
              >
                {[0, 1, 2].map((i) => (
                  <div className="saas-skeleton" key={i}>
                    <i />
                    <i />
                    <i />
                  </div>
                ))}
              </div>
            ) : filtered.length ? (
              <div
                className={`saas-projects-grid ${view === "list" ? "is-list" : ""}`}
              >
                {filtered.map((project) => (
                  <article className="saas-project" key={project._id}>
                    {editingProjectId === project._id ? (
                      <form
                        className="saas-edit-form"
                        onSubmit={(e) => handleUpdateProject(e, project._id)}
                      >
                        <label htmlFor={`edit-${project._id}`}>
                          Project name
                        </label>
                        <input
                          id={`edit-${project._id}`}
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                        />
                        <label htmlFor={`desc-${project._id}`}>
                          Description
                        </label>
                        <textarea
                          id={`desc-${project._id}`}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={2}
                        />
                        <div className="saas-form-actions">
                          <Button
                            size="sm"
                            type="button"
                            variant="ghost"
                            disabled={busy}
                            onClick={() => setEditingProjectId(null)}
                          >
                            <X size={14} />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            type="submit"
                            disabled={busy || !editName.trim()}
                          >
                            <Save size={14} />
                            Save
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="saas-project-top">
                          <span className="saas-project-symbol">
                            {project.name.charAt(0).toUpperCase()}
                          </span>
                          <div className="saas-project-actions">
                            <button
                              className="saas-icon-button"
                              aria-label={`Edit ${project.name}`}
                              disabled={busy}
                              onClick={() => {
                                setEditingProjectId(project._id);
                                setEditName(project.name);
                                setEditDescription(project.description || "");
                              }}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              className="saas-icon-button saas-delete"
                              aria-label={`Delete ${project.name}`}
                              disabled={busy}
                              onClick={() => handleDeleteProject(project._id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                        <div className="saas-project-info">
                          <h2>
                            <Link to={`/projects/${project._id}/overview`}>
                              {project.name}
                            </Link>
                          </h2>
                          <p>
                            {project.description ||
                              "Your next great build starts with a clear plan."}
                          </p>
                          <span>
                            <Clock size={12} />
                            {dateValue(project)
                              ? `Updated ${projectDate(project)}`
                              : projectDate(project)}
                          </span>
                        </div>
                        <Link
                          className="saas-open-project"
                          to={`/projects/${project._id}/overview`}
                        >
                          <span>Open workspace</span>
                          <ArrowUpRight size={17} />
                        </Link>
                      </>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="saas-onboarding">
                <div className="saas-empty-illustration" aria-hidden="true">
                  <i />
                  <FolderOpen size={34} />
                  <i />
                </div>
                <h2>
                  {query
                    ? "No matching projects"
                    : "Your next great build starts here."}
                </h2>
                <p>
                  {query
                    ? "Try a different name or description."
                    : "Create a project, shape your idea, and connect every step from plan to release."}
                </p>
                <Button onClick={query ? () => setQuery("") : startProject}>
                  {query ? (
                    "Clear search"
                  ) : (
                    <>
                      <Plus size={16} />
                      Create your first project
                    </>
                  )}
                </Button>
                {!query && (
                  <div className="saas-onboarding-steps">
                    <span>
                      <Sparkles size={15} />
                      01 / Shape your idea
                    </span>
                    <span>
                      <Layers size={15} />
                      02 / Define your plan
                    </span>
                    <span>
                      <ShieldCheck size={15} />
                      03 / Ship with confidence
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
