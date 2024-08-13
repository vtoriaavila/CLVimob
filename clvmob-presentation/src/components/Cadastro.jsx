import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_branco from './logo_branco.png';
import casa from './casa.jpg'; 
import './Cadastro.css'; 


const Cadastro = () => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleTipoUsuarioClick = () => {
      navigate('/tipo-usuario');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nome Completo:', nomeCompleto);
        console.log('E-mail:', email);
        console.log('Senha:', password);

        if (senha !== confirmaSenha) {
            setError('As senhas não coincidem! tente novamente.');
            return;
          }
      };
    
  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <img src={logo_branco} alt="CLVimob Logo" className="logo" />
        <h1>Cadastro</h1>
        <p>Insira suas informações abaixo</p>
        <form form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="nome-completo">Nome completo:</label>
          <input
            type="text"
            id="nome-completo"
            placeholder="Seu nome completo"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <label htmlFor="confirma-senha">Confirma Senha:</label>
          <input
            type="password"
            id="confirma-senha"
            placeholder="Confirme sua senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
          />
          <button type="submit" onClick={handleTipoUsuarioClick}>PRÓXIMO</button>
        </form>
      </div>
      <img src={casa} alt="Foto da casa" className="foto-casa" />
    </div>
  );
}

export default Cadastro;
