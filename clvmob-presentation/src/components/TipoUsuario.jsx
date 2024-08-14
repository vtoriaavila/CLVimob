import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TipoUsuario.css';
import casa from './casa.jpg'; 
import logo_branco from './logo_branco.png';  

const TipoUsuario = () => {
  const navigate = useNavigate();

  const handleAdministradorClick = () => {
    navigate('/cadastro/administrador');
  };

  const handleProprietarioClick = () => {
    navigate('/cadastro/proprietario');
  };

  const handleLocatarioClick = () => {
    navigate('/cadastro/locatario');
  };

  return (
    <div className="tipoUsuarioContainer">
      <div className="leftPanel">
        <img src={logo_branco} alt="CLVimob Logo" className="logo" />
        <h1>Cadastro</h1>
        <p>Escolha o tipo de usuário</p>
        <button className="usuarioButton" onClick={handleAdministradorClick}>Administrador</button>
        <button className="usuarioButton" onClick={handleProprietarioClick}>Proprietário</button>
        <button className="usuarioButton" onClick={handleLocatarioClick}>Locatário</button>
      </div>
      <div className="rightPanel">
        <img src={casa} alt="Foto da casa" className="foto-casa" />
      </div>
    </div>
  );
}

export default TipoUsuario;
