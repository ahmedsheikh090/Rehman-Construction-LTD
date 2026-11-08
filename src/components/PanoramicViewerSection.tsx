import React, { useState, useEffect } from 'react';
import { PANORAMIC_DATA } from '../data/panoramicData';
import { Eye, RotateCw, Compass, ZoomIn, ZoomOut, ShieldCheck } from 'lucide-react';

export const PanoramicViewerSection: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string>(PANORAMIC_DATA[0].id);
  const [panX, setPanX] = useState<number>(0); // in pixels
  const [pitchY, setPitchY] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<{ label: string; detail: string } | null>(null);

  const activeSite = PANORAMIC_DATA.find((s) => s.id === selectedSiteId) || PANORAMIC_DATA[0];

  // Smooth continuous auto-rotation without wrapping glitches
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setPanX((prev) => (prev + 1.2) % 3600);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    setPanX((prev) => (prev - deltaX * 1.5 + 36000) % 3600);
    setPitchY((prev) => Math.max(-25, Math.min(25, prev + deltaY * 0.15)));
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert pixel pan to 360° compass degree heading
  const currentHeading = Math.round((panX / 10) % 360);

  const getNHACompassDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return 'NORTH';
    if (deg >= 22.5 && deg < 67.5) return 'NORTH-EAST';
    if (deg >= 67.5 && deg < 112.5) return 'EAST';
    if (deg >= 112.5 && deg < 157.5) return 'SOUTH-EAST';
    if (deg >= 157.5 && deg < 202.5) return 'SOUTH';
    if (deg >= 202.5 && deg < 247.5) return 'SOUTH-WEST';
    if (deg >= 247.5 && deg < 292.5) return 'WEST';
    return 'NORTH-WEST';
  };

  return (
    <section id="panoramic-360" className="py-20 sm:py-24 bg-stone-950 text-white border-t border-stone-800 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Eye className="h-4 w-4" />
              <span>Interactive 360° Site Survey · Seamless Drone View</span>
            </div>
            <h2 className="rocky-title text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight">
              360° MEGA PROJECT TOURS
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-400 max-w-2xl">
              Inspect CPEC mountain highways in Balochistan, D-Chowk underpasses in Islamabad, Canal Road in Lahore, and New Blue Area high-rise towers.
            </p>
          </div>

          {/* Panoramic Site Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-900 rounded-xl border border-stone-800">
            {PANORAMIC_DATA.map((site) => {
              const active = selectedSiteId === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => {
                    setSelectedSiteId(site.id);
                    setPanX(0);
                    setPitchY(0);
                    setActiveHotspot(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {site.title.split(' ')[0]} {site.title.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 360° Interactive Canvas Box (Seamless infinite CSS repeat-x) */}
        <div className="relative aspect-16/9 md:aspect-21/9 w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl touch-pan-y select-none">
          
          <div
            className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            onPointerCancel={handleMouseUp}
            style={{
              backgroundImage: `url(${activeSite.image})`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: `${-panX}px ${pitchY * 2}px`,
              backgroundSize: `${1600 * zoomLevel}px 100%`,
              transition: isDragging ? 'none' : 'background-position 0.05s linear',
            }}
          >
            {/* Cinematic Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

            {/* Hotspots mapped cleanly within view */}
            <div className="absolute inset-0 pointer-events-none">
              {activeSite.hotspots.map((hs, i) => {
                // Calculate wrapped position relative to current pan
                const baseOffsetPercent = (hs.yaw + (panX / 36) * 10) % 100;
                const normalizedX = ((baseOffsetPercent + 100) % 100);

                return (
                  <div
                    key={i}
                    className="absolute pointer-events-auto cursor-pointer group"
                    style={{
                      top: `${hs.pitch + pitchY}%`,
                      left: `${normalizedX}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => setActiveHotspot(hs)}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-60" />
                      <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-stone-950 font-black text-xs shadow-xl border-2 border-stone-950 hover:scale-110 transition-transform">
                        +
                      </div>
                      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-950/90 border border-stone-800 px-2.5 py-1 text-[11px] font-bold text-amber-400 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        {hs.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compass & Heading Telemetry HUD */}
            <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-800 flex items-center gap-3 text-xs font-mono shadow-lg">
              <Compass className="h-4 w-4 text-amber-400" />
              <span className="text-stone-300">
                Heading: <strong className="text-amber-400 font-bold">{currentHeading}°</strong>
              </span>
              <span className="text-stone-600">|</span>
              <span className="text-amber-400 font-semibold">
                {getNHACompassDirection(currentHeading)}
              </span>
            </div>

            {/* Site Title & Geographic Coordinates in Viewport */}
            <div className="absolute bottom-4 left-4 right-24 pointer-events-none">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-0.5">
                {activeSite.location} · 360° Aerial Survey
              </span>
              <h3 className="rocky-title text-xl sm:text-2xl lg:text-3xl font-black text-white drop-shadow-md">
                {activeSite.title}
              </h3>
            </div>

            {/* Control Bar Overlay */}
            <div className="absolute top-16 sm:top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-colors cursor-pointer border ${
                  autoRotate
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                    : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:text-white'
                }`}
                title="Toggle Auto Sweep Rotation"
              >
                <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">360° Sweep</span>
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="h-8 w-8 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.1))}
                className="h-8 w-8 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active Hotspot Inspector Card Overlay */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 sm:left-auto right-4 max-w-sm rounded-xl border border-amber-500/40 bg-stone-950/95 backdrop-blur-md p-4 shadow-2xl animate-in fade-in duration-200 z-20">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  {activeHotspot.label}
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-stone-400 hover:text-white text-xs font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">
                {activeHotspot.detail}
              </p>
            </div>
          )}
        </div>

        {/* Panoramic Instructions & Features Footer */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Seamless Infinite 360° Panorama: Click & drag to rotate freely without gaps or blank edges</span>
          </div>
          <div className="text-stone-500">
            Certified to NHA & CDA Engineering Inspection Protocols
          </div>
        </div>

      </div>
    </section>
  );
};
