//import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { FaUserFriends, FaChartPie, FaChartBar, FaChartLine, FaAddressBook } from "react-icons/fa";
import { FaBars, FaCalendar } from 'react-icons/fa6';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";

import TopBar from '../../components/share/TopBar';
import '../Home/sidebar-custom.css'; 

const Home = () => {
  const { collapseSidebar } = useProSidebar();

  return (
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
                  component={<Link to="/calendario" className="link" />}>
                  Agendamentos
                </MenuItem>

                <SubMenu label="Pacientes" icon={<FaUserFriends className='me-2' />}>
                  <MenuItem component={<Link to="/pacientes/listar" className="link" />}>Lista de Pacientes</MenuItem>
                  <MenuItem component={<Link to="/pacientes/cadastrar" className="link" />}>Cadastro de pacientes</MenuItem>
                </SubMenu>

                <SubMenu label="Consultas" icon={<FaCalendar className='me-2' />}>
                  <MenuItem component={<Link to="/consultas/completa" className="link" />}>Lista de consultas</MenuItem>
                  <MenuItem component={<Link to="/consultas/Agenda" className="link" />}>Agenda de consulta</MenuItem>
                  {/* <MenuItem component={<Link to="/calendario" className="link" />}>Calendario</MenuItem> */}
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