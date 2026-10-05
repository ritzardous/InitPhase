export const faqs = [
  {
    q: "What is InitPhase and who is it for?",
    a: "InitPhase is an AI-powered project management workspace designed for developers and students who want to follow Object-Oriented Software Engineering (OOSE) principles. Whether you're building software for a class project or a production app, InitPhase handles everything from turning rough ideas into structured BRDs, all the way through test execution and documentation export.",
  },
  {
    q: "Do I need to know OOSE to use this?",
    a: "Not at all. InitPhase is specifically designed for beginners. The app guides you through each step: brainstorm an idea with AI, define requirements, write test cases, and view your traceability matrix. Each module explains what it does in simple terms.",
  },
  {
    q: "Is this free to use?",
    a: "Yes, InitPhase is completely free — including all AI-powered features. Create an account, start a project, and use all features without any restrictions or paywalls.",
  },
  {
    q: "Can I use this for college assignments and portfolios?",
    a: "Absolutely. InitPhase is perfect for academic projects where you need to demonstrate proper software engineering processes. It helps you create professional documentation that shows structured planning and testing — complete with AI-generated BRDs and exportable PDFs.",
  },
  {
    q: "How does the AI work?",
    a: "InitPhase uses Groq-powered LLMs (Llama 3.1) on the backend. When you submit a rough idea, the AI structures it into a full Business Requirement Document with stakeholders, risks, and functional specs. For Change Impact Analysis, it scans your GitHub repo and predicts which files are affected by a proposed change — including cost estimates. All AI outputs are normalized and validated server-side.",
  },
  {
    q: "Can I connect my GitHub repository?",
    a: "Yes! The Change Impact Analyzer lets you paste any public GitHub repo URL. InitPhase fetches the repo structure, identifies key files (routes, controllers, models, pages), and generates an architecture summary using AI. You can then describe a change request, and it predicts affected files, complexity, and engineering cost.",
  },
  {
    q: "What technologies does InitPhase use?",
    a: "InitPhase is built with React on the frontend, Node.js/Express on the backend, and MongoDB as the database. It uses JWT authentication for secure access, Groq API for AI features, and the GitHub API for repository analysis. Deployed on Vercel and Render.",
  },
];

export const features = [
  {
    icon: "Sparkles",
    title: "AI Idea → BRD",
    desc: "Paste a rough idea. AI generates a production-ready Business Requirement Document with stakeholders, scope, risks, and success metrics — in seconds.",
  },
  {
    icon: "FileText",
    title: "Requirements Manager",
    desc: "Capture business needs with custom priority levels. Push directly from AI-generated BRDs or author manually. Structure your exact functional expectations.",
  },
  {
    icon: "GitMerge",
    title: "Visual Sequence Flows",
    desc: "Design system interactions via an intuitive UI builder. Auto-renders into beautiful cross-system architectural diagrams.",
  },
  {
    icon: "FlaskConical",
    title: "Test Execution Engine",
    desc: "Map dedicated verification tests directly against your requirements. Execute workflows and log specific pass/fail telemetry.",
  },
  {
    icon: "Network",
    title: "Live Traceability Matrix",
    desc: "Real-time Analytics Dashboard that calculates test coverage percentages and specifically isolates unverified requirements.",
  },
  {
    icon: "Kanban",
    title: "Integrated Issue Tracker",
    desc: "A built-in HTML5 drag-and-drop Kanban board designed for tracking localized sprint tasks, bugs, and enhancements.",
  },
  {
    icon: "Globe",
    title: "GitHub Repo Analyzer",
    desc: "Link any public GitHub repo. AI scans the codebase, identifies the tech stack, architecture, and maps important files automatically.",
  },
  {
    icon: "DollarSign",
    title: "Change Impact & Cost",
    desc: "Describe a change request. AI predicts affected files, estimates engineering hours, and calculates cost — grounded in your actual codebase.",
  },
  {
    icon: "FileDown",
    title: "Documentation Export",
    desc: "Automated generation of your entire Software Test Document (STD) with visual sequence diagrams, packaged into structured, PDF-ready files.",
  },
];

export const steps = [
  {
    title: "Brainstorm with AI",
    desc: "Describe your rough product idea in plain language. AI transforms it into a structured Business Requirement Document with stakeholders, scope, risks, and prioritized functional requirements.",
  },
  {
    title: "Push Requirements from BRD",
    desc: "One-click push from your AI-generated BRD directly into the Requirements module. Each functional requirement lands with its priority already set — no manual re-entry.",
  },
  {
    title: "Define Your Requirements",
    desc: "Fine-tune, add, or manually author requirements. Each gets a priority level — Must-Have, Should-Have, or Nice-to-Have, setting a strong baseline.",
  },
  {
    title: "Model Sequence Flows",
    desc: "Visually map out how your system architecture will handle requests using our built-in Sequence Diagram builder before a single line of code is written.",
  },
  {
    title: "Execute Verification Tests",
    desc: "Create rigid test cases tethered directly to your requirements. Execute them simulating real workflows to ensure exact functionality passes without errors.",
  },
  {
    title: "Track Bugs via Kanban",
    desc: "When tests fail, drag and drop bugs directly into the integrated issues tracker. Assign them to your team natively within your workspace environment.",
  },
  {
    title: "Trace Everything Back",
    desc: "Ensure compliance before launch. InitPhase auto-calculates total requirement coverage and instantly alerts you if an original specification was never tested.",
  },
  {
    title: "Analyze Change Impact",
    desc: "Link your GitHub repo and describe any proposed change. AI scans the codebase, predicts affected files, and estimates engineering hours and cost — before you write a single line.",
  },
];
