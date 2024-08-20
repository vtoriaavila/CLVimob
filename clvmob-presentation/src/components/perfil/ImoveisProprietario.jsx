import React, { useState, useEffect } from 'react';
import './ImoveisProprietario.css';
import { createImob, getImobs, deleteImob } from '../../services/imob.service';

const ImoveisProprietario = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [novoImovel, setNovoImovel] = useState({
    tipo: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    quartos: '',
    banheiro: '',
    tamanho: '',
    aluguel: ''
  });

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await getImobs();
        const data = response.data.results;
        setImoveis(data);
      } catch (err) {
        setError('Erro ao carregar imóveis');
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  const handleChange = (e) => {
    setNovoImovel({
      ...novoImovel,
      [e.target.name]: e.target.value
    });
  };

  const adicionarImovel = async () => {
    const { tipo, cep, endereco, cidade, estado, quartos, banheiro, tamanho, aluguel } = novoImovel;

    if (!tipo || !cep || !endereco || !cidade || !estado || !quartos || !banheiro || !tamanho || !aluguel) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Novo Imóvel:', novoImovel);

    try {
      const novoImovelData = {
        tipo,
        cep,
        endereco,
        cidade,
        estado,
        quartos,
        banheiro,
        tamanho,
        aluguel
      };

      const imovelCriado = await createImob(novoImovelData);
      setImoveis([...imoveis, imovelCriado]);
      setNovoImovel({
        tipo: '',
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
        quartos: '',
        banheiro: '',
        tamanho: '',
        aluguel: ''
      });
    } catch (error) {
      alert('Erro ao adicionar imóvel');
    }

    setShowForm(false);
  };

  const confirmarExclusao = (id) => {
    setImovelSelecionado(id);
    setModalVisivel(true);
  };

  const excluirImovel = async () => {
    if (!senha) {
      setSenhaError('Por favor, insira sua senha para confirmar a exclusão.');
      return;
    }

    try {
      // Substitua 'senha' pelo campo correto se necessário
      const response = await deleteImob(imovelSelecionado, senha);
      alert('Imóvel excluído com sucesso.');
      setImoveis(imoveis.filter(imovel => imovel.id !== imovelSelecionado));
      setModalVisivel(false);
      setSenha('');
      setSenhaError('');
    } catch (err) {
      console.error('Erro ao excluir imóvel:', err);
      alert('Erro ao excluir imóvel. Verifique a senha e tente novamente.');
    }
  };

  const verImovel = (id) => {
    const imovel = imoveis.find(imovel => imovel.id === id);
    setImovelSelecionado(imovel);
    setModalVisivel(true);
  };

  const editarImovel = (id) => {
    console.log('Editar Imóvel:', id);
    // Adicione a lógica para editar o imóvel
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="imoveis-proprietario-container">
      <h2>Meus Imóveis</h2>
      <div className="imoveis-proprietario-list">
        {imoveis.length === 0 ? (
          <p>Nenhum imóvel encontrado.</p>
        ) : (
          imoveis.map(imovel => (
            <div key={imovel.id} className="imovel-item">
              <span>{imovel.tipo}</span>
              <span>{imovel.endereco}</span>
              <div className="imovel-actions">
                <button onClick={() => editarImovel(imovel.id)}>Editar</button>
                <button onClick={() => confirmarExclusao(imovel.id)}>Excluir</button>
                <button onClick={() => verImovel(imovel.id)}>Ver</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="add-imovel" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Imóvel +'}
      </button>

      {showForm && (
        <div className="novo-imovel-form">
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={novoImovel.tipo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={novoImovel.cep}
            onChange={handleChange}
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={novoImovel.endereco}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={novoImovel.cidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={novoImovel.estado}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quartos"
            placeholder="Quartos"
            value={novoImovel.quartos}
            onChange={handleChange}
          />
          <input
            type="number"
            name="banheiro"
            placeholder="Banheiros"
            value={novoImovel.banheiro}
            onChange={handleChange}
          />
          <input
            type="number"
            name="tamanho"
            placeholder="Tamanho (m²)"
            value={novoImovel.tamanho}
            onChange={handleChange}
          />
          <input
            type="number"
            name="aluguel"
            placeholder="Valor do Aluguel"
            value={novoImovel.aluguel}
            onChange={handleChange}
          />
          <button className="add-imovel" onClick={adicionarImovel}>
            Adicionar Imóvel +
          </button>
        </div>
      )}

      {modalVisivel && (
        <Modal 
          imovel={imovelSelecionado} 
          onClose={() => setModalVisivel(false)}
          onConfirm={excluirImovel}
          senha={senha}
          setSenha={setSenha}
          senhaError={senhaError}
        />
      )}
    </div>
  );
};

const Modal = ({ imovel, onClose, onConfirm, senha, setSenha, senhaError }) => {
  if (!imovel) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o imóvel <strong>{imovel.tipo}</strong>?</p>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {senhaError && <p className="error-message">{senhaError}</p>}
        <div className="modal-buttons">
          <button className="modal-button" onClick={onConfirm}>Excluir</button>
          <button className="modal-button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ImoveisProprietario;
