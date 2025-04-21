import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const TabelaConsultas = ({ consultas }) => {
  if (!consultas || consultas.length === 0) return <p>Nenhuma consulta encontrada.</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Paciente</th>
          <th>Profissional</th>
          <th>Data</th>
          <th>Status</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        {consultas.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.paciente?.nome}</td>
            <td>{item.profissional?.nome}</td>
            <td>{moment(item.data).format('DD/MM/YYYY HH:mm')}</td>
            <td>{item.status}</td>
            <td>{item.obs}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaConsultas;
