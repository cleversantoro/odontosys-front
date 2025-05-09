import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from '@fullcalendar/core/locales/pt-br';

// import { List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core";
import { Col, Container, Row } from "react-bootstrap";
import api from '../../services/api';

import { Modal, Form, Button } from 'react-bootstrap';



const Calendar = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    // const [currentEvents, setCurrentEvents] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [filtroPaciente, setFiltroPaciente] = useState('');
    const [filtroProfissional, setFiltroProfissional] = useState('');
    const [consultasOriginais, setConsultasOriginais] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        pacienteId: '',
        profissionalId: '',
        data: '',
        hora: '',
        status: 'Agendado',
        obs: ''
    });


    useEffect(() => {
        carregarConsultas();
    },);

    const carregarConsultas = async () => {
        try {
            const res = await api.get('/consultas/vwcompleta');
            const eventosConvertidos = res.data.map((c) => ({
                id: c.id,
                title: `${c.nome_paciente} - ${c.nome_profissional}`,
                start: new Date(c.data_agendamento),
                end: new Date(new Date(c.data_agendamento).getTime() + 30 * 60000),
                allDay: false,
                backgroundColor: c.situacao === 'Cancelado' ? '#dc3545' :
                    c.situacao === 'Concluído' ? '#198754' :
                        c.situacao === 'Confirmado' ? '#ffc107' : '#0d6efd'
            }));
            setEventos(eventosConvertidos);
            setConsultasOriginais(res.data);
            setEventos(filtrarConsultas(res.data, filtroPaciente, filtroProfissional));
        } catch (error) {
            console.error('Erro ao carregar consultas:', error);
        }
    };

    const filtrarConsultas = (lista, pacienteFiltro, profissionalFiltro) => {
        return lista
            .filter((c) =>
                (!pacienteFiltro || c.nome_paciente.toLowerCase().includes(pacienteFiltro.toLowerCase())) &&
                (!profissionalFiltro || c.nome_profissional.toLowerCase().includes(profissionalFiltro.toLowerCase()))
            )
            .map((c) => ({
                id: c.id,
                title: `${c.nome_paciente} - ${c.nome_profissional}`,
                start: new Date(c.data_agendamento),
                end: new Date(new Date(c.data_agendamento).getTime() + 30 * 60000),
                allDay: false,
                backgroundColor:
                    c.situacao === 'Cancelado' ? '#dc3545' :
                        c.situacao === 'Concluído' ? '#198754' :
                            c.situacao === 'Confirmado' ? '#ffc107' : '#0d6efd'
            }));
    };

    const handleDateClick = (selected) => {
        setFormData({
            title: '',
            data: selected.startStr,
            hora: '09:00'
        });
        setShowModal(true);
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Você deseja apagar o evento? '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    const handleSaveConsulta = async () => {
        const dataCompleta = `${formData.data}T${formData.hora}:00.000Z`;
        const payload = {
            pacienteId: Number(formData.pacienteId),
            profissionalId: Number(formData.profissionalId),
            data: dataCompleta,
            status: formData.status,
            obs: formData.obs
        };

        try {
            await api.post('/agendamentos', payload);
            await carregarConsultas(); // atualiza eventos
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar consulta:', error);
            alert('Erro ao salvar consulta');
        }
    };

    return (
        <Container>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Filtrar por paciente"
                        value={filtroPaciente}
                        onChange={(e) => {
                            const valor = e.target.value;
                            setFiltroPaciente(valor);
                            setEventos(filtrarConsultas(consultasOriginais, valor, filtroProfissional));
                        }}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Filtrar por profissional"
                        value={filtroProfissional}
                        onChange={(e) => {
                            const valor = e.target.value;
                            setFiltroProfissional(valor);
                            setEventos(filtrarConsultas(consultasOriginais, filtroPaciente, valor));
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={10}>
                    <FullCalendar
                        height="75vh"
                        locale={esLocale}
                        firstDay={7}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next,today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        // eventsSet={(events) => setCurrentEvents(events)}
                        events={eventos}
                    />
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>Nova Consulta</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Paciente ID</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.pacienteId}
                                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Profissional ID</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.profissionalId}
                                onChange={(e) => setFormData({ ...formData, profissionalId: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                value={formData.hora}
                                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Observações</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.obs}
                                onChange={(e) => setFormData({ ...formData, obs: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSaveConsulta}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Calendar;
/* <Col md={2}>
    <Typography variant="h5">Eventos</Typography>
    <List>
        {currentEvents.map((event) => (
            <ListItem key={event.id}
                sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                }}>
                <ListItemText
                    primary={event.title}
                    secondary={
                        <Typography>
                            {formatDate(event.start, { day: "numeric", month: "short", year: "numeric" })}
                        </Typography>
                    } />
            </ListItem>
        ))}
    </List>
</Col> */