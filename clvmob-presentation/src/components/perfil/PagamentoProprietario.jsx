import React, { useState } from 'react';
import './PagamentoProprietario.css';

const PagamentoProprietario = () => {
  const [pagamentos, setPagamentos] = useState([
    { id: 1, descricao: 'Aluguel de Julho', data: '01/07/2024', valor: 'R$ 1.500,00', status: 'Pago' },
    { id: 2, descricao: 'Manutenção Geral', data: '15/07/2024', valor: 'R$ 300,00', status: 'Pendente' },
    { id: 3, descricao: 'Aluguel de Agosto', data: '01/08/2024', valor: 'R$ 1.500,00', status: 'Pendente' },
  ]);

  const adicionarPagamento = () => {
    const novoPagamento = { id: pagamentos.length + 1, descricao: 'Novo Pagamento', data: 'Data', valor: 'Valor', status: 'Pendente' };
    setPagamentos([...pagamentos, novoPagamento]);
  };

  const excluirPagamento = (id) => {
    setPagamentos(pagamentos.filter(pagamento => pagamento.id !== id));
  };

  const verPagamento = (id) => {
    console.log('Ver Pagamento:', id);
    // Adicione a lógica para visualizar o pagamento
  };

  const editarPagamento = (id) => {
    console.log('Editar Pagamento:', id);
    // Adicione a lógica para editar o pagamento
  };

  return (
    <div className="pagamento-proprietario-container">
      <h2>Pagamentos</h2>
      <div className="pagamento-proprietario-list">
        {pagamentos.map(pagamento => (
          <div key={pagamento.id} className="pagamento-item">
            <span>{pagamento.descricao}</span>
            <span>{pagamento.data}</span>
            <span>{pagamento.valor}</span>
            <span>{pagamento.status}</span>
            <div className="pagamento-actions">
              <button onClick={() => editarPagamento(pagamento.id)}>Editar</button>
              <button onClick={() => excluirPagamento(pagamento.id)}>Excluir</button>
              <button onClick={() => verPagamento(pagamento.id)}>Ver</button>
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

export default PagamentoProprietario;
