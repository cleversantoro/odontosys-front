import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      login(accessToken);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao fazer login!");
    }
  };


  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-12 mx-auto">
              <div className="auth-form-light text-left p-5">
                <h4>Bem-vindo!</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Usuário" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );


};

export default Login;




