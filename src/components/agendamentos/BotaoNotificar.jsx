
import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function BotaoNotificar({ agendamento }) {
  const notificar = async () => {
    try {
      await axios.post("http://localhost:5000/api/agendamentos/" + agendamento.id + "/notificar");
      alert("Notificação enviada com sucesso!");
    } catch (err) {
      alert("Erro ao enviar notificação.");
    }
  };

  return (
    <Button size="sm" variant="info" onClick={notificar}>Notificar</Button>
  );
}
