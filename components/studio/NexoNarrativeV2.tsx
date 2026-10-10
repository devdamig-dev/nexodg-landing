"use client"

import Link from "next/link"
import { useRef } from "react"
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"

const CYAN = "#00D9D9"

const nodes = [
  { label: "WHATSAPP", x: 17, y: 29 },
  { label: "DATOS", x: 79, y: 22 },
  { label: "CRM", x: 87, y: 54 },
  { label: "IA", x: 67, y: 77 },
  { label: "WEB", x: 22, y: 74 },
  { label: "PERSONAS", x: 10, y: 52 },
  { label: "AUTOMATIZACIONES", x: 49, y: 13 },
]

const particles = Array.from({ length: 46 }, (_, index) => ({
  left: `${(index * 37) % 97}%`,
  top: `${(index * 61) % 91}%`,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: (index % 9) * 0.17,
}))

function GridField({ progress }: { progress: MotionValue<number> }) {
  const fineOpacity = useTransform(progress, [0, 0.2, 0.58, 0.84, 1], [0.1, 0.16, 0.06, 0.14, 0.07])
  const macroOpacity = useTransform(progress, [0, 0.32, 0.72, 1], [0.18, 0.08, 0.22, 0.08])
  const gridScale = useTransform(progress, [0, 0.6, 1], [1, 1.18, 1.05])

  return (
    <>
      <motion.div
        style={{ opacity: fineOpacity, scale: gridScale }}
        className="pointer-events-none absolute -inset-[12%] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <motion.div
        style={{ opacity: macroOpacity }}
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(0,217,217,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,217,.18)_1px,transparent_1px)] [background-size:288px_288px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(0,0,0,.18)_41%,rgba(0,0,0,.95)_100%)]" />
    </>
  )
}

