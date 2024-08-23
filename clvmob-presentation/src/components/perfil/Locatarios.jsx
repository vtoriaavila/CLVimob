import React, { useState, useEffect } from 'react';
import './Locatarios.css';
import { getAllUsersLoc } from '../../services/user.service';

const Locatarios = () => {
  const [locatarios, setLocatarios] = useState([]);
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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchLocatarios = async () => {
      try {
        const response = await getAllUsersLoc();
        console.log(response);
        setLocatarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar locatários:', error);
      }
    };

    fetchLocatarios();
  }, []);

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
    setShowForm(false); // Fechar o formulário após adicionar o locatário
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

  const cancelarAdicao = () => {
    setShowForm(false);
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

  return (
    <div className="locatarios-container">
      <h2>Locatários</h2>
      <div className="locatarios-list">
        {locatarios.map(locatario => (
          <div key={locatario._id} className="locatario-item">
            <span>{locatario.name}</span>
            <span>{locatario.email}</span>
            <div className="locatario-actions">
              <button onClick={() => editarLocatario(locatario.id)}>Editar</button>
              <button onClick={() => excluirLocatario(locatario.id)}>Excluir</button>
              <button onClick={() => verLocatario(locatario.id)}>Ver</button>
            </div>
          </div>
        ))
       }
      </div>

      <button className="add-locatario" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Locatário +'}
      </button>

      {showForm && (
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
          <button className="save-locatario" onClick={adicionarLocatario}>
            Adicionar Locatário
          </button>
        </div>
      )}

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
        <p>Endereço: {locatario.endereco}</p>
        <p>Data de Nascimento: {locatario.data_nascimento}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Locatarios;
