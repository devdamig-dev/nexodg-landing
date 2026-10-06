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
  [6, 3], [0, 4], [1, 3], [2, 4], [3, 5], [1, 5], [0, 3], [2, 5],
]

const particles = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 37) % 97}%`,
  top: `${(index * 61) % 91}%`,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: (index % 9) * 0.17,
}))

function GridField({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.25, 0.5, 0.82, 1], [0.12, 0.18, 0.08, 0.15, 0.07])
  const scale = useTransform(progress, [0, 0.52, 1], [1, 1.12, 1.03])
  return (
    <>
      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none absolute -inset-[12%] [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(0,0,0,.16)_42%,rgba(0,0,0,.96)_100%)]" />
    </>
  )
}

function ParticleField({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#00D9D9] shadow-[0_0_15px_rgba(0,217,217,.7)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ opacity: [0.08, 0.82, 0.08], scale: [0.7, 1.55, 0.7] }}
          transition={{ duration: 3.8 + (index % 4) * 0.4, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  )
}

function NetworkNode({ progress, label, x, y, index }: { progress: MotionValue<number>; label: string; x: number; y: number; index: number }) {
  const revealAt = 0.025 + index * 0.006
  const opacity = useTransform(progress, [0.008, revealAt, 0.155, 0.205], [0, 1, 1, 0])
  const left = useTransform(progress, [0.165, 0.21], [`${x}%`, "50%"])
  const top = useTransform(progress, [0.165, 0.21], [`${y}%`, "50%"])
  const scale = useTransform(progress, [0.008, revealAt, 0.165, 0.21], [0.78, 1, 1, 0.24])
  const blur = useTransform(progress, [0.18, 0.21], ["blur(0px)", "blur(9px)"])

  return (
    <motion.div style={{ left, top, opacity, scale, filter: blur }} className="absolute z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative whitespace-nowrap border border-white/22 bg-black/72 px-3 py-2 text-[9px] font-medium tracking-[0.22em] text-white/82 backdrop-blur-md sm:text-xs">
        <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#00D9D9]" />
        <span className="absolute -left-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#00D9D9] shadow-[0_0_16px_rgba(0,217,217,.8)]" />
        {label}
      </div>
    </motion.div>
  )
}

function NetworkScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const opacity = useTransform(progress, [0.002, 0.02, 0.18, 0.218], [0, 1, 1, 0])
  const lineProgress = useTransform(progress, [0.018, 0.075, 0.17, 0.21], [0, 1, 1, 0])
  const cameraScale = useTransform(progress, [0.005, 0.13, 0.21], reducedMotion ? [1, 1, 1] : [0.94, 1, 1.16])
  const cameraRotate = useTransform(progress, [0.01, 0.205], reducedMotion ? [0, 0] : [-0.9, 0.9])
  const hubOpacity = useTransform(progress, [0.012, 0.05, 0.185, 0.212], [0, 1, 1, 0])
  const hubScale = useTransform(progress, [0.012, 0.075, 0.175, 0.216], [0.5, 1, 1.1, 3.4])
  const ringRotate = useTransform(progress, [0.02, 0.21], [0, 150])
  const innerRotate = useTransform(ringRotate, (value) => -value * 1.25)
  const copyOpacity = useTransform(progress, [0.04, 0.07, 0.165, 0.2], [0, 1, 1, 0])

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
            stroke="rgba(0,217,217,.52)"
            strokeWidth="0.15"
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
            stroke="rgba(0,217,217,.72)"
            strokeWidth="0.17"
            vectorEffect="non-scaling-stroke"
            pathLength={lineProgress}
          />
        ))}
        <motion.circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="0.13" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
        <motion.circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,217,217,.2)" strokeWidth="0.13" pathLength={lineProgress} vectorEffect="non-scaling-stroke" />
        {!reducedMotion && edges.slice(0, 8).map(([a, b], index) => (
          <circle key={`packet-${index}`} r="0.38" fill="#00D9D9" opacity="0.95">
            <animate attributeName="cx" values={`${nodes[a].x};${nodes[b].x};${nodes[a].x}`} dur={`${2.8 + index * 0.28}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${nodes[a].y};${nodes[b].y};${nodes[a].y}`} dur={`${2.8 + index * 0.28}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {nodes.map((node, index) => <NetworkNode key={node.label} progress={progress} index={index} {...node} />)}

      <motion.div style={{ opacity: hubOpacity, scale: hubScale }} className="absolute left-1/2 top-1/2 z-30 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-36 sm:w-36">
        <motion.div style={{ rotate: ringRotate }} className="absolute inset-0 rounded-full border border-[#00D9D9]/60 shadow-[0_0_110px_rgba(0,217,217,.26)]" />
        <motion.div style={{ rotate: innerRotate, rotateX: 62 }} className="absolute inset-[14%] rounded-full border border-white/26" />
        <div className="absolute inset-[30%] grid place-items-center rounded-full border border-white/20 bg-black text-[9px] font-semibold tracking-[0.2em] text-[#00D9D9] sm:text-[11px]">NEXO</div>
      </motion.div>

      <motion.div style={{ opacity: copyOpacity }} className="absolute bottom-[11%] left-1/2 z-30 w-[86%] -translate-x-1/2 text-center">
        <p className="text-[9px] uppercase tracking-[0.34em] text-white/42 sm:text-xs">conectar / interpretar / automatizar</p>
        <p className="mt-2 text-sm tracking-[-0.02em] text-white/68 sm:text-base">fragmentos aislados empiezan a comportarse como un sistema</p>
      </motion.div>
    </motion.div>
  )
}

