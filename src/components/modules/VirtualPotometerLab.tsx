import React, { useState, useEffect, useRef } from 'react';
import { PotometerMeasurement } from '../../types/biology';
import { Play, Pause, RotateCcw, PlusCircle, Trash2, Gauge, Sun, Thermometer, Droplets, Wind, AlertCircle, CheckCircle, HelpCircle, Camera, Layers, Eye } from 'lucide-react';

export const VirtualPotometerLab: React.FC = () => {
  // Environmental Variables
  const [lightLevel, setLightLevel] = useState<'dark' | 'dim' | 'bright' | 'intense'>('bright');
  const [temperature, setTemperature] = useState<number>(22); // °C
  const [humidity, setHumidity] = useState<number>(45); // %
  const [windLevel, setWindLevel] = useState<'still' | 'gentle' | 'strong'>('gentle');

  // Apparatus state & view mode
  const [apparatusView, setApparatusView] = useState<'diagram' | 'photo'>('diagram');
  const [capillaryRadiusMm, setCapillaryRadiusMm] = useState<number>(0.5); // standard 1mm diameter bore
  const [bubblePositionMm, setBubblePositionMm] = useState<number>(10); // start at 10mm
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTimeSec, setElapsedTimeSec] = useState<number>(0);
  const [simSpeed, setSimSpeed] = useState<number>(2); // 1x, 2x, 5x, 10x
  const [reservoirTapOpen, setReservoirTapOpen] = useState<boolean>(false);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);

  // Experimental Logs
  const [loggedData, setLoggedData] = useState<PotometerMeasurement[]>([]);

  // Cambridge Precautions Checklist
  const [precautionsChecked, setPrecautionsChecked] = useState<{ [key: string]: boolean }>({
    cutUnderwater: true,
    vaselineSeal: true,
    leavesDry: true,
    equilibrated: true
  });

  // Calculate transpiration multiplier based on physics/biology
  // Light: dark (0.2), dim (0.6), bright (1.0), intense (1.3)
  // Temp: Arrhenius/kinetic effect, rate doubles ~10°C rise
  // Humidity: high humidity reduces water vapour gradient drastically
  // Wind: removes boundary layer, steepens gradient
  const getRateMultiplier = () => {
    let lightMult = 1.0;
    if (lightLevel === 'dark') lightMult = 0.15;
    else if (lightLevel === 'dim') lightMult = 0.55;
    else if (lightLevel === 'bright') lightMult = 1.0;
    else if (lightLevel === 'intense') lightMult = 1.35;

    // Temperature effect (relative to 20°C)
    const tempMult = Math.max(0.2, 0.5 + (temperature - 10) * 0.045);

    // Humidity effect (inverse gradient: 100% -> very low transpiration; 20% -> very high)
    const humidityMult = Math.max(0.1, (100 - humidity) / 55);

    // Wind effect (boundary layer removal)
    let windMult = 0.7;
    if (windLevel === 'still') windMult = 0.7;
    else if (windLevel === 'gentle') windMult = 1.1;
    else if (windLevel === 'strong') windMult = 1.6;

    // Any missing precaution reduces accuracy or stops flow
    const precautionFactor = (!precautionsChecked.cutUnderwater || !precautionsChecked.vaselineSeal) ? 0.3 : 1.0;

    // Base speed: 0.15 mm per second at standard baseline
    return 0.18 * lightMult * tempMult * humidityMult * windMult * precautionFactor;
  };

  const currentRateMmPerSec = getRateMultiplier();
  const currentVolumePerSec = Math.PI * Math.pow(capillaryRadiusMm, 2) * currentRateMmPerSec; // mm³ / sec
  const currentRateMm3PerMin = currentVolumePerSec * 60; // mm³ / min

  // Animation Loop for Bubble Movement
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !reservoirTapOpen) {
      interval = setInterval(() => {
        setElapsedTimeSec((prev) => prev + 1);
        setBubblePositionMm((prev) => {
          const next = prev + currentRateMmPerSec * simSpeed;
          if (next >= 100) {
            setIsRunning(false);
            return 100;
          }
          return next;
        });
      }, 1000 / simSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, reservoirTapOpen, currentRateMmPerSec, simSpeed]);

  const handleResetBubble = () => {
    setReservoirTapOpen(true);
    setTimeout(() => {
      setBubblePositionMm(5);
      setReservoirTapOpen(false);
      setElapsedTimeSec(0);
    }, 400);
  };

  const handleLogData = () => {
    const dist = Math.max(0, bubblePositionMm - 5);
    const volume = Math.PI * Math.pow(capillaryRadiusMm, 2) * dist;
    const timeMin = Math.max(0.1, elapsedTimeSec / 60);
    const rate = volume / timeMin;

    const newEntry: PotometerMeasurement = {
      id: `run-${Date.now()}`,
      timeSec: elapsedTimeSec,
      distanceMm: parseFloat(dist.toFixed(1)),
      volumeMm3: parseFloat(volume.toFixed(2)),
      lightIntensity: lightLevel,
      temperature,
      humidity,
      windSpeed: windLevel,
      calculatedRateMm3PerMin: parseFloat(rate.toFixed(2))
    };

    setLoggedData((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-teal-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30">
                Syllabus 7.2(d) Experimental Skills
              </span>
              <span className="text-xs text-teal-200/80 font-mono">Paper 1, Paper 2 & Paper 3 Practical</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Gauge className="w-7 h-7 text-teal-400" />
              Virtual Capillary Potometer Laboratory
            </h2>
            <p className="text-teal-100/80 text-sm mt-1 max-w-2xl">
              Investigate the effect of light, temperature, humidity, and wind on the rate of water uptake. Observe bubble meniscus displacement, apply the volume formula, and log authentic experimental data.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormulaModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700 text-teal-100 text-xs font-semibold rounded-xl border border-teal-500/40 transition-all shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-teal-300" />
              Volume & Rate Formula
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Apparatus Simulation & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Potometer Apparatus Diagram / Photo (8 cols for maximum visual size) */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Capillary Potometer Apparatus
                </h3>
                {apparatusView === 'diagram' && (
                  <span className={`text-xs px-2.5 py-1 rounded-md font-mono font-bold ${
                    isRunning ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isRunning ? '● RUNNING' : '❚❚ PAUSED'}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                {apparatusView === 'diagram'
                  ? `Graduated capillary bore radius r = ${capillaryRadiusMm} mm`
                  : 'Official Ganong bubble potometer laboratory setup for Cambridge AS Biology 9700 Paper 3'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Switcher: Diagram vs Real Lab Photo */}
              <div className="flex items-center bg-slate-200/80 p-1 rounded-2xl border border-slate-300 text-xs font-bold">
                <button
                  onClick={() => setApparatusView('diagram')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    apparatusView === 'diagram'
                      ? 'bg-teal-700 text-white shadow-xs font-extrabold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive Diagram</span>
                </button>
                <button
                  onClick={() => setApparatusView('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    apparatusView === 'photo'
                      ? 'bg-teal-700 text-white shadow-xs font-extrabold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Real Lab Photo</span>
                </button>
              </div>

              {/* Stopwatch Timer Display (active during diagram simulation) */}
              {apparatusView === 'diagram' && (
                <div className="bg-slate-900 text-teal-400 px-4 py-2 rounded-2xl font-mono text-base font-extrabold shadow-inner flex items-center gap-2.5 border border-slate-700">
                  <span className="text-slate-400 text-xs tracking-wider">ELAPSED:</span>
                  <span>{Math.floor(elapsedTimeSec / 60).toString().padStart(2, '0')}:{(elapsedTimeSec % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>
          </div>

          {/* View Mode 1: Interactive Simulation Apparatus */}
          {apparatusView === 'diagram' ? (
            <div className="p-8 bg-gradient-to-b from-sky-50/40 via-white to-slate-50 flex flex-col items-center justify-center min-h-[460px]">
              <PotometerSvg
                bubblePos={bubblePositionMm}
                reservoirOpen={reservoirTapOpen}
                light={lightLevel}
                wind={windLevel}
                isRunning={isRunning}
              />

              {/* Live Graduated Scale Tracker */}
              <div className="w-full max-w-xl mt-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-2.5">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-slate-700 font-bold">Bubble Meniscus Position:</span>
                  <span className="text-teal-700 font-extrabold text-base">{bubblePositionMm.toFixed(1)} mm</span>
                </div>
                <div className="relative w-full h-6 bg-slate-100 rounded-full border border-slate-300 overflow-hidden flex items-center">
                  <div
                    className="absolute h-full bg-teal-500/25 border-r-2 border-teal-600 transition-all duration-200"
                    style={{ width: `${Math.min(100, Math.max(0, bubblePositionMm))}%` }}
                  />
                  {/* Air Bubble Marker */}
                  <div
                    className="absolute w-5 h-5 rounded-full bg-rose-500 shadow-md border-2 border-white -ml-2.5 transition-all duration-200 flex items-center justify-center"
                    style={{ left: `${Math.min(100, Math.max(0, bubblePositionMm))}%` }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full opacity-90" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-mono font-semibold">
                  <span>0 mm (Start)</span>
                  <span>25 mm</span>
                  <span>50 mm</span>
                  <span>75 mm</span>
                  <span>100 mm (End of scale)</span>
                </div>
              </div>
            </div>
          ) : (
            /* View Mode 2: Authentic Real Lab Setup Photograph */
            <div className="p-6 bg-slate-50/80 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-black">
                <img
                  src="/src/assets/images/potometer_apparatus_real_1794198985927.jpg"
                  alt="Cambridge AS Level Biology Ganong Bubble Potometer Laboratory Setup"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/30 text-teal-300 border border-teal-400/40">
                      Cambridge 9700 Paper 3 Practical Setup
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Ganong Bubble Potometer Mounted on Laboratory Bench
                  </h4>
                  <p className="text-xs text-slate-200 max-w-2xl mt-0.5">
                    Authentic laboratory apparatus setup used to measure water uptake rate by leafy shoots under controlled light, wind, and humidity treatments.
                  </p>
                </div>
              </div>

              {/* Apparatus Components Key & Cambridge Examination Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">1. Leafy Shoot & Seal</span>
                  <p className="text-slate-600 leading-relaxed">
                    Cut underwater at a 45° slant to preserve continuous water columns. Inserted tightly into a rubber bung and coated with petroleum jelly (Vaseline) for an airtight joint.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">2. Reset Reservoir Tap</span>
                  <p className="text-slate-600 leading-relaxed">
                    Reservoir flask with flow control stopcock tap. Opening the tap introduces reserve water to reset the bubble back to the zero mark for repeat trials.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">3. Calibrated Capillary Tube</span>
                  <p className="text-slate-600 leading-relaxed">
                    Narrow horizontal capillary bore (radius r ≈ 0.5 mm) with attached millimeter ruler scale to measure displacement distance d with high precision.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">4. Air Bubble Meniscus</span>
                  <p className="text-slate-600 leading-relaxed">
                    Introduced by briefly lifting the capillary tip from the water beaker. Moves leftward towards the shoot as water is absorbed by transpiration pull.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">5. Water Beaker</span>
                  <p className="text-slate-600 leading-relaxed">
                    Submerges the open end of the capillary tube to provide continuous water replenishment during experimental trials.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-teal-800 text-sm block">6. Retort Stand & Clamp</span>
                  <p className="text-slate-600 leading-relaxed">
                    Heavy metal retort stand clamps the vertical tube securely, preventing physical vibrations that could dislodge the air bubble or break the water column.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Apparatus Action Controls */}
          <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-sm ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5" />}
                {isRunning ? 'Pause Timing' : 'Start Water Uptake'}
              </button>

              <button
                onClick={handleResetBubble}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold rounded-xl transition-all shadow-sm"
                title="Open reservoir tap to push water and return air bubble to starting point"
              >
                <RotateCcw className="w-4 h-4 text-teal-600" />
                Reset Bubble (Tap)
              </button>

              <button
                onClick={handleLogData}
                disabled={elapsedTimeSec === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-sm font-extrabold rounded-xl transition-all shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Log Data Point
              </button>
            </div>

            {/* Simulation Speed Buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-xs text-slate-500 font-extrabold px-1.5 uppercase">Speed:</span>
              {[1, 2, 5, 10].map((s) => (
                <button
                  key={s}
                  onClick={() => setSimSpeed(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    simSpeed === s ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Environmental Control Sliders & Rate Gauges (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Real-Time Uptake Rate Gauge Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Calculated Uptake Velocity</span>
              <span className="text-[10px] font-mono text-slate-400">Based on leaf area & transpiration gradient</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-0.5">Linear Meniscus Velocity</span>
                <span className="text-xl font-bold font-mono text-teal-300">
                  {(currentRateMmPerSec * 60).toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono ml-1">mm · min⁻¹</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-0.5">Volumetric Uptake Rate</span>
                <span className="text-xl font-bold font-mono text-emerald-300">
                  {currentRateMm3PerMin.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono ml-1">mm³ · min⁻¹</span>
              </div>
            </div>

            <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-800/50 text-[11px] text-teal-200">
              <span className="font-bold text-teal-300">Cambridge Key Note: </span>
              Potometer measures <strong>rate of water uptake</strong>, which provides an estimate of transpiration rate (since ~98-99% of absorbed water is transpired; remainder used in photosynthesis & maintaining turgor).
            </div>
          </div>

          {/* Environmental Parameter Controls */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Investigated Environmental Conditions
            </h4>

            {/* Light Intensity */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  Light Intensity (Stomatal Aperture)
                </span>
                <span className="font-mono text-amber-600 font-bold uppercase">{lightLevel}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['dark', 'dim', 'bright', 'intense'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLightLevel(lvl)}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                      lightLevel === lvl
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                Light stimulates guard cell H⁺-ATPases, accumulating K⁺ to open stomata.
              </p>
            </div>

            {/* Temperature */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  Temperature (°C)
                </span>
                <span className="font-mono text-rose-600 font-bold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Increases kinetic energy of water molecules, increasing evaporation from mesophyll cell walls.
              </p>
            </div>

            {/* Relative Humidity */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  Relative Humidity (%)
                </span>
                <span className="font-mono text-sky-600 font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="5"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Higher humidity reduces the water vapour potential gradient between leaf air spaces and outside air.
              </p>
            </div>

            {/* Wind Speed / Air Movement */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-teal-500" />
                  Air Movement / Wind Speed
                </span>
                <span className="font-mono text-teal-600 font-bold uppercase">{windLevel}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['still', 'gentle', 'strong'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWindLevel(w)}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                      windLevel === w
                        ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                Wind removes the still boundary layer of humid air around stomata, steepening the diffusion gradient.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experimental Log Table & Graph Section */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Experimental Data Log & Volume Calculations</h3>
            <p className="text-xs text-slate-500">Record results across varied environmental treatments for Paper 3 analysis</p>
          </div>
          {loggedData.length > 0 && (
            <button
              onClick={() => setLoggedData([])}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold self-start"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All Logs
            </button>
          )}
        </div>

        {loggedData.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No data logged yet. Click <span className="font-bold text-emerald-600">"Log Data Point"</span> during or after a trial run to record readings into the table.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 font-bold">Trial</th>
                  <th className="p-2.5 font-bold">Conditions (Light / Temp / Hum / Wind)</th>
                  <th className="p-2.5 font-bold">Time (s)</th>
                  <th className="p-2.5 font-bold">Distance d (mm)</th>
                  <th className="p-2.5 font-bold">Volume = πr²d (mm³)</th>
                  <th className="p-2.5 font-bold text-teal-700">Rate (mm³ · min⁻¹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {loggedData.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/80">
                    <td className="p-2.5 font-bold text-slate-800">#{loggedData.length - idx}</td>
                    <td className="p-2.5 text-slate-600 font-sans">
                      {row.lightIntensity} • {row.temperature}°C • {row.humidity}% RH • {row.windSpeed} wind
                    </td>
                    <td className="p-2.5 text-slate-800">{row.timeSec}s</td>
                    <td className="p-2.5 text-slate-800">{row.distanceMm}</td>
                    <td className="p-2.5 text-slate-800">{row.volumeMm3}</td>
                    <td className="p-2.5 font-bold text-teal-700 bg-teal-50/60">{row.calculatedRateMm3PerMin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cambridge 9700 Essential Experimental Precautions Checklist */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-emerald-950 text-base">
            Cambridge 9700 Essential Experimental Precautions (Paper 3 & Theory)
          </h3>
        </div>
        <p className="text-xs text-emerald-900/80 leading-relaxed">
          Examiners frequently award 2 to 4 marks for stating these exact precautions and their scientific rationales:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              1. Cut the stem under water at a slanted angle
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong>Why:</strong> Prevents air from being sucked into xylem vessels by tension, avoiding airlocks (cavitation). The slant increases surface area for water absorption.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              2. Seal all joints with petroleum jelly (Vaseline)
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong>Why:</strong> Ensures an airtight and watertight seal so water uptake is solely driven by shoot transpiration without air leaks entering the capillary.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              3. Dry the leaves thoroughly before timing
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong>Why:</strong> Wet leaves block stomata and saturate the boundary layer with water, artificially depressing transpiration until droplets evaporate.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              4. Allow an equilibration period (5-10 mins)
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              <strong>Why:</strong> Allows the cut shoot to adjust to the new environmental conditions (temperature, light) so a steady transpiration rate is reached before recording.
            </p>
          </div>
        </div>
      </div>

      {/* Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Potometer Mathematical Calculations</h4>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono">
                <div className="font-bold text-teal-800 text-sm">Volume of Water Uptake:</div>
                <div className="text-slate-900 font-bold">V = π × r² × d</div>
                <div className="text-[11px] text-slate-500 font-sans">
                  r = radius of capillary tube bore (mm)<br />
                  d = distance moved by the air bubble meniscus (mm)
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono">
                <div className="font-bold text-teal-800 text-sm">Rate of Water Uptake:</div>
                <div className="text-slate-900 font-bold">Rate = Volume / time = (π × r² × d) / t</div>
                <div className="text-[11px] text-slate-500 font-sans">
                  Usually expressed in mm³ · min⁻¹ or cm³ · min⁻¹
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <strong>Examiner Trap Alert:</strong> If the question provides the <em>diameter</em> of the capillary tube, you must divide by 2 to obtain the <em>radius (r)</em> before squaring!
              </div>
            </div>

            <button
              onClick={() => setShowFormulaModal(false)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Got it, Return to Lab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// High-Realism SVG Diagram of Capillary Potometer Apparatus
// ==========================================

interface PotometerSvgProps {
  bubblePos: number; // 0 to 100
  reservoirOpen: boolean;
  light: 'dark' | 'dim' | 'bright' | 'intense';
  wind: 'still' | 'gentle' | 'strong';
  isRunning: boolean;
}

const PotometerSvg: React.FC<PotometerSvgProps> = ({ bubblePos, reservoirOpen, light, wind, isRunning }) => {
  // Map bubble 0-100 mm to SVG X coordinates (from 175 at 0mm to 425 at 100mm)
  const bubbleX = 175 + (bubblePos / 100) * 250;

  return (
    <svg viewBox="0 0 580 320" className="w-full max-w-[640px] md:max-w-[720px] h-auto select-none drop-shadow-md">
      <defs>
        {/* Realistic Glass Reflection Gradient */}
        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="20%" stopColor="#e0f2fe" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="90%" stopColor="#bae6fd" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
        </linearGradient>

        {/* Water in Capillary & Glassware */}
        <linearGradient id="waterFluid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Metallic Retort Stand Gradient */}
        <linearGradient id="metallicRod" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="35%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Ruler Texture */}
        <linearGradient id="rulerPlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>

      {/* Environmental Cues: Solar Illumination & Wind */}
      {light !== 'dark' && (
        <g opacity={light === 'dim' ? 0.35 : light === 'bright' ? 0.8 : 1} className="transition-opacity duration-300">
          <circle cx="65" cy="30" r="18" fill="#fef08a" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="65" y1="4" x2="65" y2="-4" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="65" y1="56" x2="65" y2="64" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="39" y1="30" x2="31" y2="30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="91" y1="30" x2="99" y2="30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="47" y1="12" x2="41" y2="6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="83" y1="48" x2="89" y2="54" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {wind !== 'still' && (
        <g stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={wind === 'strong' ? 0.95 : 0.55}>
          <path d="M 10,75 Q 40,68 75,74" />
          <path d="M 0,98 Q 45,90 85,96" />
          <path d="M 15,120 Q 55,112 95,118" />
        </g>
      )}

      {/* 1. Laboratory Retort Stand (Cast-Iron Heavy Base & Steel Rod) */}
      <g id="retort-stand">
        {/* Cast iron bevelled rectangular base */}
        <path d="M 40,295 L 125,295 L 115,282 L 50,282 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        <rect x="42" y="293" width="81" height="4" fill="#0f172a" rx="1" />
        
        {/* Vertical Stainless Steel Rod */}
        <rect x="78" y="45" width="8" height="237" fill="url(#metallicRod)" stroke="#475569" strokeWidth="1" rx="1.5" />

        {/* Bosshead & Clamp holding Vertical Tube */}
        <rect x="74" y="160" width="16" height="20" fill="#334155" stroke="#1e293b" strokeWidth="1.5" rx="3" />
        <circle cx="68" cy="170" r="4.5" fill="#94a3b8" stroke="#1e293b" strokeWidth="1" />
        <rect x="86" y="167" width="22" height="6" fill="#475569" rx="1" stroke="#1e293b" strokeWidth="1" />
        <path d="M 108,160 L 114,160 A 14 14 0 0 1 114,180 L 108,180" fill="none" stroke="#334155" strokeWidth="4" />
      </g>

      {/* 2. Plant Shoot with Healthy Veined Leaves */}
      <g id="leafy-shoot">
        {/* Main Stem running down through rubber bung into water */}
        <path d="M 112,195 L 112,145 Q 112,105 106,70" stroke="#15803d" strokeWidth="7" fill="none" strokeLinecap="round" />
        
        {/* Slanted 45-degree cut end clearly visible under water */}
        <path d="M 108,195 L 116,187" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" />
        
        {/* Detailed Botanical Dicot Leaves */}
        {/* Top central leaf */}
        <path d="M 106,70 Q 100,30 110,25 Q 120,45 106,70" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        <path d="M 107,65 L 109,32" stroke="#15803d" strokeWidth="1" />

        {/* Left leaf 1 */}
        <path d="M 107,85 Q 70,60 45,78 Q 75,92 107,85" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
        <path d="M 105,85 Q 75,78 50,78" stroke="#14532d" strokeWidth="1" />
        <path d="M 75,80 Q 70,72 65,70" stroke="#14532d" strokeWidth="0.75" />
        <path d="M 85,82 Q 80,75 75,74" stroke="#14532d" strokeWidth="0.75" />

        {/* Right leaf 1 */}
        <path d="M 109,100 Q 150,75 175,90 Q 145,110 109,100" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        <path d="M 112,100 Q 142,92 170,90" stroke="#15803d" strokeWidth="1" />
        <path d="M 135,95 Q 140,88 145,86" stroke="#15803d" strokeWidth="0.75" />
        <path d="M 150,93 Q 155,87 160,85" stroke="#15803d" strokeWidth="0.75" />

        {/* Left leaf 2 */}
        <path d="M 110,120 Q 65,105 40,125 Q 75,135 110,120" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        <path d="M 108,121 Q 75,118 45,124" stroke="#14532d" strokeWidth="1" />

        {/* Right leaf 2 */}
        <path d="M 111,135 Q 148,120 170,135 Q 140,150 111,135" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />

        {/* Moisture Vapour Diffusion droplets when running */}
        {isRunning && (
          <g fill="#38bdf8" opacity="0.7" className="animate-pulse">
            <circle cx="42" cy="68" r="3" />
            <circle cx="178" cy="80" r="3" />
            <circle cx="110" cy="18" r="3.5" />
            <circle cx="36" cy="115" r="2.5" />
          </g>
        )}
      </g>

      {/* 3. Rubber Bung / Stopper with Petroleum Jelly (Vaseline) Seal */}
      <g id="rubber-stopper">
        <polygon points="102,150 122,150 120,165 104,165" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
        <ellipse cx="112" cy="150" rx="10" ry="3" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />
        
        {/* Vaseline grease ring seal */}
        <ellipse cx="112" cy="165" rx="11" ry="3.5" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        
        <text x="32" y="162" textAnchor="end" className="text-[11px] font-sans fill-amber-900 font-extrabold">
          Vaseline Seal
        </text>
        <line x1="36" y1="162" x2="102" y2="162" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
      </g>

      {/* 4. Vertical Glass Cylinder filled with Water */}
      <g id="vertical-glass-cylinder">
        {/* Glass tube walls */}
        <rect x="103" y="165" width="18" height="60" fill="url(#glassReflection)" stroke="#64748b" strokeWidth="1.5" />
        {/* Water inside vertical tube */}
        <rect x="105" y="168" width="14" height="57" fill="url(#waterFluid)" opacity="0.7" />
        {/* Water meniscus */}
        <ellipse cx="112" cy="168" rx="7" ry="2" fill="#7dd3fc" />
      </g>

      {/* 5. Water Reservoir with Calibrated Syringe / Funnel & Stopcock */}
      <g id="water-reservoir">
        {/* Reservoir funnel / cylinder */}
        <rect x="150" y="100" width="26" height="70" rx="3" fill="url(#glassReflection)" stroke="#64748b" strokeWidth="1.5" />
        <rect x="152" y="115" width="22" height="55" fill="url(#waterFluid)" opacity="0.65" />
        
        {/* Volume graduation lines on reservoir */}
        <line x1="150" y1="120" x2="162" y2="120" stroke="#475569" strokeWidth="1" />
        <line x1="150" y1="135" x2="162" y2="135" stroke="#475569" strokeWidth="1" />
        <line x1="150" y1="150" x2="162" y2="150" stroke="#475569" strokeWidth="1" />
        
        <text x="163" y="90" textAnchor="middle" className="text-[12px] font-sans fill-slate-800 font-extrabold">
          Reservoir
        </text>

        {/* Connecting tube from reservoir to T-piece */}
        <path d="M 163,170 L 163,225" stroke="#64748b" strokeWidth="5" fill="none" />
        <path d="M 163,170 L 163,225" stroke="#bae6fd" strokeWidth="3" fill="none" />

        {/* Stopcock valve / Tap */}
        <circle cx="163" cy="192" r="7" fill={reservoirOpen ? '#10b981' : '#e11d48'} stroke="#1e293b" strokeWidth="1.5" />
        <line
          x1="156"
          y1="192"
          x2="170"
          y2="192"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={reservoirOpen ? 'rotate(90 163 192)' : ''}
        />
        <text x="175" y="196" textAnchor="start" className="text-[11px] font-sans fill-slate-700 font-bold">
          {reservoirOpen ? 'Tap OPEN' : 'Tap Closed'}
        </text>
      </g>

      {/* 6. T-Junction Tube connecting Shoot, Reservoir, and Capillary */}
      <path
        d="M 112,225 L 475,225"
        stroke="#64748b"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 112,225 L 475,225"
        stroke="#38bdf8"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* 7. Calibrated Millimeter Ruler (Plate mounted behind capillary tube) */}
      <g id="calibrated-ruler">
        {/* Ruler Plate (from X=170 to X=430) */}
        <rect x="170" y="210" width="260" height="34" fill="url(#rulerPlate)" stroke="#94a3b8" strokeWidth="1.5" rx="3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.08))" />

        {/* Finely spaced ticks: every 10 mm major, 5 mm medium, 2 mm minor */}
        {Array.from({ length: 51 }, (_, i) => i * 2).map((tick) => {
          const tx = 175 + (tick / 100) * 250;
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;

          return (
            <line
              key={tick}
              x1={tx}
              y1="210"
              x2={tx}
              y2={isMajor ? '222' : isMedium ? '218' : '215'}
              stroke="#475569"
              strokeWidth={isMajor ? 1.5 : 0.75}
            />
          );
        })}

        {/* Ruler Number Labels (0, 10, 20, 30, ..., 100 mm) */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => {
          const nx = 175 + (num / 100) * 250;
          return (
            <text
              key={num}
              x={nx}
              y="238"
              textAnchor="middle"
              className="text-[10px] font-mono fill-slate-800 font-extrabold"
            >
              {num}
            </text>
          );
        })}
        <text x="300" y="252" textAnchor="middle" className="text-[10px] font-mono fill-teal-900 font-bold uppercase tracking-wider">
          Millimeter Scale (mm)
        </text>
      </g>

      {/* 8. Glass Capillary Bore with Water Column & Moving Bubble */}
      <g id="capillary-bore">
        {/* Glass tube overlay */}
        <rect x="170" y="222" width="260" height="6" fill="url(#glassReflection)" stroke="#64748b" strokeWidth="1" opacity="0.6" />

        {/* Direction of flow arrow on ruler */}
        <path d="M 280,182 L 230,182 M 236,177 L 230,182 L 236,187" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="255" y="174" textAnchor="middle" className="text-[10px] font-mono fill-sky-800 font-extrabold">
          ← Direction of Water Uptake
        </text>

        {/* Moving Air Bubble inside Capillary Tube */}
        <ellipse
          cx={bubbleX}
          cy="225"
          rx="6"
          ry="3.5"
          fill="#ffffff"
          stroke="#e11d48"
          strokeWidth="2.5"
        />
        {/* Bubble meniscus lines */}
        <line x1={bubbleX - 6} y1="223" x2={bubbleX - 6} y2="227" stroke="#991b1b" strokeWidth="1.5" />
        <line x1={bubbleX + 6} y1="223" x2={bubbleX + 6} y2="227" stroke="#991b1b" strokeWidth="1.5" />

        {/* Pointer Callout above Bubble */}
        <line x1={bubbleX} y1="195" x2={bubbleX} y2="218" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx={bubbleX} cy="195" r="3" fill="#e11d48" />
        <text x={bubbleX} y="190" textAnchor="middle" className="text-[12px] font-mono fill-rose-700 font-extrabold">
          {bubblePos.toFixed(1)} mm
        </text>
      </g>

      {/* 9. Water Beaker on Right (submerging capillary tip) */}
      <g id="water-beaker">
        {/* Beaker Body */}
        <path d="M 470,205 L 470,270 Q 500,275 530,270 L 530,205 Z" fill="url(#glassReflection)" stroke="#475569" strokeWidth="1.5" />
        {/* Water inside Beaker */}
        <path d="M 472,216 L 472,268 Q 500,273 528,268 L 528,216 Z" fill="url(#waterFluid)" opacity="0.6" />
        {/* Water Top Meniscus */}
        <ellipse cx="500" cy="216" rx="27" ry="5" fill="#7dd3fc" stroke="#38bdf8" strokeWidth="1" />
        
        {/* Submerged Capillary Tube Tip */}
        <path d="M 475,225 L 500,225 L 500,245" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 475,225 L 500,225 L 500,245" stroke="#bae6fd" strokeWidth="2" fill="none" strokeLinecap="round" />

        <text x="500" y="290" textAnchor="middle" className="text-[11px] font-sans fill-slate-800 font-extrabold">
          Water Beaker
        </text>
      </g>
    </svg>
  );
};
