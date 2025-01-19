// @ts-nocheck
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three-stdlib";
import { gsap } from "gsap";
import FormComponent from "./FormComponent";


function StarField() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Model() {
  const gltf = useLoader(GLTFLoader, "/environment.glb");
  const modelRef = useRef();

  useEffect(() => {
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [gltf]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={2}
      castShadow
    />
  );
}

function Horoscope() {
  const [showForm, setShowForm] = useState(true);

  function CameraAnimation() {
    const { camera, scene } = useThree();

    useEffect(() => {
      // Initial camera position
      camera.position.set(15, 20, 15);
      camera.lookAt(0, 0, 0);

      const timeline = gsap.timeline({
        onComplete: () => setShowForm(true),
      });

      // Phase 1: Circular rotation from above
      timeline.to(camera.position, {
        duration: 5.3,
        x: 15 * Math.cos(Math.PI * 2),
        z: 15 * Math.sin(Math.PI * 2),
        ease: "power2.inOut",
      });

      // Phase 2: Lower down while continuing rotation
      timeline.to(camera.position, {
        duration: 4,
        y: 2.5,
        ease: "power2.inOut",
      });

      // Phase 3: Move to viewing position with integrated shake
      timeline.to(camera.position, {
        duration: 2.7,
        x: 0,
        y: 2,
        z: 8,
        ease: "power2.inOut",
      });
    }, [camera, scene]);

    return null;
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas
        shadows
        style={{ backgroundColor: "#000000" }}
        camera={{ fov: 45 }}
      >
        <fog attach="fog" args={["#000000", 10, 50]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.5}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />

        <Suspense fallback={null}>
          <Environment files="/spaceSky.exr" background />
          <Model />
          <StarField />
          <CameraAnimation />
        </Suspense>

        <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.5} />
      </Canvas>

      {/* Form overlay with fade-in animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <FormComponent />
        </div>
      </div>
    </div>
  );
}

export default Horoscope;
