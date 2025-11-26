import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

interface GhostModelProps {
    scrollProgress: number;
}

export function GhostModel({ scrollProgress }: GhostModelProps) {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF("/fantasma.glb");
    const { actions } = useAnimations(animations, group);

    // Play the first animation found, if any
    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const firstAction = Object.values(actions)[0];
            firstAction?.play();
        }
    }, [actions]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useFrame((state) => {
        if (!group.current) return;

        // Flutuação suave (apenas movimento vertical leve)
        group.current.position.y = (isMobile ? -4.0 : -0.5) + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        
        // Posição fixa no canto direito (ao lado do terceiro card)
        group.current.position.x = isMobile ? 0 : 4.5;
        group.current.position.z = 0;

        // Rotação fixa (olhando para frente)
        group.current.rotation.y = 1;
        group.current.rotation.x = 0;
    });

    return (
        <group ref={group}>
            <primitive object={scene} scale={isMobile ? 0.25 : 0.35} />
        </group>
    );
}

useGLTF.preload("/fantasma.glb");
