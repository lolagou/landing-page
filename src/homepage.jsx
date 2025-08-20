import React, { useRef, useState } from "react";
import logo from "./assets/logo-trevian.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const queEsRef = useRef(null);
  const procesoRef = useRef(null);
  const beneficiosRef = useRef(null);
  const contactoRef = useRef(null);
  const testimoniosRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* poner logo */}
          <div className="lp-brand">
      <img src={logo} alt="Logo Trevian" className="lp-logo" />
          </div>

          {/* Centro: Texto + pills (desktop) */}
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
            <button className="lp-avatar" aria-label="Cuenta" />
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
        {/* HERO */}
        <section ref={heroRef} className="lp-section">
          <div className="lp-hero">
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
          <h2 className="lp-h2">¿Qué es Trevian?</h2>
          <p className="lp-p">
            Trevian utiliza visión 3D e impresión a medida para diseñar plantillas
            personalizadas. El proceso está pensado para optimizar rendimiento y
            prevenir lesiones en deportistas y personas activas.
          </p>
        </section>

        {/* PROCESO */}
        <section ref={procesoRef} className="lp-section lp-pad">
          <h2 className="lp-h2">¿Cómo funciona?</h2>
          <div className="lp-grid3">
            {["Escaneá tu pisada", "Diseño a medida", "Impresión y envío"].map(
              (t, i) => (
                <div key={t} className="lp-card">
                  <div className="lp-step">{i + 1}</div>
                  <h3 className="lp-h3">{t}</h3>
                  <p className="lp-card-text">
                    Descripción breve del paso con foco en claridad y beneficios.
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* BENEFICIOS */}
        <section ref={beneficiosRef} className="lp-section lp-pad">
          <h2 className="lp-h2">Beneficios</h2>
          <ul className="lp-list">
            <li>Corrección postural y prevención de lesiones.</li>
            <li>Proceso 100% remoto, sin visitas al consultorio.</li>
            <li>Calce perfecto y materiales de alto rendimiento.</li>
            <li>Integración con tu rutina de entrenamiento.</li>
          </ul>
        </section>


        {/* TESTIMONIOS */}
        <section ref={testimoniosRef} className="lp-section lp-pad">
          <h2 className="lp-h2">Testimonios</h2>
        </section>

        {/* CONTACTO */}
        <section ref={contactoRef} className="lp-section lp-pad">
          <h2 className="lp-h2">Contacto</h2>
          <div className="lp-form-wrap">
            <form className="lp-form">
              <input className="lp-input" placeholder="Tu nombre" />
              <input className="lp-input" placeholder="Email" />
              <textarea
                rows={4}
                className="lp-input"
                placeholder="Mensaje"
              />
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
