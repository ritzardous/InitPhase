import { lazy, Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import Button from "./Button";
import "./AuthPage.css";
const EngineeringScene = lazy(() => import("./landing/EngineeringScene"));

export default function AuthPage({ register = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/${register ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            register ? { name, email, password } : { email, password },
          ),
        },
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(
          data.message ||
            (register
              ? "Registration failed. Please try again."
              : "Invalid email or password."),
        );
      }
    } catch {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-nav">
        <BrandLogo />
        <Link to="/" className="auth-back">
          <ArrowLeft size={15} /> Back to home
        </Link>
      </header>
      <main className="auth-layout">
        <section className="auth-story" aria-label="Build with clarity">
          <span className="app-eyebrow">
            <span className="brand-live-dot" /> CLARITY FROM IDEA TO SHIP
          </span>
          <h2>
            Every great build
            <br />
            starts with
            <br />
            <span>a clear beginning.</span>
          </h2>
          <p>
            Turn your rough idea into a structured plan.
            <br />
            Keep every requirement, test, and decision connected.
          </p>
          <div className="auth-engine" aria-hidden="true">
            <div className="auth-engine-orbit" />
            <Suspense
              fallback={
                <div className="auth-engine-loading">
                  Connecting your workspace...
                </div>
              }
            >
              <EngineeringScene phase={register ? 0 : 2} paused />
            </Suspense>
            <span className="auth-engine-label auth-engine-label-a">
              01 / YOUR IDEA
            </span>
            <span className="auth-engine-label auth-engine-label-b">
              02 / YOUR FOUNDATION
            </span>
            <span className="auth-engine-label auth-engine-label-c">
              03 / YOUR NEXT RELEASE
            </span>
          </div>
          <div className="auth-benefits">
            <span>
              <Check size={13} /> Free forever
            </span>
            <span>
              <Check size={13} /> Open source
            </span>
            <span>
              <Check size={13} /> AI included
            </span>
          </div>
        </section>
        <section className="auth-form-panel" aria-labelledby="auth-title">
          <span className="app-eyebrow">
            {register ? "BEGIN SOMETHING GREAT" : "YOUR WORKSPACE IS READY"}
          </span>
          <h1 id="auth-title">
            {register ? "Make it happen." : "Welcome back."}
          </h1>
          <p className="auth-description">
            {register
              ? "Create your free InitPhase account. Great software awaits."
              : "Sign into InitPhase. Bring your next great build into focus."}
          </p>
          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="auth-form">
            {register && (
              <div className="auth-field">
                <label htmlFor="auth-name">Full name</label>
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <div className="auth-password">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={register ? "new-password" : "current-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    register ? "Create a password" : "Enter your password"
                  }
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="auth-submit">
              {loading ? (
                <>
                  <LoaderCircle size={17} className="app-spinner" />
                  {register ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>
                  {register ? "Start building for free" : "Sign in"}
                  <ArrowUpRight size={17} />
                </>
              )}
            </Button>
          </form>
          <p className="auth-switch">
            {register ? "Already have an account?" : "New to InitPhase?"}{" "}
            <Link to={register ? "/login" : "/register"}>
              {register ? "Log in" : "Create one free"}
              <ArrowUpRight size={12} />
            </Link>
          </p>
          <div className="auth-footnote">
            <span className="brand-live-dot" /> One workspace. Every layer
            connected.
          </div>
        </section>
      </main>
      <footer className="auth-footer">
        <span>© {new Date().getFullYear()} InitPhase</span>
        <span>Build with purpose. Ship with confidence.</span>
      </footer>
    </div>
  );
}
