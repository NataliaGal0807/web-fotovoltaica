import React, { useState } from 'react';
// La ruta ajustada para importar el CSS
import '../hojasEstilo/BeneficiosHibridos.css';

// Este componente se colocará junto a la CalculadoraSolar
const BeneficiosHibridos = () => {

    const [modalData, setModalData] = useState(null);

    // Función para abrir el modal con los datos del beneficio
    const openModal = (item) => {
        setModalData(item);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalData(null);
    };


    const BENEFICIOS_DATA = [
        {
            icono: '🔌',
            titulo: 'Adiós a los Cortes de Luz',
            contenido: 'El sistema híbrido almacena la energía solar en baterías, dándote autonomía completa y encendiendo tus equipos críticos cuando la red pública falla.',
            detalle: 'La tranquilidad de saber que tus equipos esenciales (refrigerador, iluminación, internet) seguirán funcionando. Esto es crucial para la vida en zonas rurales con infraestructura eléctrica inestable.'
        },
        {
            icono: '⚡',
            titulo: 'Garantía de Rendimiento Mínimo',
            contenido: 'Te garantizamos que tu instalación generará el X% de la energía calculada. Si no lo hace, ajustamos el sistema sin costo adicional.',
            detalle: 'Nuestro compromiso incluye un monitoreo proactivo para asegurar que la inversión cumpla con las expectativas energéticas y financieras, minimizando riesgos.'
        },
        {
            icono: '📈',
            titulo: 'Máximo Retorno de Inversión',
            contenido: 'Diseñamos tu sistema con equipos de 25 años de vida útil para asegurar que recuperes tu inversión más rápido y aumentes el valor de tu propiedad rural.',
            detalle: 'Un sistema solar es una mejora de capital que incrementa el valor de tasación de tu propiedad y te protege contra el alza futura de las tarifas eléctricas.'
        },
        {
            icono: '📡',
            titulo: 'Monitoreo Remoto 24/7',
            contenido: 'Supervisamos el rendimiento de tu inversor en tiempo real. Si hay una falla o baja producción, actuamos antes de que tú lo notes.',
            detalle: 'Acceso a una app móvil donde ves tu producción y consumo en tiempo real. Nuestro equipo técnico también recibe alertas inmediatas ante cualquier anomalía para dar soporte remoto o presencial.'
        }
    ];

    return (
        // Usamos un Fragment para que el Modal (con fixed position) no esté limitado por la sección
        <>
            <div className="beneficios-hibridos-section">
                <h2 className="beneficios-hibridos-title">Tu Solución Definitiva para la Energía Rural</h2>

                {/* Contenedor de las Tarjetas */}
                <div className="beneficios-grid">
                    {BENEFICIOS_DATA.map((item, index) => (
                        <div
                            key={index}
                            className="beneficio-card"
                            // Todas las tarjetas llaman a openModal con sus propios datos
                            onClick={() => openModal(item)}
                        >
                            <span className="card-icon">{item.icono}</span>
                            <h3 className="card-title">{item.titulo}</h3>
                            <p className="card-content">{item.contenido}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* -------------------------------------- */}
            {/* COMPONENTE MODAL (Pop-up) */}
            {/* -------------------------------------- */}
            {modalData && (
                // Fondo oscuro del modal con estilos en línea para forzar el centrado
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999, // Un z-index muy alto
                        padding: '1rem',
                    }}
                >
                    {/* Contenedor principal del contenido del modal */}
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#2c3e50',
                            padding: '2rem',
                            borderRadius: '0.5rem',
                            maxWidth: '500px',
                            width: '100%',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                        }}
                    >
                        {/* Botón de cerrar */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#555',
                            }}
                        >
                            &times;
                        </button>

                        {/* Contenido del modal */}
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{modalData.icono}</span>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#FF9900' }}>{modalData.titulo}</h2>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                <strong>Resumen:</strong> {modalData.contenido}
                            </p>

                            {/* Información detallada */}
                            <p style={{ fontSize: '0.9rem', color: '#555' }}>
                                <strong>Detalle Ampliado:</strong>modalData.detalle
                            </p>
                        </div>

                        {/* Botón de acción */}
                        <button
                            onClick={closeModal}
                            style={{
                                backgroundColor: '#FF9900',
                                color: '#2c3e50',
                                padding: '0.75rem 2rem',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                marginTop: '1.5rem',
                                fontWeight: 'bold',
                                float: 'right',
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BeneficiosHibridos;