import React from 'react';
import '../hojasEstilo/ResumenResultados.css'; // Crearemos este archivo CSS enseguida

const ResumenResultados = ({ capacidadRequerida, hsfUtilizado, gastoMensual, tipoSistema }) => {
    // Si no hay datos, no mostrar nada
    if (!capacidadRequerida || parseFloat(capacidadRequerida) <= 0) {
        return null;
    }

    // Convertimos a número para asegurar operaciones
    const kwp = parseFloat(capacidadRequerida);
    const gasto = parseFloat(gastoMensual);
    const hsf = parseFloat(hsfUtilizado);

    // --- CÁLCULOS PARA EL RESUMEN ---
    // Valores de referencia (puedes ajustarlos):
    const VALOR_KWH_CLP = 150; // Ya lo tienes en tus constantes, pero lo uso aquí para el ejemplo
    const PORCENTAJE_AHORRO_ON_GRID = 0.90; // Ahorro del 90% para On-Grid (Conexión a la red)
    const COSTO_FIJO_DISTRIBUIDORA = 5000; // Lo que siempre se paga aunque no consumas

    // Paneles estimados (ej: un panel promedio es de 450W = 0.45 kWp)
    const potenciaPanelPromedio = 0.45; // en kWp
    const numeroPanelesEstimado = Math.ceil(kwp / potenciaPanelPromedio);

    // Consumo mensual en kWh
    const consumoMensualKWh = gasto / VALOR_KWH_CLP;

    // Ahorro monetario
    let ahorroMensual = 0;
    let nuevoGastoMensual = gasto;

    if (tipoSistema === 'ahorrar') { // On-Grid
        nuevoGastoMensual = Math.max(
            (gasto * (1 - PORCENTAJE_AHORRO_ON_GRID)), // Ej: 50.000 * 0.10 = 5.000
            COSTO_FIJO_DISTRIBUIDORA                  // Ej: Mínimo $5.000
        );

        // 2. Calculamos el ahorro real (Gasto Original - Nuevo Gasto)
        ahorroMensual = gasto - nuevoGastoMensual; // Ej: 50.000 - 5.000 = 45.000

    } else if (tipoSistema === 'autonomia') { // Off-Grid
        // En off-grid, el "ahorro" es evitar el costo del generador o la no-disponibilidad
        // Para simplificar, podemos decir que elimina la factura eléctrica.
        ahorroMensual = gasto;
        nuevoGastoMensual = 0; // O un costo muy bajo de mantención
    }

    const ahorroAnual = ahorroMensual * 12;

    // --- LÓGICA DE CONVENIENCIA ---
    const determinarConveniencia = (hsf) => {
        // Definimos los umbrales de HSF (ajustar según tu mercado/país)
        const hsfNum = parseFloat(hsf);

        if (hsfNum >= 6.0) {
            return {
                titulo: "Rentabilidad Excepcional 🚀",
                texto: `Con un sobresaliente ${hsfNum.toFixed(1)} HSF, su ubicación es una de las mejores para energía solar. El retorno de la inversión (ROI) será rápido y el ahorro máximo.`
            };
        } else if (hsfNum >= 5.0) {
            return {
                titulo: "Alta Eficiencia ✅",
                texto: `Ubicado en una zona con un excelente ${hsfNum.toFixed(1)} HSF. Su inversión es altamente eficiente y rentable, con un período de recuperación de la inversión muy competitivo.`
            };
        } else if (hsfNum >= 4.0) {
            return {
                titulo: "Buena Inversión 👍",
                texto: `Su ubicación tiene un buen promedio de ${hsfNum.toFixed(1)} HSF. La instalación sigue siendo una inversión sólida y rentable, generando ahorros significativos a largo plazo.`
            };
        } else {
            return {
                titulo: "Inversión Sólida 💡",
                texto: `Con un HSF de ${hsfNum.toFixed(1)}, la inversión es sólida. Es crucial un estudio de sombreado detallado, pero el sistema proporcionará ahorros importantes.`
            };
        }
    };

    const conveniencia = determinarConveniencia(hsf);

    return (
        <div className="resumen-resultados">
            <h3>📈 Su Potencial Solar en Detalle</h3>
            <p className="resumen-intro">
                ¡Excelente! Basado en su ubicación y consumo, hemos calculado lo que necesita para aprovechar al máximo la energía solar.
            </p>

            <div className="resumen-grid">
                <div className="resumen-card">
                    <h4>🌞 Potencia Estimada</h4>
                    <p>Necesitará una instalación de<strong> {kwp.toFixed(2)} kWp</strong>. Esto significa, aproximadamente, entre <strong>{numeroPanelesEstimado - 1} y {numeroPanelesEstimado + 1} paneles solares</strong> de alta eficiencia.</p>
                </div>

                <div className="resumen-card">
                    <h4>💰 Ahorro Proyectado</h4>
                    {tipoSistema === 'ahorrar' ? (
                        <p>Su factura mensual se reduciría de <strong>${gasto.toLocaleString()}</strong> a solo <strong>${Math.ceil(nuevoGastoMensual).toLocaleString()}</strong>. ¡Esto es un ahorro de más de <strong>${Math.ceil(ahorroAnual).toLocaleString()} al año</strong>!</p>
                    ) : (
                        <p>Logrará <strong>autonomía total</strong> de la red. Dejará de pagar su factura de <strong>${gasto.toLocaleString()}</strong> y tendrá electricidad 24/7, incluso sin conexión.</p>
                    )}
                </div>

                <div className="resumen-card">
                    {/* Usamos el título dinámico */}
                    <h4>{conveniencia.titulo}</h4>
                    {/* Usamos el texto dinámico */}
                    <p>{conveniencia.texto}</p>
                </div>
            </div>

            <p className="resumen-call-to-action">
                Estos son solo datos preliminares. Rellene sus datos de contacto para que le enviemos un <strong>estudio técnico completo, incluyendo el retorno de inversión (ROI) exacto para su propiedad</strong>.
            </p>
        </div>
    );
};

export default ResumenResultados;