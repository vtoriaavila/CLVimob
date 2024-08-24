import React, { useState, useEffect } from 'react';
import './ManutencaoProprietario.css';
import { getManutencao } from '../../services/manutencao.service';

const ManutencaoProprietario = () => {
  const [manutencao, setManutencao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);

  useEffect(() => {
    const fetchManutencao = async () => {
      try {
        const response = await getManutencao();
        const data = response.data; // Supondo que a resposta correta já está formatada
        setManutencao(data);
      } catch (err) {
        console.error('Erro ao buscar manutenções:', err);
        setError('Erro ao carregar manutenções');
      } finally {
        setLoading(false);
      }
    };

    fetchManutencao();
  }, []);

  const excluirManutencao = (id) => {
    setManutencao(manutencao.filter(item => item._id !== id));
  };

  const verManutencao = (id) => {
    const manutencaoItem = manutencao.find(item => item._id === id);
    setManutencaoSelecionada(manutencaoItem);
    setModalVisivel(true);
  };

  const editarManutencao = (id) => {
    console.log('Editar Manutenção:', id);
    // Adicione a lógica para editar a manutenção
  };

  const handleStatusChange = (id, e) => {
    const newStatus = e.target.value;
    editarManutencao(id, newStatus);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manutencao-proprietario-container">
      <h2>Manutenções</h2>
      <div className="manutencao-proprietario-list">
        {manutencao.map(item => (
          <div key={item._id} className="manutencao-item">
            <span>{item.tipo_manutencao}</span>
            <span>{new Date(item.data_solicitacao).toLocaleDateString('pt-BR')}</span>
            <select 
              value={item.status} 
              onChange={(e) => handleStatusChange(item._id, e)}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
            <div className="manutencao-actions">
              <button onClick={() => editarManutencao(item._id)}>Editar</button>
              <button onClick={() => excluirManutencao(item._id)}>Excluir</button>
              <button onClick={() => verManutencao(item._id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      {modalVisivel && (
        <Modal 
          manutencao={manutencaoSelecionada} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ manutencao, onClose }) => {
  if (!manutencao) return null;

  // Extraia o objeto `imob` se estiver presente
  const imob = manutencao.imob || {};

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes da Manutenção</h2>
        <p><strong>Imóvel:</strong></p>
        <p><strong>Tipo:</strong> {imob.tipo}</p> 
        {/* <p><strong>CEP:</strong> {imob.cep}</p>
        <p><strong>Endereço:</strong> {imob.endereco}</p>
        <p><strong>Cidade:</strong> {imob.cidade}</p>
        <p><strong>Estado:</strong> {imob.estado}</p>
        <p><strong>Proprietário:</strong> {imob.proprietario}</p>
        <p><strong>Quartos:</strong> {imob.quartos}</p>
        <p><strong>Banheiros:</strong> {imob.banheiro}</p>
        <p><strong>Tamanho:</strong> {imob.tamanho}</p>
        <p><strong>Aluguel:</strong> {imob.aluguel}</p> */}
        <p><strong>Tipo de Manutenção:</strong> {manutencao.tipo_manutencao}</p>
        <p><strong>Descrição:</strong> {manutencao.desc_total}</p>
        <p><strong>Data de Solicitação:</strong> {new Date(manutencao.data_solicitacao).toLocaleDateString('pt-BR')}</p>
        <p><strong>Status:</strong> {manutencao.status}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ManutencaoProprietario;
