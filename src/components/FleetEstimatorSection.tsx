import React, { useState } from 'react';
import {
  Calculator,
  Truck,
  HardHat,
  Gauge,
  Layers,
  CheckCircle2,
  Calendar,
  Fuel,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface ProjectTemplate {
  id: string;
  name: string;
  subtitle: string;
  defaultScope: number;
  unit: string;
  machineryMultiplier: {
    excavators: number;
    dozers: number;
    dumpers: number;
    rollers: number;
    asphaltPavers: number;
    batchingPlants: number;
  };
  standards: string[];
}

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'cpec-highway',
    name: 'Mountain Highway & CPEC Corridors',
    subtitle: 'N-50 style heavy mountain rock cut-and-fill and asphalt',
    defaultScope: 25,
    unit: 'Kilometers',
    machineryMultiplier: {
      excavators: 1.2,
      dozers: 0.8,
      dumpers: 4.5,
      rollers: 1.0,
      asphaltPavers: 0.4,
      batchingPlants: 0.15,
    },
    standards: ['NHA General Specs 1998', 'AASHTO T-180 98% Compaction', 'Superpave Asphalt Class A'],
  },
  {
    id: 'underpass-flyover',
    name: 'Underpass & Flyover Grade Separation',
    subtitle: 'D-Chowk & T-Chowk style reinforced diaphragm walls & flyover spans',
    defaultScope: 2,
    unit: 'Interchanges',
    machineryMultiplier: {
      excavators: 4.0,
      dozers: 1.5,
      dumpers: 8.0,
      rollers: 3.0,
      asphaltPavers: 2.0,
      batchingPlants: 1.0,
    },
    standards: ['CDA Capital Specifications', 'ASTM C39 5,000 PSI High-Early Concrete', 'Elastomeric Bearings Grade A'],
  },
  {
    id: 'rain-tank-reservoir',
    name: 'Subterranean Rain Tank & Hydro Structures',
    subtitle: 'Gaddafi Stadium 4M Gallon underground retention matrix',
    defaultScope: 4,
    unit: 'Million Gallons',
    machineryMultiplier: {
      excavators: 3.5,
      dozers: 1.0,
      dumpers: 7.0,
      rollers: 2.0,
      asphaltPavers: 0,
      batchingPlants: 1.0,
    },
    standards: ['PCB Sports Infrastructure Code', 'Water-Tight Hydro Concrete Matrix', 'Submersible Sump Turbines'],
  },
  {
    id: 'blue-area-highrise',
    name: 'High-Rise Basements & Structural Frames',
    subtitle: 'Blue Area high-rise multi-level basements & reinforced shear cores',
    defaultScope: 18,
    unit: 'Floors + 3 Basements',
    machineryMultiplier: {
      excavators: 1.0,
      dozers: 0.2,
      dumpers: 3.0,
      rollers: 0.5,
      asphaltPavers: 0,
      batchingPlants: 0.6,
    },
    standards: ['Building Code of Pakistan (BCP 2021)', 'Category-4 Seismic Shear Resistance', 'Post-Tensioned Slabs'],
  },
];

