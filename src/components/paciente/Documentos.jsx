import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

export default function Documentos({ formData, setFormData }) {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [documentoTemp, setDocumentoTemp] = useState({
    numero: '',
    tipo: 'CPF',
    emissor: '',
    dataEmissao: ''
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setEditingIndex(null);
    setDocumentoTemp({ numero: '', tipo: 'CPF', emissor: '', dataEmissao: '' });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...(formData.documentos || [])];
      updated[editingIndex] = documentoTemp;
      setFormData(prev => ({ ...prev, documentos: updated }));
    } else {
      setFormData(prev => ({
        ...prev,
        documentos: [...(prev.documentos || []), documentoTemp]
      }));
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setDocumentoTemp(formData.documentos[index]);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = formData.documentos.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, documentos: updated }));
  };

  return (
    <div className="mb-4">

      <Button variant="primary" size="sm" className="mb-3" onClick={handleShow}>
        + Novo Documento
      </Button>

      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Número</th>
            <th>Emissor</th>
            <th>Data de Emissão</th>
            <th className="text-center" style={{ width: "150px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {formData.documentos && formData.documentos.length > 0 ? (
            formData.documentos.map((doc, index) => (
              <tr key={index}>
                <td>{doc.tipo}</td>
                <td>{doc.numero}</td>
                <td>{doc.emissor}</td>
                <td>{doc.dataEmissao ? new Date(doc.dataEmissao).toLocaleDateString() : ''}</td>
                <td className="text-center">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Excluir</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Nenhum documento adicionado</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Cadastro/Edicao */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Editar Documento" : "Novo Documento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Select
              name="tipo"
              value={documentoTemp.tipo}
              onChange={(e) => setDocumentoTemp({ ...documentoTemp, tipo: e.target.value })}
            >
              <option value="RG">RG</option>
              <option value="CPF">CPF</option>
              <option value="CNH">CNH</option>
              <option value="Passaporte">Passaporte</option>
              <option value="Certidão de Nascimento">Certidão de Nascimento</option>
              <option value="Certidão de Casamento">Certidão de Casamento</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={documentoTemp.numero}
              onChange={(e) => setDocumentoTemp({ ...documentoTemp, numero: e.target.value })}
              placeholder="Digite o número do documento"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Emissor</Form.Label>
            <Form.Control
              type="text"
              name="emissor"
              value={documentoTemp.emissor}
              onChange={(e) => setDocumentoTemp({ ...documentoTemp, emissor: e.target.value })}
              placeholder="Ex: SSP-SP, Polícia Federal"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data de Emissão</Form.Label>
            <Form.Control
              type="date"
              name="dataEmissao"
              value={documentoTemp.dataEmissao}
              onChange={(e) => setDocumentoTemp({ ...documentoTemp, dataEmissao: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
