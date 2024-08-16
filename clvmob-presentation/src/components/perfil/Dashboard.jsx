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
            <ul className='.summary-item'>
                <li>Total de propriedades: 30</li>
                <li>Total de Locatários: 28</li>
                <li>Total de Contratos Ativos: 28</li>
                <li>Receita Mensal: 75.000</li>
                <li>Manutenções Pendentes: 4</li>
            </ul>
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
