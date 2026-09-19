import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const MagneticCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const currentMagneticTarget = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current device supports hover (desktop/laptop with mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // High performance GSAP quickTo setters for zero-lag smooth 60-120fps tracking
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power2.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power2.out" });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const resetTarget = (target: HTMLElement | null) => {
      if (!target) return;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
        onComplete: () => {
          target.style.transition = "";
        },
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // 1. Move lead dot directly to pointer coordinates
      setDotX(mouseX);
      setDotY(mouseY);

      // 2. Check if hovering an interactive magnetic attractor (buttons, links, nav tabs, interactive pills)
      const target = (e.target as HTMLElement)?.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, [data-magnetic]'
      ) as HTMLElement | null;

      if (target && !target.hasAttribute("data-no-magnetic")) {
        // Target is interactive: apply magnetic attraction
        if (currentMagneticTarget.current !== target) {
          // If switching targets, reset previous target
          if (currentMagneticTarget.current) {
            resetTarget(currentMagneticTarget.current);
          }
          currentMagneticTarget.current = target;
          target.style.transition = "none";
          setIsHoveringInteractive(true);
        }

        const rect = target.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;

        // Vector delta between cursor and element center
        const deltaX = mouseX - targetCenterX;
        const deltaY = mouseY - targetCenterY;

        // Tactile organic spring pull on the element itself (max 6-8px displacement)
        const pullStrength = 0.22;
        const maxDisplacement = 7;
        const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX * pullStrength));
        const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY * pullStrength));

        gsap.to(target, {
          x: clampedX,
          y: clampedY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Magnetically attract the halo towards the element center with slight cursor lean
        const magneticRingX = targetCenterX + deltaX * 0.32;
        const magneticRingY = targetCenterY + deltaY * 0.32;
        setRingX(magneticRingX);
        setRingY(magneticRingY);
      } else {
        // Not over an interactive attractor
        if (currentMagneticTarget.current) {
          resetTarget(currentMagneticTarget.current);
          currentMagneticTarget.current = null;
          setIsHoveringInteractive(false);
        }

        // Standard smooth follower for the outer ring
        setRingX(mouseX);
        setRingY(mouseY);
      }
    };

    const handleScroll = () => {
      // If user scrolls away, smoothly release current magnetic pull
      if (currentMagneticTarget.current) {
        resetTarget(currentMagneticTarget.current);
        currentMagneticTarget.current = null;
        setIsHoveringInteractive(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (currentMagneticTarget.current) {
        resetTarget(currentMagneticTarget.current);
        currentMagneticTarget.current = null;
      }
      setIsHoveringInteractive(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (currentMagneticTarget.current) {
        gsap.killTweensOf(currentMagneticTarget.current);
        gsap.set(currentMagneticTarget.current, { x: 0, y: 0 });
        currentMagneticTarget.current.style.transition = "";
      }
    };
  }, [isVisible]);

  // Don't render on touch-only mobile devices to preserve pristine native mobile ergonomics
  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* 1. Trailing Magnetic Halo Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isHoveringInteractive ? "54px" : "34px",
          height: isHoveringInteractive ? "54px" : "34px",
          backgroundColor: isHoveringInteractive
            ? "rgba(255, 107, 53, 0.14)"
            : "rgba(255, 107, 53, 0.05)",
          border: isHoveringInteractive
            ? "1.5px solid rgba(255, 107, 53, 0.85)"
            : "1px solid rgba(255, 107, 53, 0.38)",
          boxShadow: isHoveringInteractive
            ? "0 0 24px rgba(255, 107, 53, 0.38), inset 0 0 14px rgba(255, 107, 53, 0.18)"
            : "0 0 10px rgba(255, 107, 53, 0.1)",
          transform: `translate(-50%, -50%) scale(${
            isClicking ? (isHoveringInteractive ? 0.9 : 0.78) : 1
          })`,
          transition:
            "width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border 0.25s ease, box-shadow 0.25s ease, opacity 0.3s ease",
          backdropFilter: isHoveringInteractive ? "blur(2px)" : "none",
        }}
      />

      {/* 2. Core Lead Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isHoveringInteractive ? "6px" : "8px",
          height: isHoveringInteractive ? "6px" : "8px",
          backgroundColor: "#FF6B35",
          boxShadow: "0 0 10px rgba(255, 107, 53, 0.95), 0 0 3px #ffffff",
          transform: `translate(-50%, -50%) scale(${
            isClicking ? 0.65 : isHoveringInteractive ? 1.25 : 1
          })`,
          transition:
            "width 0.2s ease, height 0.2s ease, transform 0.15s ease, opacity 0.2s ease",
        }}
      />
    </div>
  );
};
