import React, { useState } from 'react';
import './ImoveisProprietario.css';

const ImoveisProprietario = () => {
  const [imoveis, setImoveis] = useState([
    { id: 1, nome: 'Apartamento 101', endereco: 'Rua A, 123' },
    { id: 2, nome: 'Casa na Rua X', endereco: 'Av. B, 456' },
    { id: 3, nome: 'Loja no Centro', endereco: 'Centro, 789' },
    { id: 4, nome: 'Loja no Centro', endereco: 'Rua C, 1011' },
  ]);

  const adicionarImovel = () => {
    const novoImovel = { id: imoveis.length + 1, nome: 'Novo Imóvel', endereco: 'Endereço' };
    setImoveis([...imoveis, novoImovel]);
  };

  const excluirImovel = (id) => {
    setImoveis(imoveis.filter(imovel => imovel.id !== id));
  };

  const verImovel = (id) => {
    console.log('Ver Imóvel:', id);
    // Adicione a lógica para visualizar o imóvel
  };

  const editarImovel = (id) => {
    console.log('Editar Imóvel:', id);
    // Adicione a lógica para editar o imóvel
  };

  return (
    <div className="imoveis-proprietario-container">
      <h2>Meus Imóveis</h2>
      <div className="imoveis-proprietario-list">
        {imoveis.map(imovel => (
          <div key={imovel.id} className="imovel-item">
            <span>{imovel.nome}</span>
            <span>{imovel.endereco}</span>
            <div className="imovel-actions">
              <button onClick={() => editarImovel(imovel.id)}>Editar</button>
              <button onClick={() => excluirImovel(imovel.id)}>Excluir</button>
              <button onClick={() => verImovel(imovel.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-imovel" onClick={adicionarImovel}>
        Adicionar Imóvel +
      </button>
    </div>
  );
};

export default ImoveisProprietario;
