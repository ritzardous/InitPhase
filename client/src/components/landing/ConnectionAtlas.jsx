import { useState } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { features } from "./content";

// Requirements, tests and decisions radiate from the same project source.
export default function ConnectionAtlas() {
  const [active, setActive] = useState(0);
  return (
    <div className="ip-atlas">
      <div className="ip-atlas-map">
        <svg
          viewBox="0 0 900 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="atlas-glow">
              <stop stopColor="#c0a6ff" stopOpacity=".25" />
              <stop offset="1" stopColor="#c0a6ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="450"
            cy="220"
            rx="230"
            ry="200"
            fill="url(#atlas-glow)"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x = i < 5 ? 110 : 790;
            const y = i < 5 ? 44 + i * 88 : 55 + (i - 5) * 110;
            return (
              <path
                key={i}
                className={active === i ? "active" : ""}
                d={`M450 220 C ${x < 450 ? 300 : 600} 220 ${x < 450 ? 300 : 600} ${y} ${x} ${y}`}
              />
            );
          })}
          <circle cx="450" cy="220" r="94" />
          <circle cx="450" cy="220" r="132" />
        </svg>
        <div className="ip-atlas-core">
          <Terminal size={30} />
          <strong>
            One source.
            <br />
            Every connection.
          </strong>
          <span>INITPHASE / CORE</span>
        </div>
        {features.map((feature, i) => (
          <button
            key={feature.title}
            className={`ip-atlas-node ${active === i ? "active" : ""}`}
            style={{
              "--node-top": `${i < 5 ? 10 + i * 20 : 12.5 + (i - 5) * 25}%`,
              "--node-side": i < 5 ? "left" : "right",
            }}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {feature.title}
            <ArrowUpRight size={13} />
          </button>
        ))}
      </div>
      <div className="ip-atlas-detail" aria-live="polite">
        <span className="ip-eyebrow">
          CONNECTED MODULE / {String(active + 1).padStart(2, "0")}
        </span>
        <h3>{features[active].title}</h3>
        <p>{features[active].desc}</p>
      </div>
    </div>
  );
}
