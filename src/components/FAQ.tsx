import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealOnScroll } from "./RevealOnScroll";

const FAQ = () => {
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

  const faqs = [
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Os primeiros resultados podem aparecer já nas primeiras semanas, mas resultados consistentes e escaláveis geralmente são observados entre 60 e 90 dias. Tudo depende do seu nicho, investimento e objetivos específicos.",
    },
    {
      question: "Vocês trabalham com que tipos de negócios?",
      answer: "Trabalhamos com empresas de todos os portes e segmentos - desde pequenos empreendedores até grandes corporações. Nossa abordagem é sempre personalizada para atender as necessidades específicas de cada cliente.",
    },
    {
      question: "Preciso estar presente nas gravações?",
      answer: "Não necessariamente. Tudo depende do tipo de conteúdo. Podemos trabalhar com material existente, criar animações, usar locutores profissionais ou coordenar gravações remotas. Você decide o nível de envolvimento que funciona melhor para você.",
    },
    {
      question: "Como funciona o investimento?",
      answer: "Cada projeto é único, por isso criamos propostas personalizadas baseadas em seus objetivos e necessidades. Após uma reunião estratégica gratuita, apresentamos um plano completo com valores transparentes e resultados esperados.",
    },
    {
      question: "Vocês oferecem suporte contínuo?",
      answer: "Sim! Oferecemos suporte completo durante todo o projeto e além. Nosso time está sempre disponível para ajustes, otimizações e novas estratégias conforme seu negócio evolui.",
    },
    {
      question: "Posso cancelar o serviço a qualquer momento?",
      answer: "Sim, trabalhamos com contratos flexíveis. Queremos que você fique conosco porque está satisfeito com os resultados, não por estar preso a um contrato. Os termos específicos são sempre discutidos e acordados antes de iniciarmos.",
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll width="100%" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient-red">Perguntas Frequentes</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e processos
          </p>
        </RevealOnScroll>

        <RevealOnScroll width="100%" delay={0.2} className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 border-border hover:border-primary rounded-lg px-6 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FAQ;
