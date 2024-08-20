import React, { useState } from 'react';
import './Pagamentos.css';

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([
    { id: 1, locatario: 'João da Silva', valor: 'R$ 1500,00', dataPagamento: '05/08/2024' },
    { id: 2, locatario: 'Maria Oliveira', valor: 'R$ 2000,00', dataPagamento: '10/08/2024' },
    { id: 3, locatario: 'Carlos Santos', valor: 'R$ 1800,00', dataPagamento: '15/08/2024' },
  ]);

  const [novoPagamento, setNovoPagamento] = useState({
    tipo: '',
    valor: '',
    data: '',
    vencimento: '',
    status: '',
    contrato: '',
    emissor: '',
    destinatario: ''
  });

  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPagamento({
      ...novoPagamento,
      [name]: value,
    });
  };

  const adicionarPagamento = () => {
    const { tipo, valor, data, vencimento, status, contrato, emissor, destinatario } = novoPagamento;

    if (!tipo || !valor || !data || !vencimento || !status || !contrato || !emissor || !destinatario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoPagamentoData = {
      _id: pagamentos.length + 1,
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
    setPagamentos(pagamentos.filter(pagamento => pagamento.id !== id));
  };

  const verPagamento = (id) => {
    const pagamento = pagamentos.find(pagamento => pagamento.id === id);
    setPagamentoSelecionado(pagamento);
    setModalVisivel(true);
  };

  const editarPagamento = (id) => {
    console.log('Editar Pagamento:', id);
    // Adicionar a lógica para editar o pagamento
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

      {/* Formulário para Adicionar Novo Pagamento */}
      <div className="novo-pagamento-form">
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de Pagamento"
          value={novoPagamento.tipo}
          onChange={handleChange}
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={novoPagamento.valor}
          onChange={handleChange}
        />
        <input
          type="date"
          name="data"
          placeholder="Data"
          value={novoPagamento.data}
          onChange={handleChange}
        />
        <input
          type="date"
          name="vencimento"
          placeholder="Vencimento"
          value={novoPagamento.vencimento}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={novoPagamento.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contrato"
          placeholder="Contrato"
          value={novoPagamento.contrato}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emissor"
          placeholder="Emissor"
          value={novoPagamento.emissor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destinatario"
          placeholder="Destinatário"
          value={novoPagamento.destinatario}
          onChange={handleChange}
        />
        <button className="add-pagamento" onClick={adicionarPagamento}>
          Adicionar Pagamento +
        </button>
      </div>

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

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Pagamento</h2>
        <p>Tipo de Pagamento: {pagamento.tipo}</p>
        <p>Valor: R$ {pagamento.valor.toFixed(2)}</p>
        <p>Data: {new Date(pagamento.data).toLocaleDateString()}</p>
        <p>Vencimento: {new Date(pagamento.vencimento).toLocaleDateString()}</p>
        <p>Status: {pagamento.status}</p>
        <p>Contrato: {pagamento.contrato}</p>
        <p>Emissor: {pagamento.emissor}</p>
        <p>Destinatário: {pagamento.destinatario}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Pagamentos;
