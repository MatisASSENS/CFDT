import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { CanvasTexture, DoubleSide, LinearFilter, SRGBColorSpace } from 'three';

extend({ RoundedBoxGeometry });

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * @typedef {{ x: number, y: number, size: number }} Hole
 * @typedef {{ id: string, title: string, label: string, note: string, holes: Hole[] }} Slice
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
    label: 'HUMAIN',
    sublabel: '62h vol · pression · charge',
    note: '62 h de vol / passager recent / pression / charge de travail',
    holes: [
      { x: 18, y: 30, size: 58 },
      { x: 39, y: 64, size: 52 },
      { x: 75, y: 45, size: 44 },
      { x: 83, y: 22, size: 34 },
    ],
  },
  {
    id: 'technique',
    title: 'Facteurs techniques',
    label: 'TECHNIQUE',
    sublabel: 'Jauge · masse 464 kg · marges',
    note: 'Jauge carburant / masse ~464 kg / marges aero diminuees',
    holes: [
      { x: 24, y: 42, size: 54 },
      { x: 51, y: 24, size: 46 },
      { x: 75, y: 49, size: 46 },
      { x: 84, y: 72, size: 40 },
    ],
  },
  {
    id: 'meteo',
    title: 'Facteurs meteorologiques',
    label: 'METEO',
    sublabel: 'Vent 10-20 kt · cisaillement',
    note: '10 kt moyen / rafales 20 kt / vent variable / cisaillement',
    holes: [
      { x: 20, y: 70, size: 60 },
      { x: 36, y: 34, size: 40 },
      { x: 74, y: 52, size: 42 },
      { x: 61, y: 60, size: 36 },
    ],
  },
  {
    id: 'phase-critique',
    title: 'Phase critique du vol',
    label: 'PHASE CRITIQUE',
    sublabel: 'Virage final · vitesse limite',
    note: 'Tours de piste / virage base-finale / vitesse proche decrochage',
    holes: [
      { x: 12, y: 20, size: 42 },
      { x: 43, y: 56, size: 44 },
      { x: 72, y: 50, size: 40 },
      { x: 89, y: 42, size: 30 },
    ],
  },
];

/** @type {SceneConfig} */
const sceneConfig = {
  sliceWidth: 5.6,
  sliceHeight: 3.2,
  sliceDepth: 0.34,
  horizontalSpread: 1.18,
  verticalSpread: 0.72,
  depthSpread: 3.2,
};

const alignedWorldPoint = Object.freeze({ x: -0.35, y: 0.05 });
const laserHoleRadius = 0.2;
const zoomConfig = Object.freeze({
  min: 6.8,
  max: 22,
  step: 0.012,
});

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