function WireCube({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.34, 0.385, 0.47, 0.505], [0, 0.72, 0.66, 0])
  const scale = useTransform(progress, [0.34, 0.435, 0.505], [0.55, 1, 1.45])
  const rotateX = useTransform(progress, [0.34, 0.505], [64, 108])
  const rotateY = useTransform(progress, [0.34, 0.505], [-35, 68])
  const face = "absolute inset-0 border border-[#00D9D9]/30 bg-[#00D9D9]/[0.012] shadow-[inset_0_0_30px_rgba(0,217,217,.035)]"

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
  const statementOpacity = useTransform(progress, [0.19, 0.225, 0.315, 0.35], [0, 1, 1, 0])
  const statementY = useTransform(progress, [0.19, 0.245, 0.35], [44, 0, -34])
  const systemOpacity = useTransform(progress, [0.325, 0.365, 0.475, 0.51], [0, 1, 1, 0])
  const systemScale = useTransform(progress, [0.34, 0.43, 0.505], reducedMotion ? [1, 1, 1] : [0.7, 1, 1.13])
  const tracking = useTransform(progress, [0.365, 0.47], ["-0.11em", "-0.055em"])
  const glow = useTransform(progress, [0.34, 0.42, 0.495], [0.04, 0.2, 0.08])
  const scanY = useTransform(progress, [0.355, 0.49], ["22%", "80%"])

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

function DesignScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.495, 0.525, 0.595, 0.62], [0, 1, 1, 0])
  const wordY = useTransform(progress, [0.5, 0.545], [42, 0])
  const gridScale = useTransform(progress, [0.515, 0.615], [0.94, 1.04])
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-30 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px] border border-white/14 bg-black/55 p-5 sm:p-8">
        <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.3em] text-white/34 sm:text-[10px]"><span>01 / DISEÑO</span><span>GRID / TYPE / MOTION</span></div>
        <motion.div style={{ scale: gridScale }} className="relative mt-6 h-[58vh] overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-65">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-x border-white/[0.055]" />)}</div>
          <div className="absolute left-[4%] top-[14%] h-[22%] w-[28%] border border-[#00D9D9]/24" />
          <div className="absolute right-[6%] top-[22%] h-[36%] w-[24%] border border-white/12" />
          <motion.p style={{ y: wordY }} className="absolute bottom-[8%] left-[3%] text-[clamp(5rem,14vw,14rem)] font-semibold uppercase leading-[0.72] tracking-[-0.09em] text-white">DISEÑO</motion.p>
          <p className="absolute bottom-[4%] right-[3%] text-[9px] uppercase tracking-[0.27em] text-[#00D9D9]">forma / jerarquía / experiencia</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function TechnologyScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.605, 0.635, 0.705, 0.73], [0, 1, 1, 0])
  const wordX = useTransform(progress, [0.61, 0.655], [56, 0])
  const panelX = useTransform(progress, [0.62, 0.69], [-24, 0])
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-30 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px] border border-[#00D9D9]/28 bg-black/62 p-5 sm:p-8">
        <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.3em] text-white/34 sm:text-[10px]"><span>02 / TECNOLOGÍA</span><span className="text-[#00D9D9]">ARCHITECTURE / LIVE</span></div>
        <div className="relative mt-6 h-[58vh] overflow-hidden border-t border-[#00D9D9]/16">
          <motion.div style={{ x: panelX }} className="absolute left-[4%] top-[14%] w-[34%] border border-white/12 bg-white/[0.018] p-4 font-mono text-[9px] leading-6 text-white/42 sm:text-[11px]">
            <p><span className="text-[#00D9D9]">const</span> connect = architecture(input)</p>
            <p>await automate(workflow)</p>
            <p>sync(crm, web, data)</p>
            <p><span className="text-[#00D9D9]">return</span> system.output</p>
          </motion.div>
          <div className="absolute right-[5%] top-[14%] grid h-[42%] w-[34%] grid-cols-2 gap-2 border border-[#00D9D9]/22 p-3">
            <div className="border border-white/12" /><div className="border border-white/12" /><div className="border border-white/12" /><div className="border border-white/12" />
          </div>
          <motion.p style={{ x: wordX }} className="absolute bottom-[8%] left-[3%] text-[clamp(4.3rem,10vw,10.5rem)] font-semibold uppercase leading-[0.75] tracking-[-0.085em] text-[#00D9D9]">TECNOLOGÍA</motion.p>
          <p className="absolute bottom-[4%] right-[3%] text-[9px] uppercase tracking-[0.27em] text-white/42">interfaces / arquitectura / integración</p>
        </div>
      </div>
    </motion.div>
  )
}

function AIScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const opacity = useTransform(progress, [0.715, 0.745, 0.815, 0.84], [0, 1, 1, 0])
  const aiScale = useTransform(progress, [0.72, 0.77, 0.835], reducedMotion ? [1, 1, 1] : [0.78, 1, 1.08])
  const aiNodes = [[18, 26], [35, 18], [54, 31], [76, 23], [27, 60], [51, 49], [74, 64], [48, 78], [87, 48], [13, 46]]
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-30 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px] border border-white/14 bg-black/62 p-5 sm:p-8">
        <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.3em] text-white/34 sm:text-[10px]"><span>03 / IA</span><span className="text-[#00D9D9]">INTERPRET / DECIDE / EVOLVE</span></div>
        <div className="relative mt-6 h-[58vh] overflow-hidden border-t border-white/10">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {aiNodes.map((node, index) => {
              const next = aiNodes[(index + 3) % aiNodes.length]
              return <line key={index} x1={node[0]} y1={node[1]} x2={next[0]} y2={next[1]} stroke="rgba(0,217,217,.36)" strokeWidth="0.17" vectorEffect="non-scaling-stroke" />
            })}
          </svg>
          {aiNodes.map((node, index) => <motion.span key={index} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D9D9]/80 bg-black shadow-[0_0_24px_rgba(0,217,217,.5)]" style={{ left: `${node[0]}%`, top: `${node[1]}%` }} animate={reducedMotion ? undefined : { scale: [0.75, 1.5, 0.75], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }} />)}
          <motion.p style={{ scale: aiScale }} className="absolute bottom-[5%] left-[3%] origin-left text-[clamp(9rem,25vw,25rem)] font-semibold uppercase leading-[0.62] tracking-[-0.12em] text-white">IA</motion.p>
          <p className="absolute bottom-[4%] right-[3%] text-right text-[9px] uppercase tracking-[0.27em] text-[#00D9D9]">contexto / interpretación / decisión</p>
        </div>
      </div>
    </motion.div>
  )
}

function ConvergenceScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.835, 0.855, 0.9, 0.918], [0, 1, 1, 0])
  const scale = useTransform(progress, [0.835, 0.87, 0.915], [0.84, 1, 1.06])
  const lineScale = useTransform(progress, [0.85, 0.89], [0, 1])
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 z-40 flex items-center justify-center bg-black px-5 text-center sm:px-8">
      <div className="w-full max-w-[1500px]">
        <p className="text-[9px] uppercase tracking-[0.34em] text-white/38 sm:text-xs">tres capas / una capacidad</p>
        <p className="mt-5 text-[clamp(4.3rem,12vw,12rem)] font-semibold uppercase leading-[0.76] tracking-[-0.09em] text-white">DISEÑO <span className="text-[#00D9D9]">+</span><br />TECNOLOGÍA <span className="text-[#00D9D9]">+</span> IA</p>
        <motion.div style={{ scaleX: lineScale, transformOrigin: "50% 50%" }} className="mx-auto mt-10 h-px w-[76%] bg-[#00D9D9]" />
      </div>
    </motion.div>
  )
}

function ResolutionScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.905, 0.93, 0.982, 1], [0, 1, 1, 0])
  const y = useTransform(progress, [0.905, 0.945, 1], [48, 0, -58])
  const lineScale = useTransform(progress, [0.93, 0.975], [0, 1])
  const wordX = useTransform(progress, [0.925, 0.975], [-42, 0])

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

function CapabilityCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <article className="min-h-[360px] border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r last:lg:border-r-0">
      <p className="text-[10px] tracking-[0.28em] text-[#00D9D9]">{number}</p>
      <h3 className="mt-24 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">{title}</h3>
      <p className="mt-5 max-w-md text-sm leading-7 text-white/44 sm:text-base">{body}</p>
    </article>
  )
}

export default function NexoNarrativeV4() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: reducedMotion ? 220 : 64, damping: reducedMotion ? 40 : 30, mass: reducedMotion ? 0.18 : 0.68 })
  const particleOpacity = useTransform(progress, [0, 0.2, 0.5, 0.82, 1], [0.22, 0.72, 0.24, 0.4, 0.12])
  const progressScale = useTransform(progress, [0, 1], [0, 1])
  const orbX = useTransform(cursorX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-60, 60])
  const orbY = useTransform(cursorY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-44, 44])
  const orbOpacity = useTransform(progress, [0, 0.2, 0.5, 0.82, 1], [0.18, 0.34, 0.16, 0.28, 0.08])

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

      <section ref={stageRef} onPointerMove={handlePointerMove} className="relative h-[1760vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <GridField progress={progress} />
          <ParticleField opacity={particleOpacity} />
          <motion.div style={{ x: orbX, y: orbY, opacity: orbOpacity }} className="pointer-events-none absolute left-1/2 top-1/2 h-[56vw] max-h-[820px] w-[56vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9]/12 blur-[145px]" />

          <div className="pointer-events-none absolute left-5 top-24 z-50 hidden text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>NX / DIGITAL SYSTEMS</p><p className="mt-1">BUILD 2026.10 / V04</p></div>
          <div className="pointer-events-none absolute right-5 top-24 z-50 hidden text-right text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"><p>INPUT / SCROLL + POINTER</p><p className="mt-1 text-[#00D9D9]">STATUS / ACTIVE</p></div>

          <NetworkScene progress={progress} reducedMotion={reducedMotion} />
          <SystemScene progress={progress} reducedMotion={reducedMotion} />
          <DesignScene progress={progress} />
          <TechnologyScene progress={progress} />
          <AIScene progress={progress} reducedMotion={reducedMotion} />
          <ConvergenceScene progress={progress} />
          <ResolutionScene progress={progress} />

          <div className="absolute bottom-5 left-5 right-5 z-[70] sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[1500px] items-end gap-5">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/24"><span>Narrative timeline</span><span>01 — 07 / QA pass 004</span></div>
                <div className="h-px overflow-hidden bg-white/10"><motion.div style={{ scaleX: progressScale, transformOrigin: "0% 50%" }} className="h-full w-full bg-[#00D9D9]" /></div>
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/24 sm:block">black / white / #00D9D9</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black px-5 sm:px-8">
        <div className="mx-auto flex min-h-[38vh] max-w-[1500px] items-center border-t border-white/10">
          <div className="flex w-full items-center justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-white/28 sm:text-[10px]">
            <span>MANIFIESTO / COMPLETO</span>
            <span className="text-[#00D9D9]">CAPACIDADES / ↓</span>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#050505] px-5 pb-28 sm:px-8 sm:pb-36 lg:pb-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 pt-24 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:pt-32">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">Después del manifiesto</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/34">La narrativa se convierte en capacidades concretas sin abandonar el sistema visual.</p>
            </div>
            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">Hacemos que diseño, tecnología e IA funcionen como una sola capacidad.</h2>
          </div>

          <div className="mt-20 grid border-y border-white/10 lg:grid-cols-3">
            <CapabilityCard number="01" title="Experiencias digitales" body="Webs, productos y sistemas donde la dirección de arte también define cómo se usa, se entiende y se recuerda." />
            <CapabilityCard number="02" title="Sistemas conectados" body="CRM, datos, WhatsApp, automatizaciones y operaciones integradas para que la empresa deje de trabajar por fragmentos." />
            <CapabilityCard number="03" title="IA aplicada" body="Agentes, interpretación y decisión diseñados alrededor del contexto real de cada empresa, no como una capa genérica." />
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
