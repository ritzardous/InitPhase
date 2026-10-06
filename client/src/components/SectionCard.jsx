export default function SectionCard({
  title,
  children,
  actions,
  className = "",
  description,
  eyebrow,
}) {
  return (
    <section className={`app-section-card ${className}`}>
      {title && (
        <header className="section-card-header">
          <div>
            {eyebrow && <span className="saas-section-eyebrow">{eyebrow}</span>}
            <h2>{title}</h2>
            {description && (
              <p className="saas-section-description">{description}</p>
            )}
          </div>
          {actions && <div className="saas-section-actions">{actions}</div>}
        </header>
      )}
      <div className="saas-section-body">{children}</div>
    </section>
  );
}
