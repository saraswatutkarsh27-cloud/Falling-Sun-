import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Cpu, Globe, Terminal, Activity, Zap, Play, Box, RefreshCw, Server, Radio } from 'lucide-react';

/* -------------------------------------------------------------
 * 01: GAME DEVELOPMENT VISUAL (Interactive Simulation Workbench)
 * ------------------------------------------------------------- */
export const GameDevVisual: React.FC = () => {
  const [pipelineMode, setPipelineMode] = useState<'RENDER' | 'PHYSICS' | 'WIREFRAME'>('RENDER');
  const [targetFps, setTargetFps] = useState<number>(60);
  const [entityCount, setEntityCount] = useState<number>(1024);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const spawnMore = () => {
    setEntityCount((prev) => (prev >= 4096 ? 512 : prev + 512));
  };

  return (
    <div className="relative w-full h-[390px] md:h-[460px] rounded-3xl bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between p-6 select-none">
      {/* 3D Perspective Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000018_1px,transparent_1px),linear-gradient(to_bottom,#00000018_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            transform: 'perspective(500px) rotateX(60deg) translateY(50px)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Dynamic HUD Header & Interactive Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-ink-muted border-b border-black/10 pb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${isSimulating ? 'bg-sun animate-pulse' : 'bg-black/30'}`} />
          <span className="text-ink font-bold">PIPELINE // {pipelineMode}</span>
        </div>

        {/* Interactive Mode Pills */}
        <div className="flex items-center gap-1.5 bg-black/[0.04] p-1 rounded-lg">
          {(['RENDER', 'PHYSICS', 'WIREFRAME'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPipelineMode(mode)}
              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                pipelineMode === mode
                  ? 'bg-ink text-white shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Center Reticle & Isometric Geometry */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        {/* Outer Rotating HUD Ring */}
        <motion.div
          animate={{ rotate: isSimulating ? 360 : 0 }}
          transition={{ duration: targetFps === 120 ? 15 : 28, repeat: Infinity, ease: 'linear' }}
          className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-dashed border-sun/60 flex items-center justify-center"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-sun rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border border-ink rounded-full bg-white" />
        </motion.div>

        {/* Center Isometric Geometry with visual variation per mode */}
        <div className="absolute flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: pipelineMode === 'PHYSICS' ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              pipelineMode === 'WIREFRAME'
                ? 'border-2 border-dashed border-sun bg-sun/5'
                : pipelineMode === 'PHYSICS'
                ? 'border border-flame bg-flame/10'
                : 'border border-black/20 bg-black/[0.02]'
            }`}
          >
            <Box className={`w-12 h-12 transition-colors ${
              pipelineMode === 'WIREFRAME' ? 'text-sun-dark' : pipelineMode === 'PHYSICS' ? 'text-flame' : 'text-sun'
            }`} />
          </motion.div>
        </div>

        {/* HUD Crosshairs */}
        <Crosshair className="absolute w-7 h-7 text-ink/60 pointer-events-none" />
      </div>

      {/* Bottom Interactive Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-ink-muted border-t border-black/10 pt-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={spawnMore}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/[0.03] hover:bg-sun hover:text-black border border-black/10 transition-colors cursor-pointer"
            title="Click to spawn more entities"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>ENTITIES: {entityCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setTargetFps(targetFps === 60 ? 120 : 60)}
            className="text-sun font-bold px-2 py-1 rounded bg-sun/10 border border-sun/20 cursor-pointer hover:bg-sun/20"
          >
            {targetFps}.0 FPS
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSimulating(!isSimulating)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink text-white hover:bg-sun hover:text-black font-bold text-[9px] transition-colors cursor-pointer"
        >
          <Play className={`w-2.5 h-2.5 ${isSimulating ? 'fill-current' : ''}`} />
          <span>{isSimulating ? 'SIMULATION RUNNING' : 'PAUSED'}</span>
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 02: WEB DEVELOPMENT VISUAL (Interactive Browser & Network Console)
 * ------------------------------------------------------------- */
export const WebDevVisual: React.FC = () => {
  const [latency, setLatency] = useState<string>('2.4 ms');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [appState, setAppState] = useState<'HYDRATED' | 'SSR_READY' | 'REACTIVE'>('HYDRATED');

  const triggerPing = () => {
    setIsTesting(true);
    setTimeout(() => {
      const randomLatency = (Math.random() * 2 + 1.2).toFixed(1);
      setLatency(`${randomLatency} ms`);
      setIsTesting(false);
    }, 450);
  };

  const cycleState = () => {
    const states: ('HYDRATED' | 'SSR_READY' | 'REACTIVE')[] = ['HYDRATED', 'SSR_READY', 'REACTIVE'];
    const next = states[(states.indexOf(appState) + 1) % states.length];
    setAppState(next);
  };

  return (
    <div className="relative w-full h-[390px] md:h-[460px] rounded-3xl bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between p-6 select-none">
      {/* Browser Window Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-ink-muted bg-black/[0.03] px-2.5 py-0.5 rounded-md border border-black/5">
            https://fallingsun.build/client
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-ink-soft">
          <Globe className="w-3 h-3 text-ink-soft" />
          <span>HTTP/3 (200 OK)</span>
        </div>
      </div>

      {/* Central Abstract Layout Hierarchy with Interactive elements */}
      <div className="grid grid-cols-12 gap-4 my-auto py-2">
        {/* Left Sidebar Layout */}
        <div className="col-span-4 space-y-3">
          <div className="h-6 rounded-lg bg-black/[0.03] border border-black/5 flex items-center px-3 font-mono text-[9px] text-ink-soft font-semibold">
            &lt;Sidebar /&gt;
          </div>
          <div className="h-20 rounded-lg bg-black/[0.02] border border-black/5 p-3 space-y-2">
            <div className="h-2 w-3/4 rounded bg-black/15" />
            <div className="h-2 w-1/2 rounded bg-black/10" />
            <div className="h-2 w-2/3 rounded bg-black/10" />
          </div>
          <button
            type="button"
            onClick={cycleState}
            className="w-full h-14 rounded-lg bg-sun/10 hover:bg-sun/20 border border-sun/30 p-2.5 flex items-center gap-2 transition-colors cursor-pointer text-left"
            title="Click to cycle application state"
          >
            <Activity className="w-4 h-4 text-sun shrink-0" />
            <div className="font-mono text-[9px] text-ink">
              <span className="text-sun font-bold">STATE:</span> {appState}
            </div>
          </button>
        </div>

        {/* Right Main Viewport */}
        <div className="col-span-8 space-y-3">
          <div className="h-10 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-between px-3">
            <div className="h-2 w-28 rounded bg-black/20" />
            <div className="flex gap-2">
              <div className="h-2 w-6 rounded bg-sun/40" />
              <div className="h-2 w-6 rounded bg-sun" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-xl bg-surface-subtle border border-black/10 p-3 flex flex-col justify-between shadow-xs">
              <div className="font-mono text-[9px] text-ink-muted font-bold flex items-center gap-1.5">
                <Server className="w-3 h-3 text-sun" />
                <span>&lt;Canvas3D /&gt;</span>
              </div>
              <div className="flex items-end justify-between font-mono text-[10px] text-ink-soft">
                <span>BUNDLE</span>
                <span className="text-ink font-bold">12.4 KB</span>
              </div>
            </div>

            <button
              type="button"
              onClick={triggerPing}
              className="h-24 rounded-xl bg-surface-subtle hover:bg-white border border-black/10 hover:border-sun p-3 flex flex-col justify-between shadow-xs transition-all cursor-pointer text-left"
              title="Click to test simulated WebSocket ping"
            >
              <div className="font-mono text-[9px] text-ink-muted font-bold flex items-center justify-between">
                <span>&lt;RealtimeSync /&gt;</span>
                <Radio className={`w-3 h-3 ${isTesting ? 'text-sun animate-ping' : 'text-emerald-500'}`} />
              </div>
              <div className="flex items-end justify-between font-mono text-[10px] text-ink-soft">
                <span>LATENCY</span>
                <span className="text-emerald-600 font-bold">{isTesting ? 'TESTING...' : latency}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Request Log at Bottom */}
      <div className="border-t border-black/10 pt-3 flex items-center justify-between font-mono text-[10px] text-ink-muted">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sun" />
          <span className="text-ink font-medium">GET /ws/stream — 101 SWITCH PROTOCOLS</span>
        </div>
        <div className="text-ink-faint hidden sm:block">V8 JIT ACTIVE</div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 03: ROBOTICS VISUAL (Interactive Circuit & Servo Controller)
 * ------------------------------------------------------------- */
export const RoboticsVisual: React.FC = () => {
  const [servoAngle, setServoAngle] = useState<number>(90);
  const [pwmDuty, setPwmDuty] = useState<number>(255);

  const rotateServo = (deg: number) => {
    setServoAngle(deg);
    setPwmDuty(Math.round((deg / 180) * 255));
  };

  return (
    <div className="relative w-full h-[390px] md:h-[460px] rounded-3xl bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between p-6 select-none">
      {/* Top Telemetry Info */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono text-[10px] text-ink-muted">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-flame" />
          <span className="text-ink font-bold">FIRMWARE // RTOS CORE 0</span>
        </div>
        <div className="flex items-center gap-2 text-flame font-bold">
          <Zap className="w-3 h-3 fill-flame" />
          <span>PWR: 5.0V / 2.1A</span>
        </div>
      </div>

      {/* Center Circuit Schematics & Interactive Servo Controller */}
      <div className="relative my-auto flex items-center justify-center py-4">
        <div className="relative w-52 h-52 md:w-56 md:h-56 rounded-full border border-black/10 flex items-center justify-center bg-black/[0.01]">
          {/* Servo Angle Arm */}
          <motion.div
            animate={{ rotate: servoAngle }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute w-36 h-36 rounded-full border border-dashed border-flame/50 flex items-center justify-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-flame flex items-center justify-center text-white text-[8px] font-black font-mono">
              ▲
            </div>
            <div className="w-20 h-20 rounded-full border border-black/15 flex items-center justify-center bg-white shadow-sm">
              <Cpu className="w-8 h-8 text-sun" />
            </div>
          </motion.div>

          {/* Orbiting Sensor Badges */}
          <div className="absolute top-2 left-4 bg-white border border-black/10 px-2 py-0.5 rounded-md font-mono text-[9px] text-ink flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold">I2C: 0x3C</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-white border border-black/10 px-2 py-0.5 rounded-md font-mono text-[9px] text-ink flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sun" />
            <span className="font-bold">PWM: {pwmDuty}</span>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Servo Preset Buttons */}
      <div className="border-t border-black/10 pt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-ink-muted">
        <div className="flex items-center gap-1.5">
          <span className="text-ink font-bold">SERVO // {servoAngle}°:</span>
          {[0, 45, 90, 135, 180].map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => rotateServo(deg)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                servoAngle === deg
                  ? 'bg-flame text-white shadow-xs'
                  : 'bg-black/[0.04] text-ink hover:bg-black/10'
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>
        <div className="text-emerald-600 font-bold hidden sm:block">UART @ 115200 BAUD</div>
      </div>
    </div>
  );
};
