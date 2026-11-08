import React from 'react';
import { CLIENTS_DATA } from '../data/clientsData';
import { ShieldCheck, FileCheck2, Landmark } from 'lucide-react';

// Custom SVG Emblems for Pakistani Authorities & Governments
const GovernmentEmblemIcon: React.FC<{ id: string; className?: string }> = ({ id, className = 'w-10 h-10' }) => {
  switch (id) {
    case 'cda':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M22 68L50 32L78 68H22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3" />
          <path d="M50 48L62 68H38L50 48Z" fill="currentColor" fillOpacity="0.5" />
          <circle cx="50" cy="30" r="5" fill="currentColor" />
          <path d="M30 76C42 74 58 74 70 76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'gov-pakistan':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M50 20C40 20 32 28 32 38C32 48 40 56 50 56C44 56 38 50 38 42C38 34 44 26 50 20Z" fill="currentColor" />
          <polygon points="56,26 58,32 64,32 59,36 61,42 56,38 51,42 53,36 48,32 54,32" fill="currentColor" />
          <path d="M24 74C32 64 68 64 76 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 80C42 77 58 77 70 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'gov-balochistan':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M20 72L38 42L54 62L68 38L82 72H20Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="3" />
          <path d="M50 22C44 22 39 27 39 33C39 39 44 44 50 44C46 44 42 40 42 35C42 30 46 25 50 22Z" fill="currentColor" />
          <polygon points="54,26 55,29 58,29 56,31 57,34 54,32 51,34 52,31 50,29 53,29" fill="currentColor" />
        </svg>
      );
    case 'gov-sindh':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M30 65C30 50 70 50 70 65" stroke="currentColor" strokeWidth="4" />
          <path d="M24 74H76M28 80H72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="36" r="12" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M44 36H56M50 30V42" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case 'gov-kp':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          {/* Khyber Pass Gate Motif */}
          <path d="M30 75V45L50 32L70 45V75H60V54C60 48 40 48 40 54V75H30Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="22" r="4" fill="currentColor" />
        </svg>
      );
    case 'gov-punjab':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M26 48C34 42 42 42 50 48C58 54 66 54 74 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 60C34 54 42 54 50 60C58 66 66 66 74 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 20V36M44 26L50 32L56 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'pcb':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <polygon points="50,18 57,34 74,34 60,45 65,62 50,51 35,62 40,45 26,34 43,34" fill="currentColor" />
          <circle cx="50" cy="74" r="8" stroke="currentColor" strokeWidth="3" />
          <line x1="44" y1="74" x2="56" y2="74" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
          <path d="M50 22L72 34V66L50 78L28 66V34L50 22Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />
          <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold">PEC</text>
        </svg>
      );
  }
};

export const GovernmentClientsSection: React.FC = () => {
  return (
    <section id="government" className="py-20 sm:py-24 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
            <Landmark className="h-4 w-4" />
            <span>State Signoffs, Prequalifications & Accreditations</span>
          </div>
          <h2 className="rocky-title text-3xl sm:text-5xl xl:text-6xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            GOVERNMENT & PROVINCIAL CLIENTS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Trusted by the Federal Government of Pakistan, Provincial Cabinets, Capital Development Authority (CDA), and Pakistan Cricket Board (PCB) for strategic mega-infrastructure execution.
          </p>
        </div>

        {/* Official Client Emblems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CLIENTS_DATA.map((client) => (
            <div
              key={client.id}
              className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-900"
            >
              <div>
                {/* Authority Insignia Header */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors shadow-xs">
                    <GovernmentEmblemIcon id={client.id} className="w-10 h-10" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800/80">
                    {client.verifiedStatus}
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {client.level}
                </div>

                <h3 className="rocky-title text-xl font-bold text-stone-900 dark:text-stone-100 mt-1 mb-2">
                  {client.name}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {client.description}
                </p>
              </div>

              {/* Awarded Projects Summary */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1">
                  Projects Awarded
                </span>
                <p className="text-xs font-medium text-stone-800 dark:text-stone-200 line-clamp-2">
                  {client.projectsAssigned}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Seal Banner */}
        <div className="mt-14 rounded-2xl border border-stone-200 bg-stone-100/80 p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-stone-950 shadow-md">
              <ShieldCheck className="h-8 w-8 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Sovereign Regulatory Standing
              </div>
              <h4 className="rocky-title text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
                PEC CATEGORY C-A CERTIFIED CONSTRUCTOR
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Authorized for unrestricted bidding volume across all national highways, bridge networks, dams, and structural works in Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="font-mono text-xs text-stone-500 block">Registration Code</span>
              <span className="font-mono text-sm font-extrabold text-stone-900 dark:text-stone-100">PEC-CA-7849-INFRA</span>
            </div>
            <FileCheck2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

      </div>
    </section>
  );
};
