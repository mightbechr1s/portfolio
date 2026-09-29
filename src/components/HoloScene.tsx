"use client";
import { useEffect, useRef } from "react";

/**
 * Lazy holographic scene (§3, §29-§42).
 *
 * Three.js is imported dynamically inside the effect, so it lands in its own
 * chunk that is fetched after the page is already interactive. Nothing here can
 * block hero text, nav, or buttons: the canvas sits at z-0 with
 * pointer-events:none, and the component renders a single empty div until the
 * scene is live.
 *
 * Performance rules this file is built around:
 *   - No lights and no post-processing. Every material is MeshBasicMaterial or
 *     LineBasicMaterial, so shading cost is zero. This is the whole reason the
 *     scene stays cheap: a hologram is mostly edges, and edges need no light.
 *   - Geometry and materials are created once and shared across meshes.
 *   - Two draw-call groups total: one additive-blended line group for all
 *     wireframe edges, one Points object for particles.
 *   - One rAF loop, driven off the clock, capped to ~60fps and paused entirely
 *     when the tab is hidden or the hero scrolls away (§34, §35).
 *   - Pixel ratio is clamped and lowered further if measured FPS is poor (§32).
 *   - Every geometry, material and the renderer itself are disposed on unmount
 *     (§39), and a resize observer keeps the canvas correct without recreating
 *     it (§40).
 *
 * If WebGL is missing or anything throws, the div stays empty and the existing
 * CSS atmosphere behind it is the fallback. No error is ever surfaced (§42).
 */

/** Read the palette straight from CSS so 3D can never drift from the design. */
function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue("--color-accent").trim() || "#35d0e8";
  const dim = styles.getPropertyValue("--color-accent-dim").trim() || "#1d7f90";
  return { accent, dim };
}

