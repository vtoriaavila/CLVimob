import React, { useState } from 'react';
import './Manutencao.css';

const Manutencao = () => {
  const [manutencoes, setManutencoes] = useState([
    { id: 1, descricao: 'Reparos no telhado', imovel: 'Casa na Rua X', data: '05/08/2024' },
    { id: 2, descricao: 'Pintura externa', imovel: 'Apartamento 101', data: '10/08/2024' },
    { id: 3, descricao: 'Revisão elétrica', imovel: 'Loja no Centro', data: '15/08/2024' },
  ]);

  const adicionarManutencao = () => {
    const novaManutencao = {
      id: manutencoes.length + 1,
      descricao: 'Nova Manutenção',
      imovel: 'Novo Imóvel',
      data: 'Data'
    };
    setManutencoes([...manutencoes, novaManutencao]);
  };

  const excluirManutencao = (id) => {
    setManutencoes(manutencoes.filter(manutencao => manutencao.id !== id));
  };

  const verManutencao = (id) => {
    console.log('Ver Manutenção:', id);
    // adc a lógica ainda
  };

  const editarManutencao = (id) => {
    console.log('Editar Manutenção:', id);
    // adc a lógica ainda
  };

  return (
    <div className="manutencao-container">
      <h2>Manutenção</h2>
      <div className="manutencao-list">
        {manutencoes.map(manutencao => (
          <div key={manutencao.id} className="manutencao-item">
            <span>{manutencao.descricao}</span>
            <span>{manutencao.imovel}</span>
            <span>{manutencao.data}</span>
            <div className="manutencao-actions">
              <button onClick={() => editarManutencao(manutencao.id)}>editar</button>
              <button onClick={() => excluirManutencao(manutencao.id)}>excluir</button>
              <button onClick={() => verManutencao(manutencao.id)}>ver</button>
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

export default Manutencao;
