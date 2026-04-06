"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fadeUp } from "@/lib/motion"
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react"

const social = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Email", href: "mailto:hola@nexodg.com", icon: Mail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isAgencyPage = pathname === "/agencia"

  const navigation = isAgencyPage
    ? {
        servicios: [
          { name: "Estrategia digital", href: "#servicios" },
          { name: "Branding y diseño", href: "#servicios" },
          { name: "Web y ecommerce", href: "#planes" },
          { name: "Automatización", href: "#servicios" },
        ],
        empresa: [
          { name: "Desarrollo Web", href: "/" },
          { name: "Enfoque", href: "#enfoque" },
          { name: "Casos", href: "#casos" },
          { name: "Proceso", href: "#proceso" },
        ],
        recursos: [
          { name: "Comparativa WordPress / Framer / Next.js", href: "#tecnologias" },
          { name: "Planes orientativos", href: "#planes" },
          { name: "Solicitar propuesta", href: "#brief" },
        ],
      }
    : {
        servicios: [
          { name: "Diseño Web", href: "#servicios" },
          { name: "Rediseño de Sitios", href: "#sitios-desactualizados" },
          { name: "Landing Pages", href: "#portfolio" },
          { name: "E-commerce", href: "#portfolio" },
        ],
        empresa: [
          { name: "Por qué Nexo", href: "#why-nexo" },
          { name: "Proceso", href: "#proceso" },
          { name: "Resultados", href: "#resultados" },
          { name: "Agencia", href: "/agencia" },
        ],
        recursos: [
          { name: "FAQ", href: "#faq" },
          { name: "Diagnóstico Gratuito", href: "#contacto" },
        ],
      }

  return (
    <footer className="relative border-t border-nexo-gray-800 bg-nexo-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12"
          >
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="mb-6 inline-block">
                <Image src="/logo-dark.png" alt="Nexo DG" width={140} height={40} className="h-10 w-auto" />
              </Link>
              <p className="mb-6 max-w-sm text-nexo-gray-400">
                Diseñamos experiencias digitales con foco comercial, performance y percepción de marca para empresas que quieren crecer.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-nexo-gray-500">
                  <MapPin className="h-4 w-4 text-nexo-cyan" />
                  <span>Buenos Aires, Argentina</span>
                </div>
                <div className="flex items-center gap-2 text-nexo-gray-500">
                  <MapPin className="h-4 w-4 text-nexo-cyan" />
                  <span>Barcelona, España</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                {social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-nexo-gray-800 bg-nexo-gray-900 text-nexo-gray-400 transition-colors hover:border-nexo-cyan/30 hover:text-nexo-cyan"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-nexo-white">Servicios</h3>
              <ul className="space-y-3">
                {navigation.servicios.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-nexo-gray-400 transition-colors hover:text-nexo-cyan">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-nexo-white">Empresa</h3>
              <ul className="space-y-3">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-nexo-gray-400 transition-colors hover:text-nexo-cyan">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-nexo-white">Recursos</h3>
              <ul className="space-y-3">
                {navigation.recursos.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-nexo-gray-400 transition-colors hover:text-nexo-cyan">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-nexo-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-nexo-gray-500">{currentYear} Nexo DG. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-nexo-gray-500 transition-colors hover:text-nexo-cyan">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-nexo-gray-500 transition-colors hover:text-nexo-cyan">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
