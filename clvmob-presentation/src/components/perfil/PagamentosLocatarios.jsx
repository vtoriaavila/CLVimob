import React, { useState, useEffect } from 'react';
import './PagamentosLocatario.css';
import { getPagamento } from '../../services/pagamento.service.js'; // Ajuste o caminho conforme necessário

const PagamentosLocatario = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [pagamentosPendentes, setPagamentosPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await getPagamento();
        console.log(response);
  
        // Supondo que os pagamentos estejam em um array chamado `pagamentos` na resposta da API
        const pagamentos = response.data;
  
        // Filtra os pagamentos com base no status
        const pagos = pagamentos.filter(pagamento => pagamento.status === "Concluído");
        const pendentes = pagamentos.filter(pagamento => pagamento.status === "Solicitado" || pagamento.status === "Em andamento");
  
        // Atualiza o estado com os pagamentos filtrados
        setPagamentos(pagos);
        setPagamentosPendentes(pendentes);
      } catch (err) {
        setError('Erro ao buscar pagamentos.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPagamentos();
  }, []);
  

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pagamentos-container">
      <h2>Pagamentos</h2>
      <div className="resumo-pagamentos">
        <p><strong>Total Recebido:</strong> R$ {pagamentos.reduce((acc, p) => acc + p.valor, 0).toFixed(2).replace('.', ',')}</p>
        <p><strong>Total Pendente:</strong> R$ {pagamentosPendentes.reduce((acc, p) => acc + p.valor, 0).toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="historico-pagamento">
        <h3>Histórico de Pagamento</h3>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Data de Pagamento</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((pagamento, index) => (
              <tr key={index}>
                <td>{pagamento.status}</td>
                <td>{new Date(pagamento.data).toLocaleDateString()}</td>
                <td>{`R$ ${pagamento.valor.toFixed(2).replace('.', ',')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pendencias-pagamento">
        <h3>Tabela de Pagamentos Pendentes</h3>
        <table>
          <thead>
            <tr>
              <th>Data de Pagamento</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentosPendentes.map((pendente, index) => (
              <tr key={index}>
                <td>{new Date(pendente.data).toLocaleDateString()}</td>
                <td>{pendente.status}</td>
                <td>{`R$ ${pendente.valor.toFixed(2).replace('.', ',')}`}</td>
                <td>
                  <button className="btn-pagar">Pagar</button>
                  <button className="btn-lembrete">Lembrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-comprovante">Inserir Comprovante de Pagamento</button>
    </div>
  );
};

export default PagamentosLocatario;
