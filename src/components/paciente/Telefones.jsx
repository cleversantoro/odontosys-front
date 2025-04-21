import React from 'react';

const Telefones = ({ formData, setFormData }) => {
  const handleChange = (e, tipo) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      telefones: {
        ...prev.telefones,
        [tipo]: value
      }
    }));
  };

  return (
    <div className="mb-2">
      <label className="form-label">Telefones</label>
      {["comercial", "residencial", "fax", "celular"].map(tipo => (
        <div key={tipo} className="mb-1">
          <button type="button" className="btn btn-outline-primary btn-sm me-2">
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}...
          </button>
          <input
            type="text"
            className="form-control"
            //value={formData.telefones[tipo]}
            onChange={(e) => handleChange(e, tipo)}
          />
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm">Incluir + Telefones</button>
    </div>
  );
};

export default Telefones;
