import React from 'react';
import { Outlet } from 'react-router-dom';
//import ContentHeader from './ContentHeader';

const Layout = () => {
  return (
    <div className="dash">
      <div className="dash-nav dash-nav-dark">
        <header>
          <a href="#!" className="menu-toggle">
            <i className="fas fa-bars"></i>
          </a>
          <a href="/home" className="odonto-logo">
            <i className="fas fa-bolt"></i> <span>Odonto</span>
          </a>
        </header>
        <nav className="dash-nav-list">
          <a href="/home" className="dash-nav-item">
            <i className="fas fa-home"></i> Dashboard
          </a>
          <a href="/patients" className="dash-nav-item">
            <i className="fas fa-users"></i> Pacientes
          </a>
          <a href="/appointments" className="dash-nav-item">
            <i className="fas fa-calendar"></i> Consultas
          </a>
        </nav>
      </div>
      <div className="dash-app">
        <main className="dash-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 