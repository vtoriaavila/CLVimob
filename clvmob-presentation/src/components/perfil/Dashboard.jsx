import React from 'react';
import DespesaReceita from '../graficos/DespesaReceita';
import './Dashboard.css';
import Ocupacao from '../graficos/Ocupacao';
import Manutencao from '../graficos/Manutencao';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-summary">
        <div className="summary-item-dashboard">
            <div className="summary-item-adm">Total de propriedades: 30</div>
            <div className="summary-item-adm">Total de Locatários: 28</div>
            <div className="summary-item-adm">Total de Contratos Ativos: 28</div>
            <div className="summary-item-adm">Receita Mensal: R$ 75.000</div>
            <div className="summary-item-adm">Manutenções Pendentes: 4</div>
            <div className="summary-item-adm">Total de Proprietários: 9</div>
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
