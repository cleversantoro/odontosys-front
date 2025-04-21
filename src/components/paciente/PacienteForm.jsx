
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import api from "../../services/api";

export default function PacienteForm({ paciente, onClose }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    sexo: "Masculino"
  });

  useEffect(() => {
    if (paciente) {
      setForm({
        nome: paciente.nome,
        email: paciente.email,
        dataNascimento: paciente.dataNascimento.split("T")[0],
        sexo: paciente.sexo,
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paciente) {
      await api.put(`/pacientes/${paciente.id}`, form);
    } else {
      await api.post("/pacientes", form);
    }
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{paciente ? "Editar Paciente" : "Novo Paciente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Select name="sexo" value={form.sexo} onChange={handleChange}>
              <option>Masculino</option>
              <option>Feminino</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>{" "}
            <Button variant="primary" type="submit">Salvar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
