//import Navbar from "../components/Navbar.js";
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
//import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="wrapper">
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <span className="brand-text font-weight-light">Sistema Odonto</span>
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <Link to="/pacientes" className={`nav-link ${location.pathname === '/pacientes' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-user"></i>
                  <p>Pacientes</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orcamentos" className={`nav-link ${location.pathname === '/orcamentos' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-file-invoice-dollar"></i>
                  <p>Orçamentos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/historico-procedimentos" className={`nav-link ${location.pathname === '/historico-procedimentos' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-history"></i>
                  <p>Histórico Procedimentos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/financeiro" className={`nav-link ${location.pathname === '/financeiro' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-dollar-sign"></i>
                  <p>Financeiro</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <strong>Copyright © 2024</strong>
        Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Dashboard;
