import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from '@fullcalendar/core/locales/pt-br';

import { List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";
import { Col, Container, Row } from "react-bootstrap";

const Calendarbkp = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Insira um título para este evento.");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
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

    return (
        <Container>
            <Row>
                <Col md={2}>

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
                                                {formatDate(event.start, { day: "numeric", month: "short", year: "numeric", })}
                                            </Typography>
                                        } />
                                </ListItem>
                            ))}
                        </List>
                </Col>
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
                                left: "prev,next today",
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
                            eventsSet={(events) => setCurrentEvents(events)}
                            initialEvents={[
                                {
                                    id: "12315",
                                    title: "All-day event",
                                    date: "2022-09-14",
                                },
                                {
                                    id: "5123",
                                    title: "Timed event",
                                    date: "2022-09-28",
                                },
                            ]}
                        />

                </Col>
            </Row>
        </Container>

    );
};

export default Calendarbkp;
