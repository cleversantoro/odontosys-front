import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ContentHeader from "../../components/ContentHeader";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import DadosPessoais from '../../components/DadosPessoais';
import Telefones from '../../components/Telefones';
import Endereco from '../../components/Endereco';
import Orcamento from '../../components/Orcamento';
import Observacoes from '../../components/Observacoes';

import { useParams } from 'react-router-dom'; // se estiver usando react-router-dom

import './Patients.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    api.get('/patients')
      .then((res) => {
         setPatients(res.data); 
         //setFormData(res.data);
        })
      .catch((error) => { console.error('Erro ao buscar pacientes:', error); });
  }, []);

  const columns = [
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Telefone" },
  ];

  const { id } = useParams(); // pega o ID da rota (ex: /pacientes/:id)
  const [formData, setFormData] = useState({
    codigo: '', referencia: '', dataEntrada: '', nome: '', cpf: '', rg: '',
    telefones: { comercial: '', residencial: '', fax: '', celular: '' },
    endereco: { logradouro: '', bairro: '', cidade: '', cep: '', email: '' },
    nascimento: '', formasPagamento: '', observacoes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      api.get(`/pacientes/${id}`)
        .then(res => {
          setFormData(res.data);
        })
        .catch(err => {
          console.error('Erro ao carregar paciente:', err);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.codigo) newErrors.codigo = 'Código é obrigatório';
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.endereco.email.includes('@')) newErrors.email = 'Email inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        await api.put(`/patients/${id}`, formData);
        alert('Paciente atualizado com sucesso!');
      } else {
        await api.post('/patients', formData);
        alert('Paciente criado com sucesso!');
        setFormData({
          codigo: '', referencia: '', dataEntrada: '', nome: '', cpf: '', rg: '',
          telefones: { comercial: '', residencial: '', fax: '', celular: '' },
          endereco: { logradouro: '', bairro: '', cidade: '', cep: '', email: '' },
          nascimento: '', formasPagamento: '', observacoes: ''
        });
      }
    } catch (err) {
      console.error('Erro ao salvar paciente:', err);
      alert('Erro ao salvar os dados.');
    }
  };

  return (
    <>
      <ContentHeader title="Pacientes" />


      <div className="p-6">
        <Button variant="primary" onClick={handleShow} >
          Adicionar Paciente
        </Button>
        {/* <Table data={patients} columns={columns} /> */}
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


      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <Tabs defaultActiveKey="inicio" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="inicio" title="Dados Pessoais">
              <DadosPessoais formData={formData} setFormData={setFormData} errors={errors} />
            </Tab>
            <Tab eventKey="endereco" title="Endereço">
              <Endereco formData={formData} setFormData={setFormData} errors={errors} />
            </Tab>
            <Tab eventKey="telefones" title="Telefones" >
              <Telefones formData={formData} setFormData={setFormData} />
            </Tab>
            <Tab eventKey="observacoes" title="Observaçoes" >
              <Observacoes formData={formData} setFormData={setFormData} />
            </Tab>
          </Tabs>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary mt-3" type="submit">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Patients;
