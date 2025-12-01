import { useEffect, useRef, useState } from "react";
import { Search, Target, Clapperboard, LineChart } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";
import { motion } from "framer-motion";

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Descoberta",
      description: "Mergulhamos profundamente no seu negócio, entendendo objetivos, público e diferenciais.",
    },
    {
      number: "02",
      icon: Target,
      title: "Estratégia",
      description: "Criamos um plano personalizado com objetivos claros, métricas e cronograma definidos.",
    },
    {
      number: "03",
      icon: Clapperboard,
      title: "Produção",
      description: "Nossa equipe especializada cria conteúdo excepcional alinhado à sua identidade.",
    },
    {
      number: "04",
      icon: LineChart,
      title: "Otimização",
      description: "Analisamos resultados continuamente e ajustamos estratégias para máximo desempenho.",
    },
  ];

  return (
    <section id="processo" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-20" />

      {/* Animated Chart Background */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid lines */}
            <g opacity="0.1">
              {[...Array(5)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 150}
                  x2="1200"
                  y2={i * 150}
                  stroke="#ef4444"
                  strokeWidth="1"
                />
              ))}
              {[...Array(7)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 200}
                  y1="0"
                  x2={i * 200}
                  y2="600"
                  stroke="#ef4444"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Animated Chart Line */}
            <motion.path
              d="M 0 550 Q 150 500, 300 450 T 600 300 T 900 150 T 1200 50"
              fill="none"
              stroke="url(#chartGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Area under the curve */}
            <motion.path
              d="M 0 550 Q 150 500, 300 450 T 600 300 T 900 150 T 1200 50 L 1200 600 L 0 600 Z"
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
            />

            {/* Animated dots on the line */}
            {[
              { x: 0, y: 550 },
              { x: 300, y: 450 },
              { x: 600, y: 300 },
              { x: 900, y: 150 },
              { x: 1200, y: 50 },
            ].map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#ef4444"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 0.8 + (i * 0.4) }}
              >
                <animate
                  attributeName="r"
                  values="6;8;6"
                  dur="4s"
                  repeatCount="indefinite"
                  begin={`${0.8 + (i * 0.4)}s`}
                />
              </motion.circle>
            ))}

            {/* Gradients */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[60]">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Nosso Processo</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma metodologia testada e aprovada para transformar sua presença digital
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <RevealOnScroll key={index} delay={index * 0.2} direction="up" className="relative h-full">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.2), ease: "easeInOut" }}
                    style={{ originX: 0 }}
                    className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -z-10"
                  />
                )}

                <div className="bg-card border-2 border-border group-hover:border-primary rounded-lg p-6 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center mb-4">
                    <div className="text-5xl font-display font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {step.number}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:glow-red-sm transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-background transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Differentials Section */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            "Resultados Comprovados",
            "Equipe Especializada",
            "Processo Transparente",
            "Atendimento Personalizado",
          ].map((item, index) => (
            <RevealOnScroll key={index} delay={0.4 + (index * 0.1)} direction="up">
              <div
                className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center hover:bg-primary/10 hover:border-primary transition-all duration-300 h-full flex flex-col items-center justify-center"
              >
                <div className="text-primary text-2xl mb-2">✓</div>
                <p className="font-medium text-foreground">{item}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
