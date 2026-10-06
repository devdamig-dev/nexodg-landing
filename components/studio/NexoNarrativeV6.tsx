"use client"

import { useEffect, useState } from "react"
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import NexoNarrativeV5 from "@/components/studio/NexoNarrativeV5"

const coreNodes = [
  [50, 12], [68, 18], [83, 33], [88, 52], [80, 72], [62, 86],
  [40, 88], [21, 76], [12, 58], [14, 36], [30, 19], [50, 50],
]

const coreEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0],
  [0, 11], [2, 11], [4, 11], [6, 11], [8, 11], [10, 11], [1, 5], [3, 7], [5, 9], [7, 1],
]

function CoreCube({ progress }: { progress: MotionValue<number> }) {
  const rotateX = useTransform(progress, [0.33, 0.84], [58, 118])
  const rotateY = useTransform(progress, [0.33, 0.84], [-38, 142])
  const cubeScale = useTransform(progress, [0.33, 0.43, 0.55, 0.68, 0.82], [0.66, 1, 0.78, 0.92, 0.58])
  const cubeOpacity = useTransform(progress, [0.33, 0.37, 0.52, 0.67, 0.82], [0.15, 0.9, 0.35, 0.7, 0.2])
  const face = "absolute inset-0 border border-[#00D9D9]/55 bg-[#00D9D9]/[0.018] shadow-[inset_0_0_45px_rgba(0,217,217,.055)]"

  return (
    <motion.div style={{ scale: cubeScale, opacity: cubeOpacity }} className="absolute left-1/2 top-1/2 h-[23vmin] w-[23vmin] -translate-x-1/2 -translate-y-1/2 [perspective:1000px]">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
        <div className={face} style={{ transform: "translateZ(11.5vmin)" }} />
        <div className={face} style={{ transform: "rotateY(180deg) translateZ(11.5vmin)" }} />
        <div className={face} style={{ transform: "rotateY(90deg) translateZ(11.5vmin)" }} />
        <div className={face} style={{ transform: "rotateY(-90deg) translateZ(11.5vmin)" }} />
        <div className={face} style={{ transform: "rotateX(90deg) translateZ(11.5vmin)" }} />
        <div className={face} style={{ transform: "rotateX(-90deg) translateZ(11.5vmin)" }} />
      </motion.div>
    </motion.div>
  )
}

