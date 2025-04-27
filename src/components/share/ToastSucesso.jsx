import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastSucesso({ show, mensagem, onClose }) {
    return (
        <ToastContainer position={"top-end"} className="p-3" >
            <Toast bg="success" onClose={onClose} show={show} delay={3000} autohide >
                <Toast.Header>
                    <strong className="me-auto" > Sucesso </strong>
                </Toast.Header>
                <Toast.Body className="text-white" >{mensagem}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
