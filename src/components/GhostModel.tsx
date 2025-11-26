import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

interface GhostModelProps {
    scrollProgress?: number;
}

export function GhostModel({ scrollProgress }: GhostModelProps) {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF("/fantasma.glb");
    const { actions } = useAnimations(animations, group);
    const [currentSection, setCurrentSection] = useState<'none' | 'sobre' | 'processo'>('none');
    const [sectionProgress, setSectionProgress] = useState(0);

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

    // Detectar qual seção está visível e calcular o progresso
    useEffect(() => {
        const handleScroll = () => {
            const sobreSection = document.getElementById('sobre');
            const processoSection = document.getElementById('processo');
            
            if (!sobreSection || !processoSection) return;

            const windowHeight = window.innerHeight;
            const sobreRect = sobreSection.getBoundingClientRect();
            const processoRect = processoSection.getBoundingClientRect();

            // Verificar se está na seção "Sobre"
            if (sobreRect.top < windowHeight && sobreRect.bottom > 0) {
                setCurrentSection('sobre');
                const totalDistance = sobreRect.height + windowHeight;
                const scrolled = windowHeight - sobreRect.top;
                const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
                setSectionProgress(progress);
            }
            // Verificar se está na seção "Processo"
            else if (processoRect.top < windowHeight && processoRect.bottom > 0) {
                setCurrentSection('processo');
                const totalDistance = processoRect.height + windowHeight;
                const scrolled = windowHeight - processoRect.top;
                const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
                setSectionProgress(progress);
            }
            // Não está em nenhuma seção
            else {
                setCurrentSection('none');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Chamada inicial

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animação baseada na seção atual
    useFrame((state) => {
        if (!group.current) return;

        // Posições baseadas em mobile/desktop
        const startX = isMobile ? 0 : 10;
        const midX = isMobile ? 0 : 4.5;
        const startY = isMobile ? -10 : -0.5;
        const midY = isMobile ? -4.0 : -0.5;
        const endY = isMobile ? -14 : -10;

        let targetX = midX;
        let targetY = midY;
        let visible = true;

        if (currentSection === 'none') {
            visible = false;
        } else {
            // Entrada (0 - 0.2)
            if (sectionProgress < 0.2) {
                const t = sectionProgress / 0.2;
                const eased = 1 - Math.pow(1 - t, 3);
                targetX = startX + (midX - startX) * eased;
                targetY = startY + (midY - startY) * eased;
            }
            // Permanência (0.2 - 0.8)
            else if (sectionProgress < 0.8) {
                targetX = midX;
                targetY = midY;
            }
            // Saída (0.8 - 1.0)
            else {
                const t = (sectionProgress - 0.8) / 0.2;
                const eased = t * t * t;
                targetX = midX;
                targetY = midY + (endY - midY) * eased;
            }
        }

        // Suavizar movimento (lerp)
        group.current.position.x += (targetX - group.current.position.x) * 0.1;
        group.current.position.y += (targetY - group.current.position.y) * 0.1;
        group.current.position.z = 0;

        // Visibilidade - Desabilitado temporariamente
        group.current.visible = false;

        // Rotação fixa
        group.current.rotation.y = 1;
        group.current.rotation.x = 0;
        
        // Flutuação sutil
        const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
        group.current.position.y += breathe * 0.01;
    });

    return (
        <group ref={group}>
            <primitive object={scene} scale={isMobile ? 0.25 : 0.35} />
        </group>
    );
}

useGLTF.preload("/fantasma.glb");
