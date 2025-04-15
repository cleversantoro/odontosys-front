import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
//import ContentHeader from '../components/ContentHeader';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(4);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de busca aqui
    console.log('Buscar:', searchQuery);
  };

  return (
    <div className="dash">
      <div className={`dash-nav dash-nav-dark ${isMenuOpen ? 'show' : ''}`}>

        <header>
          <button onClick={toggleMenu} className="menu-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="odonto-logo">
            <i className="fas fa-bolt"></i> <span>OdontoSys</span>
          </Link>
        </header>

        <nav className="dash-nav-list">
          <Link to="/dashboard" className="dash-nav-item">
            <i className="fas fa-home"></i> Dashboard
          </Link>

          <Link to="/orcamento" className="dash-nav-item">
            <i className="fas fa-chart-bar"></i> Orçamento
          </Link>

          <Link to="/financeiro" className="dash-nav-item">
            <i className="fas fa-chart-bar"></i> Financeiro
          </Link>


          <Link to="/pacientes" className={`dash-nav-item ${location.pathname === '/pacientes' ? 'active' : ''}`}>
            <i className="fas fa-user"></i> Pacientes
          </Link>

          <Link to="/consultas" className="dash-nav-item">
            <i className="fas fa-calendar-alt"></i> Consultas
          </Link>
        </nav>
      </div>

      <div className="dash-app">
        <header className="dash-toolbar">
          <button onClick={toggleMenu} className="menu-toggle">
            <i className="fas fa-bars"></i>
          </button>

          <button onClick={toggleSearch} className="searchbox-toggle">
            <i className="fas fa-search"></i>
          </button>

          <form className={`searchbox ${isSearchOpen ? 'show' : ''}`} onSubmit={handleSearch}>
            <button type="button" onClick={toggleSearch} className="searchbox-toggle"><i className="fas fa-arrow-left"></i></button>
            <button type="submit" className="searchbox-submit"><i className="fas fa-search"></i> </button>
            <input type="text" className="searchbox-input" placeholder="Digite para pesquisar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </form>

          <div className="tools">
            <button className="tools-item">
              <i className="fas fa-bell"></i>
              {notifications > 0 && <span className="tools-item-count">{notifications}</span>}
            </button>
            <div className="dropdown tools-item">
              <button className="dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown">
                <i className="fas fa-user"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <Link to="/profile" className="dropdown-item">Perfil</Link>
                <Link to="/logout" className="dropdown-item">Sair</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div >
        <main className="dash-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
      </div>
    </div>
  );
};

export default Home;