import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">COSB</h1>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Sair</button>
    </nav>
  );
};

export default Navbar;
