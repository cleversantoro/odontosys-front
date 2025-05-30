import React from 'react';

const Orcamento = ({ formData, setFormData }) => {
  const servicos = [
    "Extração", "Restauração Amálgama", "Restauração Resina Anterior",
    "Restauração Resina Posterior", "Tratamento de Canal", "Elemento Fixo",
    "Ponte Móvel Resina", "Ponte Móvel Grampo", "Prótese Total", "Limpeza",
    "Clareamento", "Implante", "Outros"
  ];

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <label className="me-2">Data:</label>
        <input
          type="date"
          className="form-control w-25"
          value={formData.orcamentoData}
          onChange={(e) => setFormData(prev => ({ ...prev, orcamentoData: e.target.value }))}
        />
        <button className="btn btn-success btn-sm ms-2">Incluir +</button>
      </div>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>QUANT</th>
            <th>SERVIÇOS</th>
            <th>R$</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico, i) => (
            <tr key={i}>
              <td></td>
              <td>{servico === "Outros" ? <strong>{servico}</strong> : servico}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-2"><strong>TOTAL:</strong> ____________________</div>
      <label className="form-label">FORMAS DE PAGAM</label>
      <textarea
        className="form-control"
        rows="3"
        value={formData.formasPagamento}
        onChange={(e) => setFormData(prev => ({ ...prev, formasPagamento: e.target.value }))}
      />
    </>
  );
};

export default Orcamento;
