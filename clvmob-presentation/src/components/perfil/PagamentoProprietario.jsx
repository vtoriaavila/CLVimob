import React, { useState, useEffect } from 'react';
import './PagamentoProprietario.css';
import { getPagamento } from '../../services/pagamento.service.js'; // Ajuste o caminho conforme necessário

const PagamentoProprietario = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await getPagamento();
        console.log(response)
        setPagamentos(response.data); // Atualiza o estado com os dados retornados
      } catch (err) {
        setError('Erro ao buscar pagamentos.'); // Define a mensagem de erro
      } finally {
        setLoading(false); // Define o loading como false, independentemente do sucesso ou erro
      }
    };

    fetchPagamentos();
  }, []);

  const adicionarPagamento = () => {
    // Lógica para adicionar pagamento (se necessário)
  };

  const excluirPagamento = (id) => {
    // Lógica para excluir pagamento (se necessário)
  };

  const verPagamento = (id) => {
    console.log('Ver Pagamento:', id);
    // Adicione a lógica para visualizar o pagamento
  };

  const editarPagamento = (id) => {
    console.log('Editar Pagamento:', id);
    // Adicione a lógica para editar o pagamento
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Exibe a mensagem de erro, se houver
  }

  return (
    <div className="pagamento-proprietario-container">
      <h2>Pagamentos</h2>
      <div className="pagamento-proprietario-list">
        {pagamentos.map(pagamento => (
          <div key={pagamento._id} className="pagamento-item">
            <span>{pagamento.tipo}</span>
            <span>{new Date(pagamento.data).toLocaleDateString()}</span>
            <span>{`R$ ${pagamento.valor.toFixed(2).replace('.', ',')}`}</span>
            <span>{pagamento.status}</span>
            <div className="pagamento-actions">
              <button onClick={() => editarPagamento(pagamento._id)}>Editar</button>
              <button onClick={() => excluirPagamento(pagamento._id)}>Excluir</button>
              <button onClick={() => verPagamento(pagamento._id)}>Ver</button>
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
