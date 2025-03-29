import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import RNFS from 'react-native-fs';

const MODEL_URL = 'https://raw.githubusercontent.com/elsonkjimmy/Dress-Up/main/assets/models/avatar.glb';

export default function Scene() {
  const glRef = useRef<WebGLRenderingContext | null>(null);

  const handleContextCreate = async (gl: WebGLRenderingContext) => {
    glRef.current = gl;

    // Correction : Cast pour accéder à drawingBufferWidth et drawingBufferHeight
    const width = (gl as any).drawingBufferWidth;
    const height = (gl as any).drawingBufferHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ context: gl });
    renderer.setSize(width, height);

    // Téléchargement du modèle
    const localPath = `${RNFS.DocumentDirectoryPath}/avatar.glb`;
    const fileExists = await RNFS.exists(localPath);

    if (!fileExists) {
      await RNFS.downloadFile({ fromUrl: MODEL_URL, toFile: localPath }).promise;
    }

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(
      `file://${localPath}`,
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, -1, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);
      },
      undefined,
      (error) => console.error('Erreur de chargement GLTF:', error)
    );

    // Lumière
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.01;
      renderer.render(scene, camera);

      // Correction : Cast `(gl as any)` pour accéder à `endFrameEXP`
      (gl as any).endFrameEXP();
    };
    animate();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={handleContextCreate} />;
};
