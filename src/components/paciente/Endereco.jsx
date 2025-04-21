import React from 'react';

const Endereco = ({ formData, setFormData, errors }) => {
  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value
      }
    }));
  };

  return (
    <div className="mb-2">
      <label className="form-label">Endereço:</label>
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Logradouro"
        //value={formData.endereco.logradouro}
        onChange={(e) => handleChange(e, 'logradouro')}
      />
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Bairro"
            //value={formData.endereco.bairro}
            onChange={(e) => handleChange(e, 'bairro')}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Cidade"
            //value={formData.endereco.cidade}
            onChange={(e) => handleChange(e, 'cidade')}
          />
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-1"
        placeholder="CEP"
        //value={formData.endereco.cep}
        onChange={(e) => handleChange(e, 'cep')}
      />      
      {errors.email && <small className="text-danger">{errors.email}</small>}
      <button type="button" className="btn btn-secondary btn-sm">Contatos...</button>
    </div>
  );
};

export default Endereco;
