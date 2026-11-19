const revealObserver = new IntersectionObserver(
  (entries, observer) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -28px 0px" },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));
const progress = document.getElementById("progress");
let scrollQueued = false;
function scrollMotion() {
  scrollQueued = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  const hero = document.querySelector(".hero-bg");
  if (hero && scrollY < innerHeight * 1.2)
    hero.style.backgroundPosition =
      "center calc(44% + " + scrollY * 0.12 + "px)";
}
function queueMotion() {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(scrollMotion);
  }
}
addEventListener("scroll", queueMotion, { passive: true });
addEventListener("resize", queueMotion);
scrollMotion();
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  heroTitle.innerHTML = heroTitle.innerHTML
    .replace(
      "Robots, drones",
      '<span class="hero-word">Robots, drones</span>',
    )
    .replace(
      "— <em>intelligence</em>",
      '<span class="hero-word">— <em>intelligence</em></span>',
    )
    .replace("that moves.", '<span class="hero-word">that moves.</span>');
}
if (
  matchMedia("(pointer:fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.querySelectorAll(".domain").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      card.style.transform =
        "perspective(900px) rotateX(" +
        ((0.5 - y) * 2).toFixed(2) +
        "deg) rotateY(" +
        ((x - 0.5) * 2).toFixed(2) +
        "deg) translateY(-3px)";
    });
    card.addEventListener(
      "pointerleave",
      () => (card.style.transform = ""),
    );
  });
}
const heroScene = document.querySelector(".hero-model-wrap"),
  heroModel = document.querySelector("#heroModel");
