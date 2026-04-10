"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 4000;
const SPHERE_RADIUS = 2.8;

function ParticleSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles distributed in a spherical volume
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical coordinate distribution (uniform on sphere surface + slight depth)
      const theta = Math.random() * Math.PI * 2; // azimuthal angle [0, 2π]
      const phi = Math.acos(2 * Math.random() - 1); // polar angle [0, π] — uniform distribution
      const r = SPHERE_RADIUS * (0.6 + Math.random() * 0.4); // radial depth within shell

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, []);

  // Per-particle sizes for organic variation
  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = 0.008 + Math.random() * 0.012; // range [0.008, 0.020]
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Slow auto-rotation on Y axis
    groupRef.current.rotation.y = t * 0.06;

    // Mouse-tracking tilt via smooth lerp
    const targetRotX = state.pointer.y * 0.5;
    const targetRotX2 = state.pointer.x * -0.4;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.015
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotX2,
      0.015
    );

    // Subtle per-particle shimmer via geometry attribute
    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      const posArray = geometry.attributes.position.array as Float32Array;
      const basePositions = positions;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Extremely subtle oscillation per particle
        const drift = Math.sin(t * 0.3 + i * 0.01) * 0.003;
        posArray[i3] = basePositions[i3] + drift;
        posArray[i3 + 1] = basePositions[i3 + 1] + drift * 0.5;
        posArray[i3 + 2] = basePositions[i3 + 2] + drift * 0.3;
      }
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.slice(), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f3ff"
          size={0.015}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
