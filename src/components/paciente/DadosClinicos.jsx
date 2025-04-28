import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function DadosClinicos({ formData, setFormData, errors }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      dadosClinicos: {
        ...prev.dadosClinicos,
        [name]: value
      }
    }));
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="grupoSanguineo">
            <Form.Label>Grupo Sanguíneo</Form.Label>
            <Form.Control
              type="text"
              name="grupoSanguineo"
              value={formData.dadosClinicos?.grupoSanguineo || ''}
              onChange={handleChange}
              placeholder="Ex: A+, O-, B+"
            />
          </Form.Group>
        </Col>

        <Col md={8}>
          <Form.Group controlId="planoSaude">
            <Form.Label>Plano de Saúde</Form.Label>
            <Form.Control
              type="text"
              name="planoSaude"
              value={formData.dadosClinicos?.planoSaude || ''}
              onChange={handleChange}
              placeholder="Ex: Unimed, Bradesco Saúde"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="numeroApolice">
            <Form.Label>Número da Apólice</Form.Label>
            <Form.Control
              type="text"
              name="numeroApolice"
              value={formData.dadosClinicos?.numeroApolice || ''}
              onChange={handleChange}
              placeholder="Número da apólice de saúde"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="alergias">
            <Form.Label>Alergias</Form.Label>
            <Form.Control
              type="text"
              name="alergias"
              value={formData.dadosClinicos?.alergias || ''}
              onChange={handleChange}
              placeholder="Ex: Penicilina, frutos do mar"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="medicamentosContinuos">
            <Form.Label>Medicamentos Contínuos</Form.Label>
            <Form.Control
              type="text"
              name="medicamentosContinuos"
              value={formData.dadosClinicos?.medicamentosContinuos || ''}
              onChange={handleChange}
              placeholder="Ex: Insulina, Atenolol"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="doencasPreExistentes">
            <Form.Label>Doenças Pré-Existentes</Form.Label>
            <Form.Control
              type="text"
              name="doencasPreExistentes"
              value={formData.dadosClinicos?.doencasPreExistentes || ''}
              onChange={handleChange}
              placeholder="Ex: Diabetes, Hipertensão"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
  
}