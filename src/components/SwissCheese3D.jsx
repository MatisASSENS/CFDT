import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { CanvasTexture, DoubleSide, ExtrudeGeometry, LinearFilter, Shape, SRGBColorSpace } from 'three';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function CheeseBodyGeometry({ width, height, depth, cornerRadius = 0.45 }) {
  const geometry = useMemo(() => {
    const w = width / 2;
    const h = height / 2;
    const r = Math.min(cornerRadius, w, h);
    const shape = new Shape();
    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);
    shape.closePath();
    const geo = new ExtrudeGeometry(shape, { depth, bevelEnabled: false, steps: 1, curveSegments: 14 });
    geo.translate(0, 0, -depth / 2);
    return geo;
  }, [width, height, depth, cornerRadius]);
  return <primitive object={geometry} attach="geometry" />;
}

/**
 * @typedef {{ x: number, y: number, size: number }} Hole
 * @typedef {{ id: string, title: string, label: string, sublabel: string, items: string[], holes: Hole[] }} Slice
 * @typedef {{
 *   sliceWidth: number,
 *   sliceHeight: number,
 *   sliceDepth: number,
 *   horizontalSpread: number,
 *   verticalSpread: number,
 *   depthSpread: number,
 * }} SceneConfig
 */

/** @type {Slice[]} */
const slices = [
  {
    id: 'humain',
    title: 'Facteurs humains',
    label: 'FACTEURS HUMAINS',
    sublabel: '62h vol · pression · charge',
    items: [
      'Experience limitee du pilote (62 h de vol)',
      'Emport passager recent',
      "Pression psychologique liee a la presence d'un proche",
      'Charge de travail elevee en tour de piste',
    ],
    holes: [
      { x: 14, y: 62, size: 54 },
      { x: 32, y: 82, size: 42 },
      { x: 66, y: 70, size: 46 },
      { x: 88, y: 58, size: 34 },
    ],
  },
  {
    id: 'technique',
    title: 'Facteurs techniques',
    label: 'FACTEURS TECHNIQUES',
    sublabel: 'Jauge · masse 464 kg · marges',
    items: [
      "Defaillance de l'indicateur de niveau carburant",
      "Masse de l'ULM proche de la limite (environ 464 kg)",
      'Performances reduites en montee et en virage',
      'Marges aerodynamiques diminuees',
    ],
    holes: [
      { x: 16, y: 58, size: 50 },
      { x: 42, y: 78, size: 40 },
      { x: 68, y: 64, size: 44 },
      { x: 87, y: 83, size: 34 },
    ],
  },
  {
    id: 'meteo',
    title: 'Facteurs meteorologiques',
    label: 'FACTEURS METEO',
    sublabel: 'Vent 10-20 kt · cisaillement',
    items: [
      'Vent moyen 10 kt',
      "Rafales jusqu'a 20 kt",
      'Direction variable 200 degres - 300 degres',
      'Turbulence et cisaillement du vent',
    ],
    holes: [
      { x: 18, y: 60, size: 58 },
      { x: 38, y: 82, size: 38 },
      { x: 67, y: 66, size: 40 },
      { x: 86, y: 56, size: 34 },
    ],
  },
  {
    id: 'phase-critique',
    title: 'Phase critique du vol',
    label: 'PHASE CRITIQUE',
    sublabel: 'Virage basse hauteur · vitesse limite',
    items: [
      'Tours de piste successifs',
      'Virage base a faible hauteur',
      'Virage finale avec inclinaison',
      'Vitesse proche du decrochage',
    ],
    holes: [
      { x: 14, y: 57, size: 40 },
      { x: 40, y: 76, size: 42 },
      { x: 69, y: 62, size: 38 },
      { x: 88, y: 82, size: 30 },
    ],
  },
  {
    id: 'perte-controle',
    title: 'Perte de controle',
    label: 'PERTE DE CONTROLE',
    sublabel: 'Vitesse en baisse · decrochage',
    items: [
      'Perte progressive de vitesse',
      'Decrochage dissymetrique',
      'Altitude insuffisante pour recuperation',
    ],
    holes: [
      { x: 17, y: 55, size: 38 },
      { x: 44, y: 72, size: 33 },
      { x: 72, y: 85, size: 30 },
      { x: 88, y: 63, size: 28 },
    ],
  },
  {
    id: 'accident',
    title: 'Accident',
    label: 'ACCIDENT',
    sublabel: 'Impact a forte energie',
    items: ['Impact a forte energie'],
    holes: [
      { x: 33, y: 62, size: 30 },
      { x: 59, y: 78, size: 26 },
      { x: 81, y: 56, size: 23 },
    ],
  },
];

