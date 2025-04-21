
import React from "react";
import { Table } from "react-bootstrap";
import PacienteItem from "./PacienteItem";

export default function PacienteList({ pacientes, onEdit, onDelete }) {
  return (
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
          <PacienteItem
            key={p.id}
            paciente={p}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </Table>
  );
}
