import React, { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check, Play, Terminal as TerminalIcon, Sparkles, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CodeToken {
  text: string;
  className: string;
}

interface CodeLineData {
  lineNum: number;
  tokens: CodeToken[];
}

const CONFIG_LINES: CodeLineData[] = [
  {
    lineNum: 1,
    tokens: [
      { text: "const ", className: "text-[#8938E0] font-semibold" },
      { text: "developer ", className: "text-[#2F58CD] font-semibold" },
      { text: "= ", className: "text-stone-600" },
      { text: "{", className: "text-[#191817]" },
    ],
  },
  {
    lineNum: 2,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "name", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: '"Ahamad"', className: "text-[#0E8A68]" },
      { text: ",", className: "text-stone-700" },
    ],
  },
  {
    lineNum: 3,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "role", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: '"Junior Full-Stack Developer"', className: "text-[#0E8A68]" },
      { text: ",", className: "text-stone-700" },
    ],
  },
  {
    lineNum: 4,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "stack", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: "[", className: "text-stone-700" },
      { text: '"React"', className: "text-[#0E8A68]" },
      { text: ", ", className: "text-stone-700" },
      { text: '"Node.js"', className: "text-[#0E8A68]" },
      { text: ", ", className: "text-stone-700" },
      { text: '"PHP"', className: "text-[#0E8A68]" },
      { text: ", ", className: "text-stone-700" },
      { text: '"MySQL"', className: "text-[#0E8A68]" },
      { text: "],", className: "text-stone-700" },
    ],
  },
  {
    lineNum: 5,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "mindset", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: '"Always Learning"', className: "text-[#0E8A68]" },
      { text: ",", className: "text-stone-700" },
    ],
  },
  {
    lineNum: 6,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "education", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: '"B.Sc Computer Science (2026)"', className: "text-[#0E8A68]" },
      { text: ",", className: "text-stone-700" },
    ],
  },
  {
    lineNum: 7,
    tokens: [
      { text: "  ", className: "inline-block w-4" },
      { text: "status", className: "text-[#D95B16]" },
      { text: ": ", className: "text-stone-700" },
      { text: '"Building..."', className: "text-[#0E8A68]" },
    ],
  },
  {
    lineNum: 8,
    tokens: [{ text: "};", className: "text-[#191817]" }],
  },
];

const TOTAL_CONFIG_CHARS = CONFIG_LINES.reduce(
  (acc, line) => acc + line.tokens.reduce((tAcc, tok) => tAcc + tok.text.length, 0),
  0
);

