import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} />
      <Suspense fallback={<div>Loading...</div>}>
        <Avatar position={[0, -1, 0]} scale={[1, 1, 1]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
