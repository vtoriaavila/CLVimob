import React from 'react';
import { Chart } from 'react-google-charts';

export default function DespesaReceita() {
  const data = [
    ["Mês", "Despesas", "Receita"],
    ["jan", 12000, 22000],
    ["fev", 15000, 29000],
    ["mar", 13000, 25000],
    ["abr", 18000, 30000],
    ["mai", 20000, 34000],
    ["jun", 21000, 38000],
    ["jul", 16000, 29000],
    ["ago", 17000, 30000],
    ["set", 18000, 31000],
    ["out", 19000, 32000],
    ["nov", 23000, 35000],
    ["dez", 25000, 40000],
  ];

  const options = {
    chart: {
      title: "Despesas vs Receita",
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
