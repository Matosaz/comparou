import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2 className="navbar-title">Comparou</h2>
        </div>

        {/* Links */}
        <nav className="navbar-links">
          <a href="#link1" className="navbar-link">Inscrever-se</a>

          {/* Dropdown Categorias */}
          <div 
            className="dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="dropdown-btn">Categorias ▾</button>
            {open && (
              <div className="dropdown-menu">
                <a href="#cat1" className="dropdown-item">Eletrônicos</a>
                <a href="#cat2" className="dropdown-item">Eletrodomésticos</a>
                <a href="#cat3" className="dropdown-item">Moda</a>
                <a href="#cat4" className="dropdown-item">Beleza</a>
                <a href="#cat5" className="dropdown-item">Esportes</a>
              </div>
            )}
          </div>

          <a href="#link3" className="navbar-link">APIs</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
