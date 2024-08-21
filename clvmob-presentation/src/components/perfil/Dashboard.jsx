import React, { useState, useEffect } from 'react';
import DespesaReceita from '../graficos/DespesaReceita';
import Ocupacao from '../graficos/Ocupacao';
import Manutencao from '../graficos/Manutencao';
import './Dashboard.css';
import { getPagamentoAdmin } from '../../services/pagamento.service.js'; 
import { getContract } from '../../services/contrato.service.js'; 
import { getImobs } from '../../services/imob.service.js';
import { getManutencao } from '../../services/manutencao.service.js';
import { getDespesa } from '../../services/despesa.service.js';

export default function Dashboard() {
  
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
        const pagamentoResponse = await getPagamentoAdmin();
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

  const calcularTotalPropriedades = () => contratos.length;
  const calcularTotalLocatarios = () => contratos.length;
  const calcularTotalContratosAtivos = () => contratos.length;
  const calcularReceitaMensal = () => pagamentos.reduce((total, p) => total + p.valor, 0);
  const calcularManutencoesPendentes = () => manutencoes.filter(m => m.status === 'Solicitado' || m.status === 'Em andamento').length;
  const calcularTotalProprietarios = () => contratos.length;

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-summary">
          <div className="summary-item-dashboard">
            <div className="summary-item-adm">Total de propriedades: {calcularTotalPropriedades()}</div>
            <div className="summary-item-adm">Total de Locatários: {calcularTotalLocatarios()}</div>
            <div className="summary-item-adm">Total de Contratos Ativos: {calcularTotalContratosAtivos()}</div>
            <div className="summary-item-adm">Receita Mensal: R$ {calcularReceitaMensal().toFixed(2)}</div>
            <div className="summary-item-adm">Manutenções Pendentes: {calcularManutencoesPendentes()}</div>
            <div className="summary-item-adm">Total de Proprietários: {calcularTotalProprietarios()}</div>
          </div>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="chart-container"><DespesaReceita /></div>
        <div className='chart-container'><Ocupacao/></div>
        <div className='chart-container2'><Manutencao/></div>
      </div>
      <div className="dashboard-footer">
        <h3>Renovações de Contratos</h3>
        <ul>
          <li>Apartamento 101 - 15/07/2024</li>
          <li>Casa em rua do sol - 30/07/2024</li>
          <li>Loja no Centro - 05/08/2024</li>
          <li>Apartamento 023 - 10/08/2024</li>
        </ul>
      </div>
    </div>
  );
}
