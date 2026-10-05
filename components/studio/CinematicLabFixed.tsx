"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight, Box, Film, Image as ImageIcon, Layers3, Sparkles } from "lucide-react"
import { assetSlots, studioScenes, type StudioScene } from "@/lib/studio/scene-contract"
import { revealUp, stagger } from "@/lib/studio/motion"

const sceneStep = 1 / studioScenes.length

function getCrossfade(index: number) {
  const start = index * sceneStep
  const end = (index + 1) * sceneStep
  const blend = sceneStep * 0.18

  if (index === 0) {
    return {
      input: [0, end - blend, end + blend],
      output: [1, 1, 0],
    }
  }

  if (index === studioScenes.length - 1) {
    return {
      input: [start - blend, start + blend, 1],
      output: [0, 1, 1],
    }
  }

  return {
    input: [start - blend, start + blend, end - blend, end + blend],
    output: [0, 1, 1, 0],
  }
}

function SceneBackground({
  progress,
  index,
  scene,
  reducedMotion,
}: {
  progress: MotionValue<number>
  index: number
  scene: StudioScene
  reducedMotion: boolean | null
}) {
  const { input, output } = getCrossfade(index)
  const start = Math.max(0, index * sceneStep - sceneStep * 0.15)
  const end = Math.min(1, (index + 1) * sceneStep + sceneStep * 0.15)

  const opacity = useTransform(progress, input, output)
  const scale = useTransform(progress, [start, end], reducedMotion ? [1.03, 1.03] : scene.treatment.zoom)
  const x = useTransform(progress, [start, end], reducedMotion ? ["0%", "0%"] : scene.treatment.panX)
  const y = useTransform(
    progress,
    [start, end],
    reducedMotion ? ["0%", "0%"] : scene.treatment.panY ?? ["0%", "0%"],
  )

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ scale, x, y }} className="absolute inset-[-3%] will-change-transform">
        <Image
          src={scene.asset.src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          style={{ objectPosition: scene.asset.focalPoint }}
          className="object-cover opacity-[0.78] saturate-[0.82] contrast-[1.04]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/18" />
    </motion.div>
  )
}

function SceneFrame({
  progress,
  index,
  scene,
  reducedMotion,
}: {
  progress: MotionValue<number>
  index: number
  scene: StudioScene
  reducedMotion: boolean | null
}) {
  const { input, output } = getCrossfade(index)
  const opacity = useTransform(progress, input, output)
  const center = (index + 0.5) * sceneStep
  const y = useTransform(
    progress,
    [Math.max(0, center - sceneStep * 0.58), center, Math.min(1, center + sceneStep * 0.58)],
    reducedMotion ? [0, 0, 0] : [36, 0, -24],
  )
  const rotate = useTransform(
    progress,
    [Math.max(0, center - sceneStep * 0.52), Math.min(1, center + sceneStep * 0.52)],
    reducedMotion ? [0, 0] : index % 2 === 0 ? [-0.75, 0.45] : [0.75, -0.45],
  )

  const desktopPosition =
    scene.align === "left"
      ? "lg:right-[6vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[43vw]"
      : "lg:left-[6vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[43vw]"

  return (
    <motion.div
      style={{ opacity, y, rotate }}
      className={`absolute bottom-[8vh] left-4 right-4 z-20 h-[32vh] overflow-hidden rounded-[1.25rem] border border-white/15 bg-black/28 shadow-[0_24px_90px_rgba(0,0,0,.48)] backdrop-blur-lg sm:left-6 sm:right-6 sm:h-[38vh] sm:rounded-[1.75rem] lg:inset-x-auto lg:bottom-auto lg:h-auto lg:aspect-[16/10] ${desktopPosition}`}
    >
      <Image
        src={scene.asset.src}
        alt={scene.asset.alt}
        fill
        sizes="(max-width: 1024px) 92vw, 43vw"
        style={{ objectPosition: scene.asset.focalPoint }}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-black/8" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-white/72 backdrop-blur-xl sm:text-[10px]">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
        {scene.asset.kind} / {scene.asset.origin}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <span className="max-w-[74%] text-[9px] uppercase tracking-[0.2em] text-white/62 sm:text-[10px]">{scene.treatment.accent}</span>
        <span className="font-mono text-[10px] text-white/38">{scene.number}.002</span>
      </div>
    </motion.div>
  )
}

