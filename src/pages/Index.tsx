import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import QuemSomos from "@/components/QuemSomos";
import Services from "@/components/Services";
import Process from "@/components/Process";
import SuccessCases from "@/components/SuccessCases";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { GlobalGhostCanvas } from "@/components/GlobalGhostCanvas";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalGhostCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <QuemSomos />
        <Services />
        <Process />
        <SuccessCases />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
