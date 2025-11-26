import { useEffect, useRef, useState } from "react";
import { Building2, Users, TrendingUp } from "lucide-react";

const About = () => {
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

  const cards = [
    {
      icon: Building2,
      title: "Empresas de Todos os Portes",
      description: "Do pequeno empreendedor à grande corporação, criamos estratégias sob medida para seu negócio crescer.",
    },
    {
      icon: Users,
      title: "Conexões Reais",
      description: "Vamos além do conteúdo superficial. Criamos narrativas que conectam marcas a pessoas de verdade.",
    },
    {
      icon: TrendingUp,
      title: "Resultados Comprovados",
      description: "Nossa abordagem data-driven garante que cada ação gere impacto mensurável no seu crescimento.",
    },
  ];

  return (
    <section id="sobre" ref={sectionRef} className="py-16 sm:py-40 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Sobre a MV1</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Na MV1, não criamos apenas conteúdo. Criamos conexões reais entre sua marca e seu público.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`group bg-card border-2 border-border hover:border-primary rounded-lg p-6 lg:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
