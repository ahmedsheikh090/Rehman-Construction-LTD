import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Shield,
  Activity,
  Gauge,
  Sliders,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Zap,
  Info
} from 'lucide-react';

interface LayerSpec {
  id: string;
  name: string;
  urduName: string;
  thickness: string;
  material: string;
  compaction: string;
  specCode: string;
  highlight: string;
  color: string;
  activeColor: string;
}

const PAVEMENT_LAYERS: LayerSpec[] = [
  {
    id: 'layer-wearing',
    name: 'Class-A Superpave Asphalt Wearing Course',
    urduName: 'اسفالٹ ویئرنگ کورس',
    thickness: '50 mm',
    material: 'Polymer-Modified Bitumen (PG 76-22) with 100% crushed basalt aggregate',
    compaction: '98% Marshall Density / Void Ratio: 4%',
    specCode: 'NHA General Specs 1998 Table 305-1',
    highlight: 'High friction skid resistance and thermal rutting prevention under 50°C summer heat',
    color: 'bg-stone-800 border-amber-500/60 text-amber-400',
    activeColor: 'ring-2 ring-amber-400 bg-stone-900',
  },
  {
    id: 'layer-dbm',
    name: 'Dense Bituminous Macadam (DBM) Base Course',
    urduName: 'ڈینس بٹومینس میکاڈم بیس',
    thickness: '80 mm',
    material: 'Heavy-viscosity 60/70 penetration asphalt binder with dense graded aggregate',
    compaction: '97.5% Minimum Compaction / Marshall Stability > 1,800 kg',
    specCode: 'NHA Item 303b / AASHTO M-323',
    highlight: 'Primary structural load-distributing asphaltic matrix dissipating commercial axle stress',
    color: 'bg-stone-850 border-amber-600/40 text-amber-300',
    activeColor: 'ring-2 ring-amber-500 bg-stone-900',
  },
  {
    id: 'layer-crushed-base',
    name: 'Crushed Stone Aggregate Base Course',
    urduName: 'کرشڈ سٹون ایگریگیٹ بیس',
    thickness: '150 mm',
    material: '100% fractured hard mountain stone aggregate, CBR > 80%',
    compaction: '100% Maximum Dry Density (AASHTO T-180 Modified Proctor)',
    specCode: 'ASTM D2940 / NHA Item 202',
    highlight: 'High-strength mechanical interlocking layer preventing shear displacement under heavy trailers',
    color: 'bg-stone-700 border-stone-600 text-stone-200',
    activeColor: 'ring-2 ring-amber-400 bg-stone-800',
  },
  {
    id: 'layer-subbase',
    name: 'Granular Aggregate Sub-Base Course',
    urduName: 'گرینولر سب بیس کورس',
    thickness: '200 mm',
    material: 'Selected natural or blended sandy gravel aggregate, CBR > 30%',
    compaction: '98% Modified Proctor (AASHTO T-180 Method D)',
    specCode: 'NHA Item 201 / AASHTO M-147',
    highlight: 'Acts as structural cushion and capillary water break against subsurface frost and moisture',
    color: 'bg-stone-650 border-stone-500 text-stone-300',
    activeColor: 'ring-2 ring-amber-400 bg-stone-700',
  },
  {
    id: 'layer-subgrade',
    name: 'Lime-Stabilized Prepared Subgrade & Geosynthetics',
    urduName: 'سب گریڈ ارتھ ورک اور ڈرینج',
    thickness: '300 mm',
    material: 'High-compaction native soil stabilized with 3% slaked lime + non-woven geotextile',
    compaction: '95% Standard Proctor / Plasticity Index < 6',
    specCode: 'NHA Item 108 / AASHTO T-99',
    highlight: 'Engineered sub-foundation with subterranean RCC box drainage outfalls preventing waterlogging',
    color: 'bg-stone-600 border-stone-400 text-stone-300',
    activeColor: 'ring-2 ring-amber-400 bg-stone-700',
  },
];

