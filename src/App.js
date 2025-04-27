import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orcamento from './pages/Orcamento/Orcamento';
import Dashboard from './pages/DashBoard/DashboardDespesas';
import Financeiro from './pages/Financeiro/Financeiro';
import Consultas from './pages/Agendamento/Agendamento';
import Agendamento from './pages/Agendamento/AgendamentosPage';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Calendar from './pages/Agendamento/Calendar';

//import { ColorModeContext, useMode } from "./theme";
//import { CssBaseline, ThemeProvider } from "@mui/material";

const PacientesLista = React.lazy(() => import('./pages/Pacientes/PacientesLista'));
const PacientesCadastro = React.lazy(() => import('./pages/Pacientes/PacientesCadastro'));

function App() {
  //const [theme, colorMode] = useMode();

  return (

    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
        <ProSidebarProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route element={<Home />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pacienteslista" element={<PacientesLista />} />
                  <Route path="/pacientescadastro" element={<PacientesCadastro />} />
                  <Route path="/consultas" element={<Consultas />} />
                  <Route path="/orcamento" element={<Orcamento />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  <Route path="/agendamentos" element={<Agendamento />} />
                  <Route path="/calendario" element={<Calendar />} />

                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ProSidebarProvider>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
