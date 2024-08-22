import React, { useState, useEffect } from 'react';
import DespesaReceita from '../graficos/DespesaReceita';
import Ocupacao from '../graficos/Ocupacao';
import Manutencao from '../graficos/Manutencao';
import './Dashboard.css';
import { getAllPagamento } from '../../services/pagamento.service.js'; 
import { getAllContract } from '../../services/contrato.service.js'; 
import { getAllImobs } from '../../services/imob.service.js';
import { getAllManutencao } from '../../services/manutencao.service.js';
import { getAllDespesa } from '../../services/despesa.service.js';
import { getAllUsers, getAllUsersLoc, getAllUsersProp } from '../../services/user.service.js';

export default function Dashboard() {
  
  const [pagamentos, setPagamentos] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Loc, setLoc] = useState([]);
  const [Prop, setProp] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);
  const [despesas, setDespesas] = useState([]); // Novo estado para despesas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const pagamentoResponse = await getAllPagamento();
        setPagamentos(pagamentoResponse.data);

        const contractResponse = await getAllContract();
        setContratos(contractResponse.data.results);

        const imobsResponse = await getAllImobs();
        setImoveis(imobsResponse.data.results);

        const manutencaoResponse = await getAllManutencao();
        setManutencoes(manutencaoResponse.data);
       
        const propResponse = await getAllUsersProp(); // Buscar despesas
        setProp(propResponse.data); // Atualiza o estado de despesas
        console.log(propResponse.data)

        const locResponse = await getAllUsersLoc(); // Buscar despesas
        setLoc(locResponse.data); // Atualiza o estado de despesas
        console.log(locResponse.data)

        const despesaResponse = await getAllDespesa(); // Buscar despesas
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
  const calcularTotalLocatarios = () => Loc.length;
  const calcularTotalContratosAtivos = () => contratos.length;
  const calcularReceitaMensal = () => pagamentos.reduce((total, p) => total + p.valor, 0);
  const calcularManutencoesPendentes = () => manutencoes.filter(m => m.status === 'Solicitado' || m.status === 'Em andamento').length;
  const calcularTotalProprietarios = () => Prop.length;

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
