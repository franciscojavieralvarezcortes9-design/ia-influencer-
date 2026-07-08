import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Smartphone, 
  Printer, 
  Heart, 
  Clock, 
  Star, 
  Menu, 
  X, 
  Award,
  ArrowUpRight,
  Eye,
  Instagram,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

// Main cover image generated earlier
// @ts-ignore
import coverImage from './assets/images/calendar_cover_1783539619861.jpg';

// Interface definitions
interface MonthDetail {
  id: number;
  name: string;
  theme: string;
  description: string;
  atmosphere: string;
  outfit: string;
  location: string;
  landscapeDescription: string;
  daysInMonth: number;
  startingDay: number; // 0 for Sunday, 1 for Monday, etc.
}

// Data for the 12 months with their Chilean themes and couture details
const monthsData: MonthDetail[] = [
  {
    id: 1,
    name: "Enero",
    theme: "Verano Viña",
    description: "Atardeceres infinitos frente al Océano Pacífico, capturando la brisa marina y la silueta más ardiente, provocativa y hot de Sofía.",
    atmosphere: "Cálido atardecer costero, luces doradas y una tensión sensual única frente al mar.",
    outfit: "Micro-bikini dorado metálico de alta costura complementado con un kimono de seda traslúcido abierto.",
    location: "Playa Cochoa y acantilados de Reñaca, Viña del Mar.",
    landscapeDescription: "La costa central chilena se tiñe de tonos naranjas y púrpuras, enmarcando la elegancia costera.",
    daysInMonth: 31,
    startingDay: 4 // Thursday for Jan 2026
  },
  {
    id: 2,
    name: "Febrero",
    theme: "Carnaval",
    description: "La vibrante energía del Carnaval del Norte Grande, fusionando sensualidad explícita, misterio y folclor chileno.",
    atmosphere: "Furia festiva, destellos de fuego y poses sumamente sugerentes bajo el cielo estrellado.",
    outfit: "Traje de pedrería fina dorada que revela sus curvas con sutileza y audacia, antifaz veneciano de encaje.",
    location: "Alrededores de San Pedro de Atacama y valles nortinos.",
    landscapeDescription: "El desierto alto y las formaciones rocosas se llenan de colores tradicionales con un enfoque editorial.",
    daysInMonth: 28,
    startingDay: 0 // Sunday for Feb 2026
  },
  {
    id: 3,
    name: "Marzo",
    theme: "Vendimia Maipo",
    description: "El renacer de la tierra en los viñedos... donde Sofía posa de forma sumamente íntima, sensual e irresistible entre las parras.",
    atmosphere: "Luz cálida de media tarde, tonos verdes y uva en contraste con la piel de Sofía bañada en sol.",
    outfit: "Vestido de satén de seda verde esmeralda ultra-ceñido con escote vertiginoso y aberturas laterales extremas.",
    location: "Viñedos históricos del Valle del Maipo.",
    landscapeDescription: "Hileras perfectas de vides que se extienden hasta las faldas imponentes de la Cordillera de los Andes.",
    daysInMonth: 31,
    startingDay: 0 // Sunday for Mar 2026
  },
  {
    id: 4,
    name: "Abril",
    theme: "Otoño Lagos",
    description: "Los bosques templados del sur se transforman, sirviendo de escenario para un encuentro otoñal súper íntimo y coqueto.",
    atmosphere: "Neblina matutina suave, colores ocre nostálgicos y una calidez corporal irresistible.",
    outfit: "Lencería fina color encaje ocre bajo un abrigo largo de cachemira abierto de par en par, botas de cuero altas.",
    location: "Riberas del Lago Llanquihue y bosques de Frutillar.",
    landscapeDescription: "Hojas de roble y coigüe cayendo suavemente sobre la superficie cristalina del lago sureño.",
    daysInMonth: 30,
    startingDay: 3 // Wednesday for Apr 2026
  },
  {
    id: 5,
    name: "Mayo",
    theme: "Café Santiago",
    description: "La sofisticación urbana se une a la mística de la lluvia en Santiago, revelando el lado más chic y seductor de nuestra musa.",
    atmosphere: "Reflejos de luces de neón en el pavimento mojado, ambiente cálido y provocativo puertas adentro.",
    outfit: "Conjunto de punto premium color crema semi-translúcido que delinea perfectamente su figura sin dejar nada a la imaginación.",
    location: "Barrio Lastarria y miradores del cerro Santa Lucía, Santiago.",
    landscapeDescription: "La arquitectura clásica de Santiago mezclada con la modernidad del distrito financiero bajo las nubes.",
    daysInMonth: 31,
    startingDay: 5 // Friday for May 2026
  },
  {
    id: 6,
    name: "San Juan",
    theme: "Noche de Brujas",
    description: "Inspirado en los mitos chilenos de San Juan: una noche de hechizos, sensualidad desatada y miradas hipnotizantes.",
    atmosphere: "Contraste salvaje entre el fuego ardiente de la fogata y la fría noche austral, chispas doradas flotando.",
    outfit: "Corsé negro de encaje traslúcido de alta costura y detalles dorados, dejando al descubierto su silueta más hot.",
    location: "Costa de Chiloé y sus misteriosas playas oscuras.",
    landscapeDescription: "Cabañas de madera tradicionales y el mar pacífico cubierto por la bruma mística invernal.",
    daysInMonth: 30,
    startingDay: 1 // Monday for Jun 2026
  },
  {
    id: 7,
    name: "Julio",
    theme: "Valle Nevado",
    description: "Sensualidad extrema en la imponente Cordillera de los Andes, donde la fría nieve resalta las curvas ardientes de Sofía.",
    atmosphere: "Luz solar invernal deslumbrante, cielo azul cobalto y la calidez de su piel en contraste con el hielo.",
    outfit: "Micro-bikini de invierno con ribetes de piel blanca y parka acolchada dorada totalmente abierta.",
    location: "Centro de ski Valle Nevado, a 3.000 metros de altura.",
    landscapeDescription: "Los picos más altos de América del Sur cubiertos por un manto blanco perfecto bajo un sol radiante.",
    daysInMonth: 31,
    startingDay: 3 // Wednesday for Jul 2026
  },
  {
    id: 8,
    name: "Agosto",
    theme: "Atacama Infinito",
    description: "Tributo al desierto más árido del mundo, capturando a nuestra musa en su faceta más salvaje, libre y desinhibida.",
    atmosphere: "Cielos nocturnos estrellados sin igual, la Vía Láctea iluminando de forma mágica su piel bronceada.",
    outfit: "Vestido de gasa dorada ultra-translúcido que vuela con el viento, revelando de forma explícita y artística sus encantos.",
    location: "Valle de la Luna, San Pedro de Atacama.",
    landscapeDescription: "Formaciones de sal y arcilla que asemejan la superficie de la luna, iluminadas por la luz estelar.",
    daysInMonth: 31,
    startingDay: 6 // Saturday for Aug 2026
  },
  {
    id: 9,
    name: "Septiembre",
    theme: "18 de Septiembre",
    description: "La tradición chilena se vuelve irresistible. Un homenaje patrio con un nivel de coquetería y sensualidad nunca antes visto.",
    atmosphere: "Luz festiva de primavera, banderas al viento y una pasión criolla sumamente encendida.",
    outfit: "Corsé de cuero repujado negro ultra-ajustado con detalles de oro y una minifalda con aberturas atrevidas.",
    location: "Un viñedo colonial en el Valle de Colchagua.",
    landscapeDescription: "Casonas de adobe chilenas, espuelas de plata brillando al sol y campos verdes que despiertan.",
    daysInMonth: 30,
    startingDay: 2 // Tuesday for Sep 2026
  },
  {
    id: 10,
    name: "Octubre",
    theme: "Primavera Seducción",
    description: "El estallido de la primavera en Chile despierta el lado más coqueto, floreciente y sensual de nuestra musa digital.",
    atmosphere: "Luz matutina suave y dorada, pétalos flotando y una atmósfera íntima de ensueño.",
    outfit: "Lingerie fina de encaje floral ultra-provocativo en tonos pastel y detalles dorados.",
    location: "Parque Quinta Normal e históricos jardines de Santiago.",
    landscapeDescription: "Árboles floridos en su máximo esplendor con pétalos que caen alfombrando el suelo.",
    daysInMonth: 31,
    startingDay: 4 // Thursday for Oct 2026
  },
  {
    id: 11,
    name: "Noviembre",
    theme: "Desierto Florido",
    description: "Inspirado en el brote milagroso del Desierto Florido, retratando la belleza más pura, ardiente y prohibida.",
    atmosphere: "Contraste vibrante de flores silvestres púrpuras sobre arena dorada y el calor del mediodía nortino.",
    outfit: "Cadenas corporales doradas y joyería fina que adornan estratégicamente su cuerpo sobre encaje invisible.",
    location: "Llanos floridos de la Región de Atacama.",
    landscapeDescription: "Un mar infinito de garras de león y suspiros de campo floreciendo una vez cada década.",
    daysInMonth: 30,
    startingDay: 0 // Sunday for Nov 2026
  },
  {
    id: 12,
    name: "Navidad veraniega",
    theme: "Navidad de Fuego",
    description: "La magia de las festividades navideñas celebradas bajo el sol, junto a una piscina infinity con el lado más hot de Sofía.",
    atmosphere: "Noche de verano estrellada, luces cálidas reflejadas en el agua y un brindis sumamente íntimo.",
    outfit: "Micro-bikini rojo terciopelo navideño con sutiles tirantes dorados, derrochando sensualidad absoluta.",
    location: "Terraza de lujo con piscina infinity en los cerros de Zapallar.",
    landscapeDescription: "La costa del pacífico de fondo, palmeras iluminadas y el agua cristalina reflejando las luces festivas.",
    daysInMonth: 31,
    startingDay: 2 // Tuesday for Dec 2026
  }
];

