import React, { useEffect, useRef } from "react";
import { Terminal } from "./Terminal";
import { Layers, Server, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const terminalWrapperRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#FF6B35]" />,
      title: "Modern Frontend Engineering",
      desc: "Creating responsive, fast, and accessible user interfaces using React, Tailwind CSS, and modern JavaScript.",
    },
    {
      icon: <Server className="w-5 h-5 text-[#2F58CD]" />,
      title: "Dependable Backend Systems",
      desc: "Architecting clean APIs and database persistence with Node.js, Express, PHP, and relational MySQL data models.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#D97706]" />,
      title: "Growth & Problem Solving",
      desc: "Committed to continuous learning, debugging real-world challenges, and delivering production-ready code.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Decorative Transition Line expand when entering from Hero
      if (dividerLineRef.current) {
        gsap.fromTo(
          dividerLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      }

      // 2. Timeline for narrative text & pillars reveal with subtle fade-up and scale-in
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          {
            opacity: 0,
            y: 45,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        x: -25,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          pillarsRef.current?.children || [],
          {
            opacity: 0,
            y: 25,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // 3. 3D Terminal Entrance: comes small and makes big animation and fade
      if (terminalWrapperRef.current) {
        gsap.fromTo(
          terminalWrapperRef.current,
          {
            opacity: 0,
            y: 85,
            rotationX: 16,
            scale: 0.68,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.05,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: terminalWrapperRef.current,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-gradient-to-b from-transparent via-[#F7ECE1]/50 to-transparent overflow-hidden"
    >
      {/* Decorative Warm Transition Accent Line from Hero */}
      <div
        ref={dividerLineRef}
        aria-hidden="true"
        className="max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent mb-16 origin-center"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Content */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#78726B] uppercase font-mono">
                THE PERSON BEHIND THE CODE
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h2
                ref={headingRef}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#191817] leading-[1.05]"
              >
                I DON'T JUST CODE. <br />
                <span className="text-[#FF6B35]">I BUILD EXPERIENCES.</span>
              </h2>
            </div>

            {/* Description as requested */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#5E5953] leading-relaxed"
            >
              I started with a curiosity about how websites work. That curiosity turned into a
              passion for creating them. Today, I’m focused on growing as a full-stack developer by
              building real projects, solving problems and learning something new with every build.
            </p>

            {/* Core Pillars */}
            <div ref={pillarsRef} className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#EFE5DA] hover:bg-white hover:border-[#FFD6C2] transition-all duration-300 card-hover shadow-xs group"
                >
                  <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                    {pillar.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#191817]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E6861] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Academic Foundation (from Resume) */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#EFE5DA] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#FF6B35]" />
                  <span>Education & Academic Credentials</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 text-[#191817] font-semibold border-b border-stone-200/60 pb-1.5">
                    <span>Bachelor of Science in Computer Science</span>
                    <span className="text-[#FF6B35] font-mono text-[11px] font-bold">
                      2023 - 2026 • Jairams Arts & Science College, Karur
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 text-[#6E6861]">
                    <span>Higher Secondary Certificate (HSC - Computer Science)</span>
                    <span className="font-mono text-[11px]">
                      2021 - 2023 • Govt. Boys HSS, Pugalur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Code Editor Terminal */}
          <div ref={terminalWrapperRef} className="lg:col-span-6">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};
