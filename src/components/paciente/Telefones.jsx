import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

export default function Telefones({ formData, setFormData }) {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [telefoneTemp, setTelefoneTemp] = useState({ numero: '', tipo: 'celular' });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setEditingIndex(null);
    setTelefoneTemp({ numero: '', tipo: 'celular' });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Edição
      const updated = [...(formData.telefones || [])];
      updated[editingIndex] = telefoneTemp;
      setFormData(prev => ({ ...prev, telefones: updated }));
    } else {
      // Inclusão
      setFormData(prev => ({
        ...prev,
        telefones: [...(prev.telefones || []), telefoneTemp]
      }));
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTelefoneTemp(formData.telefones[index]);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = formData.telefones.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, telefones: updated }));
  };

  return (
    <div className="mb-4">

      <Button variant="primary" size="sm" className="mb-3" onClick={handleShow}>
        + Novo Telefone
      </Button>

      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Número</th>
            <th className="text-center" style={{ width: "150px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {formData.telefones && formData.telefones.length > 0 ? (
            formData.telefones.map((telefone, index) => (
              <tr key={index}>
                <td>{telefone.tipo}</td>
                <td>{telefone.numero}</td>
                <td className="text-center">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Excluir</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Nenhum telefone adicionado</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Cadastro/Edicao */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Editar Telefone" : "Novo Telefone"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Telefone</Form.Label>
            <Form.Select
              name="tipo"
              value={telefoneTemp.tipo}
              onChange={(e) => setTelefoneTemp({ ...telefoneTemp, tipo: e.target.value })}
            >
              <option value="celular">Celular</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={telefoneTemp.numero}
              onChange={(e) => setTelefoneTemp({ ...telefoneTemp, numero: e.target.value })}
              placeholder="Digite o número"
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
