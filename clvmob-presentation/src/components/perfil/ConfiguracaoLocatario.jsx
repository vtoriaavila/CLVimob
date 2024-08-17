import React, { useState } from 'react';
import './ConfiguracaoLocatario.css';

const ConfiguracaoLocatario = () => {
  const [configuracoes, setConfiguracoes] = useState({
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    senha: '',
    notificacoesEmail: true,
    notificacoesSMS: false,
    atualizacoesAutomáticas: true,
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracoes(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const salvarConfiguracoes = () => {
    console.log('Configurações salvas:', configuracoes);
    // Adicione a lógica para salvar as configurações
    setModoEdicao(false);
  };

  return (
    <div className="configuracao-locatario-container">
      <h2>Configurações</h2>
      <div className="configuracao-form">
        <div className="configuracao-field">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={configuracoes.nome}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={configuracoes.email}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={configuracoes.senha}
            onChange={handleChange}
            placeholder="12345"
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="notificacoesEmail">Notificações por Email:</label>
          <input
            type="checkbox"
            id="notificacoesEmail"
            name="notificacoesEmail"
            checked={configuracoes.notificacoesEmail}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="notificacoesSMS">Notificações por SMS:</label>
          <input
            type="checkbox"
            id="notificacoesSMS"
            name="notificacoesSMS"
            checked={configuracoes.notificacoesSMS}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="atualizacoesAutomáticas">Atualizações Automáticas:</label>
          <input
            type="checkbox"
            id="atualizacoesAutomáticas"
            name="atualizacoesAutomáticas"
            checked={configuracoes.atualizacoesAutomáticas}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-actions">
          {modoEdicao ? (
            <>
              <button className="salvar-configuracoes" onClick={salvarConfiguracoes}>
                Salvar Configurações
              </button>
              <button className="cancelar-edicao" onClick={() => setModoEdicao(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="editar-configuracoes" onClick={() => setModoEdicao(true)}>
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoLocatario;
