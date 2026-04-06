"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer } from "@/lib/motion"
import { Star, Quote, TrendingUp } from "lucide-react"

const testimonials = [
  {
    quote: "Pasamos de recibir 5 consultas mensuales a más de 20. El rediseño no solo mejoró nuestra imagen, multiplicó nuestro negocio.",
    name: "Martín López",
    role: "Director",
    company: "Estudio Jurídico Martínez",
    result: "+300% en consultas mensuales",
    avatar: "ML"
  },
  {
    quote: "Entendieron nuestro negocio desde el primer día. No fue solo diseño, fue una estrategia comercial completa para nuestra presencia online.",
    name: "Laura García",
    role: "CEO",
    company: "TechFlow Solutions",
    result: "ROI positivo en 2 meses",
    avatar: "LG"
  },
  {
    quote: "La inversión se recuperó en menos de 3 meses. Ahora nuestro sitio web es nuestro mejor vendedor, trabaja 24/7.",
    name: "Carlos Ruiz",
    role: "Fundador",
    company: "Inmobiliaria Costa",
    result: "+45% en conversiones",
    avatar: "CR"
  },
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nexo-dark" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-nexo-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-nexo-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      
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
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexo-white mb-6 text-balance">
            Lo que dicen{" "}
            <span className="text-gradient">nuestros clientes</span>
          </h2>
          <p className="text-xl text-nexo-gray-400 max-w-3xl mx-auto">
            Historias reales de empresas que transformaron su presencia digital y multiplicaron sus resultados
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group"
            >
              <div className="glass glass-border rounded-2xl p-8 h-full hover:border-nexo-cyan/30 transition-all duration-300 flex flex-col">
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-xl bg-nexo-cyan/10 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-nexo-cyan" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-nexo-cyan text-nexo-cyan" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-nexo-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                
                {/* Result badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexo-cyan/10 text-nexo-cyan text-sm font-medium mb-6 w-fit">
                  <TrendingUp className="w-4 h-4" />
                  {testimonial.result}
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-nexo-gray-800">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-nexo-gray-800 flex items-center justify-center text-nexo-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-nexo-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-nexo-gray-500 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
