//import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { FaUserFriends, FaChartPie, FaChartBar, FaChartLine, FaAddressBook } from "react-icons/fa";
import { FaBars, FaCalendar } from 'react-icons/fa6';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";

//import { tokens } from "../../theme";
//import { useTheme, Box, Typography, IconButton } from "@mui/material";


import '../Home/sidebar-custom.css'; // Seu CSS customizado
import TopBar from '../../components/share/TopBar';

//import Logo from "../app/img/dente.jpg";


const Home = () => {

  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  //const location = useLocation();

  //const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  const { collapseSidebar } = useProSidebar();

  return (

    // <Container fluid>
    //   <Row>
    //     <Col md={2} className="sidebar d-flex flex-column justify-content-between">
    //       <div>
    //         <div className="text-center mb-4">
    //           <Image src={Logo} roundedCircle width={83} height={83} className="mb-2" />
    //           <h6 className="text-white">OdontoSys</h6>
    //         </div>
    //         <Nav defaultActiveKey="/" className="flex-column" >

    //           <Nav.Link as={Link} to="/dashboard" active={location.pathname === "/dashboard"} className="nav-link">
    //             <FaChartPie className="me-2" /> Dashboard
    //           </Nav.Link>

    //           <Nav.Link as={Link} to="/agendamentos" active={location.pathname === "/agendamentos"} className="nav-link">
    //             <FaAddressBook className="me-2" /> Agendamentos
    //           </Nav.Link>

    //           <Nav.Link as={Link} to="/pacientes" active={location.pathname === "/pacientes"} className="nav-link">
    //             <FaUserFriends className="me-2" /> Pacientes
    //           </Nav.Link>

    //           <Nav.Link as={Link} to="/consultas" active={location.pathname === "/consultas"} className="nav-link">
    //             <FaCalendar className="me-2" /> Consulta
    //           </Nav.Link>

    //           <Nav.Link as={Link} to="/financeiro" active={location.pathname === "/financeiro"} className="nav-link">
    //             <FaChartBar className="me-2" /> Financeiro
    //           </Nav.Link>

    //           <Nav.Link as={Link} to="/orcamento" active={location.pathname === "/orcamento"} className="nav-link">
    //             <FaChartLine className="me-2" /> Orçamento
    //           </Nav.Link>

    //           <div className="nav-link">
    //             <FaChartLine className="me-2" />
    //             <NavDropdown title="Pacientes" id="nav-dropdown">
    //               <NavDropdown.Item eventKey="4.1" onClick={handleSelect}>teste 1</NavDropdown.Item>
    //               <NavDropdown.Item eventKey="4.2">Teste 2</NavDropdown.Item>
    //               <NavDropdown.Item eventKey="4.3">teste 3</NavDropdown.Item>

    //               <NavDropdown.Divider />
    //               <Nav.Link as={Link} to="/pacientesLista" active={location.pathname === "/pacientesLista"}>
    //                 {/* <FaChartLine className="me-2" />  */}
    //                 Lista de Pacientes
    //               </Nav.Link>

    //               <Nav.Link as={Link} to="/pacientesCadastro" active={location.pathname === "/pacientesCadastro"}>
    //                 <FaChartLine className="me-2" /> Cadastro de Pacientes
    //               </Nav.Link>

    //             </NavDropdown>
    //           </div>

    //         </Nav>
    //       </div>
    //       <div className="text-center text-muted small py-2">
    //         <span>© 2025 OdontoSys</span>
    //       </div>
    //     </Col>
    //     <Col md={10} className="p-4 bg-light min-vh-100">
    //       <Outlet />
    //     </Col>
    //   </Row>
    // </Container >
    <>
      <Container fluid className="g-0">
        <Row className="g-0">
          {/* Coluna da Sidebar */}
          <Col xs="auto" style={{ padding: 0 }}>
            <Sidebar style={{ height: "100vh",  }}>
              <Menu iconShape="circle">
                <MenuItem className="menu1"
                  icon={<FaBars onClick={() => { collapseSidebar(); }} />}>
                  <h5 className="mb-0">OdontoSys</h5>
                </MenuItem>

                <SubMenu label="DashBoard" icon={<FaChartPie className="me-2" />}>
                  <MenuItem component={<Link to="/dashboard" className="link" />}>Pie charts</MenuItem>
                  <MenuItem component={<Link to="/dashboard" className="link" />}>Line charts</MenuItem>
                </SubMenu>

                <MenuItem
                  icon={<FaAddressBook className='me-2' />}
                  component={<Link to="/agendamentos" className="link" />}>
                  Agendamentos
                </MenuItem>

                <SubMenu label="Pacientes" icon={<FaUserFriends className='me-2' />}>
                  <MenuItem component={<Link to="/pacientes/listar" className="link" />}>Lista de Pacientes</MenuItem>
                  <MenuItem component={<Link to="/pacientes/cadastrar" className="link" />}>Cadastro de pacientes</MenuItem>
                </SubMenu>

                <SubMenu label="Consultas" icon={<FaCalendar className='me-2' />}>
                  <MenuItem component={<Link to="/consultas" className="link" />}>Lista de consultas</MenuItem>
                  <MenuItem component={<Link to="/consultas" className="link" />}>Cadastro de consulta</MenuItem>
                  <MenuItem component={<Link to="/calendario" className="link" />}>Calendario</MenuItem>
                </SubMenu>


                <MenuItem
                  icon={<FaChartLine className='me-2' />}
                  component={<Link to="/orcamento" className="link" />}>
                  Orçamento
                </MenuItem>

                <MenuItem
                  icon={<FaChartBar className='me-2' />}
                  component={<Link to="/financeiro" className="link" />}>
                  Financeiro
                </MenuItem>

              </Menu>
            </Sidebar>
          </Col>

          {/* Coluna do conteúdo principal */}
          <Col className="p-4 bg-light min-vh-100">
            <TopBar />
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;