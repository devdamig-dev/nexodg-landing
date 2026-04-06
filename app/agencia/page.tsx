import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Code2,
  Megaphone,
  Palette,
  ShoppingBag,
  Sparkles,
  Workflow,
  LayoutTemplate,
  Globe,
  BriefcaseBusiness,
} from "lucide-react"
import Navbar from "@/components/sections/Navbar"
import Footer from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import Portfolio from "@/components/sections/Portfolio"

const capabilities = [
  {
    icon: BriefcaseBusiness,
    title: "Estrategia y posicionamiento digital",
    description:
      "Ordenamos propuesta, mensaje, estructura y prioridades para que la marca comunique con claridad y tenga una dirección digital consistente.",
  },
  {
    icon: Palette,
    title: "Branding y diseño visual",
    description:
      "Desarrollamos identidades, sistemas visuales y piezas que elevan la percepción de marca y ordenan la comunicación.",
  },
  {
    icon: LayoutTemplate,
    title: "Desarrollo web y landings",
    description:
      "Creamos sitios institucionales, landings y experiencias digitales con foco en performance, SEO, claridad comercial y conversión.",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce y catálogos",
    description:
      "Diseñamos experiencias de compra y catálogos pensados para vender mejor, presentar mejor y crecer con una base ordenada.",
  },
  {
    icon: Megaphone,
    title: "Contenido, redes y pauta",
    description:
      "Acompañamos campañas, contenido y acciones digitales para sostener presencia, atraer tráfico y generar oportunidades.",
  },
  {
    icon: Workflow,
    title: "Automatización e integraciones",
    description:
      "Conectamos formularios, CRM, ecommerce y flujos de trabajo para ordenar procesos y mejorar la operación comercial.",
  },
]

const audiences = [
  {
    title: "Empresas que necesitan profesionalizar su presencia",
    description:
      "Negocios que crecieron, pero su comunicación digital, web o identidad visual ya no acompañan ese nivel.",
  },
  {
    title: "Marcas que necesitan vender mejor",
    description:
      "Proyectos que requieren una web, campaña, contenido o ecommerce que realmente ayuden a generar resultados.",
  },
  {
    title: "Equipos que están lanzando o reordenando su marca",
    description:
      "Emprendimientos y empresas que necesitan una base clara, sólida y escalable para crecer sin improvisar.",
  },
]

const approach = [
  "Pensamos cada proyecto desde el negocio, no desde una plantilla.",
  "Combinamos estética, estrategia y ejecución con criterio comercial.",
  "Priorizamos claridad, performance y escalabilidad desde el inicio.",
  "Buscamos que cada entrega tenga valor real para la marca y para ventas.",
]

const caseStudies = [
  {
    name: "Etixen",
    type: "Sitio institucional / presencia digital",
    summary:
      "Una experiencia digital pensada para comunicar con mayor solidez, ordenar la propuesta y elevar percepción de marca.",
  },
  {
    name: "Cluster Berazategui",
    type: "Plataforma institucional / comunicación sectorial",
    summary:
      "Un desarrollo enfocado en visibilidad, organización de contenidos y representación más clara de un ecosistema empresarial.",
  },
  {
    name: "Circular Sound",
    type: "Rediseño web / estructura comercial",
    summary:
      "Una propuesta orientada a reorganizar soluciones, jerarquizar servicios y presentar la marca con un enfoque más comercial.",
  },
  {
    name: "Trebol Hosting",
    type: "Landing / comunicación de servicios",
    summary:
      "Una pieza pensada para comunicar mejor los servicios, generar confianza técnica y ordenar la captación de oportunidades.",
  },
  {
    name: "Lloyd",
    type: "Web corporativa / posicionamiento",
    summary:
      "Un proyecto con foco en presencia profesional, claridad de propuesta y mejor lectura comercial del servicio.",
  },
  {
    name: "Proyecto de muestra",
    type: "Ecommerce / experiencia de producto",
    summary:
      "Ejemplo de tienda o catálogo desarrollado para presentar mejor el producto, optimizar navegación y facilitar conversión.",
  },
]