export const FuturisticPavementInspector: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(PAVEMENT_LAYERS[0].id);
  const [axleLoadSim, setAxleLoadSim] = useState<number>(100); // 100 kN standard axle

  const currentLayer = PAVEMENT_LAYERS.find((l) => l.id === selectedLayerId) || PAVEMENT_LAYERS[0];

  return (
    <section className="py-20 sm:py-24 bg-stone-900 border-t border-stone-800 relative overflow-hidden text-stone-100">
      {/* Laser Scanning Effect Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-75" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Futuristic Engineering Visualizer</span>
          </div>
          <h2 className="rocky-title text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            X-RAY HIGHWAY CROSS-SECTION INSPECTOR
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            Interactive structural cross-section revealing how Rehman Construction engineers multi-layered highway roadbeds and underpass conduits built to endure heavy commercial freight.
          </p>
        </div>

        {/* Interactive Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive 5-Layer Cross-Section Slice Diagram */}
          <div className="lg:col-span-6 rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Roadbed Stratum</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">Total Depth: 780 mm</span>
            </div>

            {/* Vehicle Simulator on Top */}
            <div className="relative mb-3 flex items-center justify-between px-3 py-2 bg-stone-900/60 rounded-xl border border-stone-800/80">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-stone-300">Axle Stress Load:</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={axleLoadSim}
                  onChange={(e) => setAxleLoadSim(Number(e.target.value))}
                  className="w-28 sm:w-36 accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded"
                />
                <span className="font-mono text-xs font-bold text-amber-400">{axleLoadSim} kN</span>
              </div>
            </div>

            {/* The 5 Clickable Slices */}
            <div className="space-y-2 relative">
              {PAVEMENT_LAYERS.map((layer, index) => {
                const isSelected = selectedLayerId === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`w-full p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                      isSelected
                        ? 'border-amber-400 bg-stone-900 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    {/* Layer indicator bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-stone-950 font-mono text-xs font-bold text-amber-400 border border-stone-800">
                          0{index + 1}
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white block">
                            {layer.name}
                          </span>
                          <span className="text-[11px] text-stone-400 font-urdu block">
                            {layer.urduName}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-extrabold text-amber-400 block">
                          {layer.thickness}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono block">Thickness</span>
                      </div>
                    </div>

                    {/* Active Layer Visual Ping */}
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-amber-400 font-mono">
                        <span>Selected for Structural Telemetry</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <span>Subterranean Geo-Grid Active</span>
              <span className="text-emerald-400">Zero Water Permeation</span>
            </div>
          </div>

          {/* Right: Detailed Engineering Telemetry Card for Selected Layer */}
          <div className="lg:col-span-6 rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Layer Specification Telemetry
                  </span>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] font-bold px-2.5 py-1 rounded">
                  {currentLayer.thickness} Spec
                </span>
              </div>

              <h3 className="rocky-title text-2xl font-black text-white tracking-tight mb-2">
                {currentLayer.name}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed mb-6 font-sans">
                {currentLayer.highlight}
              </p>

              {/* Technical Parameters Matrix */}
              <div className="space-y-3.5 mb-6">
                <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-900/60">
                  <span className="text-[10px] uppercase font-mono text-stone-500 block font-semibold">
                    Material Composition & Binder
                  </span>
                  <span className="text-xs font-bold text-stone-100 block mt-0.5">
                    {currentLayer.material}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-900/60">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block font-semibold">
                      Compaction & Density
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono block mt-0.5">
                      {currentLayer.compaction}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-900/60">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block font-semibold">
                      Standard Code Reference
                    </span>
                    <span className="text-xs font-bold text-stone-200 font-mono block mt-0.5">
                      {currentLayer.specCode}
                    </span>
                  </div>
                </div>

                {/* Simulated Strain & Bearing Stress Output */}
                <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-stone-400">Axle Stress Absorption:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {Math.min(99.8, Number((axleLoadSim * 0.72).toFixed(1)))}% Dampened
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${Math.min(100, (axleLoadSim / 140) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Lab-Tested Aggregate Quality</span>
              </span>
              <span className="font-mono text-stone-500">PEC Category C-A Standard</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
