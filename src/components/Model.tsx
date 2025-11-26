import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  const { scene } = useGLTF("/notebook.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/notebook.glb");
