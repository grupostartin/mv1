import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { Model } from "./Model";
import { Group } from "three";

function RotatingModel() {
    const ref = useRef<Group>(null);

    useFrame(() => {
        if (ref.current) {
            // Rotation based on scroll position with initial offset to face forward
            // -Math.PI / 2 should rotate it 90 degrees the other way from "backwards"
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-[400px] lg:h-[600px] pointer-events-none md:pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <RotatingModel />
                    <OrbitControls enableZoom={false} enableRotate={!isMobile} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
