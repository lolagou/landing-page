import React, { useRef, useState } from "react";
import logo from "./assets/logo-trevian.png";
import CoverflowCarousel from "./CoverflowCarousel";
import "./App.css";

export default function LandingPage() {
  // Refs de secciones
  const heroRef = useRef(null);
  const queEsRef = useRef(null);
  const procesoRef = useRef(null);
  const beneficiosRef = useRef(null);
  const contactoRef = useRef(null);
  const testimoniosRef = useRef(null);

  // Navbar mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // HERO interactivo
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

  const items = [
    { label: "Inicio", ref: heroRef },
    { label: "Qué es", ref: queEsRef },
    { label: "Proceso", ref: procesoRef },
    { label: "Beneficios", ref: beneficiosRef },
    { label: "Testimonios", ref: testimoniosRef },
    { label: "Contacto", ref: contactoRef },
  ];

  const scrollTo = (ref) => {
    setMenuOpen(false);
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lp-root">
      {/* NAVBAR fija */}
      <header className="lp-navbar">
        <div className="lp-nav-inner">
          {/* Marca */}
          <div className="lp-brand" onClick={() => scrollTo(heroRef)} style={{cursor:"pointer"}}>
            <img src={logo} alt="Logo Trevian" className="lp-logo" />
          </div>

          {/* Centro: links de texto (sin pills) */}
          <nav className="lp-nav-center">
            {items.map((it) => (
              <button
                key={it.label}
                className="lp-pill"
                onClick={() => scrollTo(it.ref)}
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Acciones derecha */}
          <div className="lp-nav-right">
            <button
              className="lp-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              <svg viewBox="0 0 24 24" className="lp-burger-ico">
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú mobile */}
        {menuOpen && (
          <div className="lp-mobile-menu">
            {items.map((it) => (
              <button
                key={it.label}
                className="lp-mobile-pill"
                onClick={() => scrollTo(it.ref)}
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CONTENIDO (espacio por navbar fija) */}
      <main className="lp-main">
        {/* HERO oscuro y reactivo */}
        <section ref={heroRef} className="lp-section lp-hero-sec">
          <div
            ref={heroBgRef}
            className="lp-hero fancy-hero"
            onMouseMove={handleHeroMove}
          >
            <div className="lp-hero-center">
              <h1 className="lp-hero-title">Tu plantilla ortopédica, a medida</h1>
              <p className="lp-hero-sub">
                Escaneá desde tu casa, personalizá y recibí tu par sin moverte.
                Rápido, fácil y seguro.
              </p>
              <div className="lp-hero-cta">
                <button className="lp-btn-primary">Empezar</button>
                <button className="lp-btn-ghost">Saber más</button>
              </div>
            </div>
          </div>
        </section>

        {/* ¿QUÉ ES? */}
        <section ref={queEsRef} className="lp-section lp-pad">
          <h2 className="lp-h2">NUESTRO OBJETIVO</h2>
          <p className="lp-p">
            Trevian utiliza visión 3D e impresión a medida para diseñar plantillas
            personalizadas. El proceso está pensado para optimizar rendimiento y
            prevenir lesiones en deportistas y personas activas.
          </p>
        </section>

        {/* PROCESO (Carrusel Coverflow sin flechas ni puntos) */}
        <section ref={procesoRef} className="lp-section lp-pad">
          <h2 className="lp-h2">NUESTRA APP</h2>
          <CoverflowCarousel />
        </section>

        {/* BENEFICIOS */}
        <section ref={beneficiosRef} className="lp-section lp-pad">
          <h2 className="lp-h2">BENEFICIOS</h2>
          <ul className="lp-list">
            <li>Corrección postural y prevención de lesiones.</li>
            <li>Proceso 100% remoto, sin visitas al consultorio.</li>
            <li>Calce perfecto y materiales de alto rendimiento.</li>
            <li>Integración con tu rutina de entrenamiento.</li>
          </ul>
        </section>

{/* TESTIMONIOS */}
<section ref={testimoniosRef} className="lp-section lp-pad t-section">
  <h2 className="lp-h2 t-title">TESTIMONIOS</h2>

  <div className="t-cards-wrap">
    {/* Glow turquesa detrás de las cards */}
    <div className="t-glow" aria-hidden />

    {/* Podés mapear un array si querés */}
    <article className="t-card">
      <p className="t-text">
        Lorem ipsum dolor sit amet consectetur. Turpis lectus tellus diam
        molestie aliquam nisl. Egestas volutpat imperdiet tristique duis
        aliquam ut tortor lobortis. Eleifend aliquam integer massa gravida
        maecenas lacus sit aliquet volutpat. Vestibulum vulputate mi ultricies
        vitae nulla sem in ullamcorper. Dictum arcu lectus feugiat sit venenatis.
      </p>

      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Lucas Bertoloni</div>
          <div className="t-role">Diseñador UX/UI</div>
        </div>
      </div>
    </article>

    <article className="t-card">
      <p className="t-text">
        Lorem ipsum dolor sit amet consectetur. Turpis lectus tellus diam
        molestie aliquam nisl. Egestas volutpat imperdiet tristique duis
        aliquam ut tortor lobortis. Eleifend aliquam integer massa gravida
        maecenas lacus sit aliquet volutpat. Vestibulum vulputate mi ultricies
        vitae nulla sem in ullamcorper. Dictum arcu lectus feugiat sit venenatis.
      </p>

      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Ignacio Núñez</div>
          <div className="t-role">Diseñador UX/UI</div>
        </div>
      </div>
    </article>

    <article className="t-card">
      <p className="t-text">
        Lorem ipsum dolor sit amet consectetur. Turpis lectus tellus diam
        molestie aliquam nisl. Egestas volutpat imperdiet tristique duis
        aliquam ut tortor lobortis. Eleifend aliquam integer massa gravida
        maecenas lacus sit aliquet volutpat. Vestibulum vulputate mi ultricies
        vitae nulla sem in ullamcorper. Dictum arcu lectus feugiat sit venenatis.
      </p>

      <div className="t-person">
        <div className="t-avatar" />
        <div className="t-id">
          <div className="t-name">Lola Gouget</div>
          <div className="t-role">Diseñador UX/UI</div>
        </div>
      </div>
    </article>
  </div>
</section>


        {/* CONTACTO */}
        <section ref={contactoRef} className="lp-section lp-pad">
          <h2 className="lp-h2">CONTACTO</h2>
          <div className="lp-form-wrap">
            <form className="lp-form">
              <input className="lp-input" placeholder="Tu nombre" />
              <input className="lp-input" placeholder="Email" />
              <textarea rows={4} className="lp-input" placeholder="Mensaje" />
              <button type="button" className="lp-btn-primary lp-wmax">
                Enviar
              </button>
            </form>
          </div>
        </section>

        <div className="lp-spacer" />
      </main>

      {/* BANDA INFERIOR FIJA (claims) */}
      <div className="lp-bottom-wrap">
        <div className="lp-bottom">
          <Badge>Más rápido</Badge>
          <Wave />
          <Badge>Más fácil</Badge>
          <Wave />
          <Badge>¡Sin salir de tu casa!</Badge>
          <Wave />
          <Badge>Te llega a tu casa</Badge>
        </div>
      </div>

      {/* Footer separador para que la banda no tape el final */}
      <footer className="lp-footer" />
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="lp-badge">
      <span className="lp-badge-text">{String(children).toUpperCase()}</span>
    </span>
  );
}

function Wave() {
  return <span className="lp-wave">~</span>;
}
