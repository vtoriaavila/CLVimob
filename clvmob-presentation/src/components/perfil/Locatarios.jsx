import React, { useState } from 'react';
import './Locatarios.css';

const Locatarios = () => {
  const [locatarios, setLocatarios] = useState([
    { id: 1, nome: 'João da Silva', telefone: '(11) 99999-1234' },
    { id: 2, nome: 'Maria Oliveira', telefone: '(21) 98888-5678' },
    { id: 3, nome: 'Carlos Santos', telefone: '(31) 97777-9101' },
    { id: 4, nome: 'Ana Souza', telefone: '(41) 96666-1123' },
  ]);

  const adicionarLocatario = () => {
    const novoLocatario = { id: locatarios.length + 1, nome: 'Novo Locatário', telefone: '(00) 00000-0000' };
    setLocatarios([...locatarios, novoLocatario]);
  };

  const excluirLocatario = (id) => {
    setLocatarios(locatarios.filter(locatario => locatario.id !== id));
  };

  const verLocatario = (id) => {
    console.log('Ver Locatário:', id);
    // adc a lógica ainda
  };

  const editarLocatario = (id) => {
    console.log('Editar Locatário:', id);
    // adc a lógica ainda
  };

  return (
    <div className="locatarios-container">
      <h2>Locatários</h2>
      <div className="locatarios-list">
        {locatarios.map(locatario => (
          <div key={locatario.id} className="locatario-item">
            <span>{locatario.nome}</span>
            <span>{locatario.telefone}</span>
            <div className="locatario-actions">
              <button onClick={() => editarLocatario(locatario.id)}>editar</button>
              <button onClick={() => excluirLocatario(locatario.id)}>excluir</button>
              <button onClick={() => verLocatario(locatario.id)}>ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-locatario" onClick={adicionarLocatario}>
        Adicionar Locatário +
      </button>
    </div>
  );
};

export default Locatarios;
