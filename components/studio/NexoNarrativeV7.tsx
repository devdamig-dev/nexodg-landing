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
import NexoWebGLCore from "@/components/studio/NexoWebGLCore"

const AI_NODES = [
  [14, 24], [29, 14], [48, 23], [70, 17], [86, 31],
  [20, 61], [42, 52], [65, 60], [82, 72], [52, 82],
]

const AI_EDGES = [
  [0, 2], [1, 6], [2, 4], [2, 6], [3, 7], [4, 8],
  [5, 6], [5, 9], [6, 7], [6, 9], [7, 8], [8, 9],
]

function StateRail({ progress }: { progress: MotionValue<number> }) {
  const system = useTransform(progress, [0.32, 0.35, 0.47, 0.50], [0.22, 1, 1, 0.22])
  const design = useTransform(progress, [0.49, 0.52, 0.59, 0.62], [0.2, 1, 1, 0.2])
  const technology = useTransform(progress, [0.60, 0.63, 0.70, 0.73], [0.2, 1, 1, 0.2])
  const intelligence = useTransform(progress, [0.71, 0.74, 0.82, 0.85], [0.2, 1, 1, 0.2])
  const synthesis = useTransform(progress, [0.83, 0.86, 0.90, 0.93], [0.2, 1, 1, 0.2])
  const railScale = useTransform(progress, [0.32, 0.94], [0, 1])

  return (
    <div className="absolute bottom-7 left-1/2 z-20 w-[min(90vw,1120px)] -translate-x-1/2 sm:bottom-8">
      <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-white/24 sm:text-[9px]">
        <span>NEXO CORE / transformation timeline</span>
        <span className="text-[#00D9D9]/60">realtime / webgl2</span>
      </div>
      <div className="relative h-px bg-white/10">
        <motion.div style={{ scaleX: railScale, transformOrigin: "0% 50%" }} className="absolute inset-0 bg-[#00D9D9] shadow-[0_0_14px_rgba(0,217,217,.45)]" />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2 text-[7px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px]">
        <motion.span style={{ opacity: system }}>01 / sistema</motion.span>
        <motion.span style={{ opacity: design }}>02 / diseño</motion.span>
        <motion.span style={{ opacity: technology }}>03 / tecnología</motion.span>
        <motion.span style={{ opacity: intelligence }}>04 / ia</motion.span>
        <motion.span style={{ opacity: synthesis }} className="text-right">05 / síntesis</motion.span>
      </div>
    </div>
  )
}

function DesignLayer({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-[7%] z-[2] grid grid-cols-12 gap-2 border-y border-white/10">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="relative border-x border-white/[0.055]">
          {index % 3 === 0 && <span className="absolute left-1 top-2 text-[7px] tracking-[0.2em] text-white/18">{String(index + 1).padStart(2, "0")}</span>}
        </div>
      ))}
      <div className="absolute left-[8%] top-[14%] h-[18%] w-[24%] border border-[#00D9D9]/24" />
      <div className="absolute right-[10%] top-[22%] h-[31%] w-[21%] border border-white/12" />
      <div className="absolute bottom-[13%] left-[20%] h-[15%] w-[34%] border border-white/10" />
    </motion.div>
  )
}

function TechnologyLayer({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-[8%] z-[2]">
      <div className="absolute left-[5%] top-[14%] w-[30%] border border-white/12 bg-black/55 p-4 font-mono text-[8px] leading-5 text-white/34 backdrop-blur-sm sm:text-[10px]">
        <p><span className="text-[#00D9D9]">const</span> context = input.resolve()</p>
        <p>architecture.connect(data)</p>
        <p>workflow.execute(intent)</p>
        <p><span className="text-[#00D9D9]">return</span> measurable.output</p>
      </div>
      <div className="absolute right-[4%] top-[12%] grid h-[31%] w-[31%] grid-cols-2 gap-2 border border-[#00D9D9]/22 p-3">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="relative border border-white/10"><span className="absolute left-2 top-2 h-1 w-1 rounded-full bg-[#00D9D9] shadow-[0_0_12px_rgba(0,217,217,.8)]" /></div>)}
      </div>
      <div className="absolute bottom-[14%] left-[12%] h-px w-[72%] bg-gradient-to-r from-transparent via-[#00D9D9]/50 to-transparent" />
      <div className="absolute left-[49%] top-[19%] h-[58%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-[10%] right-[8%] text-right font-mono text-[8px] leading-5 text-white/24 sm:text-[9px]">
        <p>API / CRM / DATA / UI</p>
        <p className="text-[#00D9D9]/55">SYSTEM STATUS / SYNCHRONIZED</p>
      </div>
    </motion.div>
  )
}

