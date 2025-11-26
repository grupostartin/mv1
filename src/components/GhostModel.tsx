import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo, useState } from "react";
import { Group } from "three";
import * as THREE from "three";

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

    const curve = useMemo(() => {
        if (isMobile) {
            // Narrower path for mobile
            const p0 = new THREE.Vector3(0, 5, 0);
            const p1 = new THREE.Vector3(-0.5, 0.5, 0.5);
            const p2 = new THREE.Vector3(0, -0.5, 1);
            const p3 = new THREE.Vector3(0.5, 0.5, 0.5);
            const p4 = new THREE.Vector3(0, -5, -1);
            return new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]);
        } else {
            // Original wide path for desktop
            const p0 = new THREE.Vector3(0, 5, 0);
            const p1 = new THREE.Vector3(-2, 0.5, 1);
            const p2 = new THREE.Vector3(0, -0.5, 2);
            const p3 = new THREE.Vector3(2, 0.5, 1);
            const p4 = new THREE.Vector3(0, -5, -2);
            return new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]);
        }
    }, [isMobile]);

    useFrame((state) => {
        if (!group.current) return;

        // Toggle visibility based on scroll progress
        // No mobile, só aparece quando está mais dentro da seção (threshold maior)
        const visibilityThreshold = isMobile ? 0.15 : 0.05;
        const visible = scrollProgress > visibilityThreshold && scrollProgress < 1.1;
        group.current.visible = visible;

        if (!visible) return;

        // Clamp progress for position calculation
        const t = Math.max(0, Math.min(1, scrollProgress));

        const targetPos = new THREE.Vector3();
        curve.getPoint(t, targetPos);

        // Add floating motion to the target
        // Slower frequency (1.5) and smaller amplitude (0.1) for "light" floating
        targetPos.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.1;

        // Smoothly move towards target
        group.current.position.lerp(targetPos, 0.1);

        // Look ahead
        const lookAtPos = new THREE.Vector3();
        curve.getPoint(Math.min(1, t + 0.05), lookAtPos);
        group.current.lookAt(lookAtPos);
    });

    return (
        <group ref={group}>
            <primitive object={scene} scale={isMobile ? 0.18 : 0.28} />
        </group>
    );
}

useGLTF.preload("/fantasma.glb");
