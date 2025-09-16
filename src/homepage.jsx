import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo-trevian.png";
import "./App.css";

/* === Carrusel simple (Coverflow light, más grande) === */
function CoverflowCarousel() {
  const slides = [
    {
      title: "1. Escaneá tu pisada",
      desc:
        "Usá la app para tomar fotos y videos de tus pies desde casa. Guías en pantalla garantizan el ángulo correcto.",
    },
    {
      title: "2. IA que te analiza",
      desc:
        "Nuestros modelos de ML detectan puntos clave, arco plantar y alineación para diseñar una plantilla única para vos.",
    },
    {
      title: "3. Impresión 3D",
      desc:
        "Fabricamos tu plantilla e integramos el diseño directamente en una zapatilla deportiva personalizada.",
    },
  ];

  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="cf-wrap">
      <button className="cf-nav" onClick={prev} aria-label="Anterior">‹</button>
      <div className="cf-stage">
        {slides.map((s, i) => {
          const pos = i - idx;
          return (
            <article
              key={s.title}
              className={`cf-card ${pos === 0 ? "is-center" : pos < 0 ? "is-left" : "is-right"}`}
              style={{ "--pos": pos }}
            >
              <h3 className="cf-title">{s.title}</h3>
              <p className="cf-desc">{s.desc}</p>
            </article>
          );
        })}
      </div>
      <button className="cf-nav" onClick={next} aria-label="Siguiente">›</button>
    </div>
  );
}

export default function LandingPage() {
  // Refs de secciones
  const heroRef = useRef(null);
  const objetivoRef = useRef(null);
  const procesoRef = useRef(null);
  const trabajamosRef = useRef(null);
  const devsRef = useRef(null);
  const contactoRef = useRef(null);

  // Fondo interactivo del hero
  const heroBgRef = useRef(null);
  const handleHeroMove = (e) => {
    const el = heroBgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  // Cinta solo visible en el HERO
  const [showRibbon, setShowRibbon] = useState(true);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => setShowRibbon(entries[0]?.isIntersecting ?? false),
      { threshold: 0.4 }
    );
    if (heroRef.current) ob.observe(heroRef.current);
    return () => ob.disconnect();
  }, []);

  // Navbar
  const items = [
    { label: "Inicio", ref: heroRef },
    { label: "Nuestro objetivo", ref: objetivoRef },
    { label: "Nuestra app", ref: procesoRef },
    { label: "Así trabajamos", ref: trabajamosRef },
    { label: "Desarrolladores", ref: devsRef },
    { label: "Contacto", ref: contactoRef },
  ];
  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="lp-root">
      {/* NAVBAR centrada */}
      <header className="lp-navbar">
        <div className="lp-nav-inner">
          <div className="lp-brand" onClick={() => scrollTo(heroRef)} role="button">
            <img src={logo} alt="Logo Trevian" className="lp-logo" />
          </div>
          <nav className="lp-nav-center">
            {items.map((it) => (
              <button key={it.label} className="lp-pill" onClick={() => scrollTo(it.ref)}>
                {it.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="lp-main">
        {/* HERO con fondo interactivo + cinta */}
        <section ref={heroRef} className="lp-section lp-hero-sec">
          <div
            ref={heroBgRef}
            className="lp-hero fancy-hero"
            onMouseMove={handleHeroMove}
          >
            <div className="lp-hero-center">
              <h1 className="lp-hero-title">Tu plantilla ortopédica, a medida</h1>
              <p className="lp-hero-sub">
                Escaneá desde tu casa, nuestra IA diseña tu plantilla 3D y la integramos en una
                zapatilla deportiva personalizada.
              </p>
              <div className="lp-hero-cta">
                <button className="lp-btn-primary">Empezar</button>
                <button className="lp-btn-ghost" onClick={() => scrollTo(procesoRef)}>
                  Ver cómo funciona
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

        {/* NUESTRO OBJETIVO (foto + texto) */}
        <section ref={objetivoRef} className="lp-section lp-pad objetivo-grid">
          <h2 className="lp-h2 center">NUESTRO OBJETIVO</h2>

          <div className="obj-grid">
            {/* Cuando subas tu foto, agregá style={{backgroundImage:"url('/ruta.jpg')"}} */}
            <div className="obj-photo" aria-label="Foto objetivo" />
            <div className="obj-text">
              <h3 className="obj-kicker">Rendimiento sin lesiones</h3>
              <p>
                Democratizar plantillas ortopédicas de alto rendimiento mediante análisis de
                pisada con IA e impresión 3D, para deportistas como voleibolistas, tenistas y
                basquetbolistas.
              </p>
              <p>
                Desde imágenes y videos capturados por el usuario o por su kinesiólogo, generamos
                un modelo 3D personalizado que corrige y optimiza la pisada, mejorando estabilidad,
                tracción y recuperación.
              </p>
              <p>
                Integración directa en la zapatilla impresa en 3D para que cada paso sea más
                eficiente.
              </p>
            </div>
          </div>
        </section>

        {/* NUESTRA APP (carrusel 3 pasos) */}
        <section ref={procesoRef} className="lp-section lp-pad">
          <h2 className="lp-h2 center">NUESTRA APP</h2>
          <CoverflowCarousel />
        </section>

        {/* ASÍ TRABAJAMOS (3 fotos) */}
        <section ref={trabajamosRef} className="lp-section lp-pad">
          <h2 className="lp-h2 center">ASÍ TRABAJAMOS</h2>

          <div className="work-grid">
            <div className="work-big" />
            <div className="work-small top" />
            <div className="work-small bottom" />
          </div>

          <p className="work-note">
            (Luego reemplazá estos placeholders por tus fotos: escaneo, análisis y producción)
          </p>
        </section>

        {/* DESARROLLADORES */}
        <section ref={devsRef} className="lp-section lp-pad">
          <h2 className="lp-h2 center">DESARROLLADORES</h2>
          <div className="devs-grid">
            <article className="dev-card">
              <div className="dev-avatar" />
              <div>
                <h3 className="dev-name">Lola Emma Núñez Gouget</h3>
                <p className="dev-role">Front-end · React Native · Integración Swift/RealityKit</p>
              </div>
            </article>

            <article className="dev-card">
              <div className="dev-avatar" />
              <div>
                <h3 className="dev-name">Lucas Bertoloni</h3>
                <p className="dev-role">Back-end · API · Infra</p>
              </div>
            </article>

            <article className="dev-card">
              <div className="dev-avatar" />
              <div>
                <h3 className="dev-name">Ignacio Núñez Valcarce</h3>
                <p className="dev-role">UX/UI · Diseño de interacción</p>
              </div>
            </article>
          </div>
        </section>

        {/* CONTACTO */}
        <section ref={contactoRef} className="lp-section lp-pad">
          <h2 className="lp-h2 center">CONTACTO</h2>
          <form className="lp-form">
            <input className="lp-input" placeholder="Tu nombre" />
            <input className="lp-input" placeholder="Email" />
            <textarea rows={4} className="lp-input" placeholder="Mensaje" />
            <button type="button" className="lp-btn-primary lp-wmax">Enviar</button>
          </form>
        </section>
      </main>
    </div>
  );
}
