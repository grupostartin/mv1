import { Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-primary/20 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gradient-red mb-4">
              MV1
            </h3>
            <p className="text-muted-foreground mb-6">
              Marketing que gera resultados reais. Transformamos sua marca em autoridade digital.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:glow-red-sm transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:glow-red-sm transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:glow-red-sm transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-foreground mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              {["Sobre", "Serviços", "Processo", "Cases", "FAQ", "Contato"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>contato@mv1marketing.com.br</p>
              <p>(00) 0000-0000</p>
              <p>Belo Horizonte - MG</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              CNPJ: 63.662.214/0001-43
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MV1 - Marketing que gera resultados reais
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
