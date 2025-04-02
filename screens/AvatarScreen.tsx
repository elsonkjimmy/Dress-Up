import React, { useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const MODEL_URL = "https://models.readyplayer.me/64a9375f41e918001d8a333c.glb";
console.log("MODEL_URL:", MODEL_URL);

const AvatarScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const HTML = `
  <!DOCTPEY html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style>
      body { margin: 0; overflow: hidden; background: #f0f0f0; }
      #loading { 
        position: absolute; 
        top: 50%; left: 50%; 
        transform: translate(-50%, -50%); 
        font-family: Arial; 
        color: #666;
      }
    </style>
  </head>
  <body>66
    <div id="loading">Chargement du modèle 3D...</div>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/GLTFLoader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js"></script>
    
    <script>
      const MODEL_URL = '${MODEL_URL}';

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 3;
      
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      document.body.appendChild(renderer.domElement);

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const loader = new THREE.GLTFLoader();
      loader.load(
        MODEL_URL,
        (gltf) => {
          const model = gltf.scene;
          model.position.y = -1;
          scene.add(model);
          document.getElementById('loading').style.display = 'none';
          window.ReactNativeWebView.postMessage('MODEL_LOADED');
        },
        undefined,
        (err) => {
          document.getElementById('loading').textContent = 'Erreur de chargement';
          window.ReactNativeWebView.postMessage('LOAD_ERROR:' + err.message);
        }
      );

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    </script>
  </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erreur : {error}</Text>
        </View>
      ) : (
        <>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Chargement de l'avatar...</Text>
            </View>
          )}

          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: HTML }}
            javaScriptEnabled={true}
            onMessage={(event) => {
              const message = event.nativeEvent.data;
              if (message === 'MODEL_LOADED') {
                setIsLoading(false);
              } else if (message.startsWith('LOAD_ERROR:')) {
                setError(message.replace('LOAD_ERROR:', ''));
                setIsLoading(false);
              }
            }}
            style={[styles.webview, isLoading && styles.hidden]}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  webview: { flex: 1 },
  hidden: { opacity: 0, height: 0 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});

export default AvatarScreen;
