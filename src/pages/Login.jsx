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
      login(accessToken, refreshToken);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao fazer login!");
    }
  };


  return (
  
    <div className="form-screen">
      <a href="/" className="spur-logo"><i className="fas fa-bolt"></i> <span>OdontoSys</span></a>
      <div className="card account-dialog">
        <div className="card-header bg-primary text-white"> Logar  </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Usuário" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Lembrar-me</label>
              </div>
            </div>
            <div className="account-dialog-actions">
              <button type="submit" className="btn btn-primary">Entrar</button>
              <a className="account-dialog-link" href="/">Criar conta</a>
            </div>
          </form>
        </div>
      </div>
    </div>


  );


};

export default Login;




