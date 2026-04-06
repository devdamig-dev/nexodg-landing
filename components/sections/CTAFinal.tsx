"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, CheckCircle2, LayoutDashboard, Search, Send, Shield, Target } from "lucide-react"
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const benefits = [
  {
    icon: Search,
    title: "Auditoría de tu sitio actual",
    text: "Te marcamos qué está frenando confianza, rendimiento o generación de consultas.",
  },
  {
    icon: LayoutDashboard,
    title: "Diagnóstico visual y estructural",
    text: "Jerarquía, mensaje, experiencia mobile, CTAs y percepción general de marca.",
  },
  {
    icon: Target,
    title: "Oportunidades comerciales",
    text: "Detectamos dónde tu web puede capturar mejor demanda y mejorar la calidad de los leads.",
  },
  {
    icon: BarChart3,
    title: "Prioridades de mejora",
    text: "Te llevás una mirada clara de qué conviene resolver primero y por qué.",
  },
]

const challenges = [
  "Mi sitio se ve desactualizado",
  "No genera suficientes consultas",
  "No transmite el nivel de mi empresa",
  "Quiero rediseñar y mejorar conversión",
  "Necesito una landing comercial",
]

export default function CTAFinal() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-nexo-dark via-nexo-black to-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-25" />
      <div className="absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nexo-cyan/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-18"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-nexo-cyan/20 bg-nexo-cyan/10 px-4 py-2 text-sm font-medium text-nexo-cyan">
            Diagnóstico inicial
          </span>
          <h2 className="mt-6 text-4xl font-bold text-nexo-white md:text-5xl lg:text-6xl">
            Descubrí si tu sitio está
            <span className="text-gradient"> frenando ventas, confianza o crecimiento.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-nexo-gray-400 md:text-xl">
            Completá el formulario y te respondemos con una primera mirada estratégica para entender qué conviene mejorar y dónde está la mayor oportunidad.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={staggerItem} className="rounded-[2rem] border border-white/6 bg-nexo-gray-900/50 p-7 backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Qué vas a recibir</div>
              <h3 className="mt-3 text-2xl font-bold text-nexo-white">Una devolución clara, sin vueltas y enfocada en negocio.</h3>
              <p className="mt-3 text-base leading-relaxed text-nexo-gray-400">
                No es una respuesta genérica. Es una lectura inicial para detectar si tu sitio hoy acompaña el valor real de tu empresa o lo está haciendo perder fuerza.
              </p>
            </motion.div>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-nexo-gray-800 bg-nexo-gray-900/45 p-5 transition-colors hover:border-nexo-cyan/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-nexo-cyan/10">
                      <benefit.icon className="h-5 w-5 text-nexo-cyan" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-nexo-white">{benefit.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-nexo-gray-400">{benefit.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={staggerItem} className="rounded-2xl border border-nexo-cyan/15 bg-nexo-cyan/5 p-5">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 text-nexo-cyan" />
                <div>
                  <div className="font-semibold text-nexo-white">Sin compromiso</div>
                  <p className="mt-1 text-sm text-nexo-gray-400">Si vemos que no podemos ayudarte o que todavía no es el momento, te lo vamos a decir con honestidad.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(19,19,19,.95),rgba(8,8,8,.98))] p-7 shadow-[0_30px_80px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-nexo-gray-300">Nombre</label>
                      <Input
                        required
                        placeholder="Tu nombre"
                        className="h-12 border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white placeholder:text-nexo-gray-600 focus:border-nexo-cyan focus:ring-nexo-cyan/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-nexo-gray-300">Email</label>
                      <Input
                        required
                        type="email"
                        placeholder="tu@email.com"
                        className="h-12 border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white placeholder:text-nexo-gray-600 focus:border-nexo-cyan focus:ring-nexo-cyan/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-nexo-gray-300">Empresa</label>
                      <Input
                        required
                        placeholder="Nombre de tu empresa"
                        className="h-12 border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white placeholder:text-nexo-gray-600 focus:border-nexo-cyan focus:ring-nexo-cyan/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-nexo-gray-300">Sitio actual</label>
                      <Input
                        placeholder="www.tuempresa.com"
                        className="h-12 border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white placeholder:text-nexo-gray-600 focus:border-nexo-cyan focus:ring-nexo-cyan/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-nexo-gray-300">Qué necesitás resolver</label>
                    <Select required>
                      <SelectTrigger className="h-12 border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white focus:border-nexo-cyan focus:ring-nexo-cyan/20">
                        <SelectValue placeholder="Seleccioná el principal desafío" />
                      </SelectTrigger>
                      <SelectContent className="border-nexo-gray-700 bg-nexo-gray-900 text-nexo-gray-200">
                        {challenges.map((challenge) => (
                          <SelectItem key={challenge} value={challenge.toLowerCase().replace(/\s+/g, "-")}>{challenge}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-nexo-gray-300">Mensaje</label>
                    <Textarea
                      rows={5}
                      placeholder="Contanos brevemente qué sentís que hoy no está funcionando o qué querés mejorar."
                      className="resize-none border-nexo-gray-700 bg-nexo-gray-900 text-nexo-white placeholder:text-nexo-gray-600 focus:border-nexo-cyan focus:ring-nexo-cyan/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-xl bg-nexo-cyan text-base font-semibold text-nexo-black transition-all duration-300 hover:bg-nexo-cyan/90 hover:shadow-[0_0_40px_rgba(0,217,217,0.35)]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="h-5 w-5" />
                        </motion.div>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Quiero mi diagnóstico
                        <Send className="h-5 w-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-sm text-nexo-gray-500">
                    Diagnóstico inicial sin costo · respuesta estimada en 24 hs hábiles
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-nexo-cyan/10">
                    <CheckCircle2 className="h-10 w-10 text-nexo-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-nexo-white">Mensaje recibido</h3>
                  <p className="mx-auto mt-3 max-w-md text-nexo-gray-400">
                    Gracias. Revisamos tu consulta y te contactamos con una primera devolución para seguir avanzando.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6 border-nexo-cyan/30 text-nexo-cyan hover:bg-nexo-cyan/10"
                  >
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
