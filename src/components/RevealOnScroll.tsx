import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    className?: string;
}

export const RevealOnScroll = ({
    children,
    width = "fit-content",
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
}: RevealOnScrollProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const mainControls = useAnimation();
    const [isMobile, setIsMobile] = useState(false);

    // Detecta se é mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = () => {
        const distance = 75;
        let hidden: { opacity: number; x?: number; y?: number } = { opacity: 0 };

        switch (direction) {
            case "up":
                hidden = { opacity: 0, y: distance };
                break;
            case "down":
                hidden = { opacity: 0, y: -distance };
                break;
            case "left":
                hidden = { opacity: 0, x: distance };
                break;
            case "right":
                hidden = { opacity: 0, x: -distance };
                break;
            case "none":
                hidden = { opacity: 0 };
                break;
        }

        // Ajusta duração e delay para mobile (60% mais rápido)
        const adjustedDuration = isMobile ? duration * 0.4 : duration;
        const adjustedDelay = isMobile ? delay * 0.4 : delay;

        return {
            hidden,
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    duration: adjustedDuration,
                    delay: adjustedDelay,
                    ease: "easeOut",
                },
            },
        };
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={getVariants() as { hidden: Variant; visible: Variant }}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};
