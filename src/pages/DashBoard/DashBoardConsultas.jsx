import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

import api from "../../services/api";
import { Col, Row } from 'react-bootstrap';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];

export default function DashboardConsultas() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resAg = await api.get('/consultas/vwconsultas');
                const resCs = await api.get('/consultas');
                setAgendamentos(resAg.data);
                setConsultas(resCs.data);
                // console.log('Agendamentos:', resAg.data);
                // console.log('Consultas:', resCs.data);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        };
        fetchData();
    }, []);

    const countByField = (data, field) => {
        const count = {};
        data.forEach(item => {
            const key = item[field];
            count[key] = (count[key] || 0) + 1;
        });
        return Object.entries(count).map(([key, value]) => ({ name: key, value }));
    };

    const dailyStats = () => {
        const ag = agendamentos.map(a => ({
            date: (a.data_agendamento || a.data || "").split('T')[0],
            tipo: 'Agendamento'
        }));
        const cs = consultas.map(c => ({
            date: (c.dataHora || "").split('T')[0],
            tipo: 'Consulta'
        }));
        const all = [...ag, ...cs];
        const grouped = all.reduce((acc, cur) => {
            const d = cur.date;
            acc[d] = acc[d] || { date: d, Agendamento: 0, Consulta: 0 };
            acc[d][cur.tipo]++;
            return acc;
        }, {});
        return Object.values(grouped);
    };

    const faixaHoraria = () => {
        const ranges = { '08-10h': 0, '10-12h': 0, '12-14h': 0, '14-16h': 0, '16-18h': 0, '18h+': 0 };
        consultas.forEach(c => {
            const hora = new Date(c.dataHora).getHours();
            if (hora < 10) ranges['08-10h']++;
            else if (hora < 12) ranges['10-12h']++;
            else if (hora < 14) ranges['12-14h']++;
            else if (hora < 16) ranges['14-16h']++;
            else if (hora < 18) ranges['16-18h']++;
            else ranges['18h+']++;
        });
        return Object.entries(ranges).map(([key, value]) => ({ name: key, value }));
    };

    const consultasPorMes = () => {
        const meses = {};
        consultas.forEach(c => {
            const date = new Date(c.dataHora);
            const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            meses[key] = (meses[key] || 0) + 1;
        });
        return Object.entries(meses).map(([key, value]) => ({ name: key, value }));
    };

    const taxaComparecimento = () => {
        const total = agendamentos.length;
        const realizados = consultas.length;
        const taxa = (realizados / total) * 100;
        return [{ name: 'Comparecimento', value: taxa }, { name: 'Faltas', value: 100 - taxa }];
    };

    //const statusAgendamento = countByField(agendamentos, 'status');
    const consultasPorProfissional = countByField(consultas, 'profissionalId');
    const consultasPorPaciente = countByField(consultas, 'pacienteId');
    const consultasPorStatus = countByField(consultas, 'status');

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Row>
                <Col>
                    <div className="h-80">
                        <h2 className="text-lg font-bold">Agendamentos vs Consultas por Dia</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <BarChart data={dailyStats()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Agendamento" fill="#8884d8" />
                                <Bar dataKey="Consulta" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h2 className="text-lg font-bold">Status dos Agendamentos</h2>
                        <ResponsiveContainer width={500} height={300}>
                           <PieChart>
                                <Pie data={consultasPorStatus} dataKey="value" nameKey="name" outerRadius={80} label>
                                    {consultasPorStatus.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>                            
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h2 className="text-lg font-bold">Consultas por Profissional</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <BarChart data={consultasPorProfissional} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>

                <Col>
                    <div className="h-80">
                        <h2 className="text-lg font-bold">Consultas por Paciente</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <BarChart data={consultasPorPaciente} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#ff7300" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h2 className="text-lg font-bold">Consultas por Faixa Horária</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <BarChart data={faixaHoraria()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#a4de6c" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h2 className="text-lg font-bold">Evolução de Consultas por Mês</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <LineChart data={consultasPorMes()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h2 className="text-lg font-bold">Taxa de Comparecimento</h2>
                        <ResponsiveContainer width={500} height={300}>
                            <PieChart>
                                <Pie
                                    data={taxaComparecimento()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value">
                                    {taxaComparecimento().map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