// High-quality reviews
const reviewsData = [
  {
    id: 1,
    name: "Francisco Rojas",
    location: "Santiago, Chile",
    rating: 5,
    comment: "La calidad de las fotos es una locura. Imprimí los meses de Julio y Agosto en tamaño póster para mi oficina y la resolución de 300 DPI se ve impecable. El nivel de detalle de la IA y el vestuario es del más alto nivel.",
    verified: true
  },
  {
    id: 2,
    name: "Ignacio Valenzuela",
    location: "Viña del Mar, Chile",
    rating: 5,
    comment: "Sigo a la modelo en TikTok y este calendario superó mis expectativas. Cada mes tiene una vibra única que representa muy bien los lugares icónicos de nuestro país. El pago fue inmediato y la descarga me llegó al correo en un minuto.",
    verified: true
  },
  {
    id: 3,
    name: "María José Allende",
    location: "Concepción, Chile",
    rating: 5,
    comment: "Soy fotógrafa de moda y me fascina el arte digital. El trabajo estético puesto en la iluminación, los paisajes chilenos y el estilismo de la modelo es magnífico. Funciona perfecto como inspiración y fondos de pantalla para todos mis dispositivos.",
    verified: true
  },
  {
    id: 4,
    name: "Esteban Cáceres",
    location: "La Serena, Chile",
    rating: 5,
    comment: "¡Excelente! Un gran trabajo de arte conceptual. El precio de $7 USD es una ganga absoluta para el nivel de sensualidad y calidad Ultra HD de estas fotos exclusivas. Muy recomendado, la compra por Hotmart es instantánea y totalmente segura.",
    verified: true
  }
];

