import React from 'react';
import {  Form } from 'react-bootstrap';

const Observacoes = ({ formData, setFormData }) => {
  return (
    <>
      <Form.Control as="textarea" rows={8}
        className="form-control"
        placeholder="Digite suas observações aqui..."
        value={formData.paciente.obs}
        onChange={(e) => setFormData(prev => ({ ...prev, obs: e.target.value }))}/>
      <br />
    </>
  );
};

export default Observacoes;
