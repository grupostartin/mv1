import { useEffect, useRef, useState } from "react";
import { BookOpen, Video, Rocket, PenTool, Film, Scissors, BarChart3, Bot } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const Services = () => {
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

  const services = [
    {
      icon: BookOpen,
      title: "Storytelling",
      description: "Transformamos a essência da sua marca em narrativas envolventes que conectam e convertem.",
    },
    {
      icon: Video,
      title: "Videomaker",
      description: "Produção completa de vídeos profissionais que capturam a atenção e geram resultados.",
    },
    {
      icon: Rocket,
      title: "Gestor de Tráfego",
      description: "Campanhas otimizadas que maximizam seu ROI e alcançam o público certo no momento certo.",
    },
    {
      icon: PenTool,
      title: "Copywriter",
      description: "Textos persuasivos que convertem visitantes em clientes fiéis da sua marca.",
    },
    {
      icon: Film,
      title: "Roteirista",
      description: "Roteiros criativos e estratégicos para vídeos, anúncios e conteúdos audiovisuais.",
    },
    {
      icon: Scissors,
      title: "Editor de Vídeo",
      description: "Edição profissional que transforma gravações em conteúdo de alto impacto visual.",
    },
    {
      icon: BarChart3,
      title: "Análise e Estratégia",
      description: "Insights baseados em dados para guiar decisões e maximizar resultados.",
    },
    {
      icon: Bot,
      title: "Automação WhatsApp/Instagram",
      description: "Automatize seu atendimento e vendas com inteligência e personalização.",
    },
  ];

  return (
    <section id="serviços" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Nossos Serviços</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções completas de marketing digital para transformar sua presença online
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={index} delay={index * 0.1} direction="up" className="h-full">
                <div
                  className="group bg-card border border-border hover:border-primary rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer h-full"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:glow-red-sm transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-background transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
