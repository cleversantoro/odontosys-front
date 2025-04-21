
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function FiltroAgendamentos({ filtros, setFiltros, onFiltrar }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={filtros.status} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Agendado">Agendado</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Realizado">Realizado</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Data</Form.Label>
          <Form.Control type="date" name="data" value={filtros.data} onChange={handleChange} />
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button onClick={onFiltrar}>Filtrar</Button>
        </Col>
      </Row>
    </Form>
  );
}
