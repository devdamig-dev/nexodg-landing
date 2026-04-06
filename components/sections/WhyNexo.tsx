"use client"

import { motion } from "framer-motion"
import { Target, TrendingUp, Search, Zap, Headphones, Briefcase } from "lucide-react"
import { whyNexo } from "@/lib/data"
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/motion"

const iconMap = {
  strategy: Target,
  conversion: TrendingUp,
  seo: Search,
  speed: Zap,
  support: Headphones,
  business: Briefcase,
}

export default function WhyNexo() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nexo-dark">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-nexo-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-nexo-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-nexo-cyan text-sm font-medium uppercase tracking-wider mb-4">
            Por qué elegirnos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nexo-white mb-6 text-balance">
            No hacemos sitios web.{" "}
            <span className="text-gradient">Creamos máquinas de generar clientes.</span>
          </h2>
          <p className="text-lg text-nexo-gray-400 max-w-2xl mx-auto">
            Cada decisión de diseño está orientada a un objetivo: que tu negocio crezca.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyNexo.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isLarge = index === 0 || index === 3

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className={`
                  group relative p-8 rounded-2xl glass glass-border
                  transition-all duration-500 hover:border-nexo-cyan/30
                  ${isLarge ? "lg:col-span-1" : ""}
                `}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nexo-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-nexo-gray-900 flex items-center justify-center mb-6 group-hover:bg-nexo-cyan/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-nexo-gray-400 group-hover:text-nexo-cyan transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-nexo-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-nexo-gray-400 leading-relaxed group-hover:text-nexo-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-nexo-cyan/30 to-transparent transform origin-top-right opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-nexo-cyan/30 to-transparent transform origin-top-right opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