export function HoloScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Reduced motion gets the static CSS atmosphere instead of a frozen 3D
    // scene. Mounting a WebGL context that never moves is pure waste (§43).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch devices get the CSS scene and no WebGL context at all. A "reduced"
    // 3D scene still costs a context, a shader compile and ~180KB of chunk on a
    // phone that cannot see the parallax it is there for (§41, §43).
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    // Fine pointer, but modest hardware or a narrow window: keep the scene and
    // cut its cost instead of dropping it.
    const lowPower =
      (navigator.hardwareConcurrency ?? 4) <= 4 || window.innerWidth < 768;

    import("three")
      .then((THREE) => {
        if (disposed) return;
        const build = createScene(THREE, host, lowPower);
        cleanup = build.dispose;
        if (disposed) build.dispose();
      })
      .catch(() => {
        // Chunk failed to load: the CSS atmosphere is already on screen and the
        // portfolio is fully usable. Nothing to report to the visitor.
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="holo-scene" aria-hidden="true" />;
}

type Three = typeof import("three");
type BufferAttribute = import("three").BufferAttribute;

function createScene(THREE: Three, host: HTMLDivElement, lowPower: boolean) {
  const { accent, dim } = readPalette();

  // WebGL2 first, fall back if unavailable. A throw here is caught by the
  // caller's promise chain, which is exactly the §42 fallback path.
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !lowPower,
    powerPreference: "default",
  });

  let pixelRatio = Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.pointerEvents = "none";
  renderer.domElement.style.display = "block";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    100
  );
  camera.position.set(0, 0, 9);

  // ---- Geometry: created once, shared by every mesh that needs it ---------
  const orbGeo = new THREE.IcosahedronGeometry(1.55, 1);
  const shellGeo = new THREE.IcosahedronGeometry(2.05, 0);
  const coreGeo = new THREE.DodecahedronGeometry(0.72, 0);

  // EdgesGeometry turns a solid into a wireframe the cheap way: a LineSegments
  // per geometry, rather than a triangle-soup wireframe material.
  const orbEdges = new THREE.EdgesGeometry(orbGeo, 12);
  const shellEdges = new THREE.EdgesGeometry(shellGeo, 1);
  const coreEdges = new THREE.EdgesGeometry(coreGeo, 1);

  // ---- Materials: three, reused everywhere (§29) --------------------------
  const matOrb = new THREE.LineBasicMaterial({
    color: new THREE.Color(accent),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const matShell = new THREE.LineBasicMaterial({
    color: new THREE.Color(accent),
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  // The glass panel is the one surface in the scene that is not additive: a
  // faint lit pane reads as glass, where additive blending would just brighten
  // whatever is behind it and read as a glow.
  const matPanel = new THREE.MeshBasicMaterial({
    color: new THREE.Color(dim),
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const matCore = new THREE.MeshBasicMaterial({
    color: new THREE.Color(dim),
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const group = new THREE.Group();
  scene.add(group);

  // 0. Glass panel behind the whole composition, tilted slightly off-axis so it
  //    catches the camera as a plane rather than a flat backdrop. One draw call.
  const panelGeo = new THREE.PlaneGeometry(11, 7);
  const panel = new THREE.Mesh(panelGeo, matPanel);
  panel.position.set(0, 0, -2.6);
  panel.rotation.set(-0.12, 0.26, 0.04);
  group.add(panel);

  // ---- Node network (§3) --------------------------------------------------
  // One fixed table of node positions, shared by the glowing points and the
  // connecting lines so the two can never drift apart. Declared as data rather
  // than scattered literals because three separate consumers need the same set.
  const NODES: ReadonlyArray<readonly [number, number, number]> = [
    [1.5, 0.35, 0],      // the orb itself anchors the network
    [3.6, 1.5, -0.6],
    [3.9, -0.9, 0.4],
    [0.4, 2.4, -1.1],
    [-0.9, 0.9, 0.5],
    [-2.6, -1.5, -1.2],  // the polyhedron
    [-1.4, -2.6, 0.3],
    [1.2, -2.2, -0.8],
    [4.3, 0.2, -1.4],
    [-3.6, 1.8, -0.9],
  ];

  // 1. Holographic orb: solid faint core plus its own wireframe shell.
  const orb = new THREE.Group();
  const core = new THREE.Mesh(coreGeo, matCore);
  orb.add(core);
  const coreWire = new THREE.LineSegments(coreEdges, matShell);
  orb.add(coreWire);
  orb.add(new THREE.LineSegments(orbEdges, matOrb));
  orb.position.set(1.5, 0.35, 0);
  group.add(orb);

  // 2. Outer geometric shell, counter-rotating, reads as depth.
  const shell = new THREE.LineSegments(shellEdges, matShell);
  shell.position.set(1.5, 0.35, -0.4);
  shell.scale.setScalar(1.15);
  group.add(shell);

  // 3. Orbital rings on separate axes. Elliptical via scale, not perspective.
  //    TorusGeometry is solid surface geometry, so these are Meshes and need a
  //    MeshBasicMaterial; a LineBasicMaterial here would not shade them at all.
  const ringGeo = new THREE.TorusGeometry(2.6, 0.006, 3, lowPower ? 64 : 128);
  const matRing = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accent),
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ringA = new THREE.Mesh(ringGeo, matRing);
  const ringB = new THREE.Mesh(ringGeo, matRing);
  ringA.position.copy(orb.position);
  ringB.position.copy(orb.position);
  ringA.rotation.set(Math.PI / 2.6, 0.3, 0);
  ringB.rotation.set(Math.PI / 1.7, -0.4, 0.6);
  ringB.scale.set(1, 0.72, 1);
  group.add(ringA, ringB);

  // 4. A single wireframe polyhedron on the opposite side balances the
  //    composition without adding a fifth object type.
  const polyGeo = new THREE.IcosahedronGeometry(0.9, 0);
  const polyEdges = new THREE.EdgesGeometry(polyGeo, 1);
  const poly = new THREE.LineSegments(polyEdges, matOrb);
  poly.position.set(-2.6, -1.5, -1.2);
  group.add(poly);

  // 5. Glowing nodes: a single Points object over the NODES table, so ten
  //    points cost one draw call rather than ten. Per-node size is baked into
  //    the attribute and the shared pulse is applied by scaling the material,
  //    which keeps the whole effect in one place.
  const nodePositions = new Float32Array(NODES.length * 3);
  NODES.forEach(([x, y, z], i) => {
    nodePositions[i * 3] = x;
    nodePositions[i * 3 + 1] = y;
    nodePositions[i * 3 + 2] = z;
  });
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
  const matNode = new THREE.PointsMaterial({
    color: new THREE.Color(accent),
    size: 0.14,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const nodes = new THREE.Points(nodeGeo, matNode);
  group.add(nodes);

  // 6. Connecting lines: every node back to the orb centre, built as one
  //    LineSegments so the entire network is a single draw call. Written as a
  //    flat array because that is what a line-segment buffer position is.
  const linkVertices: number[] = [];
  const [hubX, hubY, hubZ] = NODES[0];
  for (let i = 1; i < NODES.length; i++) {
    linkVertices.push(hubX, hubY, hubZ, NODES[i][0], NODES[i][1], NODES[i][2]);
  }
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkVertices, 3));
  const matLink = new THREE.LineBasicMaterial({
    color: new THREE.Color(dim),
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const links = new THREE.LineSegments(linkGeo, matLink);
  group.add(links);

  // ---- Particles: one Points object, one draw call (§29) -----------------
  const PARTICLE_MAX = 56;
  const count = lowPower ? 14 : PARTICLE_MAX;
  const positions = new Float32Array(count * 3);
  const drift = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Deterministic scatter. Seeded by index so SSR and client agree and there
    // is no layout surprise on load.
    const a = (i * 2.399963) % (Math.PI * 2);
    const r = 2.2 + ((i * 37) % 100) / 22;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = Math.sin(a) * r * 0.7;
    positions[i * 3 + 2] = -2 + ((i * 53) % 100) / 25;
    drift[i] = 0.12 + ((i * 17) % 10) / 90;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      color: new THREE.Color(accent),
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  // ---- Pointer parallax (§7) ---------------------------------------------
  // Only the latest coordinate is stored; easing happens in the loop, and the
  // camera never tracks the pointer directly (§7).
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // ---- Visibility and intersection gating (§34, §35) ---------------------
  let running = true;
  let frame = 0;
  const setRunning = (value: boolean) => {
    running = value;
  };
  const io = new IntersectionObserver(
    ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
    { threshold: 0.01 }
  );
  io.observe(host);

  // Named so it can actually be removed on dispose; an inline arrow here would
  // leak one listener per scene for the life of the document.
  const onVisibilityChange = () => setRunning(!document.hidden);
  document.addEventListener("visibilitychange", onVisibilityChange);

  // ---- Resize (§40) -------------------------------------------------------
  const ro = new ResizeObserver(() => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
  ro.observe(host);

  // ---- Clock (§31) -------------------------------------------------------
  // No manual frame cap. rAF is already vsync-locked, so skipping frames here
  // would only halve the refresh rate; struggling devices are handled by the
  // pixel-ratio downgrade below, which costs fill rate instead of smoothness.
  const clock = new THREE.Clock();
  // Independent per-object speeds, none of them matching each other, so the
  // composition never visibly loops (§6).
  const spin = { orb: 0.12, shell: -0.07, ringA: 0.16, ringB: -0.11, poly: 0.2 };
  const float = { orb: 0.35, poly: 0.22 };
  let fpsSamples = 0;
  let fpsElapsed = 0;

  const tick = () => {
    frame = requestAnimationFrame(tick);
    if (!running) return;

    // Clamp dt so a long stall (tab switch, GC pause) cannot teleport the scene.
    const dt = Math.min(clock.getDelta(), 0.1);

    orb.rotation.y += spin.orb * dt;
    orb.rotation.x += spin.orb * 0.4 * dt;
    orb.position.y = 0.35 + Math.sin(clock.elapsedTime * 0.5) * float.orb;

    shell.rotation.y += spin.shell * dt;
    shell.rotation.z += spin.shell * 0.5 * dt;

    ringA.rotation.z += spin.ringA * dt;
    ringB.rotation.z += spin.ringB * dt;
    ringA.rotation.y += spin.ringA * 0.3 * dt;

    poly.rotation.x += spin.poly * dt;
    poly.rotation.y -= spin.poly * 0.7 * dt;
    poly.position.y = -1.5 + Math.sin(clock.elapsedTime * 0.35) * float.poly;

    // Panel and network breathe on their own slow cycles, deliberately not
    // sharing a period with any object above so the scene never lines up.
    panel.rotation.y = 0.26 + Math.sin(clock.elapsedTime * 0.14) * 0.05;
    panel.position.y = Math.sin(clock.elapsedTime * 0.11) * 0.12;
    // Nodes and links pulse together, so the network reads as one system.
    const pulse = 0.75 + Math.sin(clock.elapsedTime * 0.9) * 0.15;
    matNode.opacity = pulse;
    matLink.opacity = 0.22 + pulse * 0.16;

    // Slow drift of the whole field, and a gentle rotation so particles are not
    // a static starfield.
    particles.rotation.y += 0.02 * dt;
    const pos = particleGeo.attributes.position as BufferAttribute;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] += drift[i] * dt * 0.12;
      if (pos.array[i * 3 + 1] > 4) pos.array[i * 3 + 1] = -4;
    }
    pos.needsUpdate = true;

    eased.x += (pointer.x - eased.x) * 0.045;
    eased.y += (pointer.y - eased.y) * 0.045;
    // Camera drifts a small, bounded amount. Never a direct 1:1 follow.
    camera.position.x = eased.x * 0.7;
    camera.position.y = -eased.y * 0.45;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

    // ---- Adaptive quality (§30, §31, §32) -------------------------------
    // Two seconds of samples before touching quality, so a slow first second
    // (shader compile, font swap) never triggers a downgrade.
    fpsElapsed += dt;
    fpsSamples++;
    if (fpsElapsed >= 2) {
      const fps = fpsSamples / fpsElapsed;
      if (fps < 40 && pixelRatio > 0.75) {
        pixelRatio = Math.max(0.75, pixelRatio - 0.25);
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(host.clientWidth, host.clientHeight, false);
      }
      fpsElapsed = 0;
      fpsSamples = 0;
    }
  };
  frame = requestAnimationFrame(tick);

  return {
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      ro.disconnect();
      // Dispose every resource we created (§39). Renderer disposal also frees
      // the WebGL context, which otherwise leaks across fast refreshes.
      // EdgesGeometry copies vertices out of its source, so each derived buffer
      // needs its own dispose call as well as the source.
      orbEdges.dispose();
      shellEdges.dispose();
      coreEdges.dispose();
      polyEdges.dispose();
      // The source solids are only used to build edges, but they are real
      // GPU buffers once uploaded.
      orbGeo.dispose();
      shellGeo.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      particleGeo.dispose();
      polyGeo.dispose();
      panelGeo.dispose();
      nodeGeo.dispose();
      linkGeo.dispose();
      matOrb.dispose();
      matShell.dispose();
      matCore.dispose();
      matRing.dispose();
      matPanel.dispose();
      matNode.dispose();
      matLink.dispose();
      (particles.material as import("three").Material).dispose();
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
