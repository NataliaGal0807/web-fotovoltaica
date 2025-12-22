import { useState, useEffect } from "react";
import "../hojasEstilo/HeroSimulador.css";
import logowa from "../imagenes/whatsapp-logo-r.png";

const dispositivos = [
    { id: "refri", icono: "🧊", nombre: "Refrigerador" },
    { id: "luz", icono: "💡", nombre: "Luces" },
    { id: "tv", icono: "📺", nombre: "Televisión" },
    { id: "internet", icono: "📶", nombre: "Internet" }
];

export default function HeroSimulador() {
    const [estado, setEstado] = useState("corte"); // corte | solar | soporte
    const [mensaje, setMensaje] = useState("⚠️ Se cortó la luz en tu sector");
    const [mostrarSoporte, setMostrarSoporte] = useState(false);

    useEffect(() => {
        if (estado === "solar") {
            setMensaje("✅ Tu casa sigue funcionando gracias a la energía solar");

            setTimeout(() => {
                setMostrarSoporte(true);
                setMensaje("🔔 Nuestro sistema detectó una revisión preventiva");
            }, 4000);
        }
    }, [estado]);

    const usarDispositivo = () => {
        if (estado === "corte") {
            setMensaje("❌ Este equipo no funciona sin electricidad");
        } else {
            setMensaje("⚡ Funciona con normalidad gracias a la energía solar");
        }
    };

    const activarSolar = () => {
        setEstado("solar");
    };

    const llamarSoporte = () => {
        setEstado("soporte");
        setMensaje(
            "👨‍🔧 El servicio técnico está monitoreando tu sistema y te ayudará si es necesario"
        );
    };

    const reiniciarSimulador = () => {
        setEstado("corte");
        setMensaje("⚠️ Se cortó la luz en tu sector");
        setMostrarSoporte(false);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="hero-simulador">

            {/* TÍTULO */}
            <h2>🏠 ¿Qué pasa en tu casa cuando se corta la luz?</h2>

            {/* ESTADO */}
            <div className="estado">
                Estado actual:
                <span className={estado === "corte" ? "rojo" : "verde"}>
                    {estado === "corte" ? " Corte de luz" : " Energía solar activa"}
                </span>
            </div>

            {/* DISPOSITIVOS (JUEGO) */}
            <div className="dispositivos">
                {dispositivos.map((item) => (
                    <button
                        key={item.id}
                        className={`dispositivo ${estado === "solar" ? "activo" : "apagado"
                            }`}
                        onClick={usarDispositivo}
                    >
                        <span className="icono">{item.icono}</span>
                        <span>{item.nombre}</span>
                    </button>
                ))}
            </div>

            {/* BOTÓN PRINCIPAL */}
            {estado === "corte" && (
                <button className="btn-principal" onClick={activarSolar}>
                    ☀️ Activar energía solar
                </button>
            )}

            {/* MENSAJE CENTRAL */}
            <p className="mensaje">{mensaje}</p>

            {/* SOPORTE TÉCNICO */}
            {mostrarSoporte && estado === "solar" && (
                <button className="btn-soporte" onClick={llamarSoporte}>
                    🛠️ Contactar servicio técnico
                </button>
            )}



            {/* ACCIÓN FINAL WEB */}
            <button
                className="btn-accion-final"
                onClick={() => scrollToSection("calculadora")}
            >
                Quiero que me asesoren
            </button>

            <p className="texto-ayuda">
                Un especialista te explica todo paso a paso, sin compromiso 😊
            </p>
            {/* WHATSAPP */}
            <a
                href="https://wa.me/569XXXXXXXX?text=Hola,%20necesito%20ayuda%20con%20un%20sistema%20fotovoltaico"
                target="_blank"
                rel="noopener noreferrer"
                className="st-btn-whatsapp"
            >
                <img src={logowa} alt="WhatsApp" className="st-wsp-icon" />
                ¡CONTÁCTANOS!
            </a>

            <p className="texto-ayuda">
                Te atiende una persona real, sin robots 🤝
            </p>
            {/* REINICIAR */}
            <button className="btn-reiniciar" onClick={reiniciarSimulador}>
                🔄 Reiniciar simulación
            </button>

        </section>
    );
}
