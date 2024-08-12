import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import Login from './components/Login'; 
import Cadastro from "./components/Cadastro";
import TipoUsuario from './components/TipoUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tipo-usuario" element={<TipoUsuario/>} />
      </Routes>
    </Router>
  );
}

export default App;