const plans = [
  {
    title: "Landing page",
    from: "Desde USD 200",
    ideal: "Para campañas, validación comercial, servicios puntuales o lanzamientos.",
    deliverables: ["Diseño estratégico", "1 a 5 secciones", "CTA y formulario", "Base SEO", "Responsive premium" , "Hosting incluído"],
  },
  {
    title: "Web institucional",
    from: "Desde USD 500",
    ideal: "Para empresas que necesitan presencia sólida, mejor percepción de marca y claridad comercial.",
    deliverables: [
      "Arquitectura de contenidos",
      "Múltiples páginas",
      "Servicios y casos",
      "Optimización técnica",
      "Base escalable",
      "Hosting incluído"
    ],
    featured: true,
  },
  {
    title: "Ecommerce",
    from: "Desde USD 900",
    ideal: "Para marcas que venden productos y necesitan una experiencia ordenada, clara y lista para crecer.",
    deliverables: ["Catálogo", "Checkout o modo catálogo", "Integraciones", "Gestión de productos", "Base para growth" , "Hosting incluído"],
  },
  {
    title: "Solución a medida",
    from: "Según alcance",
    ideal: "Para integraciones, automatizaciones, paneles, flujos internos o experiencias más personalizadas.",
    deliverables: ["Diagnóstico previo", "Arquitectura funcional", "Desarrollo custom", "Iteraciones", "Evolución futura"],
  },
]

const stack = [
  {
    name: "WordPress",
    best: "Ideal para sitios institucionales, blogs, catálogos y ecommerce que necesitan autogestión y una solución versátil.",
    advantages: ["Panel editable", "Muy buena relación costo-beneficio", "SEO friendly", "Flexible para crecer con plugins e integraciones"],
    fit: "Muy conveniente para empresas que buscan una web sólida, administrable y rápida de implementar.",
  },
  {
    name: "Framer",
    best: "Ideal para landings de alto impacto visual, campañas y marcas que priorizan estética, velocidad de salida y presentación.",
    advantages: ["Animaciones fluidas", "Time-to-market rápido", "Gran impacto visual", "Edición visual simple"],
    fit: "Muy conveniente para campañas, lanzamientos y marcas con un componente visual fuerte.",
  },
  {
    name: "Next.js",
    best: "Ideal para proyectos más ambiciosos, experiencias personalizadas, integraciones y plataformas con mayor escalabilidad.",
    advantages: ["Performance top", "Arquitectura moderna", "Libertad técnica", "Base robusta para productos digitales"],
    fit: "Muy conveniente para landings premium, sitios complejos, herramientas internas y productos digitales.",
  },
]

const process = [
  {
    title: "Diagnóstico y contexto",
    description: "Entendemos el negocio, el momento comercial, las limitaciones y el objetivo real del proyecto.",
  },
  {
    title: "Propuesta y estructura",
    description: "Definimos alcance, arquitectura, dirección visual y formato ideal según necesidad y presupuesto.",
  },
  {
    title: "Diseño y desarrollo",
    description: "Construimos la solución priorizando claridad, experiencia, percepción de marca y performance.",
  },
  {
    title: "Implementación y evolución",
    description: "Publicamos, conectamos herramientas y dejamos una base lista para escalar, optimizar y crecer.",
  },
]

