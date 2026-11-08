import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA } from '../data/transformationsData';
import { SlidersHorizontal, ArrowLeftRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [selectedTransId, setSelectedTransId] = useState<string>(TRANSFORMATIONS_DATA[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const activeTrans = TRANSFORMATIONS_DATA.find((t) => t.id === selectedTransId) || TRANSFORMATIONS_DATA[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <section id="transformations" className="py-20 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 mb-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Visible National Impact · Before & After</span>
            </div>
            <h2 className="rocky-title text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight">
              ROADS & ARTERIALS TRANSFORMED
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-400 max-w-2xl">
              From unpaved bottlenecks, broken canals, and severe urban congestion to high-speed divided Superpave boulevards and modern drainage infrastructure.
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-950/80 rounded-xl border border-stone-800">
            {TRANSFORMATIONS_DATA.map((item) => {
              const active = selectedTransId === item.id;
              let shortLabel = item.title;
              if (item.id === 'cpec-n50-trans') shortLabel = 'CPEC N-50 Balochistan';
              else if (item.id === 'canal-road-trans') shortLabel = 'Canal Road Lahore';
              else if (item.id === 'd-chowk-trans') shortLabel = 'D-Chowk Islamabad';
              else if (item.id === 'quetta-liaquat-trans') shortLabel = 'Quetta Liaquat Bazaar';
              else if (item.id === 'pindi-mall-road-trans') shortLabel = 'Pindi Mall Road';
              else if (item.id === 't-chowk-flyover-trans') shortLabel = 'T-Chowk Flyover Rawat';
              else if (item.id === 'convention-corridor-trans') shortLabel = 'Convention Avenue';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedTransId(item.id);
                    setSliderPosition(50);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transformation Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Before/After Split Slider */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              className="relative aspect-16/10 w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 cursor-ew-resize touch-pan-y select-none shadow-2xl"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* "AFTER" Image (Full Width Underneath) */}
              <img
                src={activeTrans.afterImage}
                alt={`${activeTrans.title} After Rehman Construction`}
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* "BEFORE" Image (Clipped by slider percentage) */}
              <div
                className="absolute inset-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeTrans.beforeImage}
                  alt={`${activeTrans.title} Before`}
                  className="absolute inset-0 h-full w-full object-cover filter contrast-125 saturate-50 brightness-75"
                  style={{ width: '100%', minWidth: '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/30" />
                
                {/* BEFORE Label */}
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-red-500/30 text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>BEFORE: Broken & Congested</span>
                </div>
              </div>

              {/* AFTER Label */}
              <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>AFTER: Rehman Construction</span>
              </div>

              {/* Draggable Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="h-10 w-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl border-2 border-stone-950 pointer-events-auto cursor-ew-resize">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
              </div>

              {/* Mobile Drag Helper Hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-stone-300">
                Drag slider horizontally to compare
              </div>
            </div>

            {/* Slider Quick Jump Buttons */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-stone-400">
              <button
                onClick={() => setSliderPosition(100)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                ← View Full Prior State
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Center Split (50/50)
              </button>
              <button
                onClick={() => setSliderPosition(0)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                View Full Rehman Construction Delivery →
              </button>
            </div>
          </div>

          {/* Right Column: Transformation Narrative & Metrics */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                {activeTrans.location}
              </span>
              <h3 className="rocky-title text-2xl sm:text-3xl font-black text-white mb-4">
                {activeTrans.title}
              </h3>

              {/* Before description */}
              <div className="mb-4 rounded-xl border border-red-950/60 bg-red-950/20 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Prior Condition
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeTrans.beforeDescription}
                </p>
              </div>

              {/* After description */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Rehman Construction Scope
                </span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {activeTrans.afterDescription}
                </p>
              </div>
            </div>

            {/* Quantitative Improvements Matrix */}
            <div className="rounded-xl border border-stone-800 bg-stone-950 p-5 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Measured Infrastructure Impact
              </span>
              {activeTrans.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-stone-800/80 last:border-0 last:pb-0">
                  <span className="text-stone-400">{m.label}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-stone-500 line-through">{m.before}</span>
                    <span className="text-amber-400 font-bold">→ {m.after}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