export const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "about">("config");

  // Typing animation states
  const [typedChars, setTypedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rawCode = `const developer = {
  name: "Ahamad",
  role: "Junior Full-Stack Developer",
  stack: ["React", "Node.js", "PHP", "MySQL"],
  mindset: "Always Learning",
  education: "B.Sc Computer Science (2026)",
  status: "Building..."
};`;

  const skillsRawCode = `{
  "focus": "Responsive Web Apps & Clean APIs",
  "tools": ["Git", "Postman", "Tailwind", "Vite"],
  "curiosityLevel": "Maximum"
}`;

  const startTyping = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    setHasStarted(true);
    setIsTyping(true);
    setTypedChars(0);

    const fullText = CONFIG_LINES.map((l) => l.tokens.map((t) => t.text).join("")).join("");
    let currentCount = 0;

    const typeNext = () => {
      currentCount++;
      setTypedChars(currentCount);

      if (currentCount < TOTAL_CONFIG_CHARS) {
        const char = fullText[currentCount - 1];
        let delay = 16 + Math.floor(Math.random() * 20); // 16-36ms per key for brisk realism

        // Add organic micro-pauses for punctuation, wraps & line endings
        if (char === "{" || char === "}") {
          delay = 180 + Math.floor(Math.random() * 50);
        } else if (char === "," || char === ";") {
          delay = 120 + Math.floor(Math.random() * 40);
        } else if (char === ":" || char === "[") {
          delay = 85 + Math.floor(Math.random() * 30);
        }

        typingTimerRef.current = setTimeout(typeNext, delay);
      } else {
        setIsTyping(false);
      }
    };

    // Initial anticipation delay before first character is keyed
    typingTimerRef.current = setTimeout(typeNext, 320);
  }, []);

  const completeTypingImmediately = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    setTypedChars(TOTAL_CONFIG_CHARS);
    setIsTyping(false);
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Badge pop-in animation on scroll from hero
      gsap.from(
        [
          "#about-badge-react",
          "#about-badge-node",
          "#about-badge-php",
          "#about-badge-mysql",
        ],
        {
          scale: 0,
          opacity: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            // 2. Start gentle continuous floating loops after pop-in
            gsap.to("#about-badge-react", {
              y: "-=6",
              rotation: "+=2",
              duration: 3.1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            gsap.to("#about-badge-node", {
              y: "+=7",
              rotation: "-=2",
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.3,
            });
            gsap.to("#about-badge-php", {
              y: "-=5",
              rotation: "-=1.5",
              duration: 3.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.6,
            });
            gsap.to("#about-badge-mysql", {
              y: "+=6",
              rotation: "+=2",
              duration: 2.9,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.2,
            });
          },
        }
      );

      // 3. Subtle Differential Scroll Parallax across depth planes
      gsap.to("#about-code-window", {
        y: -42,
        ease: "none",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to("#about-badge-react-parallax", {
        y: -65,
        rotate: 4,
        ease: "none",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to("#about-badge-php-parallax", {
        y: -75,
        rotate: -5,
        ease: "none",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to("#about-badge-node-parallax", {
        y: -26,
        rotate: -3,
        ease: "none",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to("#about-badge-mysql-parallax", {
        y: -18,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 4. ScrollTrigger for Real-Time Typing Animation
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          startTyping();
        },
      });

      // If already in viewport on mount (e.g. reload or direct scroll anchor)
      if (terminalRef.current) {
        const rect = terminalRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          startTyping();
        }
      }
    }, terminalRef);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      ctx.revert();
    };
  }, [startTyping]);

  const handleCopy = () => {
    const textToCopy = activeTab === "config" ? rawCode : skillsRawCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    completeTypingImmediately();
    setExecuted(true);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab("config");
    setExecuted(false);
    startTyping();
  };

  // Render the syntax-highlighted code with progressive typing & live cursor
  const renderTypedConfig = () => {
    let remainingChars = typedChars;
    const isComplete = typedChars >= TOTAL_CONFIG_CHARS;
    let cursorRendered = false;

    return (
      <div className="space-y-1">
        {CONFIG_LINES.map((line, lineIdx) => {
          const lineTextLength = line.tokens.reduce((acc, tok) => acc + tok.text.length, 0);
          const lineHasStarted = remainingChars > 0 || (lineIdx === 0 && hasStarted);
          let charsForLine = remainingChars;
          remainingChars = Math.max(0, remainingChars - lineTextLength);

          return (
            <div key={line.lineNum} className="flex items-start gap-4 min-h-[1.5rem]">
              <span
                className={`select-none w-4 text-right transition-colors duration-200 ${
                  lineHasStarted ? "text-stone-400" : "text-stone-300/40"
                }`}
              >
                {line.lineNum}
              </span>
              <div className="flex-1 flex flex-wrap items-center">
                {line.tokens.map((token, tokIdx) => {
                  if (charsForLine <= 0) return null;
                  const tokLen = token.text.length;

                  if (charsForLine >= tokLen) {
                    charsForLine -= tokLen;
                    return (
                      <span key={tokIdx} className={token.className}>
                        {token.text}
                      </span>
                    );
                  } else {
                    // Partial token typed in real-time
                    const partial = token.text.slice(0, charsForLine);
                    charsForLine = 0;
                    cursorRendered = true;
                    return (
                      <React.Fragment key={tokIdx}>
                        <span className={token.className}>{partial}</span>
                        <span
                          aria-hidden="true"
                          className="inline-block w-2 h-4 sm:h-4.5 bg-[#FF6B35] animate-pulse align-middle ml-0.5 shadow-[0_0_8px_rgba(255,107,53,0.6)] rounded-xs"
                        />
                      </React.Fragment>
                    );
                  }
                })}

                {/* Cursor right at the beginning of file if typing just started */}
                {!cursorRendered && lineIdx === 0 && typedChars === 0 && hasStarted && (
                  (() => {
                    cursorRendered = true;
                    return (
                      <span
                        aria-hidden="true"
                        className="inline-block w-2 h-4 sm:h-4.5 bg-[#FF6B35] animate-pulse align-middle ml-0.5 shadow-[0_0_8px_rgba(255,107,53,0.6)] rounded-xs"
                      />
                    );
                  })()
                )}

                {/* Cursor at the end of this line if keystrokes ended on line boundary */}
                {!cursorRendered && !isComplete && charsForLine === 0 && remainingChars === 0 && lineHasStarted && (
                  (() => {
                    cursorRendered = true;
                    return (
                      <span
                        aria-hidden="true"
                        className="inline-block w-2 h-4 sm:h-4.5 bg-[#FF6B35] animate-pulse align-middle ml-0.5 shadow-[0_0_8px_rgba(255,107,53,0.6)] rounded-xs"
                      />
                    );
                  })()
                )}

                {/* Terminal pulsing cursor on last line after typing finishes */}
                {isComplete && lineIdx === CONFIG_LINES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-2 h-4 sm:h-4.5 bg-[#FF6B35] animate-pulse align-middle ml-0.5 shadow-[0_0_8px_rgba(255,107,53,0.6)] rounded-xs"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={terminalRef} className="relative w-full max-w-xl mx-auto select-none">
      {/* Floating Tech Badges (React, Node.js, PHP, MySQL) with Parallax Depth Layers */}
      {/* 1. React Card (Foreground Speed) */}
      <div id="about-badge-react-parallax" className="hidden sm:block absolute -top-4 -left-4 z-20 will-change-transform">
        <div
          id="about-badge-react"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] card-hover"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00D8FF]" />
          <span className="text-xs font-semibold text-[#191817]">React</span>
        </div>
      </div>

      {/* 2. Node.js Card (Mid-Background Speed) */}
      <div id="about-badge-node-parallax" className="hidden sm:block absolute -top-5 right-12 z-20 will-change-transform">
        <div
          id="about-badge-node"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] card-hover"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#43853D]" />
          <span className="text-xs font-semibold text-[#191817]">Node.js</span>
        </div>
      </div>

      {/* 3. PHP Card (Deep Foreground Speed) */}
      <div id="about-badge-php-parallax" className="hidden sm:block absolute -bottom-4 -left-3 z-20 will-change-transform">
        <div
          id="about-badge-php"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] card-hover"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#777BB4]" />
          <span className="text-xs font-semibold text-[#191817]">PHP</span>
        </div>
      </div>

      {/* 4. MySQL Card (Deep Background Speed) */}
      <div id="about-badge-mysql-parallax" className="hidden sm:block absolute -bottom-5 -right-3 z-20 will-change-transform">
        <div
          id="about-badge-mysql"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] card-hover"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00758F]" />
          <span className="text-xs font-semibold text-[#191817]">MySQL</span>
        </div>
      </div>

      {/* Main Glass Code Editor Window */}
      <div
        id="about-code-window"
        onClick={() => {
          if (isTyping) completeTypingImmediately();
        }}
        className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-[0_24px_48px_-12px_rgba(235,115,50,0.14),0_6px_20px_rgba(0,0,0,0.04)] cursor-default transition-all duration-300"
      >
        {/* Editor Title Bar */}
        <div className="px-4 py-3 bg-[#F4EDE4]/80 border-b border-[#E8DFD3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          {/* File Tabs & Live Typing Status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("config");
                }}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === "config"
                    ? "bg-white text-[#191817] shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span>developer.config.ts</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("about");
                  completeTypingImmediately();
                }}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors hidden sm:flex items-center gap-1.5 ${
                  activeTab === "about"
                    ? "bg-white text-[#191817] shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span>skills.json</span>
              </button>
            </div>

            {/* Live Status Pill */}
            {activeTab === "config" && (
              isTyping ? (
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-[10px] font-mono animate-in fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                  <span>typing live...</span>
                </span>
              ) : typedChars >= TOTAL_CONFIG_CHARS ? (
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono animate-in fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>compiled</span>
                </span>
              ) : null
            )}
          </div>

          {/* Action buttons (Replay, Run, Copy) */}
          <div className="flex items-center gap-1.5">
            <button
              id="terminal-replay-btn"
              onClick={handleReplay}
              title="Replay typing animation"
              className="p-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-200 text-stone-700 hover:text-[#191817] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              id="terminal-run-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExecute();
              }}
              title="Run code snippet"
              className="p-1.5 rounded-lg bg-[#FF6B35]/10 hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              id="terminal-copy-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              title="Copy code"
              className="p-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Content Area with Line Numbers */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#1E1C1A]">
          {activeTab === "config" ? (
            renderTypedConfig()
          ) : (
            <div className="space-y-1">
              <div className="flex items-start gap-4 min-h-[1.5rem]">
                <span className="text-stone-400 select-none w-4 text-right">1</span>
                <div>&#123;</div>
              </div>
              <div className="flex items-start gap-4 min-h-[1.5rem]">
                <span className="text-stone-400 select-none w-4 text-right">2</span>
                <div className="pl-4">
                  <span className="text-[#2F58CD]">"focus"</span>:{" "}
                  <span className="text-[#0E8A68]">"Responsive Web Apps & Clean APIs"</span>,
                </div>
              </div>
              <div className="flex items-start gap-4 min-h-[1.5rem]">
                <span className="text-stone-400 select-none w-4 text-right">3</span>
                <div className="pl-4">
                  <span className="text-[#2F58CD]">"tools"</span>: [
                  <span className="text-[#0E8A68]">"Git"</span>,{" "}
                  <span className="text-[#0E8A68]">"Postman"</span>,{" "}
                  <span className="text-[#0E8A68]">"Tailwind"</span>,{" "}
                  <span className="text-[#0E8A68]">"Vite"</span>],
                </div>
              </div>
              <div className="flex items-start gap-4 min-h-[1.5rem]">
                <span className="text-stone-400 select-none w-4 text-right">4</span>
                <div className="pl-4">
                  <span className="text-[#2F58CD]">"curiosityLevel"</span>:{" "}
                  <span className="text-[#D95B16]">"Maximum"</span>
                </div>
              </div>
              <div className="flex items-start gap-4 min-h-[1.5rem]">
                <span className="text-stone-400 select-none w-4 text-right">5</span>
                <div>&#125;</div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Console Output Tray */}
        <div className="px-4 py-3 bg-[#191817] text-stone-300 font-mono text-xs border-t border-[#312E2A]">
          <div className="flex items-center justify-between text-stone-500 pb-1 text-[11px]">
            <div className="flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>TERMINAL OUTPUT</span>
            </div>
            <span>node v20.12</span>
          </div>
          {executed ? (
            <div className="pt-1.5 space-y-1 text-emerald-400 animate-in fade-in duration-300">
              <p className="text-stone-400">$ node developer.config.ts</p>
              <p className="text-white">
                ✔ <span className="text-[#FF6B35]">Ahamad</span> is online and actively building!
              </p>
              <p className="text-stone-400 text-[11px]">
                Ready for full-stack opportunities in React, Node.js, PHP & MySQL.
              </p>
            </div>
          ) : isTyping ? (
            <div className="pt-1 flex items-center justify-between text-[#FF6B35]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                Streaming developer keystrokes in real-time...
              </span>
              <span className="text-[10px] text-stone-500">status: streaming</span>
            </div>
          ) : (
            <div className="pt-1 flex items-center justify-between text-stone-500">
              <span>Click ▶ to execute script...</span>
              <span className="text-[10px] text-stone-600">
                status: {typedChars >= TOTAL_CONFIG_CHARS ? "ready" : "idle"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
