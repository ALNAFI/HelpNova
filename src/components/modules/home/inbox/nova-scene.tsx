"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { NovaExpression } from "@/components/modules/home/inbox/nova-scroll-context";

function expressionParams(expression: NovaExpression) {
  switch (expression) {
    case "curious":
      return { headTilt: 0.18, eyePulse: 1.15, armSwing: 0.25 };
    case "listening":
      return { headTilt: -0.12, eyePulse: 0.95, armSwing: 0.12 };
    case "thinking":
      return { headTilt: 0.08, eyePulse: 1.35, armSwing: 0.08 };
    case "connected":
      return { headTilt: 0, eyePulse: 1.2, armSwing: 0.18 };
    case "celebrating":
      return { headTilt: -0.05, eyePulse: 1.45, armSwing: 0.45 };
    default:
      return { headTilt: 0, eyePulse: 1, armSwing: 0.15 };
  }
}

export function NovaScene({
  progress,
  expression,
  focusOffset = 0,
}: {
  progress: number;
  expression: NovaExpression;
  focusOffset?: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const expressionRef = useRef(expression);
  const focusRef = useRef(focusOffset);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    expressionRef.current = expression;
  }, [expression]);

  useEffect(() => {
    focusRef.current = focusOffset;
  }, [focusOffset]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const isDark = document.documentElement.classList.contains("dark");
    const pearl = new THREE.Color(isDark ? "#ebe4f8" : "#f7f4fc");
    const graphite = new THREE.Color(isDark ? "#2b2438" : "#3b3348");
    const accent = new THREE.Color(isDark ? "#a78bfa" : "#6d28d9");
    const cyan = new THREE.Color(isDark ? "#22d3ee" : "#06b6d4");

    const robot = new THREE.Group();
    scene.add(robot);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: pearl,
      metalness: 0.35,
      roughness: 0.35,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: graphite,
      metalness: 0.55,
      roughness: 0.28,
    });
    const eyeMat = new THREE.MeshStandardMaterial({
      color: accent,
      emissive: accent,
      emissiveIntensity: 0.85,
      metalness: 0.2,
      roughness: 0.25,
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: cyan,
      emissive: cyan,
      emissiveIntensity: 0.55,
      metalness: 0.3,
      roughness: 0.3,
    });

    const torso = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.55, 0.55, 8, 16),
      bodyMat,
    );
    torso.position.y = -0.15;
    robot.add(torso);

    const chestLight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.12, 0.18, 4, 10),
      cyanMat,
    );
    chestLight.position.set(0, -0.05, 0.48);
    robot.add(chestLight);

    const head = new THREE.Group();
    head.position.y = 0.85;
    robot.add(head);

    const skull = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 28, 28),
      bodyMat,
    );
    head.add(skull);

    const facePlate = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
      darkMat,
    );
    facePlate.rotation.x = Math.PI;
    facePlate.position.set(0, -0.02, 0.12);
    head.add(facePlate);

    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), eyeMat);
    leftEye.position.set(-0.13, 0.05, 0.34);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.13;
    head.add(leftEye, rightEye);

    const mouth = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.015, 0.1, 4, 8),
      cyanMat,
    );
    mouth.rotation.z = Math.PI / 2;
    mouth.position.set(0, -0.12, 0.36);
    head.add(mouth);

    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.025, 0.28, 10),
      darkMat,
    );
    antenna.position.y = 0.52;
    head.add(antenna);
    const antennaTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      cyanMat,
    );
    antennaTip.position.y = 0.68;
    head.add(antennaTip);

    const leftArm = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.1, 0.28, 6, 10),
      bodyMat,
    );
    leftArm.position.set(-0.72, 0.05, 0);
    leftArm.rotation.z = 0.35;
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.72;
    rightArm.rotation.z = -0.35;
    robot.add(leftArm, rightArm);

    const leftHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 14, 14),
      darkMat,
    );
    leftHand.position.set(-0.86, -0.22, 0.08);
    const rightHand = leftHand.clone();
    rightHand.position.x = 0.86;
    robot.add(leftHand, rightHand);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.015, 10, 80),
      new THREE.MeshBasicMaterial({
        color: cyan,
        transparent: true,
        opacity: 0.35,
      }),
    );
    halo.rotation.x = Math.PI / 2.2;
    robot.add(halo);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(2.5, 3.5, 4);
    const fill = new THREE.PointLight(accent.getHex(), 14, 10);
    fill.position.set(-2, 1.2, 2);
    const rim = new THREE.PointLight(cyan.getHex(), 10, 8);
    rim.position.set(1.5, -0.5, -2);
    scene.add(ambient, key, fill, rim);

    let frame = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      if (disposed) return;
      frame = requestAnimationFrame(renderFrame);
      const t = clock.getElapsedTime();
      const p = progressRef.current;
      const params = expressionParams(expressionRef.current);
      const focus = focusRef.current;

      robot.position.y = Math.sin(t * 1.1) * 0.08 + (p - 0.5) * 0.2;
      robot.rotation.y =
        Math.sin(t * 0.35) * 0.12 + focus * 0.35 + Math.sin(p * Math.PI) * 0.25;
      robot.rotation.z = Math.sin(t * 0.5) * 0.03;
      robot.scale.setScalar(0.95 + Math.sin(p * Math.PI) * 0.08);

      head.rotation.z = params.headTilt + Math.sin(t * 0.8) * 0.03;
      head.rotation.y = focus * 0.25 + Math.sin(t * 0.6) * 0.04;

      const eyeBoost = params.eyePulse + Math.sin(t * 3) * 0.08;
      eyeMat.emissiveIntensity = 0.65 * eyeBoost;
      cyanMat.emissiveIntensity =
        expressionRef.current === "connected" ||
        expressionRef.current === "celebrating"
          ? 0.85
          : 0.45;

      leftArm.rotation.z = 0.35 + Math.sin(t * 1.4) * params.armSwing * 0.35;
      rightArm.rotation.z = -0.35 - Math.sin(t * 1.4 + 0.4) * params.armSwing * 0.35;
      leftHand.position.y = -0.22 + Math.sin(t * 1.4) * 0.05 * params.armSwing;
      rightHand.position.y =
        -0.22 + Math.sin(t * 1.4 + 0.4) * 0.05 * params.armSwing;

      halo.rotation.z = t * 0.2 + p;
      halo.material.opacity =
        expressionRef.current === "connected" ||
        expressionRef.current === "celebrating"
          ? 0.55
          : 0.28;

      camera.position.x = Math.sin(p * Math.PI) * 0.25 + focus * 0.15;
      camera.lookAt(0, 0.15, 0);
      renderer.render(scene, camera);
    };
    renderFrame();

    const onResize = () => {
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
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
