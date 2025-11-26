import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button-variants";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Scene } from "./Scene";
import { motion } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 tech-grid opacity-30" />

      {/* Animated Chart Background (same as Process section) */}
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
            <g opacity="0.08">
              {[...Array(5)].map((_, i) => (
                <line
                  key={`hero-h-${i}`}
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
                  key={`hero-v-${i}`}
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
              stroke="url(#heroChartGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Area under the curve */}
            <motion.path
              d="M 0 550 Q 150 500, 300 450 T 600 300 T 900 150 T 1200 50 L 1200 600 L 0 600 Z"
              fill="url(#heroAreaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
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
                r="5"
                fill="#ef4444"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
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
              <linearGradient id="heroChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="heroAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient-red">Transforme Sua Marca</span>
              <br />
              <span className="text-foreground">em Autoridade Digital</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
              Sua história merece ser contada da forma certa
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToContact}
                className="w-full sm:w-auto hover:scale-105 transition-transform duration-300"
              >
                Solicitar Proposta
                <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="neon"
                size="xl"
                onClick={() => {
                  const element = document.getElementById("sobre");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto hover:scale-105 transition-transform duration-300"
              >
                Conheça a MV1
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
              <Scene />
            </Suspense>
          </motion.div>
        </div>

        {/* Floating particles effect - Optimized with CSS */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
