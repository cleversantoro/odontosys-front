import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Orcamento from './pages/Orcamento/Orcamento';
import Dashboard from './pages/DashBoard/DashboardDespesas';
import Financeiro from './pages/Financeiro/Financeiro';
import Consultas from './pages/Agendamento/Agendamento';
import Agendamento from './pages/Agendamento/AgendamentosPage';


const Pacientes = React.lazy(() => import('./pages/Pacientes/PacientesPage'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/agendamentos" element={<Agendamento />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