function ParticleField({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#00D9D9] shadow-[0_0_15px_rgba(0,217,217,.65)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ opacity: [0.08, 0.85, 0.08], scale: [0.7, 1.65, 0.7] }}
          transition={{ duration: 3.5 + (index % 4) * 0.45, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  )
}

function IntroScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const opacity = useTransform(progress, [0, 0.018, 0.12, 0.19], [0, 1, 1, 0])
  const y = useTransform(progress, [0, 0.1, 0.19], [reducedMotion ? 0 : 18, 0, reducedMotion ? 0 : -48])
  const claimOpacity = useTransform(progress, [0.03, 0.067, 0.17, 0.2], [0, 1, 1, 0])
  const claimScale = useTransform(progress, [0.04, 0.145, 0.2], [0.9, 1, reducedMotion ? 1 : 1.09])
  const sigueX = useTransform(progress, [0.13, 0.2], [0, reducedMotion ? 0 : -64])
  const tracking = useTransform(progress, [0.13, 0.2], ["-0.085em", "0.025em"])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-30 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4 text-[9px] uppercase tracking-[0.3em] text-white/35 sm:text-[10px]">
          <span>34.7821° S / 58.2523° W</span>
          <span className="text-[#00D9D9]">SYSTEM / ONLINE</span>
        </div>
        <p className="text-xs font-semibold tracking-[0.5em] text-white sm:text-sm">NEXODG</p>
        <motion.div style={{ opacity: claimOpacity, scale: claimScale }} className="mt-6 origin-left">
          <h1 className="text-[clamp(4.1rem,13.5vw,13.8rem)] font-semibold uppercase leading-[0.77] tracking-[-0.085em] text-white">
            <span className="block">CONSTRUIMOS</span>
            <motion.span style={{ x: sigueX, letterSpacing: tracking }} className="block text-[#00D9D9]">LO QUE SIGUE.</motion.span>
          </h1>
        </motion.div>
        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="text-sm tracking-[0.14em] text-white/54 sm:text-base">Diseño + Tecnología + IA</p>
          <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/34 sm:flex">
            <ArrowDown className="h-3.5 w-3.5 text-[#00D9D9]" /> Scroll / timeline
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function NetworkNode({ progress, label, x, y, index }: { progress: MotionValue<number>; label: string; x: number; y: number; index: number }) {
  const revealAt = 0.215 + index * 0.008
  const collapseAt = 0.39 + index * 0.003
  const opacity = useTransform(progress, [0.18, revealAt, 0.39, 0.455], [0, 1, 1, 0])
  const left = useTransform(progress, [0.33, collapseAt, 0.455], [`${x}%`, `${x}%`, "50%"])
  const top = useTransform(progress, [0.33, collapseAt, 0.455], [`${y}%`, `${y}%`, "50%"])
  const scale = useTransform(progress, [0.2, revealAt, 0.39, 0.455], [0.75, 1, 1, 0.3])
  const blur = useTransform(progress, [0.38, 0.455], ["blur(0px)", "blur(10px)"])

  return (
    <motion.div style={{ left, top, opacity, scale, filter: blur }} className="absolute z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative whitespace-nowrap border border-white/15 bg-black/65 px-3 py-2 text-[9px] font-medium tracking-[0.22em] text-white/72 backdrop-blur-md sm:text-xs">
        <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#00D9D9]" />
        {label}
      </div>
    </motion.div>
  )
}

function NetworkScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const opacity = useTransform(progress, [0.17, 0.205, 0.43, 0.475], [0, 1, 1, 0])
  const lineProgress = useTransform(progress, [0.21, 0.335, 0.455], [0, 1, 0])
  const cameraScale = useTransform(progress, [0.18, 0.34, 0.46], reducedMotion ? [1, 1, 1] : [0.9, 1, 1.18])
  const cameraRotate = useTransform(progress, [0.2, 0.45], reducedMotion ? [0, 0] : [-1.8, 1.5])
  const hubScale = useTransform(progress, [0.21, 0.31, 0.39, 0.465], [0.45, 1, 1.15, 3.2])
  const hubOpacity = useTransform(progress, [0.19, 0.26, 0.43, 0.465], [0, 1, 1, 0])
  const ringRotate = useTransform(progress, [0.21, 0.46], [0, 145])

  return (
    <motion.div style={{ opacity, scale: cameraScale, rotate: cameraRotate }} className="absolute inset-0 [perspective:1100px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((node) => (
          <motion.line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} stroke="rgba(0,217,217,.5)" strokeWidth="0.13" vectorEffect="non-scaling-stroke" pathLength={lineProgress} />
        ))}
        <motion.circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="0.12" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
        <motion.circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,217,217,.09)" strokeWidth="0.12" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
      </svg>

      {nodes.map((node, index) => <NetworkNode key={node.label} progress={progress} index={index} {...node} />)}

      <motion.div style={{ opacity: hubOpacity, scale: hubScale }} className="absolute left-1/2 top-1/2 z-30 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-36 sm:w-36">
        <motion.div style={{ rotate: ringRotate }} className="absolute inset-0 rounded-full border border-[#00D9D9]/40 shadow-[0_0_90px_rgba(0,217,217,.18)]" />
        <motion.div style={{ rotate: useTransform(ringRotate, (v) => -v * 1.35), rotateX: 62 }} className="absolute inset-[14%] rounded-full border border-white/20" />
        <div className="absolute inset-[30%] grid place-items-center rounded-full border border-white/15 bg-black text-[9px] font-semibold tracking-[0.2em] text-[#00D9D9] sm:text-[11px]">NEXO</div>
      </motion.div>

      <div className="absolute bottom-[12%] left-1/2 z-30 -translate-x-1/2 text-center">
        <p className="text-[9px] uppercase tracking-[0.34em] text-white/34 sm:text-xs">conectar / interpretar / automatizar</p>
        <p className="mt-2 text-sm tracking-[-0.02em] text-white/60 sm:text-base">fragmentos aislados empiezan a comportarse como un sistema</p>
      </div>
    </motion.div>
  )
}

function WireCube({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.47, 0.55, 0.675, 0.715], [0, 0.7, 0.65, 0])
  const scale = useTransform(progress, [0.48, 0.64, 0.71], [0.55, 1, 1.6])
  const rotateX = useTransform(progress, [0.48, 0.71], [64, 118])
  const rotateY = useTransform(progress, [0.48, 0.71], [-35, 78])

  const face = "absolute inset-0 border border-[#00D9D9]/25 bg-[#00D9D9]/[0.012] shadow-[inset_0_0_30px_rgba(0,217,217,.025)]"

  return (
    <motion.div style={{ opacity, scale }} className="pointer-events-none absolute left-1/2 top-1/2 h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 [perspective:1200px]">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
        <div className={face} style={{ transform: "translateZ(17vmin)" }} />
        <div className={face} style={{ transform: "rotateY(180deg) translateZ(17vmin)" }} />
        <div className={face} style={{ transform: "rotateY(90deg) translateZ(17vmin)" }} />
        <div className={face} style={{ transform: "rotateY(-90deg) translateZ(17vmin)" }} />
        <div className={face} style={{ transform: "rotateX(90deg) translateZ(17vmin)" }} />
        <div className={face} style={{ transform: "rotateX(-90deg) translateZ(17vmin)" }} />
      </motion.div>
    </motion.div>
  )
}

function SystemScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const statementOpacity = useTransform(progress, [0.415, 0.46, 0.515, 0.555], [0, 1, 1, 0])
  const statementY = useTransform(progress, [0.415, 0.49, 0.555], [48, 0, -44])
  const secondOpacity = useTransform(progress, [0.525, 0.565, 0.67, 0.71], [0, 1, 1, 0])
  const systemScale = useTransform(progress, [0.55, 0.65, 0.71], reducedMotion ? [1, 1, 1] : [0.62, 1, 1.34])
  const tracking = useTransform(progress, [0.56, 0.665], ["-0.11em", "-0.04em"])
  const glow = useTransform(progress, [0.54, 0.63, 0.7], [0.05, 0.23, 0.08])
  const scanY = useTransform(progress, [0.545, 0.695], ["22%", "80%"])

  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      <motion.div style={{ opacity: statementOpacity, y: statementY }} className="absolute inset-0 flex items-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-[#00D9D9] sm:text-xs">problema / 001</p>
          <h2 className="max-w-[1200px] text-[clamp(3.4rem,9vw,9rem)] font-semibold uppercase leading-[0.83] tracking-[-0.07em] text-white">UNA EMPRESA<br />NO NECESITA<br />MÁS HERRAMIENTAS.</h2>
        </div>
      </motion.div>

      <motion.div style={{ opacity: secondOpacity }} className="absolute inset-0 flex items-center justify-center px-5 text-center sm:px-8">
        <WireCube progress={progress} />
        <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9] blur-[150px]" />
        <motion.div style={{ top: scanY }} className="absolute left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#00D9D9]/75 to-transparent shadow-[0_0_28px_rgba(0,217,217,.6)]" />
        <div className="relative z-20 w-full">
          <p className="mx-auto max-w-4xl text-[clamp(1.45rem,3vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white/64">Necesita que funcionen</p>
          <motion.div style={{ scale: systemScale, letterSpacing: tracking }} className="mt-2 origin-center text-[clamp(6rem,21vw,22rem)] font-semibold uppercase leading-[0.72] text-[#00D9D9] [text-shadow:0_0_70px_rgba(0,217,217,.16)]">SISTEMA</motion.div>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-[8px] uppercase tracking-[0.24em] text-white/28 sm:text-[10px]">
            <span>INPUT / DATA</span><span>LOGIC / CONTEXT</span><span>OUTPUT / ACTION</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DesignPlane({ opacity, z, rotateY, x }: { opacity: MotionValue<number>; z: MotionValue<number>; rotateY: MotionValue<number>; x: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity, z, rotateY, x }} className="absolute left-[10%] top-[16%] h-[66%] w-[80%] border border-white/12 bg-black/55 p-5 [transform-style:preserve-3d] sm:p-7">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.26em] text-white/30 sm:text-[10px]"><span>01 / DESIGN</span><span>12 COL / 1440</span></div>
      <div className="mt-5 grid h-[calc(100%-2rem)] grid-cols-12 gap-2 opacity-70">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-x border-white/[0.045]" />)}
      </div>
      <div className="absolute bottom-[17%] left-[8%] right-[8%] text-[clamp(3.5rem,10vw,9.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.085em] text-white">DISEÑO</div>
      <span className="absolute bottom-[9%] left-[8%] text-[9px] uppercase tracking-[0.27em] text-[#00D9D9]">forma / jerarquía / experiencia</span>
    </motion.div>
  )
}

