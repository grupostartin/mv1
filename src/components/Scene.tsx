import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
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
    return (
        <div className="w-full h-[400px] lg:h-[600px]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                // Desabilita interação em todos os dispositivos - apenas visual
                className="pointer-events-none"
                // Garante que o CSS não bloqueie a ação nativa de arrastar a página
                style={{ touchAction: 'pan-y' }}
            >
                <Suspense fallback={null}>
                    <RotatingModel />
                    {/* OrbitControls removido - notebook não é mais interativo */}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}