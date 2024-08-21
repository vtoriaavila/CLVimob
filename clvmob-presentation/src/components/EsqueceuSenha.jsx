import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EsqueceuSenha.css';
import logo_branco from './logo_branco.png';
import casa from './casa.jpg';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await recuperarSenha(email);
      setMessage('Verifique seu e-mail para as instruções de redefinição de senha.');
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      console.log(error);
      setMessage('Ocorreu um erro. Tente novamente.');
    }
  };

  const recuperarSenha = async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com") {
          resolve("Email enviado com sucesso!");
        } else {
          reject("Email não encontrado!");
        }
      }, 2000);
    });
  };

  return (
    <div className='container'>
        <div className='bloco-azul'>
        <img src={logo_branco} alt="logo-branco" className='logo' />
            <div className='recuperar-form '>
              <h2>Recuperar Senha</h2>
              <p>Digite seu Email para recuperar sua senha!</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Enviar</button>
              </form>
              {message && <p>{message}</p>}
            </div>
        </div>
        <img src={casa} alt="foto-casa" className='foto-casa' />
    </div>
  );
};

export default EsqueceuSenha;
