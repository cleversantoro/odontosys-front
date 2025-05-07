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
// import Agendamento from './pages/Agendamento/AgendamentosPage';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Calendar from './pages/Agendamento/Calendar';
import ConsultasLista from './pages/Consultas/ConsultasLista';
import ConsultasAgenda from './pages/Consultas/ConsultasAgenda';

//import { ColorModeContext, useMode } from "./theme";
//import { CssBaseline, ThemeProvider } from "@mui/material";

const PacientesLista = React.lazy(() => import('./pages/Pacientes/PacientesLista'));
const PacienteCadastro = React.lazy(() => import('./pages/Pacientes/PacienteCadastro'));

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
                  <Route path="/pacientes/listar" element={<PacientesLista />} />
                  <Route path="/pacientes/cadastrar" element={<PacienteCadastro />} />
                  <Route path="/pacientes/cadastrar" element={<PacienteCadastro />} />
                  <Route path="/consultas" element={<Consultas />} />
                  <Route path="/consultas/completa" element={<ConsultasLista />} />
                  <Route path="/consultas/agenda" element={<ConsultasAgenda />} />
                  {/* <Route path="/consultas/listar" element={<ConsultasLista />} /> */}
                  <Route path="/orcamento" element={<Orcamento />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  {/* <Route path="/agendamentos" element={<Agendamento />} /> */}
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
