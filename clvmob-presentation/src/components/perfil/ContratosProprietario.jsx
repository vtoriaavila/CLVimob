import React, { useState, useEffect } from 'react';
import './ContratosProprietario.css';
import { getContract } from '../../services/contrato.service';

const ContratosProprietario = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [formVisivel, setFormVisivel] = useState(false); // Novo estado para controlar a visibilidade do formulário
  const [novoContrato, setNovoContrato] = useState({
    admin: '',
    locatario: '',
    imob: '',
    dt_inicio: '',
    dt_vencimento: ''
  });

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const fetchedContratos = await getContract();
        const data = fetchedContratos.data.results;

        if (Array.isArray(data)) {
          setContratos(data);
        } else {
          console.error('Os contratos retornados não são um array');
          setError('Erro ao carregar contratos');
        }
      } catch (err) {
        console.error('Erro ao carregar contratos:', err);
        setError('Erro ao carregar contratos');
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  const handleChange = (e) => {
    setNovoContrato({
      ...novoContrato,
      [e.target.name]: e.target.value
    });
  };

  const adicionarContrato = () => {
    const { admin, locatario, imob, dt_inicio, dt_vencimento } = novoContrato;

    if (!admin || !locatario || !imob || !dt_inicio || !dt_vencimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoContratoData = {
      id: contratos.length + 1,
      admin,
      locatario,
      imob,
      dt_inicio,
      dt_vencimento
    };

    setContratos([...contratos, novoContratoData]);
    setNovoContrato({
      admin: '',
      locatario: '',
      imob: '',
      dt_inicio: '',
      dt_vencimento: ''
    });
    setFormVisivel(false); // Esconde o formulário após adicionar o contrato
  };

  const excluirContrato = (id) => {
    setContratos(contratos.filter((contrato) => contrato.id !== id));
  };

  const verContrato = (id) => {
    const contrato = contratos.find((contrato) => contrato.id === id);
    setContratoSelecionado(contrato);
    setModalVisivel(true);
  };

  const editarContrato = (id) => {
    console.log('Editar Contrato:', id);
    // Adicione a lógica para editar o contrato
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contratos-proprietario-container">
      <h2>Meus Contratos</h2>
      <button className="toggle-form" onClick={() => setFormVisivel(!formVisivel)}>
        {formVisivel ? 'Cancelar' : 'Adicionar Contrato +'}
      </button>
      
      {formVisivel && (
        <div className="novo-contrato-form">
          <input
            type="text"
            name="admin"
            placeholder="Admin"
            value={novoContrato.admin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="locatario"
            placeholder="Locatário"
            value={novoContrato.locatario}
            onChange={handleChange}
          />
          <input
            type="text"
            name="imob"
            placeholder="Imóvel"
            value={novoContrato.imob}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="dt_inicio">Data de Início:</label>
            <input
              type="date"
              name="dt_inicio"
              placeholder="Data de Início"
              value={novoContrato.dt_inicio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dt_vencimento">Data de Vencimento:</label>
            <input
              type="date"
              name="dt_vencimento"
              placeholder="Data de Vencimento"
              value={novoContrato.dt_vencimento}
              onChange={handleChange}
            />
          </div>
          <button className="add-contrato" onClick={adicionarContrato}>
            Adicionar Contrato +
          </button>
        </div>
      )}
      
      <div className="contratos-proprietario-list">
        {contratos.map((contrato) => {
          const formattedDateI = new Date(contrato.dt_inicio).toLocaleDateString('pt-BR');
          const formattedDateV = new Date(contrato.dt_vencimento).toLocaleDateString('pt-BR');

          return (
            <div key={contrato.id} className="contrato-item">
              <span><strong>Imóvel:</strong> {contrato.imob?.tipo || 'N/A'}</span>
              <span><strong>Data Início:</strong> {formattedDateI}</span>
              <span><strong>Data Fim:</strong> {formattedDateV}</span>
              <div className="contrato-actions">
                <button onClick={() => editarContrato(contrato.id)}>Editar</button>
                <button onClick={() => excluirContrato(contrato.id)}>Excluir</button>
                <button onClick={() => verContrato(contrato.id)}>Ver</button>
              </div>
            </div>
          );
        })}
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

  const formattedDateI = new Date(contrato.dt_inicio).toLocaleDateString('pt-BR');
  const formattedDateV = new Date(contrato.dt_vencimento).toLocaleDateString('pt-BR');

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Contrato</h2>
        <p><strong>Admin:</strong> {contrato.admin?.name || 'N/A'}</p>
        <p><strong>Locatário:</strong> {contrato.locatario?.name || 'N/A'}</p>
        <p><strong>Imóvel:</strong> {contrato.imob?.tipo || 'N/A'}</p>
        <p><strong>Data de Início:</strong> {formattedDateI}</p>
        <p><strong>Data de Vencimento:</strong> {formattedDateV}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ContratosProprietario;
