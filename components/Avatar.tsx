import React, { useEffect, useState, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import RNFS from 'react-native-fs';

interface AvatarProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

const MODEL_URL = 'https://raw.githubusercontent.com/elsonkjimmy/Dress-Up/main/assets/models/avatar.glb';

const AvatarLoader: React.FC<{ modelPath: string; position: [number, number, number]; scale: [number, number, number] }> = ({ modelPath, position, scale }) => {
  const gltf = useLoader(GLTFLoader, modelPath); // ✅ Appelé sans condition

  return <primitive object={gltf.scene} position={position} scale={scale} />;
};

const Avatar: React.FC<AvatarProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const [modelPath, setModelPath] = useState<string | null>(null);

  useEffect(() => {
    const downloadModel = async () => {
      const localPath = `${RNFS.DocumentDirectoryPath}/avatar.glb`;

      try {
        const fileExists = await RNFS.exists(localPath);
        if (!fileExists) {
          console.log('Téléchargement du modèle...');
          await RNFS.downloadFile({ fromUrl: MODEL_URL, toFile: localPath }).promise;
          console.log('Modèle téléchargé avec succès !');
        }

        setModelPath(localPath);
      } catch (error) {
        console.error('Erreur lors du téléchargement du modèle :', error);
      }
    };

    downloadModel();
  }, []);

  if (!modelPath) {
    return null;
  }  // Attendre que le modèle soit téléchargé

  return (
    <Suspense fallback={null}>
      <AvatarLoader modelPath={modelPath} position={position} scale={scale} />
    </Suspense>
  );
};

export default Avatar;
