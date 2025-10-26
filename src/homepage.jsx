import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo-trevian.png";
import "./App.css";

import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import perfil from "./perfil.png";
import ubicacion from "./ubicacion.png";
import objetivo from "./objective.png";
import perfil1 from "./perfil1.png";
import perfil2 from "./perfil2.png";
import perfil3 from "./perfil3.png";
import perfil4 from "./perfil4.png";
import perfil5 from "./perfil5.png";
import perfil6 from "./perfil6.png";
import proceso from "./proceso.png";
import analiza from "./analiza.png";
import impresion from "./impresion.png";

const perfiles = [perfil6, perfil4, perfil2, perfil5, perfil1, perfil3];

// --- Helpers del hero (botón magnético + marquee + CSS del hero) ---
function MagneticButton({ children, className = "", ...props }) {
  const ref = React.useRef(null);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current, wrap = wrapRef.current;
    if (!el || !wrap) return;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
    };
    const reset = () => (el.style.transform = "translate(0,0)");
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", reset);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, []);
  return (
    <span className={`mag-wrap ${className}`} ref={wrapRef}>
      <button ref={ref} className="btn btn-primary" {...props}>
        {children}
      </button>
    </span>
  );
}

function Marquee({ children, speed = 28 }) {
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track" style={{ "--marquee-speed": `${speed}s` }}>
        <span>{children}</span><span>{children}</span>
        <span>{children}</span><span>{children}</span>
      </div>
    </div>
  );
}

const HERO_CSS = `
.lp-hero-sec{ overflow:visible; }
.hero{
  --mx:50%; --my:50%;
  position:relative; min-height: clamp(520px, 75vh, 820px);
  display:grid; place-items:center; padding:64px 16px; border-radius:20px;
  background:
    radial-gradient(1200px 1200px at var(--mx) var(--my), rgba(109,255,213,.10), transparent 40%),
    radial-gradient(1200px 1200px at calc(100% - var(--mx)) calc(100% - var(--my)), rgba(203,255,239,.06), transparent 45%),
    linear-gradient(135deg, #05003F 0%, #02001A 60%, #000014 100%);
  animation: heroHue 14s ease-in-out infinite alternate;
  box-shadow: 0 30px 80px rgba(0,0,0,.45) inset, 0 10px 40px rgba(0,0,0,.35);
  isolation:isolate;
}
.hero-center{ text-align:center; max-width:880px; }
.hero-title{ color:#CBFFEF; font-size: clamp(36px, 6vw, 68px); line-height:1.05; margin:0 0 12px; }
.hero-sub{ color:rgba(255,255,255,.85); font-size: clamp(16px,2.2vw,20px); margin:0 auto 26px; max-width:56ch; }
.hero-cta{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

.btn{ padding:12px 20px; border-radius:999px; font-weight:700; letter-spacing:.2px; transition:.2s; }
.btn-primary{ background:linear-gradient(180deg, #6DFFD5 0%, #4BE3BE 100%); color:#02001A; border:none; box-shadow:0 8px 28px rgba(109,255,213,.35), 0 2px 8px rgba(0,0,0,.35); }
.btn-primary:hover{ transform: translateY(-2px) scale(1.02); }
.btn-ghost{ background:transparent; color:#CBFFEF; border:1px solid rgba(203,255,239,.45); box-shadow:0 4px 18px rgba(0,0,0,.25) inset; }
.btn-ghost:hover{ border-color: rgba(109,255,213,.85); color:#6DFFD5; transform: translateY(-1px); }
.mag-wrap{ display:inline-grid; place-items:center; padding:6px 8px; border-radius:999px; }

/* Línea neón */
.hero-line{
  position:absolute; inset:0; width:100%; height:100%;
  opacity:.85; mix-blend-mode:screen;
  filter: drop-shadow(0 0 10px rgba(109,255,213,.5));
}
.hero-line path{
  fill:none; stroke:#6DFFD5; stroke-width:6; stroke-linecap:round;
  stroke-dasharray:1400; stroke-dashoffset:1400;
  animation: dash 7s cubic-bezier(.22,.61,.36,1) forwards,
             breathing 4s ease-in-out infinite 7s;
}
@keyframes dash { to { stroke-dashoffset:0; } }
@keyframes breathing {
  0%,100%{ filter: drop-shadow(0 0 0 rgba(109,255,213,0)); }
  50%{    filter: drop-shadow(0 0 20px rgba(109,255,213,.65)); }
}
@keyframes heroHue {
  0%{ filter:hue-rotate(0deg) saturate(1); }
  100%{ filter:hue-rotate(9deg) saturate(1.05); }
}/* Banda dinámica SIN líneas */
.ribbon-flat{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  width: min(1100px, calc(100% - 64px));
  pointer-events: none;
}

.ribbon-viewport{
  overflow: hidden;
  background: #080724; /* franja oscura */
  padding: 10px 0;
}

/* Animación del texto en loop */
.ribbon-track{
  display: inline-flex;
  gap: 64px;
  white-space: nowrap;
  will-change: transform;
  animation: ribbonScroll var(--ribbon-speed, 22s) linear infinite;
}

@keyframes ribbonScroll {
  to { transform: translateX(-50%); }
}

.ribbon-group{
  display: inline-flex;
  align-items: center;
  gap: clamp(20px, 6vw, 64px);
  padding: 0 16px;
}

.ribbon-group span{
  color: #CBFFEF;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  font-size: clamp(12px, 1.9vw, 14px);
}

.ribbon-group .sep{
  color: #6DFFD5;
  opacity: .95;
  font-style: normal;
  font-weight: 900;
  transform: translateY(-1px);
  font-size: clamp(14px, 2.2vw, 16px);
}

/* Opcional: ancho fijo en pantallas grandes */
@media (min-width: 1280px){
  .ribbon-flat{ width: 1100px; }
}

`;


