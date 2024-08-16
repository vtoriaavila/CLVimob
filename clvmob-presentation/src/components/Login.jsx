import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_branco from './logo_branco.png';
import casa from './casa.jpg';
import { login } from "../services/user.service.js";
import Cookies from "js-cookie"
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    //ainda precisa validar com api
    async function handleSubmit(e) {
      e.preventDefault(); // Prevenir comportamento padrão do formulário
  
      const loginData = {
        email: email,
        password: password
      };
  
      try {
        const response = await login(loginData); // Envia os dados corretos
        const { token, userProfileType } = response.data;
        console.log(userProfileType)
  
        // Salva o token no cookie
        Cookies.set("token", token, { expires: 1 });
  
        // Redireciona de acordo com o tipo de perfil
        switch (userProfileType) {
          case 'administrador':
            navigate('/perfil/administrador/dashboard');
            break;
          case 'proprietario':
            navigate('/perfil/proprietario');
            break;
          case 'locatario':
            navigate('/perfil/locatario');
            break;
          default:
            console.log('Tipo de perfil desconhecido');
            break;
        }
      } catch (error) {
        console.log(error);
        // Aqui você pode adicionar lógica adicional, como mostrar uma mensagem de erro ao usuário
      }
    }
    

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
