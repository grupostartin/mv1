import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightHeroProps {
  text?: string;
  className?: string;
}

export const SpotlightHero = ({
  text = "Hero Title Spotlight",
  className,
}: SpotlightHeroProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[500px] w-full items-center justify-center bg-transparent px-4",
        className
      )}
    >
      <motion.h1
        className={cn(
          "text-4xl sm:text-6xl font-bold tracking-tighter md:text-8xl text-center",
          "bg-clip-text text-transparent",
          "pb-2" // Add padding bottom to avoid clipping descenders if any
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, #ff0000 0%, #990000 25%, #333333 50%)",
          backgroundSize: "200% auto",
        }}
        animate={{
          backgroundPosition: ["100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default SpotlightHero;
