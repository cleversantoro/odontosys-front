//import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Image, NavDropdown } from "react-bootstrap";
import { FaUserFriends, FaChartPie, FaChartBar, FaChartLine, FaAddressBook } from "react-icons/fa";
import "../styles/custom.css";
import { FaCalendar } from 'react-icons/fa6';


const Home = () => {
  const location = useLocation();

  //const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (

    <Container fluid>
      <Row>
        <Col md={2} className="sidebar d-flex flex-column justify-content-between">
          <div>
            <div className="text-center mb-4">
              <Image src="" roundedCircle width={80} height={80} className="mb-2" />
              <h6 className="text-white">OdontoSys</h6>
            </div>
            <Nav defaultActiveKey="/" className="flex-column" >

              <Nav.Link as={Link} to="/dashboard" active={location.pathname === "/dashboard"} className="nav-link">
                <FaChartPie className="me-2" /> Dashboard
              </Nav.Link>

              <Nav.Link as={Link} to="/agendamentos" active={location.pathname === "/agendamentos"} className="nav-link">
                <FaAddressBook className="me-2" /> Agendamentos
              </Nav.Link>

              <Nav.Link as={Link} to="/pacientes" active={location.pathname === "/pacientes"} className="nav-link">
                <FaUserFriends className="me-2" /> Pacientes
              </Nav.Link>

              <Nav.Link as={Link} to="/consultas" active={location.pathname === "/consultas"} className="nav-link">
                <FaCalendar className="me-2" /> Consulta
              </Nav.Link>

              <Nav.Link as={Link} to="/financeiro" active={location.pathname === "/financeiro"} className="nav-link">
                <FaChartBar className="me-2" /> Financeiro
              </Nav.Link>

              <Nav.Link as={Link} to="/orcamento" active={location.pathname === "/orcamento"} className="nav-link">
                <FaChartLine className="me-2" /> Orçamento
              </Nav.Link>
              <div className="nav-link">
                <FaChartLine className="me-2" />
                <NavDropdown title="Teste" id="nav-dropdown">

                  <NavDropdown.Item eventKey="4.1">
                    teste 1
                  </NavDropdown.Item>

                  <NavDropdown.Item eventKey="4.2">Teste 2</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">teste 3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Teste 4</NavDropdown.Item>

                  <Nav.Link as={Link} to="/orcamento" active={location.pathname === "/orcamento"}>
                    <FaChartLine className="me-2" /> Orçamento
                  </Nav.Link>

                </NavDropdown>
              </div>

            </Nav>
          </div>
          <div className="text-center text-muted small py-2">
            <span>© 2025 OdontoSys</span>
          </div>
        </Col>
        <Col md={10} className="p-4 bg-light min-vh-100">
          <Outlet />
        </Col>
      </Row>
    </Container >


  );
};

export default Home;