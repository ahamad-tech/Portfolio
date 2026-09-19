import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, ArrowRight, CornerDownRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SectionEndTransitionProps {
  currentSection: string;
  nextSection: string;
  nextTitle: string;
  command: string;
  output: string;
  onNavigate?: (sectionId: string) => void;
}

export const SectionEndTransition: React.FC<SectionEndTransitionProps> = ({
  nextSection,
  nextTitle,
  command,
  output,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scrubbed scroll animation:
      // 1. Starts from the left (small scale & low opacity)
      // 2. Reaches exact center of the screen (scale: 1, full opacity)
      // 3. Glides smoothly towards the right side and fades out as user crosses to next section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          end: "bottom 10%",
          scrub: 1.1,
        },
      });

      tl.fromTo(
        card,
        {
          x: "-45vw",
          scale: 0.65,
          opacity: 0,
          rotate: -4,
        },
        {
          x: "0vw",
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
          duration: 1,
        }
      ).to(card, {
        x: "45vw",
        scale: 0.7,
        opacity: 0,
        rotate: 4,
        ease: "power2.in",
        duration: 1,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full py-8 sm:py-12 overflow-hidden flex items-center justify-center relative pointer-events-none select-none"
    >
      <div
        ref={cardRef}
        onClick={() => onNavigate?.(nextSection)}
        className="pointer-events-auto cursor-pointer w-[92%] max-w-xl rounded-2xl bg-[#141414]/95 text-stone-200 border border-[#FF6B35]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_25px_rgba(255,107,53,0.18)] backdrop-blur-xl overflow-hidden group hover:border-[#FF6B35] transition-colors"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[#1C1B1A] border-b border-[#2C2A28]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-[0_0_5px_#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-[0_0_5px_#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-[0_0_5px_#27C93F]" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <Terminal className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="truncate max-w-[180px] sm:max-w-[260px] font-semibold text-stone-300">
              transition // next: {nextSection}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-[#FF6B35] font-semibold">
            <span>SCROLL ➔</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-3.5 sm:p-4 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-200 font-medium">
            <span className="text-[#FF6B35] font-bold text-sm">$</span>
            <span className="text-white font-semibold text-[11px] sm:text-xs">
              {command}
            </span>
            <span className="w-1.5 h-3.5 bg-[#FF6B35] animate-pulse inline-block ml-0.5" />
          </div>

          <div className="flex items-center justify-between gap-2 text-stone-400 text-[11px] pl-2 border-l-2 border-[#FF6B35] bg-[#1A1918]/80 py-1.5 px-2.5 rounded-md">
            <div className="flex items-center gap-1.5 truncate">
              <CornerDownRight className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
              <span className="truncate">{output}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF6B35] font-bold text-[11px] shrink-0 group-hover:translate-x-1 transition-transform">
              <span>{nextTitle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
