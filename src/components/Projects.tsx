import React, { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../data/projectsData";
import { ProjectCard } from "./ProjectCard";
import { Sparkles, Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Educational", "Trust / Civic", "FinTech", "E-Commerce"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => {
          if (selectedCategory === "Educational") return p.category.includes("Educational");
          if (selectedCategory === "Trust / Civic") return p.category.includes("Trust");
          if (selectedCategory === "FinTech") return p.category.includes("Loan");
          if (selectedCategory === "E-Commerce") return p.category.includes("Soap") || p.tags.includes("E-Commerce");
          return true;
        });

  // ScrollTrigger fade-up & scale-in for section header and cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header fade-up & scale-in
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Project cards: comes small and make big animation and fade
      if (gridRef.current?.children) {
        gsap.fromTo(
          gridRef.current.children,
          {
            opacity: 0,
            y: 70,
            scale: 0.72,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.14,
            duration: 0.85,
            ease: "back.out(1.3)",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#78726B] uppercase font-mono">
                SELECTED WORKS
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#191817] leading-[1.05]">
              REAL PROJECTS. <br />
              <span className="text-[#FF6B35]">MEASURABLE IMPACT.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5953] leading-relaxed">
              Real-world web solutions engineered with React, Node.js, PHP, and MySQL.
              Each project was built to address concrete client goals.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#EAE0D4] self-start md:self-end shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#191817] text-white shadow-xs font-semibold"
                    : "text-stone-600 hover:text-black hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: 2 Columns on desktop, 1 on tablet/mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
