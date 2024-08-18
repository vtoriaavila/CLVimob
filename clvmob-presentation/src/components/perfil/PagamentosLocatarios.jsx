import React from 'react';
import './PagamentosLocatario.css';

const PagamentosLocatario = () => {
    const pagamentos = [
        { mes: 'Janeiro', dataPagamento: '10/01/24', valor: 'R$ 2.000,00' },
        { mes: 'Fevereiro', dataPagamento: '10/02/24', valor: 'R$ 2.000,00' },
    ];

    const pagamentosPendentes = [
        { dataPagamento: '10/01/24', mes: 'Julho', valor: 'R$ 2.000,00' }
    ];

    return (
        <div className="pagamentos-container">
            <h2>Pagamentos</h2>
            <div className="resumo-pagamentos">
                <p><strong>Total Recebido:</strong> R$ 2.000,00</p>
                <p><strong>Total Pendente:</strong> R$ 2.000,00</p>
            </div>
            <div className="historico-pagamento">
                <h3>Histórico de Pagamento</h3>
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
            <div className="pendencias-pagamento">
                <h3>Tabela de Pagamentos Pendentes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Data de Pagamento</th>
                            <th>Mês</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentosPendentes.map((pendente, index) => (
                            <tr key={index}>
                                <td>{pendente.dataPagamento}</td>
                                <td>{pendente.mes}</td>
                                <td>{pendente.valor}</td>
                                <td>
                                    <button className="btn-pagar">pagar</button>
                                    <button className="btn-lembrete">lembrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn-comprovante">inserir comprovante de pagamento</button>
        </div>
    );
};

export default PagamentosLocatario;
