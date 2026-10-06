import { useId, useState } from "react";
import { Info, ChevronDown, ArrowRight } from "lucide-react";
export default function ModuleLayout({
  title,
  description,
  connectionText,
  stats,
  children,
  flowStep,
  dependsOn,
  feedsInto,
  statusBadge,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const helpId = useId();
  return (
    <div className="app-module saas-module">
      <header className="module-header-padding saas-module-header">
        <div className="saas-module-title-row">
          <div>
            <span className="saas-overline">
              {flowStep
                ? `WORKFLOW / STEP ${flowStep}`
                : "YOUR CONNECTED WORKSPACE"}
            </span>
            <h1 className="app-page-title">{title}</h1>
          </div>
          {connectionText && (
            <button
              className="saas-help-button"
              aria-expanded={isOpen}
              aria-controls={helpId}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Info size={15} />
              <span>Module guide</span>
              <ChevronDown size={14} className={isOpen ? "is-open" : ""} />
            </button>
          )}
        </div>
        <p className="saas-module-description">{description}</p>
        {(dependsOn || feedsInto || statusBadge) && (
          <div className="saas-module-meta">
            {dependsOn && (
              <span>
                From <strong>{dependsOn}</strong>
              </span>
            )}
            {feedsInto && (
              <>
                <ArrowRight size={12} />
                <span>
                  To <strong>{feedsInto}</strong>
                </span>
              </>
            )}
            {statusBadge && (
              <span className="saas-module-status">
                <i />
                {statusBadge}
              </span>
            )}
          </div>
        )}
        {connectionText && (
          <div id={helpId} className="saas-module-help" hidden={!isOpen}>
            {connectionText}
          </div>
        )}
      </header>
      <div className="module-padding saas-module-body">
        {stats && <div className="stat-grid saas-metric-grid">{stats}</div>}
        {children}
      </div>
    </div>
  );
}
