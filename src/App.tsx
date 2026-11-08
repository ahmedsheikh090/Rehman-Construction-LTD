import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { PanoramicViewerSection } from './components/PanoramicViewerSection';
import { HeavyFleetSection } from './components/HeavyFleetSection';
import { FleetEstimatorSection } from './components/FleetEstimatorSection';
import { FuturisticPavementInspector } from './components/FuturisticPavementInspector';
import { QuotesSection } from './components/QuotesSection';
import { GovernmentClientsSection } from './components/GovernmentClientsSection';
import { LeadershipAndOfficeSection } from './components/LeadershipAndOfficeSection';
import { Footer } from './components/Footer';
import { AiConsultantModal } from './components/AiConsultantModal';
import { MessageSquareCode } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rc_theme');
      if (saved) return saved === 'dark';
      return true; // Default to sleek dark engineering aesthetic
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);

  // Synchronize darkMode with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rc_theme', 'light');
    }
  }, [darkMode]);

  // Track scroll position to update active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'projects',
        'transformations',
        'panoramic-360',
        'fleet',
        'estimator',
        'inspector',
        'philosophy',
        'government',
        'headquarters',
      ];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-200 antialiased dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAi={() => setAiModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Page 1: Hero with Rocky Typography & Highway Background */}
        <HeroSection
          onExploreProjects={() => scrollTo('projects')}
          onOpenAi={() => setAiModalOpen(true)}
          onGoToHeadquarters={() => scrollTo('headquarters')}
        />

        {/* Page 2: Signature Roadways, Underpasses & Mega Infrastructure */}
        <ProjectsSection />

        {/* Before & After Interactive Transformation Slider */}
        <BeforeAfterSection />

        {/* 360° Interactive Panoramic Site Tours */}
        <PanoramicViewerSection />

        {/* Heavy Mechanization Fleet & High-Rise Division */}
        <HeavyFleetSection />

        {/* Civil Fleet & Scope Estimator System */}
        <div id="estimator">
          <FleetEstimatorSection />
        </div>

        {/* Futuristic Highway & Underpass Cross-Section Inspector */}
        <div id="inspector">
          <FuturisticPavementInspector />
        </div>

        {/* Page 3: Architectural Philosophy & Quotes */}
        <QuotesSection />

        {/* Page 4: Official Signs of CDA, Balochistan, Federal Govt, Sindh, KP, PCB */}
        <GovernmentClientsSection />

        {/* Page 5: F-10 Office, Interactive Map & Owners (Sheikh Munawar & Sheikh Ali) */}
        <LeadershipAndOfficeSection />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Floating AI Consultant FAB */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-500 px-4 py-3 font-bold text-stone-950 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-300 cursor-pointer"
        title="Consult Rehman AI Engineering Desk"
        aria-label="Open AI Assistant"
      >
        <MessageSquareCode className="h-5 w-5" />
        <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">
          Rehman AI Desk
        </span>
      </button>

      {/* Interactive AI Assistant Modal */}
      <AiConsultantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}
