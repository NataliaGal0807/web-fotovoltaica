import '../hojasEstilo/VentajasFinal.css';

const VentajasFinal = () => {
    return (
        // 1. Contenedor principal con fondo oscuro
        <section id="beneficios" className="ventajas-section">

            <div className="container-ventajas">

                {/* Título de las Ventajas */}
                <h2 className="ventajas-title">Nuestro Compromiso con tu Vida Rural</h2>

                {/* Bloque de los 3 Argumentos de Venta */}
                <div className="ventajas-grid">

                    {/* Venta 1: Soporte Local */}
                    <div className="ventaja-item">
                        <span className="ventaja-icon">🛠️</span> {/* Icono de herramienta */}
                        <h3>Soporte Local y Especializado</h3>
                        <p>Técnicos especialistas en instalaciones alejadas, garantizando respuesta rápida.</p>
                    </div>

                    {/* Venta 2: Garantía Total */}
                    <div className="ventaja-item">
                        <span className="ventaja-icon">🛡️</span> {/* Icono de escudo/seguridad */}
                        <h3>Garantía Total Certificada</h3>
                        <p>Trabajamos solo con equipos de primer nivel y ofrecemos garantía extendida en mano de obra.</p>
                    </div>

                    {/* Venta 3: Financiamiento */}
                    <div className="ventaja-item">
                        <span className="ventaja-icon">💰</span> {/* Icono de dinero/ahorro */}
                        <h3>Financiamiento y Subsidios</h3>
                        <p>Te asesoramos para postular a ayudas gubernamentales y ofrecemos planes de pago flexibles.</p>
                    </div>
                    {/* Venta 4: TECNOLOGÍA (Nueva para balancear la cuadrícula) */}
                    <div className="ventaja-item">
                        <span className="ventaja-icon">🔋</span> {/* Icono de batería */}
                        <h3>Tecnología Híbrida Inteligente</h3>
                        <p>Combinamos paneles y baterías para optimizar el consumo, priorizando la energía solar y minimizando tu dependencia de la red.</p>
                    </div>
                </div>

                {/* -------------------------------------- */}
                {/* LLAMADA A LA ACCIÓN FINAL (CTA) */}
                {/* -------------------------------------- */}
                <div className="cta-final-bloque">
                    <h3 className="cta-final-title">¿Prefieres hablar con un experto? Agenda una Asesoría Gratuita</h3>
                    <p className="cta-final-subtitle">Nuestro ingeniero te llamará para resolver todas tus dudas sobre viabilidad técnica y legal.</p>

                    {/* Botón de Contacto */}
                    <button className="cta-final-button">
                        AGENDAR LLAMADA SIN COSTO
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VentajasFinal;