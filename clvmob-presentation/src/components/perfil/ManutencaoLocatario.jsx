import React, { useState, useEffect } from 'react';
import './ManutencaoLocatario.css';
import { getManutencao } from '../../services/manutencao.service';
import { getContract } from '../../services/contrato.service'; // Importa o serviço de contratos

const ManutencaoLocatario = () => {
    const [manutencao, setManutencao] = useState([]);
    const [imobId, setImobId] = useState(null); // Estado para armazenar o ID do imóvel
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);
    const [novaManutencao, setNovaManutencao] = useState({
        tipo_manutencao: '',
        desc_total: ''
    });
    const [formVisivel, setFormVisivel] = useState(false); // Estado para controlar a visibilidade do formulário

    useEffect(() => {
        const fetchManutencao = async () => {
            try {
                const response = await getManutencao();
                const data = response.data; // Supondo que a resposta correta já está formatada
                setManutencao(data);

                // Busca o contrato do locatário
                const responseContrato = await getContract();
                const contrato = responseContrato.data.results[0]; // Assumindo que há apenas 1 contrato
                if (contrato && contrato.imob) {
                    setImobId(contrato.imob._id); // Armazena o ID do imóvel
                }
            } catch (err) {
                console.error('Erro ao buscar manutenções:', err);
                setError('Erro ao carregar manutenções');
            } finally {
                setLoading(false);
            }
        };

        fetchManutencao();
    }, []);

    const handleChange = (e) => {
        setNovaManutencao({
            ...novaManutencao,
            [e.target.name]: e.target.value
        });
    };

    const adicionarManutencao = () => {
        const { tipo_manutencao, desc_total } = novaManutencao;

        if (!tipo_manutencao || !desc_total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaManutencaoData = {
            imob: imobId, // Usa o ID do imóvel armazenado
            tipo_manutencao,
            desc_total,
        };

        setManutencao([...manutencao, novaManutencaoData]);
        setNovaManutencao({
            tipo_manutencao: '',
            desc_total: ''
        });
        setFormVisivel(false); // Oculta o formulário após adicionar a manutenção
    };

    const cancelarManutencao = () => {
        setNovaManutencao({
            tipo_manutencao: '',
            desc_total: ''
        });
        setFormVisivel(false); // Oculta o formulário e reseta os campos
    };

    const excluirManutencao = (id) => {
        setManutencao(manutencao.filter(item => item._id !== id));
    };

    const verManutencao = (id) => {
        const manutencaoItem = manutencao.find(item => item._id === id);
        setManutencaoSelecionada(manutencaoItem);
        setModalVisivel(true);
    };

    const editarManutencao = (id) => {
        console.log('Editar Manutenção:', id);
        // Adicione a lógica para editar a manutenção
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="manutencao-Locatario-container">
            <h2>Manutenções</h2>
            <div className="manutencao-Locatario-list">
                {manutencao.map(item => (
                    <div key={item._id} className="manutencao-item">
                        <span>{item.tipo_manutencao}</span>
                        <span>{new Date(item.data_solicitacao).toLocaleDateString('pt-BR')}</span>
                        <span>{item.status}</span>
                        <div className="manutencao-actions">
                            <button onClick={() => editarManutencao(item._id)}>Editar</button>
                            <button onClick={() => excluirManutencao(item._id)}>Excluir</button>
                            <button onClick={() => verManutencao(item._id)}>Ver</button>
                        </div>
                    </div>
                ))}
            </div>

            {modalVisivel && (
                <Modal
                    manutencao={manutencaoSelecionada}
                    onClose={() => setModalVisivel(false)}
                />
            )}

            {!formVisivel && (
                <button className="add-manutencao" onClick={() => setFormVisivel(true)}>
                    Adicionar Manutenção +
                </button>
            )}

            {formVisivel && (
                <div className="novo-manutencao-form">
                    <button className="add-manutencao" onClick={cancelarManutencao}>
                        Cancelar
                    </button>
                    <input
                        type="text"
                        name="tipo_manutencao"
                        placeholder="Tipo de Manutenção"
                        value={novaManutencao.tipo_manutencao}
                        onChange={handleChange}
                    />
                    <textarea
                        name="desc_total"
                        placeholder="Descrição"
                        value={novaManutencao.desc_total}
                        onChange={handleChange}
                    />
                    <button className="add-manutencao" onClick={adicionarManutencao}>
                        Adicionar Manutenção
                    </button>
                </div>
            )}
        </div>
    );
};

const Modal = ({ manutencao, onClose }) => {
    if (!manutencao) return null;

    // Extraia o objeto `imob` se estiver presente
    const imob = manutencao.imob || {};

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Detalhes da Manutenção</h2>
                <p><strong>Imóvel:</strong> {imob.tipo}</p>
                <p><strong>Tipo de Manutenção:</strong> {manutencao.tipo_manutencao}</p>
                <p><strong>Descrição:</strong> {manutencao.desc_total}</p>
                <p><strong>Data de Solicitação:</strong> {new Date(manutencao.data_solicitacao).toLocaleDateString('pt-BR')}</p>
                <p><strong>Status:</strong> {manutencao.status}</p>
                <button className='modal-button' onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ManutencaoLocatario;
