import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="border-t border-[#EAE0D4] bg-[#FAF4EE] py-12 px-4 sm:px-8 md:px-12 text-[#191817]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Subtitle */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start text-xl font-black tracking-tight">
            <span>AHAMAD</span>
            <span className="text-[#FF6B35]">.</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Junior Full-Stack Developer • Turning ideas into digital reality.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigate("skills")}
            className="hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            Skills
          </button>
          <button
            onClick={() => onNavigate("projects")}
            className="hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-500 font-mono">
            © {new Date().getFullYear()} Ahamad
          </span>
          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-9 h-9 rounded-full bg-white border border-[#E4D9CE] hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] flex items-center justify-center text-stone-600 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
