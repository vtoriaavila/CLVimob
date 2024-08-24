import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ContratosDeLoc.css'; // Assumindo que o método getAllContract está em um arquivo chamado api.js
import { getAllContract } from '../../services/contrato.service';

const ContratosDeLoc = () => {
  const [contratos, setContratos] = useState([]);
  const [novoContrato, setNovoContrato] = useState({
    locatorio: '',
    imovel: '',
    dataInicio: '',
    dataFim: '',
    proprietario: '',
    admin: '',
    locatorio: '',
    imob: ''
  });

  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [edicaoContrato, setEdicaoContrato] = useState(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await getAllContract();
        console.log(response.data.results)
        setContratos(response.data.results); // Assumindo que os contratos estão em response.data.results
      } catch (error) {
        console.error('Erro ao buscar contratos:', error);
      }
    };

    fetchContratos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoContrato({
      ...novoContrato,
      [name]: value,
    });
    if (edicaoContrato) {
      setEdicaoContrato({
        ...edicaoContrato,
        [name]: value,
      });
    }
  };

  const adicionarContrato = () => {
    const { locatorio, dataInicio, dataFim, proprietario, admin, imob } = novoContrato;

    if (!locatorio  || !dataInicio || !dataFim || !proprietario || !admin || !imob) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoContratoData = {
      id: contratos.length + 1,
      locatorio,
      dataInicio,
      dataFim,
      proprietario,
      admin,
      imob
    };

    setContratos([...contratos, novoContratoData]);
    setNovoContrato({
      locatorio: '',
      dataInicio: '',
      dataFim: '',
      proprietario: '',
      admin: '',
      imob: ''
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const excluirContrato = (id) => {
    setContratos(contratos.filter(contrato => contrato.id !== id));
  };

  const verContrato = (id) => {
    const contrato = contratos.find(contrato => contrato.id === id);
    setContratoSelecionado(contrato);
    setModalVisivel(true);
  };

  const editarContrato = (id) => {
    const contrato = contratos.find(contrato => contrato.id === id);
    setEdicaoContrato(contrato);
    setNovoContrato(contrato);
  };

  const salvarEdicao = () => {
    const { locatorio, dataInicio, dataFim, proprietario, admin, imob } = edicaoContrato;

    if (!locatorio || !dataInicio || !dataFim || !proprietario || !admin|| !imob) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const contratoAtualizado = {
      id: edicaoContrato.id,
      locatorio,
      dataInicio,
      dataFim,
      proprietario,
      admin,
      imob
    };

    setContratos(contratos.map(contrato => 
      contrato.id === contratoAtualizado.id ? contratoAtualizado : contrato
    ));
    setEdicaoContrato(null);
    setNovoContrato({
      locatorio: '',
      dataInicio: '',
      dataFim: '',
      proprietario: '',
      admin: '',
      imob: ''
    });
  };

  return (
    <div className="contratos-container">
      <h2>Contratos de Locação</h2>
      <div className="contratos-list">
        {contratos.map(contrato => (
          <div key={contrato.id} className="contrato-item">
            <span>{contrato.locatorio.name}</span>
            <span>{contrato.imob.tipo}</span>
            <span>{formatDate(contrato.dt_inicio)} - {formatDate(contrato.dt_vencimento)}</span>
            <div className="contrato-actions">
              <button onClick={() => editarContrato(contrato.id)}>Editar</button>
              <button onClick={() => excluirContrato(contrato.id)}>Excluir</button>
              <button onClick={() => verContrato(contrato.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <div className="novo-contrato-form">
        <input
          type="text"
          name="locatorio"
          placeholder="Locatário"
          value={novoContrato.locatorio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imovel"
          placeholder="Imóvel"
          value={novoContrato.imovel}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="dataInicio">Data de Início:</label>
          <input
            type="date"
            name="dataInicio"
            placeholder="Data de Início"
            value={novoContrato.dataInicio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataFim">Data de Vencimento:</label>
          <input
            type="date"
            name="dataFim"
            placeholder="Data de Vencimento"
            value={novoContrato.dataFim}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="proprietario"
          placeholder="Proprietário"
          value={novoContrato.proprietario}
          onChange={handleChange}
        />
        <input
          type="text"
          name="admin"
          placeholder="Admin"
          value={novoContrato.admin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="locatorio"
          placeholder="Locatório"
          value={novoContrato.locatorio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imob"
          placeholder="Imóvel ID"
          value={novoContrato.imob}
          onChange={handleChange}
        />
        {edicaoContrato ? (
          <button className="save-contrato" onClick={salvarEdicao}>
            Salvar Edição
          </button>
        ) : (
          <button className="add-contrato" onClick={adicionarContrato}>
            Adicionar Contrato +
          </button>
        )}
      </div>

      {modalVisivel && (
        <Modal 
          contrato={contratoSelecionado} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ contrato, onClose }) => {
  if (!contrato) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Contrato</h2>
        <p>Locatário: {contrato.locatorio}</p>
        <p>Imóvel: {contrato.imovel}</p>
        <p>Data de Início: {contrato.dataInicio}</p>
        <p>Data de Vencimento: {contrato.dataFim}</p>
        <p>Proprietário: {contrato.proprietario}</p>
        <p>Admin: {contrato.admin}</p>
        <p>Locatório: {contrato.locatorio}</p>
        <p>Imóvel ID: {contrato.imob}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ContratosDeLoc;
