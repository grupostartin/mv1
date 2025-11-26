import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GhostModel } from "./GhostModel";
import { Suspense } from "react";

export const GlobalGhostCanvas = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <GhostModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};
