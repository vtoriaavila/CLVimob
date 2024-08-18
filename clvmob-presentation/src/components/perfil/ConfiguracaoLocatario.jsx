import React, { useEffect, useState } from 'react';
import './ConfiguracaoLocatario.css';
import { userLogado, userEdit } from '../../services/user.service';
import Cookies from "js-cookie";

const ConfiguracaoLocatario = () => {
  const [configuracoes, setConfiguracoes] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '', // Adiciona confirmação de senha para validação
    notificacoesEmail: true,
    notificacoesSMS: false,
    atualizacoesAutomáticas: true,
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',
    documento: '',
    data_nascimento: '',
    role: '', // Supondo que o locatário pode alterar o papel
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [user, setUser] = useState({});
  const [originalConfig, setOriginalConfig] = useState({});

  useEffect(() => {
    if (Cookies.get("token")) {
      const fetchUser = async () => {
        try {
          const response = await userLogado();
          const userData = response.data;
          
          setUser(userData); // Assumindo que a resposta tem os dados do usuário em response.data
          setOriginalConfig({
            nome: userData.nome || '',
            email: userData.email || '',
            notificacoesEmail: userData.notificacoesEmail ?? true,
            notificacoesSMS: userData.notificacoesSMS ?? false,
            atualizacoesAutomáticas: userData.atualizacoesAutomáticas ?? true,
            estado: userData.estado || '',
            cidade: userData.cidade || '',
            bairro: userData.bairro || '',
            endereco: userData.endereco || '',
            documento: userData.documento || '',
            data_nascimento: userData.data_nascimento || '',
            role: userData.role || '', // Supondo que o locatário pode alterar o papel
          });
          setConfiguracoes(prevState => ({
            ...prevState,
            nome: userData.nome || '',
            email: userData.email || '',
            notificacoesEmail: userData.notificacoesEmail ?? true,
            notificacoesSMS: userData.notificacoesSMS ?? false,
            atualizacoesAutomáticas: userData.atualizacoesAutomáticas ?? true,
            estado: userData.estado || '',
            cidade: userData.cidade || '',
            bairro: userData.bairro || '',
            endereco: userData.endereco || '',
            documento: userData.documento || '',
            data_nascimento: userData.data_nascimento || '',
            role: userData.role || '', // Supondo que o locatário pode alterar o papel
          }));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracoes(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const salvarConfiguracoes = () => {
    // Verifica se a senha e a confirmação da senha correspondem
    if (configuracoes.senha !== "" && configuracoes.senha !== configuracoes.confirmacaoSenha) {
      alert('A confirmação da senha não corresponde à senha.');
      return;
    }

    // Prepara o objeto com apenas as configurações alteradas
    const changedConfig = Object.keys(configuracoes).reduce((acc, key) => {
      if (configuracoes[key] !== originalConfig[key] && key !== 'confirmacaoSenha') {
        acc[key] = configuracoes[key];
      }
      return acc;
    }, {});

    // Inclui a senha apenas se não estiver vazia
    if (configuracoes.senha !== '') {
      changedConfig.senha = configuracoes.senha;
    }

    console.log('Configurações alteradas:', changedConfig);

    userEdit(changedConfig)
      .then(response => {
        console.log('Usuário atualizado com sucesso:', response.data);
        setModoEdicao(false);
      })
      .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
      });
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
            placeholder="********"
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="confirmacaoSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={configuracoes.confirmacaoSenha}
            onChange={handleChange}
            placeholder="********"
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={configuracoes.estado}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={configuracoes.cidade}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={configuracoes.bairro}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={configuracoes.endereco}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="documento">Documento:</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={configuracoes.documento}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="data_nascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={configuracoes.data_nascimento}
            onChange={handleChange}
            disabled={!modoEdicao}
          />
        </div>
        <div className="configuracao-field">
          <label htmlFor="role">Papel:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={configuracoes.role}
            onChange={handleChange}
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
