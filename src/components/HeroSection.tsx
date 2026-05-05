import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const WOMAN_IMG = "https://cdn.poehali.dev/projects/b27d4f0c-6def-4241-ac4c-beb0f90bc7f8/files/a80c1782-25f4-40ba-81b8-80a84a1e1ed1.jpg"
const MAN_IMG = "https://cdn.poehali.dev/projects/b27d4f0c-6def-4241-ac4c-beb0f90bc7f8/files/97ebe9a1-2181-4946-bee0-78ef4f7ab44f.jpg"

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null)

  const navItems = [
    { name: "Главная", href: "#hero" },
    { name: "О бренде", href: "#mission" },
    { name: "Коллекции", href: "#community" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Магазин", href: "#join" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">

      {/* Ken-Burns animations */}
      <style>{`
        @keyframes kenburns-left {
          0%   { transform: scale(1.12) translate(2%, 1%); }
          50%  { transform: scale(1.19) translate(-1.5%, -2%); }
          100% { transform: scale(1.12) translate(2%, 1%); }
        }
        @keyframes kenburns-right {
          0%   { transform: scale(1.12) translate(-2%, -1%); }
          50%  { transform: scale(1.19) translate(1.5%, 2%); }
          100% { transform: scale(1.12) translate(-2%, -1%); }
        }
        .kenburns-left  { animation: kenburns-left  10s ease-in-out infinite; }
        .kenburns-right { animation: kenburns-right 12s ease-in-out infinite; }
      `}</style>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 md:p-8">
        <div className="text-white font-bold text-xl tracking-wider drop-shadow-lg">LUXHISTORY</div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white hover:text-gray-300 transition-colors duration-300 font-medium tracking-wide pb-1 group drop-shadow"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-0 bg-black/95 z-40 md:hidden flex flex-col items-center justify-center space-y-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-white text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      {/* Split Screen */}
      <div className="flex h-full">

        {/* LEFT — Для неё */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-pointer"
          animate={{ flex: hoveredSide === "left" ? 1.35 : hoveredSide === "right" ? 0.65 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-cover bg-center kenburns-left"
            style={{ backgroundImage: `url('${WOMAN_IMG}')` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

          {/* Divider line */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30 z-10" />

          {/* LuxHistory chest label */}
          <div className="absolute z-10 pointer-events-none" style={{ bottom: "37%", left: "50%", transform: "translateX(-50%)" }}>
            <span className="text-black font-normal select-none whitespace-nowrap" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
              LuxHistory
            </span>
          </div>

          {/* Label top */}
          <motion.div
            className="absolute top-28 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: hoveredSide === "left" ? 1 : 0.6, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-white/80 text-xs tracking-[0.3em] font-light uppercase">Женская коллекция</span>
          </motion.div>

          {/* Bottom CTA */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 z-10">
            <motion.button
              className="px-10 py-3 border border-white text-white text-sm font-semibold tracking-widest uppercase backdrop-blur-sm bg-white/10 hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Для неё
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT — Для него */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-pointer"
          animate={{ flex: hoveredSide === "right" ? 1.35 : hoveredSide === "left" ? 0.65 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-cover bg-center kenburns-right"
            style={{ backgroundImage: `url('${MAN_IMG}')` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

          {/* LuxHistory chest label */}
          <div className="absolute z-10 pointer-events-none" style={{ bottom: "37%", left: "50%", transform: "translateX(-50%)" }}>
            <span className="text-white font-normal select-none whitespace-nowrap" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
              LuxHistory
            </span>
          </div>

          {/* Label top */}
          <motion.div
            className="absolute top-28 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: hoveredSide === "right" ? 1 : 0.6, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-white/80 text-xs tracking-[0.3em] font-light uppercase">Мужская коллекция</span>
          </motion.div>

          {/* Bottom CTA */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 z-10">
            <motion.button
              className="px-10 py-3 border border-white text-white text-sm font-semibold tracking-widest uppercase backdrop-blur-sm bg-white/10 hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Для него
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Center brand label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <motion.div
          className="text-center"
          animate={{ opacity: hoveredSide ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-2xl leading-none">
            LUX<br />HISTORY
          </h1>
        </motion.div>
      </div>

    </div>
  )
}