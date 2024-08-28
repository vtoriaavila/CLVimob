import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ContratosDeLoc.css'; // Assumindo que o método getAllContract está em um arquivo chamado api.js
import { getAllContract } from '../../services/contrato.service';

const formatDateToDDMMYYYY = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await getAllContract();
        console.log(response.data.results)
        setContratos(response.data.results); // Assumindo que os contratos estão em response.data.results
      } catch (error) {
        console.error('Erro ao buscar contratos:', error);
      }finally{
        setLoading(false); // Concluímos o carregamento, independente de sucesso ou falha
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
    setShowForm(true);
    setNovoContrato({
      ...contrato,
      imovel: contrato.imob._id // Ajuste se necessário
    });
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
    setShowForm(false);
    setNovoContrato({
      locatorio: '',
      dataInicio: '',
      dataFim: '',
      proprietario: '',
      admin: '',
      imob: ''
    });
  };

  const cancelarEdicao = () => {
    setEdicaoContrato(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;


  return (
    <div className="contratos-container">
      <h2>Contratos de Locação</h2>
      <div className="contratos-list">
        {contratos.map(contrato => (
          <div key={contrato.id} className="contrato-item">
            <span>{contrato.locatorio.name}</span>
            <span>{contrato.imob.tipo}</span>
            <span>{formatDateToDDMMYYYY(contrato.dt_inicio)} - {formatDateToDDMMYYYY(contrato.dt_vencimento)}</span>
            <div className="contrato-actions">
              <button onClick={() => editarContrato(contrato.id)}>Editar</button>
              <button onClick={() => excluirContrato(contrato.id)}>Excluir</button>
              <button onClick={() => verContrato(contrato.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-contratoLoc" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Novo Contrato +'}
      </button>

      {showForm && (
      <div className="novo-contrato-form">
  <input
    type="text"
    name="locatorio"
    placeholder="Locatário"
    value={edicaoContrato ? edicaoContrato.locatorio : novoContrato.locatorio}
    onChange={handleChange}
  />
  <input
    type="text"
    name="imovel"
    placeholder="Imóvel"
    value={edicaoContrato ? edicaoContrato.imovel : novoContrato.imovel}
    onChange={handleChange}
  />
  <div className="form-group">
    <label htmlFor="dataInicio">Data de Início:</label>
    <input
      type="date"
      name="dataInicio"
      placeholder="Data de Início"
      value={edicaoContrato ? formatDate(edicaoContrato.dataInicio) : formatDate(novoContrato.dataInicio)}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="dataFim">Data de Vencimento:</label>
    <input
      type="date"
      name="dataFim"
      placeholder="Data de Vencimento"
      value={edicaoContrato ? formatDate(edicaoContrato.dataFim) : formatDate(novoContrato.dataFim)}
      onChange={handleChange}
    />
  </div>
  <input
    type="text"
    name="proprietario"
    placeholder="Proprietário"
    value={edicaoContrato ? edicaoContrato.proprietario : novoContrato.proprietario}
    onChange={handleChange}
  />
  <input
    type="text"
    name="admin"
    placeholder="Admin"
    value={edicaoContrato ? edicaoContrato.admin : novoContrato.admin}
    onChange={handleChange}
  />
  <input
    type="text"
    name="imob"
    placeholder="Imóvel ID"
    value={edicaoContrato ? edicaoContrato.imob : novoContrato.imob}
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
)}


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
        <p>Locatário: {contrato.locatorio.name}</p>
        <p>Imóvel: {contrato.imob.tipo}</p>
        <p>Data de Início: {formatDateToDDMMYYYY(contrato.dt_inicio)}</p>
        <p>Data de Vencimento: {formatDateToDDMMYYYY(contrato.dt_vencimento)}</p>
        <p>Proprietário: {contrato.proprietario.name}</p>
        <p>Admin: {contrato.admin.name}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};


export default ContratosDeLoc;
