import React, { useState, useEffect } from 'react';
import './Proprietarios.css';
import { getAllUsersProp, editLocatario, deleteUser } from '../../services/user.service';


const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const Proprietarios = () => {
  const [proprietarios, setProprietarios] = useState([]);
  const [novoProprietario, setNovoProprietario] = useState({
    name: '',
    email: '',
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',
    documento: '',
    data_nascimento: ''
  });
  const [proprietarioSelecionado, setProprietarioSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [edicaoProprietario, setEdicaoProprietario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProprietarios = async () => {
      try {
        const response = await getAllUsersProp();
        setProprietarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar proprietários:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchProprietarios();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (edicaoProprietario) {
      setEdicaoProprietario({ ...edicaoProprietario, [name]: value });
    } else {
      setNovoProprietario({ ...novoProprietario, [name]: value });
    }
  };

  const adicionarProprietario = () => {
    const { name, email, estado, cidade, bairro, endereco, documento, data_nascimento } = novoProprietario;

    if (!name || !email || !estado || !cidade || !bairro || !endereco || !documento || !data_nascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoProprietarioData = {
      id: proprietarios.length + 1,
      name,
      email,
      estado,
      cidade,
      bairro,
      endereco,
      documento,
      data_nascimento,
    };

    setProprietarios([...proprietarios, novoProprietarioData]);
    setNovoProprietario({
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

  const excluirProprietario = async (id) => {
    try {
      await deleteUser(id);
      setProprietarios(proprietarios.filter(proprietario => proprietario._id !== id));
    } catch (error) {
      console.error('Erro ao excluir locatário:', error);
      alert('Erro ao excluir locatário. Verifique o console para mais detalhes.');
    }
  };

  const verProprietario = (id) => {
    const proprietario = proprietarios.find(proprietario => proprietario._id === id);
    setProprietarioSelecionado(proprietario);
    setModalVisivel(true);
  };

  const editarProprietario = (id) => {
    const proprietario = proprietarios.find(proprietario => proprietario._id === id);
    setEdicaoProprietario(proprietario);
    setShowForm(true);
  };

  const salvarEdicao = async () => {
    const { _id, name, email, estado, cidade, bairro, endereco, documento, data_nascimento } = edicaoProprietario;

    if (!name || !email || !estado || !cidade || !bairro || !endereco || !documento || !data_nascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const formattedData = {
        name,
        email,
        estado,
        cidade,
        bairro,
        endereco,
        documento,
        data_nascimento: formatDate(data_nascimento),
      };

      const response = await editLocatario(_id, formattedData);
      const proprietarioAtualizado = response.data;

      setProprietarios(proprietarios.map(item =>
        item._id === proprietarioAtualizado._id ? proprietarioAtualizado : item
      ));
      setEdicaoProprietario(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao atualizar proprietário:', error);
      alert('Erro ao atualizar proprietário. Verifique o console para mais detalhes.');
    }
  };

  const cancelarEdicao = () => {
    setEdicaoProprietario(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;


  return (
    <div className="proprietarios-container">
      <h2>Proprietários</h2>
      <div className="proprietarios-list">
        {proprietarios.map(proprietario => (
          <div key={proprietario._id} className="proprietario-item">
            <span>{proprietario.name}</span>
            <span>{proprietario.email}</span>
            <div className="proprietario-actions">
              <button onClick={() => editarProprietario(proprietario._id)}>Editar</button>
              <button onClick={() => excluirProprietario(proprietario._id)}>Excluir</button>
              <button onClick={() => verProprietario(proprietario._id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-proprietario" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Proprietário +'}
      </button>

      {showForm && (
        <div className="novo-proprietario-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={edicaoProprietario ? edicaoProprietario.name : novoProprietario.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={edicaoProprietario ? edicaoProprietario.email : novoProprietario.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={edicaoProprietario ? edicaoProprietario.estado : novoProprietario.estado}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={edicaoProprietario ? edicaoProprietario.cidade : novoProprietario.cidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={edicaoProprietario ? edicaoProprietario.bairro : novoProprietario.bairro}
            onChange={handleChange}
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={edicaoProprietario ? edicaoProprietario.endereco : novoProprietario.endereco}
            onChange={handleChange}
          />
          <input
            type="text"
            name="documento"
            placeholder="Documento"
            value={edicaoProprietario ? edicaoProprietario.documento : novoProprietario.documento}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={edicaoProprietario ? formatDate(edicaoProprietario.data_nascimento) : formatDate(novoProprietario.data_nascimento)}
              onChange={handleChange}
            />
          </div>
          {edicaoProprietario ? (
            <>
              <button className="save-proprietario" onClick={salvarEdicao}>
                Salvar
              </button>
              <button className="cancel-proprietario" onClick={cancelarEdicao}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="save-proprietario" onClick={adicionarProprietario}>
              Adicionar Proprietário
            </button>
          )}
        </div>
      )}

      {modalVisivel && (
        <Modal
          proprietario={proprietarioSelecionado}
          onClose={() => setModalVisivel(false)}
        />
      )}
    </div>
  );
};

const Modal = ({ proprietario, onClose }) => {
  if (!proprietario) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{proprietario.name}</h2>
        <p>Nome: {proprietario.name}</p>
        <p>Email: {proprietario.email}</p>
        <p>Estado: {proprietario.estado}</p>
        <p>Cidade: {proprietario.cidade}</p>
        <p>Bairro: {proprietario.bairro}</p>
        <p>Endereço: {proprietario.endereco}</p>
        <p>Documento: {proprietario.documento}</p>
        <p>Data de Nascimento: {formatDate(proprietario.data_nascimento)}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Proprietarios;
