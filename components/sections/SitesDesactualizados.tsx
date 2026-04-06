"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Check, Clock3, MousePointerClick, Search, Smartphone, X } from "lucide-react"
import { painPoints } from "@/lib/data"
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportConfig } from "@/lib/motion"
import Link from "next/link"
import Image from "next/image"

const beforeItems = [
  "Mensaje genérico que no explica por qué elegirte",
  "Diseño que transmite una empresa desactualizada",
  "Botones poco visibles o inexistentes",
  "Mobile flojo y experiencia lenta",
]

const afterItems = [
  "Propuesta de valor clara desde el primer scroll",
  "Percepción premium y mayor confianza comercial",
  "CTAs estratégicos para guiar el contacto",
  "Estructura optimizada para SEO y conversión",
]

const quickWins = [
  { icon: Smartphone, label: "Experiencia mobile", before: "Incomoda", after: "Fluida" },
  { icon: Search, label: "SEO técnico", before: "Débil", after: "Preparado" },
  { icon: MousePointerClick, label: "Conversión", before: "Difusa", after: "Guiada" },
  { icon: Clock3, label: "Carga", before: "+6s", after: "<2s" },
]

const iconMap = {
  clock: Clock3,
  users: MousePointerClick,
  shield: AlertTriangle,
  search: Search,
}

export default function SitesDesactualizados() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-36">
      <div className="absolute inset-0 bg-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-red-500/5 to-transparent" />
      <div className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-nexo-cyan/5 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Sitios desactualizados = oportunidades perdidas
          </span>
          <h2 className="text-3xl font-bold leading-tight text-nexo-white sm:text-4xl md:text-5xl lg:text-6xl">
            Si tu web no transmite valor en segundos,
            <span className="text-gradient"> el problema no es solo visual.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-nexo-gray-400 md:text-xl">
            Una web vieja baja la confianza, empeora el rendimiento de tus campañas y deja afuera consultas que hoy podrían convertirse en negocio.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"
        >
          <motion.div variants={slideInLeft} className="group relative">
            <div className="absolute inset-0 rounded-[2rem] bg-red-500/8 blur-3xl opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-nexo-gray-900/60 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-red-500/10 bg-red-500/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-red-400">Antes</span>
                </div>
                <span className="text-xs text-red-300/70">Web que no acompaña al negocio</span>
              </div>

              <div className="relative aspect-[16/11] overflow-hidden border-b border-red-500/10">
                <Image
                  src="/comparison/before.jpg"
                  alt="Ejemplo de sitio web desactualizado"
                  fill
                  className="object-cover grayscale-[20%] opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexo-black via-nexo-black/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {beforeItems.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-xl border border-red-500/10 bg-black/35 px-3 py-2 text-sm text-red-200/85">
                        <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-red-500/10">
                {[
                  ["Rebote", "79%"],
                  ["Conversión", "1.8%"],
                  ["Carga", "+6s"],
                ].map(([label, value]) => (
                  <div key={label} className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{value}</div>
                    <div className="text-xs text-nexo-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideInRight} className="group relative">
            <div className="absolute inset-0 rounded-[2rem] bg-nexo-cyan/10 blur-3xl opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] border border-nexo-cyan/20 bg-nexo-gray-900/60 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-nexo-cyan/10 bg-nexo-cyan/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-nexo-cyan" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-nexo-cyan">Después</span>
                </div>
                <span className="text-xs text-nexo-gray-300/70">Web pensada para captar y filtrar mejor</span>
              </div>

              <div className="relative aspect-[16/11] overflow-hidden border-b border-nexo-cyan/10">
                <Image
                  src="/comparison/after.jpg"
                  alt="Ejemplo de sitio web optimizado"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexo-black via-nexo-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {afterItems.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-xl border border-nexo-cyan/10 bg-black/25 px-3 py-2 text-sm text-nexo-gray-100">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-nexo-cyan" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-nexo-cyan/10">
                {[
                  ["Consultas", "+40%"],
                  ["Reuniones", "3x"],
                  ["Carga", "<2s"],
                ].map(([label, value]) => (
                  <div key={label} className="p-4 text-center">
                    <div className="text-2xl font-bold text-nexo-white">{value}</div>
                    <div className="text-xs text-nexo-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickWins.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-nexo-gray-800 bg-nexo-gray-900/50 p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-nexo-cyan/10">
                <item.icon className="h-5 w-5 text-nexo-cyan" />
              </div>
              <h3 className="text-base font-semibold text-nexo-white">{item.label}</h3>
              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <div>
                  <div className="text-nexo-gray-500">Antes</div>
                  <div className="text-red-400">{item.before}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-nexo-gray-600" />
                <div className="text-right">
                  <div className="text-nexo-gray-500">Después</div>
                  <div className="text-nexo-cyan">{item.after}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(13,13,13,.92),rgba(8,8,8,.96))] p-8 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Qué suele pasar</p>
              <h3 className="mt-3 text-2xl font-bold text-nexo-white md:text-3xl">
                Tu sitio puede estar filtrando mal a tus visitas antes de que tu equipo comercial hable con ellas.
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {painPoints.map((point) => {
                const Icon = iconMap[point.icon as keyof typeof iconMap]
                return (
                  <div key={point.title} className="rounded-2xl border border-white/6 bg-nexo-gray-900/45 p-5">
                    <Icon className="h-5 w-5 text-nexo-cyan" />
                    <h4 className="mt-3 text-base font-semibold text-nexo-white">{point.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-nexo-gray-400">{point.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-nexo-cyan/15 bg-nexo-cyan/5 p-5 md:flex-row md:items-center">
            <div>
              <div className="text-sm text-nexo-gray-300">La buena noticia</div>
              <div className="text-lg font-semibold text-nexo-white">Esto se puede corregir con estructura, mensaje y una experiencia más clara.</div>
            </div>
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-nexo-cyan px-5 py-3 text-sm font-semibold text-nexo-black transition hover:bg-nexo-cyan/90"
            >
              Quiero un diagnóstico
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
