import React from 'react';
import { Chart } from 'react-google-charts';

export default function Ocupacao() {
  const data = [
    ["Status", "Quantidade"],
    ["Ocupadas", 75],
    ["Vagas", 25],
  ];

  const options = {
    title: "Ocupação das Propriedades",
    pieHole: 0.4,
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
