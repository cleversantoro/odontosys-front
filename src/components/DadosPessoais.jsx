import React from 'react';

const DadosPessoais = ({ formData, setFormData, errors }) => {
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>

      <div className="row mb-2">
        <div className="col">
          <label className="form-label">Nome Completo:</label>
          <input name="nome" type="text" className="form-control" value={formData.nome} onChange={handleChange} />
          {errors.nome && <small className="text-danger">{errors.nome}</small>}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-4">
          <label className="form-label">CPF:</label>
          <input name="cpf" type="text" className="form-control" value={formData.cpf} onChange={handleChange} />
          {errors.cpf && <small className="text-danger">{errors.cpf}</small>}
        </div>
        <div className="col-md-4">
          <label className="form-label">RG:</label>
          <input name="rg" type="text" className="form-control" value={formData.rg} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Data de Nascimento:</label>
          <input type="date" className="form-control mb-2" name="nascimento" value={formData.nascimento}
            onChange={(e) => setFormData(prev => ({ ...prev, nascimento: e.target.value }))} />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6">
          <label className="form-label">CÓDIGO:</label>
          <input name="codigo" type="text" className="form-control" value={formData.codigo} onChange={handleChange} />
          {errors.codigo && <small className="text-danger">{errors.codigo}</small>}
        </div>
        <div className="col-md-6">
          <label className="form-label">REF.:</label>
          <input name="referencia" type="text" className="form-control" value={formData.referencia} onChange={handleChange} />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <label className="form-label">Data de Entrada:</label>
          <input name="dataEntrada" type="date" className="form-control" value={formData.dataEntrada} onChange={handleChange} />
          <br />
          <button className="btn btn-outline-secondary btn-sm me-2">🖨 Imprimir Contrato Ortodontia</button>
          <button className="btn btn-outline-secondary btn-sm">🖨 Imprimir Contrato Implante</button>
        </div>
      </div>
    </>
  );
};

export default DadosPessoais;
