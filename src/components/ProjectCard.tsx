import React, { useRef, useState } from "react";
import { ArrowUpRight, Globe, Lock, ExternalLink } from "lucide-react";
import { Project } from "../data/projectsData";

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const targetUrl = project.liveUrl || project.githubUrl || "#";

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8; // max 8 deg tilt
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-full flex"
    >
      <a
        ref={cardRef}
        id={`project-card-${project.id}`}
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.25s ease",
        }}
        className="group relative w-full flex flex-col rounded-3xl bg-white/85 backdrop-blur-xl border border-[#EAE0D5] p-5 sm:p-6 shadow-[0_14px_36px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_60px_-12px_rgba(235,107,53,0.22)] cursor-pointer overflow-hidden text-inherit no-underline"
      >
        {/* Dynamic 3D Specular Glare Sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7), transparent 80%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Visual Preview Area with 3D Pop Out & Real Website Picture */}
        <div
          style={{ transform: "translateZ(26px)", transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#ECE2D7] flex flex-col justify-between transition-transform duration-300 shadow-sm"
        >
          {/* Top Browser Chrome Bar */}
          <div className="relative z-20 flex items-center justify-between px-3.5 py-2 bg-[#1C1A18]/90 backdrop-blur-md border-b border-white/10 text-stone-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/10 border border-white/10 text-[11px] font-mono text-stone-200 max-w-[55%] truncate">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">{project.displayDomain || project.liveUrl?.replace(/^https?:\/\//, "")}</span>
            </div>

            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider text-stone-200 bg-white/15 border border-white/15">
              {project.category.split("/")[0].trim()}
            </span>
          </div>

          {/* Picture of the Website */}
          <div className="relative w-full h-full overflow-hidden bg-stone-950 flex-grow">
            <img
              src={project.imageUrl}
              alt={`${project.name} Website`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle Gradient & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

            {/* Bottom In-Card Bar: Domain & Key Metric Badge */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium shadow-xs">
                <Globe className="w-3 h-3 text-[#FF6B35]" />
                <span className="font-mono text-[10px]">{project.displayDomain}</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#191817] text-[10px] font-mono font-bold shadow-xs">
                {project.metrics[0]?.value} • {project.metrics[0]?.label}
              </div>
            </div>

            {/* Hover Action Badge appearing on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[1.5px]">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#191817] text-xs font-bold shadow-lg transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                <span>View {project.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6B35]" />
              </span>
            </div>
          </div>
        </div>

        {/* Project Meta & Details */}
        <div
          style={{ transform: "translateZ(18px)" }}
          className="mt-5 flex flex-col flex-grow justify-between space-y-4"
        >
          <div>
            <div className="text-xs font-semibold text-[#FF6B35] tracking-wide uppercase font-mono">
              {project.category}
            </div>
            <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-[#191817] group-hover:text-[#FF6B35] transition-colors">
              {project.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#66605A] line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technology Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#FAF2EB] text-[#524C46] text-[11px] font-medium border border-[#EFE3D5]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom CTA Row */}
          <div className="pt-2 border-t border-[#EAE0D5] flex items-center justify-between text-sm font-semibold text-[#191817]">
            <div className="flex items-center gap-2">
              <span className="group-hover:text-[#FF6B35] transition-colors">
                Launch Live Project
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] font-bold tracking-wider uppercase">
                Direct Link
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FAF4EE] group-hover:bg-[#FF6B35] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
