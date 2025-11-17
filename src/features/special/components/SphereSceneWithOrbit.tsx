import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RotatingSphere: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    // 간단한 체크 패턴 텍스처 생성
    const texture = useRef(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'orange';
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = 'black';
        for (let i = 0; i < 64; i += 8) {
            ctx.fillRect(i, 0, 4, 64);
            ctx.fillRect(0, i, 64, 4);
        }
        return new THREE.CanvasTexture(canvas);
    })();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

// OrbitControls 직접 구현
const OrbitControls: React.FC<{ camera: THREE.Camera; domElement: HTMLDivElement }> = ({ camera, domElement }) => {
    const isDragging = useRef(false);
    const previous = useRef({ x: 0, y: 0 });

    const onMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        previous.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - previous.current.x;
        const deltaY = e.clientY - previous.current.y;
        previous.current = { x: e.clientX, y: e.clientY };

        camera.rotation.y -= deltaX * 0.005;
        camera.rotation.x -= deltaY * 0.005;
    };

    const onMouseUp = () => (isDragging.current = false);

    React.useEffect(() => {
        domElement.addEventListener('mousedown', onMouseDown);
        domElement.addEventListener('mousemove', onMouseMove);
        domElement.addEventListener('mouseup', onMouseUp);
        return () => {
            domElement.removeEventListener('mousedown', onMouseDown);
            domElement.removeEventListener('mousemove', onMouseMove);
            domElement.removeEventListener('mouseup', onMouseUp);
        };
    }, [domElement]);

    return null;
};

const SphereSceneWithOrbit: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    return (
        <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 0, 5] }} ref={cameraRef}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <RotatingSphere />
            </Canvas>
            {canvasRef.current && cameraRef.current && (
                <OrbitControls camera={cameraRef.current} domElement={canvasRef.current} />
            )}
        </div>
    );
};

export default SphereSceneWithOrbit;