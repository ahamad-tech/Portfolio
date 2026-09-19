import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // GSAP sliding indicator transition when activeSection changes
  useEffect(() => {
    if (!navContainerRef.current || !indicatorRef.current) return;
    const activeBtn = document.getElementById(`nav-link-${activeSection}`);
    if (activeBtn) {
      const parentRect = navContainerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const leftOffset = btnRect.left - parentRect.left;
      const width = btnRect.width;

      gsap.to(indicatorRef.current, {
        x: leftOffset,
        width: width,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [activeSection]);

  const handleLinkClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // Subtle GSAP click feedback on the button
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.94 },
      { scale: 1, duration: 0.25, ease: "back.out(2)" }
    );
    onNavigate(id);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8 md:px-12 ${
        scrolled
          ? "bg-[#FAF4EE]/80 backdrop-blur-md border-b border-[#E8DFD5]/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo matching reference image */}
        <button
          id="nav-logo"
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-2.5 text-lg sm:text-xl font-black tracking-tight text-[#191817] cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,0.5)] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-heading font-black text-[#191817]">AHAMAD</span>
          <span className="font-heading font-semibold text-[#7A736C]">.DEV</span>
        </button>

        {/* Center Navigation Links matching reference */}
        <nav
          ref={navContainerRef}
          id="desktop-nav-menu"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={(e) => handleLinkClick(item.id, e)}
                className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#FF6B35] font-semibold"
                    : "text-[#4A4541] hover:text-[#191817]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF6B35] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA matching reference */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-cta-talk"
            onClick={(e) => handleLinkClick("contact", e)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#191817] text-white text-sm font-semibold hover:bg-[#FF6B35] transition-all duration-300 shadow-[0_4px_16px_rgba(25,24,23,0.12)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.3)] cursor-pointer"
          >
            <span>Let's Talk</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-xl bg-white/80 border border-[#EAE0D4] text-[#191817] hover:bg-[#FBEBE2] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden mt-3 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#EAE0D4] shadow-xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#FBEBE2] text-[#FF6B35] font-semibold"
                    : "text-[#3D3834] hover:bg-stone-50"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#EAE0D4]">
            <button
              id="mobile-nav-cta"
              onClick={() => {
                onNavigate("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#191817] text-white font-medium hover:bg-[#FF6B35] transition-colors"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
