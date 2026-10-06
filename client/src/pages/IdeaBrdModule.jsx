import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ModuleLayout from "../components/ModuleLayout";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import FlowCallout from "../components/FlowCallout";
import LoadingState from "../components/LoadingState";
import { useToast } from "../components/useToast";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle,
  FileText,
  Layers,
  LoaderCircle,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

const defaultForm = {
  title: "",
  sourceIdea: "",
  targetUsers: "",
  businessGoals: "",
  constraints: "",
};

const SectionList = ({ items }) => {
  if (!items || items.length === 0)
    return (
      <p style={{ color: "var(--text-tertiary)", margin: 0 }}>Not specified.</p>
    );

  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: "20px",
        color: "var(--text-secondary)",
        lineHeight: 1.7,
      }}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const BrdPreview = ({ brd }) => {
  if (!brd) return null;

  const sections = brd.sections || {};

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <div style={{ display: "grid", gap: "8px" }}>
        <h3
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontSize: "1.35rem",
          }}
        >
          {brd.title}
        </h3>
        <p
          style={{ margin: 0, color: "var(--text-tertiary)", lineHeight: 1.6 }}
        >
          {brd.sourceIdea}
        </p>
      </div>

      {[
        ["Executive Summary", sections.executiveSummary],
        ["Problem Statement", sections.problemStatement],
      ].map(([title, value]) => (
        <div key={title}>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            {title}
          </h4>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {value || "Not specified."}
          </p>
        </div>
      ))}

      <div className="responsive-auto-grid" style={{ gap: "18px" }}>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Business Objectives
          </h4>
          <SectionList items={sections.businessObjectives} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Stakeholders
          </h4>
          <SectionList items={sections.stakeholders} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Scope
          </h4>
          <SectionList items={sections.scope} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Out of Scope
          </h4>
          <SectionList items={sections.outOfScope} />
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", color: "var(--text-primary)" }}>
          Functional Requirements
        </h4>
        {sections.functionalRequirements?.length > 0 ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {sections.functionalRequirements.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                style={{
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </strong>
                  <span
                    style={{
                      color: "var(--accent-color)",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.priority}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-tertiary)", margin: 0 }}>
            No functional requirements generated.
          </p>
        )}
      </div>

      <div className="responsive-auto-grid" style={{ gap: "18px" }}>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Non-Functional Requirements
          </h4>
          <SectionList items={sections.nonFunctionalRequirements} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Risks
          </h4>
          <SectionList items={sections.risks} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Success Metrics
          </h4>
          <SectionList items={sections.successMetrics} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>
            Open Questions
          </h4>
          <SectionList items={sections.openQuestions} />
        </div>
      </div>
    </div>
  );
};

