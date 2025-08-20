import React, { useRef, useState } from "react";

// Landing page scrollable con navbar fija arriba y banda inferior pegajosa
// Diseño en tonos Trevian: fondo #02001A y acento #6DFFD5

export default function LandingPage() {
  const heroRef = useRef(null);
  const queEsRef = useRef(null);
  const procesoRef = useRef(null);
  const beneficiosRef = useRef(null);
  const contactoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: "Inicio", ref: heroRef },
    { label: "Qué es", ref: queEsRef },
    { label: "Proceso", ref: procesoRef },
    { label: "Beneficios", ref: beneficiosRef },
    { label: "Contacto", ref: contactoRef },
  ];

  const scrollTo = (ref) => {
    setMenuOpen(false);
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0b0830] text-white relative">
      {/* NAVBAR fija */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#07061a]/70 bg-[#07061a]/90 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6DFFD5] to-[#3dd7b2] shadow-md"/>
            <span className="font-semibold tracking-wide">Trevian</span>
          </div>

          {/* Center tabs (desktop) */}
          <nav className="hidden md:flex items-center gap-3">
            <span className="text-[#6DFFD5] mr-1 font-medium">Texto</span>
            {items.map((it) => (
              <button
                key={it.label}
                onClick={() => scrollTo(it.ref)}
                className="px-4 py-1 rounded-full bg-white/90 text-slate-900 text-sm font-semibold hover:bg-white transition shadow-sm"
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Right circle button */}
          <div className="flex items-center gap-2">
            <button className="hidden md:inline-flex w-8 h-8 rounded-full bg-white/80 hover:bg-white transition shadow-inner" aria-label="Cuenta"/>
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/20"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.75 5.25h16.5v1.5H3.75v-1.5ZM3.75 11.25h16.5v1.5H3.75v-1.5ZM3.75 17.25h16.5v1.5H3.75v-1.5Z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 pb-3">
            <div className="pt-3 flex flex-wrap gap-2">
              {items.map((it) => (
                <button
                  key={it.label}
                  onClick={() => scrollTo(it.ref)}
                  className="px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold"
                >
                  {it.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* CONTENIDO (dar espacio a la navbar fija) */}
      <main className="pt-20">
        {/* HERO grande (bloque gris del mock) */}
        <section ref={heroRef} className="mx-auto max-w-6xl px-4">
          <div className="h-[60vh] md:h-[72vh] rounded-xl bg-neutral-400/70 flex items-center justify-center text-slate-900">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Tu plantilla ortopédica, a medida</h1>
              <p className="mt-3 text-base md:text-lg opacity-80 max-w-2xl mx-auto">
                Escaneá desde tu casa, personalizá y recibí tu par sin moverte. Rápido, fácil y seguro.
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <button className="px-5 py-2 rounded-lg bg-[#6DFFD5] text-slate-900 font-semibold shadow hover:scale-[1.02] transition">Empezar</button>
                <button className="px-5 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition">Saber más</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIONES para forzar scroll bonito */}
        <section ref={queEsRef} className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Qué es Trevian?</h2>
          <p className="text-white/80 leading-relaxed max-w-3xl">
            Trevian utiliza tecnologías como visión 3D e impresión a medida para diseñar plantillas ortopédicas personalizadas. Todo el
            proceso está pensado para optimizar rendimiento y prevenir lesiones en deportistas y personas activas.
          </p>
        </section>

        <section ref={procesoRef} className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Escaneá tu pisada","Diseño a medida","Impresión y envío"].map((t,i)=> (
              <div key={t} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#6DFFD5] text-slate-900 font-extrabold grid place-content-center mb-4">{i+1}</div>
                <h3 className="font-semibold mb-2">{t}</h3>
                <p className="text-white/70">Descripción breve del paso con foco en claridad y beneficios para el usuario.</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={beneficiosRef} className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Beneficios</h2>
          <ul className="grid md:grid-cols-2 gap-4 list-disc pl-5 text-white/80">
            <li>Corrección postural y prevención de lesiones.</li>
            <li>Proceso 100% remoto, sin visitas al consultorio.</li>
            <li>Calce perfecto y materiales de alto rendimiento.</li>
            <li>Integración con tu rutina de entrenamiento.</li>
          </ul>
        </section>

        <section ref={contactoRef} className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contacto</h2>
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 max-w-xl">
            <form className="grid gap-3">
              <input className="px-4 py-2 rounded-lg bg-white/90 text-slate-900" placeholder="Tu nombre"/>
              <input className="px-4 py-2 rounded-lg bg-white/90 text-slate-900" placeholder="Email"/>
              <textarea className="px-4 py-2 rounded-lg bg-white/90 text-slate-900" rows={4} placeholder="Mensaje"/>
              <button type="button" className="mt-2 px-5 py-2 rounded-lg bg-[#6DFFD5] text-slate-900 font-semibold w-max">Enviar</button>
            </form>
          </div>
        </section>

        <div className="h-28" />
      </main>

      {/* BANDA INFERIOR FIJA */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] md:w-[88%] z-40">
        <div className="rounded-xl border border-[#6DFFD5]/60 bg-white/5 backdrop-blur px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3 text-sm md:text-base">
          <Badge>Más rápido</Badge>
          <Wave/>
          <Badge>Más fácil</Badge>
          <Wave/>
          <Badge>¡Sin salir de tu casa!</Badge>
          <Wave/>
          <Badge>Te llega a tu casa</Badge>
        </div>
      </div>

      {/* Footer para que no tape contenido al final */}
      <footer className="h-16" />
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10">
      <span className="font-semibold tracking-wide">{children.toString().toUpperCase()}</span>
    </span>
  );
}

function Wave() {
  return (
    <span className="mx-1 md:mx-2 text-[#6DFFD5] text-xl md:text-2xl select-none">~</span>
  );
}
