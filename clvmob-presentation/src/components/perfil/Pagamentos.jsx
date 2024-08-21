import React, { useState, useEffect } from 'react';
import { getPagamentoAdmin } from '../../services/pagamento.service.js'; // Ajuste o caminho conforme a sua estrutura
import './Pagamentos.css';
import { getIdContract } from '../../services/contrato.service.js';

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([]);
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
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await getPagamentoAdmin();
        setPagamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
      }
    };

    fetchPagamentos();
  }, []);

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
    setPagamentos(pagamentos.filter(pagamento => pagamento._id !== id));
  };

  const verPagamento = async (id) => {
    try {
      const pagamento = pagamentos.find(pagamento => pagamento._id === id);
      if (pagamento) {
        const contratoResponse = await getIdContract(pagamento.contrato._id); // Passa o ID do contrato
        setPagamentoSelecionado(pagamento);
        setContrato(contratoResponse.data.contract);
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do contrato:', error);
    }
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
          <div key={pagamento._id} className="pagamento-item">
            <span>{pagamento.tipo}</span>
            <span>R$ {pagamento.valor}</span>
            <span>{new Date(pagamento.data).toLocaleDateString()}</span>
            <div className="pagamento-actions">
              {/* <button onClick={() => editarPagamento(pagamento._id)}>editar</button> */}
              {/* <button onClick={() => excluirPagamento(pagamento._id)}>excluir</button> */}
              <button onClick={() => verPagamento(pagamento._id)}>ver</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário para Adicionar Novo Pagamento */}
      {/* <div className="novo-pagamento-form">
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
      </div>*/}

      {modalVisivel && (
        <Modal 
          pagamento={pagamentoSelecionado} 
          contrato={contrato} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ pagamento, onClose, contrato }) => {
  if (!pagamento || !contrato) return null;

 

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Pagamento</h2>
        <p>Tipo de Pagamento: {pagamento.tipo}</p>
        <p>Valor: R$ {pagamento.valor.toFixed(2)}</p>
        <p>Data: {new Date(pagamento.data).toLocaleDateString()}</p>
        <p>Vencimento: {new Date(pagamento.vencimento).toLocaleDateString()}</p>
        <p>Status: {pagamento.status}</p>
        <p>Contrato ID: {pagamento.contrato._id}</p> {/* Aqui é o ID do contrato, que deve ser uma string */}

        {/* Acessa propriedades específicas do contrato */}
        <p>Proprietário do Contrato: {(contrato.proprietario.name)}</p>
        <p>Locatário do Contrato: {(contrato.locatorio.name)}</p>
        <p>Imóvel do Contrato: {(contrato.imob.tipo)}</p>

        <p>Emissor: {(pagamento.emissor.name)}</p>
        <p>Destinatário: {(pagamento.destinatario.name)}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};


export default Pagamentos;
