import React from 'react';
import { Truck, Wrench, Shield, CheckCircle2, Award, Building, HardHat } from 'lucide-react';

export const HeavyFleetSection: React.FC = () => {
  return (
    <section id="fleet" className="py-20 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Truck className="h-4 w-4" />
              <span>Heavy Mechanization & Vertical Superstructures</span>
            </div>
            <h2 className="rocky-title text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              HEAVY ROAD FLEET & BLUE AREA STRUCTURES
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-400 max-w-2xl">
              Equipped with our in-house heavy machinery fleet for specialized CPEC civil packages in Balochistan, high-capacity asphalt plants, and structural vertical engineering in Islamabad.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">250+</span>
            <span className="text-xs text-stone-300 uppercase tracking-wider font-semibold">
              Heavy Machinery<br />Units Operational
            </span>
          </div>
        </div>

        {/* Bento Grid: Machinery + Engineer + High-Rise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Heavy Fleet Spotlight Card (User's Excavator Asset) */}
          <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-black">
              <img
                src="/assets/aistudio/Nicolas_Jey_-_Web-design__UI_UX__Webflow__3D__Motion__AI_in_Minsk__Belarus_72f1268e.jfif"
                alt="Rehman Construction Heavy Road Fleet & Excavators"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-wider">
                Specialized Road Works & Earthworks Fleet
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="rocky-title text-2xl sm:text-3xl font-black text-white mb-2">
                WIDE RANGE OF SERVICES FOR ROAD WORKS
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed mb-6">
                Deployed across localized Balochistan CPEC mountain road packages (Zhob, Qila Saifullah, Quetta) and capital flyovers:
                heavy hydraulic rock breakers, tracked excavators, computer-guided Superpave asphalt pavers, and high-frequency steel rollers.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">Asphalt Plants</span>
                  <span className="font-mono text-sm font-bold text-amber-400">240 Tons / Hour</span>
                </div>
                <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">Excavator Fleet</span>
                  <span className="font-mono text-sm font-bold text-amber-400">45+ Heavy Tracked</span>
                </div>
                <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">Balochistan Breakers</span>
                  <span className="font-mono text-sm font-bold text-amber-400">Mountain Heavy Piston</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Rise Superstructures & Workforce Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* High-Rises in Blue Area */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden group shadow-xl flex flex-col sm:flex-row">
              <div className="relative aspect-4/3 sm:aspect-square sm:w-1/2 overflow-hidden bg-stone-900">
                <img
                  src="/assets/aistudio/PakLand_tower_new_blue_area_Islamabad_9034d2f9.jfif"
                  alt="High-Rises in Blue Area Islamabad"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 px-2.5 py-1 rounded text-[11px] font-bold text-amber-400 uppercase">
                  Blue Area
                </div>
              </div>

              <div className="p-5 sm:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-amber-400 font-bold block mb-1">
                    Vertical Structural Works
                  </span>
                  <h4 className="rocky-title text-xl font-bold text-white mb-2">
                    High-Rises in Blue Area
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    Specialized structural concrete framing, post-tensioned floor slabs, and multi-level automated basement parking execution for commercial towers in Islamabad.
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 text-xs font-mono text-amber-400 font-bold">
                  Structural Packages & Basements
                </div>
              </div>
            </div>

            {/* Engineering Workforce Card (User's Worker Photo) */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 flex items-center gap-6 shadow-xl">
              <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-stone-800">
                <img
                  src="/assets/aistudio/workers_f6809da1.jfif"
                  alt="Rehman Construction Civil Engineer"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">
                  PEC Category C-A Leadership
                </span>
                <h4 className="rocky-title text-lg font-bold text-white mb-1">
                  1,200+ Engineers & Specialized Crew
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Led by Sheikh Munawar Mandokhail and Sheikh Ali Mandokhail, our veteran engineering teams manage round-the-clock site precision on sovereign CPEC corridors and capital projects.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
