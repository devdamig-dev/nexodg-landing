"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Film,
  Image as ImageIcon,
  Layers3,
  MousePointer2,
  Sparkles,
} from "lucide-react"
import { assetSlots, studioScenes, type StudioScene } from "@/lib/studio/scene-contract"
import { revealUp, stagger } from "@/lib/studio/motion"

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
  const step = 1 / studioScenes.length
  const center = (index + 0.5) * step
  const fade = step * 0.74
  const rangeStart = Math.max(0, center - step)
  const rangeEnd = Math.min(1, center + step)

  const opacity = useTransform(
    progress,
    [center - fade, center - fade * 0.36, center + fade * 0.36, center + fade],
    [0, 1, 1, 0],
  )
  const scale = useTransform(
    progress,
    [rangeStart, rangeEnd],
    reducedMotion ? [1.04, 1.04] : scene.treatment.zoom,
  )
  const x = useTransform(
    progress,
    [rangeStart, rangeEnd],
    reducedMotion ? ["0%", "0%"] : scene.treatment.panX,
  )
  const y = useTransform(
    progress,
    [rangeStart, rangeEnd],
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
          className="object-cover opacity-55 saturate-[0.72] contrast-[1.06]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/36 backdrop-blur-[1px]" />
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
  const step = 1 / studioScenes.length
  const center = (index + 0.5) * step
  const frameOpacity = useTransform(
    progress,
    [center - step * 0.72, center - step * 0.35, center + step * 0.35, center + step * 0.72],
    [0, 1, 1, 0],
  )
  const frameY = useTransform(
    progress,
    [center - step * 0.62, center, center + step * 0.62],
    reducedMotion ? [0, 0, 0] : [50, 0, -34],
  )
  const frameRotate = useTransform(
    progress,
    [center - step * 0.6, center + step * 0.6],
    reducedMotion ? [0, 0] : index % 2 === 0 ? [-1.1, 0.7] : [1.1, -0.7],
  )

  return (
    <motion.div
      style={{ opacity: frameOpacity, y: frameY, rotate: frameRotate }}
      className={`absolute bottom-[11vh] left-5 right-5 z-20 h-[34vh] overflow-hidden rounded-[1.4rem] border border-white/15 bg-black/35 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-xl sm:h-[42vh] sm:rounded-[2rem] lg:inset-x-auto lg:h-auto lg:aspect-[16/10] ${scene.treatment.frameClass}`}
    >
      <Image
        src={scene.asset.src}
        alt={scene.asset.alt}
        fill
        sizes="(max-width: 1024px) 92vw, 42vw"
        style={{ objectPosition: scene.asset.focalPoint }}
        className="object-cover transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl sm:left-5 sm:top-5 sm:text-[10px]">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
        {scene.asset.kind} / {scene.asset.origin}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
        <span className="max-w-[72%] text-[9px] uppercase tracking-[0.22em] text-white/60 sm:text-[10px]">
          {scene.treatment.accent}
        </span>
        <span className="font-mono text-[10px] text-white/35">{scene.number}.002</span>
      </div>
    </motion.div>
  )
}

