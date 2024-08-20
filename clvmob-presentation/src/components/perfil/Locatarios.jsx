import React, { useState } from 'react';
import './Locatarios.css';

const Locatarios = () => {
  const [locatarios, setLocatarios] = useState([
    { id: 1, nome: 'João da Silva', telefone: '(11) 99999-1234', email: 'joao@email.com', estado: 'SP', cidade: 'São Paulo', endereco: 'Rua A, 123', data_nascimento: '1990-01-01' },
    { id: 2, nome: 'Maria Oliveira', telefone: '(21) 98888-5678', email: 'maria@email.com', estado: 'RJ', cidade: 'Rio de Janeiro', endereco: 'Av. B, 456', data_nascimento: '1985-05-12' },
    { id: 3, nome: 'Carlos Santos', telefone: '(31) 97777-9101', email: 'carlos@email.com', estado: 'MG', cidade: 'Belo Horizonte', endereco: 'Praça C, 789', data_nascimento: '1988-08-21' },
    { id: 4, nome: 'Ana Souza', telefone: '(41) 96666-1123', email: 'ana@email.com', estado: 'PR', cidade: 'Curitiba', endereco: 'Rua D, 1011', data_nascimento: '1992-02-10' },
  ]);

  const [novoLocatario, setNovoLocatario] = useState({
    nome: '',
    telefone: '',
    email: '',
    estado: '',
    cidade: '',
    endereco: '',
    data_nascimento: ''
  });

  const [locatarioSelecionado, setLocatarioSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoLocatario({ ...novoLocatario, [name]: value });
  };

  const adicionarLocatario = () => {
    const { nome, telefone, email, estado, cidade, endereco, data_nascimento } = novoLocatario;

    if (!nome || !telefone || !email || !estado || !cidade || !endereco || !data_nascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoLocatarioData = {
      id: locatarios.length + 1,
      nome,
      telefone,
      email,
      estado,
      cidade,
      endereco,
      data_nascimento,
    };

    setLocatarios([...locatarios, novoLocatarioData]);
    setNovoLocatario({
      nome: '',
      telefone: '',
      email: '',
      estado: '',
      cidade: '',
      endereco: '',
      data_nascimento: ''
    });
  };

  const excluirLocatario = (id) => {
    setLocatarios(locatarios.filter(locatario => locatario.id !== id));
  };

  const verLocatario = (id) => {
    const locatario = locatarios.find(locatario => locatario.id === id);
    setLocatarioSelecionado(locatario);
    setModalVisivel(true);
  };

  const editarLocatario = (id) => {
    console.log('Editar Locatário:', id);
    // Adicione a lógica para editar o locatário
  };

  return (
    <div className="locatarios-container">
      <h2>Locatários</h2>
      <div className="locatarios-list">
        {locatarios.map(locatario => (
          <div key={locatario.id} className="locatario-item">
            <span>{locatario.nome}</span>
            <span>{locatario.telefone}</span>
            <div className="locatario-actions">
              <button onClick={() => editarLocatario(locatario.id)}>Editar</button>
              <button onClick={() => excluirLocatario(locatario.id)}>Excluir</button>
              <button onClick={() => verLocatario(locatario.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <div className="novo-locatario-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoLocatario.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={novoLocatario.telefone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={novoLocatario.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={novoLocatario.estado}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={novoLocatario.cidade}
          onChange={handleChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novoLocatario.endereco}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="data_nascimento">Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            placeholder="Data de Nascimento"
            value={novoLocatario.data_nascimento}
            onChange={handleChange}
          />
        </div>
        <button className="add-locatario" onClick={adicionarLocatario}>
          Adicionar Locatário +
        </button>
      </div>

      {modalVisivel && (
        <Modal 
          locatario={locatarioSelecionado} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ locatario, onClose }) => {
  if (!locatario) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{locatario.nome}</h2>
        <p>Nome: {locatario.nome}</p>
        <p>Telefone: {locatario.telefone}</p>
        <p>Email: {locatario.email}</p>
        <p>Estado: {locatario.estado}</p>
        <p>Cidade: {locatario.cidade}</p>
        <p>Endereco: {locatario.endereco}</p>
        <p>Data Nascimento: {locatario.data_nascimento}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Locatarios;
