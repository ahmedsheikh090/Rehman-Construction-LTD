import React from 'react';
import { Moon, Sun, MessageSquareCode, HardHat, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  onOpenAi,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'transformations', label: 'Before & After' },
    { id: 'panoramic-360', label: '360° Tours' },
    { id: 'fleet', label: 'Heavy Fleet' },
    { id: 'estimator', label: 'Fleet Estimator' },
    { id: 'inspector', label: 'X-Ray Stratum' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'government', label: 'Clients' },
    { id: 'headquarters', label: 'Office & Team' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md transition-colors duration-200 dark:border-stone-800/80 dark:bg-stone-950/95">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-x-2 gap-y-3 py-3 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('overview');
          }}
          className="group flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-none text-decoration-none"
        >
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-amber-500 font-bold text-stone-950 shadow-md transition-transform duration-200 group-hover:scale-105 dark:bg-amber-400">
            <HardHat className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="rocky-title text-sm min-[400px]:text-lg leading-tight md:whitespace-nowrap font-black tracking-tight text-stone-900 dark:text-stone-100 sm:text-2xl md:text-3xl">
              REHMAN <span className="text-amber-600 dark:text-amber-400">CONSTRUCTION</span>
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="order-3 hidden w-full basis-full items-center gap-5 overflow-x-auto pb-1 lg:flex xl:justify-between">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-semibold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400 pb-1'
                    : 'text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-xs transition-colors hover:bg-stone-100 hover:text-stone-950 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-stone-700" />}
          </button>

          {/* AI Consultant Button */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-2 sm:px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow-md dark:bg-amber-400 dark:hover:bg-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquareCode className="h-4 w-4" />
            <span className="hidden sm:inline">AI Engineering Desk</span>
            <span className="hidden min-[400px]:inline sm:hidden">AI Desk</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700 lg:hidden dark:border-stone-800 dark:text-stone-300"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-stone-200 bg-stone-50 px-4 py-4 lg:hidden dark:border-stone-800 dark:bg-stone-900">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
