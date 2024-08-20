import React, { useState } from 'react';
import './Proprietarios.css';

const Proprietarios = () => {
  const [proprietarios, setProprietarios] = useState([
    { id: 1, nome: 'Ana Souza', contato: 'ana@gmail.com', imoveis: 3 },
    { id: 2, nome: 'Pedro Lima', contato: 'pedro@gmail.com', imoveis: 5 },
    { id: 3, nome: 'Carlos Mendes', contato: 'carlos@gmail.com', imoveis: 2 },
  ]);

  const [proprietarioSelecionado, setProprietarioSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const adicionarProprietario = () => {
    const novoProprietario = {
      id: proprietarios.length + 1,
      nome: 'Novo Proprietário',
      contato: 'contato@example.com',
      imoveis: 0,
    };
    setProprietarios([...proprietarios, novoProprietario]);
  };

  const excluirProprietario = (id) => {
    setProprietarios(proprietarios.filter(proprietario => proprietario.id !== id));
  };

  const verProprietario = (id) => {
    const proprietario = proprietarios.find(proprietario => proprietario.id === id);
    setProprietarioSelecionado(proprietario);
    setModalVisivel(true);
  };

  const editarProprietario = (id) => {
    console.log('Editar Proprietário:', id);
    // Adicione a lógica para editar o proprietário
  };

  return (
    <div className="proprietarios-container">
      <h2>Proprietários</h2>
      <div className="proprietarios-list">
        {proprietarios.map(proprietario => (
          <div key={proprietario.id} className="proprietario-item">
            <span>{proprietario.nome}</span>
            <span>{proprietario.contato}</span>
            <span>{proprietario.imoveis} Imóveis</span>
            <div className="proprietario-actions">
              <button onClick={() => editarProprietario(proprietario.id)}>Editar</button>
              <button onClick={() => excluirProprietario(proprietario.id)}>Excluir</button>
              <button onClick={() => verProprietario(proprietario.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-proprietario" onClick={adicionarProprietario}>
        Adicionar Proprietário +
      </button>

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
        <h2>{proprietario.nome}</h2>
        <p>Nome: {proprietario.nome}</p>
        <p>Contato: {proprietario.contato}</p>
        <p>Imóveis: {proprietario.imoveis}</p>
        <p>Email: {proprietario.email}</p>
        <p>Estado: {proprietario.estado}</p>
        <p>Cidade: {proprietario.cidade}</p>
        <p>Endereco: {proprietario.endereco}</p>
        <p>Data Nascimento: {proprietario.data_nascimento}</p>  
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Proprietarios;
