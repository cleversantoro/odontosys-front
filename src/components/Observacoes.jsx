import React from 'react';

const Observacoes = ({ formData, setFormData }) => {
  return (
    <textarea
      className="form-control"
      rows="8"
      placeholder="Digite suas observações aqui..."
      value={formData.observacoes}
      onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
    />
  );
};

export default Observacoes;
