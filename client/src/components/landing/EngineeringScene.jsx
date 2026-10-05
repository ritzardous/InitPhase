import { useEffect, useRef } from "react";
import * as THREE from "three";

// Each connected layer represents a phase: idea, requirements, verification.
export default function EngineeringScene({ phase, paused }) {
  const hostRef = useRef(null);
  const phaseRef = useRef(phase);
  const pausedRef = useRef(paused);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      // The CSS layer illustration remains visible without WebGL.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(6, 5.5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xb5a8ff, 2));
    const light = new THREE.DirectionalLight(0xe8dcff, 5);
    light.position.set(2, 5, 4);
    scene.add(light);
    const group = new THREE.Group();
    scene.add(group);
    const materials = [];
    const layers = [];
    const colors = [0xb6a0ff, 0x9271ff, 0x7752e8];
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Group();
      layer.position.y = 1.05 - i * 1.05;
      const material = new THREE.MeshStandardMaterial({
        color: 0x201932,
        metalness: 0.65,
        roughness: 0.28,
        transparent: true,
        opacity: 0.94,
        emissive: colors[i],
        emissiveIntensity: 0.07,
      });
      materials.push(material);
      const geometry = new THREE.BoxGeometry(3.6, 0.16, 2.7);
      layer.add(new THREE.Mesh(geometry, material));
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: colors[i],
          transparent: true,
          opacity: 0.65,
        }),
      );
      layer.add(edges);
      // Printed traces and contact nodes make these engineering layers, not floating decoration.
      for (let j = 0; j < 5; j++) {
        const z = -0.9 + j * 0.44;
        const points = [
          new THREE.Vector3(-1.55, 0.09, z),
          new THREE.Vector3(-0.7 + j * 0.17, 0.09, z),
          new THREE.Vector3(-0.35 + j * 0.17, 0.09, z + 0.23),
          new THREE.Vector3(1.45, 0.09, z + 0.23),
        ];
        layer.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({
              color: colors[i],
              transparent: true,
              opacity: 0.35,
            }),
          ),
        );
        const contact = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 8, 6),
          new THREE.MeshBasicMaterial({ color: colors[i] }),
        );
        contact.position.set(1.45, 0.1, z + 0.23);
        layer.add(contact);
      }
      const chip = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.14, 0.7),
        new THREE.MeshStandardMaterial({
          color: colors[i],
          metalness: 0.6,
          roughness: 0.3,
          emissive: colors[i],
          emissiveIntensity: 0.2,
        }),
      );
      chip.position.y = 0.16;
      layer.add(chip);
      group.add(layer);
      layers.push(layer);
    }
    for (const x of [-1.3, 1.3]) {
      for (const z of [-0.8, 0.8]) {
        const points = [
          new THREE.Vector3(x, -1.05, z),
          new THREE.Vector3(x, 1.05, z),
        ];
        group.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({
              color: 0x9471ff,
              transparent: true,
              opacity: 0.35,
            }),
          ),
        );
      }
    }
    let visible = true;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    const move = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
    };
    const reset = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(host);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changeMotion = () => {
      reduced = media.matches;
    };
    media.addEventListener("change", changeMotion);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    let lastPhase = -1;
    let frame = 0;
    renderer.setAnimationLoop((time) => {
      if (!visible || document.hidden) return;
      const active = !reduced && !pausedRef.current;
      if (!active && lastPhase === phaseRef.current) return;
      if (active && frame++ % 2) return;
      if (active) {
        group.rotation.y += (pointer.x - group.rotation.y) * 0.035;
        group.rotation.x += (pointer.y - group.rotation.x) * 0.035;
        group.position.y = Math.sin(time * 0.0007) * 0.075;
      }
      layers.forEach((layer, i) => {
        const selected = phaseRef.current === i;
        materials[i].emissiveIntensity = selected ? 0.23 : 0.035;
        layer.position.x +=
          ((selected ? -0.13 : 0) - layer.position.x) * (active ? 0.06 : 1);
      });
      lastPhase = phaseRef.current;
      renderer.render(scene, camera);
    });
    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", changeMotion);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) object.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="ip-scene" ref={hostRef} aria-hidden="true">
      <div className="ip-scene-fallback">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
