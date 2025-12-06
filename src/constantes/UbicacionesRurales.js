/**
 * src/Constantes/UbicacionesRurales.js
 * * Este archivo almacena las constantes numéricas clave para el dimensionamiento
 * y el cálculo financiero del simulador, de manera centralizada.
 */

// ==============================================
// 1. CONSTANTES FINANCIERAS
// ==============================================

/**
 * Valor promedio del kWh en pesos chilenos (CLP).
 * Este valor se usa para convertir el Gasto Mensual ($) del cliente a Consumo Mensual (kWh).
 * (Este valor debe ser actualizado según el promedio de la distribuidora local).
 */
export const VALOR_KWH_CLP = 150;

// ==============================================
// 2. CONSTANTES TÉCNICAS
// ==============================================

/**
 * Factor de Pérdida del Sistema (0.85 = 15% de pérdidas).
 * Considera las ineficiencias del inversor, cableado, suciedad en paneles, y otros factores técnicos.
 */
export const FACTOR_PERDIDA = 0.85;

// ==============================================
// NOTA IMPORTANTE:
// Los datos de HSF (Horas Solares Pico) por ubicación ya NO se necesitan
// aquí, pues se obtienen de forma dinámica mediante la Latitud/Longitud
// proporcionada por la API de Google Maps en CalculadoraSolar.jsx
// ==============================================

// Si quisieras agregar más variables financieras, como el costo promedio
// de un panel o el ROI, lo harías en este mismo archivo.