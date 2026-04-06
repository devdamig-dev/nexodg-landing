"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/motion"
import { Building2, Award, Users } from "lucide-react"

const credibilityStats = [
  { value: 50, suffix: "+", label: "Proyectos desarrollados", icon: Building2 },
  { value: 8, suffix: "+", label: "Años de experiencia", icon: Award },
  { value: 98, suffix: "%", label: "Clientes satisfechos", icon: Users },
]

function AnimatedCounter({
  value,
  suffix,
  isActive,
}: {
  value: number
  suffix: string
  isActive: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let start = 0
    const duration = 1800
    const stepTime = Math.max(Math.floor(duration / value), 20)

    const timer = setInterval(() => {
      start += 1
      setCount(start)

      if (start >= value) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isActive, value])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof credibilityStats)[number]
  index: number
}) {
  const Icon = stat.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="relative text-center group"
    >
      <div className="relative p-6 md:p-8">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-nexo-cyan/5 blur-2xl rounded-full" />
        </div>

        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-nexo-gray-900/50 flex items-center justify-center group-hover:bg-nexo-cyan/10 transition-colors duration-300">
            <Icon className="w-6 h-6 text-nexo-gray-500 group-hover:text-nexo-cyan transition-colors duration-300" />
          </div>
        </div>

        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexo-white mb-3 relative">
          <span className="relative inline-block group-hover:text-gradient transition-all duration-500">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              isActive={isInView}
            />
          </span>
        </div>

        <p className="text-sm md:text-base text-nexo-gray-400 group-hover:text-nexo-gray-300 transition-colors">
          {stat.label}
        </p>
      </div>

      {index > 0 && (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-nexo-gray-800 to-transparent" />
      )}
    </motion.div>
  )
}

export default function Credibility() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-nexo-black via-nexo-dark/50 to-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-gray-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-gray-800 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative container mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {credibilityStats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}