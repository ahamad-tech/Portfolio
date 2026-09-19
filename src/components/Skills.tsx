import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  FileCode2,
  ShieldCheck,
  Palette,
  Server,
  Cpu,
  Code,
  Database,
  GitBranch,
  Send,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Terminal,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  categoryLabel: string;
  level: string;
  icon: React.ReactNode;
  description: string;
  highlight: string;
  appliedIn: string;
  accentColor: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    level: "Core Specialization",
    icon: <Layers className="w-5 h-5 text-[#2F58CD]" />,
    description:
      "Component-driven single-page architecture, custom hooks, dynamic state machines, and optimized rendering lifecycles.",
    highlight: "Modular Component Systems & Hooks",
    appliedIn: "Tamilsolai Academy, Gold Loan Manager",
    accentColor: "#2F58CD",
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    level: "Core Foundation",
    icon: <FileCode2 className="w-5 h-5 text-[#D97706]" />,
    description:
      "Asynchronous programming (Promises, async/await), DOM tree manipulation, closure patterns, and functional utilities.",
    highlight: "Async Event Loops & Modern Syntax",
    appliedIn: "Client-side filtering & interaction engines",
    accentColor: "#D97706",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    level: "Type Safety",
    icon: <ShieldCheck className="w-5 h-5 text-[#3178C6]" />,
    description:
      "Static type definitions, strict interfaces, generics, and compile-time contract enforcement across component layers.",
    highlight: "Strict Interfaces & Scalable Contracts",
    appliedIn: "Modern portfolio & enterprise prototypes",
    accentColor: "#3178C6",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    level: "Design System",
    icon: <Palette className="w-5 h-5 text-[#06B6D4]" />,
    description:
      "Utility-first responsive layouts, flex/grid systems, custom design tokens, fluid typography, and dark/light palettes.",
    highlight: "Responsive Layouts & Motion Styling",
    appliedIn: "Tamilsolai Trust, Soap Storefront",
    accentColor: "#06B6D4",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Runtime & Microservices",
    icon: <Server className="w-5 h-5 text-[#16A34A]" />,
    description:
      "Event-driven server runtime for handling non-blocking I/O, middleware pipelines, file streams, and REST API controllers.",
    highlight: "Non-blocking Asynchronous I/O",
    appliedIn: "Loan calculator backend, API proxy layers",
    accentColor: "#16A34A",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "API Engineering",
    icon: <Cpu className="w-5 h-5 text-[#475569]" />,
    description:
      "Modular routing architectures, CORS configuration, payload validation, JWT authentication, and standardized responses.",
    highlight: "REST Endpoints & Middleware Flow",
    appliedIn: "Full-stack application backends",
    accentColor: "#475569",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Server Scripting",
    icon: <Code className="w-5 h-5 text-[#777BB4]" />,
    description:
      "Server-side execution, MVC structuring, session management, secure form processing, and relational database bridging.",
    highlight: "Dynamic Scripting & Session Control",
    appliedIn: "Vasantham Natural Soap web platform",
    accentColor: "#777BB4",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    categoryLabel: "Databases & Storage",
    level: "Relational Modeling",
    icon: <Database className="w-5 h-5 text-[#00758F]" />,
    description:
      "Relational schema architecture, foreign key relationships, indexed lookups, transactional integrity, and normalized structures.",
    highlight: "Data Normalization & Complex Queries",
    appliedIn: "Gold loan records, store product inventories",
    accentColor: "#00758F",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    categoryLabel: "Workflow & DevOps",
    level: "Version Control",
    icon: <GitBranch className="w-5 h-5 text-[#F05032]" />,
    description:
      "Branching strategies, semantic commits, code reviews, conflict resolution, and collaborative pull request workflows.",
    highlight: "Branch Management & Clean History",
    appliedIn: "Version tracking across all projects",
    accentColor: "#F05032",
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    categoryLabel: "Workflow & DevOps",
    level: "API Verification",
    icon: <Send className="w-5 h-5 text-[#FF6C37]" />,
    description:
      "Automated HTTP test suites, environment variables, authentication header simulation, and payload response assertions.",
    highlight: "Endpoint Validation & Contract Testing",
    appliedIn: "API debugging and response verification",
    accentColor: "#FF6C37",
  },
  {
    id: "vite",
    name: "Vite & Tooling",
    category: "tools",
    categoryLabel: "Workflow & DevOps",
    level: "Build Pipeline",
    icon: <Zap className="w-5 h-5 text-[#BD34FE]" />,
    description:
      "Instant Hot Module Replacement, optimized ES module compilation, rollup bundling, and production asset tree-shaking.",
    highlight: "Sub-Second Builds & Bundling",
    appliedIn: "Fast modern web development setups",
    accentColor: "#BD34FE",
  },
  {
    id: "creative-motion",
    name: "GSAP & Three.js",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    level: "Creative Engineering",
    icon: <Sparkles className="w-5 h-5 text-[#88CE02]" />,
    description:
      "ScrollTrigger choreographies, differential parallax planes, WebGL shaders, floating geometries, and micro-interactions.",
    highlight: "Interactive Motion & 3D Atmosphere",
    appliedIn: "Interactive 3D Portfolio experience",
    accentColor: "#88CE02",
  },
];

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Architect & Wireframe",
    subtitle: "From Idea to Blueprint",
    desc: "Deconstruct business requirements into database schemas, component trees, and intuitive user journeys.",
    icon: <Workflow className="w-5 h-5 text-[#FF6B35]" />,
  },
  {
    step: "02",
    title: "Frontend Engineering",
    subtitle: "Interactive UI & Polish",
    desc: "Craft high-performance, accessible interfaces using React, Tailwind CSS, and smooth interaction states.",
    icon: <Layers className="w-5 h-5 text-[#2F58CD]" />,
  },
  {
    step: "03",
    title: "Backend & Data Flow",
    subtitle: "Robust Engines & APIs",
    desc: "Implement secure RESTful endpoints in Node.js or PHP, backed by normalized, transactional MySQL databases.",
    icon: <Server className="w-5 h-5 text-[#16A34A]" />,
  },
  {
    step: "04",
    title: "Test, Ship & Refine",
    subtitle: "Production Deployment",
    desc: "Validate contracts via Postman, optimize bundle delivery, and deploy clean, maintainable software.",
    icon: <CheckCircle2 className="w-5 h-5 text-[#D97706]" />,
  },
];

