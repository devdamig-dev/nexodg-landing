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

const networkNodes = [
  { label: "WHATSAPP", x: 18, y: 28 },
  { label: "DATOS", x: 78, y: 22 },
  { label: "CRM", x: 86, y: 53 },
  { label: "IA", x: 66, y: 76 },
  { label: "WEB", x: 22, y: 73 },
  { label: "PERSONAS", x: 10, y: 51 },
  { label: "AUTOMATIZACIONES", x: 48, y: 13 },
]

const particles = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 37) % 97}%`,
  top: `${(index * 61) % 91}%`,
  size: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: (index % 8) * 0.18,
}))

function GridField() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(0,217,217,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,217,.16)_1px,transparent_1px)] [background-size:288px_288px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(0,0,0,.2)_42%,rgba(0,0,0,.92)_100%)]" />
    </>
  )
}

function ParticleField({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#00D9D9] shadow-[0_0_12px_rgba(0,217,217,.65)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ opacity: [0.12, 0.9, 0.12], scale: [0.8, 1.45, 0.8] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  )
}

function NetworkNode({
  progress,
  label,
  x,
  y,
  index,
}: {
  progress: MotionValue<number>
  label: string
  x: number
  y: number
  index: number
}) {
  const revealAt = 0.235 + index * 0.01
  const opacity = useTransform(progress, [0.2, revealAt, 0.43, 0.465], [0, 1, 1, 0])
  const scale = useTransform(progress, [0.2, revealAt, 0.43, 0.465], [0.7, 1, 1, 0.82])
  const yShift = useTransform(progress, [0.2, 0.31, 0.465], [22, 0, -18])

  return (
    <motion.div
      style={{ left: `${x}%`, top: `${y}%`, opacity, scale, y: yShift }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative whitespace-nowrap border border-white/15 bg-black/60 px-3 py-2 text-[10px] font-medium tracking-[0.24em] text-white/72 backdrop-blur-md sm:text-xs">
        <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#00D9D9]" />
        {label}
      </div>
    </motion.div>
  )
}

function NetworkScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.18, 0.22, 0.43, 0.475], [0, 1, 1, 0])
  const lineProgress = useTransform(progress, [0.22, 0.34], [0, 1])
  const hubScale = useTransform(progress, [0.22, 0.31, 0.43], [0.55, 1, 1.8])
  const hubOpacity = useTransform(progress, [0.2, 0.27, 0.43, 0.465], [0, 1, 1, 0])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {networkNodes.map((node) => (
          <motion.line
            key={node.label}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(0,217,217,.46)"
            strokeWidth="0.13"
            vectorEffect="non-scaling-stroke"
            pathLength={lineProgress}
          />
        ))}
        <motion.circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth="0.12"
          pathLength={lineProgress}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {networkNodes.map((node, index) => (
        <NetworkNode key={node.label} progress={progress} index={index} {...node} />
      ))}

      <motion.div
        style={{ opacity: hubOpacity, scale: hubScale }}
        className="absolute left-1/2 top-1/2 z-30 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#00D9D9]/45 bg-[#00D9D9]/[0.045] shadow-[0_0_80px_rgba(0,217,217,.16)] sm:h-32 sm:w-32"
      >
        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black text-[10px] font-semibold tracking-[0.22em] text-[#00D9D9] sm:h-16 sm:w-16 sm:text-xs">
          NEXO
        </div>
      </motion.div>

      <div className="absolute bottom-[13%] left-1/2 z-30 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/35 sm:text-xs">fragmentos aislados</p>
        <p className="mt-2 text-sm tracking-[-0.02em] text-white/60 sm:text-base">empiezan a funcionar como arquitectura</p>
      </div>
    </motion.div>
  )
}

function IntroScene({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const brandOpacity = useTransform(progress, [0, 0.018, 0.12, 0.18], [0, 1, 1, 0])
  const brandY = useTransform(progress, [0, 0.08, 0.18], [reducedMotion ? 0 : 18, 0, reducedMotion ? 0 : -42])
  const claimOpacity = useTransform(progress, [0.035, 0.07, 0.17, 0.205], [0, 1, 1, 0])
  const claimScale = useTransform(progress, [0.04, 0.14, 0.205], [0.88, 1, reducedMotion ? 1 : 1.08])
  const sigueX = useTransform(progress, [0.13, 0.205], [0, reducedMotion ? 0 : -54])
  const sigueTracking = useTransform(progress, [0.13, 0.205], ["-0.08em", "0.02em"])

  return (
    <motion.div style={{ opacity: brandOpacity, y: brandY }} className="absolute inset-0 z-30 flex items-center justify-center px-5 sm:px-8">
      <div className="w-full max-w-[1500px]">
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4 text-[9px] uppercase tracking-[0.3em] text-white/35 sm:text-[10px]">
          <span>34.7821° S / 58.2523° W</span>
          <span className="text-[#00D9D9]">SYSTEM / ONLINE</span>
        </div>
        <p className="text-xs font-semibold tracking-[0.5em] text-white sm:text-sm">NEXODG</p>
        <motion.div style={{ opacity: claimOpacity, scale: claimScale }} className="mt-6 origin-left">
          <h1 className="font-semibold uppercase leading-[0.77] tracking-[-0.085em] text-white text-[clamp(4.1rem,13.5vw,13.8rem)]">
            <span className="block">CONSTRUIMOS</span>
            <motion.span style={{ x: sigueX, letterSpacing: sigueTracking }} className="block text-[#00D9D9]">
              LO QUE SIGUE.
            </motion.span>
          </h1>
        </motion.div>
        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="text-sm tracking-[0.14em] text-white/54 sm:text-base">Diseño + Tecnología + IA</p>
          <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/34 sm:flex">
            <ArrowDown className="h-3.5 w-3.5 text-[#00D9D9]" />
            Scroll / timeline
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SystemScene({ progress }: { progress: MotionValue<number> }) {
  const firstOpacity = useTransform(progress, [0.42, 0.47, 0.535, 0.565], [0, 1, 1, 0])
  const firstY = useTransform(progress, [0.42, 0.49, 0.565], [52, 0, -40])
  const secondOpacity = useTransform(progress, [0.525, 0.57, 0.65, 0.69], [0, 1, 1, 0])
  const systemScale = useTransform(progress, [0.56, 0.65, 0.69], [0.7, 1, 1.12])
  const systemTracking = useTransform(progress, [0.56, 0.66], ["-0.1em", "-0.045em"])

  return (
    <div className="absolute inset-0 z-30">
      <motion.div style={{ opacity: firstOpacity, y: firstY }} className="absolute inset-0 flex items-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-[#00D9D9] sm:text-xs">problema / 001</p>
          <h2 className="max-w-[1200px] text-[clamp(3.4rem,9vw,9rem)] font-semibold uppercase leading-[0.83] tracking-[-0.07em] text-white">
            UNA EMPRESA<br />NO NECESITA<br />MÁS HERRAMIENTAS.
          </h2>
        </div>
      </motion.div>

      <motion.div style={{ opacity: secondOpacity }} className="absolute inset-0 flex items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <div className="w-full">
          <p className="mx-auto max-w-4xl text-[clamp(1.55rem,3.1vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white/68">
            Necesita que funcionen
          </p>
          <motion.div style={{ scale: systemScale, letterSpacing: systemTracking }} className="mt-2 origin-center text-[clamp(6rem,21vw,22rem)] font-semibold uppercase leading-[0.73] text-[#00D9D9]">
            SISTEMA
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function DesignMotif({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <div className="absolute left-[8%] top-[14%] h-[68%] w-[84%] border border-white/10" />
      <div className="absolute left-[18%] top-[24%] h-[48%] w-[64%] border border-[#00D9D9]/30" />
      <div className="absolute left-[18%] top-[24%] h-px w-[64%] bg-white/20" />
      <div className="absolute left-[18%] top-[48%] h-px w-[64%] bg-white/10" />
      <div className="absolute left-[34%] top-[24%] h-[48%] w-px bg-white/10" />
      <span className="absolute left-[18%] top-[20%] text-[9px] tracking-[0.28em] text-white/30">GRID / 12 COL</span>
    </motion.div>
  )
}

function TechnologyMotif({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <div className="absolute left-[10%] top-[17%] w-[34%] border border-white/10 bg-white/[0.015] p-5 font-mono text-[9px] leading-5 text-white/32 sm:text-[10px]">
        <p><span className="text-[#00D9D9]">const</span> system = connect(data, crm)</p>
        <p>await automate(workflow)</p>
        <p><span className="text-[#00D9D9]">return</span> decision.context</p>
      </div>
      <div className="absolute bottom-[18%] right-[9%] h-[38%] w-[44%] border border-[#00D9D9]/25 bg-black/50">
        <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4"><span className="h-1.5 w-1.5 rounded-full bg-[#00D9D9]" /><span className="text-[9px] tracking-[0.2em] text-white/30">ARCHITECTURE / LIVE</span></div>
        <div className="grid h-[calc(100%-2.25rem)] grid-cols-3 gap-3 p-4">
          <div className="border border-white/10" /><div className="border border-white/10" /><div className="border border-white/10" />
        </div>
      </div>
    </motion.div>
  )
}

function AIMotif({ opacity }: { opacity: MotionValue<number> }) {
  const nodes = [
    [22, 30], [39, 19], [56, 31], [73, 22], [31, 58], [50, 49], [69, 60], [47, 76],
  ]

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[(index + 2) % nodes.length]
          return <line key={index} x1={node[0]} y1={node[1]} x2={next[0]} y2={next[1]} stroke="rgba(0,217,217,.26)" strokeWidth="0.14" vectorEffect="non-scaling-stroke" />
        })}
      </svg>
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D9D9]/70 bg-black shadow-[0_0_18px_rgba(0,217,217,.35)]"
          style={{ left: `${node[0]}%`, top: `${node[1]}%` }}
          animate={{ scale: [0.8, 1.45, 0.8], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.14 }}
        />
      ))}
    </motion.div>
  )
}

function TriadScene({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.66, 0.695, 0.82, 0.855], [0, 1, 1, 0])
  const designOpacity = useTransform(progress, [0.68, 0.705, 0.735, 0.755], [0, 1, 1, 0])
  const techOpacity = useTransform(progress, [0.735, 0.76, 0.79, 0.81], [0, 1, 1, 0])
  const aiOpacity = useTransform(progress, [0.79, 0.81, 0.835, 0.855], [0, 1, 1, 0])
  const designX = useTransform(progress, [0.7, 0.75], [0, -50])
  const techX = useTransform(progress, [0.75, 0.81], [50, -35])
  const aiScale = useTransform(progress, [0.8, 0.85], [0.92, 1.04])

  return (
    <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0 z-30 overflow-hidden">
      <DesignMotif opacity={designOpacity} />
      <TechnologyMotif opacity={techOpacity} />
      <AIMotif opacity={aiOpacity} />

      <div className="absolute inset-0 flex items-center justify-center px-5 text-center sm:px-8">
        <div className="relative w-full max-w-[1500px]">
          <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-white/35 sm:text-xs">capas que se transforman / convergen</p>
          <div className="relative h-[clamp(7rem,18vw,17rem)]">
            <motion.div style={{ opacity: designOpacity, x: designX }} className="absolute inset-0 flex items-center justify-center text-[clamp(5rem,16vw,16rem)] font-semibold uppercase leading-none tracking-[-0.09em] text-white">
              DISEÑO
            </motion.div>
            <motion.div style={{ opacity: techOpacity, x: techX }} className="absolute inset-0 flex items-center justify-center text-[clamp(4.6rem,14vw,14rem)] font-semibold uppercase leading-none tracking-[-0.09em] text-[#00D9D9]">
              TECNOLOGÍA
            </motion.div>
            <motion.div style={{ opacity: aiOpacity, scale: aiScale }} className="absolute inset-0 flex items-center justify-center text-[clamp(8rem,23vw,23rem)] font-semibold uppercase leading-none tracking-[-0.1em] text-white">
              IA
            </motion.div>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/48 sm:text-base">No son servicios separados. Son capas de una misma solución.</p>
        </div>
      </div>
    </motion.div>
  )
}

function ResolutionScene({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.84, 0.875, 0.985, 1], [0, 1, 1, 1])
  const y = useTransform(progress, [0.84, 0.91], [58, 0])
  const lineScale = useTransform(progress, [0.89, 0.96], [0, 1])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-30 flex items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <p className="text-xs font-semibold tracking-[0.5em] text-[#00D9D9] sm:text-sm">NEXODG</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-semibold uppercase leading-[0.81] tracking-[-0.075em] text-white">
            CONSTRUIMOS<br /><span className="text-[#00D9D9]">SOLUCIONES.</span>
          </h2>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.08] tracking-[-0.04em] text-white/74">No presentamos disciplinas aisladas.</p>
            <p className="mt-5 text-sm leading-7 text-white/42 sm:text-base">Diseñamos cómo se ve, cómo funciona, cómo se conecta y cómo evoluciona.</p>
          </div>
        </div>
        <motion.div style={{ scaleX: lineScale, transformOrigin: "0% 50%" }} className="mt-10 h-px w-full bg-[#00D9D9]" />
      </div>
    </motion.div>
  )
}

export default function NexoNarrative() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 220 : 88,
    damping: reducedMotion ? 40 : 24,
    mass: reducedMotion ? 0.18 : 0.55,
  })

  const particleOpacity = useTransform(progress, [0, 0.08, 0.7, 1], [0.2, 0.72, 0.32, 0.18])
  const progressScale = useTransform(progress, [0, 1], [0, 1])
  const orbX = useTransform(cursorX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-55, 55])
  const orbY = useTransform(cursorY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-40, 40])
  const orbOpacity = useTransform(progress, [0, 0.25, 0.75, 1], [0.18, 0.4, 0.26, 0.15])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    cursorX.set((event.clientX - rect.left) / rect.width - 0.5)
    cursorY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white selection:bg-[#00D9D9] selection:text-black">
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-7 sm:pt-6">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.28em] text-white/48 backdrop-blur-[2px]">
          <Link href="/" className="font-semibold text-white transition-colors hover:text-[#00D9D9]">NEXODG</Link>
          <span className="hidden sm:block">Diseño + Tecnología + IA</span>
          <Link href="/#contacto" className="inline-flex items-center gap-2 transition-colors hover:text-[#00D9D9]">
            Hablemos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <section ref={stageRef} onPointerMove={handlePointerMove} className="relative h-[860vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <GridField />
          <ParticleField opacity={particleOpacity} />

          <motion.div
            style={{ x: orbX, y: orbY, opacity: orbOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[52vw] max-h-[760px] w-[52vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9]/10 blur-[130px]"
          />

          <div className="pointer-events-none absolute left-5 top-24 z-40 hidden text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block">
            <p>NX / DIGITAL SYSTEMS</p>
            <p className="mt-1">BUILD 2026.10</p>
          </div>
          <div className="pointer-events-none absolute right-5 top-24 z-40 hidden text-right text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block">
            <p>INPUT / SCROLL</p>
            <p className="mt-1 text-[#00D9D9]">STATUS / ACTIVE</p>
          </div>

          <IntroScene progress={progress} reducedMotion={reducedMotion} />
          <NetworkScene progress={progress} />
          <SystemScene progress={progress} />
          <TriadScene progress={progress} />
          <ResolutionScene progress={progress} />

          <div className="absolute bottom-5 left-5 right-5 z-60 sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[1500px] items-end gap-5">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/24">
                  <span>Narrative timeline</span>
                  <span>01 — 05</span>
                </div>
                <div className="h-px overflow-hidden bg-white/10">
                  <motion.div style={{ scaleX: progressScale, transformOrigin: "0% 50%" }} className="h-full w-full bg-[#00D9D9]" />
                </div>
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/24 sm:block">black / white / #00D9D9</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#050505] px-5 py-28 sm:px-8 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">A partir de acá / contenido explícito</p>
            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              Hacemos que diseño, tecnología e IA funcionen como una sola capacidad.
            </h2>
          </div>

          <div className="mt-20 grid border-y border-white/10 lg:grid-cols-3">
            {[
              ["01", "Experiencias digitales", "Webs, productos y sistemas donde la dirección de arte también define cómo se usa y se entiende."],
              ["02", "Sistemas conectados", "CRM, datos, WhatsApp, automatizaciones y operaciones integradas en flujos reales de negocio."],
              ["03", "IA aplicada", "Agentes, interpretación, decisión y automatización diseñados alrededor del contexto de cada empresa."],
            ].map(([number, title, body], index) => (
              <article key={number} className={`group min-h-[330px] border-white/10 p-7 sm:p-9 ${index < 2 ? "border-b lg:border-b-0 lg:border-r" : ""}`}>
                <div className="flex items-center justify-between text-[10px] tracking-[0.28em] text-white/26">
                  <span>{number}</span><span className="h-1.5 w-1.5 rounded-full bg-[#00D9D9] opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-24 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">{title}</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/44 sm:text-base">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-24 flex flex-col gap-8 border-t border-white/10 pt-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/28">NEXODG / 2026</p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.045em] text-white sm:text-5xl">Construimos lo que sigue.</p>
            </div>
            <Link href="/#contacto" className="inline-flex w-fit items-center gap-3 border border-[#00D9D9]/35 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#00D9D9] hover:text-black">
              Empezar un proyecto <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
