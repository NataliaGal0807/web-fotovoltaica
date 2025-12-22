import React from "react";
import "../hojasEstilo/HomeVisual.css";

function HomeVisual({ irACalculadora }) {
    return (
        <section className="home-visual">

            {/* HERO */}
            <div className="hero">
                <div className="icono-sol">☀️</div>
                <h1>Energía Solar para tu Hogar</h1>
                <p>
                    Reduce tu cuenta de luz y asegura energía para tu casa,
                    incluso cuando hay cortes.
                </p>

                <button onClick={irACalculadora}>
                    Quiero saber cuánto puedo ahorrar
                </button>
            </div>

            {/* BENEFICIOS */}
            <div className="beneficios">
                <div className="beneficio">
                    💰
                    <p>Pagas menos cada mes</p>
                </div>

                <div className="beneficio">
                    🔋
                    <p>Energía incluso sin luz</p>
                </div>

                <div className="beneficio">
                    🏡
                    <p>Aumenta el valor de tu casa</p>
                </div>
            </div>

            {/* AHORRO */}
            <div className="ahorro">
                <h2>Podrías ahorrar hasta</h2>
                <span className="monto">$30.000 al mes</span>
            </div>

        </section>
    );
}

export default HomeVisual;
