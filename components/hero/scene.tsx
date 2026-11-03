"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Html, PerformanceMonitor } from "@react-three/drei";
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
  const sizes = base.map(() => 0.016 + rand() * 0.012);
  const phases = base.map(() => rand() * Math.PI * 2);
  return { base, links, sizes, phases };
}

type Palette = { node: THREE.Color; hub: THREE.Color; line: THREE.Color; core: THREE.Color; lineOpacity: number };

function usePalette(): Palette {
  const isDark = useIsDark();
  return useMemo(
    () =>
      isDark
        ? { node: new THREE.Color("#64748b"), hub: new THREE.Color("#5eead4"), line: new THREE.Color("#94a3b8"), core: new THREE.Color("#5eead4"), lineOpacity: 0.1 }
        : { node: new THREE.Color("#94a3b8"), hub: new THREE.Color("#0f766e"), line: new THREE.Color("#64748b"), core: new THREE.Color("#0f766e"), lineOpacity: 0.12 },
    [isDark],
  );
}

// Skills orbit a ".NET" core on three tilted rings inside the ball, one ring per area.
const ORBITS = [
  { radius: 0.95, tilt: [1.15, 0.2, 0] as const, speed: 0.12, skills: ["C#", "ASP.NET Core", "Web API", "Entity Framework"] },
  { radius: 1.25, tilt: [-0.9, 0.5, 0.4] as const, speed: -0.09, skills: ["React", "Angular", "Razor", "MVC"] },
  { radius: 1.5, tilt: [0.35, -0.7, 0.9] as const, speed: 0.07, skills: [".NET MAUI", "Xamarin", "Azure", "SQL Server", "Git"] },
];
const ORBIT_TAGS = ORBITS.flatMap((o, r) => o.skills.map((name, k) => ({ name, ring: r, angle: (k / o.skills.length) * Math.PI * 2 + r })));

// The graph is deterministic and the scene is mounted once per page, so the graph and
// the per-frame scratch buffers live at module scope (mutated in useFrame, never in render).
const { base, links, sizes, phases } = buildGraph();
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

function Constellation({ scrollRef, labelRoot }: { scrollRef: React.RefObject<number>; labelRoot: React.RefObject<HTMLDivElement | null> }) {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const rings = useRef<(THREE.Group | null)[]>([]);
  const anchors = useRef<(THREE.Group | null)[]>([]);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const coreLabel = useRef<HTMLSpanElement>(null);
  const { pointer, camera } = useThree();

  useEffect(() => {
    const mesh = nodes.current;
    if (!mesh) return;
    base.forEach((_, i) => mesh.setColorAt(i, palette.node));
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
    g.rotation.y += delta * 0.04;
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

      const size = sizes[i];
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

    // Spin each ring; tags on the far side of the core fade back for depth.
    ORBITS.forEach((o, r) => {
      const ring = rings.current[r];
      if (ring) ring.rotation.z += delta * o.speed;
    });
    ORBIT_TAGS.forEach((_, i) => {
      const anchor = anchors.current[i];
      const tag = tags.current[i];
      if (!anchor || !tag) return;
      const z = anchor.getWorldPosition(tmp.p).z;
      const front = THREE.MathUtils.clamp((z + 1.3) / 2.6, 0, 1);
      tag.style.opacity = String((0.18 + front * 0.82) * (1 - scroll));
      tag.style.transform = `scale(${0.78 + front * 0.3})`;
      tag.style.zIndex = String(Math.round(front * 10));
    });
    if (coreLabel.current) coreLabel.current.style.opacity = String(1 - scroll);

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
      {ORBITS.map((o, r) => (
        <group key={r} rotation={o.tilt}>
          <group ref={(el) => { rings.current[r] = el; }}>
            <mesh>
              <torusGeometry args={[o.radius, 0.0045, 8, 160]} />
              <meshBasicMaterial color={palette.hub} transparent opacity={0.28} toneMapped={false} />
            </mesh>
            {ORBIT_TAGS.map((t, i) =>
              t.ring !== r ? null : (
                <group key={t.name} ref={(el) => { anchors.current[i] = el; }} position={[Math.cos(t.angle) * o.radius, Math.sin(t.angle) * o.radius, 0]}>
                  <mesh>
                    <sphereGeometry args={[0.022, 12, 12]} />
                    <meshBasicMaterial color={palette.hub} toneMapped={false} />
                  </mesh>
                  <Html center portal={labelRoot as React.RefObject<HTMLElement>} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
                    <span
                      ref={(el) => { tags.current[i] = el; }}
                      className="block -translate-y-3.5 whitespace-nowrap text-[12px] font-medium tracking-wide text-fg [text-shadow:0_0_6px_var(--bg),0_0_12px_var(--bg)]"
                    >
                      {t.name}
                    </span>
                  </Html>
                </group>
              ),
            )}
          </group>
        </group>
      ))}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={palette.core} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color={palette.core} transparent opacity={0.05} depthWrite={false} />
      </mesh>
      <Html center portal={labelRoot as React.RefObject<HTMLElement>} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
        <span ref={coreLabel} className="block font-display text-xl font-semibold tracking-tight text-fg">.NET</span>
      </Html>
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
        <Constellation scrollRef={scrollRef} labelRoot={wrapper} />
      </Canvas>
    </div>
  );
}
