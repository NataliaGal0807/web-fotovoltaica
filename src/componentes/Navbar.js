import React, { useState, useEffect } from "react";
import "../hojasEstilo/Navbar.css";
import logo from "../logoSinFondo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">

                {/* LOGO A LA IZQUIERDA */}
                <div
                    className="navbar-logo-container"
                    onClick={() => scrollToSection("inicio")}
                >
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>

                {/* MENÚ A LA DERECHA */}
                <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
                    <li><a onClick={() => scrollToSection("calculadora")}>Calculadora Solar</a></li>
                    <li><a onClick={() => scrollToSection("beneficios")}>Beneficios</a></li>
                    <li onClick={() => scrollToSection("soporte-tecnico")}>Soporte Técnico</li>
                    <li><a onClick={() => scrollToSection("contacto")}>Contacto</a></li>
                </ul>

                {/* MENÚ HAMBURGUESA */}
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
