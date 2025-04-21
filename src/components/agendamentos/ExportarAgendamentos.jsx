
import React from "react";
import { Button } from "react-bootstrap";
import { utils, writeFile } from "xlsx";

export default function ExportarAgendamentos({ agendamentos }) {
  const exportarExcel = () => {
    const data = agendamentos.map(a => ({
      Paciente: a.paciente?.nome,
      Profissional: a.profissional?.nome,
      Data: new Date(a.data).toLocaleDateString(),
      Status: a.status,
      Observações: a.obs
    }));
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, "Agendamentos");
    writeFile(wb, "agendamentos.xlsx");
  };

  return (
    <Button variant="success" className="ms-2" onClick={exportarExcel}>
      Exportar Excel
    </Button>
  );
}
