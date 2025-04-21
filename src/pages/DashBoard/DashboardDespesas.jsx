
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, Row, Col } from "react-bootstrap";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0522d", "#6a5acd"];

export default function DashboardDespesas() {
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);
  const [porCategoria, setPorCategoria] = useState([]);
  const [porData, setPorData] = useState([]);

  useEffect(() => {
     api.get('/despesas')
      .then((res) => { 
        setDespesas(res.data); 
        processaDados(res.data);
      })
      .catch((error) => { console.error('Erro ao buscar pacientes:', error); });
  }, []);

  const processaDados = (data) => {
    const totalGasto = data.reduce((acc, curr) => acc + curr.valor, 0);
    setTotal(totalGasto.toFixed(2));

    const agrupadoCategoria = data.reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + curr.valor;
      return acc;
    }, {});
    setPorCategoria(Object.entries(agrupadoCategoria).map(([name, value]) => ({ name, value })));

    const agrupadoData = data.reduce((acc, curr) => {
      const dia = new Date(curr.data).toLocaleDateString();
      acc[dia] = (acc[dia] || 0) + curr.valor;
      return acc;
    }, {});
    setPorData(Object.entries(agrupadoData).map(([data, valor]) => ({ data, valor })));
  };

  return (
    <div className="mt-4">
      <h3>Dashboard de Despesas</h3>
      <Card className="p-3 my-3">
        <h5>Total gasto no período: R$ {total}</h5>
      </Card>

      <Row>
        <Col md={6}>
          <h5>Distribuição por Categoria</h5>
          <PieChart width={400} height={300}>
            <Pie
              data={porCategoria}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {porCategoria.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>

        <Col md={6}>
          <h5>Gastos por Dia</h5>
          <LineChart width={500} height={300} data={porData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
          </LineChart>
        </Col>
      </Row>
    </div>
  );
}
