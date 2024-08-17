import React, { useState } from 'react';
import './ManutencaoProprietario.css';

const ManutencaoProprietario = () => {
  const [manutencao, setManutencao] = useState([
    { id: 1, descricao: 'Troca de Filtro de Ar', data: '01/06/2024', status: 'Concluído' },
    { id: 2, descricao: 'Pintura do Apartamento', data: '15/06/2024', status: 'Em Andamento' },
    { id: 3, descricao: 'Reparo no Encanamento', data: '20/06/2024', status: 'Pendente' },
  ]);

  const adicionarManutencao = () => {
    const novaManutencao = { id: manutencao.length + 1, descricao: 'Nova Manutenção', data: 'Data', status: 'Pendente' };
    setManutencao([...manutencao, novaManutencao]);
  };

  const excluirManutencao = (id) => {
    setManutencao(manutencao.filter(item => item.id !== id));
  };

  const verManutencao = (id) => {
    console.log('Ver Manutenção:', id);
    // Adicione a lógica para visualizar a manutenção
  };

  const editarManutencao = (id) => {
    console.log('Editar Manutenção:', id);
    // Adicione a lógica para editar a manutenção
  };

  return (
    <div className="manutencao-proprietario-container">
      <h2>Manutenções</h2>
      <div className="manutencao-proprietario-list">
        {manutencao.map(item => (
          <div key={item.id} className="manutencao-item">
            <span>{item.descricao}</span>
            <span>{item.data}</span>
            <span>{item.status}</span>
            <div className="manutencao-actions">
              <button onClick={() => editarManutencao(item.id)}>Editar</button>
              <button onClick={() => excluirManutencao(item.id)}>Excluir</button>
              <button onClick={() => verManutencao(item.id)}>Ver</button>
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
