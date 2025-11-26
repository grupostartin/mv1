import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import wellingtonImg from "../assets/wellington.png";
import hillaryImg from "../assets/hillary.jpg";
import { RevealOnScroll } from "./RevealOnScroll";

const QuemSomos = () => {
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

  const socios = [
    {
      nome: "Hillary Viana",
      cargo: "CVO, Vídeo Maker & Estrategista",
      descricao: "Hillary é líder hands-on, com visão macro e operação orientada a performance. Hillary já levou clientes a faturarem +280 mil reais com suas estratégias. Atua como vídeo maker, estrategista de marketing e gestora criativa — comandando criação, direção e execução com o padrão MV1: profissional, inteligente e focado em resultado real.",
      foto: wellingtonImg,
    },
    {
      nome: "Wellington Júnior",
      cargo: "Sócio, Gestor de Tráfego & Estrategista",
      descricao: "Atualmente, sócio da agência de marketing MV1, Gestor de Tráfego, planejador e estrategista de marketing. Atuando na área desde 2019.",
      foto: hillaryImg,
    },
  ];

  return (
    <section id="quemsomos" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Quem Somos</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os profissionais por trás da MV1, apaixonados por criar conexões reais e resultados extraordinários.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {socios.map((socio, index) => (
            <RevealOnScroll key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
              <Card
                className="group bg-card border-2 border-border hover:border-primary rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2 h-full"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-primary/20 group-hover:border-primary transition-colors">
                      <AvatarImage src={socio.foto} alt={socio.nome} className="object-cover" />
                      <AvatarFallback className="text-2xl sm:text-3xl font-display font-bold bg-primary/10 text-primary">
                        {socio.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {socio.nome}
                  </CardTitle>
                  <p className="text-primary font-medium mt-2">{socio.cargo}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {socio.descricao}
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;