function LabelPlane({ title, sublabel, position, width, height }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 640;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(9, 11, 18, 0.82)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(252, 211, 77, 0.95)';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff7cc';

    // Title line — auto-size
    let fontSize = 210;
    while (fontSize > 80) {
      ctx.font = `900 ${fontSize}px "Segoe UI", "Arial Black", sans-serif`;
      if (ctx.measureText(title).width <= canvas.width - 160) break;
      fontSize -= 10;
    }
    ctx.textBaseline = 'alphabetic';
    const titleY = sublabel ? 270 : canvas.height / 2 + fontSize * 0.35;
    ctx.fillText(title, canvas.width / 2, titleY);

    // Sublabel line
    if (sublabel) {
      ctx.fillStyle = 'rgba(253, 230, 138, 0.85)';
      ctx.font = `500 96px "Segoe UI", sans-serif`;
      ctx.textBaseline = 'top';
      ctx.fillText(sublabel, canvas.width / 2, titleY + 28);
    }

    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.generateMipmaps = false;
    map.minFilter = LinearFilter;
    map.magFilter = LinearFilter;
    map.needsUpdate = true;
    return map;
  }, [title, sublabel]);

  useEffect(
    () => () => {
      texture?.dispose();
    },
    [texture]
  );

  if (!texture) return null;

  return (
    <mesh position={position} renderOrder={4}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={DoubleSide}
        toneMapped={false}
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
  const offsetIndex = index - (total - 1) / 2;
  const xOffset = offsetIndex * config.horizontalSpread;
  const yOffset = offsetIndex * config.verticalSpread;
  const zOffset = -index * config.depthSpread;
  const placeLabelOnTop = index >= total - 2;
  const labelYOffset = placeLabelOnTop
    ? config.sliceHeight * 0.3
    : -config.sliceHeight * 0.28;

  const alignedLocalX = alignedWorldPoint.x - xOffset;
  const alignedLocalY = alignedWorldPoint.y - yOffset;

  return (
    <group position={[xOffset, yOffset, zOffset]}>
      <mesh castShadow receiveShadow>
        <roundedBoxGeometry
          args={[config.sliceWidth, config.sliceHeight, config.sliceDepth, 8, 0.12]}
        />
        <meshStandardMaterial color="#f6cf6a" roughness={0.55} metalness={0.05} />
      </mesh>

      {slice.holes.map((hole, holeIndex) => {
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
        position={[0, labelYOffset, config.sliceDepth / 2 + 0.03]}
        width={config.sliceWidth * 0.72}
        height={0.78}
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
      slices.map((_, index) => {
        const offsetIndex = index - (slices.length - 1) / 2;
        return {
          x: offsetIndex * sceneConfig.horizontalSpread,
          y: offsetIndex * sceneConfig.verticalSpread,
          z: -index * sceneConfig.depthSpread,
        };
      }),
    []
  );

  const frontZ = slicePositions[0].z + sceneConfig.sliceDepth / 2 + 0.42;
  const backZ =
    slicePositions[slicePositions.length - 1].z - sceneConfig.sliceDepth / 2 - 0.85;
  const laserLength = frontZ - backZ;
  const laserCenterZ = (frontZ + backZ) / 2;

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

          <LabelPlane
            title="LASER"
            sublabel="Trajectoire de danger"
            position={[alignedWorldPoint.x, alignedWorldPoint.y + 0.52, laserCenterZ + 0.15]}
            width={2.5}
            height={0.72}
          />

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

          <mesh position={[alignedWorldPoint.x, alignedWorldPoint.y, frontZ + 0.26]}>
            <boxGeometry args={[0.64, 0.2, 0.1]} />
            <meshStandardMaterial color="#f97316" roughness={0.42} />
          </mesh>

          <mesh position={[alignedWorldPoint.x, alignedWorldPoint.y, backZ - 0.18]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.08, 0.22, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.9} />
          </mesh>

          <mesh position={[alignedWorldPoint.x + 0.32, alignedWorldPoint.y, backZ - 0.26]}>
            <boxGeometry args={[0.7, 0.22, 0.1]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
        </RotatingGroup>
      </group>
    </>
  );
}

function SwissCheese3D() {
  const [tilt, setTilt] = useState({ x: 0.24, y: -0.32 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomZ, setZoomZ] = useState(12);
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
        x: clamp(drag.initialX + dy * 0.0048, -1.05, 1.05),
        y: drag.initialY + dx * 0.0065,
      });
      return;
    }

    setOffset({
      x: clamp(drag.initialOffsetX + dx * 0.01, -2.8, 2.8),
      y: clamp(drag.initialOffsetY - dy * 0.01, -2.2, 2.2),
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
    <div className="w-full rounded-3xl border border-amber-200 bg-gradient-to-b from-[#fff8dd] via-[#ffeeb8] to-[#f6da85] p-4 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <div
        className="relative h-[560px] md:h-[620px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#20344f] select-none"
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

        <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-lg bg-black/45 px-3 py-2 text-xs font-semibold text-white/95">
          Hazard
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-lg bg-red-600/85 px-3 py-2 text-xs font-semibold text-white">
          Accident
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-lg bg-black/50 px-3 py-2 text-xs text-white/95 backdrop-blur-sm">
          Clic gauche maintenu: rotation | Clic droit maintenu: translation | Molette: zoom
        </div>
      </div>
    </div>
  );
}

export default SwissCheese3D;