export default function IdeaBrdModule() {
  const {
    projectId,
    fetchBrds: fetchWorkspaceBrds,
    fetchRequirements,
    fetchRtm,
  } = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState(defaultForm);
  const [brds, setBrds] = useState([]);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchBrds = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/api/brds/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBrds(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [projectId, token]);

  useEffect(() => {
    fetchBrds();
  }, [fetchBrds]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/brds/${projectId}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate BRD");
      }

      setDraft(data);
      setMessage(
        "BRD draft generated. Review it, then save it to this project.",
      );
      toast.success(
        "BRD draft generated. Review it, then save it to this project.",
      );
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${apiBase}/api/brds/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draft),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save BRD");
      }

      setDraft(null);
      setForm(defaultForm);
      setMessage("BRD saved to this project.");
      fetchBrds();
      fetchWorkspaceBrds?.(token);
      toast.success(
        "BRD saved. Convert it when you are ready to seed requirements.",
      );
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${apiBase}/api/brds/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete BRD");
      }

      setMessage("BRD deleted.");
      fetchBrds();
      fetchWorkspaceBrds?.(token);
      toast.info("BRD deleted.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleConvert = async (id) => {
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        `${apiBase}/api/brds/${id}/convert-requirements`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to convert requirements");
      }

      setMessage(
        `${data.requirements.length} requirements created from the BRD.`,
      );
      fetchBrds();
      fetchWorkspaceBrds?.(token);
      fetchRequirements(token);
      fetchRtm(token);
      toast.success(
        `${data.requirements.length} requirements created from the BRD.`,
      );
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const stats = useMemo(() => {
    const functionalCount = brds.reduce(
      (total, brd) =>
        total + (brd.sections?.functionalRequirements?.length || 0),
      0,
    );
    const convertedCount = brds.filter(
      (brd) => brd.status === "Converted",
    ).length;

    return { functionalCount, convertedCount };
  }, [brds]);

  return (
    <ModuleLayout
      title="Idea to BRD"
      description="Turn an early product idea into a structured Business Requirement Document that can feed requirements, traceability, and project documentation."
      connectionText={
        "Describe the problem, who it affects, and what a successful solution would do. Add business context to give AI a clearer starting point.\nReview the generated document before saving it. When you are ready, send its functional requirements to the Requirements module."
      }
      flowStep="2 of 8"
      dependsOn="Project idea"
      feedsInto="Requirements and Documentation"
      statusBadge={brds.length > 0 ? `${brds.length} saved` : null}
      stats={
        <>
          <StatCard
            title="Saved BRDs"
            value={brds.length}
            color="var(--accent-color)"
            icon={FileText}
          />
          <StatCard
            title="Generated Requirements"
            value={stats.functionalCount}
            color="var(--warning)"
            icon={Layers}
          />
          <StatCard
            title="Converted BRDs"
            value={stats.convertedCount}
            color="var(--success)"
            icon={CheckCircle}
          />
        </>
      }
    >
      {stats.convertedCount > 0 && (
        <FlowCallout
          tone="success"
          title="BRD requirements are in the workspace"
          message="Review the converted requirements, tune their priority, and continue into testing."
          actionLabel="Review Requirements"
          onAction={() => navigate("../requirements")}
        />
      )}

      {(message || error) && (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${error ? "var(--danger)" : "var(--success)"}`,
            backgroundColor: error ? "var(--danger-bg)" : "var(--success-bg)",
            color: error ? "var(--danger)" : "var(--success)",
            fontWeight: 600,
          }}
        >
          {error || message}
        </div>
      )}

      <SectionCard
        className="saas-brd-studio"
        title="Shape the idea."
        eyebrow="01 / THE STARTING POINT"
        description="A few thoughtful details make a stronger foundation."
      >
        <form onSubmit={handleGenerate} className="saas-brd-form">
          <div className="saas-brd-editor">
            <label htmlFor="brd-idea-title">Give it a name</label>
            <input
              id="brd-idea-title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="AI-powered campus helpdesk"
              required
            />
            <div className="saas-brd-prompt-heading">
              <label htmlFor="brd-source-idea">What are you imagining?</label>
              <span>Write in your own words</span>
            </div>
            <textarea
              id="brd-source-idea"
              value={form.sourceIdea}
              onChange={(event) =>
                updateField("sourceIdea", event.target.value)
              }
              placeholder="Start with the problem. Describe who needs your product, how it should work, and what success looks like…"
              required
              rows={8}
            />
            <div className="saas-brd-editor-foot">
              <span>
                <Sparkles size={12} />
                Clarity starts here.
              </span>
              <span>{form.sourceIdea.length.toLocaleString()} characters</span>
            </div>
          </div>
          <aside className="saas-brd-context" aria-label="Idea context">
            <span className="saas-section-eyebrow">A BETTER BRIEF</span>
            <h3>
              The details
              <br />
              make the difference.
            </h3>
            <p>
              Give the AI a little context. Leave a field blank if you’re still
              figuring it out.
            </p>
            {[
              ["targetUsers", "Who is it for?", "Students, staff, customers…"],
              [
                "businessGoals",
                "What should it achieve?",
                "The outcome that matters most…",
              ],
              [
                "constraints",
                "What are the boundaries?",
                "Budget, timeline, tools…",
              ],
            ].map(([field, label, placeholder]) => (
              <div className="saas-brd-context-field" key={field}>
                <label htmlFor={`brd-${field}`}>
                  {label}
                  <span>optional</span>
                </label>
                <textarea
                  id={`brd-${field}`}
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  placeholder={placeholder}
                  rows={2}
                />
              </div>
            ))}
          </aside>
          <div className="saas-brd-submit">
            <p>A structured draft you can review, refine, and make your own.</p>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle size={16} className="app-spinner" />
              ) : (
                <Wand2 size={16} />
              )}{" "}
              {loading ? "Structuring your BRD…" : "Create my draft"}
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </form>
      </SectionCard>

      {draft && (
        <SectionCard
          title="Generated Draft"
          actions={
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <LoaderCircle
                  size={16}
                  style={{ animation: "spin 1.5s linear infinite" }}
                />
              ) : (
                <Sparkles size={16} />
              )}
              {saving ? "Saving..." : "Save BRD"}
            </Button>
          }
        >
          {loading && (
            <LoadingState
              compact
              title="Structuring your BRD draft"
              message="Reading the idea, shaping sections, and checking risks..."
            />
          )}
          <BrdPreview brd={draft} />
        </SectionCard>
      )}

      <SectionCard
        className="saas-brd-library"
        title="Your foundations."
        eyebrow="02 / THE DOCUMENT LIBRARY"
        description="Saved ideas, ready to become a plan."
        actions={
          <span className="saas-library-count">
            {brds.length} {brds.length === 1 ? "document" : "documents"}
          </span>
        }
      >
        {brds.length === 0 ? (
          <EmptyState
            title="Start from the idea"
            message="No BRDs saved yet. Generate and save your first BRD above, then convert its functional requirements into the project."
            iconName="file-text"
          />
        ) : (
          <div className="saas-brd-documents">
            {brds.map((brd, index) => (
              <article className="saas-brd-document" key={brd._id}>
                <div className="saas-brd-doc-mark" aria-hidden="true">
                  <FileText size={22} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="saas-brd-doc-copy">
                  <div className="saas-brd-doc-meta">
                    <span>
                      {new Date(brd.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {brd.sections?.functionalRequirements?.length || 0}{" "}
                      requirements
                    </span>
                    <span
                      className={`saas-document-status ${brd.status === "Converted" ? "converted" : ""}`}
                    >
                      {brd.status === "Converted" && <CheckCircle size={11} />}{" "}
                      {brd.status}
                    </span>
                  </div>
                  <h3>{brd.title}</h3>
                  <p>{brd.sections?.executiveSummary || brd.sourceIdea}</p>
                </div>
                <div className="saas-brd-doc-actions">
                  {brd.status === "Converted" ? (
                    <span className="saas-brd-linked">
                      <CheckCircle size={13} /> In your workspace
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleConvert(brd._id)}
                    >
                      <BrainCircuit size={14} />
                      Use requirements
                      <ArrowRight size={13} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete BRD ${brd.title}`}
                    onClick={() => handleDelete(brd._id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionCard>
    </ModuleLayout>
  );
}
