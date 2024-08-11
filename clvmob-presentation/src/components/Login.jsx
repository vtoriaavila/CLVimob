import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_branco from './logo_branco.png';
import casa from './casa.jpg';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    //ainda precisa validar com api
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('E-mail:', email);
    console.log('Senha:', password);
  };

  const navigate = useNavigate();

  const handleCadastroClick = () => {
        navigate('/cadastro');
  };

  return (
    <div className='container'>
      <div className='bloco-azul'>
        <img src={logo_branco} alt="logo-branco" className='logo' />
        <h1 className='entrar'>Entrar</h1>
        <p className='paragrafo'>Insira suas credenciais abaixo</p>
        <form onSubmit={handleSubmit} className='login-form'>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <a href="/esqueceu-senha">ESQUECEU A SENHA?</a>
            <a href="/cadastro"  onClick={handleCadastroClick}>Não possui conta? Cadastre-se aqui!</a>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <img src={casa} alt="foto-casa" className='foto-casa' />
    </div>
  );
}

export default Login;
