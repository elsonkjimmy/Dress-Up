import React from 'react';
import { useGLTF } from '@react-three/drei';

interface AvatarProps {
  position: [number, number, number];
  scale: [number, number, number];
}

function Avatar({ position, scale }: AvatarProps) {
  const { scene } = useGLTF(require('../assets/models/avatar.glb')) as { scene: any };

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
    />
  );
}

export default Avatar;
