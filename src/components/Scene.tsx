import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { Model } from "./Model";
import { Group } from "three";

function RotatingModel() {
    const ref = useRef<Group>(null);

    useFrame(() => {
        if (ref.current) {
            // Mantém a rotação baseada no scroll
            ref.current.rotation.y = -Math.PI / 2 + window.scrollY * 0.002;
        }
    });

    return (
        <group ref={ref}>
            <Model position={[0, -1, 0]} scale={0.5} />
        </group>
    );
}

export function Scene() {
    // Mantemos o state apenas para lógica interna do R3F (como desativar OrbitControls)
    const [isMobile, setIsMobile] = useState(false); // Inicie como false para evitar hydration mismatch se usar SSR, ou true se preferir

    useEffect(() => {
        // Checagem inicial segura
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-[400px] lg:h-[600px]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                // SOLUÇÃO: Aplicar pointer-events diretamente no Canvas via Tailwind
                // Mobile (padrão): pointer-events-none (o toque passa direto p/ o site, permitindo scroll)
                // Desktop (lg): pointer-events-auto (permite interagir com mouse)
                className="pointer-events-none lg:pointer-events-auto"

                // Garante que o CSS não bloqueie a ação nativa de arrastar a página no mobile
                style={{ touchAction: 'pan-y' }}
            >
                <Suspense fallback={null}>
                    <RotatingModel />
                    {/* OrbitControls só ativa se não for mobile */}
                    {!isMobile && <OrbitControls enableZoom={false} />}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}