if (
  heroScene &&
  heroModel &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  heroScene.addEventListener("pointermove", (e) => {
    const r = heroScene.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    heroModel.style.setProperty(
      "--tilt-x",
      ((0.5 - y) * 7).toFixed(2) + "deg",
    );
    heroModel.style.setProperty(
      "--tilt-y",
      (-12 + (x - 0.5) * 11).toFixed(2) + "deg",
    );
  });
  heroScene.addEventListener("pointerleave", () => {
    heroModel.style.setProperty("--tilt-x", "0deg");
    heroModel.style.setProperty("--tilt-y", "-12deg");
  });
  addEventListener(
    "scroll",
    () => {
      if (scrollY < innerHeight) {
        heroScene.style.setProperty(
          "--depth-scroll",
          (scrollY * 0.045).toFixed(1) + "px",
        );
        heroModel.style.transform =
          "translateY(var(--depth-scroll,0px)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))";
      }
    },
    { passive: true },
  );
}
const reactiveCards = [
  ...document.querySelectorAll(
    ".domain,.spotlight,.solution,.gallery-card,.industry,.video-showcase-frame",
  ),
];
if (
  matchMedia("(pointer:fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  reactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const r = card.getBoundingClientRect(),
        x = (event.clientX - r.left) / r.width,
        y = (event.clientY - r.top) / r.height,
        spread = card.classList.contains("spotlight") ? 3.2 : 5;
      card.style.setProperty("--hot-x", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--hot-y", (y * 100).toFixed(1) + "%");
      card.style.transform =
        "perspective(1100px) rotateX(" +
        ((0.5 - y) * spread).toFixed(2) +
        "deg) rotateY(" +
        ((x - 0.5) * spread).toFixed(2) +
        "deg) translate3d(0,-4px,12px)";
      card.classList.add("depth-tilt-active");
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.classList.remove("depth-tilt-active");
    });
  });
}
let depthQueued = false;
function updateDepthLayers() {
  depthQueued = false;
  const mid = innerHeight * 0.5,
    range = innerHeight * 0.85;
  document
    .querySelectorAll(
      ".domain,.spotlight,.solution,.gallery-card,.video-showcase-frame",
    )
    .forEach((card) => {
      const r = card.getBoundingClientRect(),
        depth = Math.max(
          -1,
          Math.min(1, (mid - (r.top + r.height * 0.5)) / range),
        );
      card.style.setProperty(
        "--scroll-depth",
        (depth * 14).toFixed(2) + "px",
      );
    });
}
function queueDepthLayers() {
  if (!depthQueued) {
    depthQueued = true;
    requestAnimationFrame(updateDepthLayers);
  }
}
addEventListener("scroll", queueDepthLayers, { passive: true });
addEventListener("resize", queueDepthLayers);
updateDepthLayers();
const depthPanels = [
  ...document.querySelectorAll("main>section:not(.hero),.footer"),
];
let panelFrame = 0;
function updatePanelDepth() {
  const center = innerHeight * 0.5,
    range = innerHeight * 1.25;
  depthPanels.forEach((panel) => {
    const r = panel.getBoundingClientRect(),
      value = Math.max(
        -1,
        Math.min(1, (center - (r.top + r.height * 0.5)) / range),
      );
    panel.style.setProperty(
      "--section-depth",
      (value * (innerWidth < 760 ? 15 : 34)).toFixed(1) + "px",
    );
    panel.style.setProperty(
      "--section-angle",
      (value * 2.4).toFixed(2) + "deg",
    );
  });
}
function queuePanelDepth() {
  if (!panelFrame)
    panelFrame = requestAnimationFrame(() => {
      panelFrame = 0;
      updatePanelDepth();
    });
}
addEventListener("scroll", queuePanelDepth, { passive: true });
addEventListener("resize", queuePanelDepth);
updatePanelDepth();
const siteNav = document.querySelector(".nav");
function updateNav() {
  siteNav.classList.toggle("scrolled", scrollY > 28);
  const candidates = [...document.querySelectorAll("main section[id]")];
  let active = "";
  for (const section of candidates) {
    if (section.getBoundingClientRect().top < innerHeight * 0.35)
      active = section.id;
  }
  document
    .querySelectorAll(".navlinks a")
    .forEach((a) =>
      a.classList.toggle("active", a.hash === "#" + active),
    );
}
addEventListener("scroll", updateNav, { passive: true });
updateNav();
(function () {
  const canvas = document.getElementById("robotCanvas"),
    stage = document.querySelector(".hero-model-wrap");
  if (!canvas || !stage || !window.THREE) {
    if (stage) stage.classList.add("model-fallback");
    return;
  }
  const T = window.THREE;
  let renderer;
  try {
    renderer = new T.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (e) {
    stage.classList.add("model-fallback");
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  if ("outputColorSpace" in renderer)
    renderer.outputColorSpace = T.SRGBColorSpace;
  else if ("outputEncoding" in renderer)
    renderer.outputEncoding = T.sRGBEncoding;
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(31, 1, 0.1, 80);
  camera.position.set(0, 0.14, 8.8);
  camera.lookAt(0, -0.02, 0);
  scene.add(new T.HemisphereLight(0xf9e7da, 0x281011, 2.15));
  const key = new T.DirectionalLight(0xffeee3, 4.4);
  key.position.set(-3.4, 5.2, 5);
  scene.add(key);
  const fill = new T.PointLight(0xff4e2f, 24, 8, 2);
  fill.position.set(2.6, 1.3, 2.4);
  scene.add(fill);
  const rim = new T.DirectionalLight(0xff3d27, 3.2);
  rim.position.set(3.2, 2.4, -4);
  scene.add(rim);
  const blue = new T.PointLight(0x91b9c6, 15, 7, 2);
  blue.position.set(-3, -0.2, 1);
  scene.add(blue);
  const rig = new T.Group();
  scene.add(rig);
  const silver = new T.MeshStandardMaterial({
      color: 0xe4e2dc,
      metalness: 0.84,
      roughness: 0.23,
    }),
    lightMetal = new T.MeshStandardMaterial({
      color: 0xbec5c4,
      metalness: 0.8,
      roughness: 0.3,
    }),
    dark = new T.MeshStandardMaterial({
      color: 0x1b2022,
      metalness: 0.72,
      roughness: 0.25,
    }),
    rubber = new T.MeshStandardMaterial({
      color: 0x171a1b,
      metalness: 0.26,
      roughness: 0.55,
    }),
    orange = new T.MeshStandardMaterial({
      color: 0xff542f,
      metalness: 0.54,
      roughness: 0.23,
      emissive: 0xf22b12,
      emissiveIntensity: 1.35,
    }),
    glass = new T.MeshPhysicalMaterial({
      color: 0x11191c,
      metalness: 0.68,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    });
  const add = (geometry, material, parent = rig) => {
      const mesh = new T.Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    },
    orb = (x, y, z, sx, sy, sz, material, parent = rig) => {
      const mesh = add(new T.SphereGeometry(1, 32, 24), material, parent);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      return mesh;
    },
    rod = (a, b, r1, r2, material, parent = rig) => {
      const start = new T.Vector3(a[0], a[1], a[2]),
        end = new T.Vector3(b[0], b[1], b[2]),
        delta = end.clone().sub(start),
        mesh = add(
          new T.CylinderGeometry(r1, r2, delta.length(), 20, 1),
          material,
          parent,
        );
      mesh.position.copy(start.add(end).multiplyScalar(0.5));
      mesh.quaternion.setFromUnitVectors(
        new T.Vector3(0, 1, 0),
        delta.normalize(),
      );
      return mesh;
    },
    box = (x, y, z, sx, sy, sz, material, parent = rig) => {
      const mesh = add(
        new T.BoxGeometry(sx, sy, sz, 2, 2, 2),
        material,
        parent,
      );
      mesh.position.set(x, y, z);
      return mesh;
    };
  rig.position.y = -0.05;
  /* Helmet and optical visor */
  orb(0, 1.28, 0, 0.66, 0.5, 0.49, silver);
  orb(0, 1.22, 0.42, 0.49, 0.265, 0.15, glass);
  box(0, 1.29, 0.555, 0.58, 0.035, 0.025, lightMetal);
  for (const s of [-1, 1]) {
    orb(s * 0.205, 1.24, 0.555, 0.12, 0.052, 0.035, orange);
    orb(
      s * 0.205,
      1.24,
      0.576,
      0.045,
      0.018,
      0.012,
      new T.MeshBasicMaterial({ color: 0xffba99 }),
    );
  }
  box(0, 1.02, 0.53, 0.22, 0.018, 0.022, orange);
  rod([0, 0.85, 0], [0, 0.72, 0], 0.22, 0.2, dark);
  orb(0, 0.72, 0.04, 0.34, 0.13, 0.3, lightMetal);
  /* Core chassis */
  const torso = orb(0, 0.02, 0, 0.78, 0.91, 0.53, silver);
  torso.rotation.z = -0.02;
  const chest = box(0, 0.15, 0.465, 0.82, 0.61, 0.14, dark);
  chest.scale.set(0.95, 1, 1);
  orb(0, 0.19, 0.548, 0.31, 0.235, 0.045, glass);
  for (let i = 0; i < 4; i++)
    box(
      (i - 1.5) * 0.09,
      0.19,
      0.598,
      0.024,
      0.14,
      0.014,
      i === 1 ? orange : lightMetal,
    );
  box(0, -0.36, 0.46, 0.48, 0.035, 0.03, orange);
  for (const s of [-1, 1]) {
    orb(s * 0.68, 0.39, 0, 0.29, 0.31, 0.3, lightMetal);
    orb(s * 0.68, 0.39, 0.245, 0.17, 0.18, 0.065, dark);
    orb(s * 0.68, 0.39, 0.3, 0.07, 0.07, 0.035, orange);
  }
  /* Articulated arms */
  const arms = [];
  for (const s of [-1, 1]) {
    const pivot = new T.Group();
    pivot.position.set(s * 0.83, 0.35, 0);
    rig.add(pivot);
    arms.push({ pivot, side: s });
    orb(0, 0, 0, 0.29, 0.3, 0.3, lightMetal, pivot);
    orb(0, 0, 0.22, 0.17, 0.18, 0.09, dark, pivot);
    rod(
      [0, -0.12, 0],
      [s * 0.09, -0.7, 0.02],
      0.19,
      0.145,
      silver,
      pivot,
    );
    orb(s * 0.09, -0.7, 0.04, 0.18, 0.17, 0.18, dark, pivot);
    orb(s * 0.09, -0.7, 0.17, 0.105, 0.1, 0.05, orange, pivot);
    rod(
      [s * 0.09, -0.7, 0.02],
      [s * 0.13, -1.27, 0.12],
      0.15,
      0.105,
      lightMetal,
      pivot,
    );
    const cuff = add(
      new T.CylinderGeometry(0.14, 0.14, 0.12, 20),
      dark,
      pivot,
    );
    cuff.position.set(s * 0.13, -1.14, 0.1);
    cuff.rotation.z = s * 0.05;
    orb(s * 0.13, -1.4, 0.13, 0.16, 0.19, 0.15, silver, pivot);
    for (let f = -1; f <= 1; f++)
      rod(
        [s * 0.13 + f * 0.07, -1.46, 0.2],
        [s * 0.13 + f * 0.075, -1.61, 0.24],
        0.035,
        0.025,
        lightMetal,
        pivot,
      );
  }
  /* Waist, hips, and legs */
  const pelvis = add(
    new T.CylinderGeometry(0.48, 0.57, 0.43, 12, 1),
    dark,
  );
  pelvis.position.set(0, -0.77, 0);
  const belt = add(
    new T.CylinderGeometry(0.51, 0.53, 0.12, 32),
    lightMetal,
  );
  belt.position.set(0, -0.62, 0);
  box(0, -0.75, 0.49, 0.22, 0.11, 0.045, orange);
  const legs = [];
  for (const s of [-1, 1]) {
    const pivot = new T.Group();
    pivot.position.set(s * 0.39, -0.93, 0);
    rig.add(pivot);
    legs.push({ pivot, side: s });
    orb(0, 0, 0, 0.24, 0.25, 0.25, lightMetal, pivot);
    rod(
      [0, -0.05, 0],
      [s * 0.025, -0.72, 0.02],
      0.22,
      0.155,
      silver,
      pivot,
    );
    orb(s * 0.025, -0.72, 0.05, 0.19, 0.2, 0.19, dark, pivot);
    orb(s * 0.025, -0.72, 0.21, 0.08, 0.08, 0.035, orange, pivot);
    rod(
      [s * 0.025, -0.75, 0.02],
      [s * 0.01, -1.42, 0.12],
      0.16,
      0.115,
      lightMetal,
      pivot,
    );
    const ankle = add(
      new T.CylinderGeometry(0.13, 0.16, 0.11, 18),
      dark,
      pivot,
    );
    ankle.position.set(s * 0.01, -1.36, 0.1);
    orb(s * 0.01, -1.51, 0.25, 0.28, 0.14, 0.45, silver, pivot);
    box(s * 0.01, -1.57, 0.45, 0.4, 0.06, 0.12, dark, pivot);
  }
  /* Floating holographic turntable and detail flecks */
  const ringmat = new T.MeshBasicMaterial({
    color: 0xff6243,
    transparent: true,
    opacity: 0.85,
    side: T.DoubleSide,
  });
  const haloMat = new T.MeshBasicMaterial({
    color: 0xff6848,
    transparent: true,
    opacity: 0.62,
  });
  const haloA = new T.Group(),
    haloB = new T.Group();
  scene.add(haloA, haloB);
  const haloRingA = add(
    new T.TorusGeometry(1.92, 0.012, 8, 128),
    haloMat,
    haloA,
  );
  haloA.rotation.x = 1.18;
  const haloDotA = orb(1.92, 0, 0, 0.055, 0.055, 0.055, orange, haloA);
  const haloRingB = add(
    new T.TorusGeometry(2.08, 0.008, 8, 128),
    new T.MeshBasicMaterial({
      color: 0xffd5c9,
      transparent: true,
      opacity: 0.24,
    }),
    haloB,
  );
  haloB.rotation.set(0.48, 0.7, 0);
  const haloDotB = orb(
    2.08,
    0,
    0,
    0.035,
    0.035,
    0.035,
    lightMetal,
    haloB,
  );
  for (const config of [
    [1.42, 1.438, -2.54],
    [1.78, 1.795, -2.56],
  ]) {
    const ring = add(
      new T.RingGeometry(config[0], config[1], 96),
      ringmat,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = config[2];
  }
  const platform = add(
    new T.CylinderGeometry(1.15, 1.3, 0.09, 64),
    new T.MeshStandardMaterial({
      color: 0x1c1919,
      metalness: 0.83,
      roughness: 0.28,
    }),
  );
  platform.position.y = -2.62;
  const trim = add(new T.TorusGeometry(1.2, 0.018, 8, 80), orange);
  trim.rotation.x = Math.PI / 2;
  trim.position.y = -2.56;
  const particles = [];
  for (let i = 0; i < 34; i++) {
    const a = (i * Math.PI * 2) / 34,
      rad = 2.08 + (i % 3) * 0.13,
      mesh = orb(
        Math.cos(a) * rad,
        ((i % 7) - 3) * 0.36,
        Math.sin(a) * 0.35,
        0.018 + (i % 4) * 0.005,
        0.018 + (i % 4) * 0.005,
        0.018 + (i % 4) * 0.005,
        i % 5 === 0 ? orange : lightMetal,
        scene,
      );
    mesh.material.transparent = true;
    mesh.material.opacity = 0.5 + (i % 4) * 0.1;
    particles.push({
      mesh: mesh,
      baseY: mesh.position.y,
      phase: i * 0.65,
    });
  }
  let px = 0,
    py = 0,
    scrollMix = 0,
    elapsed = 0;
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  stage.addEventListener("pointermove", (e) => {
    const r = stage.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  stage.addEventListener("pointerleave", () => {
    px = 0;
    py = 0;
  });
  const updateScroll = () => {
    const r = document.querySelector(".hero").getBoundingClientRect();
    scrollMix = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  const resize = () => {
    const w = Math.max(1, stage.clientWidth),
      h = Math.max(1, stage.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(stage);
  resize();
  renderer.setAnimationLoop((time) => {
    elapsed = time;
    rig.rotation.y =
      (reduced ? 0 : time * 0.00018) + px * 0.46 + scrollMix * 2.15;
    rig.rotation.x = py * 0.11;
    rig.rotation.z = px * 0.025;
    rig.position.y =
      -0.05 + Math.sin(time * 0.0008) * 0.045 + scrollMix * 0.18;
    rig.scale.setScalar(0.96 + scrollMix * 0.1);
    arms.forEach((a) => {
      a.pivot.rotation.z =
        a.side * (0.025 + Math.sin(time * 0.0012 + a.side) * 0.035);
    });
    legs.forEach((l) => {
      l.pivot.rotation.x = Math.sin(time * 0.0011 + l.side) * 0.012;
    });
    haloA.rotation.y = time * 0.00016 + px * 0.08;
    haloB.rotation.z = -time * 0.00012 + py * 0.06;
    particles.forEach((p) => {
      p.mesh.position.y =
        p.baseY + Math.sin(time * 0.001 + p.phase) * 0.045;
      p.mesh.material.opacity =
        0.32 + (Math.sin(time * 0.002 + p.phase) + 1) * 0.27;
    });
    renderer.render(scene, camera);
  });
})();
