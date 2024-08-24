import React, { useState, useEffect } from 'react';
import './Locatarios.css';
import { getAllUsersLoc, editLocatario } from '../../services/user.service';

const Locatarios = () => {
  const [locatarios, setLocatarios] = useState([]);
  const [novoLocatario, setNovoLocatario] = useState({
    name: '',
    email: '',
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',
    documento: '',
    data_nascimento: ''
  });
  const [locatarioSelecionado, setLocatarioSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [edicaoLocatario, setEdicaoLocatario] = useState(null);

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

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Retorna string vazia se o valor for nulo ou indefinido
    const date = new Date(dateString);
    // Extrai ano, mês e dia e formata para YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (edicaoLocatario) {
      setEdicaoLocatario({ ...edicaoLocatario, [name]: value });
    } else {
      setNovoLocatario({ ...novoLocatario, [name]: value });
    }
  };

  const adicionarLocatario = () => {
    const { name, email, estado, cidade, bairro, endereco, documento, data_nascimento } = novoLocatario;

    if (!name || !email || !estado || !cidade || !bairro || !endereco || !documento || !data_nascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoLocatarioData = {
      id: locatarios.length + 1,
      name,
      email,
      estado,
      cidade,
      bairro,
      endereco,
      documento,
      data_nascimento,
    };

    setLocatarios([...locatarios, novoLocatarioData]);
    setNovoLocatario({
      name: '',
      email: '',
      estado: '',
      cidade: '',
      bairro: '',
      endereco: '',
      documento: '',
      data_nascimento: ''
    });
    setShowForm(false);
  };

  const excluirLocatario = (id) => {
    setLocatarios(locatarios.filter(locatario => locatario._id !== id));
  };

  const verLocatario = (id) => {
    const locatario = locatarios.find(locatario => locatario._id === id);
    setLocatarioSelecionado(locatario);
    setModalVisivel(true);
  };

  const editarLocatario = (id) => {
    const locatario = locatarios.find(locatario => locatario._id === id);
    setEdicaoLocatario(locatario);
    setShowForm(true);
  };

  const salvarEdicao = async () => {
    const { _id, name, email, estado, cidade, bairro, endereco, documento, data_nascimento } = edicaoLocatario;

    if (!name || !email || !estado || !cidade || !bairro || !endereco || !documento || !data_nascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Verifica se data_nascimento está no formato correto
      const formattedData = {
        name,
        email,
        estado,
        cidade,
        bairro,
        endereco,
        documento,
        data_nascimento: formatDate(data_nascimento), // Garante que data_nascimento esteja no formato YYYY-MM-DD
      };
    
      const response = await editLocatario(_id, formattedData);
      const locatarioAtualizado = response.data;
    
      setLocatarios(locatarios.map(item =>
        item._id === locatarioAtualizado._id ? locatarioAtualizado : item
      ));
      setEdicaoLocatario(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao atualizar locatário:', error);
      alert('Erro ao atualizar locatário. Verifique o console para mais detalhes.');
    }
  };

  const cancelarEdicao = () => {
    setEdicaoLocatario(null);
    setShowForm(false);
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
              <button onClick={() => editarLocatario(locatario._id)}>Editar</button>
              <button onClick={() => excluirLocatario(locatario._id)}>Excluir</button>
              <button onClick={() => verLocatario(locatario._id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-locatario" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Locatário +'}
      </button>

      {showForm && (
        <div className="novo-locatario-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={edicaoLocatario ? edicaoLocatario.name : novoLocatario.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={edicaoLocatario ? edicaoLocatario.email : novoLocatario.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={edicaoLocatario ? edicaoLocatario.estado : novoLocatario.estado}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={edicaoLocatario ? edicaoLocatario.cidade : novoLocatario.cidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={edicaoLocatario ? edicaoLocatario.bairro : novoLocatario.bairro}
            onChange={handleChange}
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={edicaoLocatario ? edicaoLocatario.endereco : novoLocatario.endereco}
            onChange={handleChange}
          />
          <input
            type="text"
            name="documento"
            placeholder="Documento"
            value={edicaoLocatario ? edicaoLocatario.documento : novoLocatario.documento}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={edicaoLocatario ? formatDate(edicaoLocatario.data_nascimento) : formatDate(novoLocatario.data_nascimento)}
              onChange={handleChange}
            />
          </div>
          {edicaoLocatario ? (
            <>
              <button className="save-locatario" onClick={salvarEdicao}>
                Salvar
              </button>
              <button className="cancel-locatario" onClick={cancelarEdicao}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="save-locatario" onClick={adicionarLocatario}>
              Adicionar Locatário
            </button>
          )}
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
        <h2>{locatario.name}</h2>
        <p>Nome: {locatario.name}</p>
        <p>Email: {locatario.email}</p>
        <p>Estado: {locatario.estado}</p>
        <p>Cidade: {locatario.cidade}</p>
        <p>Bairro: {locatario.bairro}</p>
        <p>Endereço: {locatario.endereco}</p>
        <p>Documento: {locatario.documento}</p>
        <p>Data de Nascimento: {locatario.data_nascimento}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Locatarios;
