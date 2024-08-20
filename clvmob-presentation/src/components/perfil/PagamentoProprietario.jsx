import React, { useState, useEffect } from 'react';
import './PagamentoProprietario.css';
import { getPagamento } from '../../services/pagamento.service.js'; // Ajuste o caminho conforme necessário

const PagamentoProprietario = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await getPagamento();
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
    const { tipo, valor, data, vencimento, status, contrato, emissor, destinatario } = novoPagamento;

    if (!tipo || !valor || !data || !vencimento || !status || !contrato || !emissor || !destinatario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoPagamentoData = {
      _id: pagamentos.length + 1, // Ou gerar um ID único
      tipo,
      valor: parseFloat(valor),
      data,
      vencimento,
      status,
      contrato,
      emissor,
      destinatario
    };

    setPagamentos([...pagamentos, novoPagamentoData]);
    setNovoPagamento({
      tipo: '',
      valor: '',
      data: '',
      vencimento: '',
      status: '',
      contrato: '',
      emissor: '',
      destinatario: ''
    });
  };

  const excluirPagamento = (id) => {
    // Lógica para excluir pagamento (se necessário)
  };

  const verPagamento = (id) => {
    const pagamentoItem = pagamentos.find(pagamento => pagamento._id === id);
    setPagamentoSelecionado(pagamentoItem);
    setModalVisivel(true);
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
            <span>{pagamento.tipo || 'Não disponível'}</span>
            <span>{new Date(pagamento.data).toLocaleDateString()}</span>
            <span>{`R$ ${pagamento.valor.toFixed(2).replace('.', ',')}`}</span>
            <span>{pagamento.status || 'Não disponível'}</span>
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

      {modalVisivel && (
        <Modal 
          pagamento={pagamentoSelecionado} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ pagamento, onClose }) => {
  if (!pagamento) return null;

  const formatarData = (data) => new Date(data).toLocaleDateString();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Pagamento</h2>
        <p><strong>Contrato:</strong> {pagamento.contrato ? pagamento.contrato.toString() : 'Não disponível'}</p>
        <p><strong>Tipo:</strong> {pagamento.tipo || 'Não disponível'}</p>
        <p><strong>Emissor:</strong> {pagamento.emissor ? pagamento.emissor.toString() : 'Não disponível'}</p>
        <p><strong>Destinatário:</strong> {pagamento.destinatario ? pagamento.destinatario.toString() : 'Não disponível'}</p>
        <p><strong>Valor:</strong> {`R$ ${valorExibido}`}</p>
        <p><strong>Data:</strong> {formatarData(pagamento.data)}</p>
        <p><strong>Vencimento:</strong> {formatarData(pagamento.vencimento)}</p>
        <p><strong>Status:</strong> {pagamento.status || 'Não disponível'}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default PagamentoProprietario;
