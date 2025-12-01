import { useEffect, useRef, useState } from "react";
import { TrendingUp, Target, Award, Users, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const SuccessCases = () => {
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

  const cases = [
    {
      icon: TrendingUp,
      company: "Projeto Azevedo",
      industry: "Gestão de Tráfego",
      challenge: "Aumentar visibilidade e gerar leads qualificados através de campanhas estratégicas",
      solution: "Estratégia completa com 5 anúncios (2 de Engajamento, 2 de Reconhecimento e 1 de Tráfego) durante 3 dias, com investimento de R$120,00",
      results: [
        { metric: "17.247", label: "Leads alcançados" },
        { metric: "21.999", label: "Impressões" },
        { metric: "41%", label: "Aproveitamento" },
      ],
      details: [
        { label: "Seguidores conquistados", value: "180" },
        { label: "Cliques no link", value: "57 pessoas" },
        { label: "Visitas ao perfil", value: "18.820 pessoas" },
        { label: "Média de lucro por lead", value: "R$10.070,00" },
      ],
      color: "text-primary",
    },
    {
      icon: Target,
      company: "Laboratório Smart",
      industry: "Comércio de Celulares e Acessórios",
      challenge: "Problema de baixa conversão e visibilidade na rede",
      solution: "Tráfego estratégico com anúncios de aumento de visibilidade e conversão, utilizando gravação e roteirização direta com vídeos de alta conversão",
      results: [
        { metric: "7.554", label: "Alcance" },
        { metric: "41", label: "Clientes alcançados" },
        { metric: "4x", label: "ROI" },
      ],
      color: "text-primary",
    },
  ];

  return (
    <section id="cases" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[60]">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Resultados Reais
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Cases de Sucesso</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos desafios em resultados mensuráveis. Conheça alguns dos projetos que geraram impacto real para nossos clientes.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <RevealOnScroll key={index} delay={index * 0.2} direction="up" className="h-full">
                <div
                  className="group bg-card border-2 border-border hover:border-primary rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 h-full"
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:glow-red-sm transition-all duration-300 mb-4">
                      <Icon className="w-7 h-7 text-primary group-hover:text-background transition-colors" />
                    </div>
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {caseItem.company}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        {caseItem.industry}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Desafio:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseItem.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Solução:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseItem.solution}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-foreground mb-4">Resultados:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {caseItem.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center">
                          <p className={`text-lg sm:text-xl font-display font-bold ${caseItem.color} mb-1`}>
                            {result.metric}
                          </p>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;

