import { useEffect, useRef, useState } from "react";
import { Building2, Users, TrendingUp } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GhostModel } from "./GhostModel";
import { Suspense } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate progress: 0 when top of section hits bottom of viewport, 1 when bottom of section hits top of viewport
      // Adjust start/end points as needed for better timing

      // We want the animation to start when the section is partially visible
      const startOffset = windowHeight * 0.8; // Start when section is 20% up the screen
      const endOffset = windowHeight * 0.2;   // End when section is mostly scrolled past

      const totalDistance = sectionHeight + windowHeight;
      const currentPos = windowHeight - rect.top;

      let progress = currentPos / totalDistance;

      // Normalize to 0-1 range more tightly if needed, or just use raw progress
      // Let's try to map it so 0 is "just entering" and 1 is "just leaving"

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <GhostModel scrollProgress={scrollProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

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
