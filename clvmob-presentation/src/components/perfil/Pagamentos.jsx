import React, { useState } from 'react';
import './Pagamentos.css';

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([
    { id: 1, locatario: 'João da Silva', valor: 'R$ 1500,00', dataPagamento: '05/08/2024' },
    { id: 2, locatario: 'Maria Oliveira', valor: 'R$ 2000,00', dataPagamento: '10/08/2024' },
    { id: 3, locatario: 'Carlos Santos', valor: 'R$ 1800,00', dataPagamento: '15/08/2024' },
  ]);

  const adicionarPagamento = () => {
    const novoPagamento = {
      id: pagamentos.length + 1,
      locatario: 'Novo Locatário',
      valor: 'Valor',
      dataPagamento: 'Data de Pagamento',
    };
    setPagamentos([...pagamentos, novoPagamento]);
  };

  const excluirPagamento = (id) => {
    setPagamentos(pagamentos.filter(pagamento => pagamento.id !== id));
  };

  const verPagamento = (id) => {
    console.log('Ver Pagamento:', id);
    // adc a lógica ainda
  };

  const editarPagamento = (id) => {
    console.log('Editar Pagamento:', id);
    // adc a lógica ainda
  };

  return (
    <div className="pagamentos-container">
      <h2>Pagamentos</h2>
      <div className="pagamentos-list">
        {pagamentos.map(pagamento => (
          <div key={pagamento.id} className="pagamento-item">
            <span>{pagamento.locatario}</span>
            <span>{pagamento.valor}</span>
            <span>{pagamento.dataPagamento}</span>
            <div className="pagamento-actions">
              <button onClick={() => editarPagamento(pagamento.id)}>editar</button>
              <button onClick={() => excluirPagamento(pagamento.id)}>excluir</button>
              <button onClick={() => verPagamento(pagamento.id)}>ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-pagamento" onClick={adicionarPagamento}>
        Adicionar Pagamento +
      </button>
    </div>
  );
};

export default Pagamentos;