/** @type {SceneConfig} */
const sceneConfig = {
  sliceWidth: 6.8,
  sliceHeight: 4.1,
  sliceDepth: 0.4,
  horizontalSpread: 2.25,
  verticalSpread: 1.35,
  depthSpread: 5,
};

const alignedWorldPoint = Object.freeze({ x: -0.35, y: 0.05 });
const laserHoleRadius = 0.2;
const zoomConfig = Object.freeze({
  min: 0.5,
  max: 75,
  step: 0.03,
});

const textSafeZone = Object.freeze({
  xMin: 8,
  xMax: 82,
  yMin: 6,
  yMax: 58,
});

const isHoleInTextZone = (hole) =>
  hole.x >= textSafeZone.xMin
  && hole.x <= textSafeZone.xMax
  && hole.y >= textSafeZone.yMin
  && hole.y <= textSafeZone.yMax;

const sliceOffsetPattern = Object.freeze([
  { x: -0.64, y: 0.64 },
  { x: 0.62, y: 0.26 },
  { x: -0.52, y: 0.33 },
  { x: -0.73, y: 0.40 },
  { x: -0.58, y: 0.15 },
  { x: 0.44, y: -0.31 },
]);

/**
 * Place les tranches en zigzag (directions differentes) avec une amplitude limitee.
 * Le laser reste ainsi sur le fromage au lieu de sortir du volume quand on avance en profondeur.
 * @param {number} index
 * @param {number} total
 * @param {SceneConfig} config
 */
const getSlicePosition = (index, total, config) => {
  const preset = sliceOffsetPattern[index];
  if (preset) {
    return {
      x: preset.x * config.horizontalSpread,
      y: preset.y * config.verticalSpread,
      z: -index * config.depthSpread,
    };
  }

  const offsetIndex = index - (total - 1) / 2;
  const side = index % 2 === 0 ? -1 : 1;

  return {
    x: side * config.horizontalSpread * 0.62,
    y: offsetIndex * config.verticalSpread * 0.2,
    z: -index * config.depthSpread,
  };
};

/**
 * Convertit des coordonnées en pourcentage (0-100) vers les coordonnées locales d'une tranche.
 * @param {{ x: number, y: number }} point
 * @param {number} width
 * @param {number} height
 */
const toLocalFromPercent = (point, width, height) => ({
  x: (point.x / 100 - 0.5) * width,
  y: (0.5 - point.y / 100) * height,
});

