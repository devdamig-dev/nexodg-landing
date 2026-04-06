"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, BadgeCheck, Globe, TrendingUp } from "lucide-react"
import { portfolioProjects } from "@/lib/data"
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion"
import Image from "next/image"

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden py-24 md:py-32 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-nexo-black via-nexo-dark to-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-nexo-cyan/8 blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-18"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-nexo-cyan/20 bg-nexo-cyan/10 px-4 py-2 text-sm font-medium text-nexo-cyan">
            <Globe className="h-4 w-4" />
            Proyectos con enfoque comercial
          </span>
          <h2 className="mt-6 text-3xl font-bold text-nexo-white sm:text-4xl md:text-5xl lg:text-6xl">
            No mostramos solo diseño.
            <span className="text-gradient"> Mostramos percepción, claridad y resultado.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-nexo-gray-400 md:text-xl">
            Cada proyecto está pensado para elevar la marca, ordenar el mensaje y mejorar la calidad de las oportunidades que llegan desde la web.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid gap-6 lg:grid-cols-12"
        >
          {portfolioProjects.map((project, index) => {
            const featured = index === 0 || index === 3
            return (
              <motion.article
                key={project.id}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/6 bg-nexo-gray-900/55 backdrop-blur-xl ${featured ? "lg:col-span-7" : "lg:col-span-5"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-nexo-cyan/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative grid h-full gap-0 md:grid-cols-[1.04fr_0.96fr]">
                  <div className="relative min-h-[18rem] overflow-hidden md:min-h-[22rem]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-nexo-gray-200 backdrop-blur">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-nexo-cyan/15 bg-nexo-cyan/10 px-3 py-2 text-sm font-medium text-nexo-cyan backdrop-blur">
                      <TrendingUp className="h-4 w-4" />
                      {project.result}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-between p-6 md:p-7">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-nexo-gray-500">{project.category}</div>
                      <h3 className="mt-3 text-2xl font-semibold text-nexo-white md:text-[1.75rem]">{project.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-nexo-gray-400 md:text-base">{project.description}</p>
                    </div>

                    <div className="mt-8 space-y-5">
                      <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                        <div className="flex items-start gap-3">
                          <BadgeCheck className="mt-0.5 h-5 w-5 text-nexo-cyan" />
                          <div>
                            <div className="text-sm font-medium text-nexo-white">Qué mejoró</div>
                            <p className="mt-1 text-sm text-nexo-gray-400">
                              Mayor claridad del mensaje, mejor experiencia mobile y una estructura más preparada para convertir.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-nexo-gray-500">Foco del proyecto</div>
                          <div className="mt-1 text-sm font-medium text-nexo-white">Marca + conversión + performance</div>
                        </div>
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/5 text-nexo-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-nexo-cyan/30 group-hover:text-nexo-cyan">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
