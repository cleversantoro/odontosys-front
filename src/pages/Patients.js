import { useEffect, useState } from "react";
import api from "../services/api";
//import Navbar from "../components/Navbar";
//import Table from "../components/Table";
//import Modal from "../components/Modal";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  //const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    api.get('/patients').then((res) => {setPatients(res.data);})
       .catch((error) => {console.error('Erro ao buscar pacientes:', error);});
  }, []);

  const columns = [
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Telefone" },
  ];

  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pacientes</h2>
        <button 
        // onClick={() => setIsOpen(true)} 
        className="bg-green-500 text-white px-3 py-2 rounded mb-4">Adicionar Paciente</button>
        {/* <Table data={patients} columns={columns} /> */}
      </div>

      {/* <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}> */}
        <h2 className="text-xl font-bold mb-4">Novo Paciente</h2>
        <input className="border p-2 w-full mb-3" type="text" placeholder="Nome" />
        <input className="border p-2 w-full mb-3" type="email" placeholder="E-mail" />
        <input className="border p-2 w-full mb-3" type="text" placeholder="Telefone" />
        <button className="bg-blue-500 px-3 py-2 text-white rounded">Salvar</button>
      {/* </Modal> */}
    </div>
  );
};

export default Patients;