function CoverflowCarousel() {
  const slides = [
    {
      title: "ESCANEÁ",
      desc: "Tomá fotos de tus pies desde casa con guías visuales para el ángulo perfecto.",
      icon: "📱",
    },
    {
      title: "ANALIZÁ",
      desc: "Nuestra IA detecta puntos clave y crea una plantilla única para vos.",
      icon: "🤖",
    },
    {
      title: "IMPRIMÍ",
      desc: "Fabricamos tu plantilla 3D personalizada y te la enviamos a casa.",
      icon: "🦶",
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  React.useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cf-min">
      <style>{CSS}</style>

      <div className="cf-bg" />

      <div className="cf-card">
        <div className="cf-icon">{slides[idx].icon}</div>
        <h3 className="cf-title">{slides[idx].title}</h3>
        <p className="cf-desc">{slides[idx].desc}</p>
      </div>


      <div className="cf-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

const CSS = `
.cf-min {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
}

/* 🔮 Fondo dinámico tipo Nike */
.cf-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(109,255,213,0.2), transparent 60%),
              linear-gradient(135deg, #05003F 0%, #02001A 50%, #000014 100%);
  filter: blur(30px);
  z-index: 0;
  animation: pulse 8s ease-in-out infinite alternate;
}
@keyframes pulse {
  0% { opacity: 0.8; transform: scale(1);}
  100% { opacity: 1; transform: scale(1.05);}
}

/* Card */
.cf-card {
  position: relative;
  z-index: 1;
  text-align: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 40px 30px;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
}
.cf-icon {
  font-size: 48px;
  margin-bottom: 10px;
}
.cf-title {
  font-size: 22px;
  color: #6DFFD5;
  margin-bottom: 8px;
}
.cf-desc {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
  line-height: 1.4;
}

/* Arrows */
.cf-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #CBFFEF;
  font-size: 28px;
  width: 42px; height: 42px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}
.cf-arrow:hover { background: rgba(109,255,213,0.2); color: #6DFFD5; }
.cf-arrow.left { left: 10%; }
.cf-arrow.right { right: 10%; }

/* Dots */
.cf-dots {
  display: flex;
  gap: 8px;
  margin-top: 18px;
  z-index: 2;
}
.dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}
.dot.active {
  width: 24px;
  border-radius: 12px;
  background: #6DFFD5;
}
`;


/* ===== Desarrollador ===== */
function DevCard({ name, role, linkedin, avatar = perfil }) {
  return (
    <article className="devx-card">
      <div
        className="devx-photo"
        style={{ backgroundImage: `url(${avatar})` }}
        aria-label={name}
      />
      <div className="devx-info">
        <h4 className="devx-name">{name}</h4>
        <p className="devx-role">{role}</p>

        {linkedin && (
          <a className="devx-link" href={linkedin} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="devx-ln-ico">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.98 0h3.83v2.18h.05c.53-1 1.84-2.18 3.79-2.18 4.05 0 4.8 2.67 4.8 6.15V24h-4v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24h-4V8z"/>
            </svg>
            <span className="devx-ln-text">@{name.split(" ")[0].toLowerCase()}</span>
          </a>
        )}
      </div>
    </article>
  );
}


export default function LandingPage() {

  const heroRef = useRef(null);
  const objetivoRef = useRef(null);
  const procesoRef = useRef(null);
  const trabajamosRef = useRef(null);
  const devsRef = useRef(null);
  const contactoRef = useRef(null);
  const testimoniosRef = useRef(null);

  const heroBgRef = useRef(null);
  const handleHeroMove = (e) => {
    const el = heroBgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };


  const [showRibbon, setShowRibbon] = useState(true);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (ents) => setShowRibbon(!!ents[0]?.isIntersecting),
      { threshold: 0.4 }
    );
    if (heroRef.current) ob.observe(heroRef.current);
    return () => ob.disconnect();
  }, []);

  const items = [
    { label: "Inicio", ref: heroRef },
    { label: "Nuestro objetivo", ref: objetivoRef },
    { label: "Nuestra app", ref: procesoRef },
    { label: "Así trabajamos", ref: trabajamosRef },
    { label: "Desarrolladores", ref: devsRef },
    { label: "Contacto", ref: contactoRef },
  ];
  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth" });

  const team = [
    { name: "IGNACIO VALCARCE", role: "UX/UI Designer", linkedin: "#" },
    { name: "LOLA EMMA GOUGET", role: "Front-End Developer", linkedin: "#" },
    { name: "LUCAS BERTOLONI", role: "Back-End Developer", linkedin: "#" },
    { name: "MATIAS SZPEKTOR", role: "AI Developer", linkedin: "#" },
    { name: "MATIAS MAYANS", role: "Material Designer", linkedin: "#" },
    { name: "LUCAS GARBATE", role: "Algorithm Developer", linkedin: "#" },
  ];

  return (
    <div className="lp-root">
      {/* NAVBAR */}
      <header className="lp-navbar">
        <div className="lp-nav-inner">
          <div className="lp-nav-left">
            <div className="lp-brand" onClick={() => scrollTo(heroRef)} role="button">
              <img src={logo} alt="Logo Trevian" className="lp-logo" />
            </div>
          </div>

          <nav className="lp-nav-center">
            {items.map((it) => (
              <button key={it.label} className="lp-pill" onClick={() => scrollTo(it.ref)}>
                {it.label}
              </button>
            ))}
          </nav>

          <div className="lp-nav-right" />
        </div>
      </header>

      <main className="lp-main">
        {/* HERO (nuevo) */}
<section ref={heroRef} className="lp-section lp-hero-sec">
  {/* CSS del hero scoped */}
  <style>{HERO_CSS}</style>

  <div
    ref={heroBgRef}
    className="hero"
    onMouseMove={handleHeroMove}
  >
    {/* línea neon */}
    <svg className="hero-line" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden>
      <path d="M0,220 C160,160 280,320 420,260 S720,140 860,220 1060,320 1200,260" />
    </svg>

    {/* centro */}
    <div className="hero-center">
      <h1 className="hero-title">TU PLANTILLA ORTOPÉDICA, A MEDIDA</h1>
      <p className="hero-sub">
        Escaneá desde tu casa, nuestra IA diseña tu plantilla 3D y la integramos en una
        zapatilla deportiva personalizada.
      </p>
    </div>

    {/* marquee inferior (opcional, podés borrarlo si no lo querés) */}
    {/* reemplazo de la banda */}
    {showRibbon && (
  <div className="ribbon-flat" aria-hidden>
    <div className="ribbon-viewport">
      <div className="ribbon-track" style={{ "--ribbon-speed": "22s" }}>
        {/* grupo 1 */}
        <div className="ribbon-group">
          <span>MÁS RÁPIDO</span><i className="sep">~</i>
          <span>MÁS FÁCIL</span><i className="sep">~</i>
          <span>¡SIN SALIR DE TU CASA!</span><i className="sep">~</i>
          <span>TE LLEGA A TU CASA</span>
        </div>
        {/* grupo 2 (idéntico, para loop continuo) */}
        <div className="ribbon-group" aria-hidden>
          <span>MÁS RÁPIDO</span><i className="sep">~</i>
          <span>MÁS FÁCIL</span><i className="sep">~</i>
          <span>¡SIN SALIR DE TU CASA!</span><i className="sep">~</i>
          <span>TE LLEGA A TU CASA</span>
        </div>
    </div>
    </div>
  </div>
)}



  </div>
</section>


        {/* NUESTRO OBJETIVO */}
        <section ref={objetivoRef} className="lp-section lp-pad objetivo-grid">
          <h2 className="lp-h2 center">NUESTRO OBJETIVO</h2>

          <div className="obj-grid">
            

<div
className="obj-photo obj-photo--square"
style={{ backgroundImage: `url(${objetivo})` }}
/>

            <div className="obj-text">
              <h3 className="obj-kicker">RENDIMIENTO SIN LESIONES</h3>
              <p>
                Democratizar plantillas ortopédicas de alto rendimiento mediante análisis de
                pisada con IA e impresión 3D, para voleibolistas, tenistas y basquetbolistas.
              </p>
              <p>
                Con imágenes y videos capturados por el usuario o su kinesiólogo, generamos
                un modelo 3D personalizado que corrige y optimiza la pisada.
              </p>
              <p>Integración directa en una zapatilla impresa en 3D para máxima eficiencia.</p>
            </div>
          </div>
        </section>

        {/* NUESTRA APP */}
        <section ref={procesoRef} className="lp-section lp-pad">
          <h2 className="lp-h2 center">NUESTRA APP</h2>
          <p className="lp-sub center">Conocé la app que te va a facilitar el acceso a tus plantillas</p>
          <CoverflowCarousel />
        </section>

        {/* ASÍ TRABAJAMOS */}
<section ref={trabajamosRef} className="lp-section lp-pad">
  <h2 className="lp-h2 center">ASÍ TRABAJAMOS</h2>

  <div className="workcards-grid">

    <article className="workcard">
      <div
        className="workcard-img"
        style={{ backgroundImage: `url(${img1})` }}
        aria-label="Materiales TPU flexibles"
      />
      <h3 className="workcard-title">MATERIALES TPU FLEXIBLES</h3>
      <p className="workcard-copy">
        Alta tecnología en materiales aptos para impresión 3D.
      </p>
    </article>


    <article className="workcard">
      <div
        className="workcard-img"
        style={{ backgroundImage: `url(${img2})` }}
        aria-label="Entrevistas con especialistas"
      />
      <h3 className="workcard-title">ENTREVISTAS CON ESPECIALISTAS</h3>
      <p className="workcard-copy">
        Charlas con kinesiólogos, ortopedistas y podólogos para entender mejor
        los estudios que realizan para analizar la pisada.
      </p>
    </article>

    <article className="workcard">
      <div
        className="workcard-img"
        style={{ backgroundImage: `url(${img3})` }}
        aria-label="Congresos de ortopedia"
      />
      <h3 className="workcard-title">CONGRESOS DE ORTOPEDIA</h3>
      <p className="workcard-copy">
        Hemos participado en congresos compartiendo experiencias con especialistas.
      </p>
    </article>
  </div>
</section>

{/* TESTIMONIOS */}
<section ref={testimoniosRef} className="lp-section lp-pad t-section">
  <h2 className="lp-h2 t-title">TESTIMONIOS</h2>

  <div className="t-cards-wrap">
    {/* Glow turquesa detrás */}
    <div className="t-glow" aria-hidden />

    <article className="t-card">
      <p className="t-text">
      "Mi trabajo diario requiere precisión absoluta en cada plantilla ortopédica que entrego. Trevian ha revolucionado por completo la manera en que genero mis diseños. Con un simple escaneo del pie desde el teléfono, la app analiza la morfología, detecta puntos de presión y sugiere automáticamente la plantilla más adecuada."
      </p>
      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Dra. Mariana López</div>
          <div className="t-role">Podóloga</div>
        </div>
      </div>
    </article>

    <article className="t-card">
      <p className="t-text">
      "Como corredora de élite, cada detalle de mi entrenamiento y equipamiento cuenta. Mis pies soportan una enorme carga durante la preparación y las competencias. Con Trevian, puedo escanear mis pies directamente desde la app móvil y la inteligencia artificial genera plantillas ortopédicas totalmente personalizadas para mis necesidades específicas."
      </p>
      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Martina Ríos</div>
          <div className="t-role">Atleta de alto rendimiento</div>
        </div>
      </div>
    </article>

    <article className="t-card">
      <p className="t-text">
      "Como kinesiólogo, siempre busco la manera de ofrecer plantillas ortopédicas totalmente personalizadas para mis pacientes. Con Trevian, puedo escanear el pie del paciente directamente con la app móvil y, gracias a la inteligencia artificial, la aplicación genera automáticamente una plantilla ortopédica precisa"
      </p>
      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Dr. Juan Pérez</div>
          <div className="t-role">Kinesiólogo</div>
        </div>
      </div>
    </article>
  </div>
</section>


<h2 className="lp-h2 center">DESARROLLADORES</h2>
<div className="devx-grid">
  {team.map((m, i) => (
    <DevCard
      key={m.name}
      {...m}
      avatar={perfiles[i % perfiles.length]} // usa módulo por si hay más integrantes que imágenes
    />
  ))}
</div>



        {/* CONTACTO */}
        <section ref={contactoRef} className="lp-section lp-pad contact-sec">
          <h2 className="lp-h2 center">CONTACTO</h2>

          <div className="contact-grid">
            <div className="contact-left">
              <p className="contact-copy">
                Te invitamos a que nos escribas a <a href="mailto:info@trevian.ar">info@trevian.ar</a><br/>
                ante cualquier duda o consulta.
              </p>
            </div>

            <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
              <label className="f-row">
                <span>Nombre*</span>
                <input className="f-input f-underline"/>
              </label>
              <label className="f-row">
                <span>Organización</span>
                <input className="f-input f-underline" />
              </label>
              <label className="f-row">
                <span>Email*</span>
                <input type="email" required className="f-input f-underline" />
              </label>
              <label className="f-row">
                <span>Mensaje</span>
                <textarea rows={3} className="f-input f-underline" />
              </label>
              <div className="contact-actions">
                <button className="contact-send" type="submit">ENVIAR</button>
              </div>
            </form>
          </div>

          {/* Footer*/}
          <div className="footer-topline" />
          <footer className="site-footer">
            <div className="foot-brand">
              <img src={logo} alt="Trevian" className="foot-logo" />
            </div>

            <div className="foot-col">
              <h5>MAPA DEL SITIO</h5>
              <ul>
                <li><button onClick={()=>scrollTo(objetivoRef)}>Servicios</button></li>
                <li><button onClick={()=>scrollTo(trabajamosRef)}>Clientes</button></li>
                <li><button onClick={()=>scrollTo(procesoRef)}>Novedades</button></li>
                <li><button onClick={()=>scrollTo(devsRef)}>Nosotros</button></li>
                <li><button onClick={()=>scrollTo(contactoRef)}>Contacto</button></li>
              </ul>
            </div>

            <div className="foot-col">
  <h5>UBICACIÓN</h5>
  <img className="map-img" src={ubicacion} alt="Ubicación" />
  <small>Escuela ORT Sede N°2,<br/>Buenos Aires, Argentina</small>
</div>

            <div className="foot-col redes">
              <h5>Seguinos en nuestras redes</h5>
              <div className="socials">
                <a aria-label="Instagram" href="#"><span className="s-ico">⌾</span></a>
                <a aria-label="Facebook" href="#"><span className="s-ico">f</span></a>
                <a aria-label="LinkedIn" href="#"><span className="s-ico">in</span></a>
              </div>
            </div>
          </footer>

          <div className="copyright">
            Copyright © {new Date().getFullYear()} Trevian – Todos los derechos reservados.
          </div>
        </section>
      </main>
    </div>
  );
}
