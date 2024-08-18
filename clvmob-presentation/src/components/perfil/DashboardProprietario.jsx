import React from 'react';
import GoogleChart from 'react-google-charts';
import './DashboardProprietario.css';

export default function DashboardProprietario() {
  const data = [
    ['Imóvel', 'Receita', 'Despesa'],
    ['Apartamento 101', 8000, 2000],
    ['Casa em Rua do Sol', 12000, 4000],
    ['Loja no Centro', 15000, 5000],
    ['Apartamento 023', 6000, 1500],
  ];

  const options = {
    title: 'Receita vs Despesa por Imóvel',
    hAxis: { title: 'Imóvel' },
    vAxis: { title: 'Valor (R$)' },
    legend: 'none',
    colors: ['#1b9e77', '#d95f02'],
  };

  return (
    <div className="dashboard-proprietario">
      <div className="dashboard-proprietario-header">
        <h2>Olá, usuário!</h2>
        <div className="dashboard-proprietario-summary">
          <div className="summary-item-container">
            <div className="summary-item">Total de propriedades: 30</div>
            <div className="summary-item">Total de Locatários: 28</div>
            <div className="summary-item">Total de Contratos Ativos: 28</div>
            <div className="summary-item">Receita Mensal: R$ 75.000</div>
            <div className="summary-item">Manutenções Pendentes: 4</div>
          </div>
        </div>
      </div>
      <div className="dashboard-proprietario-properties">
        <div className="property-card">
          <h3>Propriedade 1</h3>
          <p><strong>Endereço:</strong> Rua Principal, 123</p>
          <p><strong>Status:</strong> Alugada</p>
          <p><strong>Última Manutenção:</strong> 10/07/2024</p>
        </div>
        <div className="property-card">
          <h3>Propriedade 2</h3>
          <p><strong>Endereço:</strong> Avenida Central, 455</p>
          <p><strong>Status:</strong> Disponível para Locação</p>
          <p><strong>Última Manutenção:</strong> 15/08/2024</p>
        </div>
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
