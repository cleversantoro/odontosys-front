import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Login from './pages/Login';
//import Orcamentos from './components/Orcamentos';
//import HistoricoProcedimentos from './components/HistoricoProcedimentos';
//import Financeiro from './components/Financeiro';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />}>
          <Route path="/pacientes" element={<Patients />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          {/* <Route path="/orcamentos" element={<Orcamentos />} /> */}
          {/* <Route path="/historico-procedimentos" element={<HistoricoProcedimentos />} />
          <Route path="/financeiro" element={<Financeiro />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
