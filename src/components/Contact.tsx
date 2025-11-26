import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const Contact = () => {
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

  const contactInfo = [
    {
      icon: PhoneCall,
      title: "Telefone",
      value: "+55 (11) 99999-0000",
      href: "tel:+5511999990000",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@mv1.com.br",
      href: "mailto:contato@mv1.com.br",
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "Belo Horizonte - MG • Atendemos todo o Brasil",
      href: "https://maps.google.com/?q=MV1+Belo+Horizonte+MG",
    },
  ];

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Pronto para crescer?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Fale com o nosso time</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Envie uma mensagem e agende uma reunião estratégica gratuita para descobrir como a MV1 pode impulsionar sua presença digital.
          </p>
        </RevealOnScroll>

        <RevealOnScroll width="100%" delay={0.2} className="space-y-8">
          <div className="bg-card border-2 border-border rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/5">
            <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
              Como podemos ajudar?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Conte para nós sobre seus desafios e objetivos. Vamos criar um plano personalizado com estratégias de conteúdo, mídia e performance que façam sentido para sua realidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <>
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">
                    {info.title}
                  </p>
                  <p className="text-lg font-display font-semibold text-foreground">
                    {info.value}
                  </p>
                </>
              );

              const isExternal = info.href.startsWith("http");
              return (
                <a
                  key={info.title}
                  href={info.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group bg-card border-2 border-border rounded-xl p-5 hover:border-primary transition-colors"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;

