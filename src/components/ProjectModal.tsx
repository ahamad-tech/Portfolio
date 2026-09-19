import React, { useState } from "react";
import { X, ArrowUpRight, CheckCircle, Layers, Cpu, ShieldCheck } from "lucide-react";
import { Project } from "../data/projectsData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Loan calculator interactive state for SanjaySuccess
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(36); // months

  if (!project) return null;

  // Simple EMI formula calculation for SanjaySuccess preview
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    loanAmount && monthlyRate
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) /
            (Math.pow(1 + monthlyRate, loanTenure) - 1)
        )
      : 0;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF4EE] border border-white/80 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="project-modal-close"
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-black border border-stone-200/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-mono text-xs font-semibold uppercase tracking-wider">
            {project.category}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#191817]">
            {project.name}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 italic">
            "{project.tagline}"
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-white/80 border border-[#EBE1D6]">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg sm:text-2xl font-extrabold font-heading text-[#191817]">
                {m.value}
              </div>
              <div className="text-[10px] sm:text-xs text-stone-500 font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feature Sandbox Component */}
        <div className="mb-6 p-5 rounded-2xl bg-white border border-[#E9DFD4] shadow-xs">
          <div className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF6B35]" />
            <span>Interactive Feature Preview</span>
          </div>

          {/* If SanjaySuccess: Interactive Loan Calculator */}
          {project.id === "sanjaysuccess" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Loan Amount</span>
                    <span className="text-[#FF6B35] font-mono">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#FF6B35] cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Tenure: {loanTenure} Months</span>
                    <span className="text-[#FF6B35] font-mono">{interestRate}% APR</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    step="6"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-[#FF6B35] cursor-pointer"
                  />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-blue-900 font-medium">Estimated Monthly Payment</div>
                  <div className="text-xl font-bold font-mono text-blue-950">${emi} / month</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Instant Pre-Qualification
                </span>
              </div>
            </div>
          )}

          {/* If Tamilsolai Academy */}
          {project.id === "tamilsolai-academy" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Live interactive subject directory and automated scheduling interface:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60">
                  <div className="font-bold text-amber-950">Physics & Chemistry</div>
                  <div className="text-[11px] text-stone-500">Curriculum v2026 • 12 Modules</div>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50/80 border border-orange-200/60">
                  <div className="font-bold text-orange-950">Higher Mathematics</div>
                  <div className="text-[11px] text-stone-500">Problem Sets & Exam Mock Series</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/60">
                  <div className="font-bold text-rose-950">Language & Grammar</div>
                  <div className="text-[11px] text-stone-500">Comprehensive Vocabulary Lab</div>
                </div>
              </div>
            </div>
          )}

          {/* If Tamilsolai Trust */}
          {project.id === "tamilsolai-trust" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Civic transparency ledger and student grant application portal:
              </p>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-stone-900">Next Welfare Drive:</span> Higher Secondary Books & Tuition Kit
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-semibold text-[11px]">
                  Goal 85% Funded
                </span>
              </div>
            </div>
          )}

          {/* If LAYAZ */}
          {project.id === "layaz" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Artisanal recipe notes and natural cold-pressed formulation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF2EB] border border-[#E8D9C8]">
                  <span className="font-bold text-[#191817]">Base Oils:</span> Pure Extra Virgin Olive Oil, Organic Coconut Oil, Raw Unrefined Shea Butter
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF2EB] border border-[#E8D9C8]">
                  <span className="font-bold text-[#191817]">Aroma Therapy:</span> French Lavender, Australian Tea Tree, Sweet Orange Peel
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Description & Highlights */}
        <div className="space-y-4 mb-6 text-sm text-stone-700 leading-relaxed">
          <h3 className="font-heading text-lg font-bold text-[#191817]">
            Project Overview & Implementation
          </h3>
          <p>{project.fullOverview}</p>

          <h4 className="font-semibold text-[#191817] pt-2">Key Architecture Highlights:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Roles */}
        <div className="border-t border-[#EAE0D5] pt-5">
          <div className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF6B35]" />
            <span>Technologies & Engineering Roles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/70 border border-[#EFE5DA] flex items-center justify-between text-xs"
              >
                <span className="font-bold text-[#191817]">{tech.name}</span>
                <span className="text-stone-500 text-[11px]">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
