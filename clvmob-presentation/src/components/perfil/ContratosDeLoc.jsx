import React, { useState } from 'react';
import './ContratosDeLoc.css';

const ContratosDeLoc = () => {
  const [contratos, setContratos] = useState([
    { id: 1, locatario: 'João da Silva', imovel: 'Apartamento 101', dataInicio: '01/01/2024', dataFim: '01/01/2025' },
    { id: 2, locatario: 'Maria Oliveira', imovel: 'Casa na Rua X', dataInicio: '15/02/2024', dataFim: '15/02/2025' },
    { id: 3, locatario: 'Carlos Santos', imovel: 'Loja no Centro', dataInicio: '10/03/2024', dataFim: '10/03/2025' },
  ]);

  const adicionarContrato = () => {
    const novoContrato = {
      id: contratos.length + 1,
      locatario: 'Novo Locatário',
      imovel: 'Novo Imóvel',
      dataInicio: 'Data Início',
      dataFim: 'Data Fim',
    };
    setContratos([...contratos, novoContrato]);
  };

  const excluirContrato = (id) => {
    setContratos(contratos.filter(contrato => contrato.id !== id));
  };

  const verContrato = (id) => {
    console.log('Ver Contrato:', id);
    // adc a lógica ainda
  };

  const editarContrato = (id) => {
    console.log('Editar Contrato:', id);
    // adc a lógica ainda
  };

  return (
    <div className="contratos-container">
      <h2>Contratos de Locação</h2>
      <div className="contratos-list">
        {contratos.map(contrato => (
          <div key={contrato.id} className="contrato-item">
            <span>{contrato.locatario}</span>
            <span>{contrato.imovel}</span>
            <span>{contrato.dataInicio} - {contrato.dataFim}</span>
            <div className="contrato-actions">
              <button onClick={() => editarContrato(contrato.id)}>editar</button>
              <button onClick={() => excluirContrato(contrato.id)}>excluir</button>
              <button onClick={() => verContrato(contrato.id)}>ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-contrato" onClick={adicionarContrato}>
        Adicionar Contrato +
      </button>
    </div>
  );
};

export default ContratosDeLoc;
