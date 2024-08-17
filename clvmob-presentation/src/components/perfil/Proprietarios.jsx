import React, { useState } from 'react';
import './Proprietarios.css';

const Proprietarios = () => {
  const [proprietarios, setProprietarios] = useState([
    { id: 1, nome: 'Ana Souza', contato: 'ana@gmail.com', imoveis: 3 },
    { id: 2, nome: 'Pedro Lima', contato: 'pedro@gmail.com', imoveis: 5 },
    { id: 3, nome: 'Carlos Mendes', contato: 'carlos@gmail.com', imoveis: 2 },
  ]);

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
    console.log('Ver Proprietário:', id);
    // adc a lógica ainda
  };

  const editarProprietario = (id) => {
    console.log('Editar Proprietário:', id);
    // adc a lógica ainda
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
              <button onClick={() => editarProprietario(proprietario.id)}>editar</button>
              <button onClick={() => excluirProprietario(proprietario.id)}>excluir</button>
              <button onClick={() => verProprietario(proprietario.id)}>ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-proprietario" onClick={adicionarProprietario}>
        Adicionar Proprietário +
      </button>
    </div>
  );
};

export default Proprietarios;
