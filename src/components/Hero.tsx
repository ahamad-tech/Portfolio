import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const imLetters = ["I", "'", "M"];
  const nameLetters = ["A", "H", "A", "M", "A", "D"];

  return (
    <section
      id="home"
      className="relative h-[100dvh] max-h-[100dvh] pt-20 sm:pt-24 pb-4 sm:pb-6 px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col justify-between overflow-hidden bg-[#FAF6F0]/85 backdrop-blur-[2px]"
    >
      {/* Soft warm peach/orange atmospheric gradient flaring from right side */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-full sm:w-[65%] h-full pointer-events-none select-none z-0 opacity-70 bg-[radial-gradient(ellipse_75%_65%_at_88%_45%,rgba(255,145,77,0.28)_0%,rgba(255,185,135,0.12)_45%,transparent_75%)]"
      />

      {/* Right-Side Giant Faint Background Typography Watermark ("BUILD CREATE SOLVE REPEAT") */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        aria-hidden="true"
        className="absolute right-4 sm:right-12 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 hidden sm:flex flex-col items-end text-right leading-[0.88] tracking-tighter uppercase font-heading font-black text-[#FF6B35]/[0.07] md:text-[#FF6B35]/[0.085] text-5xl md:text-7xl lg:text-8xl xl:text-[105px]"
      >
        <span>BUILD</span>
        <span>CREATE</span>
        <span>SOLVE</span>
        <span>REPEAT</span>
      </motion.div>

      

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-1 sm:py-2">
        <div className="max-w-3xl space-y-2.5 sm:space-y-3.5">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex items-center"
          >
            <span className="text-xs sm:text-sm font-medium tracking-[0.22em] text-[#644f38] opacity-60 uppercase">
              
            </span>
          </motion.div>

          {/* Monumental Headline with letter-by-letter animation */}
          <div className="space-y-0 leading-none">
            {/* I'M Letter by Letter */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-black tracking-tight text-[#141414] leading-[0.95] flex overflow-hidden">
              {imLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* AHAMAD Letter by Letter with Smooth Fade-Up & Slight Scale */}
            <div className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[112px] 2xl:text-[124px] font-black tracking-tight leading-[0.9] flex overflow-hidden">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 55, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.45 + index * 0.075,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#FF7A30] via-[#FF5E28] to-[#E64816]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle with Fade Up */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
            className="pt-0.5"
          >
            <h2 className="font-heading text-sm sm:text-lg md:text-xl font-bold tracking-[0.18em] text-[#141414] uppercase">
              JUNIOR FULL-STACK DEVELOPER
            </h2>
          </motion.div>

          {/* Clean Description with Fade Up */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#5C5651] max-w-xl font-normal leading-relaxed"
          >
            I turn ideas into clean, functional and engaging digital experiences.
          </motion.p>

          {/* Primary Action Buttons with Fade Up */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
          >
            {/* Primary Orange Button */}
            <button
              id="hero-view-work"
              onClick={() => onNavigate("projects")}
              className="group flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#FF5E28] hover:bg-[#E84E1B] text-white text-sm sm:text-base font-semibold shadow-[0_10px_24px_-6px_rgba(255,94,40,0.36)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>

            {/* Secondary Outline Button */}
            <button
              id="hero-contact-cta"
              onClick={() => onNavigate("contact")}
              className="group flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white/70 hover:bg-white text-[#191817] text-sm sm:text-base font-semibold border border-[#262422] shadow-xs hover:border-[#FF5E28] hover:text-[#FF5E28] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* Subtle Dot Grid Accent Pattern (bottom center-right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.0, delay: 1.6 }}
        aria-hidden="true"
        className="absolute bottom-16 left-[48%] sm:left-[52%] hidden lg:grid grid-cols-6 gap-2 pointer-events-none select-none"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[#B8A89A]" />
        ))}
      </motion.div>

      {/* Bottom Horizon: Scroll to Explore (Left) & Better Web Tomorrow Tagline (Right) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-2 sm:pt-3 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        {/* Animated Mouse Capsule Indicator */}
        <button
          onClick={() => onNavigate("about")}
          className="group flex items-center gap-2.5 cursor-pointer text-left select-none"
          aria-label="Scroll to explore"
        >
          {/* Mouse capsule */}
          <div className="w-[16px] h-[26px] rounded-full border-[1.8px] border-[#191817] flex justify-center pt-1 group-hover:border-[#FF5E28] transition-colors">
            <div className="w-[2px] h-[4px] rounded-full bg-[#191817] group-hover:bg-[#FF5E28] animate-bounce transition-colors" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-[#55504A] group-hover:text-[#FF5E28] transition-colors uppercase">
              SCROLL TO EXPLORE
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#999088] group-hover:bg-[#FF5E28] transition-colors inline-block" />
          </div>
        </button>

        {/* Right Bottom Tagline */}
        <div className="flex items-center gap-2 text-stone-500 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider">
          <span className="text-[#FF5E28] font-bold">//</span>
          <span className="uppercase text-[#66605A] tracking-[0.2em]">A BETTER WEB TOMORROW</span>
          <span className="w-6 sm:w-10 h-[1.5px] bg-[#FF5E28] inline-block ml-1" />
        </div>
      </motion.div>
    </section>
  );
};