// Interactive FAQ Data
const faqData = [
  {
    id: 1,
    question: "¿Cómo recibo el calendario una vez realizado el pago?",
    answer: "El proceso es 100% automático y seguro gracias a Hotmart. Al completar tu compra, recibirás un correo de forma inmediata con el enlace de descarga para acceder a todos los archivos en alta resolución."
  },
  {
    id: 2,
    question: "¿Qué archivos y formatos incluye la descarga?",
    answer: "Recibirás: 1) El calendario completo con fotos exclusivas y sin censura en formato PDF Interactivo de alta gama. 2) 12 imágenes Ultra HD (300 DPI) independientes listas para imprimir en gran tamaño o para visualización privada. 3) Wallpapers móviles optimizados de las fotos más sensuales para tu smartphone."
  },
  {
    id: 3,
    question: "¿Puedo mandar a imprimir el calendario físicamente?",
    answer: "¡Sí, absolutamente! Todas las imágenes han sido exportadas a 300 DPI en formato de color optimizado. Puedes llevar los archivos JPG a cualquier imprenta local y hacer un calendario físico de pared, de escritorio o pósteres individuales de excelente calidad."
  },
  {
    id: 4,
    question: "¿Cuáles son las formas de pago disponibles?",
    answer: "A través de Hotmart, puedes pagar de forma 100% segura con Tarjetas de Crédito, Tarjetas de Débito, PayPal, MACH o Webpay (Chile). Tu información está completamente encriptada y protegida."
  },
  {
    id: 5,
    question: "¿De verdad la modelo es una Inteligencia Artificial?",
    answer: "Sí, es una musa digital chilena creada con tecnologías de IA generativa avanzadas de última generación. Cada sesión fotográfica, vestuario y paisaje combina fotografía real de paisajes chilenos con diseño digital de moda para lograr un acabado hiperrealista de nivel editorial internacional."
  }
];

// Custom Canvas Component for Subtle Gold Dust Particles
const GoldParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = Math.min(60, Math.floor(width / 30));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if goes off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = 0.1;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.speedX = -p.speedX;
        }

        // Draw particle with luxury gold color gradient glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = '#c9a84c';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10 opacity-60" 
    />
  );
};

