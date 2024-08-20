import React, { useState, useEffect } from 'react';
import GoogleChart from 'react-google-charts';
import './DashboardProprietario.css';
import { getPagamento } from '../../services/pagamento.service.js'; 
import { getContract } from '../../services/contrato.service.js'; 
import { getImobs } from '../../services/imob.service.js';
import { getManutencao } from '../../services/manutencao.service.js';
import { getDespesa } from '../../services/despesa.service.js';

export default function DashboardProprietario() {
  
  const [pagamentos, setPagamentos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);
  const [despesas, setDespesas] = useState([]); // Novo estado para despesas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const pagamentoResponse = await getPagamento();
        setPagamentos(pagamentoResponse.data);

        const contractResponse = await getContract();
        setContratos(contractResponse.data.results);

        const imobsResponse = await getImobs();
        setImoveis(imobsResponse.data.results);

        const manutencaoResponse = await getManutencao();
        setManutencoes(manutencaoResponse.data);
       

        const despesaResponse = await getDespesa(); // Buscar despesas
        setDespesas(despesaResponse.data); // Atualiza o estado de despesas

      } catch (err) {
        setError('Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  const calcularTotalPropriedades = () => imoveis.length;

  const calcularManutencoesPendentes = () => {
    return manutencoes.filter(m => m.status === 'Solicitado' || m.status === 'Em andamento').length;
  };

  const encontrarUltimaManutencao = (imovelId) => {
    const manutencoesImovel = manutencoes.filter(m => m.imob._id === imovelId);
    if (manutencoesImovel.length === 0) return 'Desconhecido';

    const ultimaManutencao = manutencoesImovel.reduce((ultima, atual) => 
      new Date(ultima.data_solicitacao) > new Date(atual.data_solicitacao) ? ultima : atual
    );
    return new Date(ultimaManutencao.data_solicitacao).toLocaleDateString();
  };

  const calcularReceitaTotalAlugados = () => {
    const imoveisAlugadosIds = new Set(contratos.map(contrato => contrato.imob.id));
    const imoveisAlugadosComDados = imoveis.filter(imovel => 
      imoveisAlugadosIds.has(imovel._id)
    );
    return imoveisAlugadosComDados.reduce((total, imovel) => total + (imovel.aluguel || 0), 0);
  };

  const calcularDespesaPorImovel = (imovelId) => {
    return despesas
      .filter(d => d.imob.id === imovelId)
      .reduce((total, d) => total + d.agua + d.condominio+ d.seguro +d.eletricidade, 0);
  };

  const data = [
    ['Imóvel', 'Receita', 'Despesa'],
    ...imoveis.map(imovel => {
      const receita = pagamentos
        .filter(p => p.imob === imovel._id)
        .reduce((total, p) => total + p.valor, 0);
      const despesa = calcularDespesaPorImovel(imovel._id); // Calcula a despesa para o imóvel

      return [imovel.tipo, receita, despesa];
    })
  ];

  const options = {
    title: 'Receita vs Despesa por Imóvel',
    hAxis: { title: 'Imóvel' },
    vAxis: { title: 'Valor (R$)' },
    legend: 'none',
    colors: ['#1b9e77', '#d95f02'],
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-proprietario">
      <div className="dashboard-proprietario-header">
        <h2>Olá, usuário!</h2>
        <div className="dashboard-proprietario-summary">
          <div className="summary-item-container">
            <div className="summary-item">Total de propriedades: {calcularTotalPropriedades()}</div>
            <div className="summary-item">Total de Locatários: {contratos.length}</div>
            <div className="summary-item">Total de Contratos Ativos: {contratos.length}</div>
            <div className="summary-item">Receita Mensal: R$ {calcularReceitaTotalAlugados().toFixed(2)}</div>
            <div className="summary-item">Manutenções Pendentes: {calcularManutencoesPendentes()}</div>
          </div>
        </div>
      </div>
      <div className="dashboard-proprietario-properties">
        {imoveis.map(imovel => {
          const contratoRelacionado = contratos.find(contrato => contrato.imob.id === imovel._id);
          const status = contratoRelacionado ? "Alugado" : "Disponível";
          
          return (
            <div className="property-card" key={imovel._id}>
              <h3>{imovel.tipo}</h3>
              <p><strong>Endereço:</strong> {imovel.endereco}</p>
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Última Manutenção:</strong> {encontrarUltimaManutencao(imovel.id)}</p>
            </div>
          );
        })}
      </div>
      <div className="dashboard-proprietario-charts">
        <div className="dashboard-proprietario-chart-container">
          <GoogleChart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
