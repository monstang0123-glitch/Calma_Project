import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Palette colors
  vec3 color1 = vec3(0.992, 0.992, 0.992); // #FDFDFD
  vec3 color2 = vec3(0.690, 0.635, 0.557); // #B0A28E
  vec3 color3 = vec3(0.835, 0.835, 0.835); // #D5D5D5
  vec3 color4 = vec3(0.282, 0.282, 0.282); // #484848
  vec3 color5 = vec3(0.0, 0.0, 0.0);       // #000000

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 palette(float t) {
    float cycle = fract(t);
    if (cycle < 0.25) return mix(color1, color2, cycle / 0.25);
    else if (cycle < 0.5) return mix(color2, color3, (cycle - 0.25) / 0.25);
    else if (cycle < 0.75) return mix(color3, color4, (cycle - 0.5) / 0.25);
    else return mix(color4, color1, (cycle - 0.75) / 0.25);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.1;

    // Create organic flowing shapes
    vec2 p = uv * 3.0;
    float n1 = fbm(p + t * 0.3);
    float n2 = fbm(p * 1.5 - t * 0.2 + n1 * 0.5);
    float n3 = fbm(p * 0.8 + t * 0.15 - n2 * 0.3);

    // Combine for blob shapes
    float shape = n1 * 0.4 + n2 * 0.35 + n3 * 0.25;
    shape = smoothstep(0.3, 0.7, shape);

    // Color cycling
    float colorT = t * 0.15 + shape * 0.5;
    vec3 col = palette(colorT);

    // Add subtle movement
    float movement = sin(uv.x * 4.0 + t * 0.5) * cos(uv.y * 3.0 - t * 0.4) * 0.05;
    col += movement;

    // Soft vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const startTime = Date.now();
    const animate = () => {
      uniforms.uTime.value = (Date.now() - startTime) / 1000;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
