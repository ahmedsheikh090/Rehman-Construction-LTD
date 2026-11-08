import React, { useState } from 'react';
import { QUOTES_DATA } from '../data/quotesData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const QuotesSection: React.FC = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const activeQuote = QUOTES_DATA[activeQuoteIndex];

  const handlePrev = () => {
    setActiveQuoteIndex((prev) => (prev === 0 ? QUOTES_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveQuoteIndex((prev) => (prev === QUOTES_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="philosophy" className="py-24 bg-stone-950 text-white relative overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
            <span>Foundational Creed & Vision</span>
          </div>
          <h2 className="rocky-title text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white">
            THE ARCHITECTURE OF VISION
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-400">
            Principles etched in stone by Rehman Construction leadership, guiding every kilometer of asphalt and every span of reinforced concrete.
          </p>
        </div>

        {/* Featured Heroic Quote Box */}
        <div className="relative rounded-2xl border border-stone-800 bg-stone-900/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 shadow-2xl mb-16">
          <div className="absolute top-6 right-8 text-amber-500/20">
            <Quote className="h-24 w-24 stroke-[1]" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-3">
              <span>Principle {activeQuoteIndex + 1} of {QUOTES_DATA.length}</span>
              <span className="h-1 w-8 bg-amber-400/40 rounded" />
              <span className="text-stone-400">{activeQuote.context}</span>
            </div>

            <blockquote className="rocky-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-100 leading-tight tracking-normal">
              "{activeQuote.quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <cite className="not-italic text-xl font-bold text-amber-400 block">
                  {activeQuote.author}
                </cite>
                <span className="text-sm text-stone-400 block mt-0.5">
                  {activeQuote.title} · Rehman Construction (Pvt) Ltd
                </span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-700 bg-stone-800/80 text-stone-300 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-colors cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-700 bg-stone-800/80 text-stone-300 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-colors cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold block mb-2">01. ENDURANCE</span>
              <h3 className="rocky-title text-lg font-bold text-white mb-2">Poured for Centuries</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Every structure is calculated against peak seismic thresholds, maximum axle loads, and百年 return-period hydrological events.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-800/60 text-[11px] text-stone-500 font-mono">
              ASTM & AASHTO Standard
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold block mb-2">02. TERRAIN MASTERY</span>
              <h3 className="rocky-title text-lg font-bold text-white mb-2">Subduing the Mountains</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Carving strategic transit routes through rugged Balochistan rock cuts and flood plains with heavy mechanization.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-800/60 text-[11px] text-stone-500 font-mono">
              CPEC Mountain Alignment
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold block mb-2">03. URBAN HARMONY</span>
              <h3 className="rocky-title text-lg font-bold text-white mb-2">Signal-Free Momentum</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Elevated flyovers, box underpasses, and intelligent slip lanes that restore fluid motion to expanding Pakistani metropolises.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-800/60 text-[11px] text-stone-500 font-mono">
              CDA Capital Grade Separation
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold block mb-2">04. HYDRO RESILIENCE</span>
              <h3 className="rocky-title text-lg font-bold text-white mb-2">Mastering the Deluge</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Multi-million gallon subterranean retention matrix ensuring national sporting venues and city centers remain unflooded during peak monsoons.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-800/60 text-[11px] text-stone-500 font-mono">
              4M Gallon Gaddafi Stadium Model
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
