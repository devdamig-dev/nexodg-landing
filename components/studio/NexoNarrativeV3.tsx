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
import { ArrowUpRight } from "lucide-react"

const nodes = [
  { label: "WHATSAPP", x: 17, y: 29 },
  { label: "DATOS", x: 79, y: 22 },
  { label: "CRM", x: 87, y: 54 },
  { label: "IA", x: 67, y: 77 },
  { label: "WEB", x: 22, y: 74 },
  { label: "PERSONAS", x: 10, y: 52 },
  { label: "AUTOMATIZACIONES", x: 49, y: 13 },
]

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [6, 1],
  [6, 3], [0, 4], [1, 3], [2, 4], [3, 5], [1, 5],
]

const particles = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 37) % 97}%`,
  top: `${(index * 61) % 91}%`,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: (index % 9) * 0.17,
}))

function GridField({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.28, 0.62, 0.9, 1], [0.12, 0.18, 0.07, 0.14, 0.06])
  const scale = useTransform(progress, [0, 0.62, 1], [1, 1.14, 1.04])
  return (
    <>
      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none absolute -inset-[12%] [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(0,0,0,.18)_41%,rgba(0,0,0,.96)_100%)]" />
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
          animate={{ opacity: [0.08, 0.82, 0.08], scale: [0.7, 1.55, 0.7] }}
          transition={{ duration: 3.8 + (index % 4) * 0.4, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  )
}

function NetworkNode({ progress, label, x, y, index }: { progress: MotionValue<number>; label: string; x: number; y: number; index: number }) {
  const revealAt = 0.035 + index * 0.008
  const opacity = useTransform(progress, [0.015, revealAt, 0.245, 0.3], [0, 1, 1, 0])
  const left = useTransform(progress, [0.23, 0.3], [`${x}%`, "50%"])
  const top = useTransform(progress, [0.23, 0.3], [`${y}%`, "50%"])
  const scale = useTransform(progress, [0.015, revealAt, 0.245, 0.3], [0.78, 1, 1, 0.25])
  const blur = useTransform(progress, [0.255, 0.3], ["blur(0px)", "blur(9px)"])

  return (
    <motion.div style={{ left, top, opacity, scale, filter: blur }} className="absolute z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative whitespace-nowrap border border-white/18 bg-black/70 px-3 py-2 text-[9px] font-medium tracking-[0.22em] text-white/78 backdrop-blur-md sm:text-xs">
        <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#00D9D9]" />
        {label}
      </div>
    </motion.div>
  )
}

function NetworkScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const opacity = useTransform(progress, [0.005, 0.025, 0.27, 0.315], [0, 1, 1, 0])
  const lineProgress = useTransform(progress, [0.025, 0.12, 0.255, 0.305], [0, 1, 1, 0])
  const cameraScale = useTransform(progress, [0.01, 0.19, 0.305], reducedMotion ? [1, 1, 1] : [0.93, 1, 1.2])
  const cameraRotate = useTransform(progress, [0.02, 0.295], reducedMotion ? [0, 0] : [-1.2, 1.2])
  const hubOpacity = useTransform(progress, [0.02, 0.075, 0.27, 0.305], [0, 1, 1, 0])
  const hubScale = useTransform(progress, [0.02, 0.11, 0.25, 0.31], [0.5, 1, 1.12, 3.8])
  const ringRotate = useTransform(progress, [0.03, 0.3], [0, 165])
  const innerRotate = useTransform(ringRotate, (value) => -value * 1.25)

  return (
    <motion.div style={{ opacity, scale: cameraScale, rotate: cameraRotate }} className="absolute inset-0 [perspective:1100px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map(([a, b], index) => (
          <motion.line
            key={`edge-${index}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(0,217,217,.34)"
            strokeWidth="0.11"
            vectorEffect="non-scaling-stroke"
            pathLength={lineProgress}
          />
        ))}
        {nodes.map((node) => (
          <motion.line
            key={`spoke-${node.label}`}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(0,217,217,.52)"
            strokeWidth="0.13"
            vectorEffect="non-scaling-stroke"
            pathLength={lineProgress}
          />
        ))}
        <motion.circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="0.12" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
        <motion.circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,217,217,.12)" strokeWidth="0.12" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
        {!reducedMotion && edges.slice(0, 6).map(([a, b], index) => (
          <circle key={`packet-${index}`} r="0.32" fill="#00D9D9" opacity="0.8">
            <animate attributeName="cx" values={`${nodes[a].x};${nodes[b].x};${nodes[a].x}`} dur={`${3.1 + index * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${nodes[a].y};${nodes[b].y};${nodes[a].y}`} dur={`${3.1 + index * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {nodes.map((node, index) => <NetworkNode key={node.label} progress={progress} index={index} {...node} />)}

      <motion.div style={{ opacity: hubOpacity, scale: hubScale }} className="absolute left-1/2 top-1/2 z-30 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-36 sm:w-36">
        <motion.div style={{ rotate: ringRotate }} className="absolute inset-0 rounded-full border border-[#00D9D9]/48 shadow-[0_0_100px_rgba(0,217,217,.22)]" />
        <motion.div style={{ rotate: innerRotate, rotateX: 62 }} className="absolute inset-[14%] rounded-full border border-white/22" />
        <div className="absolute inset-[30%] grid place-items-center rounded-full border border-white/18 bg-black text-[9px] font-semibold tracking-[0.2em] text-[#00D9D9] sm:text-[11px]">NEXO</div>
      </motion.div>

      <motion.div style={{ opacity: useTransform(progress, [0.055, 0.1, 0.245, 0.29], [0, 1, 1, 0]) }} className="absolute bottom-[11%] left-1/2 z-30 w-[86%] -translate-x-1/2 text-center">
        <p className="text-[9px] uppercase tracking-[0.34em] text-white/38 sm:text-xs">conectar / interpretar / automatizar</p>
        <p className="mt-2 text-sm tracking-[-0.02em] text-white/64 sm:text-base">fragmentos aislados empiezan a comportarse como un sistema</p>
      </motion.div>
    </motion.div>
  )
}

function WireCube({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.43, 0.49, 0.61, 0.66], [0, 0.72, 0.66, 0])
  const scale = useTransform(progress, [0.43, 0.57, 0.66], [0.55, 1, 1.55])
  const rotateX = useTransform(progress, [0.43, 0.66], [64, 112])
  const rotateY = useTransform(progress, [0.43, 0.66], [-35, 74])
  const face = "absolute inset-0 border border-[#00D9D9]/28 bg-[#00D9D9]/[0.012] shadow-[inset_0_0_30px_rgba(0,217,217,.03)]"

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
  const statementOpacity = useTransform(progress, [0.285, 0.325, 0.43, 0.475], [0, 1, 1, 0])
  const statementY = useTransform(progress, [0.285, 0.35, 0.475], [46, 0, -38])
  const systemOpacity = useTransform(progress, [0.445, 0.49, 0.615, 0.66], [0, 1, 1, 0])
  const systemScale = useTransform(progress, [0.46, 0.575, 0.655], reducedMotion ? [1, 1, 1] : [0.68, 1, 1.18])
  const tracking = useTransform(progress, [0.48, 0.61], ["-0.11em", "-0.055em"])
  const glow = useTransform(progress, [0.46, 0.56, 0.64], [0.04, 0.2, 0.08])
  const scanY = useTransform(progress, [0.48, 0.63], ["22%", "80%"])

  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      <motion.div style={{ opacity: statementOpacity, y: statementY }} className="absolute inset-0 flex items-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-[#00D9D9] sm:text-xs">problema / 001</p>
          <h2 className="max-w-[1200px] text-[clamp(3.4rem,9vw,9rem)] font-semibold uppercase leading-[0.83] tracking-[-0.07em] text-white">UNA EMPRESA<br />NO NECESITA<br />MÁS HERRAMIENTAS.</h2>
        </div>
      </motion.div>

      <motion.div style={{ opacity: systemOpacity }} className="absolute inset-0 flex items-center justify-center px-5 text-center sm:px-8">
        <WireCube progress={progress} />
        <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9] blur-[150px]" />
        <motion.div style={{ top: scanY }} className="absolute left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#00D9D9]/75 to-transparent shadow-[0_0_28px_rgba(0,217,217,.6)]" />
        <div className="relative z-20 w-full">
          <p className="mx-auto max-w-4xl text-[clamp(1.45rem,3vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white/68">Necesita que funcionen</p>
          <motion.div style={{ scale: systemScale, letterSpacing: tracking }} className="mt-2 origin-center text-[clamp(6rem,21vw,22rem)] font-semibold uppercase leading-[0.72] text-[#00D9D9] [text-shadow:0_0_70px_rgba(0,217,217,.16)]">SISTEMA</motion.div>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-[8px] uppercase tracking-[0.24em] text-white/30 sm:text-[10px]"><span>INPUT / DATA</span><span>LOGIC / CONTEXT</span><span>OUTPUT / ACTION</span></div>
        </div>
      </motion.div>
    </div>
  )
}

function DesignPlane({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute left-[9%] top-[14%] h-[70%] w-[82%] border border-white/12 bg-black/68 p-5 sm:p-7">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.26em] text-white/32 sm:text-[10px]"><span>01 / DESIGN</span><span>12 COL / 1440</span></div>
      <div className="mt-5 grid h-[calc(100%-2rem)] grid-cols-12 gap-2 opacity-70">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-x border-white/[0.05]" />)}</div>
      <div className="absolute bottom-[17%] left-[8%] right-[8%] text-[clamp(3.5rem,10vw,9.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.085em] text-white">DISEÑO</div>
      <span className="absolute bottom-[9%] left-[8%] text-[9px] uppercase tracking-[0.27em] text-[#00D9D9]">forma / jerarquía / experiencia</span>
    </motion.div>
  )
}

function TechnologyPlane({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute left-[9%] top-[14%] h-[70%] w-[82%] border border-[#00D9D9]/26 bg-black/74 p-5 sm:p-7">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.26em] text-white/32 sm:text-[10px]"><span>02 / TECHNOLOGY</span><span className="text-[#00D9D9]">ARCH / LIVE</span></div>
      <div className="absolute left-[7%] top-[24%] w-[37%] border border-white/10 bg-white/[0.02] p-4 font-mono text-[8px] leading-5 text-white/36 sm:text-[10px]"><p><span className="text-[#00D9D9]">const</span> connect = architecture(input)</p><p>await automate(workflow)</p><p>sync(crm, web, data)</p><p><span className="text-[#00D9D9]">return</span> system.output</p></div>
      <div className="absolute bottom-[18%] right-[7%] grid h-[36%] w-[39%] grid-cols-2 gap-2 border border-[#00D9D9]/22 p-3"><div className="border border-white/10" /><div className="border border-white/10" /><div className="border border-white/10" /><div className="border border-white/10" /></div>
      <div className="absolute bottom-[17%] left-[8%] right-[8%] text-[clamp(3.3rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.085em] text-[#00D9D9]">TECNOLOGÍA</div>
    </motion.div>
  )
}

function AIPlane({ opacity }: { opacity: MotionValue<number> }) {
  const aiNodes = [[18, 28], [36, 20], [55, 31], [75, 23], [28, 59], [50, 48], [72, 62], [48, 78]]
  return (
    <motion.div style={{ opacity }} className="absolute left-[9%] top-[14%] h-[70%] w-[82%] overflow-hidden border border-white/12 bg-black/74">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {aiNodes.slice(0, -1).map((node, index) => { const next = aiNodes[(index + 2) % aiNodes.length]; return <line key={index} x1={node[0]} y1={node[1]} x2={next[0]} y2={next[1]} stroke="rgba(0,217,217,.3)" strokeWidth="0.18" vectorEffect="non-scaling-stroke" /> })}
      </svg>
      {aiNodes.map((node, index) => <motion.span key={index} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D9D9]/75 bg-black shadow-[0_0_22px_rgba(0,217,217,.45)]" style={{ left: `${node[0]}%`, top: `${node[1]}%` }} animate={{ scale: [0.75, 1.45, 0.75], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.14 }} />)}
      <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[0.26em] text-white/32 sm:text-[10px]">03 / INTELLIGENCE</div>
      <div className="absolute bottom-[12%] left-[8%] text-[clamp(7rem,23vw,22rem)] font-semibold uppercase leading-[0.68] tracking-[-0.11em] text-white">IA</div>
      <div className="absolute bottom-[9%] right-[7%] text-right text-[9px] uppercase tracking-[0.25em] text-[#00D9D9]">interpretar / decidir / evolucionar</div>
    </motion.div>
  )
}

function TriadScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const sceneOpacity = useTransform(progress, [0.625, 0.655, 0.91, 0.94], [0, 1, 1, 0])
  const cameraScale = useTransform(progress, [0.64, 0.91], reducedMotion ? [1, 1] : [0.96, 1.035])
  const designOpacity = useTransform(progress, [0.645, 0.67, 0.725, 0.755], [0, 1, 1, 0])
  const techOpacity = useTransform(progress, [0.735, 0.765, 0.82, 0.85], [0, 1, 1, 0])
  const aiOpacity = useTransform(progress, [0.83, 0.855, 0.895, 0.918], [0, 1, 1, 0])
  const convergeOpacity = useTransform(progress, [0.895, 0.92, 0.94], [0, 1, 0])
  const convergeScale = useTransform(progress, [0.895, 0.92, 0.94], [0.82, 1, 1.08])

  return (
    <motion.div style={{ opacity: sceneOpacity, scale: cameraScale }} className="absolute inset-0 z-30 overflow-hidden [perspective:1400px]">
      <DesignPlane opacity={designOpacity} />
      <TechnologyPlane opacity={techOpacity} />
      <AIPlane opacity={aiOpacity} />
      <motion.div style={{ opacity: convergeOpacity, scale: convergeScale }} className="absolute inset-0 z-40 flex items-center justify-center bg-black/92 px-5 text-center backdrop-blur-[8px]">
        <div>
          <p className="text-[9px] uppercase tracking-[0.34em] text-white/38 sm:text-xs">tres capas / una capacidad</p>
          <p className="mt-4 text-[clamp(4.2rem,12vw,12rem)] font-semibold uppercase leading-[0.78] tracking-[-0.085em] text-white">DISEÑO <span className="text-[#00D9D9]">+</span><br />TECNOLOGÍA <span className="text-[#00D9D9]">+</span> IA</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ResolutionScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.925, 0.95, 1], [0, 1, 1])
  const y = useTransform(progress, [0.925, 0.97], [52, 0])
  const lineScale = useTransform(progress, [0.945, 0.99], [0, 1])
  const wordX = useTransform(progress, [0.94, 0.99], [-42, 0])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-40 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <p className="text-xs font-semibold tracking-[0.5em] text-[#00D9D9] sm:text-sm">NEXODG</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-semibold uppercase leading-[0.81] tracking-[-0.075em] text-white">CONSTRUIMOS<br /><motion.span style={{ x: wordX }} className="inline-block text-[#00D9D9]">SOLUCIONES.</motion.span></h2>
          <div className="max-w-xl lg:justify-self-end"><p className="text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.08] tracking-[-0.04em] text-white/76">No presentamos disciplinas aisladas.</p><p className="mt-5 text-sm leading-7 text-white/44 sm:text-base">Diseñamos cómo se ve, cómo funciona, cómo se conecta, cómo decide y cómo evoluciona.</p></div>
        </div>
        <motion.div style={{ scaleX: lineScale, transformOrigin: "0% 50%" }} className="mt-10 h-px w-full bg-[#00D9D9]" />
      </div>
    </motion.div>
  )
}

export default function NexoNarrativeV3() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: reducedMotion ? 220 : 70, damping: reducedMotion ? 40 : 28, mass: reducedMotion ? 0.18 : 0.64 })
  const particleOpacity = useTransform(progress, [0, 0.25, 0.62, 0.9, 1], [0.2, 0.72, 0.24, 0.4, 0.14])
  const progressScale = useTransform(progress, [0, 1], [0, 1])
  const orbX = useTransform(cursorX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-64, 64])
  const orbY = useTransform(cursorY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-46, 46])
  const orbOpacity = useTransform(progress, [0, 0.28, 0.62, 0.9, 1], [0.16, 0.34, 0.16, 0.28, 0.1])

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

      <section ref={stageRef} onPointerMove={handlePointerMove} className="relative h-[1320vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <GridField progress={progress} />
          <ParticleField opacity={particleOpacity} />
          <motion.div style={{ x: orbX, y: orbY, opacity: orbOpacity }} className="pointer-events-none absolute left-1/2 top-1/2 h-[56vw] max-h-[820px] w-[56vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9]/12 blur-[145px]" />

          <div className="pointer-events-none absolute left-5 top-24 z-50 hidden text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>NX / DIGITAL SYSTEMS</p><p className="mt-1">BUILD 2026.10 / V03</p></div>
          <div className="pointer-events-none absolute right-5 top-24 z-50 hidden text-right text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>INPUT / SCROLL + POINTER</p><p className="mt-1 text-[#00D9D9]">STATUS / ACTIVE</p></div>

          <NetworkScene progress={progress} reducedMotion={reducedMotion} />
          <SystemScene progress={progress} reducedMotion={reducedMotion} />
          <TriadScene progress={progress} reducedMotion={reducedMotion} />
          <ResolutionScene progress={progress} />

          <div className="absolute bottom-5 left-5 right-5 z-[70] sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[1500px] items-end gap-5">
              <div className="flex-1"><div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/24"><span>Narrative timeline</span><span>01 — 05 / QA pass 003</span></div><div className="h-px overflow-hidden bg-white/10"><motion.div style={{ scaleX: progressScale, transformOrigin: "0% 50%" }} className="h-full w-full bg-[#00D9D9]" /></div></div>
              <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/24 sm:block">black / white / #00D9D9</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#050505] px-5 py-28 sm:px-8 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div><p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">Después del manifiesto</p><p className="mt-4 max-w-xs text-sm leading-6 text-white/34">La narrativa se convierte en capacidades concretas sin abandonar el sistema visual.</p></div>
            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">Hacemos que diseño, tecnología e IA funcionen como una sola capacidad.</h2>
          </div>
          <div className="mt-20 grid border-y border-white/10 lg:grid-cols-3">
            {[
              ["01", "Experiencias digitales", "Webs, productos y sistemas donde la dirección de arte también define cómo se usa, se entiende y se recuerda."],
              ["02", "Sistemas conectados", "CRM, datos, WhatsApp, automatizaciones y operaciones integradas para que la empresa deje de trabajar por fragmentos."],
              ["03", "IA aplicada", "Agentes, interpretación y decisión diseñados alrededor del contexto real de cada empresa, no como una capa genérica."],
            ].map(([number, title, body], index) => (
              <article key={number} className={`min-h-[360px] p-7 sm:p-9 ${index < 2 ? "border-b border-white/10 lg:border-b-0 lg:border-r" : ""}`}><p className="text-[10px] tracking-[0.28em] text-[#00D9D9]">{number}</p><h3 className="mt-24 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">{title}</h3><p className="mt-5 max-w-md text-sm leading-7 text-white/44 sm:text-base">{body}</p></article>
            ))}
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