function LabelPlane({ title, sublabel, items, position, width, height }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1660;
    canvas.height = 1100;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const wrapText = (text, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let current = '';

      words.forEach((word) => {
        const candidate = current ? `${current} ${word}` : word;
        if (!current || ctx.measureText(candidate).width <= maxWidth) {
          current = candidate;
          return;
        }

        lines.push(current);
        current = word;
      });

      if (current) lines.push(current);
      return lines;
    };

    const drawText = (text, x, y, font, fill) => {
      ctx.font = font;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 12;
      ctx.strokeStyle = 'rgba(255, 247, 210, 0.96)';
      ctx.strokeText(text, x, y);
      ctx.fillStyle = fill;
      ctx.fillText(text, x, y);
    };

    const wrapAndDraw = (text, startX, startY, maxWidth, lineHeight, font, fill) => {
      const wrappedLines = wrapText(text, maxWidth);
      wrappedLines.forEach((line, index) => {
        drawText(line, startX, startY + index * lineHeight, font, fill);
      });
      return wrappedLines.length * lineHeight;
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Title line — auto-size
    let fontSize = 102;
    while (fontSize > 60) {
      ctx.font = `900 ${fontSize}px "Segoe UI", "Arial Black", sans-serif`;
      if (ctx.measureText(title).width <= canvas.width - 140) break;
      fontSize -= 10;
    }
    const titleY = 60;
    drawText(title, 56, titleY, `900 ${fontSize}px "Segoe UI", "Arial Black", sans-serif`, '#4f2a08');

    // Sublabel line
    let currentY = titleY + fontSize + 8;
    if (sublabel) {
      drawText(sublabel, 56, currentY, '700 60px "Segoe UI", sans-serif', '#6a3c0c');
      currentY += 78;
    }

    items.forEach((item) => {
      const usedHeight = wrapAndDraw(
        `• ${item}`,
        56,
        currentY,
        canvas.width - 120,
        62,
        '700 52px "Segoe UI", sans-serif',
        '#6f4010'
      );
      currentY += usedHeight + 10;
    });

    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.generateMipmaps = false;
    map.minFilter = LinearFilter;
    map.magFilter = LinearFilter;
    map.needsUpdate = true;
    return map;
  }, [title, sublabel, items]);

  useEffect(
    () => () => {
      texture?.dispose();
    },
    [texture]
  );

  if (!texture) return null;

  return (
    <mesh position={position} renderOrder={5}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.08}
        side={DoubleSide}
        toneMapped={false}
        depthTest
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * @param {{
 *  slice: Slice,
 *  index: number,
 *  total: number,
 *  config: SceneConfig,
 *  alignedWorldPoint: { x: number, y: number },
 * }} props
 */
function CheeseSlice({
  slice,
  index,
  total,
  config,
  alignedWorldPoint,
}) {
  const position = getSlicePosition(index, total, config);
  const xOffset = position.x;
  const yOffset = position.y;
  const zOffset = position.z;

  const alignedLocalX = alignedWorldPoint.x - xOffset;
  const alignedLocalY = alignedWorldPoint.y - yOffset;

  return (
    <group position={[xOffset, yOffset, zOffset]}>
      <mesh castShadow receiveShadow>
        <CheeseBodyGeometry width={config.sliceWidth} height={config.sliceHeight} depth={config.sliceDepth} cornerRadius={0.45} />
        <meshStandardMaterial color="#f6cf6a" roughness={0.55} metalness={0.05} />
      </mesh>

      {slice.holes.filter((hole) => !isHoleInTextZone(hole)).map((hole, holeIndex) => {
        const local = toLocalFromPercent(hole, config.sliceWidth, config.sliceHeight);
        const radius = (hole.size / 100) * (config.sliceHeight * 0.19);

        return (
          <mesh
            key={`${slice.id}-hole-${holeIndex}`}
            position={[local.x, local.y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[radius, radius, config.sliceDepth + 0.06, 26]} />
            <meshStandardMaterial
              color="#2b1808"
              roughness={0.9}
              metalness={0.02}
              emissive="#1a0f06"
              emissiveIntensity={0.25}
            />
          </mesh>
        );
      })}

      <mesh
        position={[alignedLocalX, alignedLocalY, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[laserHoleRadius, laserHoleRadius, config.sliceDepth + 0.1, 30]} />
        <meshStandardMaterial
          color="#130b04"
          roughness={0.95}
          metalness={0.03}
          emissive="#110904"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[alignedLocalX, alignedLocalY, config.sliceDepth / 2 + 0.012]}>
        <torusGeometry args={[laserHoleRadius + 0.025, 0.016, 12, 42]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.35} />
      </mesh>

      <LabelPlane
        title={slice.label}
        sublabel={slice.sublabel}
        items={slice.items}
        position={[-config.sliceWidth * 0.05, 0, config.sliceDepth / 2 + 0.042]}
        width={config.sliceWidth * 0.82}
        height={config.sliceHeight * 0.88}
      />
    </group>
  );
}

function RotatingGroup({ tilt, children }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const smoothing = 1 - Math.exp(-10 * delta);
    groupRef.current.rotation.x += (tilt.x - groupRef.current.rotation.x) * smoothing;
    groupRef.current.rotation.y += (tilt.y - groupRef.current.rotation.y) * smoothing;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Avion ────────────────────────────────────────────────────────────────────
function Airplane({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      {/* Fuselage — capsule sur l'axe Z (longueur) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.07, 0.7, 6, 12]} />
        <meshStandardMaterial color="#e0e8f0" roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Ailes principales */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.3, 0.03, 0.26]} />
        <meshStandardMaterial color="#c8d6e8" roughness={0.38} metalness={0.28} />
      </mesh>

      {/* Empennage horizontal */}
      <mesh position={[0, 0, -0.38]}>
        <boxGeometry args={[0.52, 0.025, 0.14]} />
        <meshStandardMaterial color="#bfcfdf" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Dérive verticale */}
      <mesh position={[0, 0.15, -0.34]}>
        <boxGeometry args={[0.025, 0.28, 0.18]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.25} />
      </mesh>
    </group>
  );
}

