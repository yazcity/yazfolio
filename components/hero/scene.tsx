"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { useIsDark } from "../theme";

// ---------------------------------------------------------------------------
// "Systems constellation": nodes on a noisy sphere linked to their nearest
// neighbours. The pointer pushes nearby nodes away; scrolling expands and
// tilts the whole structure. All geometry is generated once; per-frame work is
// a single pass over ~110 nodes.
// ---------------------------------------------------------------------------

const NODE_COUNT = 110;
const LINKS_PER_NODE = 3;
const RADIUS = 2.15;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(7);
  const base: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = RADIUS * (0.78 + rand() * 0.34);
    base.push(new THREE.Vector3(Math.cos(theta) * r * jitter, y * jitter, Math.sin(theta) * r * jitter));
  }
  const pairs = new Set<string>();
  const links: [number, number][] = [];
  base.forEach((p, i) => {
    base
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!pairs.has(key)) {
          pairs.add(key);
          links.push([i, j]);
        }
      });
  });
  const sizes = base.map(() => 0.025 + rand() * 0.045);
  const phases = base.map(() => rand() * Math.PI * 2);
  // A handful of "core" nodes rendered larger and in the secondary accent.
  const hubs = new Set([3, 27, 51, 74, 98]);
  return { base, links, sizes, phases, hubs };
}

type Palette = { node: THREE.Color; hub: THREE.Color; line: THREE.Color; core: THREE.Color; lineOpacity: number };

function usePalette(): Palette {
  const isDark = useIsDark();
  return useMemo(
    () =>
      isDark
        ? { node: new THREE.Color("#5eead4"), hub: new THREE.Color("#c4b5fd"), line: new THREE.Color("#5eead4"), core: new THREE.Color("#8b7cf6"), lineOpacity: 0.22 }
        : { node: new THREE.Color("#0f766e"), hub: new THREE.Color("#6d28d9"), line: new THREE.Color("#0f766e"), core: new THREE.Color("#6d28d9"), lineOpacity: 0.28 },
    [isDark],
  );
}

// The graph is deterministic and the scene is mounted once per page, so the graph and
// the per-frame scratch buffers live at module scope (mutated in useFrame, never in render).
const { base, links, sizes, phases, hubs } = buildGraph();
const current = base.map((v) => v.clone());
const linePositions = new Float32Array(links.length * 6);
const tmp = {
  m: new THREE.Matrix4(),
  q: new THREE.Quaternion(),
  s: new THREE.Vector3(),
  p: new THREE.Vector3(),
  target: new THREE.Vector3(),
  ray: new THREE.Ray(),
  inv: new THREE.Matrix4(),
  closest: new THREE.Vector3(),
};

function Constellation({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const { pointer, camera } = useThree();

  useEffect(() => {
    const mesh = nodes.current;
    if (!mesh) return;
    base.forEach((_, i) => mesh.setColorAt(i, hubs.has(i) ? palette.hub : palette.node));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [palette]);

  useFrame((state, delta) => {
    const g = group.current;
    const mesh = nodes.current;
    const seg = lines.current;
    if (!g || !mesh || !seg) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current ?? 0;
    const k = 1 - Math.exp(-delta * 4); // frame-rate independent smoothing

    // Slow idle spin + pointer tilt + scroll tilt.
    g.rotation.y += delta * 0.06;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.25 + scroll * 0.6, k);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.x * 0.12, k);
    g.position.y = THREE.MathUtils.lerp(g.position.y, scroll * 1.2, k);
    const scale = 1 + scroll * 0.55;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, k));

    // Pointer ray in the group's local space, used to repel nearby nodes.
    tmp.ray.origin.copy(camera.position);
    tmp.ray.direction.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    g.updateMatrixWorld();
    tmp.inv.copy(g.matrixWorld).invert();
    tmp.ray.applyMatrix4(tmp.inv);

    for (let i = 0; i < base.length; i++) {
      const b = base[i];
      const breathe = 1 + Math.sin(t * 0.8 + phases[i]) * 0.025;
      tmp.target.copy(b).multiplyScalar(breathe);
      tmp.ray.closestPointToPoint(tmp.target, tmp.closest);
      const d = tmp.closest.distanceTo(tmp.target);
      if (d < 0.9) {
        const push = (1 - d / 0.9) ** 2 * 0.55;
        tmp.target.add(tmp.p.copy(tmp.target).sub(tmp.closest).normalize().multiplyScalar(push));
      }
      current[i].lerp(tmp.target, k);

      const size = sizes[i] * (hubs.has(i) ? 2.1 : 1);
      tmp.s.setScalar(size);
      tmp.m.compose(current[i], tmp.q, tmp.s);
      mesh.setMatrixAt(i, tmp.m);
    }
    mesh.instanceMatrix.needsUpdate = true;

    for (let l = 0; l < links.length; l++) {
      const [a, b] = links[l];
      const o = l * 6;
      linePositions[o] = current[a].x; linePositions[o + 1] = current[a].y; linePositions[o + 2] = current[a].z;
      linePositions[o + 3] = current[b].x; linePositions[o + 4] = current[b].y; linePositions[o + 5] = current[b].z;
    }
    seg.geometry.attributes.position.needsUpdate = true;

    const mat = seg.material as THREE.LineBasicMaterial;
    mat.opacity = palette.lineOpacity * (1 - scroll * 0.8);

    if (core.current) {
      core.current.rotation.x += delta * 0.15;
      core.current.rotation.y -= delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodes} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={palette.line} transparent opacity={palette.lineOpacity} depthWrite={false} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={palette.core} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const scrollRef = useRef(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Scroll progress across the hero (0 → 1).
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop rendering entirely when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [-0.7, 0, 6.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Keep pointer tracking alive across the whole page, not just the canvas.
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
        aria-hidden
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <AdaptiveDpr pixelated={false} />
        <Constellation scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
