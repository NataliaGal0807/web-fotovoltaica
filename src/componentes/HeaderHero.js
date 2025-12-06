import '../hojasEstilo/HeaderHero.css'

const HeaderHero = () => {
    // Definimos una función simple para simular el desplazamiento a la calculadora
    const scrollToCalculator = () => {
        // Usa el ID 'calculadora' que asignaremos al contenedor de la calculadora
        const calculatorSection = document.getElementById('calculadora');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        // 1. Contenedor principal
        <header className="hero">
            {/* 2. Capa semitransparente */}
            <div className="hero-overlay">
                <div className="container-hero">

                    {/* 3. Título principal (H1) */}
                    <h1 className="hero-title">
                        Energía Solar para Zonas Rurales: Obtén Autonomía y Ahorro sin Preocupaciones
                    </h1>

                    {/* 4. Subtítulo */}
                    <p className="hero-subtitle">
                        Especialistas en sistemas Off-Grid, On-Grid y respaldo con baterías para parcelas y fundos.
                    </p>

                    {/* 5. CTA Principal (Botón) */}
                    <button
                        className="cta-principal"
                        onClick={scrollToCalculator} // Mueve al usuario a la calculadora
                    >
                        ⭐ CALCULA TU VIABILIDAD GRATUITA EN 2 MINUTOS ⭐
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderHero;