import React from 'react';
import './ContratosLocatario.css';

const ImovelInfo = ({ imovel }) => (
  <div className="informacoes-imovel">
    <h3>Informações do imóvel</h3>
    <p><strong>Endereço:</strong> {imovel.endereco}</p>
    <p><strong>Tipo de Imóvel:</strong> {imovel.tipo}</p>
    <p><strong>Área:</strong> {imovel.area}</p>
  </div>
);

const LocatarioDetails = ({ locatario }) => (
  <div className="detalhes-locatario">
    <h3>Detalhes do Locatário</h3>
    <p><strong>Nome:</strong> {locatario.nome}</p>
    <p><strong>CPF:</strong> {locatario.cpf}</p>
    <p><strong>Contato:</strong> {locatario.contato}</p>
  </div>
);

const ContratoDetails = ({ contrato }) => (
  <div className="detalhes-contrato">
    <div className="contrato-quadro">
      <h4>Data de Início</h4>
      <p>{contrato.dataInicio}</p>
    </div>
    <div className="contrato-quadro">
      <h4>Data de Término</h4>
      <p>{contrato.dataTermino}</p>
    </div>
    <div className="contrato-quadro">
      <h4>Valor do Aluguel</h4>
      <p>{contrato.valorAluguel}</p>
    </div>
  </div>
);

const HistoricoPagamento = ({ pagamentos }) => (
  <div className="historico-pagamento">
    <h4>Histórico de Pagamento</h4>
    <table>
      <thead>
        <tr>
          <th>Mês</th>
          <th>Data de Pagamento</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {pagamentos.map((pagamento, index) => (
          <tr key={index}>
            <td>{pagamento.mes}</td>
            <td>{pagamento.dataPagamento}</td>
            <td>{pagamento.valor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ContratosLocatario = () => {
  const imovel = {
    endereco: 'Avenida Central, 455',
    tipo: 'Casa',
    area: '40 m²',
  };

  const locatario = {
    nome: 'João Silva',
    cpf: '000000000-00',
    contato: '(98) 95555-5555',
  };

  const contrato = {
    dataInicio: '10/01/24',
    dataTermino: '10/02/24',
    valorAluguel: 'R$ 2.000,00',
  };

  const historicoPagamento = [
    { mes: 'Janeiro', dataPagamento: '10/01/24', valor: 'R$ 2.000,00' },
    { mes: 'Fevereiro', dataPagamento: '10/02/24', valor: 'R$ 2.000,00' },
  ];

  return (
    <div className="contrato-locacao-container">
      <h2>Meus Contratos de Locação</h2>
      
      <ImovelInfo imovel={imovel} />
      <LocatarioDetails locatario={locatario} />
      <ContratoDetails contrato={contrato} />
      <HistoricoPagamento pagamentos={historicoPagamento} />

      <button className="visualizar-contrato">Contrato Assinado</button>
    </div>
  );
};

export default ContratosLocatario;