function IntelligenceLayer({ opacity, reducedMotion }: { opacity: MotionValue<number>; reducedMotion: boolean | null }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-[7%] z-[2]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {AI_EDGES.map(([start, end], index) => (
          <motion.line
            key={index}
            x1={AI_NODES[start][0]}
            y1={AI_NODES[start][1]}
            x2={AI_NODES[end][0]}
            y2={AI_NODES[end][1]}
            stroke={index % 3 === 0 ? "rgba(255,255,255,.16)" : "rgba(0,217,217,.30)"}
            strokeWidth="0.14"
            vectorEffect="non-scaling-stroke"
            animate={reducedMotion ? undefined : { opacity: [0.16, 0.55, 0.16] }}
            transition={{ duration: 2.2 + (index % 4) * 0.4, repeat: Infinity, delay: index * 0.11 }}
          />
        ))}
      </svg>
      {AI_NODES.map(([x, y], index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D9D9]/70 bg-black shadow-[0_0_22px_rgba(0,217,217,.48)]"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={reducedMotion ? undefined : { scale: [0.7, 1.45, 0.7], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.7 + (index % 5) * 0.27, repeat: Infinity, delay: index * 0.09 }}
        />
      ))}
      <div className="absolute right-[5%] top-[11%] text-right font-mono text-[8px] uppercase leading-5 tracking-[0.2em] text-white/25 sm:text-[9px]">
        <p>context / 0.98</p>
        <p>confidence / 0.94</p>
        <p className="text-[#00D9D9]/60">decision / ready</p>
      </div>
    </motion.div>
  )
}

