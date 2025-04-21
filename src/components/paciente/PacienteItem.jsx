
import React from "react";
import { Button } from "react-bootstrap";

export default function PacienteItem({ paciente, onEdit, onDelete }) {
  return (
    <tr>
      <td>{paciente.nome}</td>
      <td>{paciente.email}</td>
      <td>{new Date(paciente.dataNascimento).toLocaleDateString()}</td>
      <td>{paciente.sexo}</td>
      <td>
        <Button variant="warning" size="sm" onClick={() => onEdit(paciente)}>Editar</Button>{" "}
        <Button variant="danger" size="sm" onClick={() => onDelete(paciente.id)}>Excluir</Button>
      </td>
    </tr>
  );
}
