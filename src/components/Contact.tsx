import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Sparkles,
  Radio,
  Clock,
  Zap,
  Globe,
  Phone,
  MapPin,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("Junior Full-Stack Opportunity");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // 3D Gyroscope Interactive Tilt & Live Time
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>("");
  const gyroCardRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const emailAddress = "ahamadmeeran55@gmail.com";
  const phoneNumber = "+91 8072380161";
  const locationAddress = "Karur, TamilNadu";
  const linkedinUrl =
    "https://www.linkedin.com/in/ahamad-meeran-r-b6b2b026a?utm_source=share_via&utm_content=profile&utm_medium=member_ios";

  // Live IST Time clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setCurrentTime(formatted);
      } catch {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tilt tracking for 3D gyroscope card
  const handleGyroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gyroCardRef.current) return;
    const rect = gyroCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x, y });
  };

  const handleGyroMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

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

      // 2. Left column (form + links): comes small and makes big animation and fade
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.76,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.25)",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Right column (3D console): comes small and makes big animation and fade
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          {
            opacity: 0,
            y: 75,
            scale: 0.68,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 4. Subtle differential scroll parallax on 3D availability card & floating center orb
      gsap.to("#contact-3d-card", {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to("#contact-3d-orb", {
        y: -50,
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const topics = [
    {
      id: "role",
      label: "💼 Junior Full-Stack Role",
      subject: "Junior Full-Stack Opportunity",
      body: "Hi Ahamad,%0D%0A%0D%0AI reviewed your portfolio and would like to connect regarding a Junior Full-Stack Engineer opportunity at our company.%0D%0A%0D%0ABest regards,",
    },
    {
      id: "project",
      label: "🚀 Web App Project",
      subject: "Web Application Project Inquiry",
      body: "Hi Ahamad,%0D%0A%0D%0AI have a web application project I would like to discuss building with you.%0D%0A%0D%0ABest regards,",
    },
    {
      id: "frontend",
      label: "🎨 Frontend / UI/UX",
      subject: "Frontend Development Collaboration",
      body: "Hi Ahamad,%0D%0A%0D%0AI was impressed with your UI/UX and interactive web craftsmanship and would like to collaborate.%0D%0A%0D%0ABest regards,",
    },
    {
      id: "chat",
      label: "👋 Say Hello",
      subject: "Hello from Portfolio Visitor",
      body: "Hi Ahamad,%0D%0A%0D%0AJust wanted to say hi and connect!%0D%0A%0D%0ABest regards,",
    },
  ];

  const currentTopic = topics.find((t) => t.subject === selectedTopic) || topics[0];
  const dynamicMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(currentTopic.subject)}&body=${currentTopic.body}`;
  const dynamicWhatsApp = `https://wa.me/918072380161?text=${encodeURIComponent(`Hi Ahamad, I'm reaching out from your portfolio regarding: ${currentTopic.subject}`)}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-gradient-to-t from-[#F5ECE1]/70 via-transparent to-transparent overflow-hidden"
    >
      {/* Warm ambient blur circles */}
      <div className="absolute -bottom-24 right-10 w-96 h-96 rounded-full bg-[#FF6B35]/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-[#FFE5D4]/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Contact Header */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#78726B] uppercase font-mono">
              INITIATE COLLABORATION
            </span>
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#191817]">
            LET'S BUILD <br />
            <span className="text-[#FF6B35]">SOMETHING.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5E5953] leading-relaxed">
            Have an idea, project or opportunity? Let's turn it into something real.
            I'm always open to discussing new junior full-stack roles, freelance inquiries, and innovative web builds.
          </p>
        </div>

        {/* Main Grid: Left is Form + Direct Connect; Right is Decorative 3D Glass Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct Interactive Channels Hub (Replaces Form) */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6">
            {/* Header / Intro Strip */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B35]" />
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#FF6B35] uppercase">
                    FAST-TRACK DIRECT CONNECT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                  NO FORMS NEEDED
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#191817]">
                Choose your preferred channel for an immediate response
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you're recruiting for a junior full-stack role, exploring a modern web application project, or just wanting to connect, reach out directly through any platform below.
              </p>
            </div>

            {/* 4 Enhanced Channel Cards (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Email */}
              <div className="group relative p-5 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#EAE0D4] hover:border-[#FF6B35]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-2xl bg-[#FAF2EB] text-[#FF6B35] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF6B35]/10 text-[#FF6B35]">
                      PRIMARY
                    </span>
                    <button
                      onClick={() => handleCopy(emailAddress, "Email")}
                      title="Copy Email Address"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      {copiedItem === "Email" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider">
                    Direct Email
                  </div>
                  <a
                    href={dynamicMailto}
                    className="text-sm sm:text-base font-bold text-[#191817] hover:text-[#FF6B35] transition-colors truncate block"
                  >
                    {emailAddress}
                  </a>
                  <p className="text-xs text-stone-500 pt-0.5">
                    Fastest for job proposals, detailed project scopes, and interviews.
                  </p>
                </div>

                <a
                  href={dynamicMailto}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF2EB] hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <span>Open Email Client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: WhatsApp & Phone */}
              <div className="group relative p-5 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#EAE0D4] hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100/60 text-emerald-700">
                      INSTANT CHAT
                    </span>
                    <button
                      onClick={() => handleCopy(phoneNumber, "Phone")}
                      title="Copy Phone Number"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      {copiedItem === "Phone" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider">
                    WhatsApp & Phone
                  </div>
                  <a
                    href={dynamicWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-base font-bold text-[#191817] hover:text-emerald-600 transition-colors truncate block"
                  >
                    {phoneNumber}
                  </a>
                  <p className="text-xs text-stone-500 pt-0.5">
                    Available for WhatsApp messaging, voice calls, or quick tech syncs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={dynamicWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-800 text-stone-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* Card 3: LinkedIn Network */}
              <div className="group relative p-5 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#EAE0D4] hover:border-[#0077B5]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-2xl bg-[#0077B5]/10 text-[#0077B5] group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0077B5]/10 text-[#0077B5]">
                      VERIFIED
                    </span>
                    <button
                      onClick={() => handleCopy(linkedinUrl, "LinkedIn")}
                      title="Copy LinkedIn Link"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 transition-colors cursor-pointer"
                    >
                      {copiedItem === "LinkedIn" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider">
                    LinkedIn Profile
                  </div>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-base font-bold text-[#191817] hover:text-[#0077B5] transition-colors truncate block"
                  >
                    Ahamad Meeran R
                  </a>
                  <p className="text-xs text-stone-500 pt-0.5">
                    Connect professionally, review background, and send direct messages.
                  </p>
                </div>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <span>View LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 4: Location & Work Mode */}
              <div className="group relative p-5 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#EAE0D4] hover:border-amber-500/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100/60 text-amber-800">
                      IST (UTC+5:30)
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider">
                    Location & Timezone
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#191817]">
                    {locationAddress}, India
                  </div>
                  <p className="text-xs text-stone-500 pt-0.5">
                    Open to Remote roles worldwide and Hybrid/Onsite roles in India.
                  </p>
                </div>

                <div className="py-2 px-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Immediate Joining</span>
                </div>
              </div>
            </div>

            {/* Quick Topic Selector & One-Tap Direct Launcher */}
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
                  Select Discussion Topic (Customizes Message Subject)
                </span>
                <span className="text-[11px] font-mono text-[#FF6B35]">One-Click Ready</span>
              </div>

              {/* Topic Chips */}
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const isSelected = selectedTopic === t.subject;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(t.subject)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs scale-102"
                          : "bg-[#FAF5EF] text-stone-700 border-[#E9DFD3] hover:border-[#FF6B35]/40 hover:bg-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Primary Launch Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  id="contact-launch-email-btn"
                  href={dynamicMailto}
                  className="py-3.5 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E65620] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(255,107,53,0.35)] transition-all duration-200 cursor-pointer group"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email with Topic</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  id="contact-launch-whatsapp-btn"
                  href={dynamicWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(16,185,129,0.3)] transition-all duration-200 cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Holographic Gyroscope Reactor */}
          <div ref={rightColRef} className="lg:col-span-5 flex items-center justify-center">
            <div
              id="contact-3d-card"
              ref={gyroCardRef}
              onMouseMove={handleGyroMouseMove}
              onMouseLeave={handleGyroMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mouseTilt.y * -16}deg) rotateY(${mouseTilt.x * 16}deg)`,
                transition: "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-white/95 via-white/85 to-[#FFF5EC] backdrop-blur-2xl border border-white shadow-[0_25px_60px_-15px_rgba(255,107,53,0.22)] will-change-transform select-none group"
            >
              {/* Technical Corner Crosshairs */}
              <span className="absolute top-3 left-3 text-stone-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute top-3 right-3 text-stone-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-3 left-3 text-stone-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-3 right-3 text-stone-300 font-mono text-xs select-none pointer-events-none">+</span>

              {/* Atmospheric Background Glows */}
              <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-[#FF6B35]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-[#FF9F43]/20 blur-3xl pointer-events-none" />

              {/* Top HUD Status Bar */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#F0E4D8]/80">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#191817] uppercase">
                    ONLINE & AVAILABLE FOR HIRE
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400">
                  <Radio className="w-3 h-3 text-[#FF6B35] animate-pulse" />
                  <span>CORE.V2</span>
                </div>
              </div>

              {/* Center Holographic 3D Gyroscope Assembly */}
              <div className="relative my-6 py-4 flex items-center justify-center min-h-[290px]">
                {/* Sonar Ping Wave */}
                <div className="absolute w-56 h-56 rounded-full border border-[#FF6B35]/20 animate-ping pointer-events-none" />

                {/* Outer Dashed Orbit Ring (Rotating Clockwise) */}
                <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#FF6B35]/30 animate-[spin_28s_linear_infinite]">
                  {/* Orbiting Satellite 1 */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#FF6B35] shadow-[0_0_12px_#FF6B35] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  </div>
                  {/* Orbiting Satellite 2 */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#2F58CD] shadow-[0_0_10px_#2F58CD] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#2F58CD]" />
                  </div>
                </div>

                {/* Counter-Rotating Compass Degree Ring */}
                <div className="absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border border-[#191817]/15 animate-[spin_20s_linear_infinite_reverse]">
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-stone-400">0°</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-stone-400">180°</span>
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-stone-400">270°</span>
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-stone-400">90°</span>
                </div>

                {/* Radar Sweep Arc */}
                <div className="absolute w-44 h-44 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,107,53,0.32)_360deg)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* 3D Tilted Elliptical Gimbal Ring */}
                <div
                  className="absolute w-44 h-44 rounded-full border-2 border-white/80 shadow-[0_8px_32px_rgba(255,107,53,0.25)]"
                  style={{
                    transform: `rotate3d(1, 1, 0, ${45 + mouseTilt.y * 30}deg)`,
                    transition: "transform 0.2s ease-out",
                  }}
                />

                {/* Glowing Prismatic Quantum Core */}
                <div className="relative z-20 w-28 h-28 rounded-full bg-gradient-to-tr from-[#E65620] via-[#FF6B35] to-[#FFA048] p-1 shadow-[0_0_40px_rgba(255,107,53,0.55)] border-2 border-white flex flex-col items-center justify-center text-white text-center transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#FF5E28]/90 to-[#D44211]/90 backdrop-blur-sm flex flex-col items-center justify-center p-2 shadow-inner border border-white/30">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-200">
                      CORE // DEV
                    </span>
                    <span className="text-xl font-heading font-black tracking-tight text-white drop-shadow-sm">
                      &lt;AM /&gt;
                    </span>
                    <span className="text-[9px] font-mono font-bold text-white/90 uppercase tracking-wider">
                      FULL-STACK
                    </span>
                  </div>
                </div>

                {/* 4 Floating Technology Satellites Around the Reactor */}
                {/* Tech 1: React (Top Left) */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DFD3] shadow-md flex items-center gap-1.5 animate-[bounce_4s_ease-in-out_infinite]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D8FF]" />
                  <span className="text-[11px] font-mono font-bold text-[#191817]">React 18</span>
                </div>

                {/* Tech 2: Node.js (Top Right) */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DFD3] shadow-md flex items-center gap-1.5 animate-[bounce_4.5s_ease-in-out_infinite_0.5s]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-[11px] font-mono font-bold text-[#191817]">Node.js</span>
                </div>

                {/* Tech 3: TypeScript (Bottom Left) */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DFD3] shadow-md flex items-center gap-1.5 animate-[bounce_4.2s_ease-in-out_infinite_1s]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3178C6]" />
                  <span className="text-[11px] font-mono font-bold text-[#191817]">TypeScript</span>
                </div>

                {/* Tech 4: SQL & APIs (Bottom Right) */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DFD3] shadow-md flex items-center gap-1.5 animate-[bounce_3.8s_ease-in-out_infinite_1.5s]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="text-[11px] font-mono font-bold text-[#191817]">REST / SQL</span>
                </div>
              </div>

              {/* Bottom Live Telemetry & Quick Action Dock */}
              <div className="relative z-10 pt-3 border-t border-[#F0E4D8]/80 space-y-2.5">
                {/* Live Clock Row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#5C5651]">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span className="font-mono text-[11px] text-stone-500 uppercase">LOCAL TIME (IST):</span>
                  </div>
                  <div className="font-mono font-bold text-[#191817] tracking-wider text-xs">
                    {currentTime || "10:30:00 AM"} <span className="text-[#FF6B35] font-semibold text-[10px]">UTC+5:30</span>
                  </div>
                </div>

                {/* Telemetry Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#F0E4D8] shadow-xs">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">AVG. RESPONSE</div>
                    <div className="text-xs font-bold text-[#191817] flex items-center gap-1 mt-0.5">
                      <Zap className="w-3 h-3 text-[#FF6B35]" />
                      <span>&lt; 3 Hours</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#F0E4D8] shadow-xs">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">WORKING MODE</div>
                    <div className="text-xs font-bold text-[#191817] flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3 text-[#2F58CD]" />
                      <span>Remote / Hybrid</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(emailAddress, "DirectEmail")}
                  className="w-full py-2 px-3 rounded-xl bg-[#FAF3EB] hover:bg-[#F5E8DA] border border-[#EBDCCF] text-xs font-mono font-semibold text-[#191817] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedItem === "DirectEmail" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Email Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Quick Copy: {emailAddress}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
