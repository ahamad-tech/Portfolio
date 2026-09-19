export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fullOverview: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  displayDomain: string;
  features: string[];
  techStack: { name: string; role: string }[];
  previewTheme: {
    bgGradient: string;
    cardBorder: string;
    tagBg: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "tamilsolai-academy",
    name: "Tamilsolai Academy",
    category: "Educational / Coaching Website",
    tagline: "Empowering students through tailored learning paths and modern digital classrooms.",
    description: "A comprehensive digital educational portal engineered for students and educators, featuring live course catalogs, batch scheduling, and student admission inquiry workflows.",
    fullOverview: "Designed and implemented from scratch for Tamilsolai Academy to transition local coaching into a modern digital platform. The platform highlights academic milestones, faculty credentials, syllabus modules, and enables parents to seamlessly book counseling sessions.",
    tags: ["React", "Tailwind CSS", "JavaScript", "Responsive UI", "Form Validation"],
    metrics: [
      { label: "Active Course Modules", value: "24+" },
      { label: "Student Inquiries", value: "450+" },
      { label: "Load Speed", value: "< 0.8s" }
    ],
    accentColor: "#FF6B35",
    liveUrl: "https://tamilsolaiacademy.com",
    githubUrl: "https://github.com/ahamad/tamilsolai-academy",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    displayDomain: "tamilsolaiacademy.com",
    features: [
      "Dynamic course catalog with interactive subject filtering",
      "Interactive batch schedule calendar and teacher profiles",
      "Parent counseling & admission appointment booking flow",
      "Optimized mobile-first interface for accessibility across devices"
    ],
    techStack: [
      { name: "React", role: "Frontend Component Architecture" },
      { name: "Tailwind CSS", role: "Utility Styling & Design System" },
      { name: "JavaScript (ES6+)", role: "Client-side Filtering & State" },
      { name: "Responsive Design", role: "Cross-device UX Optimization" }
    ],
    previewTheme: {
      bgGradient: "from-amber-50 via-orange-50/60 to-stone-50",
      cardBorder: "rgba(255, 107, 53, 0.2)",
      tagBg: "rgba(255, 107, 53, 0.1)"
    }
  },
  {
    id: "tamilsolai-trust",
    name: "Tamilsolai Trust",
    category: "Trust / Organization Website",
    tagline: "Connecting community initiatives, transparent outreach, and donor engagement.",
    description: "A civic non-profit trust web platform dedicated to educational empowerment and rural welfare programs, with transparency reports and donor outreach workflows.",
    fullOverview: "Built for the Tamilsolai Trust organization to highlight community welfare projects, tree plantation drives, and student scholarship sponsorships. Engineered with a secure database-backed workflow for donation records and event registrations.",
    tags: ["PHP", "MySQL", "Modern CSS", "REST API", "Responsive"],
    metrics: [
      { label: "Welfare Programs", value: "18+" },
      { label: "Donation Flows", value: "100% Secure" },
      { label: "Community Reach", value: "1.2k+" }
    ],
    accentColor: "#E05A2B",
    liveUrl: "https://tamilsolaitrust.org",
    githubUrl: "https://github.com/ahamad/tamilsolai-trust",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    displayDomain: "tamilsolaitrust.org",
    features: [
      "Real-time scholarship initiative showcase and beneficiary stories",
      "Event gallery with categorized community drive highlights",
      "Secure donor submission forms with database logging",
      "Admin data export capabilities for trust audit reports"
    ],
    techStack: [
      { name: "PHP", role: "Backend Server Processing & API Endpoints" },
      { name: "MySQL", role: "Relational Storage for Donor & Event Records" },
      { name: "Modern CSS", role: "Warm Editorial Typography & Responsive Grids" },
      { name: "Vanilla JS", role: "Interactive Gallery & Asynchronous Form Handling" }
    ],
    previewTheme: {
      bgGradient: "from-orange-50/70 via-rose-50/40 to-amber-50",
      cardBorder: "rgba(224, 90, 43, 0.2)",
      tagBg: "rgba(224, 90, 43, 0.1)"
    }
  },
  {
    id: "sanjaysuccess",
    name: "SanjaySuccess",
    category: "Loan Company Website",
    tagline: "Precision loan computation, instant eligibility check, and customer trust.",
    description: "A modern fintech loan advisory web portal with interactive EMI calculators, eligibility assessment matrices, and clear financial guidance for retail & business borrowers.",
    fullOverview: "Developed for SanjaySuccess to simplify complex borrowing options into clear, digestible steps. Features interactive sliders for principal loan amounts, interest rates, and loan tenure calculations with instant graphical breakdown of monthly interest vs principal.",
    tags: ["React", "Node.js", "Express", "Financial Tools", "Tailwind CSS"],
    metrics: [
      { label: "Loan Schemes", value: "12 Types" },
      { label: "Calculator Accuracy", value: "100%" },
      { label: "Lead Inquiries", value: "300+/mo" }
    ],
    accentColor: "#2F58CD",
    liveUrl: "https://sanjaysuccess.com",
    githubUrl: "https://github.com/ahamad/sanjaysuccess-loan",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    displayDomain: "sanjaysuccess.com",
    features: [
      "Interactive real-time EMI Calculator with monthly amortization breakdown",
      "Instant Loan Eligibility screener with step-by-step guidance",
      "Multi-category support (Personal, Business, Home, Vehicle Loans)",
      "Secure customer application submission with input sanitation"
    ],
    techStack: [
      { name: "React", role: "Interactive Calculator State & Sliders" },
      { name: "Node.js & Express", role: "Backend API for Inquiry Handling" },
      { name: "Tailwind CSS", role: "Corporate Trust Layout & Data Tables" },
      { name: "Mathematical Formulas", role: "Standard Reducing-Balance EMI Algorithm" }
    ],
    previewTheme: {
      bgGradient: "from-blue-50/70 via-indigo-50/40 to-stone-50",
      cardBorder: "rgba(47, 88, 205, 0.2)",
      tagBg: "rgba(47, 88, 205, 0.1)"
    }
  },
  {
    id: "layaz",
    name: "LAYAZ",
    category: "Handmade Soap Company Website",
    tagline: "Artisanal organic skincare crafted with pure botanical extracts and luxury aesthetics.",
    description: "A minimalist artisanal e-commerce experience showcasing cold-pressed botanical soaps, fragrance profiles, ingredient transparency lists, and order checkout flows.",
    fullOverview: "A boutique brand web experience crafted for LAYAZ Handmade Soaps. Emphasizes tactile luxury, ingredient storytelling (shea butter, activated charcoal, lavender essential oils), skin-type filtering, and an intuitive cart flow for conscious shoppers.",
    tags: ["React", "Full-Stack", "E-Commerce", "Tailwind CSS", "Animations"],
    metrics: [
      { label: "Soap Varieties", value: "16 Blends" },
      { label: "Organic Ingredients", value: "100% Pure" },
      { label: "Customer Rating", value: "4.9 / 5" }
    ],
    accentColor: "#D97706",
    liveUrl: "https://layaz.in",
    githubUrl: "https://github.com/ahamad/layaz-soap-store",
    imageUrl: "https://images.unsplash.com/photo-1607006314188-34870f2b3806?auto=format&fit=crop&w=1200&q=80",
    displayDomain: "layaz.in",
    features: [
      "Skin concern and aroma note filtering (Sensitive, Exfoliating, Relaxing)",
      "Interactive ingredient transparency modal for every soap bar",
      "Smooth cart drawer with real-time subtotal and shipping calculations",
      "Editorial product presentation with warm peach and botanical tones"
    ],
    techStack: [
      { name: "React", role: "Dynamic Product Catalog & State Management" },
      { name: "Node.js", role: "Order Ingestion & Catalog API" },
      { name: "Tailwind CSS", role: "Luxury Minimalist Visual Hierarchy" },
      { name: "Motion & GSAP", role: "Smooth Hover & Micro-interactions" }
    ],
    previewTheme: {
      bgGradient: "from-amber-50 via-orange-50/50 to-stone-100",
      cardBorder: "rgba(217, 119, 6, 0.25)",
      tagBg: "rgba(217, 119, 6, 0.1)"
    }
  }
];
