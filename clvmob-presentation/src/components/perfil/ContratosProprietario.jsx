import React, { useState, useEffect } from 'react';
import './ContratosProprietario.css';
import { getContract } from '../../services/contrato.service';

const ContratosProprietario = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const adicionarContrato = () => {
    const novoContrato = {
      id: contratos.length + 1,
      titulo: 'Novo Contrato',
      dataInicio: 'Data Início',
      dataFim: 'Data Fim'
    };
    setContratos([...contratos, novoContrato]);
  };

  const excluirContrato = (id) => {
    setContratos(contratos.filter((contrato) => contrato.id !== id));
  };

  const verContrato = (id) => {
    console.log('Ver Contrato:', id);
    // Adicione a lógica para visualizar o contrato
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
      <div className="contratos-proprietario-list">
        {contratos.map((contrato) => {
          const formattedDateI = new Date(contrato.dt_inicio).toLocaleDateString('pt-BR');
          const formattedDateV = new Date(contrato.dt_vencimento).toLocaleDateString('pt-BR');

          return (
            <div key={contrato.id} className="contrato-item">
              <span><strong>Imóvel:</strong> {contrato.imob?.tipo}</span>
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
      <button className="add-contrato" onClick={adicionarContrato}>
        Adicionar Contrato +
      </button>
    </div>
  );
};

export default ContratosProprietario;
