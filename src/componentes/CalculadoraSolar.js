import React, { useState, useMemo } from "react";
import "../hojasEstilo/CalculadoraSolar.css";
import {
  VALOR_KWH_CLP,
  FACTOR_PERDIDA,
} from "../constantes/UbicacionesRurales";
import ResumenResultados from "./ResumenResultados";

//Api protegida en env
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const CalculadoraSolar = ({ onFormSubmit }) => {
  // 1. ESTADOS PARA INPUTS Y GEOLOCALIZACIÓN
  const [direccionTexto, setDireccionTexto] = useState("");
  const [coordenadas, setCoordenadas] = useState(null); // Almacena { lat, lng }
  const [hsf, setHsf] = useState(0); // Horas Solares Pico para el cálculo
  const [mensajeError, setMensajeError] = useState("");
  const [isHsfLoading, setIsHsfLoading] = useState(false);

  const [tipoSistema, setTipoSistema] = useState("ahorrar");
  const [gastoMensual, setGastoMensual] = useState(50000);
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const [mensajeEnvio, setMensajeEnvio] = useState({ tipo: "", texto: "" });

  // Funcion para obtener la radiacion del sol en esa ubicacion
  const fetchHSF = async (lat, lng) => {
    setIsHsfLoading(true);
    setMensajeError("");
    setHsf(0);

    const url = `/api_nasa/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=re&longitude=${lng}&latitude=${lat}&start=20180101&end=20231231&format=JSON`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const dailyData = data.properties?.parameter?.ALLSKY_SFC_SW_DWN;

      if (!dailyData) {
        throw new Error("Datos de radiación no disponibles");
      }

      // Calcular promedio de valores válidos
      const valores = Object.entries(dailyData)
        .filter(
          ([key, val]) =>
            /^\d{8}$/.test(key) &&
            typeof val === "number" &&
            val > 0 &&
            val < 20,
        )
        .map(([_, val]) => val);

      if (valores.length > 0) {
        const hsfCalculado =
          valores.reduce((a, b) => a + b, 0) / valores.length;
        setHsf(hsfCalculado);
        setIsHsfLoading(false);
        return hsfCalculado;
      }

      throw new Error("No hay datos válidos de radiación");
    } catch (error) {
      console.error("Error obteniendo datos de radiación:", error.message);

      // Valor de contingencia para Chile
      const hsfFallback = 5.0;
      setHsf(hsfFallback);
      setMensajeError(
        `⚠️ No se pudo obtener radiación exacta. Usando HSF promedio: ${hsfFallback}`,
      );
      setIsHsfLoading(false);

      return hsfFallback;
    }
  };

  // 2. FUNCIÓN DE GEOCODIFICACIÓN (Llamada a la API de Google)
  const fetchCoordenadas = async () => {
    setMensajeError("");
    if (!direccionTexto) {
      setCoordenadas(null);
      setHsf(5.0); // Resetear a un valor neutro
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccionTexto)}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordenadas(location);

        // 🟢 Capturamos el valor HSF retornado
        const hsfValue = await fetchHSF(location.lat, location.lng);
        setHsf(hsfValue);

        // 🟢 Usamos el valor capturado para el log
        console.log(
          `Ubicación: ${data.results[0].formatted_address}. HSF estimado: ${hsfValue}`,
        );
      } else {
        setCoordenadas(null);
        setHsf(0);
        setMensajeError(
          '❌ Dirección no válida. Intenta con "Calle, Comuna, Región".',
        );
      }
    } catch (error) {
      setMensajeError("🚨 Error de conexión. Revisa tu API Key o la red.");
      console.error("Error fetching coordinates:", error);
    }
  };

  // 3. LÓGICA DE CÁLCULO DINÁMICO
  const capacidadRequerida = useMemo(() => {
    // 💡 CLAVE: Detener el cálculo si HSF no se ha cargado.
    if (!hsf || parseFloat(hsf) === 0) {
      return "0.00"; // Devolver 0.00 si no hay HSF
    }

    // Convertir a número por seguridad
    const gasto = parseFloat(gastoMensual);

    const consumoMensualKWh = gasto / VALOR_KWH_CLP;
    const consumoDiarioKWh = consumoMensualKWh / 30.5;

    // Usamos el HSF obtenido de la geocodificación
    const hsfUsado = parseFloat(hsf); // Asegurar que es número

    let kwpRequeridos = consumoDiarioKWh / (hsfUsado * FACTOR_PERDIDA);

    if (tipoSistema === "autonomia") {
      kwpRequeridos *= 1.2; // 20% más por el banco de baterías
    }

    // Manejar el caso de un gasto inicial de 0
    if (gasto === 0) {
      return "0.00";
    }

    return kwpRequeridos.toFixed(2); // Dejamos dos decimales para mayor precisión
  }, [hsf, gastoMensual, tipoSistema]); // Recalcula si cambia HSF, Gasto o Tipo de sistema

  // 4. MANEJADOR DE ENVÍO FINAL
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coordenadas) {
      setMensajeError(
        "Por favor, ingresa una dirección válida y haz clic fuera del campo antes de enviar.",
      );
      return;
    }

    const dataFinal = {
      direccion: direccionTexto,
      coordenadas: coordenadas,
      hsfUtilizado: hsf, // HSF real usado en el cálculo
      tipoSistema: tipoSistema,
      gastoMensual: gastoMensual,
      kwpEstimado: capacidadRequerida,
      email: email,
      telefono: telefono,
    };

    console.log("Datos de Solicitud de Estudio:", dataFinal);
    alert(
      `¡Gracias! El estudio (${capacidadRequerida} kWp) basado en su ubicación ha sido enviado a ${email}. Te contactaremos pronto.`,
    );
  };

  return (
    // Contenedor principal con ID para el scroll del Hero
    <div id="calculadora" className="calculadora-section-wrapper">
      <div className="calculadora-content">
        <h2 className="calculadora-title">Simulador Solar Rural</h2>

        <form onSubmit={handleSubmit}>
          {/* 🔑 INPUT: Ubicación (Campo de texto para Geocodificación) */}
          <div className="input-group">
            <label htmlFor="direccion">
              Ubicación Exacta (Calle, Comuna, Región)
            </label>
            <input
              type="text"
              id="direccion"
              placeholder="Ej: Fundo El Canelo, Melipilla"
              className="input-field"
              value={direccionTexto}
              onChange={(e) => setDireccionTexto(e.target.value)}
              // 🔑 CLAVE: Ejecutar la geocodificación al hacer clic fuera del campo
              onBlur={() => fetchCoordenadas()}
              required
            />
            {/* 1. MUESTRA EL MENSAJE DE CARGA */}
            {isHsfLoading && (
              <p
                style={{
                  color: "#FF9900",
                  fontSize: "0.8rem",
                  marginTop: "5px",
                }}
              >
                ⏳ Validando radiación solar...
              </p>
            )}
            {/* 2. MUESTRA EL MENSAJE DE ERROR/FALLBACK (Si existe mensaje Y no está cargando) */}
            {!isHsfLoading && mensajeError && (
              <p
                style={{
                  color: hsf === 0 ? "red" : "#FF9900",
                  fontSize: "0.8rem",
                  marginTop: "5px",
                }}
              >
                {mensajeError}
              </p>
            )}
            {/* 3. MUESTRA EL MENSAJE DE ÉXITO (Si hay coordenadas, NO está cargando, Y NO hay mensaje de error) */}
            {coordenadas && !isHsfLoading && !mensajeError && (
              <p
                style={{ color: "green", fontSize: "0.8rem", marginTop: "5px" }}
              >
                ✅ Ubicación validada. HSF real:{" "}
                <strong>{hsf.toFixed(1)}</strong>
              </p>
            )}
          </div>

          {/* INPUT: Tipo de Sistema */}
          <div className="input-group">
            <label>Tipo de Sistema</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipo_sistema"
                  value="ahorrar"
                  checked={tipoSistema === "ahorrar"}
                  onChange={(e) => setTipoSistema(e.target.value)}
                />
                Ahorrar (On-Grid)
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo_sistema"
                  value="autonomia"
                  checked={tipoSistema === "autonomia"}
                  onChange={(e) => setTipoSistema(e.target.value)}
                />
                Autonomía (Off-Grid)
              </label>
            </div>
          </div>

          {/* INPUT: Gasto Mensual (Slider) */}
          <div className="input-group">
            <label htmlFor="gasto_mensual">
              Gasto Mensual Estimado:{" "}
              <strong>${gastoMensual.toLocaleString()}</strong>
            </label>
            <input
              type="range"
              id="gasto_mensual"
              min="10000"
              max="300000"
              step="10000"
              value={gastoMensual}
              onChange={(e) => setGastoMensual(parseInt(e.target.value))}
              className="slider-input"
            />
          </div>

          {/* ÁREA DE RESULTADOS (Visualización Dinámica) */}
          {parseFloat(hsf) > 0 && parseFloat(capacidadRequerida) > 0 && (
            <ResumenResultados
              capacidadRequerida={capacidadRequerida}
              hsfUtilizado={hsf}
              gastoMensual={gastoMensual}
              tipoSistema={tipoSistema}
            />
          )}
          <input
            type="email"
            placeholder="Tu Email"
            required
            className="input-field"
            value={email} // 🟢 Conexión al estado
            onChange={(e) => setEmail(e.target.value)} // 🟢 Actualización del estado
          />
          <input
            type="tel"
            placeholder="Tu Teléfono"
            required
            className="input-field"
            value={telefono} // 🟢 Conexión al estado
            onChange={(e) => setTelefono(e.target.value)} // 🟢 Actualización del estado
          />
          <button type="submit" className="cta-calculadora">
            ENVIARME EL ESTUDIO A MI CORREO →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalculadoraSolar;
