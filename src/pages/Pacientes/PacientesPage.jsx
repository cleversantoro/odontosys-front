
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Table, Container } from "react-bootstrap";
import PacienteForm from "../../components/paciente/PacienteForm";
import ContentHeader from "../../components/share/ContentHeader";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pacienteEdit, setPacienteEdit] = useState(null);

  const fetchPacientes = async () => {
    await api.get('/pacientes')
      .then((res) => { setPacientes(res.data); })
      .catch((error) => { console.error('Erro ao buscar pacientes:', error); });
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleEdit = (paciente) => {
    setPacienteEdit(paciente);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await api.delete(`/pacientes/${id}`)
      .then(() => { fetchPacientes(); })
      .catch((error) => { console.error('Erro ao excluir paciente:', error); });

  };

  const handleFormClose = () => {
    setShowForm(false);
    setPacienteEdit(null);
    fetchPacientes();
  };

  return (
    <>
    <ContentHeader title="Pacientes" />

    <Container className="mt-4">
      <h2>Lista de Pacientes</h2>
      <Button onClick={() => setShowForm(true)} className="mb-3">+ Novo Paciente</Button>

      {showForm && (
        <PacienteForm
          paciente={pacienteEdit}
          onClose={handleFormClose}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Nascimento</th>
            <th>Sexo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>{new Date(p.dataNascimento).toLocaleDateString()}</td>
              <td>{p.sexo}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(p)}>Editar</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>    
  );
}
