import React, { useState } from 'react';
import './ManutencaoLocatario.css';

const ManutencaoLocatario = () => {
    
    const [solicitacoes, setSolicitacoes] = useState([
        { id: 12345, categoria: 'Elétrica', status: 'Em andamento', data: '15/07/2024' },
        { id: 12346, categoria: 'Hidráulica', status: 'Concluído', data: '30/07/2024' }
    ]);

    
    const [novaSolicitacao, setNovaSolicitacao] = useState({
        categoria: '',
        status: 'Em andamento', 
        data: ''
    });

    
    const excluirSolicitacao = (id) => {
        setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== id));
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaSolicitacao({ ...novaSolicitacao, [name]: value });
    };

    
    const adicionarSolicitacao = () => {
        if (novaSolicitacao.categoria && novaSolicitacao.data) {
            const novoId = solicitacoes.length ? solicitacoes[solicitacoes.length - 1].id + 1 : 1;
            const novaSolicitacaoParaAdicionar = {
                id: novoId,
                ...novaSolicitacao
            };
            setSolicitacoes([...solicitacoes, novaSolicitacaoParaAdicionar]);
            setNovaSolicitacao({ categoria: '', status: 'Em andamento', data: '' });
        }
    };

    return (
        <div className="manutencao-container">
            <h2>Manutenções</h2>
            <table className="manutencao-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitacoes.map((solicitacao) => (
                        <tr key={solicitacao.id}>
                            <td>{solicitacao.id}</td>
                            <td>{solicitacao.categoria}</td>
                            <td>{solicitacao.status}</td>
                            <td>{solicitacao.data}</td>
                            <td>
                                <button className="btn-excluir" onClick={() => excluirSolicitacao(solicitacao.id)}>
                                    excluir
                                </button>
                                <button className="btn-ver">ver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="manutencao-add-section">
                <h3>Adicionar Nova Solicitação</h3>
                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoria"
                    value={novaSolicitacao.categoria}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="data"
                    value={novaSolicitacao.data}
                    onChange={handleInputChange}
                />
                <button className="btn-add" onClick={adicionarSolicitacao}>Adicionar Nova Solicitação +</button>
            </div>
        </div>
    );
};

export default ManutencaoLocatario;
