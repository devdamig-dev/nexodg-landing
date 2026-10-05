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
import { ArrowDown, ArrowUpRight, Layers3, MousePointer2, Sparkles } from "lucide-react"
import { revealUp, stagger, studioEase } from "@/lib/studio/motion"

const scenes = [
  {
    image: "/portfolio/project-1.jpg",
    eyebrow: "01 / Dirección de arte",
    title: "Una web no debería sentirse armada.",
    body: "Debería sentirse dirigida. Composición, tipografía, ritmo y movimiento trabajando como una sola pieza.",
    align: "left" as const,
  },
  {
    image: "/portfolio/project-2.jpg",
    eyebrow: "02 / Scroll narrativo",
    title: "El scroll deja de ser transporte.",
    body: "Se convierte en cámara: revela, acerca, recorta y cambia el foco para construir una secuencia visual memorable.",
    align: "right" as const,
  },
  {
    image: "/portfolio/project-3.jpg",
    eyebrow: "03 / Motion system",
    title: "Movimiento con intención, no decoración.",
    body: "Transiciones, capas, profundidad y microinteracciones guían la mirada y refuerzan la identidad de cada marca.",
    align: "left" as const,
  },
  {
    image: "/portfolio/project-4.jpg",
    eyebrow: "04 / Nexo Web Studio",
    title: "El nuevo estándar empieza acá.",
    body: "Un pipeline reusable para producir experiencias de nivel estudio sin depender de Higgsfield como intermediario.",
    align: "right" as const,
  },
]

function SceneLayer({
  progress,
  index,
  image,
  reducedMotion,
}: {
  progress: MotionValue<number>
  index: number
  image: string
  reducedMotion: boolean | null
}) {
  const step = 1 / scenes.length
  const center = (index + 0.5) * step
  const fade = step * 0.7

  const opacity = useTransform(
    progress,
    [center - fade, center - fade * 0.32, center + fade * 0.32, center + fade],
    [0, 1, 1, 0],
  )

  const scale = useTransform(
    progress,
    [Math.max(0, center - step), Math.min(1, center + step)],
    reducedMotion ? [1, 1] : [1.1, 1.02],
  )

  const x = useTransform(
    progress,
    [Math.max(0, center - step), Math.min(1, center + step)],
    reducedMotion ? ["0%", "0%"] : index % 2 === 0 ? ["-2%", "2%"] : ["2%", "-2%"],
  )

  return (
    <motion.div style={{ opacity, scale, x }} className="absolute inset-0 will-change-transform">
      <Image
        src={image}
        alt="Proyecto NexoDG"
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  )
}

function SceneCopy({
  progress,
  index,
  eyebrow,
  title,
  body,
  align,
}: {
  progress: MotionValue<number>
  index: number
  eyebrow: string
  title: string
  body: string
  align: "left" | "right"
}) {
  const step = 1 / scenes.length
  const start = index * step
  const center = start + step * 0.5
  const end = start + step

  const opacity = useTransform(progress, [start, center - step * 0.16, center + step * 0.18, end], [0, 1, 1, 0])
  const y = useTransform(progress, [start, center, end], [36, 0, -30])

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-1/2 z-30 mx-auto w-full max-w-7xl -translate-y-1/2 px-5 sm:px-8 ${
        align === "right" ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <div className={`max-w-xl ${align === "right" ? "text-right" : "text-left"}`}>
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.34em] text-cyan-300/80 sm:text-xs">
          {eyebrow}
        </p>
        <h2 className="text-balance text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        <p className={`mt-6 text-base leading-7 text-white/66 sm:text-lg ${align === "right" ? "ml-auto" : "mr-auto"}`}>
          {body}
        </p>
      </div>
    </motion.div>
  )
}

