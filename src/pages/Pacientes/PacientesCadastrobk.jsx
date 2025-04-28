import React, { useState } from "react";
import { Tabs, Tab, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import DadosPessoais from "../../components/paciente/DadosPessoais";
import Enderecos from "../../components/paciente/Endereco";
import Telefones from "../../components/paciente/Telefones";
import Documentos from "../../components/paciente/Documentos";
import DadosClinicos from "../../components/paciente/DadosClinicos";

import "./cadastroPaciente.css";

export default function PacientesCadastrobkp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paciente: {
      codigo: "",
      nome: "",
      email: "",
      sexo: "Masculino",
      dataNascimento: "",
      estadoCivil: "",
      nacionalidade: "",
      naturalidade: "",
      estado: "",
      dataEntrada: ""
    },
    enderecos: [],
    telefones: [],
    documentos: [],
    dadosClinicos: {
      grupoSanguineo: "",
      alergias: "",
      medicamentosContinuos: "",
      doencasPreExistentes: "",
      planoSaude: "",
      numeroApolice: ""
    }
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.paciente.nome) newErrors.nome = "Nome é obrigatório";
    if (!formData.paciente.email || !formData.paciente.email.includes('@')) newErrors.email = "E-mail inválido";
    if (!formData.paciente.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória";
    if (!formData.paciente.sexo) newErrors.sexo = "Sexo é obrigatório";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post("/pacientes/completo", formData);
      alert("Paciente cadastrado com sucesso!");
      navigate("/pacientes");
    } catch (err) {
      console.error("Erro ao salvar paciente:", err);
      alert("Erro ao salvar dados do paciente.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="form-wrapper">
        <h2 className="section-title">Cadastro de Paciente</h2>
        <form onSubmit={handleSubmit}>
          <Tabs defaultActiveKey="dadosPessoais" id="pacientes-tabs" className="mb-3">
            
            <Tab eventKey="dadosPessoais" title="Dados Pessoais">
              <DadosPessoais formData={formData} setFormData={setFormData} errors={errors} />
            </Tab>

            <Tab eventKey="enderecos" title="Endereços">
              <Enderecos formData={formData} setFormData={setFormData} />
            </Tab>

            <Tab eventKey="telefones" title="Telefones">
              <Telefones formData={formData} setFormData={setFormData} />
            </Tab>

            <Tab eventKey="documentos" title="Documentos">
              <Documentos formData={formData} setFormData={setFormData} />
            </Tab>

            <Tab eventKey="dadosClinicos" title="Dados Clínicos">
              <DadosClinicos formData={formData} setFormData={setFormData} errors={errors} />
            </Tab>

          </Tabs>

          <div className="d-flex justify-content-end mt-4">
            <Button className="btn-save" type="submit">Salvar Paciente</Button>
            <Button className="btn-cancel" onClick={() => navigate("/pacientes")}>Cancelar</Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
