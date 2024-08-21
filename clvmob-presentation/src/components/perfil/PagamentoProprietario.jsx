import React, { useState, useEffect } from 'react';
import './PagamentoProprietario.css';
import { getPagamento } from '../../services/pagamento.service.js'; // Ajuste o caminho conforme necessário
import { idImovel } from '../../services/imob.service.js';

const PagamentoProprietario = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [imob, setImob] = useState(null);


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

  const excluirPagamento = (id) => {
    // Lógica para excluir pagamento (se necessário)
  };

  const verPagamento = async (id) => {
    try {
      const pagamentoItem = pagamentos.find(pagamento => pagamento._id === id);
      setPagamentoSelecionado(pagamentoItem);

      // Supondo que `idImovel` é uma função que retorna uma Promise
      const imovel = await idImovel(pagamentoItem.contrato.imob);
      setImob(imovel);

      setModalVisivel(true);
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
    }
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

      {modalVisivel && (
        <Modal
          pagamento={pagamentoSelecionado}
          onClose={() => setModalVisivel(false)}
          imob={imob}
        />
      )}

    </div>
  );
};


const Modal = ({ pagamento, onClose, imob }) => {
  if (!pagamento) return null;


  const formatarData = (data) => new Date(data).toLocaleDateString();
  const valorExibido = pagamento.valor.toFixed(2).replace('.', ',');

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Pagamento</h2>
        <p><strong>Contrato:</strong> {imob ? imob.imob.tipo || 'Não disponível' : 'Não disponível'}</p>
        <p><strong>Tipo:</strong> {pagamento.tipo || 'Não disponível'}</p>
        <p><strong>Emissor:</strong> {pagamento.emissor.name ? pagamento.emissor.name.toString() : 'Não disponível'}</p>
        <p><strong>Destinatário:</strong> {pagamento.destinatario.name ? pagamento.destinatario.name.toString() : 'Não disponível'}</p>
        <p><strong>Valor:</strong> {`R$ ${pagamento.valor.toFixed(2).replace('.', ',')}`}</p>
        <p><strong>Data:</strong> {formatarData(pagamento.data)}</p>
        <p><strong>Vencimento:</strong> {formatarData(pagamento.vencimento)}</p>
        <p><strong>Status:</strong> {pagamento.status || 'Não disponível'}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};


export default PagamentoProprietario;
