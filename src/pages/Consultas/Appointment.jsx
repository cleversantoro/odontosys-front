// src/pages/Consulta.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ContentHeader from '../../components/ContentHeader';


//import Table from '../components/Table';
//import Modal from '../components/Modal';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const response = await api.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
        }
    };

    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShow(true);
    };

    const columns = [
        { key: "appointment[0].patient.name", label: "Paciente" },
        { key: "professional.name", label: "Profissional" },
        { key: "date", label: "Data" },
        { key: "status", label: "Status" },
        { key: "notes", label: "Notas" },
    ];

    return (
        <>
            <ContentHeader title="Consultas" />

            <Button variant="primary" onClick={handleRowClick}>
                Adicionar Consulta
            </Button>


            <div className="p-6">
                {/* <Table
                    data={appointments}
                    columns={columns}
                    onRowClick={handleRowClick}
                />  */}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Consulta</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {selectedAppointment && (
                        <div className="p-4">
                            <div className="space-y-2">
                                <p><strong>Paciente:</strong> {selectedAppointment.patient?.name}</p>
                                <p><strong>Profissional:</strong> {selectedAppointment.professional?.name}</p>
                                <p><strong>Data:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {selectedAppointment.status}</p>
                                <p><strong>Notas:</strong> {selectedAppointment.notes}</p>
                                {selectedAppointment.patient && (
                                    <div className="mt-4">
                                        <h3 className="font-bold mb-2">Informações do Paciente</h3>
                                        <p><strong>Email:</strong> {selectedAppointment.patient.email}</p>
                                        <p><strong>Telefone:</strong> {selectedAppointment.patient.phone}</p>
                                        <p><strong>CPF:</strong> {selectedAppointment.patient.cpf}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Appointment;