import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Building2, Truck, Droplets } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenAi: () => void;
  onGoToHeadquarters: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenAi,
  onGoToHeadquarters,
}) => {
  return (
    <section id="overview" className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between">
      {/* Background Highway Infrastructure Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/cpec_balochistan_n50_1794113940856.jpg"
          alt="Rehman Construction CPEC Western Route Balochistan Corridor"
          className="h-full w-full object-cover object-center scale-105 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured High-Contrast Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Trust Kicker */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase mb-4">
          <span className="flex h-2 w-2 rounded-full bg-amber-400" />
          <span>Pakistan Engineering Council · Category C-A (No-Limit License)</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-stone-300">F-10 Markaz Islamabad</span>
        </div>

        {/* Rocky-Style Monumental Typography */}
        <div className="max-w-5xl">
          <h1 className="rocky-title rocky-emboss text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight">
            REHMAN
            <span className="block text-amber-500 font-extrabold mt-1 sm:mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              CONSTRUCTION
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-stone-200 max-w-3xl leading-relaxed text-balance">
            Forging Pakistan’s landmark highways, elevated flyovers, multi-cell underpasses, and monumental water infrastructure with unyielding engineering precision.
          </p>
        </div>

        {/* Key Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreProjects}
            className="flex items-center gap-3 rounded-lg bg-amber-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-xl transition-all hover:bg-amber-400 hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Mega Projects</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenAi}
            className="flex items-center gap-3 rounded-lg border-2 border-stone-300/40 bg-stone-900/60 backdrop-blur-md px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-stone-900/90 hover:border-amber-400 cursor-pointer"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>Consult AI Engineering Desk</span>
          </button>

          <button
            onClick={onGoToHeadquarters}
            className="text-stone-300 hover:text-white text-sm font-semibold tracking-wide uppercase px-3 py-2 transition-colors cursor-pointer"
          >
            F-10 Markaz Headquarters →
          </button>
        </div>

        {/* Quick Signature Highlights Strip */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4 max-w-5xl">
          <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3.5">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">Balochistan Heartland</span>
            <span className="text-sm sm:text-base font-bold text-white block mt-0.5">CPEC N-50 Western Route</span>
            <span className="text-xs text-stone-300 block">Zhob – Qila Saifullah – Kuchlak Passes</span>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3.5">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">Capital Grade Separation</span>
            <span className="text-sm sm:text-base font-bold text-white block mt-0.5">D-Chowk Underpass</span>
            <span className="text-xs text-stone-300 block">Jinnah Avenue & Margalla Foothills</span>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3.5">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">Subterranean Marvel</span>
            <span className="text-sm sm:text-base font-bold text-white block mt-0.5">4M Gallon Rain Tank</span>
            <span className="text-xs text-stone-300 block">Gaddafi Stadium PCB Facility</span>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3.5">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">Blue Area Vertical</span>
            <span className="text-sm sm:text-base font-bold text-white block mt-0.5">High-Rises in Blue Area</span>
            <span className="text-xs text-stone-300 block">Structural Concrete & Basements</span>
          </div>
        </div>
      </div>

      {/* Quantitative Rigor Stats Ribbon */}
      <div className="relative z-10 w-full border-t border-white/15 bg-stone-950/90 backdrop-blur-md py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums">400+ KM</div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">Highways & Expressways</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums">14+ Units</div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">Flyovers & Underpasses</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums">4.0M Gal</div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">Underground Water Tank</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums">Category C-A</div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">PEC No-Limit Bidding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
