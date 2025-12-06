import logo from './logo.png';
import logoNoFondo from './logoSinFondo.png';
import './App.css';
import HeaderHero from './componentes/HeaderHero';
import CalculadoraSolar from './componentes/CalculadoraSolar';
import VentajasFinal from './componentes/VentajasFinal';
import BeneficiosHibridos from './componentes/BeneficiosHibridos';
import Navbar from './componentes/Navbar';
import SoporteTecnico from './componentes/SoporteTecnico';

function App() {
  return (
    // Contenedor principal de toda la aplicación
    <div className="app-container">

      <Navbar />

      {/* 1. SECCIÓN SUPERIOR: Hero (Con imagen de fondo) */}
      <HeaderHero />

      {/* 2. CONTENIDO PRINCIPAL: La Calculadora y Argumentos de Venta (Diseño Asimétrico) */}
      <main className="main-content-wrapper">

        {/* Usamos .container para centrar el bloque y .main-flex-container para el layout lado a lado */}
        <div className="container main-flex-container">

          {/* Lado Izquierdo: La Calculadora (Se eleva sobre el Hero con margin-top negativo) */}
          {/* El ID "calculadora" es necesario para la función de scroll del Hero */}
          <CalculadoraSolar id="calculadora" />

          {/* Lado Derecho: Los Argumentos de Venta Híbridos */}
          <BeneficiosHibridos />

        </div>
      </main>

      {/* 3. SECCIÓN DE CIERRE Y CONFIANZA */}
      {/* Esta sección no va dentro de .container para que ocupe el 100% del ancho (fondo oscuro) */}
      <VentajasFinal />
      <SoporteTecnico />

      {/* 4. PIE DE PÁGINA */}
      {/*<Footer />*/}

    </div>
  );
}
export default App;
