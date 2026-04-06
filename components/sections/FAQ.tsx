"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion"
import { faqs } from "@/lib/data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section id="faq" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nexo-black" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-nexo-cyan/10 text-nexo-cyan text-sm font-medium mb-6 border border-nexo-cyan/20">
            Preguntas Frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexo-white mb-6 text-balance">
            Resolvemos tus{" "}
            <span className="text-gradient">dudas</span>
          </h2>
          <p className="text-xl text-nexo-gray-400 max-w-2xl mx-auto">
            Las preguntas más comunes sobre nuestro proceso y servicios
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={staggerItem}>
                <AccordionItem
                  value={`item-${index}`}
                  className="glass glass-border rounded-xl px-6 data-[state=open]:border-nexo-cyan/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-medium text-nexo-white hover:text-nexo-cyan transition-colors py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-nexo-gray-400 pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
