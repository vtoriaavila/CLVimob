import React from 'react';
import { Chart } from 'react-google-charts';

export default function Manutencao() {
  const data = [
    ["Mês", "Manutenções"],
    ["jan", 10],
    ["fev", 15],
    ["mar", 25],
    ["abr", 30],
    ["mai", 45],
    ["jun", 20],
    ["jul", 15],
    ["ago", 40],
    ["set", 50],
    ["out", 55],
    ["nov", 35],
    ["dez", 60],
  ];

  const options = {
    chart: {
      title: "Manutenções",
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