function SignatureSequence({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const overlayOpacity = useTransform(progress, [0.312, 0.336, 0.982, 1], [0, 1, 1, 0])

  const systemOpacity = useTransform(progress, [0.325, 0.352, 0.475, 0.498], [0, 1, 1, 0])
  const systemY = useTransform(progress, [0.325, 0.385, 0.498], [50, 0, -44])
  const systemScale = useTransform(progress, [0.33, 0.42, 0.495], [0.76, 1, 1.08])

  const designOpacity = useTransform(progress, [0.495, 0.522, 0.592, 0.614], [0, 1, 1, 0])
  const designX = useTransform(progress, [0.495, 0.552, 0.614], [-110, 0, 54])
  const designClip = useTransform(progress, [0.495, 0.535, 0.602], ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"])
  const designLayerOpacity = useTransform(progress, [0.488, 0.525, 0.595, 0.62], [0, 0.62, 0.48, 0])

  const techOpacity = useTransform(progress, [0.608, 0.636, 0.704, 0.728], [0, 1, 1, 0])
  const techX = useTransform(progress, [0.608, 0.666, 0.728], [120, 0, -56])
  const techBlur = useTransform(progress, [0.608, 0.642, 0.71, 0.728], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"])
  const techLayerOpacity = useTransform(progress, [0.602, 0.638, 0.707, 0.733], [0, 0.58, 0.46, 0])

  const aiOpacity = useTransform(progress, [0.72, 0.748, 0.818, 0.842], [0, 1, 1, 0])
  const aiScale = useTransform(progress, [0.72, 0.772, 0.842], [0.62, 1, 1.18])
  const aiLetterSpacing = useTransform(progress, [0.72, 0.79], ["-0.18em", "-0.08em"])
  const aiLayerOpacity = useTransform(progress, [0.713, 0.75, 0.818, 0.846], [0, 0.7, 0.55, 0])

  const convergenceOpacity = useTransform(progress, [0.835, 0.858, 0.895, 0.918], [0, 1, 1, 0])
  const convergenceScale = useTransform(progress, [0.835, 0.875, 0.918], [0.84, 1, 1.06])
  const convergenceTracking = useTransform(progress, [0.842, 0.89], ["-0.12em", "-0.075em"])

  const resolutionOpacity = useTransform(progress, [0.91, 0.936, 0.982, 0.997], [0, 1, 1, 0])
  const resolutionY = useTransform(progress, [0.91, 0.95, 0.997], [56, 0, -42])
  const resolutionLine = useTransform(progress, [0.932, 0.976], [0, 1])

  const coreOpacity = useTransform(progress, [0.315, 0.34, 0.84, 0.915], [0, 1, 1, 0])
  const coreScale = useTransform(progress, [0.32, 0.84, 0.915], [0.94, 1, 0.72])

  return (
    <motion.div aria-hidden="true" style={{ opacity: overlayOpacity }} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden bg-black text-white">
      <motion.div style={{ opacity: coreOpacity, scale: coreScale }} className="absolute inset-0">
        <NexoWebGLCore progress={progress} reducedMotion={reducedMotion} />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0%,rgba(0,0,0,.08)_42%,rgba(0,0,0,.88)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[13vh] bg-gradient-to-b from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[15vh] bg-gradient-to-t from-black via-black/45 to-transparent" />

      <DesignLayer opacity={designLayerOpacity} />
      <TechnologyLayer opacity={techLayerOpacity} />
      <IntelligenceLayer opacity={aiLayerOpacity} reducedMotion={reducedMotion} />

      <div className="absolute left-7 top-[86px] z-20 hidden items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white/28 lg:flex">
        <span className="text-[#00D9D9]">NEXO CORE</span><span>/</span><span>SHADER ENGINE 07</span>
      </div>
      <div className="absolute right-7 top-[86px] z-20 hidden text-right font-mono text-[8px] uppercase leading-5 tracking-[0.22em] text-white/24 lg:block">
        <p>render / webgl2 raymarch</p>
        <p className="text-[#00D9D9]/55">camera / scroll + pointer</p>
      </div>

      <motion.div style={{ opacity: systemOpacity, y: systemY }} className="absolute inset-0 z-10 flex items-end justify-center px-8 pb-[15vh] text-center">
        <div>
          <p className="text-[9px] uppercase tracking-[0.36em] text-white/36 sm:text-xs">input / context / logic / action</p>
          <motion.p style={{ scale: systemScale }} className="mt-3 origin-center text-[clamp(5rem,14vw,14rem)] font-semibold uppercase leading-[0.72] tracking-[-0.095em] text-[#00D9D9] [text-shadow:0_0_50px_rgba(0,217,217,.22)]">SISTEMA</motion.p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/48 sm:text-base">No más herramientas aisladas. Una arquitectura que conecta, interpreta y actúa.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: designOpacity }} className="absolute inset-0 z-10 flex items-center px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-[9px] uppercase tracking-[0.36em] text-[#00D9D9] sm:text-[10px]">02 / forma + experiencia</p>
          <motion.p style={{ x: designX, clipPath: designClip }} className="mt-4 text-[clamp(6rem,15vw,15rem)] font-semibold uppercase leading-[0.70] tracking-[-0.1em] text-white">DISEÑO</motion.p>
          <p className="mt-6 max-w-md text-base leading-7 text-white/44">Ordena información, define jerarquía y convierte complejidad en una experiencia legible.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: techOpacity, filter: techBlur }} className="absolute inset-0 z-10 flex items-center justify-end px-8 text-right">
        <div className="w-full max-w-[1500px]">
          <p className="text-[9px] uppercase tracking-[0.36em] text-white/34 sm:text-[10px]">03 / arquitectura + integración</p>
          <motion.p style={{ x: techX }} className="ml-auto mt-4 text-[clamp(4.6rem,10.5vw,11rem)] font-semibold uppercase leading-[0.72] tracking-[-0.09em] text-[#00D9D9] [text-shadow:0_0_42px_rgba(0,217,217,.18)]">TECNOLOGÍA</motion.p>
          <p className="ml-auto mt-6 max-w-lg text-base leading-7 text-white/44">Conecta interfaces, datos, CRM, automatizaciones y operación dentro de una misma estructura.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: aiOpacity }} className="absolute inset-0 z-10 flex items-center px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-[9px] uppercase tracking-[0.36em] text-[#00D9D9] sm:text-[10px]">04 / interpretación + decisión</p>
          <motion.p style={{ scale: aiScale, letterSpacing: aiLetterSpacing, transformOrigin: "0% 50%" }} className="mt-2 text-[clamp(10rem,27vw,27rem)] font-semibold uppercase leading-[0.56] text-white">IA</motion.p>
          <p className="mt-6 max-w-md text-base leading-7 text-white/44">Interpreta contexto, toma decisiones y permite que el sistema aprenda y evolucione.</p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: convergenceOpacity, scale: convergenceScale }} className="absolute inset-0 z-30 flex items-center justify-center bg-black/82 px-8 text-center backdrop-blur-[4px]">
        <div className="w-full max-w-[1500px]">
          <p className="text-[9px] uppercase tracking-[0.36em] text-white/34 sm:text-xs">tres capacidades / un solo sistema</p>
          <motion.p style={{ letterSpacing: convergenceTracking }} className="mt-5 text-[clamp(4.1rem,11.5vw,11.5rem)] font-semibold uppercase leading-[0.76] text-white">
            DISEÑO <span className="text-[#00D9D9]">+</span><br />TECNOLOGÍA <span className="text-[#00D9D9]">+</span> IA
          </motion.p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: resolutionOpacity, y: resolutionY }} className="absolute inset-0 z-40 flex items-center bg-black px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-xs font-semibold tracking-[0.5em] text-[#00D9D9] sm:text-sm">NEXODG</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.18fr_.82fr] lg:items-end">
            <h2 className="text-[clamp(4.2rem,10.5vw,10.8rem)] font-semibold uppercase leading-[0.79] tracking-[-0.08em] text-white">CONSTRUIMOS<br /><span className="text-[#00D9D9]">SOLUCIONES.</span></h2>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-[clamp(1.4rem,2.3vw,2.3rem)] leading-[1.06] tracking-[-0.045em] text-white/78">No presentamos disciplinas aisladas.</p>
              <p className="mt-5 text-sm leading-7 text-white/44 sm:text-base">Diseñamos cómo se ve, construimos cómo funciona y aplicamos inteligencia donde produce una diferencia real.</p>
            </div>
          </div>
          <motion.div style={{ scaleX: resolutionLine, transformOrigin: "0% 50%" }} className="mt-10 h-px w-full bg-[#00D9D9] shadow-[0_0_14px_rgba(0,217,217,.35)]" />
        </div>
      </motion.div>

      <StateRail progress={progress} />
    </motion.div>
  )
}

export default function NexoNarrativeV7() {
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
  const versionOpacity = useTransform(stageProgress, (value) => (value < 0.998 ? 1 : 0))

  return (
    <>
      <NexoNarrativeV5 />
      <SignatureSequence progress={stageProgress} reducedMotion={reducedMotion} />
      <motion.div
        aria-hidden="true"
        style={{ opacity: versionOpacity }}
        className="pointer-events-none fixed left-5 top-24 z-[66] hidden bg-black pr-4 text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"
      >
        <p>NX / DIGITAL SYSTEMS</p>
        <p className="mt-1">BUILD 2026.10 / V07</p>
      </motion.div>
    </>
  )
}
