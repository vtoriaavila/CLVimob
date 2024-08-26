import React, { useState, useEffect } from 'react';
import './ImoveisProprietario.css';
import { createImob, getImobs, deleteImob, editimob } from '../../services/imob.service'; // Adicionar a função de editar

const ImoveisProprietario = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [modalVisivelExcluir, setModalVisivelExcluir] = useState(false);
  const [modalVisivelVisualizar, setModalVisivelVisualizar] = useState(false);
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

    const imovelData = {
      tipo,
      cep,
      endereco,
      cidade,
      estado,
      quartos: parseInt(quartos),
      banheiro: parseInt(banheiro),
      tamanho: parseFloat(tamanho),
      aluguel: parseFloat(aluguel)
    };

    try {
      if (isEditing) {
        // Atualizar imóvel existente
        const updatedImovel = await editimob(imovelSelecionado.id, imovelData);
        setImoveis(imoveis.map(imovel => (imovel.id === imovelSelecionado.id ? updatedImovel : imovel)));
        setIsEditing(false);
      } else {
        // Adicionar novo imóvel
        const imovelCriado = await createImob(imovelData);
        setImoveis([...imoveis, imovelCriado]);
      }

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
      setShowForm(false);
    } catch (error) {
      alert('Erro ao adicionar/atualizar imóvel');
    }
  };

  const confirmarExclusao = (id) => {
    setImovelSelecionado(id);
    setModalVisivelExcluir(true);
  };

  const excluirImovel = async () => {
    if (!senha) {
      setSenhaError('Por favor, insira sua senha para confirmar a exclusão.');
      return;
    }

    try {
      await deleteImob(imovelSelecionado, senha);
      alert('Imóvel excluído com sucesso.');
      setImoveis(imoveis.filter(imovel => imovel.id !== imovelSelecionado));
      setModalVisivelExcluir(false);
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
    setModalVisivelVisualizar(true);
  };

  const editarImovel = (id) => {
    const imovel = imoveis.find(imovel => imovel.id === id);
    setNovoImovel({
      tipo: imovel.tipo,
      cep: imovel.cep,
      endereco: imovel.endereco,
      cidade: imovel.cidade,
      estado: imovel.estado,
      quartos: imovel.quartos.toString(),
      banheiro: imovel.banheiro.toString(),
      tamanho: imovel.tamanho.toString(),
      aluguel: imovel.aluguel.toString()
    });
    setImovelSelecionado(imovel);
    setShowForm(true);
    setIsEditing(true);
  };

  if (loading) return <div className="loading-spinner"></div>;
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
            {isEditing ? 'Salvar Alterações' : 'Adicionar Imóvel +'}
          </button>
        </div>
      )}

      {modalVisivelExcluir && (
        <ModalExcluir 
          imovel={imovelSelecionado} 
          onClose={() => setModalVisivelExcluir(false)}
          onConfirm={excluirImovel}
          senha={senha}
          setSenha={setSenha}
          senhaError={senhaError}
        />
      )}

      {modalVisivelVisualizar && (
        <ModalVisualizar 
          imovel={imovelSelecionado} 
          onClose={() => setModalVisivelVisualizar(false)}
        />
      )}
    </div>
  );
};

const ModalExcluir = ({ imovel, onClose, onConfirm, senha, setSenha, senhaError }) => (
  <div className="modal">
    <div className="modal-content">
      <h3>Confirmar Exclusão</h3>
      <p>Você tem certeza que deseja excluir o imóvel?</p>
      <input
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {senhaError && <p className="error">{senhaError}</p>}
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  </div>
);

const ModalVisualizar = ({ imovel, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <h3>Detalhes do Imóvel</h3>
      {imovel ? (
        <div>
          <p><strong>Tipo:</strong> {imovel.tipo}</p>
          <p><strong>CEP:</strong> {imovel.cep}</p>
          <p><strong>Endereço:</strong> {imovel.endereco}</p>
          <p><strong>Cidade:</strong> {imovel.cidade}</p>
          <p><strong>Estado:</strong> {imovel.estado}</p>
          <p><strong>Quartos:</strong> {imovel.quartos}</p>
          <p><strong>Banheiros:</strong> {imovel.banheiro}</p>
          <p><strong>Tamanho:</strong> {imovel.tamanho} m²</p>
          <p><strong>Aluguel:</strong> R${imovel.aluguel}</p>
        </div>
      ) : (
        <p>Imóvel não encontrado.</p>
      )}
      <button onClick={onClose}>Fechar</button>
    </div>
  </div>
);

export default ImoveisProprietario;