function SceneCopy({
  progress,
  index,
  scene,
}: {
  progress: MotionValue<number>
  index: number
  scene: StudioScene
}) {
  const step = 1 / studioScenes.length
  const start = index * step
  const center = start + step * 0.5
  const end = start + step

  const opacity = useTransform(progress, [start, center - step * 0.18, center + step * 0.2, end], [0, 1, 1, 0])
  const y = useTransform(progress, [start, center, end], [34, 0, -28])
  const lineScale = useTransform(progress, [start, center, end], [0, 1, 0.35])

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-[18vh] z-30 mx-auto w-full max-w-7xl px-5 sm:top-[17vh] sm:px-8 lg:top-1/2 lg:-translate-y-1/2 ${
        scene.align === "right" ? "lg:flex lg:justify-end" : "lg:flex lg:justify-start"
      }`}
    >
      <div className={`max-w-[31rem] ${scene.align === "right" ? "lg:text-right" : "lg:text-left"}`}>
        <div className={`mb-5 flex items-center gap-3 ${scene.align === "right" ? "lg:flex-row-reverse" : ""}`}>
          <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-200/80">{scene.number}</span>
          <motion.span
            style={{ scaleX: lineScale, transformOrigin: scene.align === "right" ? "100% 50%" : "0% 50%" }}
            className="h-px w-16 bg-cyan-300/65"
          />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/42">{scene.eyebrow}</span>
        </div>
        <h2 className="text-balance text-[2.65rem] font-semibold leading-[0.91] tracking-[-0.062em] text-white sm:text-6xl lg:text-[4.9rem]">
          {scene.title}
        </h2>
        <p className={`mt-5 max-w-lg text-sm leading-6 text-white/58 sm:mt-6 sm:text-base sm:leading-7 ${scene.align === "right" ? "lg:ml-auto" : "lg:mr-auto"}`}>
          {scene.body}
        </p>
      </div>
    </motion.div>
  )
}

function SceneMarker({ progress, index, scene }: { progress: MotionValue<number>; index: number; scene: StudioScene }) {
  const step = 1 / studioScenes.length
  const center = (index + 0.5) * step
  const opacity = useTransform(progress, [center - step * 0.58, center, center + step * 0.58], [0.25, 1, 0.25])
  const scale = useTransform(progress, [center - step * 0.58, center, center + step * 0.58], [0.72, 1, 0.72])

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-3">
      <motion.span style={{ scale }} className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
      <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/55 xl:block">{scene.id}</span>
    </motion.div>
  )
}

function AssetSlotCard({ slot, index }: { slot: (typeof assetSlots)[number]; index: number }) {
  const iconMap = {
    IMAGE: ImageIcon,
    VIDEO: Film,
    SEQUENCE: Layers3,
    WEBGL: Box,
  }
  const Icon = iconMap[slot.kind]

  return (
    <motion.article variants={revealUp} className="group relative min-h-72 overflow-hidden border-l border-white/10 px-6 py-7 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(103,232,249,.11),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.26em] text-white/35">SLOT 0{index + 1}</span>
          <Icon className="h-5 w-5 text-cyan-200/65" />
        </div>
        <div className="mt-auto pt-20">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">{slot.kind}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{slot.role}</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">{slot.note}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default function CinematicLab() {
  const stageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.55,
  })
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1])
  const introOpacity = useTransform(smoothProgress, [0, 0.055, 0.125], [1, 1, 0])
  const introY = useTransform(smoothProgress, [0, 0.13], [0, reducedMotion ? 0 : -54])
  const introScale = useTransform(smoothProgress, [0, 0.13], reducedMotion ? [1, 1] : [1, 0.94])
  const giantWordX = useTransform(smoothProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["0%", "-11%"])

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-cyan-300 selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between rounded-full border border-white/10 bg-black/38 px-3 py-2.5 shadow-[0_12px_50px_rgba(0,0,0,.24)] backdrop-blur-2xl sm:px-5 sm:py-3">
          <Link href="/" className="flex items-center gap-3 text-xs font-medium tracking-[-0.02em] text-white sm:text-sm">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[9px] font-semibold text-cyan-200">NX</span>
            <span>Nexo Web Studio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-white/38 md:block">Iteration / 002</span>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-3.5 py-2 text-[11px] font-semibold text-black transition-transform duration-300 hover:scale-[1.03] sm:px-4 sm:text-xs"
            >
              Hablemos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <section ref={stageRef} className="relative h-[560vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="absolute inset-0">
            {studioScenes.map((scene, index) => (
              <SceneBackground
                key={scene.id}
                progress={smoothProgress}
                index={index}
                scene={scene}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82)_0%,rgba(0,0,0,.18)_48%,rgba(0,0,0,.73)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.08)_38%,rgba(0,0,0,.82)_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:96px_96px]" />
          <div className="absolute inset-y-0 left-[8vw] hidden w-px bg-white/8 lg:block" />
          <div className="absolute inset-y-0 right-[8vw] hidden w-px bg-white/8 lg:block" />

          {!reducedMotion && (
            <motion.div
              animate={{ y: ["-15vh", "115vh"] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent"
            />
          )}

          <motion.div
            style={{ x: giantWordX }}
            className="pointer-events-none absolute left-[2vw] top-1/2 z-0 -translate-y-1/2 whitespace-nowrap text-[30vw] font-semibold leading-none tracking-[-0.095em] text-white/[0.032] sm:text-[26vw]"
          >
            NEXO
          </motion.div>

          <motion.div
            style={{ opacity: introOpacity, y: introY, scale: introScale }}
            className="absolute inset-x-0 top-1/2 z-30 mx-auto -translate-y-1/2 px-5 sm:px-8"
          >
            <div className="mx-auto max-w-[92rem]">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-cyan-200/85">002</span>
                <span className="h-px w-16 bg-cyan-300/60" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">NexoDG / quality lab</span>
              </div>
              <h1 className="max-w-[78rem] text-balance text-[3.6rem] font-semibold leading-[0.82] tracking-[-0.072em] text-white sm:text-7xl lg:text-[8.6rem]">
                Diseñar la web como una secuencia, no como una plantilla.
              </h1>
              <div className="mt-8 flex max-w-4xl flex-col gap-7 border-t border-white/12 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-white/56 sm:text-base sm:leading-7">
                  La iteración 002 separa narrativa, motion y código del origen de los assets. Así podemos llegar a una experiencia cinematográfica sin convertir Higgsfield en una dependencia.
                </p>
                <div className="flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white/42">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                  Scroll to direct
                </div>
              </div>
            </div>
          </motion.div>

          {studioScenes.map((scene, index) => (
            <SceneFrame
              key={`frame-${scene.id}`}
              progress={smoothProgress}
              index={index}
              scene={scene}
              reducedMotion={reducedMotion}
            />
          ))}

          {studioScenes.map((scene, index) => (
            <SceneCopy key={`copy-${scene.id}`} progress={smoothProgress} index={index} scene={scene} />
          ))}

          <div className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex xl:right-10">
            {studioScenes.map((scene, index) => (
              <SceneMarker key={`marker-${scene.id}`} progress={smoothProgress} index={index} scene={scene} />
            ))}
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-40 sm:bottom-7 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-[92rem] items-end gap-6">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/32">
                  <span>Sequence 00 → 04</span>
                  <span>Direction / Motion / Media</span>
                </div>
                <div className="h-px overflow-hidden bg-white/14">
                  <motion.div
                    style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
                    className="h-full w-full bg-cyan-300"
                  />
                </div>
              </div>
              <div className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/30 md:block">
                NX.STUDIO / 002
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/8 bg-[#060606] px-5 py-28 sm:px-8 sm:py-40">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[70rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.055] blur-[140px]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger(0.09)}
          className="relative mx-auto max-w-[92rem]"
        >
          <motion.div variants={revealUp} className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div className="flex items-start gap-3 pt-1">
              <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-200/75">SYSTEM / 002</span>
              <span className="mt-1.5 h-px flex-1 bg-white/12" />
            </div>
            <div>
              <h2 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.9] tracking-[-0.064em] text-white sm:text-7xl lg:text-[7.4rem]">
                Una experiencia. Múltiples motores visuales.
              </h2>
              <p className="mt-8 max-w-3xl text-base leading-7 text-white/48 sm:text-lg sm:leading-8">
                La dirección creativa no cambia cuando cambia el proveedor. El sitio consume escenas. Cada escena puede resolverse con fotos, video, secuencias o WebGL según presupuesto, material y objetivo.
              </p>
            </div>
          </motion.div>

          <motion.div variants={stagger(0.07)} className="mt-20 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {assetSlots.map((slot, index) => (
              <AssetSlotCard key={slot.kind} slot={slot} index={index} />
            ))}
          </motion.div>

          <motion.div variants={revealUp} className="mt-24 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">Production ladder</p>
              <div className="mt-6 space-y-0 border-t border-white/10">
                {[
                  ["01", "Editorial", "Imagen + DOM + Motion", "La base de calidad para la mayoría de los proyectos."],
                  ["02", "Cinematic", "Video / sequence + scrub", "Cuando necesitamos cámara, continuidad y mayor impacto."],
                  ["03", "Immersive", "WebGL + 3D + shaders", "Solo donde la interacción en tiempo real cambia la experiencia."],
                ].map(([number, title, stack, note]) => (
                  <div key={number} className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[70px_0.8fr_1fr_1.3fr] sm:items-center">
                    <span className="font-mono text-[10px] text-cyan-200/65">{number}</span>
                    <span className="text-lg font-medium tracking-[-0.025em] text-white">{title}</span>
                    <span className="text-sm text-white/50">{stack}</span>
                    <span className="text-sm leading-6 text-white/36">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-cyan-200/70">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.28em]">Next checkpoint</span>
                </div>
                <h3 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-4xl">
                  Reemplazar mockups por assets pensados como escenas.
                </h3>
                <p className="mt-5 leading-7 text-white/46">
                  La estructura ya está lista para recibir material del cliente, renders propios o generación externa sin reescribir el sistema de scroll.
                </p>
                <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  <span className="rounded-full border border-white/10 px-3 py-2">brief</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">storyboard</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">shots</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">scrub</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/65">Nexo Web Studio</p>
              <p className="mt-2 max-w-2xl text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">
                El objetivo no es sumar efectos. Es construir momentos que se recuerden.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors duration-300 hover:border-cyan-300/50 hover:text-cyan-200"
            >
              Volver al sitio actual
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