// Nombre de sphères en expansion dans l'explosion
const WAVE_COUNT = 5;
const WAVE_COLORS = ['#ffffff', '#ffe566', '#f97316', '#ef4444', '#991b1b'];
const WAVE_PERIODS = [1.1, 1.4, 1.8, 2.3, 2.9]; // durée de cycle de chaque sphère (s)
const WAVE_MAX_SCALE = [3.2, 4.5, 5.8, 7.0, 8.5];
const WAVE_PHASE_OFFSET = [0, 0.18, 0.36, 0.55, 0.72]; // décalage de phase
const WAVE_EI = [9, 6, 4, 2.5, 1.5];

function ExplosionWave({ color, period, maxScale, phaseOffset, emissiveIntensity }) {
  const meshRef = useRef(null);
  const t = useRef(phaseOffset * period);

  useFrame((_, delta) => {
    t.current = (t.current + delta) % period;
    const p = t.current / period; // 0 → 1
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(1 + p * (maxScale - 1));
    meshRef.current.material.opacity = Math.pow(1 - p, 1.4) * 0.65;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        toneMapped={false}
        transparent
        opacity={0.65}
        depthWrite={false}
        wireframe={false}
      />
    </mesh>
  );
}

function Explosion({ position }) {
  const coreRef = useRef(null);
  const t = useRef(0);

  const sparks = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const seed = (n) => {
        const x = Math.sin(i * 127.3 + n * 43.7) * 10000;
        return x - Math.floor(x);
      };
      const theta = seed(1) * Math.PI * 2;
      const phi = seed(2) * Math.PI;
      const r = 0.25 + seed(3) * 1.1;
      return {
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        size: 0.025 + seed(4) * 0.07,
        color: ['#ef4444', '#f97316', '#fbbf24', '#ff6600', '#fff176'][Math.floor(seed(5) * 5)],
        ei: 3.0 + seed(6) * 4.0,
        phase: seed(7) * Math.PI * 2,
      };
    });
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (coreRef.current) {
      const pulse = 0.78 + Math.sin(t.current * 7.5) * 0.26;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      {/* Sphères de souffle en expansion */}
      {Array.from({ length: WAVE_COUNT }, (_, i) => (
        <ExplosionWave
          key={i}
          color={WAVE_COLORS[i]}
          period={WAVE_PERIODS[i]}
          maxScale={WAVE_MAX_SCALE[i]}
          phaseOffset={WAVE_PHASE_OFFSET[i]}
          emissiveIntensity={WAVE_EI[i]}
        />
      ))}

      {/* Noyau central */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshStandardMaterial
          color="#fffde7"
          emissive="#ff5500"
          emissiveIntensity={10}
          toneMapped={false}
        />
      </mesh>

      {/* Éclats */}
      {sparks.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.size, 6, 6]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={s.ei}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraZoomController({ zoomZ }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const smoothing = 1 - Math.exp(-12 * delta);
    camera.position.z += (zoomZ - camera.position.z) * smoothing;
  });

  return null;
}

