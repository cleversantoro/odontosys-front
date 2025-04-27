import { Modal, Button } from "react-bootstrap";

export default function ToastConfirmacao({ show, onHide, onConfirm, mensagem }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensagem}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  );
}
