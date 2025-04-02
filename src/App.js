import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Appointment from './pages/Appointment';
//import Layout from './components/Layout';
import Orcamento from './pages/Orcamento';
import Financeiro from './pages/Financeiro';
import { AuthProvider } from './context/AuthContext';
// src/App.js
const Patients = React.lazy(() => import('./pages/Patients'));


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/consultas" element={<Appointment />} />
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/financeiro" element={<Financeiro />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;



