import React, { useEffect, useState } from "react";
import api from "../services/api";
import ContentHeader from "../components/ContentHeader";
//import Navbar from "../components/Navbar";
import Table from "../components/Table";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    api.get('/patients')
      .then((res) => { setPatients(res.data); })
      .catch((error) => { console.error('Erro ao buscar pacientes:', error); });
  }, []);

  const columns = [
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Telefone" },
  ];

  return (
    <>
      <ContentHeader title="Pacientes" />


      <div className="p-6">
        <Button variant="primary" onClick={handleShow} >
          Adicionar Paciente
        </Button>
        <Table data={patients} columns={columns} />
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="border p-2 w-full mb-3" type="text" placeholder="Nome" /><br />
          <input className="border p-2 w-full mb-3" type="email" placeholder="E-mail" /><br />
          <input className="border p-2 w-full mb-3" type="text" placeholder="Telefone" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>



    </>
  );
};

export default Patients;
