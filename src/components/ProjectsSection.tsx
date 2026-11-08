import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';
import { Project } from '../types';
import { MapPin, ChevronRight, X, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Highways & Corridors',
    'Flyovers & Underpasses',
    'High-Rise Superstructures',
    'Water & Environmental',
    'Urban Networks',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-24 bg-stone-100 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
              National Infrastructure Portfolio
            </div>
            <h2 className="rocky-title text-3xl sm:text-5xl xl:text-6xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              ROADS, UNDERPASSES & MEGA WORKS
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl">
              Executing Pakistan's critical transportation lifelines, high-capacity arterial interchanges, and monumental hydraulic flood-retention structures.
            </p>
          </div>

          {/* Interactive Category Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200 dark:bg-stone-800 rounded-xl">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-900 overflow-hidden"
            >
              <div>
                {/* Visual Image Container with Fallback */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback visually if path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Location badge in image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1.5 font-semibold drop-shadow-sm">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      {project.location}
                    </span>
                    <span className="font-mono text-amber-400 font-bold bg-black/60 px-2 py-0.5 rounded">
                      {project.completionYear}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  {/* Clean unboxed metadata with separators (zero pill rules) */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
                    <span className="text-amber-600 dark:text-amber-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                  </div>

                  <h3 className="rocky-title text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Technical Metric Chips */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                    {project.specs.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="bg-stone-50 dark:bg-stone-800/60 p-2 rounded">
                        <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-medium">
                          {s.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-200 block truncate">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="flex w-full items-center justify-between rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-800 transition-all hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-amber-400 dark:hover:text-stone-950 cursor-pointer"
                >
                  <span>Technical Specification</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 max-h-[90dvh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden mb-6 bg-stone-900">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-1">
                  {activeModalProject.category} · {activeModalProject.client}
                </span>
                <h3 className="rocky-title text-2xl sm:text-3xl font-black text-white">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  Engineering Scope & Execution
                </h4>
                <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                  Technical Deliverables & Quantities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalProject.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60"
                    >
                      <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                        {spec.label}
                      </span>
                      <span className="font-mono text-sm font-bold text-stone-950 dark:text-amber-400">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Certification Stamp */}
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="text-xs text-stone-800 dark:text-stone-200">
                  <span className="font-bold block text-sm">Certified to NHA & AASHTO Highway Specifications</span>
                  Signed off by Capital Development Authority, National Highway Authority, and PEC Quality Inspectors.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