export default function AgenciaPage() {
  return (
    <main className="relative overflow-hidden bg-nexo-black text-nexo-white page-transition">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-nexo-cyan/20 blur-[140px]" />
        <div className="absolute right-0 top-40 h-56 w-56 rounded-full bg-nexo-cyan/10 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-nexo-cyan/20 bg-nexo-cyan/10 px-4 py-2 text-sm text-nexo-cyan">
              <Sparkles className="h-4 w-4" />
              Agencia digital
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl">
              Impulsamos marcas con <span className="text-gradient">estrategia, diseño y tecnología</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-nexo-gray-300 sm:text-xl">
              Creamos experiencias digitales, identidades visuales y sistemas de comunicación pensados para posicionar mejor,
              vender mejor y crecer con más claridad.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-nexo-cyan px-7 text-nexo-black hover:bg-nexo-cyan/90">
                <Link href="#brief">Coordinar una reunión</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-nexo-gray-700 bg-transparent text-nexo-white hover:bg-nexo-gray-900">
                <Link href="#casos">Ver proyectos</Link>
              </Button>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-nexo-gray-400">
              Trabajamos con empresas, marcas y proyectos que buscan una presencia digital a la altura de lo que ofrecen.
            </p>
          </div>

          

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-nexo-cyan/15 via-transparent to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-nexo-gray-800 bg-gradient-to-br from-nexo-dark via-nexo-gray-900 to-black p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="mb-6 flex items-center justify-between border-b border-nexo-gray-800 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-nexo-gray-400">Ecosistema Nexo DG</p>
                  <p className="mt-2 text-lg font-medium">Soluciones que se integran entre sí</p>
                </div>
                <div className="rounded-full border border-nexo-cyan/20 bg-nexo-cyan/10 px-3 py-1 text-xs text-nexo-cyan">BA + Barcelona</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Branding", value: "Identidad + dirección visual", icon: Palette },
                  { label: "Web", value: "Landing + institucional + ecommerce", icon: Globe },
                  { label: "Growth", value: "Campañas + captación + contenido", icon: Megaphone },
                  { label: "Operación", value: "CRM + formularios + automatizaciones", icon: Workflow },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-2xl border border-nexo-gray-800 bg-black/35 p-4">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-nexo-cyan/10 text-nexo-cyan">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-nexo-gray-400">{item.label}</div>
                      <div className="mt-1 text-base font-medium text-nexo-white">{item.value}</div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-nexo-gray-800 bg-black/35 p-4 text-sm leading-7 text-nexo-gray-300">
                Unificamos visión creativa, desarrollo, comunicación y criterio comercial para evitar piezas sueltas y construir una presencia digital más coherente.
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section id="servicios" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Qué hacemos</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Soluciones integrales para construir y escalar tu presencia digital.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-nexo-gray-300">
              No pensamos los proyectos como piezas aisladas. Los ordenamos como un sistema donde marca, contenido, experiencia y tecnología trabajan en la misma dirección.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="hover-lift rounded-[1.75rem] border border-nexo-gray-800 bg-nexo-dark/80 p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-nexo-cyan/10 text-nexo-cyan">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-nexo-gray-300">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-nexo-gray-800 bg-gradient-to-br from-nexo-dark to-nexo-gray-900 p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Para quién trabajamos</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">No trabajamos desde plantillas. Trabajamos según el momento y objetivo de cada negocio.</h2>
            </div>
            <div className="grid gap-4">
              {audiences.map((item) => (
                <div key={item.title} className="rounded-2xl border border-nexo-gray-800 bg-black/30 p-5">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-nexo-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="enfoque" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Nuestro enfoque</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Diseño con criterio. Tecnología con intención. Marketing con dirección.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-nexo-gray-300">
                Buscamos que cada proyecto se vea bien, funcione bien y además tenga una lógica comercial clara detrás. Esa combinación es la que realmente eleva una marca.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {approach.map((item) => (
                <div key={item} className="rounded-2xl border border-nexo-gray-800 bg-nexo-dark/80 p-5 text-sm leading-7 text-nexo-gray-200">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-nexo-cyan/10 text-nexo-cyan">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
        
          <main className="relative overflow-hidden page-transition">
            
            <Portfolio />
            
          </main>
        
      
      

      <section id="casos" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Casos y proyectos</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Proyectos donde combinamos creatividad, estructura y resultados.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-nexo-gray-300">
              Podés usar luego capturas reales para potenciar esta sección. Por ahora dejamos la estructura comercial ya lista para mostrar distintos tipos de trabajo.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <div key={item.name} className="group overflow-hidden rounded-[1.9rem] border border-nexo-gray-800 bg-nexo-dark/80">
                <div className="relative h-44 overflow-hidden border-b border-nexo-gray-800 bg-gradient-to-br from-nexo-cyan/15 via-nexo-gray-900 to-black">
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="absolute left-6 top-6 inline-flex items-center rounded-full border border-nexo-cyan/20 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-nexo-cyan">
                    Caso {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-sm text-nexo-gray-400">{item.type}</div>
                    <div className="mt-2 text-2xl font-semibold text-nexo-white">{item.name}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-nexo-gray-300">{item.summary}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-nexo-cyan">
                    Ver enfoque <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Tipos de proyecto</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Podemos empezar por una pieza puntual o por una solución más integral.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-nexo-gray-300">
              Los valores son orientativos y sirven para ordenar la conversación comercial. El alcance final depende de objetivos, contenido, integraciones y nivel de personalización.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.title} className={`rounded-[2rem] border p-7 ${plan.featured ? "border-nexo-cyan/40 bg-gradient-to-b from-nexo-cyan/10 to-nexo-dark shadow-[0_0_0_1px_rgba(0,217,217,0.08)]" : "border-nexo-gray-800 bg-nexo-dark/80"}`}>
                <div className="flex min-h-20 flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold">{plan.title}</h3>
                    <p className="mt-2 text-sm font-medium text-nexo-cyan">{plan.from}</p>
                  </div>
                  {plan.featured ? <span className="w-fit rounded-full bg-nexo-cyan px-3 py-1 text-xs font-medium text-nexo-black">Más pedido</span> : null}
                </div>
                <p className="mt-5 text-sm leading-7 text-nexo-gray-300">{plan.ideal}</p>
                <div className="my-7 h-px bg-nexo-gray-800" />
                <ul className="space-y-4 text-sm text-nexo-gray-200">
                  {plan.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-nexo-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Tecnologías</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">No todas las webs necesitan la misma tecnología.</h2>
            <p className="mt-4 text-sm leading-7 text-nexo-gray-300">
              La herramienta no es el punto de partida. Elegimos el stack correcto según objetivo, tiempos, presupuesto y proyección del proyecto.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {stack.map((item) => (
              <div key={item.name} className="rounded-[2rem] border border-nexo-gray-800 bg-nexo-dark/80 p-7">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-nexo-cyan/10 p-3 text-nexo-cyan">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                </div>
                <p className="mt-5 text-sm leading-7 text-nexo-gray-300">{item.best}</p>
                <div className="mt-6 rounded-2xl border border-nexo-gray-800 bg-black/30 p-4 text-sm text-nexo-gray-200">
                  <p className="font-medium text-nexo-white">Ventajas</p>
                  <ul className="mt-3 space-y-3">
                    {item.advantages.map((advantage) => (
                      <li key={advantage} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 text-nexo-cyan" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-5 text-sm leading-7 text-nexo-gray-400">{item.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-nexo-gray-800 bg-gradient-to-br from-nexo-dark to-nexo-gray-900 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Cómo trabajamos</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">No buscamos sumar piezas sueltas. Buscamos construir sistemas digitales coherentes.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-nexo-gray-300">
              Cuando una misma mirada articula diseño, tecnología, marketing y estructura, el proyecto gana consistencia, orden y valor comercial.
            </p>
          </div>
          <div className="grid gap-4">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-nexo-gray-800 bg-black/30 p-5">
                <div className="text-xs uppercase tracking-[0.28em] text-nexo-cyan">Paso {index + 1}</div>
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-nexo-gray-200">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brief" className="px-6 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-nexo-gray-800 bg-nexo-dark/90">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-nexo-gray-800 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-nexo-cyan">Contacto inicial</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Si sentís que tu marca puede comunicar mejor, vender mejor o verse más sólida, podemos ayudarte.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-nexo-gray-300">
                Podemos acompañarte desde una landing puntual hasta una estrategia digital más integral, según lo que tu negocio necesite hoy.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-nexo-gray-300">
                <div className="rounded-2xl border border-nexo-gray-800 bg-black/30 p-4">Ideal para proyectos de branding, web, ecommerce, contenido, campañas o automatización.</div>
                <div className="rounded-2xl border border-nexo-gray-800 bg-black/30 p-4">También podemos ayudarte a definir formato, alcance y tecnología si todavía no lo tenés del todo claro.</div>
              </div>
            </div>
            <div className="p-8 lg:p-10">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan" placeholder="Nombre" />
                <input className="rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan" placeholder="Empresa" />
                <input className="rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan md:col-span-2" placeholder="Email" />
                <input className="rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan md:col-span-2" placeholder="Sitio actual (si ya existe)" />
                <select className="rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan md:col-span-2">
                  <option>¿Qué necesitás resolver?</option>
                  <option>Branding / identidad visual</option>
                  <option>Landing page</option>
                  <option>Web institucional</option>
                  <option>Ecommerce</option>
                  <option>Contenido / pauta digital</option>
                  <option>Automatización / CRM / integración</option>
                  <option>No lo tengo del todo definido</option>
                </select>
                <textarea className="min-h-36 rounded-2xl border border-nexo-gray-800 bg-black/30 px-4 py-3 text-sm text-nexo-white outline-none transition focus:border-nexo-cyan md:col-span-2" placeholder="Contanos en qué etapa está tu proyecto, qué querés mejorar y si ya tenés alguna tecnología o referencia en mente." />
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-nexo-gray-400">Podés usar este bloque como base visual y luego conectarlo con tu formulario real, WhatsApp o CRM.</p>
                <Button className="bg-nexo-cyan px-6 text-nexo-black hover:bg-nexo-cyan/90">
                  Enviar consulta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
