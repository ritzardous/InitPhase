import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

export default function BrandLogo({ to = "/", className = "" }) {
  return (
    <Link
      className={`brand-logo ${className}`}
      to={to}
      aria-label="InitPhase home"
    >
      <span className="brand-logo-mark">
        <Terminal size={21} aria-hidden="true" />
      </span>
      <span>
        InitPhase<span className="brand-logo-dot">.</span>
      </span>
    </Link>
  );
}
