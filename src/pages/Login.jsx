import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Container } from "react-bootstrap";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, senha });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      login(accessToken, refreshToken);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao fazer login!");
    }
  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">
      {/* <a href="/" className="spur-logo"><i className="fas fa-bolt"></i> <span>OdontoSys</span></a> */}
      <Card className="p-4" style={{ minWidth: 300 }}>
        <h4 className="mb-3">Login</h4>
        <Form>
          <Form.Group className="mb-3" onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" value={senha} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>Entrar</Button>
        </Form>
      </Card>
    </Container>

  );


};

export default Login;