function SignatureCard({
  number,
  title,
  body,
  icon,
}: {
  number: string
  title: string
  body: string
  icon: React.ReactNode
}) {
  return (
    <motion.article
      variants={revealUp}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl sm:p-9"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.13),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-14 flex items-center justify-between text-white/50">
          <span className="text-xs tracking-[0.28em]">{number}</span>
          <div className="rounded-full border border-white/10 bg-white/5 p-3 text-cyan-300">{icon}</div>
        </div>
        <h3 className="text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md leading-7 text-white/55">{body}</p>
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
    stiffness: 95,
    damping: 26,
    mass: 0.5,
  })
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1])
  const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.16], [1, 1, 0])
  const introY = useTransform(smoothProgress, [0, 0.16], [0, reducedMotion ? 0 : -48])

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-300 selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7 sm:pt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl sm:px-5">
          <Link href="/" className="flex items-center gap-3 text-sm font-medium tracking-[-0.02em] text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[10px] font-semibold text-cyan-200">NX</span>
            Nexo Web Studio
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs uppercase tracking-[0.22em] text-white/40 sm:block">Experimental / 001</span>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-4 py-2 text-xs font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Hablar con Nexo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <section ref={stageRef} className="relative h-[480vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="absolute inset-0">
            {scenes.map((scene, index) => (
              <SceneLayer
                key={scene.image}
                progress={smoothProgress}
                index={index}
                image={scene.image}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.78)_0%,rgba(0,0,0,.28)_45%,rgba(0,0,0,.66)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,.12)_44%,rgba(0,0,0,.8)_100%)]" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:80px_80px]" />

          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-x-0 top-1/2 z-30 mx-auto -translate-y-1/2 px-5 text-center sm:px-8"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.38em] text-cyan-300/85 sm:text-xs">
              NexoDG / quality lab
            </p>
            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.88] tracking-[-0.065em] text-white sm:text-7xl lg:text-[7.5rem]">
              De hacer sitios a dirigir experiencias.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
              Primer laboratorio del estándar studio-grade: scroll coreografiado, capas visuales y dirección de arte como sistema reusable.
            </p>
            <div className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-white/45">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              Scroll para recorrer
            </div>
          </motion.div>

          {scenes.map((scene, index) => (
            <SceneCopy key={scene.title} progress={smoothProgress} index={index} {...scene} />
          ))}

          <div className="absolute bottom-6 left-5 right-5 z-40 sm:bottom-8 sm:left-8 sm:right-8">
            <div className="mx-auto flex max-w-7xl items-end gap-5">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-white/35">
                  <span>Journey</span>
                  <span>Studio grade</span>
                </div>
                <div className="h-px overflow-hidden bg-white/15">
                  <motion.div
                    style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
                    className="h-full w-full bg-cyan-300"
                  />
                </div>
              </div>
              <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-white/35 sm:block">
                Motion / visual / performance
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/8 bg-[#070707] px-5 py-28 sm:px-8 sm:py-36">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[120px]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          variants={stagger(0.09)}
          className="relative mx-auto max-w-7xl"
        >
          <motion.div variants={revealUp} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/75">Reusable capability layer</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">
                No queremos depender de una herramienta mágica.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/55 lg:justify-self-end">
              Este laboratorio separa la experiencia web de la generación de assets. Mañana el origen puede ser material del cliente, video generado, 3D real o un proveedor externo; el sistema de dirección, motion y QA sigue siendo nuestro.
            </p>
          </motion.div>

          <motion.div variants={stagger(0.08)} className="mt-16 grid gap-4 lg:grid-cols-3">
            <SignatureCard
              number="01"
              icon={<Layers3 className="h-5 w-5" />}
              title="Cinematic layers"
              body="Fondos, máscaras, gradientes, copy y profundidad desacoplados para reemplazar assets sin rehacer la experiencia."
            />
            <SignatureCard
              number="02"
              icon={<MousePointer2 className="h-5 w-5" />}
              title="Scroll choreography"
              body="La progresión de scroll funciona como timeline: cada escena tiene entrada, permanencia, salida y foco narrativo."
            />
            <SignatureCard
              number="03"
              icon={<Sparkles className="h-5 w-5" />}
              title="Progressive ambition"
              body="Empezamos con Motion y assets existentes; GSAP, video scrubbing o WebGL entran solo cuando elevan el resultado."
            />
          </motion.div>

          <motion.div variants={revealUp} className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/45">Siguiente iteración</p>
              <p className="mt-1 text-xl font-medium tracking-[-0.03em] text-white">Convertir este laboratorio en el nuevo hero + portfolio de NexoDG.</p>
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
