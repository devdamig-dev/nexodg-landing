"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const homeLinks = [
  { href: "#portfolio", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#resultados", label: "Resultados" },
  { href: "/agencia", label: "Agencia" },
]

const agencyLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#casos", label: "Casos" },
  { href: "#planes", label: "Planes" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "/", label: "Desarrollo web" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAgencyPage = pathname === "/agencia"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = isAgencyPage ? agencyLinks : homeLinks
  const ctaHref = isAgencyPage ? "#brief" : "#contacto"
  const ctaLabel = isAgencyPage ? "Quiero cotizar" : "Quiero un diagnóstico"

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "glass glass-border py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link href="/" className="relative z-10">
            <Image src="/logo-dark.png" alt="Nexo DG" width={140} height={40} className="h-8 w-auto" priority />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm text-nexo-gray-300 transition-colors duration-200 hover:text-nexo-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-nexo-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="bg-nexo-cyan px-6 font-medium text-nexo-black hover:bg-nexo-cyan/90 hover:shadow-[0_0_20px_rgba(0,217,217,0.3)]">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>

          <button
            className="relative z-10 p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-nexo-white" /> : <Menu className="h-6 w-6 text-nexo-white" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-nexo-black/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col justify-center gap-8 border-l border-nexo-gray-900 bg-nexo-dark p-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-nexo-white transition-colors hover:text-nexo-cyan"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Button asChild size="lg" className="mt-4 w-full bg-nexo-cyan text-nexo-black hover:bg-nexo-cyan/90">
                  <Link href={ctaHref} onClick={() => setIsMobileMenuOpen(false)}>
                    {ctaLabel}
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
