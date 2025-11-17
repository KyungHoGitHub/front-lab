import {FC, useRef} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {Mesh} from "three";

interface AtomProps {}


const Atom: React.FC<AtomProps> = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    // 애니메이션
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t;
            meshRef.current.rotation.x = t / 2;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
    );
};

// 테스트용 Canvas 컴포넌트
const AtomScene: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Atom />
        </Canvas>
    );
};

export default AtomScene;