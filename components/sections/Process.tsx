"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion"
import { Search, Lightbulb, Code, Rocket } from "lucide-react"

const processSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description: "Analizamos tu sitio actual, competencia y objetivos de negocio para entender dónde estás y a dónde querés llegar.",
    duration: "1 semana",
    icon: Search
  },
  {
    step: "02",
    title: "Estrategia",
    description: "Definimos la arquitectura de información, wireframes y estrategia de contenido orientada a conversión.",
    duration: "1 semana",
    icon: Lightbulb
  },
  {
    step: "03",
    title: "Diseño + Desarrollo",
    description: "Creamos la experiencia visual y la construimos con tecnología de punta para máximo rendimiento.",
    duration: "3-4 semanas",
    icon: Code
  },
  {
    step: "04",
    title: "Lanzamiento",
    description: "Entregamos, capacitamos y optimizamos. El lanzamiento es solo el comienzo de la mejora continua.",
    duration: "1 semana",
    icon: Rocket
  },
]

export default function Process() {
  return (
    <section id="proceso" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nexo-dark" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexo-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-nexo-cyan/10 text-nexo-cyan text-sm font-medium mb-6 border border-nexo-cyan/20">
            Proceso de Trabajo
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexo-white mb-6 text-balance">
            De diagnóstico a{" "}
            <span className="text-gradient">resultados</span>
          </h2>
          <p className="text-xl text-nexo-gray-400 max-w-3xl mx-auto">
            Un proceso probado que garantiza resultados predecibles y minimiza sorpresas
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-gray-700 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative"
              >
                {/* Step card */}
                <div className="glass glass-border rounded-2xl p-8 h-full hover:border-nexo-cyan/30 transition-all duration-300 group">
                  {/* Step number with icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-nexo-cyan/10 flex items-center justify-center group-hover:bg-nexo-cyan/20 transition-colors">
                      <step.icon className="w-7 h-7 text-nexo-cyan" />
                    </div>
                    <span className="text-5xl font-bold text-nexo-gray-800 group-hover:text-nexo-gray-700 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-nexo-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-nexo-gray-400 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Duration badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-nexo-gray-800 text-nexo-gray-300 text-sm">
                    {step.duration}
                  </div>
                </div>
                
                {/* Connector arrow - desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 text-nexo-gray-700">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="text-center mt-16"
        >
          <p className="text-nexo-gray-400 mb-6">
            Tiempo total estimado:{" "}
            <span className="text-nexo-white font-semibold">6-8 semanas</span>
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-nexo-cyan text-nexo-black font-semibold hover:bg-nexo-cyan-dark transition-colors glow-cyan"
          >
            Comenzar mi proyecto
          </a>
        </motion.div>
      </div>
    </section>
  )
}