function TechnologyPlane({ opacity, z, rotateY, x }: { opacity: MotionValue<number>; z: MotionValue<number>; rotateY: MotionValue<number>; x: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity, z, rotateY, x }} className="absolute left-[10%] top-[16%] h-[66%] w-[80%] border border-[#00D9D9]/25 bg-black/70 p-5 [transform-style:preserve-3d] sm:p-7">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.26em] text-white/30 sm:text-[10px]"><span>02 / TECHNOLOGY</span><span className="text-[#00D9D9]">ARCH / LIVE</span></div>
      <div className="absolute left-[7%] top-[24%] w-[34%] border border-white/10 bg-white/[0.02] p-4 font-mono text-[8px] leading-5 text-white/34 sm:text-[10px]">
        <p><span className="text-[#00D9D9]">const</span> connect = architecture(input)</p><p>await automate(workflow)</p><p>sync(crm, web, data)</p><p><span className="text-[#00D9D9]">return</span> system.output</p>
      </div>
      <div className="absolute bottom-[18%] right-[7%] grid h-[36%] w-[39%] grid-cols-2 gap-2 border border-[#00D9D9]/20 p-3">
        <div className="border border-white/10" /><div className="border border-white/10" /><div className="border border-white/10" /><div className="border border-white/10" />
      </div>
      <div className="absolute bottom-[17%] left-[8%] right-[8%] text-[clamp(3.3rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.085em] text-[#00D9D9]">TECNOLOGÍA</div>
    </motion.div>
  )
}

function AIPlane({ opacity, z, rotateY, x }: { opacity: MotionValue<number>; z: MotionValue<number>; rotateY: MotionValue<number>; x: MotionValue<number> }) {
  const aiNodes = [[18, 28], [36, 20], [55, 31], [75, 23], [28, 59], [50, 48], [72, 62], [48, 78]]
  return (
    <motion.div style={{ opacity, z, rotateY, x }} className="absolute left-[10%] top-[16%] h-[66%] w-[80%] overflow-hidden border border-white/12 bg-black/72 [transform-style:preserve-3d]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {aiNodes.slice(0, -1).map((node, index) => {
          const next = aiNodes[(index + 2) % aiNodes.length]
          return <line key={index} x1={node[0]} y1={node[1]} x2={next[0]} y2={next[1]} stroke="rgba(0,217,217,.28)" strokeWidth="0.18" vectorEffect="non-scaling-stroke" />
        })}
      </svg>
      {aiNodes.map((node, index) => (
        <motion.span key={index} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D9D9]/75 bg-black shadow-[0_0_22px_rgba(0,217,217,.45)]" style={{ left: `${node[0]}%`, top: `${node[1]}%` }} animate={{ scale: [0.7, 1.5, 0.7], opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.12 }} />
      ))}
      <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[0.26em] text-white/30 sm:text-[10px]">03 / INTELLIGENCE</div>
      <div className="absolute bottom-[12%] left-[8%] text-[clamp(7rem,23vw,22rem)] font-semibold uppercase leading-[0.68] tracking-[-0.11em] text-white">IA</div>
      <div className="absolute bottom-[9%] right-[7%] text-right text-[9px] uppercase tracking-[0.25em] text-[#00D9D9]">interpretar / decidir / evolucionar</div>
    </motion.div>
  )
}

function TriadScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const sceneOpacity = useTransform(progress, [0.665, 0.705, 0.875, 0.91], [0, 1, 1, 0])
  const cameraRotateX = useTransform(progress, [0.69, 0.87], reducedMotion ? [0, 0] : [4, -3])
  const cameraRotateY = useTransform(progress, [0.69, 0.87], reducedMotion ? [0, 0] : [-5, 4])
  const cameraScale = useTransform(progress, [0.69, 0.87], reducedMotion ? [1, 1] : [0.92, 1.04])

  const dOpacity = useTransform(progress, [0.69, 0.72, 0.79, 0.86], [0, 1, 0.88, 0.34])
  const tOpacity = useTransform(progress, [0.72, 0.755, 0.825, 0.875], [0, 1, 0.92, 0.38])
  const aOpacity = useTransform(progress, [0.755, 0.79, 0.855, 0.89], [0, 1, 1, 0.45])

  const dZ = useTransform(progress, [0.69, 0.84, 0.89], reducedMotion ? [0, 0, 0] : [-230, -130, 0])
  const tZ = useTransform(progress, [0.72, 0.84, 0.89], reducedMotion ? [0, 0, 0] : [0, 0, 0])
  const aZ = useTransform(progress, [0.755, 0.84, 0.89], reducedMotion ? [0, 0, 0] : [230, 130, 0])

  const dX = useTransform(progress, [0.69, 0.84, 0.89], reducedMotion ? [0, 0, 0] : [-70, -34, 0])
  const tX = useTransform(progress, [0.72, 0.89], reducedMotion ? [0, 0] : [28, 0])
  const aX = useTransform(progress, [0.755, 0.84, 0.89], reducedMotion ? [0, 0, 0] : [82, 38, 0])

  const dRot = useTransform(progress, [0.69, 0.89], reducedMotion ? [0, 0] : [12, 0])
  const tRot = useTransform(progress, [0.72, 0.89], reducedMotion ? [0, 0] : [-8, 0])
  const aRot = useTransform(progress, [0.755, 0.89], reducedMotion ? [0, 0] : [14, 0])

  const convergeOpacity = useTransform(progress, [0.845, 0.885, 0.905], [0, 1, 0])
  const convergeScale = useTransform(progress, [0.845, 0.89, 0.905], [0.72, 1, 1.12])

  return (
    <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0 z-30 overflow-hidden [perspective:1400px]">
      <motion.div style={{ rotateX: cameraRotateX, rotateY: cameraRotateY, scale: cameraScale, transformStyle: "preserve-3d" }} className="absolute inset-0">
        <DesignPlane opacity={dOpacity} z={dZ} rotateY={dRot} x={dX} />
        <TechnologyPlane opacity={tOpacity} z={tZ} rotateY={tRot} x={tX} />
        <AIPlane opacity={aOpacity} z={aZ} rotateY={aRot} x={aX} />
      </motion.div>

      <motion.div style={{ opacity: convergeOpacity, scale: convergeScale }} className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-black/55 px-5 text-center backdrop-blur-[10px]">
        <div>
          <p className="text-[9px] uppercase tracking-[0.34em] text-white/34 sm:text-xs">tres capas / una capacidad</p>
          <p className="mt-4 text-[clamp(4.5rem,13vw,13rem)] font-semibold uppercase leading-[0.76] tracking-[-0.09em] text-white">DISEÑO <span className="text-[#00D9D9]">+</span><br />TECNOLOGÍA <span className="text-[#00D9D9]">+</span> IA</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ResolutionScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.885, 0.92, 0.995, 1], [0, 1, 1, 1])
  const y = useTransform(progress, [0.885, 0.945], [56, 0])
  const lineScale = useTransform(progress, [0.91, 0.975], [0, 1])
  const wordX = useTransform(progress, [0.91, 0.975], [-46, 0])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-40 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <p className="text-xs font-semibold tracking-[0.5em] text-[#00D9D9] sm:text-sm">NEXODG</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-semibold uppercase leading-[0.81] tracking-[-0.075em] text-white">CONSTRUIMOS<br /><motion.span style={{ x: wordX }} className="inline-block text-[#00D9D9]">SOLUCIONES.</motion.span></h2>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.08] tracking-[-0.04em] text-white/76">No presentamos disciplinas aisladas.</p>
            <p className="mt-5 text-sm leading-7 text-white/44 sm:text-base">Diseñamos cómo se ve, cómo funciona, cómo se conecta, cómo decide y cómo evoluciona.</p>
          </div>
        </div>
        <motion.div style={{ scaleX: lineScale, transformOrigin: "0% 50%" }} className="mt-10 h-px w-full bg-[#00D9D9]" />
      </div>
    </motion.div>
  )
}

function CapabilityCard({ number, title, body, tags }: { number: string; title: string; body: string; tags: string[] }) {
  return (
    <article className="group relative min-h-[360px] overflow-hidden border-white/10 p-7 sm:p-9 lg:border-r last:lg:border-r-0">
      <div className="absolute inset-0 translate-y-full bg-[#00D9D9] transition-transform duration-500 ease-out group-hover:translate-y-0" />
      <div className="relative z-10 flex h-full flex-col transition-colors duration-500 group-hover:text-black">
        <div className="flex items-center justify-between text-[10px] tracking-[0.28em] text-white/28 transition-colors group-hover:text-black/45"><span>{number}</span><span className="h-1.5 w-1.5 rounded-full bg-[#00D9D9] transition-colors group-hover:bg-black" /></div>
        <div className="mt-auto pt-24">
          <h3 className="text-3xl font-medium tracking-[-0.045em] text-white transition-colors group-hover:text-black sm:text-4xl">{title}</h3>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/44 transition-colors group-hover:text-black/65 sm:text-base">{body}</p>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.22em] text-white/30 transition-colors group-hover:text-black/45">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </article>
  )
}

