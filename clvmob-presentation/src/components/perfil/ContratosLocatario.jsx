import React, { useState, useEffect } from 'react';
import './ContratosLocatario.css';
import { getContract } from '../../services/contrato.service'; // Importa o serviço de contratos
import { getPagamento } from '../../services/pagamento.service'; // Importa o serviço de pagamentos

const ImovelInfo = ({ imovel }) => (
  <div className="informacoes-imovel">
    <h3>Informações do imóvel</h3>
    <p><strong>Endereço:</strong> {imovel.endereco}</p>
    <p><strong>Tipo de Imóvel:</strong> {imovel.tipo}</p>
    <p><strong>Área:</strong> {imovel.tamanho} m²</p>
  </div>
);

const LocatarioDetails = ({ locatario }) => {
  console.log(locatario);
  if (!locatario) {
    return <p>Informações do locatário não disponíveis</p>;
  }

  return (
    <div className="detalhes-locatario">
      <h3>Detalhes do Locatário</h3>
      <p><strong>Nome:</strong> {locatario.name}</p>
      <p><strong>CPF:</strong> {locatario.documento}</p>
      <p><strong>Contato:</strong> {locatario.email}</p>
    </div>
  );
};

const ContratoDetails = ({ contrato, imovel }) => (
  <div className="detalhes-contrato">
    <div className="contrato-quadro">
      <h4>Data de Início</h4>
      <p>{new Date(contrato.dt_inicio).toLocaleDateString()}</p>
    </div>
    <div className="contrato-quadro">
      <h4>Data de Término</h4>
      <p>{new Date(contrato.dt_vencimento).toLocaleDateString()}</p>
    </div>
    <div className="contrato-quadro">
      <h4>Valor do Aluguel</h4>
      <p>{`R$ ${imovel.aluguel.toFixed(2).replace('.', ',')}`}</p>
    </div>
  </div>
);

const HistoricoPagamento = ({ pagamentos = [] }) => (
  <div className="historico-pagamento">
    <h4>Histórico de Pagamento</h4>
    {pagamentos.length > 0 ? (
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
    ) : (
      <p>Nenhum pagamento registrado.</p>
    )}
  </div>
);

const ContratosLocatario = () => {
  const [contratos, setContratos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await getContract();
        const data = response.data.results;

        if (Array.isArray(data)) {
          setContratos(data);
        } else {
          console.error('Os contratos retornados não são um array');
          setError('Erro ao carregar contratos');
        }
      } catch (err) {
        console.error('Erro ao carregar contratos:', err);
        setError('Erro ao carregar contratos');
      }
    };

    const fetchPagamentos = async () => {
      try {
        const response = await getPagamento();
        const pagamentos = response.data;

        if (Array.isArray(pagamentos)) {
          setPagamentos(pagamentos);
        } else {
          console.error('Os pagamentos retornados não são um array');
          setError('Erro ao carregar pagamentos');
        }
      } catch (err) {
        console.error('Erro ao carregar pagamentos:', err);
        setError('Erro ao carregar pagamentos');
      }
    };

    const fetchData = async () => {
      await fetchContratos();
      await fetchPagamentos();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contrato-locacao-container">
      <h2>Meus Contratos de Locação</h2>
      {contratos.map((contrato) => {
        // Filtra os pagamentos relacionados ao contrato atual
        const pagamentosContrato = pagamentos.filter(pagamento => pagamento.contratoId === contrato._id);
        console.log(contrato)

        return (
          <div key={contrato._id} className="contrato-locacao-item">
            <ImovelInfo imovel={contrato.imob} />
            <LocatarioDetails locatario={contrato.locatorio} />
            <ContratoDetails contrato={contrato} imovel={contrato.imob} />
            <HistoricoPagamento pagamentos={pagamentosContrato} />
          </div>
        );
      })}
      <button className="visualizar-contrato">Contrato Assinado</button>
    </div>
  );
};

export default ContratosLocatario;