function SwissCheeseScene({ tilt, offset }) {
  const slicePositions = useMemo(
    () =>
      slices.map((_, index) => getSlicePosition(index, slices.length, sceneConfig)),
    []
  );

  const airplaneZ = slicePositions[0].z + sceneConfig.sliceDepth / 2 + 2.8;
  const frontZ = slicePositions[0].z + sceneConfig.sliceDepth / 2 + 0.42;
  const backZ =
    slicePositions[slicePositions.length - 1].z - sceneConfig.sliceDepth / 2 - 0.85;
  const laserLength = airplaneZ - backZ;
  const laserCenterZ = (airplaneZ + backZ) / 2;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5.5, 6.5, 8.2]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-6, -4, 7]} intensity={0.35} color="#8ec5ff" />
      <color attach="background" args={['#152640']} />

      <group position={[offset.x, offset.y, 0]}>
        <RotatingGroup tilt={tilt}>
          {slices.map((slice, index) => (
            <CheeseSlice
              key={slice.id}
              slice={slice}
              index={index}
              total={slices.length}
              config={sceneConfig}
              alignedWorldPoint={alignedWorldPoint}
            />
          ))}

          <mesh
            position={[
              alignedWorldPoint.x,
              alignedWorldPoint.y,
              laserCenterZ,
            ]}
          >
            <boxGeometry args={[0.055, 0.055, laserLength]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={1.7}
              toneMapped={false}
            />
          </mesh>

          {slicePositions.map((point, index) => (
            <mesh
              key={`laser-point-${index}`}
              position={[
                alignedWorldPoint.x,
                alignedWorldPoint.y,
                point.z + sceneConfig.sliceDepth / 2 + 0.03,
              ]}
            >
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial color="#fecaca" emissive="#ef4444" emissiveIntensity={0.55} />
            </mesh>
          ))}

          <Airplane
            position={[alignedWorldPoint.x, alignedWorldPoint.y, airplaneZ]}
          />

          <Explosion
            position={[alignedWorldPoint.x, alignedWorldPoint.y, backZ - 0.25]}
          />
        </RotatingGroup>
      </group>
    </>
  );
}

function SwissCheese3D({ className = '' }) {
  const [tilt, setTilt] = useState({ x: 0.24, y: -0.32 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomZ, setZoomZ] = useState(22);
  const dragRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault();

    setZoomZ((previous) =>
      clamp(previous + event.deltaY * zoomConfig.step, zoomConfig.min, zoomConfig.max)
    );
  };

  const handlePointerDown = (event) => {
    event.preventDefault();

    const translateGesture = event.button === 2;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: tilt.x,
      initialY: tilt.y,
      initialOffsetX: offset.x,
      initialOffsetY: offset.y,
      mode: translateGesture ? 'translate' : 'rotate',
    };

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (drag.mode === 'rotate') {
      setTilt({
        x: clamp(drag.initialX + dy * 0.0028, -1.05, 1.05),
        y: drag.initialY + dx * 0.004,
      });
      return;
    }

    setOffset({
      x: clamp(drag.initialOffsetX + dx * 0.02, -24, 24),
      y: clamp(drag.initialOffsetY - dy * 0.02, -18, 18),
    });
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={`w-full h-full min-h-0 rounded-3xl border border-amber-200 bg-gradient-to-b from-[#fff8dd] via-[#ffeeb8] to-[#f6da85] p-3 md:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${className}`.trim()}>
      <div
        className="relative h-full min-h-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#20344f] select-none"
      >
        <Canvas camera={{ position: [0, 0, 12], fov: 44 }} shadows>
          <CameraZoomController zoomZ={zoomZ} />
          <SwissCheeseScene tilt={tilt} offset={offset} />
        </Canvas>

        <div
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onContextMenu={(event) => event.preventDefault()}
        />

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-lg bg-black/50 px-3 py-2 text-xs text-white/95 backdrop-blur-sm">
          Clic gauche maintenu: rotation | Clic droit maintenu: translation | Molette: zoom
        </div>
      </div>
    </div>
  );
}

export default SwissCheese3D;
