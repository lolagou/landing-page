
import React, { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    title: "1. Escaneo desde casa",
    bullets: [
      "Guías en pantalla para el ángulo correcto",
      "Solo tu celular—sin hardware extra",
      "Captura fotos/video del pie en minutos",
    ],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect x="6" y="10" width="36" height="28" rx="6" />
        <circle cx="24" cy="24" r="5" />
        <path d="M14 16h6" />
      </svg>
    ),
  },
  {
    title: "2. IA que analiza tu pisada",
    bullets: [
      "Detecta arco, pronación y puntos de presión",
      "Ajustes finos según deporte/superficie",
      "Aprende de cada caso para personalizar más",
    ],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M10 24a14 14 0 1 1 28 0" />
        <circle cx="24" cy="24" r="4" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" />
      </svg>
    ),
  },
  {
    title: "3. Impresión 3D y entrega",
    bullets: [
      "Plantilla ortopédica hecha a medida",
      "Materiales de alto rendimiento (TPU)",
      "Te llega lista para usar",
    ],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M8 18l16-8 16 8v16l-16 8-16-8z" />
        <path d="M24 10v28M8 18l16 8 16-8" />
      </svg>
    ),
  },
];

export default function StepCarousel({ auto = true, interval = 4200 }) {
  const [idx, setIdx] = useState(0);
  const clamp = (i) => (i + STEPS.length) % STEPS.length;

  const next = () => setIdx((i) => clamp(i + 1));
  const prev = () => setIdx((i) => clamp(i - 1));

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [idx, auto, interval]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="sc-wrap">
      <style>{CSS}</style>

      <div className="sc-stage" role="region" aria-roledescription="carrusel de pasos">
        <button className="sc-arrow left" onClick={prev} aria-label="Anterior">
          ‹
        </button>

        <div className="sc-rail">
          {STEPS.map((s, i) => {
            let o = i - idx; // offset relativo
            if (o > 1) o -= STEPS.length;
            if (o < -1) o += STEPS.length;

            const tx = o * 360; // separación horizontal
            const rz = -Math.abs(o) * 140; // profundidad
            const ry = -o * 24; // rotación Y
            const sc = 1 - Math.abs(o) * 0.08; // escala

            return (
              <article
                key={s.title}
                className={`sc-card ${i === idx ? "is-active" : ""}`}
                style={{
                  transform: `translateX(${tx}px) translateZ(${rz}px) rotateY(${ry}deg) scale(${sc})`,
                  zIndex: 10 - Math.abs(o),
                }}
                aria-hidden={i !== idx}
              >
                <div className="sc-icon">{s.icon}</div>
                <h3 className="sc-title">{s.title}</h3>
                <ul className="sc-list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <button className="sc-arrow right" onClick={next} aria-label="Siguiente">
          ›
        </button>
      </div>

      <div className="sc-dots" role="tablist" aria-label="Pasos">
        {STEPS.map((_, i) => (
          <button
            key={i}
            className={`sc-dot ${i === idx ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
            role="tab"
            aria-selected={i === idx}
            aria-controls={`step-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

const CSS = `
:root{
  --brand:#6DFFD5;
  --brand2:#CBFFEF;
  --bg:#02001A;
  --ink:#0A0F2A;
  --card: rgba(255,255,255,.05);
  --border: rgba(255,255,255,.14);
  --muted: rgba(255,255,255,.78);
}

.sc-wrap{ position:relative; perspective:1400px; }
.sc-stage{ position:relative; display:grid; place-items:center; }
.sc-rail{ position:relative; transform-style:preserve-3d; height:380px; display:grid; place-items:center; }

.sc-card{
  position:absolute;
  width:min(760px, 92vw);
  max-width:820px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  backdrop-filter: blur(6px);
  border:1px solid var(--border);
  border-radius:18px;
  padding:22px 22px 18px;
  color:#fff;
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
  transition: transform .6s cubic-bezier(.22,.61,.36,1), opacity .4s ease, box-shadow .3s ease;
  opacity:.86;
}
.sc-card.is-active{
  box-shadow: 0 28px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(109,255,213,.08) inset;
  opacity:1;
}

.sc-icon{
  width:64px; height:64px; border-radius:16px;
  display:grid; place-items:center; margin-bottom:12px;
  background: radial-gradient(80% 80% at 50% 20%, rgba(109,255,213,.35), transparent 60%),
              rgba(255,255,255,.06);
  border:1px solid var(--border);
}
.sc-icon svg{
  width:34px; height:34px; stroke: var(--brand2); fill: none; stroke-width:2.2;
}

.sc-title{ margin:8px 0 10px; font-weight:800; color: var(--brand2); letter-spacing:.3px; }
.sc-list{ margin:0; padding:0 0 0 18px; color: var(--muted); display:grid; gap:6px; }

.sc-arrow{
  position:absolute; top:50%; transform:translateY(-50%);
  width:42px; height:42px; border-radius:50%;
  border:1px solid var(--border);
  background: rgba(255,255,255,.06);
  color:#fff; cursor:pointer; backdrop-filter: blur(6px);
}
.sc-arrow.left{ left:-2px; }
.sc-arrow.right{ right:-2px; }

.sc-dots{
  margin-top:14px; display:flex; gap:8px; justify-content:center; align-items:center;
}
.sc-dot{
  width:10px; height:10px; border-radius:999px; border:1px solid var(--border);
  background: rgba(255,255,255,.06); cursor:pointer; transition: all .25s ease;
}
.sc-dot.is-active{
  width:24px; background: var(--brand); border-color: transparent;
}

/* móvil */
@media (max-width:640px){
  .sc-rail{ height:340px; }
  .sc-card{ padding:18px; }
  .sc-icon{ width:56px; height:56px; }
  .sc-icon svg{ width:30px; height:30px; }
}
`;
