import React from 'react';
import { Table } from 'react-bootstrap';

const DinamicTable = ({ dados }) => {
  if (!dados || dados.length === 0) return <p>Nenhum dado disponível.</p>;

  const colunas = Object.keys(dados[0]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {colunas.map((coluna) => (
            <th key={coluna}>{coluna.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.map((item, idx) => (
          <tr key={idx}>
            {colunas.map((coluna) => (
              <td key={coluna}>{item[coluna]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DinamicTable;