export const FleetEstimatorSection: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate>(PROJECT_TEMPLATES[0]);
  const [scopeValue, setScopeValue] = useState<number>(selectedTemplate.defaultScope);

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setScopeValue(template.defaultScope);
  };

  // Compute calculated heavy equipment requirements
  const excavatorsCount = Math.max(2, Math.round(scopeValue * selectedTemplate.machineryMultiplier.excavators));
  const dozersCount = Math.max(1, Math.round(scopeValue * selectedTemplate.machineryMultiplier.dozers));
  const dumpersCount = Math.max(6, Math.round(scopeValue * selectedTemplate.machineryMultiplier.dumpers));
  const rollersCount = Math.max(1, Math.round(scopeValue * selectedTemplate.machineryMultiplier.rollers));
  const paversCount = Math.max(0, Math.round(scopeValue * selectedTemplate.machineryMultiplier.asphaltPavers));
  const batchingPlantsCount = Math.max(1, Math.ceil(scopeValue * selectedTemplate.machineryMultiplier.batchingPlants));

  // Compute estimated timeframe & crew
  const estimatedDays = Math.max(45, Math.round(scopeValue * 14));
  const estimatedCrew = Math.round((excavatorsCount + dozersCount + dumpersCount) * 3.2 + 25);

  return (
    <section className="py-20 sm:py-24 bg-stone-950 text-stone-100 border-t border-stone-800 relative overflow-hidden">
      {/* Subtle Background Structural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#292524_1px,transparent_1px),linear-gradient(to_bottom,#292524_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>Interactive Engineering Portal</span>
          </div>
          <h2 className="rocky-title text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            CIVIL FLEET & SCOPE ESTIMATOR
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            Simulate heavy machinery mobilization, asphalt plant deployment, and structural execution packages tailored to Pakistan's sovereign highway and urban tender standards.
          </p>
        </div>

        {/* Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope Configuration */}
          <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>1. Select Project Classification</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">PEC Category C-A</span>
            </div>

            {/* Template Buttons */}
            <div className="space-y-3 mb-8">
              {PROJECT_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleTemplateSelect(tpl)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    selectedTemplate.id === tpl.id
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                      : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block text-stone-100">{tpl.name}</span>
                    <span className="text-xs text-stone-400 block mt-0.5">{tpl.subtitle}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${selectedTemplate.id === tpl.id ? 'text-amber-400 translate-x-1' : 'text-stone-600'}`} />
                </button>
              ))}
            </div>

            {/* Scope Slider & Input */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  2. Project Scope ({selectedTemplate.unit})
                </span>
                <span className="font-mono text-lg font-black text-amber-400">
                  {scopeValue} {selectedTemplate.unit}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max={selectedTemplate.id === 'cpec-highway' ? 120 : selectedTemplate.id === 'blue-area-highrise' ? 40 : 12}
                value={scopeValue}
                onChange={(e) => setScopeValue(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />

              <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-2">
                <span>Min: 1 {selectedTemplate.unit}</span>
                <span>Active Scope: {scopeValue} {selectedTemplate.unit}</span>
                <span>Max Capacity: No-Limit</span>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="mt-6 pt-4 border-t border-stone-800/80">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                Governing Quality Specifications:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.standards.map((std, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-mono bg-stone-950 px-2.5 py-1 rounded border border-stone-800 text-stone-300"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>{std}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Allocation & Live Calculation Breakdown */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Quick Metric Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 text-center">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Total Heavy Units</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {excavatorsCount + dozersCount + dumpersCount + rollersCount + paversCount + batchingPlantsCount}
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5 block">Dedicated Units</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 text-center">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Estimated Timeline</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ~{estimatedDays}
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5 block">Calendar Days</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 text-center">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Engineered Crew</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {estimatedCrew}+
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5 block">Field Personnel</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 text-center">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Liaison Office</span>
                <span className="text-sm font-bold text-emerald-400 font-mono block mt-1">
                  Sector F-10
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5 block">Islamabad Desk</span>
              </div>
            </div>

            {/* Heavy Plant Machinery Matrix Breakdown */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
                <h4 className="rocky-title text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-400" />
                  <span>MOBILIZATION FLEET BREAKDOWN</span>
                </h4>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Rehman Machinery Inventory
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Heavy Excavators */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">Heavy Track Excavators</span>
                    <span className="text-[11px] text-stone-500">Caterpillar 336 / 349 Rock Breakers</span>
                  </div>
                  <span className="font-mono text-xl font-black text-amber-400">{excavatorsCount} Units</span>
                </div>

                {/* 2. Track Bulldozers */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">Crawler Bulldozers</span>
                    <span className="text-[11px] text-stone-500">Komatsu D85 / CAT D7 Earthmovers</span>
                  </div>
                  <span className="font-mono text-xl font-black text-amber-400">{dozersCount} Units</span>
                </div>

                {/* 3. Dump Trucks & Haulers */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">Heavy Dumper Haulers</span>
                    <span className="text-[11px] text-stone-500">30-Ton Multi-Axle Dumpers</span>
                  </div>
                  <span className="font-mono text-xl font-black text-amber-400">{dumpersCount} Units</span>
                </div>

                {/* 4. Soil & Asphalt Rollers */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">Vibratory Compactor Rollers</span>
                    <span className="text-[11px] text-stone-500">Dynapac CA250 / Hamm Tandem</span>
                  </div>
                  <span className="font-mono text-xl font-black text-amber-400">{rollersCount} Units</span>
                </div>

                {/* 5. Asphalt Pavers */}
                {paversCount > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                    <div>
                      <span className="text-xs font-bold text-stone-200 block">Sensor Asphalt Pavers</span>
                      <span className="text-[11px] text-stone-500">Vögele Super 1800 Dual-Width</span>
                    </div>
                    <span className="font-mono text-xl font-black text-amber-400">{paversCount} Units</span>
                  </div>
                )}

                {/* 6. Batching Plants */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950">
                  <div>
                    <span className="text-xs font-bold text-stone-200 block">Concrete & Asphalt Plants</span>
                    <span className="text-[11px] text-stone-500">Marini 240 TPH & 60m³/h Concrete</span>
                  </div>
                  <span className="font-mono text-xl font-black text-amber-400">{batchingPlantsCount} Plants</span>
                </div>
              </div>

              {/* Direct Liaison Call-to-Action */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-400 text-center sm:text-left">
                  <span>Need tailored subcontracting bids or tender joint-ventures?</span>
                  <span className="block text-stone-300 font-bold">Contact Sheikh Munawar & Sheikh Ali Mandokhail's office directly.</span>
                </div>

                <a
                  href="#headquarters"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Connect with F-10 Office</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
