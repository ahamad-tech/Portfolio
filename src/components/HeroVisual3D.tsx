import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import {
  ArrowRight,
  Code,
  Sparkles,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface HeroVisual3DProps {
  onExploreProjects?: () => void;
}

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({ onExploreProjects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");

  // Three.js ambient 3D scene (Optical glass orbs, refractive core, caustics, and orbiting studio rings)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8.5;
    camera.position.y = 0.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting setup: High-end product photography lighting
    const ambientLight = new THREE.AmbientLight(0xfff2e6, 1.3);
    scene.add(ambientLight);

    // Main studio key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    // Warm orange fill light
    const warmFillLight = new THREE.DirectionalLight(0xff8844, 1.6);
    warmFillLight.position.set(-6, -2, 3);
    scene.add(warmFillLight);

    // Rim specular light
    const rimLight = new THREE.PointLight(0xffc8a0, 2.0, 20);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // Sub-Laptop Studio Caustic PointLight: Projects realistic photon light upward onto laptop & floor
    const subLaptopLight = new THREE.PointLight(0xff6b35, 4.5, 14);
    subLaptopLight.position.set(-0.5, -1.8, 1.8);
    scene.add(subLaptopLight);

    // Geometries & Materials tracking for clean disposal
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // 1. Large 3D Glass Orbiting Ribbon
    const torusGeo = new THREE.TorusGeometry(3.4, 0.16, 24, 100);
    geometries.push(torusGeo);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffeedd,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.9,
      thickness: 1.5,
      transparent: true,
      opacity: 0.78,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    materials.push(glassMat);

    const torus = new THREE.Mesh(torusGeo, glassMat);
    torus.rotation.x = Math.PI / 3.2;
    torus.rotation.y = -Math.PI / 6;
    torus.position.set(0.3, 0.1, -0.6);
    scene.add(torus);

    // =========================================================================
    // 2. PHOTOREALISTIC OPTICAL GLASS ORB & REFRACTIVE CORE (Below the Laptop)
    // =========================================================================
    const orangeOrbGroup = new THREE.Group();
    orangeOrbGroup.position.set(-2.4, -1.9, 1.8);
    scene.add(orangeOrbGroup);

    // Outer Optical Glass Sphere with Caustic Transmission & Physical Attenuation
    const outerSphereGeo = new THREE.SphereGeometry(0.92, 64, 64);
    geometries.push(outerSphereGeo);
    const opticalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xff7a40,
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.93,
      thickness: 2.6,
      transparent: true,
      opacity: 0.9,
      ior: 1.56,
      attenuationColor: new THREE.Color(0xff4500),
      attenuationDistance: 1.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      specularIntensity: 1.5,
    });
    materials.push(opticalGlassMat);
    const outerSphere = new THREE.Mesh(outerSphereGeo, opticalGlassMat);
    orangeOrbGroup.add(outerSphere);

    // Internal Refractive Gemstone Core (Spins inside the glass orb catching caustic rays)
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.46, 0);
    geometries.push(innerCoreGeo);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffaa44,
      emissive: 0xff6600,
      emissiveIntensity: 0.75,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    materials.push(innerCoreMat);
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    orangeOrbGroup.add(innerCore);

    // Orbiting Precision Titanium Gimbal Ring
    const gimbalRingGeo = new THREE.TorusGeometry(1.22, 0.025, 16, 64);
    geometries.push(gimbalRingGeo);
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xffcfb3,
      metalness: 0.85,
      roughness: 0.2,
    });
    materials.push(titaniumMat);
    const gimbalRing = new THREE.Mesh(gimbalRingGeo, titaniumMat);
    gimbalRing.rotation.x = Math.PI / 2.5;
    gimbalRing.rotation.y = Math.PI / 6;
    orangeOrbGroup.add(gimbalRing);

    // 3. Floating Frosted Studio Plinth Disc (in 3D under the laptop center)
    const plinthGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.06, 48);
    geometries.push(plinthGeo);
    const plinthMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd8be,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.85,
      thickness: 0.4,
      transparent: true,
      opacity: 0.45,
      ior: 1.45,
    });
    materials.push(plinthMat);
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.position.set(0.1, -2.1, 0.2);
    plinthMesh.rotation.x = 0.1;
    scene.add(plinthMesh);

    // 4. Secondary Optical Champagne Glass Orb (Right side)
    const bgSphereGeo = new THREE.SphereGeometry(0.68, 36, 36);
    geometries.push(bgSphereGeo);
    const bgSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xffaa77,
      metalness: 0.08,
      roughness: 0.15,
      transmission: 0.88,
      thickness: 1.8,
      transparent: true,
      opacity: 0.85,
      clearcoat: 0.9,
    });
    materials.push(bgSphereMat);
    const bgSphere = new THREE.Mesh(bgSphereGeo, bgSphereMat);
    bgSphere.position.set(3.5, -1.6, -0.6);
    scene.add(bgSphere);

    // 5. Ambient micro liquid glass droplets & sparkles
    const dropletGroup = new THREE.Group();
    const dropletCount = 14;
    const dropletGeo = new THREE.OctahedronGeometry(0.08, 0);
    geometries.push(dropletGeo);
    const dropletMat = new THREE.MeshStandardMaterial({
      color: 0xffaa77,
      roughness: 0.25,
      metalness: 0.75,
    });
    materials.push(dropletMat);

    const droplets: THREE.Mesh[] = [];
    for (let i = 0; i < dropletCount; i++) {
      const p = new THREE.Mesh(dropletGeo, dropletMat);
      p.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      dropletGroup.add(p);
      droplets.push(p);
    }
    scene.add(dropletGroup);

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();

      // Gentle floating and rotation of 3D glass ribbon
      torus.rotation.z = elapsed * 0.1;
      torus.position.y = Math.sin(elapsed * 0.8) * 0.08;

      // Realistic float & multi-axis rotation of optical glass orb
      orangeOrbGroup.position.y = -1.9 + Math.sin(elapsed * 1.1) * 0.07;
      orangeOrbGroup.position.x = -2.4 + Math.cos(elapsed * 0.7) * 0.04;
      outerSphere.rotation.y = elapsed * 0.25;

      // Internal gemstone core spins with counter-rotation
      innerCore.rotation.x = elapsed * 0.5;
      innerCore.rotation.y = -elapsed * 0.6;

      // Gimbal ring precision wobble
      gimbalRing.rotation.z = elapsed * 0.35;
      gimbalRing.rotation.x = Math.PI / 2.5 + Math.sin(elapsed * 0.9) * 0.08;

      // Subtle pulse on studio caustic light
      subLaptopLight.intensity = 4.2 + Math.sin(elapsed * 1.5) * 0.5;

      // Secondary orb float
      bgSphere.position.y = -1.6 + Math.cos(elapsed * 0.9) * 0.05;
      bgSphere.rotation.y = -elapsed * 0.2;

      // Micro droplets drift
      droplets.forEach((p, idx) => {
        p.position.y += Math.sin(elapsed + idx) * 0.002;
        p.rotation.x += 0.01;
        p.rotation.y += 0.015;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, []);

  // GSAP floating micro-animations on cards
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to("#hero-floating-code", {
        y: "-=7",
        rotation: "-=1.5",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to("#hero-floating-tag", {
        y: "+=6",
        rotation: "+=2",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to("#hero-floating-js", {
        y: "-=8",
        rotation: "+=3",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });
      gsap.to("#hero-tech-stack-cards", {
        y: "-=6",
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });
      gsap.to("#hero-floating-badge", {
        y: "+=6",
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/13] max-w-[640px] mx-auto select-none flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Background Three.js WebGL Canvas (Torusknot glass ribbon, optical orbs & lighting) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* ========================================================================= */}
      {/* REALISTIC MULTI-TIER STUDIO SHADOW & CAUSTIC LIGHT POOL (BELOW LAPTOP)  */}
      {/* ========================================================================= */}
      <div className="absolute w-[82%] h-[40%] bottom-[4%] left-[9%] pointer-events-none -z-10 flex items-center justify-center">
        {/* 1. Deep ambient ground occlusion */}
        <div className="absolute w-full h-full rounded-full bg-[#1c0f08]/25 blur-3xl scale-110" />

        {/* 2. Focused mid-depth penumbra shadow directly cast by keyboard chassis */}
        <div className="absolute w-[86%] h-[45%] top-[25%] rounded-full bg-[#180a04]/40 blur-xl scale-y-75" />

        {/* 3. Razor contact ambient occlusion directly along the front lip */}
        <div className="absolute w-[72%] h-[12%] top-[38%] rounded-full bg-[#0a0503]/75 blur-[4px]" />

        {/* 4. Tangible Floating Vitreous Studio Pedestal Disc with laser-etched marks */}
        <div className="absolute w-[76%] sm:w-[80%] h-[32px] sm:h-[40px] top-[30%] rounded-full bg-gradient-to-r from-white/30 via-[#FF6B35]/25 to-white/10 backdrop-blur-2xl border border-white/60 shadow-[0_20px_45px_rgba(255,107,53,0.25),inset_0_1px_3px_rgba(255,255,255,0.9)] flex items-center justify-center">
          {/* Concentric etched optical tracking rings */}
          <div className="w-[88%] h-[65%] rounded-full border border-white/50 flex items-center justify-between px-6 text-[7px] font-mono font-bold text-white/70">
            <span>0°</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#ff6b35]" />
            <span>90°</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#ff6b35]" />
            <span>180°</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#ff6b35]" />
            <span>270°</span>
          </div>
        </div>

        {/* 5. Radiant Caustic Photon dispersion glow */}
        <div className="absolute w-[70%] h-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.38)_0%,rgba(255,140,80,0.18)_45%,transparent_75%)] blur-2xl" />
      </div>

      {/* 3D Transform Container (Reacts to Mouse Movement with Damped Pivot) */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 10}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ============================================================ */}
        {/* 1. FLOATING CODE WINDOW (TOP LEFT)                           */}
        {/* ============================================================ */}
        <div
          id="hero-floating-code"
          className="absolute -top-2 sm:top-4 -left-2 sm:left-2 z-20 w-44 sm:w-56 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_16px_32px_-8px_rgba(235,115,50,0.14),0_4px_12px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:scale-105"
          style={{
            transform: "translateZ(50px) rotate(-4deg)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-black/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-auto text-[10px] font-mono text-stone-400">index.html</span>
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-stone-600">
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">1</span>
              <span>&lt;<span className="text-[#2F58CD]">html</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">2</span>
              <span className="pl-2">&lt;<span className="text-[#2F58CD]">head</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">3</span>
              <span className="pl-4">&lt;<span className="text-[#2F58CD]">title</span>&gt;<span className="text-[#FF6B35]">Build</span>&lt;/<span className="text-[#2F58CD]">title</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">4</span>
              <span className="pl-2">&lt;/<span className="text-[#2F58CD]">head</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">5</span>
              <span className="pl-2">&lt;<span className="text-[#2F58CD]">body</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">6</span>
              <span className="pl-4">&lt;<span className="text-[#2F58CD]">h1</span>&gt;<span className="text-[#191817] font-semibold">Better Web</span></span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">7</span>
              <span className="pl-4"><span className="text-[#191817] font-semibold">Experiences</span>&lt;/<span className="text-[#2F58CD]">h1</span>&gt;</span>
            </div>
            <div className="flex gap-2 text-stone-400">
              <span className="select-none text-stone-300 w-3">8</span>
              <span>&lt;/<span className="text-[#2F58CD]">html</span>&gt;</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FLOATING `</>` CHIP (TOP CENTER)                          */}
        {/* ============================================================ */}
        <div
          id="hero-floating-tag"
          className="absolute top-2 sm:top-6 left-[48%] -translate-x-1/2 z-20 px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_10px_25px_rgba(0,0,0,0.04)] font-mono font-bold text-sm text-[#191817] flex items-center gap-1.5 transition-transform hover:scale-110"
          style={{ transform: "translateZ(70px) rotate(6deg)" }}
        >
          <Code className="w-4 h-4 text-[#FF6B35]" />
          <span>&lt;/&gt;</span>
        </div>

        {/* ============================================================ */}
        {/* 3. FLOATING AMBER `JS` BADGE (TOP RIGHT)                     */}
        {/* ============================================================ */}
        <div
          id="hero-floating-js"
          className="absolute top-4 sm:top-8 right-8 sm:right-16 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-[#FF9F43] to-[#FF6B35] text-white font-extrabold text-base sm:text-lg flex items-center justify-center shadow-[0_12px_24px_rgba(255,107,53,0.35)] border border-white/40 transition-transform hover:scale-110 hover:rotate-6"
          style={{ transform: "translateZ(65px) rotate(12deg)" }}
        >
          JS
        </div>

        {/* ========================================================================= */}
        {/* 4. HYPER-REALISTIC MACBOOK PRO UNIBODY WORKSTATION                        */}
        {/* ========================================================================= */}
        <div
          id="hero-3d-laptop"
          className="relative z-10 w-[310px] sm:w-[430px] md:w-[490px] transition-transform duration-300"
          style={{
            transform: "translateZ(20px) rotateX(8deg) rotateY(-7deg) rotateZ(1deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ==================== A. SCREEN LID (UPPER CHASSIS) ==================== */}
          <div className="relative rounded-t-2xl sm:rounded-t-3xl p-2 sm:p-2.5 bg-gradient-to-b from-[#2A2928] via-[#1B1A19] to-[#121110] border border-[#524E4B]/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_15px_30px_-10px_rgba(235,115,50,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]">
            {/* Top Webcam Notch & Status Lens */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-2 bg-[#0E0D0C] rounded-b-lg flex items-center justify-center gap-1.5 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A1817] ring-1 ring-white/10 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-[#3B82F6]/60" />
              </div>
              <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
            </div>

            {/* Laptop Display (High Polish Retina Screen with IDE & Live Showcase) */}
            <div className="relative rounded-xl overflow-hidden bg-[#0F0E0D] text-white aspect-[16/10] flex flex-col justify-between select-none shadow-inner border border-black/80">
              {/* Subtle glass reflection sheen across Retina panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-30" />

              {/* macOS Window Header Bar */}
              <div className="relative z-20 flex items-center justify-between px-3 py-1.5 bg-[#1A1817] border-b border-white/5 text-[10px] font-mono">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
                </div>

                {/* File tab navigation */}
                <div className="flex items-center gap-1 bg-[#121110] px-2.5 py-0.5 rounded-md border border-white/10 text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D8FF]" />
                  <span className="font-semibold text-[9px] sm:text-[10px]">PortfolioApp.tsx</span>
                  <span className="text-stone-500 hover:text-white ml-1 cursor-pointer">×</span>
                </div>

                {/* Git branch status */}
                <div className="hidden sm:flex items-center gap-1.5 text-[9px] text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>main • clean</span>
                </div>
              </div>

              {/* Split View: Left Mini Code, Right High-Fidelity App Mockup */}
              <div className="relative z-10 grid grid-cols-12 h-full">
                {/* Left Mini Code Editor (Col 5) */}
                <div className="col-span-5 p-2.5 sm:p-3 bg-[#141312] border-r border-white/5 flex flex-col justify-between font-mono text-[8px] sm:text-[9.5px] leading-relaxed text-stone-400">
                  <div className="space-y-1">
                    <div className="text-[#78726B]">// Engineer modern web app</div>
                    <div>
                      <span className="text-[#C084FC]">const</span>{" "}
                      <span className="text-[#60A5FA]">developer</span> = &#123;
                    </div>
                    <div className="pl-2">
                      <span className="text-stone-300">name:</span>{" "}
                      <span className="text-[#34D399]">"Ahamad"</span>,
                    </div>
                    <div className="pl-2">
                      <span className="text-stone-300">role:</span>{" "}
                      <span className="text-[#FBBF24]">"Full-Stack"</span>,
                    </div>
                    <div className="pl-2">
                      <span className="text-stone-300">stack:</span> [
                      <span className="text-[#FF6B35]">"React"</span>,{" "}
                      <span className="text-[#34D399]">"Node"</span>],
                    </div>
                    <div className="pl-2">
                      <span className="text-stone-300">delivering:</span>{" "}
                      <span className="text-[#60A5FA]">true</span>
                    </div>
                    <div>&#125;;</div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[7px] sm:text-[8px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Terminal className="w-2.5 h-2.5 text-[#FF6B35]" />
                      <span>tsc: OK</span>
                    </span>
                    <span className="text-[#FF6B35] font-bold">LIVE SYNC</span>
                  </div>
                </div>

                {/* Right Interactive Portfolio Showcase (Col 7) */}
                <div className="col-span-7 p-3 sm:p-4 bg-gradient-to-br from-white via-[#FAF4EE] to-[#FFF5ED] text-[#191817] flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1 text-[8px] font-mono font-bold text-[#FF6B35] uppercase bg-[#FF6B35]/10 px-1.5 py-0.5 rounded">
                        <span>● LIVE PREVIEW 60 FPS</span>
                      </div>
                      <span className="text-[8px] font-mono text-stone-400">v2.4</span>
                    </div>

                    <h4 className="font-heading text-sm sm:text-lg font-black text-stone-900 leading-tight">
                      Crafting <br />
                      <span className="text-[#FF6B35]">Impactful Code</span>
                    </h4>

                    <p className="text-[8px] sm:text-[9.5px] text-stone-600 leading-snug line-clamp-2">
                      Fast, responsive web apps designed with precision architecture.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-200/60">
                    <button
                      onClick={onExploreProjects}
                      className="px-2.5 py-1 rounded-full bg-[#191817] text-white text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 hover:bg-[#FF6B35] transition-colors cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                    <div className="flex items-center gap-1 text-[8px] font-mono text-stone-500">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#0E8A68]" />
                      <span>Production Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Chin with Embossed Brand */}
              <div className="px-3 py-0.5 bg-[#141312] border-t border-white/5 flex items-center justify-center">
                <span className="text-[7px] tracking-[0.2em] font-mono font-bold text-stone-500 uppercase">
                  MacBook Pro
                </span>
              </div>
            </div>
          </div>

          {/* ==================== B. ANODIZED HINGE MECHANISM ==================== */}
          <div className="relative h-2 w-[98%] mx-auto bg-gradient-to-r from-[#1E1D1C] via-[#33312F] to-[#1E1D1C] rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.8)] border-x border-black/80" />

          {/* ==================== C. LOWER UNIBODY CHASSIS (KEYBOARD & TRACKPAD) ==================== */}
          <div
            className="relative -mt-0.5 w-full h-[145px] sm:h-[190px] md:h-[210px] rounded-b-2xl bg-gradient-to-b from-[#B8B1A8] via-[#948D85] to-[#6E6861] shadow-[0_32px_64px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.7)] border-t border-white/50 border-b border-black/40 flex flex-col justify-between p-2 sm:p-2.5"
            style={{
              transform: "rotateX(65deg) translateZ(-4px)",
              transformOrigin: "top center",
            }}
          >
            {/* Left and Right Thunderbolt I/O Ports simulation on edge */}
            <div className="absolute top-4 -left-1.5 w-1.5 h-6 bg-[#2B2928] rounded-l flex flex-col justify-around py-0.5 shadow-inner">
              <div className="w-1 h-1.5 bg-[#4A4643] rounded-xs mx-auto" />
              <div className="w-1 h-1.5 bg-[#4A4643] rounded-xs mx-auto" />
            </div>
            <div className="absolute top-4 -right-1.5 w-1.5 h-6 bg-[#2B2928] rounded-r flex flex-col justify-around py-0.5 shadow-inner">
              <div className="w-1 h-1.5 bg-[#4A4643] rounded-xs mx-auto" />
              <div className="w-1 h-1.5 bg-[#FF9F43] rounded-xs mx-auto shadow-[0_0_4px_#ff9f43]" />
            </div>

            {/* Recessed CNC Keyboard Well */}
            <div className="w-full rounded-xl bg-[#141312] border border-black/80 p-1.5 sm:p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),inset_0_-1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between gap-1">
              {/* Function Key Row */}
              <div className="grid grid-cols-12 gap-1 text-[6px] font-mono text-stone-400">
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#242220] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8),inset_0_0.5px_0.5px_rgba(255,255,255,0.15)] flex items-center justify-center font-bold">
                  esc
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2.5 sm:h-3 rounded-xs bg-[#201E1D] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8)] flex items-center justify-center text-[5px]"
                  >
                    F{i + 1}
                  </div>
                ))}
                {/* Touch ID Sensor Button */}
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1C1B1A] border border-white/20 shadow-[0_0_2px_rgba(255,255,255,0.2)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full border border-stone-500" />
                </div>
              </div>

              {/* Number Row */}
              <div className="grid grid-cols-13 gap-1">
                {["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"].map(
                  (k, idx) => (
                    <div
                      key={idx}
                      className="h-2.5 sm:h-3 rounded-xs bg-[#22201F] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8),inset_0_0.5px_0.5px_rgba(255,255,255,0.12)] flex items-center justify-center text-[6px] font-mono text-stone-300"
                    >
                      {k}
                    </div>
                  )
                )}
              </div>

              {/* QWERTY Row */}
              <div className="grid grid-cols-12 gap-1">
                {["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "delete"].map(
                  (k, idx) => (
                    <div
                      key={idx}
                      className={`h-2.5 sm:h-3 rounded-xs bg-[#22201F] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8),inset_0_0.5px_0.5px_rgba(255,255,255,0.12)] flex items-center justify-center text-[6px] font-mono text-stone-300 ${
                        idx === 0 || idx === 11 ? "col-span-1.5 bg-[#1F1D1C]" : ""
                      }`}
                    >
                      {k}
                    </div>
                  )
                )}
              </div>

              {/* ASDF Row */}
              <div className="grid grid-cols-11 gap-1">
                {["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "return"].map(
                  (k, idx) => (
                    <div
                      key={idx}
                      className={`h-2.5 sm:h-3 rounded-xs bg-[#22201F] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8),inset_0_0.5px_0.5px_rgba(255,255,255,0.12)] flex items-center justify-center text-[6px] font-mono text-stone-300 ${
                        idx === 0 || idx === 10 ? "bg-[#1E1C1B]" : ""
                      }`}
                    >
                      {k}
                    </div>
                  )
                )}
              </div>

              {/* ZXCV Bottom Row + Spacebar */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1F1D1C] border border-black/50 flex items-center justify-center text-[5.5px] font-mono text-stone-400">
                  control
                </div>
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1F1D1C] border border-black/50 flex items-center justify-center text-[5.5px] font-mono text-stone-400">
                  option
                </div>
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1F1D1C] border border-black/50 flex items-center justify-center text-[6px] font-mono text-stone-300">
                  ⌘ cmd
                </div>
                {/* Wide Spacebar Key */}
                <div className="col-span-2 h-2.5 sm:h-3 rounded-xs bg-[#252321] border border-black/50 shadow-[0_1px_1px_rgba(0,0,0,0.8),inset_0_0.5px_0.5px_rgba(255,255,255,0.15)] flex items-center justify-center" />
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1F1D1C] border border-black/50 flex items-center justify-center text-[6px] font-mono text-stone-300">
                  ⌘ cmd
                </div>
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1F1D1C] border border-black/50 flex items-center justify-center text-[5.5px] font-mono text-stone-400">
                  option
                </div>
                {/* Arrow Keys Cluster */}
                <div className="h-2.5 sm:h-3 rounded-xs bg-[#1D1B1A] border border-black/50 flex items-center justify-center text-[5px] text-stone-300">
                  ◀ ▲ ▶
                </div>
              </div>
            </div>

            {/* Precision Force Touch Glass Trackpad */}
            <div className="w-36 sm:w-48 md:w-54 h-14 sm:h-18 mx-auto rounded-xl bg-gradient-to-b from-[#8C867F] via-[#7D7770] to-[#6E6862] border border-white/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.6)]" />

            {/* Center Front Display Notch (Opening Scoop) */}
            <div className="w-16 sm:w-20 h-1.5 bg-[#423F3C] rounded-b-md mx-auto shadow-inner" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. STACKED GLASS TECH CARDS (RIGHT SIDE)                     */}
        {/* ============================================================ */}
        <div
          id="hero-tech-stack-cards"
          className="absolute -right-2 sm:right-1 top-12 sm:top-16 z-20 flex flex-col gap-2.5"
          style={{ transform: "translateZ(60px) rotate(2deg)" }}
        >
          {/* React Card */}
          <div className="group flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_16px_32px_rgba(20,158,202,0.15)] cursor-default">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E0F5FA] flex items-center justify-center text-[#00D8FF] group-hover:rotate-45 transition-transform duration-500">
              <svg className="w-5 h-5 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="2.5" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#191817]">React</span>
          </div>

          {/* Node.js Card */}
          <div className="group flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_16px_32px_rgba(83,158,67,0.15)] cursor-default">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EAF7EA] flex items-center justify-center text-[#43853D]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2zm0 2.3L5.5 8.6v6.8L12 19.7l6.5-4.3V8.6L12 4.3z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#191817]">Node.js</span>
          </div>

          {/* MySQL Card */}
          <div className="group flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_16px_32px_rgba(0,117,143,0.15)] cursor-default">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E6F4F8] flex items-center justify-center text-[#00758F]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4z" />
                <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
                <path d="M4 17c0 2.2 3.6 4 8 4s8-1.8 8-4" />
                <path d="M4 7v10" />
                <path d="M20 7v10" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#191817]">MySQL</span>
          </div>

          {/* PHP Card */}
          <div className="group flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_16px_32px_rgba(119,123,179,0.15)] cursor-default">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EEF0FB] flex items-center justify-center text-[#6181B6] font-extrabold text-[11px] font-mono">
              PHP
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#191817]">PHP</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. FLOATING CODE PILL (BOTTOM RIGHT)                         */}
        {/* ============================================================ */}
        <div
          id="hero-floating-badge"
          className="absolute -bottom-4 right-4 sm:right-10 z-20 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_16px_32px_rgba(0,0,0,0.06)] font-mono text-[11px] sm:text-xs text-stone-600 transition-transform duration-300 hover:scale-105"
          style={{ transform: "translateZ(45px) rotate(-3deg)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400">/</span>
            <span className="font-semibold text-[#191817]">code</span>
            <span className="text-stone-400">•</span>
            <span>create</span>
            <span className="text-stone-400">•</span>
            <span>build</span>
            <span className="text-stone-400">•</span>
            <span className="text-[#FF6B35] font-semibold">repeat</span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
