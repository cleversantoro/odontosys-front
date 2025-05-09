import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orcamento from './pages/Orcamento/Orcamento';
import Dashboard from './pages/DashBoard/Dashboard';
import Financeiro from './pages/Financeiro/Financeiro';
import Consultas from './pages/Agendamento/Agendamento';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Calendar from './pages/Agendamento/Calendar';
import ConsultasLista from './pages/Consultas/ConsultasLista';
import ConsultasAgenda from './pages/Consultas/ConsultasAgenda';
import DashboardConsultas from './pages/DashBoard/DashBoardConsultas';
import DashboardDespesas from './pages/DashBoard/DashboardDespesas';
const PacientesLista = React.lazy(() => import('./pages/Pacientes/PacientesLista'));
const PacienteCadastro = React.lazy(() => import('./pages/Pacientes/PacienteCadastro'));

function App() {

  return (
        <ProSidebarProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route element={<Home />}>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/consultas" element={<DashboardConsultas/>} />
                  <Route path="/dashboard/despesas" element={<DashboardDespesas/>} />
                  <Route path="/pacientes/listar" element={<PacientesLista />} />
                  <Route path="/pacientes/cadastrar" element={<PacienteCadastro />} />
                  <Route path="/pacientes/cadastrar" element={<PacienteCadastro />} />
                  <Route path="/consultas" element={<Consultas />} />
                  <Route path="/consultas/completa" element={<ConsultasLista />} />
                  <Route path="/consultas/agenda" element={<ConsultasAgenda />} />
                  <Route path="/orcamento" element={<Orcamento />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  <Route path="/calendario" element={<Calendar />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ProSidebarProvider>
  );
}

export default App;
