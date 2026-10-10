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
    <motion.div style={{ opacity }} className="absolute inset-0 z-[2] overflow-hidden">
      <div className="absolute left-[7vw] top-[15vh] h-[58vh] w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
      <div className="absolute right-[12vw] top-[8vh] h-[76vh] w-px bg-gradient-to-b from-transparent via-[#00D9D9]/34 to-transparent" />
      <div className="absolute left-[4vw] right-[6vw] top-[28vh] h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="absolute bottom-[18vh] left-[15vw] right-[8vw] h-px bg-gradient-to-r from-transparent via-[#00D9D9]/28 to-transparent" />
      <div className="absolute left-[11vw] top-[18vh] h-[26vh] w-[31vw] border border-white/10" />
      <div className="absolute bottom-[13vh] right-[9vw] h-[32vh] w-[26vw] border border-[#00D9D9]/18" />
      <div className="absolute left-[44vw] top-[10vh] h-[64vh] w-[22vw] -rotate-[7deg] border-x border-white/[0.06]" />
    </motion.div>
  )
}

function TechnologyLayer({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-[2] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[72vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rotate-[31deg] rounded-[50%] border border-[#00D9D9]/22" />
      <div className="absolute left-1/2 top-1/2 h-[28vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border border-white/10" />
      <div className="absolute left-[8vw] right-[8vw] top-1/2 h-px bg-gradient-to-r from-transparent via-[#00D9D9]/42 to-transparent" />
      <div className="absolute bottom-[10vh] left-1/2 top-[10vh] w-px bg-gradient-to-b from-transparent via-white/16 to-transparent" />
      <span className="absolute left-[18vw] top-[31vh] h-2 w-2 rounded-full bg-[#00D9D9] shadow-[0_0_24px_rgba(0,217,217,.72)]" />
      <span className="absolute right-[20vw] bottom-[26vh] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,.45)]" />
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
    </motion.div>
  )
}

function SignatureSequence({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const overlayOpacity = useTransform(progress, [0.298, 0.326, 0.992, 1], [0, 1, 1, 0])

  const systemOpacity = useTransform(progress, [0.312, 0.34, 0.492, 0.525], [0, 1, 1, 0])
  const systemY = useTransform(progress, [0.312, 0.385, 0.525], [64, 0, -72])
  const systemScale = useTransform(progress, [0.318, 0.42, 0.525], [0.72, 1, 1.12])

  const designOpacity = useTransform(progress, [0.472, 0.505, 0.612, 0.646], [0, 1, 1, 0])
  const designX = useTransform(progress, [0.472, 0.552, 0.646], [-150, 0, 96])
  const designClip = useTransform(progress, [0.472, 0.515, 0.626], ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"])
  const designLayerOpacity = useTransform(progress, [0.456, 0.505, 0.62, 0.662], [0, 0.72, 0.5, 0])

  const techOpacity = useTransform(progress, [0.598, 0.63, 0.738, 0.772], [0, 1, 1, 0])
  const techX = useTransform(progress, [0.598, 0.672, 0.772], [160, 0, -105])
  const techBlur = useTransform(progress, [0.598, 0.632, 0.742, 0.772], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(12px)"])
  const techLayerOpacity = useTransform(progress, [0.578, 0.625, 0.742, 0.786], [0, 0.66, 0.48, 0])

  const aiOpacity = useTransform(progress, [0.712, 0.746, 0.842, 0.874], [0, 1, 1, 0])
  const aiScale = useTransform(progress, [0.712, 0.78, 0.874], [0.54, 1, 1.24])
  const aiLetterSpacing = useTransform(progress, [0.712, 0.8], ["-0.20em", "-0.07em"])
  const aiLayerOpacity = useTransform(progress, [0.69, 0.742, 0.848, 0.888], [0, 0.78, 0.56, 0])

  const convergenceOpacity = useTransform(progress, [0.826, 0.856, 0.912, 0.942], [0, 1, 1, 0])
  const convergenceScale = useTransform(progress, [0.826, 0.882, 0.942], [0.8, 1, 1.09])
  const convergenceTracking = useTransform(progress, [0.826, 0.9], ["-0.14em", "-0.07em"])

  const resolutionOpacity = useTransform(progress, [0.902, 0.934, 0.992, 1], [0, 1, 1, 0])
  const resolutionY = useTransform(progress, [0.902, 0.952, 1], [72, 0, -24])
  const resolutionLine = useTransform(progress, [0.928, 0.984], [0, 1])

  const coreOpacity = useTransform(progress, [0.296, 0.326, 0.872, 0.948], [0, 1, 1, 0])
  const coreScale = useTransform(progress, [0.3, 0.86, 0.948], [0.9, 1.04, 0.62])
  const continuitySweepX = useTransform(progress, [0.30, 0.985], ["-24vw", "124vw"])
  const continuitySweepOpacity = useTransform(progress, [0.30, 0.34, 0.94, 0.985], [0, 0.34, 0.16, 0])
  const orbitOpacity = useTransform(progress, [0.29, 0.33, 0.9, 0.965], [0, 0.48, 0.34, 0])
  const orbitRotate = useTransform(progress, [0.3, 0.965], [-18, 176])
  const orbitScale = useTransform(progress, [0.3, 0.58, 0.8, 0.965], [0.72, 1.02, 1.18, 0.46])
  const depthWash = useTransform(progress, [0.3, 0.52, 0.73, 0.94], [0.06, 0.16, 0.08, 0.2])

  return (
    <motion.div aria-hidden="true" style={{ opacity: overlayOpacity }} className="pointer-events-none fixed inset-0 z-[70] overflow-hidden bg-black text-white">
      <motion.div style={{ opacity: coreOpacity, scale: coreScale }} className="absolute inset-0">
        <NexoWebGLCore progress={progress} reducedMotion={reducedMotion} />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0%,rgba(0,0,0,.08)_42%,rgba(0,0,0,.88)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[13vh] bg-gradient-to-b from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[15vh] bg-gradient-to-t from-black via-black/45 to-transparent" />

      <motion.div
        style={{ x: continuitySweepX, opacity: continuitySweepOpacity }}
        className="absolute bottom-[10vh] top-[10vh] z-[3] w-px bg-gradient-to-b from-transparent via-[#00D9D9]/65 to-transparent shadow-[0_0_24px_rgba(0,217,217,.35)]"
      />

      <motion.div
        style={{ opacity: depthWash }}
        className="absolute left-1/2 top-1/2 z-[1] h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9] blur-[150px]"
      />
      <motion.div
        style={{ opacity: orbitOpacity, rotate: orbitRotate, scale: orbitScale }}
        className="absolute left-1/2 top-1/2 z-[4] h-[66vmin] w-[66vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-[7%] rounded-[50%] border border-[#00D9D9]/28" />
        <div className="absolute inset-[19%] rotate-[57deg] rounded-[50%] border border-white/12" />
        <div className="absolute left-1/2 top-1/2 h-[86%] w-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-[50%] border border-[#00D9D9]/18" />
        <span className="absolute left-[10%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#00D9D9] shadow-[0_0_26px_rgba(0,217,217,.8)]" />
      </motion.div>

      <DesignLayer opacity={designLayerOpacity} />
      <TechnologyLayer opacity={techLayerOpacity} />
      <IntelligenceLayer opacity={aiLayerOpacity} reducedMotion={reducedMotion} />


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

      <motion.div style={{ opacity: convergenceOpacity, scale: convergenceScale }} className="absolute inset-0 z-30 flex items-center justify-center bg-black/58 px-8 text-center backdrop-blur-[2px]">
        <div className="w-full max-w-[1500px]">
          <p className="text-[9px] uppercase tracking-[0.36em] text-white/34 sm:text-xs">tres capacidades / un solo sistema</p>
          <motion.p style={{ letterSpacing: convergenceTracking }} className="mt-5 text-[clamp(4.1rem,11.5vw,11.5rem)] font-semibold uppercase leading-[0.76] text-white">
            DISEÑO <span className="text-[#00D9D9]">+</span><br />TECNOLOGÍA <span className="text-[#00D9D9]">+</span> IA
          </motion.p>
        </div>
      </motion.div>

      <motion.div style={{ opacity: resolutionOpacity, y: resolutionY }} className="absolute inset-0 z-40 flex items-center bg-black/88 px-8 backdrop-blur-[2px]">
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
        className="pointer-events-none fixed left-5 top-24 z-[76] hidden bg-black pr-4 text-[9px] uppercase tracking-[0.24em] text-white/24 lg:block"
      >
        <p>NX / DIGITAL SYSTEMS</p>
        <p className="mt-1">BUILD 2026.10 / V09</p>
      </motion.div>
    </>
  )
}
