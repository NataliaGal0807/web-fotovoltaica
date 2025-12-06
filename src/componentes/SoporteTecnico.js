import React from "react";
import "../hojasEstilo/SoporteTecnico.css";
import logowa from '../imagenes/whatsapp-logo-r.png'

const SoporteTecnico = () => {
    return (
        <section id="soporte-tecnico" className="soporte-tecnico-section">
            <h2 className="st-title">Soporte Técnico Fotovoltaico</h2>

            <p className="st-subtitle">
                Mantén tu sistema funcionando al 100% con nuestro soporte técnico especializado.
            </p>

            <div className="st-grid">
                <div className="st-card">
                    <h3>Mantenimiento Preventivo</h3>
                    <p>Revisión completa del sistema para evitar fallas y maximizar la eficiencia.</p>
                </div>

                <div className="st-card">
                    <h3>Mantenimiento Correctivo</h3>
                    <p>Solución rápida de problemas, reemplazo de componentes y diagnóstico.</p>
                </div>

                <div className="st-card">
                    <h3>Monitoreo del Sistema</h3>
                    <p>Supervisión remota o presencial del funcionamiento de tus paneles.</p>
                </div>

                <div className="st-card">
                    <h3>Limpieza de Paneles</h3>
                    <p>Mejora el rendimiento hasta un 30% con limpieza profesional.</p>
                </div>
            </div>

            <a
                href="https://wa.me/569XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="st-btn-whatsapp"
            >
                <img src={logowa} alt="WhatsApp" className="st-wsp-icon" />
                Solicitar Soporte
            </a>
        </section>
    );
};

export default SoporteTecnico;
