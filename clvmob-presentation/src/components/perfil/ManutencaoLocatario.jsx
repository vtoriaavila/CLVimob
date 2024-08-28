import React, { useState, useEffect } from 'react';
import './ManutencaoLocatario.css';
import { getManutencao, createManutencao, deleteManutencao, editManutencao } from '../../services/manutencao.service';
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
    const [edicaoManutencao, setEdicaoManutencao] = useState(null); // Estado para manutenção em edição

    useEffect(() => {
        const fetchManutencao = async () => {
            try {
                const response = await getManutencao();
                setManutencao(response.data);

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
        if (edicaoManutencao) {
            setEdicaoManutencao({
                ...edicaoManutencao,
                [e.target.name]: e.target.value
            });
        } else {
            setNovaManutencao({
                ...novaManutencao,
                [e.target.name]: e.target.value
            });
        }
    };

    const adicionarManutencao = async () => {
        const { tipo_manutencao, desc_total } = novaManutencao;

        if (!tipo_manutencao || !desc_total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaManutencaoData = {
            imob: imobId,
            tipo_manutencao,
            desc_total,
        };

        try {
            const response = await createManutencao(novaManutencaoData);
            const manutencaoCriada = response.data; // Supondo que a API retorna o objeto da nova manutenção criada

            setManutencao([...manutencao, manutencaoCriada]);
            setNovaManutencao({
                tipo_manutencao: '',
                desc_total: ''
            });
            setFormVisivel(false); // Oculta o formulário após adicionar a manutenção
        } catch (error) {
            console.error('Erro ao adicionar manutenção:', error);
            alert('Erro ao adicionar manutenção');
        }
    };

    const cancelarManutencao = () => {
        setNovaManutencao({
            tipo_manutencao: '',
            desc_total: ''
        });
        setFormVisivel(false); // Oculta o formulário e reseta os campos
        setEdicaoManutencao(null); // Reseta o estado de edição
    };

    const excluirManutencao = async (id) => {
        try {
            await deleteManutencao(id); // Chama o serviço para excluir a manutenção
            setManutencao(manutencao.filter(item => item._id !== id)); // Atualiza o estado após exclusão
        } catch (error) {
            console.error('Erro ao excluir manutenção:', error);
            alert('Erro ao excluir manutenção');
        }
    };

    const verManutencao = (id) => {
        const manutencaoItem = manutencao.find(item => item._id === id);
        setManutencaoSelecionada(manutencaoItem);
        setModalVisivel(true);
    };

    const editarManutencao = (id) => {
        const manutencaoItem = manutencao.find(item => item._id === id);
        setEdicaoManutencao(manutencaoItem);
        setFormVisivel(true); // Exibe o formulário para edição
    };

    const salvarEdicao = async () => {
        const { tipo_manutencao, desc_total } = edicaoManutencao;

        if (!tipo_manutencao || !desc_total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const manutencaoAtualizada = {
            tipo_manutencao,
            desc_total,
        };

        try {
            const response = await editManutencao(edicaoManutencao._id, manutencaoAtualizada);
            const manutencaoAtualizadaData = response.data;

            setManutencao(manutencao.map(item =>
                item._id === manutencaoAtualizadaData._id ? manutencaoAtualizadaData : item
            ));
            setEdicaoManutencao(null); // Limpa o estado de edição
            setFormVisivel(false); // Oculta o formulário de edição
        } catch (error) {
            console.error('Erro ao atualizar manutenção:', error);
            alert('Erro ao atualizar manutenção');
        }
    };

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <p>{error}</p>;

    return (
        <div className="manutencao-Locatario-container">
            <h2>Manutenções</h2>
            <div className="manutencao-Locatario-list">
                {manutencao.map(item => (
                    <div key={item._id} className="manutencao-locatario-item">
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

            {(formVisivel && edicaoManutencao) && (
                <div className="novo-manutencao-form-loc">
    
                    <input
                        type="text"
                        name="tipo_manutencao"
                        placeholder="Tipo de Manutenção"
                        value={edicaoManutencao.tipo_manutencao}
                        onChange={handleChange}
                    />
                    <textarea
                        name="desc_total"
                        placeholder="Descrição"
                        value={edicaoManutencao.desc_total}
                        onChange={handleChange}
                    />
                    <button className="cancelar" onClick={cancelarManutencao}>
                        Cancelar
                    </button>
                    <button className="add-manutencao" onClick={salvarEdicao}>
                        Salvar Edição
                    </button>
                </div>
            )}

            {(formVisivel && !edicaoManutencao) && (
                <div className="novo-manutencao-form-loc">
                   
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
                    <button className="cancelar" onClick={cancelarManutencao}>
                        Cancelar
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