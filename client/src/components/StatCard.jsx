export default function StatCard({
  title,
  value,
  color = "var(--accent-color)",
  icon: Icon,
}) {
  return (
    <div className="app-stat-card saas-stat" style={{ "--stat-accent": color }}>
      <div className="saas-stat-heading">
        <span className="app-stat-title">{title}</span>
        {Icon && (
          <span className="app-stat-icon">
            <Icon size={17} />
          </span>
        )}
      </div>
      <strong className="app-stat-value">{value}</strong>
      <div className="saas-stat-line" aria-hidden="true" />
    </div>
  );
}
