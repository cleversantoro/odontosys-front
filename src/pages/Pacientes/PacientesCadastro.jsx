import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, Button, Spinner, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ContentHeader from "../../components/share/ContentHeader";
import DadosPessoais from "../../components/paciente/DadosPessoais";
import Telefones from "../../components/paciente/Telefones";
import Endereco from "../../components/paciente/Endereco";
import Observacoes from "../../components/paciente/Observacoes";
import ToastSucesso from "../../components/share/ToastSucesso";

export default function PacientesCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    sexo: 'Masculino',
    dataNascimento: '',
    telefones: [],
    enderecos: [],
    observacoes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/pacientes/${id}`)
        .then(res => {
          setFormData({
            ...res.data,
            dataNascimento: res.data.dataNascimento.split('T')[0], // Ajusta formato da data
          });
        })
        .catch(err => {
          console.error('Erro ao carregar paciente:', err);
          alert('Erro ao carregar paciente.');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (id) {
        await api.put(`/pacientes/${id}`, formData);
      } else {
        await api.post('/pacientes', formData);
      }
      setShowSuccess(true);
      setTimeout(() => navigate('/pacientes'), 1500); // tempo pro usuário ver o toast
    } catch (err) {
      console.error('Erro ao salvar paciente:', err);
      alert('Erro ao salvar os dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <ContentHeader title={id ? "Editar Paciente" : "Novo Paciente"} />
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Tabs defaultActiveKey="dados" className="mb-3">
            <Tab eventKey="dados" title="Dados Pessoais">
              <DadosPessoais formData={formData} setFormData={setFormData} errors={errors} />
            </Tab>
            <Tab eventKey="enderecos" title="Endereço">
              <Endereco formData={formData} setFormData={setFormData} />
            </Tab>
            <Tab eventKey="telefones" title="Telefones">
              <Telefones formData={formData} setFormData={setFormData} />
            </Tab>
            <Tab eventKey="observacoes" title="Observações">
              <Observacoes formData={formData} setFormData={setFormData} />
            </Tab>
          </Tabs>
          <div className="text-end">
            <Button variant="secondary" onClick={() => navigate('/pacientes')} className="me-2">
              Voltar
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </Form>
      </Container>
      <ToastSucesso show={showSuccess} mensagem="Paciente salvo com sucesso!" onClose={() => setShowSuccess(false)} />
    </>
  );
}
