import React, { useState } from 'react';
import './ContratosDeLoc.css';

const ContratosDeLoc = () => {
  const [contratos, setContratos] = useState([
    { id: 1, locatario: 'João da Silva', imovel: 'Apartamento 101', dataInicio: '01/01/2024', dataFim: '01/01/2025', proprietario: 'José da Silva', admin: 'Admin1', locatorio: 'Locatório1', imob: '101' },
    { id: 2, locatario: 'Maria Oliveira', imovel: 'Casa na Rua X', dataInicio: '15/02/2024', dataFim: '15/02/2025', proprietario: 'Carlos Oliveira', admin: 'Admin2', locatorio: 'Locatório2', imob: '102' },
    { id: 3, locatario: 'Carlos Santos', imovel: 'Loja no Centro', dataInicio: '10/03/2024', dataFim: '10/03/2025', proprietario: 'Ana Santos', admin: 'Admin3', locatorio: 'Locatório3', imob: '103' },
  ]);

  const [novoContrato, setNovoContrato] = useState({
    locatario: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoContrato({
      ...novoContrato,
      [name]: value,
    });
  };

  const adicionarContrato = () => {
    const { locatario, imovel, dataInicio, dataFim, proprietario, admin, locatorio, imob } = novoContrato;

    if (!locatario || !imovel || !dataInicio || !dataFim || !proprietario || !admin || !locatorio || !imob) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoContratoData = {
      id: contratos.length + 1,
      locatario,
      imovel,
      dataInicio,
      dataFim,
      proprietario,
      admin,
      locatorio,
      imob
    };

    setContratos([...contratos, novoContratoData]);
    setNovoContrato({
      locatario: '',
      imovel: '',
      dataInicio: '',
      dataFim: '',
      proprietario: '',
      admin: '',
      locatorio: '',
      imob: ''
    });
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
    console.log('Editar Contrato:', id);
    // Adicione a lógica para editar o contrato
  };

  return (
    <div className="contratos-container">
      <h2>Contratos de Locação</h2>
      <div className="contratos-list">
        {contratos.map(contrato => (
          <div key={contrato.id} className="contrato-item">
            <span>{contrato.locatario}</span>
            <span>{contrato.imovel}</span>
            <span>{contrato.dataInicio} - {contrato.dataFim}</span>
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
          name="locatario"
          placeholder="Locatário"
          value={novoContrato.locatario}
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
        <button className="add-contrato" onClick={adicionarContrato}>
          Adicionar Contrato +
        </button>
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
        <p>Locatário: {contrato.locatario}</p>
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
