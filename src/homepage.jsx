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

const perfiles = [perfil6, perfil4, perfil2, perfil5, perfil1, perfil3];

/* ===== Carrusel 3D ===== */
function CoverflowCarousel() {
  const slides = [
    {
      title: "1. PROCESO DE ESCANEO",
      desc:
        "Usá la app para tomar fotos y videos de tus pies desde casa. Guías en pantalla garantizan el ángulo correcto.",
    },
    {
      title: "2. IA QUE TE ANALIZA",
      desc:
        "Nuestros modelos de ML detectan puntos clave, arco plantar y alineación para diseñar una plantilla única para vos.",
    },
    {
      title: "3. IMPRESIÓN 3D",
      desc:
        "Fabricamos tu plantilla e integramos el diseño directamente en una zapatilla deportiva personalizada.",
    },
  ];

  const CFG = { spreadX: 360, depthZ: 210, rotateY: 36, scaleStep: 0.08, maxOffset: 2 };

  const [idx, setIdx] = useState(0);
  const clamp = (i) => (i + slides.length) % slides.length;
  const next = () => setIdx((i) => clamp(i + 1));

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4200);
    return () => clearInterval(id);
  }, [paused, idx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") setIdx((i) => clamp(i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="cf3d-wrap no-arrows"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cf3d-wing left" aria-hidden />
      <div className="cf3d-wing right" aria-hidden />

      <div className="cf3d-stage" role="region" aria-roledescription="carrusel 3D">
        {slides.map((s, i) => {
          let o = i - idx;
          if (o > CFG.maxOffset) o -= slides.length;
          if (o < -CFG.maxOffset) o += slides.length;

          const tx = o * CFG.spreadX;
          const rz = -Math.abs(o) * CFG.depthZ;
          const ry = -o * CFG.rotateY;    
          const sc = 1 - Math.abs(o) * CFG.scaleStep;

          return (
            <article
              key={s.title}
              className="cf3d-card"
              style={{
                transform: `translateX(${tx}px) translateZ(${rz}px) rotateY(${ry}deg) scale(${sc})`,
                zIndex: 10 - Math.abs(o),
              }}
            >
              <header className="cf3d-title">{s.title}</header>

              <div className="cf3d-inner">
                <div className="cf3d-media" aria-label="media del paso" />
                <p className="cf3d-text">{s.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

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
        {/* HERO */}
        <section ref={heroRef} className="lp-section lp-hero-sec">
          <div
            ref={heroBgRef}
            className="lp-hero fancy-hero"
            onMouseMove={handleHeroMove}
          >
            <div className="lp-hero-center">
              <h1 className="lp-hero-title">TU PLANTILLA ORTOPEDICA, A MEDIDA</h1>
              <p className="lp-hero-sub">
                Escaneá desde tu casa, nuestra IA diseña tu plantilla 3D y la integramos en una
                zapatilla deportiva personalizada.
              </p>
              <div className="lp-hero-cta">
                <button className="lp-btn-ghost" onClick={() => scrollTo(procesoRef)}>
                  VER COMO FUNCIONA
                </button>
              </div>
            </div>

            {showRibbon && (
              <div className="ribbon">
                <div className="ribbon-track">
                  <span>MÁS RÁPIDO</span><span className="sep">~</span>
                  <span>MÁS FÁCIL</span><span className="sep">~</span>
                  <span>¡SIN SALIR DE TU CASA!</span><span className="sep">~</span>
                  <span>TE LLEGA A TU CASA</span>
                  <span>MÁS RÁPIDO</span><span className="sep">~</span>
                  <span>MÁS FÁCIL</span><span className="sep">~</span>
                  <span>¡SIN SALIR DE TU CASA!</span><span className="sep">~</span>
                  <span>TE LLEGA A TU CASA</span>
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
      "Mi trabajo diario requiere precisión absoluta en cada plantilla ortopédica que entrego. Trevian ha revolucionado por completo la manera en que genero mis diseños. Con un simple escaneo del pie desde el teléfono, la app analiza la morfología, detecta puntos de presión y sugiere automáticamente la plantilla más adecuada. Lo impresionante es cómo la inteligencia artificial aprende de cada caso: cuanto más la uso, más refinadas se vuelven las recomendaciones de ajuste."
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
      "Como corredora de élite, cada detalle de mi entrenamiento y equipamiento cuenta. Mis pies soportan una enorme carga durante la preparación y las competencias, y cualquier desajuste puede derivar en lesiones. Con Trevian, puedo escanear mis pies directamente desde la app móvil y la inteligencia artificial genera plantillas ortopédicas totalmente personalizadas para mis necesidades específicas. Lo increíble es que no solo corrige mi postura y distribuye la presión correctamente, sino que también me permite hacer ajustes finos según el tipo de entrenamiento o la superficie de carrera."
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
      "Como kinesiólogo, siempre busco la manera de ofrecer plantillas ortopédicas totalmente personalizadas para mis pacientes. Antes del uso de Trevian, el proceso era largo: tomar medidas manuales, dibujar el molde, probar varias versiones. Todo eso consumía horas de trabajo. Con Trevian, puedo escanear el pie del paciente directamente con la app móvil y, gracias a la inteligencia artificial, la aplicación genera automáticamente una plantilla ortopédica precisa y lista para ajustar."
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
