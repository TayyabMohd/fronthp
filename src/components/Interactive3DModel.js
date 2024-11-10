// src/components/Interactive3DModel.js
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Interactive3DModel() {
  const mesh = useRef();

  // Load texture from the public folder
  const texture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/33.jpeg");

  // Rotate the cube
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <>
      {/* Ambient Light to illuminate the model evenly */}
      <ambientLight intensity={0.3} />

      {/* Point Light to create depth */}
      <pointLight position={[5, 5, 5]} intensity={0.8} />

      {/* Cube with Texture */}
      <mesh ref={mesh} scale={[1.5, 1.5, 1.5]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}

export default Interactive3DModel;
