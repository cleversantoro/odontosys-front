import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import estadosData from '../../assets/data/Estados.json';
import cidadesData from '../../assets/data/Cidades.json';
import nacionalidadesData from '../../assets/data/nacionalidades.json';

const DadosPessoais = ({ formData, setFormData, errors }) => {
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData(prev => ({ ...prev, [name]: value }));

    setFormData(prev => ({
      ...prev,
      paciente: {
        ...prev.paciente,
        [name]: value
      }
    }));

    if (name === "estado") {
      const estadoSelecionado = estadosData.find(estado => estado.Sigla === value);
      const cidades = cidadesData.filter(cidade => cidade.Estado === estadoSelecionado?.ID);
      setCidadesFiltradas(cidades);
      setFormData(prev => ({ ...prev, naturalidade: "" })); // limpa a cidade se trocar o estado
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="nome">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.paciente?.nome}
              onChange={handleChange}
            // isInvalid={!!errors.nome}
            />
            {/* <Form.Control.Feedback type="invalid">
              {errors.nome}
            </Form.Control.Feedback> */}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="dataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" name="dataNascimento" value={formData.paciente?.dataNascimento} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="sexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Select name="sexo" value={formData.paciente?.sexo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="estadoCivil">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Select name="estadoCivil" value={formData.paciente?.estadoCivil} onChange={handleChange}>
              <option value="">Selecione</option>
              <option>Solteiro(a)</option>
              <option>Casado(a)</option>
              <option>Divorciado(a)</option>
              <option>Viúvo(a)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="estado">
            <Form.Label>Estado (UF)</Form.Label>
            <Form.Select name="estado" value={formData.paciente?.estado} onChange={handleChange}>
              <option value="">Selecione</option>
              {estadosData.map(estado => (
                <option key={estado.ID} value={estado.Sigla}>{estado.Nome}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="naturalidade">
            <Form.Label>Naturalidade (Cidade)</Form.Label>
            <Form.Select name="naturalidade" value={formData.paciente?.naturalidade} onChange={handleChange}>
              <option value="">Selecione</option>
              {cidadesFiltradas.map(cidade => (
                <option key={cidade.ID} value={cidade.Nome}>{cidade.Nome}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>        
      </Row>

      <Row className="mb-3">
      <Col md={6}>
          <Form.Group controlId="nacionalidade">
            <Form.Label>Nacionalidade</Form.Label>
            <Form.Select name="nacionalidade" value={formData.paciente?.nacionalidade} onChange={handleChange}>
              <option value="">Selecione</option>
              {nacionalidadesData.nacionalidade.map((nac, idx) => (
                <option key={idx} value={nac}>{nac}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.paciente?.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={formData.paciente?.codigo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="dataEntrada">
            <Form.Label>Data de Entrada</Form.Label>
            <Form.Control
              type="date"
              name="dataEntrada"
              value={formData.paciente.dataEntrada}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

    </Form>
  );
};

export default DadosPessoais;
