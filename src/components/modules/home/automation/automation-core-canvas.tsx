"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AutomationCoreCanvas({ progress }: { progress: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 420;
    const height = mount.clientHeight || 420;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const isDark = document.documentElement.classList.contains("dark");
    const accent = new THREE.Color(isDark ? "#a78bfa" : "#6d28d9");
    const cyan = new THREE.Color(isDark ? "#67e8f9" : "#22d3ee");
    const indigo = new THREE.Color(isDark ? "#818cf8" : "#4338ca");

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 1),
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.35,
        metalness: 0.55,
        roughness: 0.28,
        flatShading: true,
      }),
    );
    scene.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.25, 0.025, 12, 96),
      new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.7 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.018, 12, 100),
      new THREE.MeshBasicMaterial({
        color: indigo,
        transparent: true,
        opacity: 0.45,
      }),
    );
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = 0.4;
    scene.add(ring2);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i += 1) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? cyan : accent,
          emissive: i % 2 === 0 ? cyan : accent,
          emissiveIntensity: 0.5,
          metalness: 0.2,
          roughness: 0.35,
        }),
      );
      nodes.push(node);
      scene.add(node);
    }

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5);
    const fill = new THREE.PointLight(accent.getHex(), 18, 12);
    fill.position.set(-2, 1, 2);
    scene.add(ambient, key, fill);

    let frame = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      if (disposed) return;
      frame = requestAnimationFrame(renderFrame);
      const t = clock.getElapsedTime();
      const p = progressRef.current;

      core.rotation.y = t * 0.35 + p * Math.PI * 1.4;
      core.rotation.x = Math.sin(t * 0.4) * 0.18 + p * 0.35;
      core.position.y = Math.sin(t * 0.7) * 0.08 + (p - 0.5) * 0.45;
      core.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.12);

      ring.rotation.z = t * 0.25 + p;
      ring2.rotation.z = -t * 0.18 - p * 0.6;

      nodes.forEach((node, index) => {
        const angle = t * 0.5 + (index / nodes.length) * Math.PI * 2 + p * 2.2;
        const radius = 1.85 + Math.sin(p * Math.PI + index) * 0.18;
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.2) * 0.35,
          Math.sin(angle) * radius * 0.55,
        );
      });

      camera.position.x = Math.sin(p * Math.PI) * 0.35;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    renderFrame();

    const onResize = () => {
      if (!mount) return;
      const nextW = mount.clientWidth || width;
      const nextH = mount.clientHeight || height;
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const material = obj.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
