import React, { useState, useEffect } from 'react';
import './ManutencaoProprietario.css';
import { getManutencao } from '../../services/manutencao.service';

const ManutencaoProprietario = () => {
  const [manutencao, setManutencao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const adicionarManutencao = () => {
    const novaManutencao = { id: manutencao.length + 1, descricao: 'Nova Manutenção', data: 'Data', status: 'Pendente' };
    setManutencao([...manutencao, novaManutencao]);
  };

  const excluirManutencao = (id) => {
    setManutencao(manutencao.filter(item => item._id !== id));
  };

  const verManutencao = (id) => {
    console.log('Ver Manutenção:', id);
    // Adicione a lógica para visualizar a manutenção
  };

  const editarManutencao = (id) => {
    console.log('Editar Manutenção:', id);
    // Adicione a lógica para editar a manutenção
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manutencao-proprietario-container">
      <h2>Manutenções</h2>
      <div className="manutencao-proprietario-list">
        {manutencao.map(item => (
          <div key={item._id} className="manutencao-item">
            <span>{item.tipo_manutencao}</span>
            <span>{new Date(item.data_solicitacao).toLocaleDateString('pt-BR')}</span>
            <span>{item.status}</span>
            <div className="manutencao-actions">
              <button onClick={() => editarManutencao(item._id)}>Editar</button>
              <button onClick={() => excluirManutencao(item._id)}>Excluir</button>
              <button onClick={() => verManutencao(item._id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-manutencao" onClick={adicionarManutencao}>
        Adicionar Manutenção +
      </button>
    </div>
  );
};

export default ManutencaoProprietario;
