import React, { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import api from "../../services/api";

export default function PacienteDetalhes({ paciente, show, handleClose }) {
  const [endereco, setEndereco] = useState([]);
  const [telefones, setTelefones] = useState([]);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    if (paciente) {
      api.get(`/enderecos/${paciente.id}/paciente`).then(res => setEndereco(res.data));
      api.get(`/telefones/${paciente.id}/paciente`).then(res => setTelefones(res.data));
      api.get(`/documentos/${paciente.id}/paciente`).then(res => setDocumentos(res.data));
    }
  }, [paciente]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="dados" className="mb-3">
          <Tab eventKey="dados" title="Dados Pessoais">
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>Email:</strong> {paciente.email}</p>
            <p><strong>Nascimento:</strong> {new Date(paciente.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Sexo:</strong> {paciente.sexo}</p>
          </Tab>
          <Tab eventKey="telefones" title="Telefones">
            {
              telefones.length === 0 ? (
                <p>Nenhum telefone cadastrado.</p>
              ) : (
                telefones.map((t) => (
                  <p key={t.id}><strong>{t.tipo}:</strong> {t.numero}</p>
                ))
              )
            }
          </Tab>
          <Tab eventKey="endereco" title="Endereços">
            {
              endereco.length === 0 ? (
                <p>Nenhum endereço cadastrado.</p>
              ) : (
                endereco.map((e) => (
                  <div key={e.id}>
                    <p><strong>Endereço:</strong> {e.logradouro}, {e.numero} - {e.bairro}, {e.cidade}/{e.estado} - {e.cep}</p>
                  </div>
                ))
              )
            }
          </Tab>
          <Tab eventKey="documentos" title="Documentos">
            {
              documentos.length === 0 ? (
                <p>Nenhum documento cadastrado.</p>
              ) : (
                documentos.map((d) => (
                  <div key={d.id}>
                    <p><strong>{d.tipo}:</strong> {d.numero} ({d.emissor})</p>
                  </div>
                ))
              )
            }
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
