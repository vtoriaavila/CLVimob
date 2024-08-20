import React, { useState } from 'react';
import './Manutencao.css';

const Manutencao = () => {
  const [manutencoes, setManutencoes] = useState([
    { id: 1, imob: 'Casa na Rua X', tipo_manutencao: 'Reparos no telhado', desc_total: 'Reparos completos no telhado', data_solicitacao: '2024-08-05T00:00:00.000Z', status: 'Concluído' },
    { id: 2, imob: 'Apartamento 101', tipo_manutencao: 'Pintura externa', desc_total: 'Pintura da fachada externa', data_solicitacao: '2024-08-10T00:00:00.000Z', status: 'Em Andamento' },
    { id: 3, imob: 'Loja no Centro', tipo_manutencao: 'Revisão elétrica', desc_total: 'Revisão completa do sistema elétrico', data_solicitacao: '2024-08-15T00:00:00.000Z', status: 'Pendente' },
  ]);

  const [novaManutencao, setNovaManutencao] = useState({
    imob: '',
    tipo_manutencao: '',
    desc_total: '',
  });

  const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaManutencao({
      ...novaManutencao,
      [name]: value,
    });
  };

  const adicionarManutencao = () => {
    const { imob, tipo_manutencao, desc_total } = novaManutencao;

    if (!imob || !tipo_manutencao || !desc_total) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaManutencaoData = {
      id: manutencoes.length + 1,
      imob,
      tipo_manutencao,
      desc_total,
      data_solicitacao: new Date().toISOString(),
      status: 'Pendente'
    };

    setManutencoes([...manutencoes, novaManutencaoData]);
    setNovaManutencao({
      imob: '',
      tipo_manutencao: '',
      desc_total: ''
    });
  };

  const excluirManutencao = (id) => {
    setManutencoes(manutencoes.filter(manutencao => manutencao.id !== id));
  };

  const verManutencao = (id) => {
    const manutencao = manutencoes.find(manutencao => manutencao.id === id);
    setManutencaoSelecionada(manutencao);
    setModalVisivel(true);
  };

  const editarManutencao = (id) => {
    console.log('Editar Manutenção:', id);
    // Adicione a lógica para editar a manutenção
  };

  return (
    <div className="manutencao-container">
      <h2>Manutenção</h2>
      <div className="manutencao-list">
        {manutencoes.map(manutencao => (
          <div key={manutencao.id} className="manutencao-item">
            <span>{manutencao.imob}</span>
            <span>{manutencao.tipo_manutencao}</span>
            <span>{manutencao.status}</span>
            <span>{new Date(manutencao.data_solicitacao).toLocaleDateString()}</span>
            <div className="manutencao-actions">
              <button onClick={() => editarManutencao(manutencao.id)}>Editar</button>
              <button onClick={() => excluirManutencao(manutencao.id)}>Excluir</button>
              <button onClick={() => verManutencao(manutencao.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      <div className="nova-manutencao-form">
        <input
          type="text"
          name="imob"
          placeholder="Imóvel"
          value={novaManutencao.imob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tipo_manutencao"
          placeholder="Tipo de Manutenção"
          value={novaManutencao.tipo_manutencao}
          onChange={handleChange}
        />
        <textarea
          name="desc_total"
          placeholder="Descrição Completa"
          value={novaManutencao.desc_total}
          onChange={handleChange}
        />
        <button className="add-manutencao" onClick={adicionarManutencao}>
          Adicionar Manutenção +
        </button>
      </div>

      {modalVisivel && (
        <Modal 
          manutencao={manutencaoSelecionada} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ manutencao, onClose }) => {
  if (!manutencao) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes da Manutenção</h2>
        <p>Imóvel: {manutencao.imob}</p>
        <p>Tipo de Manutenção: {manutencao.tipo_manutencao}</p>
        <p>Descrição Completa: {manutencao.desc_total}</p>
        <p>Data da Solicitação: {new Date(manutencao.data_solicitacao).toLocaleDateString()}</p>
        <p>Status: {manutencao.status}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Manutencao;
