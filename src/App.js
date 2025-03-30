import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
//import Orcamentos from './components/Orcamentos';
//import HistoricoProcedimentos from './components/HistoricoProcedimentos';
//import Financeiro from './components/Financeiro';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pacientes" element={<Patients />} />
        {/* Outras rotas protegidas */}
      </Route>
    </Routes>
  );
}


export default App;