export default function NexoNarrativeV2() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: reducedMotion ? 220 : 82, damping: reducedMotion ? 40 : 25, mass: reducedMotion ? 0.18 : 0.58 })

  const particleOpacity = useTransform(progress, [0, 0.1, 0.56, 0.86, 1], [0.18, 0.68, 0.22, 0.44, 0.14])
  const progressScale = useTransform(progress, [0, 1], [0, 1])
  const orbX = useTransform(cursorX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-70, 70])
  const orbY = useTransform(cursorY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-50, 50])
  const orbScale = useTransform(progress, [0, 0.45, 0.68, 1], [0.8, 1.15, 0.7, 1.05])
  const orbOpacity = useTransform(progress, [0, 0.28, 0.62, 0.85, 1], [0.15, 0.34, 0.18, 0.3, 0.1])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    cursorX.set((event.clientX - rect.left) / rect.width - 0.5)
    cursorY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white selection:bg-[#00D9D9] selection:text-black">
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-7 sm:pt-6">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.28em] text-white/48 backdrop-blur-[3px]">
          <Link href="/" className="font-semibold text-white transition-colors hover:text-[#00D9D9]">NEXODG</Link>
          <span className="hidden sm:block">Diseño + Tecnología + IA</span>
          <Link href="/#contacto" className="inline-flex items-center gap-2 transition-colors hover:text-[#00D9D9]">Hablemos <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
      </header>

      <section ref={stageRef} onPointerMove={handlePointerMove} className="relative h-[940vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <GridField progress={progress} />
          <ParticleField opacity={particleOpacity} />

          <motion.div style={{ x: orbX, y: orbY, scale: orbScale, opacity: orbOpacity }} className="pointer-events-none absolute left-1/2 top-1/2 h-[56vw] max-h-[820px] w-[56vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9]/12 blur-[145px]" />

          <div className="pointer-events-none absolute left-5 top-24 z-50 hidden text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>NX / DIGITAL SYSTEMS</p><p className="mt-1">BUILD 2026.10 / V02</p></div>
          <div className="pointer-events-none absolute right-5 top-24 z-50 hidden text-right text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>INPUT / SCROLL + POINTER</p><p className="mt-1 text-[#00D9D9]">STATUS / ACTIVE</p></div>

          <IntroScene progress={progress} reducedMotion={reducedMotion} />
          <NetworkScene progress={progress} reducedMotion={reducedMotion} />
          <SystemScene progress={progress} reducedMotion={reducedMotion} />
          <TriadScene progress={progress} reducedMotion={reducedMotion} />
          <ResolutionScene progress={progress} />

          <div className="absolute bottom-5 left-5 right-5 z-[70] sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[1500px] items-end gap-5">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/24"><span>Narrative timeline</span><span>01 — 05 / spatial pass</span></div>
                <div className="h-px overflow-hidden bg-white/10"><motion.div style={{ scaleX: progressScale, transformOrigin: "0% 50%" }} className="h-full w-full bg-[#00D9D9]" /></div>
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/24 sm:block">black / white / #00D9D9</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#050505] px-5 py-28 sm:px-8 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">Después del manifiesto</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/34">La narrativa se convierte en capacidades concretas sin abandonar el sistema visual.</p>
            </div>
            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">Hacemos que diseño, tecnología e IA funcionen como una sola capacidad.</h2>
          </div>

          <div className="mt-20 grid border-y border-white/10 lg:grid-cols-3">
            <CapabilityCard number="01" title="Experiencias digitales" body="Webs, productos y sistemas donde la dirección de arte también define cómo se usa, se entiende y se recuerda." tags={["web", "product", "motion", "3D"]} />
            <CapabilityCard number="02" title="Sistemas conectados" body="CRM, datos, WhatsApp, automatizaciones y operaciones integradas para que la empresa deje de trabajar por fragmentos." tags={["crm", "data", "automation", "ops"]} />
            <CapabilityCard number="03" title="IA aplicada" body="Agentes, interpretación y decisión diseñados alrededor del contexto real de cada empresa, no como una capa genérica." tags={["agents", "context", "decision", "AI"]} />
          </div>

          <div className="mt-24 grid gap-12 border-t border-white/10 pt-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div><p className="text-[10px] uppercase tracking-[0.32em] text-white/28">NEXODG / 2026</p><p className="mt-3 text-[clamp(2.8rem,5vw,5.6rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white">Construimos lo que sigue.</p></div>
            <div className="lg:justify-self-end"><p className="max-w-xl text-base leading-7 text-white/44">Diseñamos la experiencia, construimos la tecnología y aplicamos IA donde produce una diferencia real.</p><Link href="/#contacto" className="mt-7 inline-flex w-fit items-center gap-3 border border-[#00D9D9]/35 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#00D9D9] hover:text-black">Empezar un proyecto <ArrowUpRight className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}
