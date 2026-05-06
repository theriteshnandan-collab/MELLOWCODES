"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AbstractShape() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (outerRef.current && innerRef.current) {
      outerRef.current.rotation.x += delta * 0.2;
      outerRef.current.rotation.y += delta * 0.3;
      innerRef.current.rotation.x -= delta * 0.4;
      innerRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* Outer Glass Shell */}
      <mesh ref={outerRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial 
          backside
          thickness={1.5}
          roughness={0.05}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.1}
          anisotropy={0.5}
          color="#ffffff"
        />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh ref={innerRef} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#FF5C00" wireframe />
      </mesh>
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export default function Hero3DAsset() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#FF5C00" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#ffffff" />
        <Environment preset="studio" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