export default function App() {
  // States
  const [selectedMonth, setSelectedMonth] = useState<MonthDetail | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 14, seconds: 35 });

  // Purchase Link
  const purchaseLink = "https://pay.hotmart.com/N106661585W";

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to create infinite urgency loop
          return { hours: 2, minutes: 14, seconds: 35 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-gold-500 selection:text-black">
      {/* Interactive Floating Gold Particles */}
      <GoldParticlesCanvas />

      {/* Top Banner - Urgency Alert */}
      <div className="bg-gradient-to-r from-gold-900/40 via-gold-700/60 to-gold-900/40 border-b border-gold-500/20 py-2.5 px-4 text-center text-xs md:text-sm relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-medium">
          <span className="flex items-center gap-1.5 text-gold-200 tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            EDICIÓN LIMITADA CHILE 2026:
          </span>
          <p className="text-zinc-200">
            El precio de lanzamiento subirá pronto. ¡Últimas unidades con descuento!
          </p>
          <div className="flex items-center gap-1 text-gold-300 font-mono text-xs font-bold border border-gold-500/30 px-2 py-0.5 rounded bg-black/40">
            <Clock className="w-3.5 h-3.5" />
            <span>{String(countdown.hours).padStart(2, '0')}h</span> :
            <span>{String(countdown.minutes).padStart(2, '0')}m</span> :
            <span>{String(countdown.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-900 z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Brand/Logo */}
          <a href="#" className="flex flex-col items-start select-none">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] font-black text-white leading-none">
              MUSA<span className="text-gold-500 font-normal">.IA</span>
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold-400 font-serif uppercase mt-0.5">
              Chilean Editorial Art
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-zinc-400">
            <a href="#hero" className="hover:text-gold-300 transition-colors">El Calendario</a>
            <a href="#meses" className="hover:text-gold-300 transition-colors">12 Meses</a>
            <a href="#detalles" className="hover:text-gold-300 transition-colors">Características</a>
            <a href="#opiniones" className="hover:text-gold-300 transition-colors">Seguidores</a>
            <a href="#faq" className="hover:text-gold-300 transition-colors">Preguntas</a>
          </nav>

          {/* Desktop Right Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-black font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded shadow-lg shadow-gold-500/10 transition-all duration-300 animate-shine"
              id="nav-cta"
            >
              Comprar Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 p-2 focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0d0d0d] border-b border-zinc-900 text-center py-6 px-4 flex flex-col gap-5 text-sm uppercase tracking-widest font-medium text-zinc-400"
            >
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 py-1">El Calendario</a>
              <a href="#meses" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 py-1">12 Meses</a>
              <a href="#detalles" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 py-1">Características</a>
              <a href="#opiniones" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 py-1">Seguidores</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 py-1">Preguntas</a>
              <hr className="border-zinc-800 my-1" />
              <a 
                href={purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-3.5 rounded-md mt-2 block animate-shine"
              >
                OBTENER MI CALENDARIO
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content (Left) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 bg-gold-900/30 border border-gold-500/30 text-gold-400 font-serif text-xs md:text-sm uppercase tracking-[0.25em] px-4 py-1.5 rounded-full backdrop-blur-sm shadow-inner shadow-gold-500/5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Edición Limitada Chile 2026
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                CALENDARIO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-200">
                  EXCLUSIVO 2026
                </span>
              </h1>

              <p className="font-serif text-lg md:text-xl xl:text-2xl text-gold-200 font-light tracking-[0.08em] border-l-2 border-gold-500 pl-4 py-1">
                12 meses · 12 fotos ultra exclusivas · El contenido más hot y sensual
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl"
            >
              La colección más atrevida y sensual que reúne el misticismo, la belleza natural chilena y la lencería fina más sexy. Un recorrido mensual de alta gama con fotos de contenido exclusivo y hot de nuestra icónica musa digital. Un portafolio sumamente íntimo, provocativo y sin censura, optimizado para impresión física o visualización privada en dispositivos.
            </motion.p>

            {/* Price Cards and Dynamic Urgency */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-lg shadow-xl shadow-black/80"
            >
              <div className="flex items-baseline justify-between flex-wrap gap-4 border-b border-zinc-800 pb-5">
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-1">Precio de Lanzamiento</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl md:text-5xl font-black text-white">$7</span>
                    <span className="text-lg text-gold-400 font-bold font-mono">USD</span>
                    <span className="text-sm text-zinc-500 line-through ml-2">$45 USD</span>
                  </div>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ahorra 84% Hoy
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-5 text-center text-xs text-zinc-400">
                <div className="space-y-1">
                  <span className="block font-bold text-white text-sm">Ultra HD</span>
                  <span>Formato 300 DPI</span>
                </div>
                <div className="space-y-1 border-x border-zinc-800">
                  <span className="block font-bold text-white text-sm">Inmediato</span>
                  <span>Descarga Directa</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-bold text-white text-sm">De Colección</span>
                  <span>Piezas Únicas</span>
                </div>
              </div>

              {/* Main Glowing Call To Action */}
              <a 
                href={purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 text-black font-extrabold text-sm md:text-base uppercase tracking-widest py-4.5 px-8 rounded-xl shadow-xl shadow-gold-500/10 hover:shadow-gold-500/30 transition-all duration-300 hover:scale-[1.02] transform active:scale-100 animate-shine"
                id="hero-cta"
              >
                OBTENER MI CALENDARIO
              </a>
              
              <div className="flex items-center justify-center gap-5 mt-4 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-gold-500" /> Pago 100% Seguro
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-gold-500" /> Garantía de Acceso
                </span>
              </div>
            </motion.div>

            {/* Quick Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 text-xs md:text-sm text-zinc-400 font-light"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-zinc-900 flex items-center justify-center text-[10px] text-gold-400 font-serif font-bold">M</div>
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-zinc-900 flex items-center justify-center text-[10px] text-gold-400 font-serif font-bold">I</div>
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-zinc-900 flex items-center justify-center text-[10px] text-gold-400 font-serif font-bold">A</div>
              </div>
              <div>
                <span className="text-white font-medium block">Fenómeno de Redes Sociales</span>
                <span>Musa digital con <strong className="text-gold-400 font-semibold">+40,000 seguidores</strong> en TikTok y millones de vistas.</span>
              </div>
            </motion.div>
          </div>

          {/* Magazine Cover Visual Showcase (Right) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-sm sm:max-w-md w-full"
            >
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-800 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              {/* Main Photo Card */}
              <div className="relative bg-[#0d0d0d] border border-gold-500/40 p-3 sm:p-4 rounded-[1.8rem] shadow-2xl shadow-black">
                
                {/* Image Wrap */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.2rem] group">
                  <img 
                    src={coverImage} 
                    alt="Portada del Calendario 2026 de Modelo IA chilena" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                  {/* Editorial Accent Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-black/80 backdrop-blur-md text-[9px] sm:text-xs text-gold-300 font-serif tracking-widest px-3 py-1 rounded border border-gold-500/20">
                      VOGUE STYLE
                    </span>
                    <span className="bg-gold-500 text-black text-[9px] sm:text-xs font-black tracking-wider px-2 py-0.5 rounded shadow">
                      HD 300 DPI
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[10px] tracking-widest uppercase text-gold-400 block mb-1">DICIEMBRE 2025 RELEASE</span>
                    <h3 className="font-serif text-lg sm:text-xl text-white tracking-widest uppercase font-semibold">
                      CHILE EN SU MÁXIMA EXPRESIÓN
                    </h3>
                  </div>
                </div>

                {/* Subtitle Spec Bar */}
                <div className="mt-4 flex justify-between items-center px-2 text-zinc-400 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" /> Doce Meses Completos
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-gold-500" /> Optimizado Móvil
                  </span>
                </div>
              </div>

              {/* Decorative Luxury Label Underneath */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black border border-zinc-800 text-gold-300 px-6 py-2 rounded-full text-xs font-serif uppercase tracking-[0.25em] whitespace-nowrap shadow-xl">
                ★ MODELO CHILENA EXCLUSIVA ★
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Social Proof Stats Banner */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-16 px-4 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold-400">12</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Destinos de Chile</p>
          </div>
          <div className="space-y-1 border-l border-zinc-900">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold-400">300 DPI</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Resolución de Imprenta</p>
          </div>
          <div className="space-y-1 border-l border-zinc-900">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold-400">+40K</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Seguidores en TikTok</p>
          </div>
          <div className="space-y-1 border-l border-zinc-900">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold-400">100%</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Descarga Inmediata</p>
          </div>
        </div>
      </section>

      {/* Main 12 Months Interactive Grid */}
      <section id="meses" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold-500 font-serif text-xs md:text-sm uppercase tracking-[0.3em] block">
            EL VIAJE ARTÍSTICO
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider uppercase">
            12 Meses · 12 Paisajes Chilenos
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto my-4" />
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Cada mes ha sido cuidadosamente diseñado para fusionar la belleza natural chilena con la moda contemporánea de alta costura. Explora cada temática a continuación.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {monthsData.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: (m.id % 4) * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedMonth(m)}
              className="group bg-[#0e0e0e]/90 border border-zinc-800 hover:border-gold-500/40 rounded-2xl p-5 text-left cursor-pointer transition-all duration-300 relative shadow-lg hover:shadow-gold-500/5 select-none"
            >
              {/* Inner Luxury Card Layout */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-serif text-xs text-gold-500 tracking-widest block uppercase">Mes {String(m.id).padStart(2, '0')}</span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide mt-1">{m.name}</h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-800 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 flex items-center justify-center text-zinc-500 group-hover:text-gold-400 transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Theme and location display */}
              <div className="space-y-2 mb-6 border-l border-gold-500/20 pl-3.5 py-1">
                <span className="text-xs font-serif uppercase tracking-widest text-gold-300 font-bold block">{m.theme}</span>
                <span className="text-xs text-zinc-400 font-light block">{m.location}</span>
              </div>

              <p className="text-zinc-500 group-hover:text-zinc-300 text-xs md:text-sm line-clamp-2 leading-relaxed font-light transition-colors duration-300">
                {m.description}
              </p>

              {/* Explore action badge */}
              <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[11px] uppercase tracking-widest text-zinc-500 group-hover:text-gold-400 transition-colors duration-300 font-semibold">
                <span>Ver Previsualización</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Month Detail Interactive Modal */}
      <AnimatePresence>
        {selectedMonth && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0c0c0c] border border-gold-500/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black relative grid grid-cols-1 md:grid-cols-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMonth(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-gold-500/20 text-white hover:text-gold-400 w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 hover:border-gold-500/30 transition-all duration-300 z-10"
                aria-label="Cerrar"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Editorial Styled Preview Frame */}
              <div className="md:col-span-5 bg-gradient-to-b from-[#141414] to-[#080808] p-6 sm:p-8 flex flex-col justify-between border-r border-zinc-900">
                <div>
                  <span className="font-serif text-[10px] text-gold-500 tracking-[0.3em] uppercase block mb-1">
                    Colección Digital 2026
                  </span>
                  <span className="font-serif text-sm text-zinc-500 tracking-widest block uppercase font-medium">
                    HOJA EDITORIAL DE ARTE
                  </span>
                </div>

                {/* Simulated Calendar Visual Card */}
                <div className="my-8 relative aspect-[3/4] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-4 shadow-xl flex flex-col justify-between select-none">
                  {/* Subtle Background Theme Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
                  
                  {/* Month header */}
                  <div className="relative z-10 flex justify-between items-start border-b border-zinc-800/60 pb-2">
                    <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase">{selectedMonth.name}</span>
                    <span className="font-serif text-sm font-bold text-gold-400 font-mono">2026</span>
                  </div>

                  {/* Simulated model watermark design */}
                  <div className="relative z-10 flex-grow flex items-center justify-center py-4">
                    <div className="text-center p-3 rounded bg-black/60 border border-gold-500/20 backdrop-blur-sm">
                      <p className="font-serif text-[10px] tracking-widest text-gold-400 uppercase">MUSA DIGITAL CHILE</p>
                      <p className="text-[9px] text-zinc-400 italic mt-1 font-serif">"{selectedMonth.theme}"</p>
                    </div>
                  </div>

                  {/* Calendar Matrix Simulation */}
                  <div className="relative z-10">
                    <div className="grid grid-cols-7 gap-1 text-[7px] text-center text-zinc-500 border-t border-zinc-900 pt-2 pb-1 font-bold">
                      <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[7px] text-center font-mono text-zinc-400">
                      {/* Blank days for calendar alignment */}
                      {Array.from({ length: selectedMonth.startingDay }).map((_, i) => (
                        <span key={`blank-${i}`} />
                      ))}
                      {/* Days list */}
                      {Array.from({ length: selectedMonth.daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const isSunday = (dayNum + selectedMonth.startingDay - 1) % 7 === 0;
                        return (
                          <span 
                            key={`day-${dayNum}`} 
                            className={`py-0.5 rounded ${isSunday ? 'text-rose-500 font-semibold' : ''} ${dayNum === 1 || dayNum === 15 ? 'bg-gold-500/20 text-gold-300 font-bold' : ''}`}
                          >
                            {dayNum}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="text-zinc-500 text-[10px] text-center font-mono">
                  SANTIAGO · VIÑA · COCHEO · VALLE NEVADO · ATACAMA
                </div>
              </div>

              {/* Right Side: Copy, Specs & Actions */}
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div className="space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="bg-gold-900/30 text-gold-300 text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full border border-gold-500/20">
                      Mes {String(selectedMonth.id).padStart(2, '0')} · Temática Nacional
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white tracking-wide mt-3">
                      {selectedMonth.name}
                    </h2>
                    <h3 className="font-serif text-gold-400 text-lg tracking-wider font-medium">
                      {selectedMonth.theme}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                    {selectedMonth.description}
                  </p>

                  {/* Production specs details */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-3.5">
                    <h4 className="text-xs uppercase tracking-widest text-gold-400 font-bold border-b border-zinc-900 pb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> Ficha de Producción Editorial
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-zinc-500 block">Locación Fotográfica</span>
                        <span className="text-zinc-300 font-medium">{selectedMonth.location}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Atmósfera y Luz</span>
                        <span className="text-zinc-300 font-medium">{selectedMonth.atmosphere}</span>
                      </div>
                      <div className="sm:col-span-2 border-t border-zinc-900 pt-2 mt-1">
                        <span className="text-zinc-500 block">Estilismo y Vestuario</span>
                        <span className="text-zinc-300 font-medium">{selectedMonth.outfit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-gold-500" />
                    <span>Resolución UHD compatible para impresión física de alta fidelidad.</span>
                  </div>
                </div>

                {/* Checkout CTA in Modal */}
                <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-grow text-center bg-gradient-to-r from-gold-600 to-gold-400 text-black font-extrabold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:scale-[1.02] transition-all duration-300 animate-shine flex items-center justify-center gap-2"
                  >
                    OBTENER TODO EL CALENDARIO <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className="w-full sm:w-auto text-center border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-medium text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300"
                  >
                    Volver
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Details Section */}
      <section id="detalles" className="py-24 bg-zinc-950 border-y border-zinc-900 px-4 md:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Spec Copy (Left) */}
            <div className="space-y-8 text-left">
              <span className="text-gold-500 font-serif text-xs md:text-sm uppercase tracking-[0.3em] block">
                CONTENIDO PREMIUM +18
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase leading-tight">
                ¿Qué incluye tu descarga de fotos exclusivas?
              </h2>
              <div className="w-16 h-[1px] bg-gold-500 my-4" />
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                Este calendario digital es el portafolio más hot y sensual de Sofía. Contiene fotografías explícitamente diseñadas para elevar la temperatura y lucir su espectacular figura en los paisajes más bellos de Chile.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Spec 1 */}
                <div className="p-5 bg-[#0d0d0d] border border-zinc-900 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-900/30 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Listo para Imprenta</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    12 imágenes independientes exportadas en formato JPG premium a 300 DPI (puntos por pulgada). Ideal para imprimir calendarios físicos de pared, cuadros o pósteres gigantes de colección.
                  </p>
                </div>

                {/* Spec 2 */}
                <div className="p-5 bg-[#0d0d0d] border border-zinc-900 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-900/30 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Formatos Móviles</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Incluye una colección de fondos de pantalla verticales Ultra HD optimizados para las pantallas de smartphones (iPhone, Samsung, Xiaomi) para que luzcas tu musa favorita a diario.
                  </p>
                </div>

                {/* Spec 3 */}
                <div className="p-5 bg-[#0d0d0d] border border-zinc-900 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-900/30 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Descarga Inmediata</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Sin tiempos de espera ni gastos de envío internacionales. Al confirmar el pago en Hotmart, recibes el enlace de descarga instantáneo en tu correo electrónico.
                  </p>
                </div>

                {/* Spec 4 */}
                <div className="p-5 bg-[#0d0d0d] border border-zinc-900 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-900/30 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Acceso de por Vida</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Tus archivos digitales estarán disponibles para descarga ilimitada. Puedes volver a descargarlos siempre que cambies de dispositivo o quieras reimprimir tus fotos.
                  </p>
                </div>

              </div>
            </div>

            {/* Spec Visual Banner (Right) */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gold-500/5 rounded-3xl filter blur-3xl" />
              <div className="relative bg-[#0d0d0d] border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl shadow-black space-y-6 text-left">
                <span className="font-serif text-xs text-gold-400 uppercase tracking-widest block font-bold">
                  ★ DETALLES TÉCNICOS DE ALTA GAMA ★
                </span>
                
                <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3">
                  Especificaciones del Portafolio
                </h3>

                <ul className="space-y-4 text-xs text-zinc-400">
                  <li className="flex justify-between items-center py-2 border-b border-zinc-900">
                    <span className="text-zinc-500 font-light">Resolución de Imagen</span>
                    <span className="text-zinc-100 font-mono font-bold">3840 x 5120 píxeles</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-zinc-900">
                    <span className="text-zinc-500 font-light">Densidad de Píxeles</span>
                    <span className="text-zinc-100 font-mono font-bold">300 DPI (Calidad de Imprenta)</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-zinc-900">
                    <span className="text-zinc-500 font-light">Formato de Descarga</span>
                    <span className="text-zinc-100 font-mono font-bold">ZIP (JPGs) + PDF Interactivo</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-zinc-900">
                    <span className="text-zinc-500 font-light">Modelo Principal</span>
                    <span className="text-zinc-100 font-medium">Sofía (Musa IA Chilena)</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-zinc-900">
                    <span className="text-zinc-500 font-light">Temática Geográfica</span>
                    <span className="text-zinc-100 font-medium">Paisajes del Territorio Chileno</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-zinc-500 font-light">Plataforma de Distribución</span>
                    <span className="text-zinc-100 font-bold flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-gold-500" /> HOTMART
                    </span>
                  </li>
                </ul>

                <div className="bg-gold-950/20 border border-gold-500/20 p-4 rounded-xl text-center">
                  <p className="text-gold-200 text-xs font-medium font-serif tracking-wide leading-relaxed">
                    "Una fusión espectacular entre el realismo de la inteligencia artificial y el orgullo de la geografía de Chile."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof and TikTok followers */}
      <section id="opiniones" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold-500 font-serif text-xs md:text-sm uppercase tracking-[0.3em] block">
            EL RESPALDO DE NUESTRA COMUNIDAD
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider uppercase">
            +40K Seguidores en TikTok
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto my-4" />
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Nuestra musa IA ha cautivado a miles de personas en redes sociales con su realismo y elegancia. Mira lo que opinan quienes ya tienen su calendario oficial.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviewsData.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0e0e0e]/80 border border-zinc-900 rounded-2xl p-6 sm:p-8 text-left relative space-y-4 shadow-lg hover:border-gold-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">{rev.name}</h4>
                  <span className="text-xs text-zinc-500 font-light">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-gold-950/20 text-gold-400 border border-gold-500/20 px-2 py-1 rounded text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                  <span className="font-bold">Comprador Verificado</span>
                </div>
              </div>

              {/* Stars rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light italic">
                "{rev.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Callout social */}
        <div className="bg-gradient-to-r from-gold-950/40 via-zinc-950 to-gold-950/40 border border-gold-500/20 rounded-2xl p-6 md:p-8 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Súmate a la tendencia internacional de arte digital. Sofía representa la vanguardia del modelaje generativo, logrando un realismo estético que compite en las portadas de las revistas de moda más importantes del mundo.
          </p>
          <div className="flex justify-center items-center gap-2 text-gold-400 font-serif uppercase tracking-widest text-xs font-bold">
            <Instagram className="w-4 h-4 text-gold-500" /> COMUNIDAD DE ARTE DIGITAL EXCLUSIVO
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-950 border-t border-zinc-900 px-4 md:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold-500 font-serif text-xs md:text-sm uppercase tracking-[0.3em] block">
              DUDAS FRECUENTES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide uppercase">
              Preguntas Frecuentes
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mx-auto my-4" />
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => {
              const isOpen = activeFAQ === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border border-zinc-850 bg-[#0d0d0d] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 text-white hover:text-gold-300 focus:outline-none transition-colors"
                    id={`faq-btn-${faq.id}`}
                  >
                    <span className="font-serif text-sm sm:text-base font-medium tracking-wide">
                      {faq.question}
                    </span>
                    <span className="text-gold-500 font-bold">
                      {isOpen ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-zinc-400 text-xs sm:text-sm leading-relaxed font-light border-t border-zinc-900 text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer / Exit Intent Hero CTA */}
      <footer className="relative bg-black border-t border-zinc-900 pt-24 pb-16 px-4 md:px-8 z-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-gold-500 font-serif text-xs md:text-sm uppercase tracking-[0.4em] block">
              ÚLTIMA OPORTUNIDAD DE ADQUISICIÓN
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              Viste tus días con <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-200">
                ELEGANCIA Y ARTE
              </span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
              Descarga hoy mismo el Calendario Digital 2026. Recuerda que es una edición exclusiva que subirá pronto de precio. Unidades limitadas con tarifa promocional.
            </p>
          </div>

          {/* Pricing Box & Call To Action */}
          <div className="bg-zinc-950/80 border border-gold-500/20 max-w-lg mx-auto rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
            <p className="text-gold-400 font-serif text-xs uppercase tracking-[0.25em] font-bold mb-2">
              Precio Promocional de Lanzamiento
            </p>
            <div className="flex justify-center items-baseline gap-2 mb-6">
              <span className="font-serif text-5xl md:text-6xl font-black text-white">$7</span>
              <span className="text-xl text-gold-500 font-bold font-mono">USD</span>
              <span className="text-sm text-zinc-500 line-through ml-3">$45 USD</span>
            </div>

            <a 
              href={purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 text-black font-extrabold text-sm sm:text-base uppercase tracking-widest py-4.5 px-8 rounded-xl shadow-xl shadow-gold-500/10 hover:shadow-gold-500/30 transition-all duration-300 hover:scale-[1.02] transform active:scale-100 animate-shine"
              id="footer-cta"
            >
              OBTENER MI CALENDARIO
            </a>

            <div className="flex justify-between items-center mt-6 text-[10px] text-zinc-500 border-t border-zinc-900 pt-4">
              <span>Precio sube pronto · Unidades limitadas</span>
              <span>Distribución Oficial Hotmart</span>
            </div>
          </div>

          {/* Legal / Brand notes */}
          <div className="space-y-6 pt-8 border-t border-zinc-900 text-zinc-600 text-[11px] font-light max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center uppercase tracking-widest text-[9px] font-semibold text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500/60" /> Compra 100% Protegida
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-gold-500/60" /> Servidores Encriptados SSL
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500/60" /> Acceso Post-Pago Seguro
              </span>
            </div>
            
            <p className="leading-relaxed text-zinc-500">
              MUSA.IA © {new Date().getFullYear()} - Todos los derechos reservados. Este sitio y el calendario digital distribuido a través de Hotmart son obras de arte digital protegidas por derechos de autor internacionales. Está prohibida su reventa o distribución no autorizada.
            </p>
            <p className="text-zinc-600">
              Hotmart es una plataforma de venta y distribución de productos digitales. La aparición de marcas comerciales, plataformas de pago o de redes sociales (como TikTok) se realiza con fines informativos y descriptivos de la distribución y seguimiento social del proyecto.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
