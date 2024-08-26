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
  const [despesas, setDespesas] = useState([]);
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

        const despesaResponse = await getDespesa();
        setDespesas(despesaResponse.data);
        console.log(despesas)
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
    // Encontre a despesa correspondente ao id do imóvel
    const despesa = despesas.find(d => d.imob.id === imovelId); // Certifique-se de que a propriedade é '_id', como no exemplo
  
    // Verifique se a despesa foi encontrada
    if (!despesa) {
      return { total: 0, condominio: 0, iptu: 0, seguro: 0, eletricidade: 0, agua: 0 };
    }
  
    // Retorne o total das despesas, incluindo as despesas individuais
    return {
      total: despesa.agua + despesa.condominio + despesa.seguro + despesa.eletricidade, // Inclua iptu no total
      condominio: despesa.condominio,
      iptu: despesa.iptu,
      seguro: despesa.seguro,
      eletricidade: despesa.eletricidade,
      agua: despesa.agua
    };
  };
  
  const data = [
    ['Imóvel', 'Receita', 'Despesa'],
    ...imoveis.map(imovel => {
      // const receita = pagamentos
      //   .filter(p => p.imob === imovel._id)
      //   .reduce((total, p) => total + p.valor, 0);
      const receita = imovel.aluguel;
      const despesa = calcularDespesaPorImovel(imovel._id);

      return [imovel.tipo, receita, despesa.total];
    })
  ];

  const options = {
    title: 'Receita vs Despesa por Imóvel',
    hAxis: { title: 'Imóvel' },
    vAxis: { title: 'Valor (R$)' },
    legend: 'none',
    colors: ['#1b9e77', '#d95f02'],
  };

  if (loading) return <div className="loading-spinner"></div>;

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
          const atualizarStatusImoveis = (imovelId) => {
            const contratoAtivo = contratos.find(contrato => contrato.imob._id === imovelId);
            return contratoAtivo ? 'Alugado' : 'Disponível';
          };
          
          return (
            <div className="property-card" key={imovel._id}>
              <h3>{imovel.tipo}</h3>
              <p><strong>Endereço:</strong> {imovel.endereco}</p>
              <p><strong>Status:</strong> {atualizarStatusImoveis(imovel.id)}</p>
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
      <div className="dashboard-proprietario-expenses">
        <h3>Despesas por Imóvel</h3>
        <div className="expenses-list">
          {imoveis.map(imovel => {
            const despesa = calcularDespesaPorImovel(imovel._id);

            return (
              <div className="expense-card" key={imovel._id}>
                <h4>{imovel.tipo}</h4>
                <p><strong>Endereço:</strong> {imovel.endereco}</p>
                <p><strong>Condomínio:</strong> R$ {despesa.condominio.toFixed(2)}</p>
                <p><strong>IPTU:</strong> R$ {despesa.iptu.toFixed(2)}</p>
                <p><strong>Seguro:</strong> R$ {despesa.seguro.toFixed(2)}</p>
                <p><strong>Eletricidade:</strong> R$ {despesa.eletricidade.toFixed(2)}</p>
                <p><strong>Água:</strong> R$ {despesa.agua.toFixed(2)}</p>
                <p><strong>Despesa Total:</strong> R$ {despesa.total.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
