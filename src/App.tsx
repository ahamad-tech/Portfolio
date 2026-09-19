import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MagneticCursor } from "./components/MagneticCursor";
import { SectionEndTransition } from "./components/SectionEndTransition";

// Register GSAP ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isTransitioningRef.current) {
              setActiveSection(id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-20% 0px -40% 0px",
          threshold: 0.1,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Smooth GSAP-powered page transition animation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    isTransitioningRef.current = true;

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
      isTransitioningRef.current = false;
      return;
    }

    // 1. Subtle sleek progress line animation along the top edge
    if (progressBarRef.current) {
      gsap.killTweensOf(progressBarRef.current);
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0, opacity: 0.9 },
        {
          scaleX: 1,
          opacity: 0,
          duration: 0.95,
          ease: "power3.inOut",
          transformOrigin: "left center",
        }
      );
    }

    // 2. Smooth GSAP ScrollTo gliding with custom easing curve
    gsap.killTweensOf(window);
    gsap.to(window, {
      duration: 0.9,
      scrollTo: {
        y: targetElement,
        offsetY: 60,
      },
      ease: "power3.inOut",
      onComplete: () => {
        isTransitioningRef.current = false;

        // 3. Staggered micro-entrance reveal on target section headers & cards
        const revealTargets = targetElement.querySelectorAll(
          "h1, h2, .font-heading, .card-hover, #about-code-window, .project-card"
        );
        if (revealTargets.length > 0) {
          gsap.fromTo(
            revealTargets,
            { y: 12, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
              clearProps: "transform,opacity",
            }
          );
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF4EE] text-[#191817] flex flex-col selection:bg-[#FF6B35] selection:text-white relative">
      {/* Custom Tactile Magnetic Cursor for Desktop */}
      <MagneticCursor />

      {/* Sleek GSAP Page Transition Accent Bar (Top Edge) */}
      <div
        id="page-transition-bar"
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF9F43] via-[#FF6B35] to-[#E65620] z-[100] pointer-events-none opacity-0 shadow-[0_0_8px_rgba(255,107,53,0.6)]"
      />

      {/* Top Floating / Sticky Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* 1. Home / Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Page-End Transition: Home ➔ About */}
        <SectionEndTransition
          currentSection="home"
          nextSection="about"
          nextTitle="About Me"
          command="cd ~/portfolio/about && cat developer_profile.ts"
          output="Background, engineering philosophy & full-stack mindset"
          onNavigate={handleNavigate}
        />

        {/* 2. About Section with realistic Glass Code Editor */}
        <About />

        {/* Page-End Transition: About ➔ Skills */}
        <SectionEndTransition
          currentSection="about"
          nextSection="skills"
          nextTitle="Skills & Tech Stack"
          command="cd ~/portfolio/skills && list-stack --tested --active"
          output="Verified toolchain: React, Node.js, TypeScript, Express, SQL"
          onNavigate={handleNavigate}
        />

        {/* 3. Skills Section: Tools That Turn Ideas Into Reality */}
        <Skills onNavigate={handleNavigate} />

        {/* Page-End Transition: Skills ➔ Projects */}
        <SectionEndTransition
          currentSection="skills"
          nextSection="projects"
          nextTitle="Featured Projects"
          command="cd ~/portfolio/projects && git status --deployed"
          output="3 Production systems with live demos & GitHub source"
          onNavigate={handleNavigate}
        />

        {/* 4. Projects Section with real-world project cards */}
        <Projects />

        {/* Page-End Transition: Projects ➔ Contact */}
        <SectionEndTransition
          currentSection="projects"
          nextSection="contact"
          nextTitle="Get In Touch"
          command="cd ~/portfolio/contact && init-handshake"
          output="Open for junior full-stack developer roles & contracts"
          onNavigate={handleNavigate}
        />

        {/* 5. Contact Section with interactive forms & direct links */}
        <Contact />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
