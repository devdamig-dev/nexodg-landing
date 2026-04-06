"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BadgeCheck, ChevronDown, MousePointerClick, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const metrics = [
  { label: "Consultas calificadas", value: "+40%" },
  { label: "Velocidad de carga", value: "<2s" },
  { label: "Reuniones agendadas", value: "3x" },
]


function AmbientBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute inset-0 noise opacity-40" />
      <motion.div
        className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-nexo-cyan/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[8%] top-[22%] h-32 w-32 rounded-full border border-nexo-cyan/10"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[12%] right-[9%] h-16 w-16 rotate-45 border border-nexo-cyan/20"
        animate={{ y: [0, 14, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-nexo-black to-transparent"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((event.clientX - innerWidth / 2) / 45)
      mouseY.set((event.clientY - innerHeight / 2) / 45)
    }

    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <AmbientBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 pb-8 sm:px-6"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-nexo-cyan/20 bg-nexo-cyan/10 px-4 py-2 text-sm text-nexo-gray-200">
                <span className="h-2 w-2 rounded-full bg-nexo-cyan" />
                Desarrollo web estratégico para Pymes
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="max-w-4xl text-4xl font-bold tracking-tight text-nexo-white sm:text-5xl md:text-6xl lg:text-[4.8rem] lg:leading-[0.95]"
            >
              Tu web debería <span className="text-gradient">vender</span>,
              <br className="hidden md:block" />
              no solo <span className="text-nexo-gray-300">verse bien.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-nexo-gray-400 sm:text-xl lg:mx-0"
            >
              Diseñamos experiencias digitales que mejoran la percepción de marca,
              generan más consultas calificadas y convierten tu sitio en una herramienta comercial real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="h-14 w-full rounded-xl bg-nexo-cyan px-8 text-base font-semibold text-nexo-black transition-all duration-300 hover:bg-nexo-cyan/90 hover:shadow-[0_0_40px_rgba(0,217,217,0.35)] sm:w-auto"
              >
                <Link href="#contacto">
                  Quiero saber si mi web pierde clientes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-xl border-nexo-gray-700 bg-transparent px-8 text-base font-medium text-nexo-white hover:border-nexo-cyan/40 hover:bg-nexo-gray-900 hover:text-nexo-cyan/40 sm:w-auto"
              >
                <Link href="#portfolio">Ver proyectos</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.44 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-nexo-gray-800 bg-nexo-gray-900/50 p-4 text-left backdrop-blur"
                >
                  <div className="text-2xl font-bold text-nexo-white">{metric.value}</div>
                  <div className="mt-1 text-sm text-nexo-gray-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 flex flex-col items-center gap-3 text-sm text-nexo-gray-500 sm:flex-row lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-nexo-cyan" />
                Diagnóstico inicial sin costo
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-nexo-gray-700 sm:block" />
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-nexo-cyan" />
                Respuesta en 24 hs hábiles
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            style={{ x: springX, y: springY }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-nexo-cyan/12 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,20,20,.88),rgba(8,8,8,.94))] shadow-[0_30px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/6 bg-nexo-gray-900/80 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <div className="ml-4 flex-1 rounded-full border border-white/6 bg-nexo-gray-800/70 px-4 py-1.5 text-center text-xs text-nexo-gray-500">
                  nexo strategy / rediseño web orientado a resultados
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:p-6">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-2xl border border-white/6 bg-[radial-gradient(circle_at_top_left,rgba(0,217,217,.18),transparent_42%),linear-gradient(180deg,rgba(19,19,19,.95),rgba(9,9,9,.92))] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-nexo-gray-500">Embudo digital</p>
                        <h3 className="mt-2 text-2xl font-semibold text-nexo-white">Más confianza. Más consultas. Mejor cierre.</h3>
                      </div>
                      <div className="rounded-2xl border border-nexo-cyan/20 bg-nexo-cyan/10 p-3">
                        <TrendingUp className="h-6 w-6 text-nexo-cyan" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: Search, label: "SEO técnico", value: "Indexable" },
                        { icon: MousePointerClick, label: "CTAs", value: "Visibles" },
                        { icon: BadgeCheck, label: "Marca", value: "Premium" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/6 bg-nexo-gray-900/60 p-3">
                          <item.icon className="h-4 w-4 text-nexo-cyan" />
                          <div className="mt-3 text-xs text-nexo-gray-500">{item.label}</div>
                          <div className="text-sm font-medium text-nexo-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/6 bg-nexo-gray-900/70 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-nexo-gray-500">Impacto estimado</p>
                        <h4 className="mt-2 text-lg font-semibold text-nexo-white">Señales que un buen sitio mejora</h4>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        { label: "Consultas calificadas", value: 78 },
                        { label: "Tiempo en página", value: 64 },
                        { label: "Probabilidad de contacto", value: 86 },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-nexo-gray-400">{bar.label}</span>
                            <span className="font-medium text-nexo-white">{bar.value}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-nexo-gray-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.value}%` }}
                              transition={{ duration: 1.2, delay: 0.5 }}
                              className="h-full rounded-full bg-gradient-to-r from-nexo-cyan/60 to-nexo-cyan"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
                  <div className="rounded-2xl border border-white/6 bg-nexo-gray-900/60 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-nexo-gray-500">Antes</p>
                    <div className="mt-4 space-y-3">
                      {["Mensaje débil", "Diseño viejo", "Sin jerarquía", "Sin CTA claro"].map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm text-nexo-gray-400">
                          <span className="h-2 w-2 rounded-full bg-red-400/80" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-nexo-cyan/15 bg-[linear-gradient(180deg,rgba(0,217,217,.08),rgba(7,7,7,.18))] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-nexo-cyan">Después</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        { value: "+40%", label: "Consultas" },
                        { value: "3x", label: "Reuniones" },
                        { value: "<2s", label: "Carga" },
                        { value: "24/7", label: "Captación" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/8 bg-black/20 p-4">
                          <div className="text-2xl font-bold text-nexo-white">{item.value}</div>
                          <div className="text-sm text-nexo-gray-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-nexo-gray-500"
        >
          <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>

    
  )
  
}