interface SkillsProps {
  onNavigate?: (sectionId: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "frontend", label: "Frontend Architecture" },
    { id: "backend", label: "Backend & APIs" },
    { id: "database", label: "Databases & Storage" },
    { id: "tools", label: "Workflow & DevOps" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((item) => item.category === activeCategory);

  // GSAP ScrollTrigger for section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header fade-up and scale-in
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Pipeline sequence: comes small and makes big animation and fade
      if (pipelineRef.current) {
        gsap.fromTo(
          pipelineRef.current.children,
          {
            opacity: 0,
            y: 45,
            scale: 0.72,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: pipelineRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Grid cards: comes small and makes big animation and fade
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.75,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.04,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid cards on category switch
  useEffect(() => {
    if (cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current.children,
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.03,
          ease: "power2.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-18">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#78726B] uppercase font-mono">
                TECHNICAL ARSENAL & TOOLKIT
              </span>
            </div>

            {/* Requested Header */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#191817] leading-[1.08] font-heading">
              TOOLS THAT TURN <br className="hidden sm:inline" />
              <span className="text-[#FF6B35]">
                IDEAS INTO REALITY.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed pt-2">
              Every production system starts as a concept. Here is the curated set of
              languages, frameworks, database engines, and developer tools I leverage
              to engineer reliable, user-centric full-stack web applications.
            </p>
          </div>

          {/* Quick Stat / Action Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">
                12+ Core Technologies
              </div>
              <div className="text-xs text-stone-500 font-mono">
                Modern full-stack pipeline ready
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate("projects")}
                className="ml-auto text-xs font-semibold text-[#FF6B35] hover:text-[#E65620] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View in action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4-Step "From Idea to Reality" Workflow Pipeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-stone-500 uppercase">
            <span className="flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-[#FF6B35]" />
              The Delivery Process: From Scratch to Production
            </span>
            <span className="hidden sm:inline text-stone-400">
              Structured Engineering Flow
            </span>
          </div>

          <div
            ref={pipelineRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {PIPELINE_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-stone-200/80 hover:border-[#FF6B35]/40 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600 group-hover:bg-[#FF6B35]/10 group-hover:text-[#FF6B35] transition-colors">
                    STEP {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-stone-50 group-hover:bg-[#FF6B35]/10 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-base group-hover:text-[#FF6B35] transition-colors">
                  {step.title}
                </h3>
                <div className="text-xs font-medium text-[#FF6B35] mb-2 font-mono">
                  {step.subtitle}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider mr-2 hidden sm:inline">
            Filter Stack:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#191817] text-white shadow-sm scale-100 font-semibold"
                  : "bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/80"
              }`}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative rounded-2xl p-5 bg-white/80 backdrop-blur-md border border-stone-200/80 hover:border-white hover:bg-white/95 transition-all duration-300 shadow-xs hover:shadow-[0_16px_32px_-8px_rgba(235,115,50,0.12)] flex flex-col justify-between"
            >
              {/* Top Row: Icon + Level Badge */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs"
                    style={{ backgroundColor: `${skill.accentColor}15` }}
                  >
                    {skill.icon}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200/60">
                    {skill.level}
                  </span>
                </div>

                {/* Skill Name & Category */}
                <h4 className="text-lg font-bold text-stone-900 group-hover:text-[#FF6B35] transition-colors">
                  {skill.name}
                </h4>
                <div className="text-[11px] font-mono text-stone-500 mb-2.5">
                  {skill.categoryLabel}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-3">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Metadata: Feature Highlight & Projects */}
              <div className="pt-3 border-t border-stone-100 space-y-2 mt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A68] shrink-0" />
                  <span className="truncate">{skill.highlight}</span>
                </div>

                <div className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                  <span className="text-stone-400">Used in:</span>
                  <span className="truncate text-stone-600">{skill.appliedIn}</span>
                </div>
              </div>

              {/* Subtle brand color accent line on bottom */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{ backgroundColor: skill.accentColor }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Banner: Philosophy & Practical Application */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white/90 via-[#FAF4EE]/70 to-[#FFF0E6]/80 backdrop-blur-xl border border-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B35] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Continuous Growth Mindset
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
              Tools are means to an end; delivering value is the goal.
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              Whether building a modern React interface, constructing clean Node.js APIs,
              or designing relational MySQL models, my objective is writing readable,
              maintainable, and performant code that solves real problems.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigate && (
              <>
                <button
                  onClick={() => onNavigate("projects")}
                  className="px-5 py-2.5 rounded-xl bg-[#191817] text-white text-xs sm:text-sm font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-5 py-2.5 rounded-xl bg-white text-stone-800 text-xs sm:text-sm font-semibold border border-stone-200/80 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Get in Touch
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
