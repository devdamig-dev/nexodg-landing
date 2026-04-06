"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { fadeUp, staggerContainer } from "@/lib/motion"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

const icons = [TrendingUp, Users, Target, Zap]

const results = [
  {
    value: 40,
    prefix: "+",
    suffix: "%",
    metric: "Consultas calificadas",
    context: "Promedio de aumento en contactos que realmente se convierten en oportunidades"
  },
  {
    value: 3,
    prefix: "",
    suffix: "x",
    metric: "Más reuniones agendadas",
    context: "Nuestros clientes triplican las reuniones comerciales desde su sitio web"
  },
  {
    value: 60,
    prefix: "-",
    suffix: "%",
    metric: "Menos objeciones de confianza",
    context: "Reducción drástica del \"no me genera confianza\" en llamadas de venta"
  },
  {
    value: 30,
    prefix: "+",
    suffix: "%",
    metric: "Facturación en 6 meses",
    context: "Impacto directo en ingresos para empresas que invirtieron en su presencia digital"
  },
]

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  })
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])
  
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => unsubscribe()
  }, [springValue])
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

export default function Results() {
  return (
    <section id="resultados" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nexo-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nexo-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-nexo-cyan/10 text-nexo-cyan text-sm font-medium mb-6 border border-nexo-cyan/20">
            Resultados Reales
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexo-white mb-6 text-balance">
            Números que{" "}
            <span className="text-gradient">importan</span>
          </h2>
          <p className="text-xl text-nexo-gray-400 max-w-3xl mx-auto">
            No hablamos de métricas vanidosas. Estos son resultados de negocio que impactan directamente en tu facturación.
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {results.map((result, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group"
              >
                <div className="glass glass-border rounded-2xl p-8 h-full hover:border-nexo-cyan/30 transition-all duration-300 hover-lift">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-nexo-cyan/10 flex items-center justify-center mb-6 group-hover:bg-nexo-cyan/20 transition-colors">
                    <Icon className="w-6 h-6 text-nexo-cyan" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-5xl md:text-6xl font-bold text-nexo-white mb-3">
                    <AnimatedCounter 
                      value={result.value} 
                      prefix={result.prefix}
                      suffix={result.suffix}
                    />
                  </div>
                  
                  {/* Metric */}
                  <h3 className="text-lg font-semibold text-nexo-white mb-2">
                    {result.metric}
                  </h3>
                  
                  {/* Context */}
                  <p className="text-nexo-gray-500 text-sm leading-relaxed">
                    {result.context}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <p className="text-nexo-gray-500 text-sm">
            *Promedios basados en resultados de clientes en los últimos 12 meses
          </p>
        </motion.div>
      </div>
    </section>
  )
}