function SceneCopy({ progress, index, scene }: { progress: MotionValue<number>; index: number; scene: StudioScene }) {
  const { input, output } = getCrossfade(index)
  const opacity = useTransform(progress, input, output)
  const center = (index + 0.5) * sceneStep
  const y = useTransform(
    progress,
    [Math.max(0, center - sceneStep * 0.55), center, Math.min(1, center + sceneStep * 0.55)],
    [24, 0, -18],
  )
  const lineScale = useTransform(
    progress,
    [Math.max(0, center - sceneStep * 0.55), center, Math.min(1, center + sceneStep * 0.55)],
    [0.25, 1, 0.45],
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-[15vh] z-30 mx-auto w-full max-w-[92rem] px-5 sm:top-[16vh] sm:px-8 lg:top-1/2 lg:-translate-y-1/2 ${
        scene.align === "right" ? "lg:flex lg:justify-end" : "lg:flex lg:justify-start"
      }`}
    >
      <div className={`max-w-[33rem] ${scene.align === "right" ? "lg:text-right" : "lg:text-left"}`}>
        <div className={`mb-4 flex items-center gap-3 ${scene.align === "right" ? "lg:flex-row-reverse" : ""}`}>
          <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-200/84">{scene.number}</span>
          <motion.span
            style={{ scaleX: lineScale, transformOrigin: scene.align === "right" ? "100% 50%" : "0% 50%" }}
            className="h-px w-14 bg-cyan-300/70"
          />
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/48">{scene.eyebrow}</span>
        </div>
        <h2 className="text-balance text-[2.35rem] font-semibold leading-[0.94] tracking-[-0.056em] text-white sm:text-5xl lg:text-[4.45rem]">
          {scene.title}
        </h2>
        <p className={`mt-5 max-w-lg text-sm leading-6 text-white/62 sm:text-base sm:leading-7 ${scene.align === "right" ? "lg:ml-auto" : "lg:mr-auto"}`}>
          {scene.body}
        </p>
      </div>
    </motion.div>
  )
}

function SceneMarker({ progress, index, scene }: { progress: MotionValue<number>; index: number; scene: StudioScene }) {
  const center = (index + 0.5) * sceneStep
  const opacity = useTransform(progress, [center - sceneStep * 0.62, center, center + sceneStep * 0.62], [0.24, 1, 0.24])
  const scale = useTransform(progress, [center - sceneStep * 0.62, center, center + sceneStep * 0.62], [0.7, 1, 0.7])

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-3">
      <motion.span style={{ scale }} className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
      <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/58 xl:block">{scene.id}</span>
    </motion.div>
  )
}

function AssetSlotCard({ slot, index }: { slot: (typeof assetSlots)[number]; index: number }) {
  const iconMap = { IMAGE: ImageIcon, VIDEO: Film, SEQUENCE: Layers3, WEBGL: Box }
  const Icon = iconMap[slot.kind]

  return (
    <motion.article variants={revealUp} className="group relative min-h-64 overflow-hidden border-l border-white/10 px-6 py-7 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(103,232,249,.11),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.26em] text-white/35">SLOT 0{index + 1}</span>
          <Icon className="h-5 w-5 text-cyan-200/65" />
        </div>
        <div className="mt-auto pt-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">{slot.kind}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{slot.role}</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/48">{slot.note}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default function CinematicLabFixed() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 105, damping: 30, mass: 0.48 })
  const sceneProgress = useTransform(smoothProgress, [0.145, 0.96], [0, 1])
  const sceneStageOpacity = useTransform(smoothProgress, [0, 0.105, 0.145], [0, 0, 1])
  const introOpacity = useTransform(smoothProgress, [0, 0.07, 0.125, 0.15], [1, 1, 0.2, 0])
  const introY = useTransform(smoothProgress, [0, 0.15], [0, reducedMotion ? 0 : -34])
  const introScale = useTransform(smoothProgress, [0, 0.15], reducedMotion ? [1, 1] : [1, 0.975])
  const heroBackdropOpacity = useTransform(smoothProgress, [0, 0.08, 0.15], [0.28, 0.22, 0])
  const giantWordX = useTransform(smoothProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["0%", "-8%"])
  const progressScale = useTransform(smoothProgress, [0.145, 0.96], [0, 1])

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-cyan-300 selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between rounded-full border border-white/10 bg-black/42 px-3 py-2.5 shadow-[0_12px_50px_rgba(0,0,0,.24)] backdrop-blur-2xl sm:px-5 sm:py-3">
          <Link href="/" className="flex items-center gap-3 text-xs font-medium tracking-[-0.02em] text-white sm:text-sm">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[9px] font-semibold text-cyan-200">NX</span>
            <span>Nexo Web Studio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-white/38 md:block">Iteration / 002 · Front fix</span>
            <Link href="/#contacto" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-3.5 py-2 text-[11px] font-semibold text-black transition-transform duration-300 hover:scale-[1.03] sm:px-4 sm:text-xs">
              Hablemos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <section ref={stageRef} className="relative h-[460vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
          <motion.div style={{ opacity: heroBackdropOpacity }} className="absolute inset-0">
            <Image src="/portfolio/project-1.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40 saturate-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(0,0,0,.18),rgba(0,0,0,.82)_70%)]" />
          </motion.div>

          <motion.div style={{ opacity: sceneStageOpacity }} className="absolute inset-0">
            {studioScenes.map((scene, index) => (
              <SceneBackground key={scene.id} progress={sceneProgress} index={index} scene={scene} reducedMotion={reducedMotion} />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.70)_0%,rgba(0,0,0,.08)_48%,rgba(0,0,0,.62)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.04)_42%,rgba(0,0,0,.68)_100%)]" />
          </motion.div>

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:96px_96px]" />
          <div className="absolute inset-y-0 left-[8vw] hidden w-px bg-white/8 lg:block" />
          <div className="absolute inset-y-0 right-[8vw] hidden w-px bg-white/8 lg:block" />

          <motion.div style={{ x: giantWordX }} className="pointer-events-none absolute left-[2vw] top-1/2 z-0 -translate-y-1/2 whitespace-nowrap text-[28vw] font-semibold leading-none tracking-[-0.095em] text-white/[0.028] sm:text-[23vw]">
            NEXO
          </motion.div>

          <motion.div style={{ opacity: introOpacity, y: introY, scale: introScale }} className="absolute inset-x-0 top-1/2 z-30 mx-auto -translate-y-1/2 px-5 sm:px-8">
            <div className="mx-auto max-w-[92rem]">
              <div className="mb-7 flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-cyan-200/85">002</span>
                <span className="h-px w-14 bg-cyan-300/60" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/42">NexoDG / quality lab</span>
              </div>
              <h1 className="max-w-[68rem] text-balance text-[3rem] font-semibold leading-[0.9] tracking-[-0.062em] text-white sm:text-6xl lg:text-[7.1rem]">
                Diseñar la web como una secuencia, no como una plantilla.
              </h1>
              <div className="mt-7 flex max-w-4xl flex-col gap-6 border-t border-white/12 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
                  Dirección de arte, narrativa y motion primero. La tecnología entra después, al servicio de la experiencia.
                </p>
                <div className="flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/44">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                  Scroll to direct
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: sceneStageOpacity }} className="absolute inset-0">
            {studioScenes.map((scene, index) => (
              <SceneFrame key={`frame-${scene.id}`} progress={sceneProgress} index={index} scene={scene} reducedMotion={reducedMotion} />
            ))}
            {studioScenes.map((scene, index) => (
              <SceneCopy key={`copy-${scene.id}`} progress={sceneProgress} index={index} scene={scene} />
            ))}

            <div className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex xl:right-10">
              {studioScenes.map((scene, index) => (
                <SceneMarker key={`marker-${scene.id}`} progress={sceneProgress} index={index} scene={scene} />
              ))}
            </div>
          </motion.div>

          <div className="absolute bottom-5 left-5 right-5 z-40 sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[92rem] items-end gap-6">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-white/34">
                  <span>Sequence 00 → 04</span>
                  <span>Direction / Motion / Media</span>
                </div>
                <div className="h-px overflow-hidden bg-white/14">
                  <motion.div style={{ scaleX: progressScale, transformOrigin: "0% 50%" }} className="h-full w-full bg-cyan-300" />
                </div>
              </div>
              <div className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/30 md:block">NX.STUDIO / 002</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/8 bg-[#070707] px-5 py-24 sm:px-8 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={stagger(0.08)} className="relative mx-auto max-w-[92rem]">
          <motion.div variants={revealUp} className="grid gap-9 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div className="flex items-start gap-3 pt-1">
              <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-200/75">SYSTEM / 002</span>
              <span className="mt-1.5 h-px flex-1 bg-white/12" />
            </div>
            <div>
              <h2 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.058em] text-white sm:text-7xl lg:text-[6.8rem]">
                Una experiencia. Múltiples motores visuales.
              </h2>
              <p className="mt-7 max-w-3xl text-base leading-7 text-white/52 sm:text-lg sm:leading-8">
                El sitio consume escenas. Cada escena puede resolverse con fotos, video, secuencias o WebGL sin romper la narrativa.
              </p>
            </div>
          </motion.div>

          <motion.div variants={stagger(0.06)} className="mt-16 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {assetSlots.map((slot, index) => (
              <AssetSlotCard key={slot.kind} slot={slot} index={index} />
            ))}
          </motion.div>

          <motion.div variants={revealUp} className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-0 border-t border-white/10">
              {[
                ["01", "Editorial", "Imagen + DOM + Motion"],
                ["02", "Cinematic", "Video / sequence + scrub"],
                ["03", "Immersive", "WebGL + 3D + shaders"],
              ].map(([number, title, stack]) => (
                <div key={number} className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[70px_0.9fr_1.4fr] sm:items-center">
                  <span className="font-mono text-[10px] text-cyan-200/65">{number}</span>
                  <span className="text-lg font-medium tracking-[-0.025em] text-white">{title}</span>
                  <span className="text-sm text-white/50">{stack}</span>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-cyan-200/70">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.28em]">Next checkpoint</span>
                </div>
                <h3 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-4xl">Assets diseñados como escenas.</h3>
                <p className="mt-5 leading-7 text-white/48">La base ya queda estable para avanzar después a storyboard, keyframes y scrub real.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">Primero estabilidad visual. Después seguimos elevando la ambición.</p>
            <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors duration-300 hover:border-cyan-300/50 hover:text-cyan-200">
              Volver al sitio actual
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