function CoreGraph({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const graphOpacity = useTransform(progress, [0.34, 0.4, 0.52, 0.63, 0.76, 0.835], [0.2, 0.48, 0.18, 0.36, 0.95, 0.62])
  const graphScale = useTransform(progress, [0.34, 0.52, 0.66, 0.82], [0.78, 1.02, 0.92, 1.18])
  const pathProgress = useTransform(progress, [0.34, 0.43, 0.7, 0.8], [0.08, 1, 0.7, 1])

  return (
    <motion.div style={{ opacity: graphOpacity, scale: graphScale }} className="absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        {coreEdges.map(([a, b], index) => (
          <motion.line
            key={index}
            x1={coreNodes[a][0]}
            y1={coreNodes[a][1]}
            x2={coreNodes[b][0]}
            y2={coreNodes[b][1]}
            stroke={index % 3 === 0 ? "rgba(255,255,255,.28)" : "rgba(0,217,217,.58)"}
            strokeWidth="0.32"
            vectorEffect="non-scaling-stroke"
            pathLength={pathProgress}
          />
        ))}
        {coreNodes.map(([x, y], index) => (
          <motion.circle
            key={index}
            cx={x}
            cy={y}
            r={index === coreNodes.length - 1 ? 1.15 : 0.62}
            fill={index === coreNodes.length - 1 ? "#00D9D9" : "#050505"}
            stroke="#00D9D9"
            strokeWidth="0.25"
            animate={reducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8 + (index % 4) * 0.35, repeat: Infinity, delay: index * 0.08 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

function SignatureCore({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const coreScale = useTransform(progress, [0.33, 0.42, 0.52, 0.63, 0.72, 0.83], reducedMotion ? [1, 1, 1, 1, 1, 1] : [0.72, 1, 0.9, 1.03, 0.94, 1.12])
  const coreRotate = useTransform(progress, [0.33, 0.84], reducedMotion ? [0, 0] : [-8, 22])
  const ringOneRotate = useTransform(progress, [0.33, 0.84], [0, 220])
  const ringTwoRotate = useTransform(progress, [0.33, 0.84], [40, -170])
  const haloOpacity = useTransform(progress, [0.33, 0.41, 0.53, 0.66, 0.78, 0.84], [0.12, 0.34, 0.12, 0.3, 0.42, 0.16])
  const scanY = useTransform(progress, [0.34, 0.83], ["18%", "83%"])

  return (
    <motion.div style={{ scale: coreScale, rotate: coreRotate }} className="absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2">
      <motion.div style={{ opacity: haloOpacity }} className="absolute -inset-[20%] rounded-full bg-[#00D9D9] blur-[150px]" />
      <motion.div style={{ rotate: ringOneRotate }} className="absolute inset-[5%] rounded-full border border-[#00D9D9]/50 shadow-[0_0_80px_rgba(0,217,217,.12)]" />
      <motion.div style={{ rotate: ringTwoRotate, rotateX: 68 }} className="absolute inset-[14%] rounded-full border border-white/25" />
      <motion.div style={{ rotate: ringOneRotate, rotateY: 70 }} className="absolute inset-[20%] rounded-full border border-[#00D9D9]/30" />
      <div className="absolute inset-[28%] rounded-full border border-white/10 bg-black/65 backdrop-blur-sm" />
      <CoreGraph progress={progress} reducedMotion={reducedMotion} />
      <CoreCube progress={progress} />
      <motion.div style={{ top: scanY }} className="absolute left-[2%] right-[2%] h-px bg-gradient-to-r from-transparent via-[#00D9D9]/80 to-transparent shadow-[0_0_24px_rgba(0,217,217,.8)]" />
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#00D9D9]/70 bg-black text-[8px] font-semibold tracking-[0.24em] text-[#00D9D9] shadow-[0_0_48px_rgba(0,217,217,.22)] sm:h-16 sm:w-16 sm:text-[9px]">NEXO</div>
    </motion.div>
  )
}

function StateRail({ progress }: { progress: MotionValue<number> }) {
  const system = useTransform(progress, [0.33, 0.36, 0.48, 0.51], [0.25, 1, 1, 0.22])
  const design = useTransform(progress, [0.49, 0.525, 0.59, 0.62], [0.2, 1, 1, 0.2])
  const tech = useTransform(progress, [0.60, 0.635, 0.70, 0.73], [0.2, 1, 1, 0.2])
  const ai = useTransform(progress, [0.71, 0.745, 0.82, 0.84], [0.2, 1, 1, 0.2])

  return (
    <div className="absolute bottom-8 left-1/2 flex w-[min(86vw,980px)] -translate-x-1/2 items-center gap-3 text-[8px] uppercase tracking-[0.26em] text-white/25 sm:text-[9px]">
      <motion.span style={{ opacity: system }}>01 / SYSTEM</motion.span><span className="h-px flex-1 bg-white/10" />
      <motion.span style={{ opacity: design }}>02 / DESIGN</motion.span><span className="h-px flex-1 bg-white/10" />
      <motion.span style={{ opacity: tech }}>03 / TECHNOLOGY</motion.span><span className="h-px flex-1 bg-white/10" />
      <motion.span style={{ opacity: ai }}>04 / AI</motion.span>
    </div>
  )
}

function SignatureSequence({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const overlayOpacity = useTransform(progress, [0.318, 0.342, 0.825, 0.848], [0, 1, 1, 0])
  const systemOpacity = useTransform(progress, [0.33, 0.36, 0.475, 0.502], [0, 1, 1, 0])
  const designOpacity = useTransform(progress, [0.505, 0.528, 0.592, 0.61], [0, 1, 1, 0])
  const techOpacity = useTransform(progress, [0.615, 0.638, 0.702, 0.72], [0, 1, 1, 0])
  const aiOpacity = useTransform(progress, [0.725, 0.748, 0.812, 0.835], [0, 1, 1, 0])
  const designGrid = useTransform(progress, [0.50, 0.54, 0.60], [0, 0.48, 0])
  const techGrid = useTransform(progress, [0.61, 0.65, 0.71], [0, 0.42, 0])
  const aiGrid = useTransform(progress, [0.72, 0.77, 0.83], [0, 0.5, 0])
  const systemWordScale = useTransform(progress, [0.34, 0.42, 0.49], [0.76, 1, 1.08])
  const designWordX = useTransform(progress, [0.50, 0.56, 0.61], [-80, 0, 32])
  const techWordX = useTransform(progress, [0.61, 0.665, 0.72], [90, 0, -38])
  const aiScale = useTransform(progress, [0.72, 0.77, 0.835], [0.72, 1, 1.15])

  return (
    <motion.div aria-hidden="true" style={{ opacity: overlayOpacity }} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:72px_72px] opacity-55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(0,217,217,.06),transparent_30%,rgba(0,0,0,.86)_78%)]" />

      <motion.div style={{ opacity: designGrid }} className="absolute inset-[8%] grid grid-cols-12 gap-2 border-y border-white/10">
        {Array.from({ length: 12 }).map((_, index) => <div key={index} className="border-x border-white/10" />)}
      </motion.div>

      <motion.div style={{ opacity: techGrid }} className="absolute inset-[10%]">
        <div className="absolute left-[8%] top-[18%] h-[24%] w-[24%] border border-[#00D9D9]/35" />
        <div className="absolute right-[8%] top-[12%] h-[34%] w-[28%] border border-white/16" />
        <div className="absolute bottom-[15%] left-[16%] h-[18%] w-[32%] border border-white/14" />
        <div className="absolute bottom-[18%] right-[13%] h-[20%] w-[22%] border border-[#00D9D9]/24" />
        <div className="absolute left-[32%] top-[30%] h-px w-[36%] bg-[#00D9D9]/45" />
        <div className="absolute left-[49%] top-[30%] h-[39%] w-px bg-[#00D9D9]/45" />
      </motion.div>

      <motion.div style={{ opacity: aiGrid }} className="absolute inset-[8%]">
        <div className="absolute left-[9%] top-[17%] h-1.5 w-1.5 rounded-full bg-[#00D9D9] shadow-[0_0_20px_rgba(0,217,217,.8)]" />
        <div className="absolute right-[12%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#00D9D9] shadow-[0_0_20px_rgba(0,217,217,.8)]" />
        <div className="absolute bottom-[18%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#00D9D9] shadow-[0_0_20px_rgba(0,217,217,.8)]" />
        <div className="absolute bottom-[14%] right-[22%] h-1.5 w-1.5 rounded-full bg-[#00D9D9] shadow-[0_0_20px_rgba(0,217,217,.8)]" />
        <div className="absolute left-[9%] top-[17%] h-px w-[79%] origin-left rotate-[6deg] bg-gradient-to-r from-[#00D9D9]/45 via-white/12 to-[#00D9D9]/45" />
        <div className="absolute bottom-[18%] left-[18%] h-px w-[62%] origin-left -rotate-[4deg] bg-gradient-to-r from-[#00D9D9]/35 via-white/10 to-[#00D9D9]/35" />
      </motion.div>

      <SignatureCore progress={progress} reducedMotion={reducedMotion} />

      <motion.div style={{ opacity: systemOpacity }} className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <div className="relative z-10 mt-[52vh]">
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/36 sm:text-xs">input / context / logic / action</p>
          <motion.p style={{ scale: systemWordScale }} className="mt-3 text-[clamp(5rem,15vw,15rem)] font-semibold uppercase leading-[0.74] tracking-[-0.1em] text-[#00D9D9]">SISTEMA</motion.p>
          <p className="mt-4 text-sm tracking-[-0.02em] text-white/48 sm:text-base">No más herramientas aisladas. Una arquitectura que conecta, interpreta y actúa.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: designOpacity }} className="absolute inset-0 flex items-center px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">02 / forma</p>
          <motion.p style={{ x: designWordX }} className="mt-4 text-[clamp(6rem,15vw,15rem)] font-semibold uppercase leading-[0.72] tracking-[-0.1em] text-white">DISEÑO</motion.p>
          <p className="mt-5 max-w-md text-base leading-7 text-white/42">Ordena la información, define la jerarquía y convierte complejidad en una experiencia legible.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: techOpacity }} className="absolute inset-0 flex items-center justify-end px-8 text-right">
        <div className="w-full max-w-[1500px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/34">03 / arquitectura</p>
          <motion.p style={{ x: techWordX }} className="mt-4 text-[clamp(4.8rem,11vw,11.5rem)] font-semibold uppercase leading-[0.74] tracking-[-0.09em] text-[#00D9D9]">TECNOLOGÍA</motion.p>
          <p className="ml-auto mt-5 max-w-lg text-base leading-7 text-white/42">Conecta interfaces, datos, CRM, automatizaciones y operación en una misma estructura.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: aiOpacity }} className="absolute inset-0 flex items-center px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#00D9D9]">04 / inteligencia</p>
          <motion.p style={{ scale: aiScale, transformOrigin: "0% 50%" }} className="mt-3 text-[clamp(10rem,28vw,28rem)] font-semibold uppercase leading-[0.56] tracking-[-0.13em] text-white">IA</motion.p>
          <p className="mt-5 max-w-md text-base leading-7 text-white/42">Interpreta contexto, toma decisiones y hace que el sistema pueda evolucionar.</p>
        </div>
      </motion.div>

      <div className="absolute left-8 top-8 flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white/25 sm:text-[9px]">
        <span className="text-[#00D9D9]">NEXO CORE</span><span>/</span><span>TRANSFORMATION ENGINE</span>
      </div>
      <StateRail progress={progress} />
    </motion.div>
  )
}

export default function NexoNarrativeV6() {
  const [viewportHeight, setViewportHeight] = useState(1)
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight || 1)
    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const stageProgress = useTransform(scrollY, (value) => {
    const denominator = viewportHeight * 16.6
    return Math.max(0, Math.min(1, denominator > 0 ? value / denominator : 0))
  })
  const versionOpacity = useTransform(stageProgress, (progress) => (progress < 0.998 ? 1 : 0))

  return (
    <>
      <NexoNarrativeV5 />
      <SignatureSequence progress={stageProgress} reducedMotion={reducedMotion} />
      <motion.div
        aria-hidden="true"
        style={{ opacity: versionOpacity }}
        className="pointer-events-none fixed left-5 top-24 z-[62] hidden bg-black pr-4 text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"
      >
        <p>NX / DIGITAL SYSTEMS</p>
        <p className="mt-1">BUILD 2026.10 / V06</p>
      </motion.div>
    </>
  )
}
