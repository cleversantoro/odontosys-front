import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
//import { Button, Form, Card, Container } from "react-bootstrap";

import { Form, Button, Alert } from "react-bootstrap";
import "../Login/Login.css";

import BackgroundImage from "../../app/img/background.jpg";
import Logo from "../../app/img/dente.jpg";

const Login = () => {
  const {  login } = useContext(AuthContext);
  const [email, setInputUsername] = useState("");
  const [senha, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await delay(500);

    if (email !== "admin" || senha !== "admin") {
      try {
        const response = await api.post("/auth/login", { email, senha });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        login(accessToken, refreshToken);
        navigate("/dashboard");
      } catch (error) {
        //setError(error.response?.data?.error || "Erro ao fazer login!");
        setShow(true);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handlePassword = () => { };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="sign-in__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>

      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleLogin}>

        {/* Header */}
        <img className="img-thumbnail mx-auto d-block mb-2" src={Logo} alt="logo" />
        <div className="h4 mb-2 text-center">OdontoSys</div>

        {/* ALert */}
        {show
          ? (<Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible> email ou senha incorretos.</Alert>)
          : (<div />)
        }
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" value={email} placeholder="E-mail" onChange={(e) => setInputUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={senha} placeholder="Senha" onChange={(e) => setInputPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Lembrar me" />
        </Form.Group>

        {!loading
          ? (<Button className="w-100" variant="primary" type="submit">Entrar</Button>)
          : (<Button className="w-100" variant="primary" type="submit" disabled> Entrando ... </Button>)
        }
        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link" onClick={handlePassword}>
            Esqueceu a senha?
          </Button>
        </div>
      </Form>

      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        OdontoSys | &copy;2025
      </div>
    </div>
  );
};

export default Login;




