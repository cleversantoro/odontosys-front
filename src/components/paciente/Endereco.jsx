import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function Enderecos({ formData, setFormData, errors }) {

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      enderecos: [{
        ...prev.enderecos[0],
        [field]: value
      }]
    }));
  };

  return (
    <div className="mb-4">      
      <Row className="mb-3">
        <Col md={8}>
          <Form.Group>
            <Form.Label>Logradouro</Form.Label>
            <Form.Control
              type="text"
              name="logradouro"
              placeholder="Rua, Avenida, Praça, etc"
              value={formData.enderecos?.[0]?.logradouro || ''}
              onChange={(e) => handleChange(e, 'logradouro')}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              placeholder="Número"
              value={formData.enderecos?.[0]?.numero || ''}
              onChange={(e) => handleChange(e, 'numero')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              type="text"
              name="complemento"
              placeholder="Apto, Bloco, Casa..."
              value={formData.enderecos?.[0]?.complemento || ''}
              onChange={(e) => handleChange(e, 'complemento')}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.enderecos?.[0]?.bairro || ''}
              onChange={(e) => handleChange(e, 'bairro')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={formData.enderecos?.[0]?.cidade || ''}
              onChange={(e) => handleChange(e, 'cidade')}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              placeholder="UF"
              value={formData.enderecos?.[0]?.estado || ''}
              onChange={(e) => handleChange(e, 'estado')}
              maxLength={2}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              name="cep"
              placeholder="CEP"
              value={formData.enderecos?.[0]?.cep || ''}
              onChange={(e) => handleChange(e, 'cep')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              name="pais"
              placeholder="País"
              value={formData.enderecos?.[0]?.pais || ''}
              onChange={(e) => handleChange(e, 'pais')}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
