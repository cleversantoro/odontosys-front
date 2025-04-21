
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarioAgendamentos({ apiUrl }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const eventosConvertidos = data.map(item => ({
          id: item.id,
          title: `${item.paciente?.nome || "Paciente"} - ${item.status}`,
          start: new Date(item.data),
          end: new Date(item.data),
        }));
        setEventos(eventosConvertidos);
      });
  }, [apiUrl]);

  return (
    <div className="mt-4">
      <h4>Agenda Visual</h4>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
