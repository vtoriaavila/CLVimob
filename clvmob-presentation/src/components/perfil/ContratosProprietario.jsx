import React, { useState } from 'react';
import './ContratosProprietario.css';

const ContratosProprietario = () => {
  const [contratos, setContratos] = useState([
    { id: 1, titulo: 'Contrato de Locação 1', dataInicio: '01/01/2023', dataFim: '31/12/2023' },
    { id: 2, titulo: 'Contrato de Locação 2', dataInicio: '01/02/2023', dataFim: '31/01/2024' },
    { id: 3, titulo: 'Contrato de Locação 3', dataInicio: '01/03/2023', dataFim: '31/12/2023' },
  ]);

  const adicionarContrato = () => {
    const novoContrato = { id: contratos.length + 1, titulo: 'Novo Contrato', dataInicio: 'Data Início', dataFim: 'Data Fim' };
    setContratos([...contratos, novoContrato]);
  };

  const excluirContrato = (id) => {
    setContratos(contratos.filter(contrato => contrato.id !== id));
  };

  const verContrato = (id) => {
    console.log('Ver Contrato:', id);
    // Adicione a lógica para visualizar o contrato
  };

  const editarContrato = (id) => {
    console.log('Editar Contrato:', id);
    // Adicione a lógica para editar o contrato
  };

  return (
    <div className="contratos-proprietario-container">
      <h2>Meus Contratos</h2>
      <div className="contratos-proprietario-list">
        {contratos.map(contrato => (
          <div key={contrato.id} className="contrato-item">
            <span>{contrato.titulo}</span>
            <span>{contrato.dataInicio} - {contrato.dataFim}</span>
            <div className="contrato-actions">
              <button onClick={() => editarContrato(contrato.id)}>Editar</button>
              <button onClick={() => excluirContrato(contrato.id)}>Excluir</button>
              <button onClick={() => verContrato(contrato.id)}>Ver</button>
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

export default ContratosProprietario;
