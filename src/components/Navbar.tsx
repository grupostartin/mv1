import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button-variants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection("hero")} className="text-2xl sm:text-3xl font-display font-bold text-gradient-red hover:scale-110 transition-transform cursor-hover-trigger">
              MV1
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {["Sobre", "Quem Somos", "Serviços", "Processo", "Cases", "FAQ", "Contato"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", ""))}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-125 inline-block cursor-hover-trigger"
              >
                {item}
              </button>
            ))}
            <Button variant="hero" size="lg" onClick={() => scrollToSection("contato")} className="ml-4 hover:scale-105 transition-transform cursor-hover-trigger">
              Solicitar Proposta
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {["Sobre", "Quem Somos", "Serviços", "Processo", "Cases", "FAQ", "Contato"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", ""))}
                className="block w-full text-left px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-md font-medium"
              >
                {item}
              </button>
            ))}
            <Button variant="hero" size="lg" onClick={() => scrollToSection("contato")} className="w-full mt-4">
              Solicitar Proposta
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
