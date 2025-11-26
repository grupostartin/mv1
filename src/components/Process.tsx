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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
