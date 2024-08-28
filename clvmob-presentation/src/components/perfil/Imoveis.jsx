import React, { useEffect, useState } from 'react';
import './Imoveis.css';
import { createImob, getAllImobs, deleteImob, editimob } from '../../services/imob.service'; // Importa a função de editar imóvel
import { getAllUsersProp } from '../../services/user.service';


const Imoveis = () => {
  const [imoveis, setImoveis] = useState([]);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Controle para mostrar o diálogo de exclusão
  const [imovelAExcluir, setImovelAExcluir] = useState(null); // Imóvel que será excluído
  const [senha, setSenha] = useState(''); // Novo estado para a senha
  const [senhaError, setSenhaError] = useState(''); // Novo estado para erros de senha
  const [proprietarios, setProprietarios] = useState([]); // Estado para armazenar os proprietários

  const [novoImovel, setNovoImovel] = useState({
    tipo: '',
    proprietario: '',
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
        const response = await getAllImobs();
        const data = response.data.results;
        setImoveis(data);
      } catch (err) {
        setError('Erro ao carregar imóveis');
      } finally {
        setLoading(false);
      }
    };

    const fetchProprietarios = async () => {
      try {
        const response = await getAllUsersProp();
        setProprietarios(response.data);
      } catch (err) {
        setError('Erro ao carregar proprietários');
      }
    };

    fetchImoveis();
    fetchProprietarios();
  }, []);

  const handleChange = (e) => {
    setNovoImovel({
      ...novoImovel,
      [e.target.name]: e.target.value
    });
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const getUpdatedFields = () => {
    const fields = {};
    for (const key in novoImovel) {
      if (novoImovel[key] !== imovelSelecionado[key] && novoImovel[key] !== '') {
        fields[key] = novoImovel[key];
      }
    }
    return fields;
  };

  const adicionarImovel = async () => {
    const { tipo, cep, endereco, cidade, estado, quartos, banheiro, tamanho, aluguel } = novoImovel;

    if (!tipo || !cep || !endereco || !cidade || !estado || !quartos || !banheiro || !tamanho || !aluguel) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoImovelData = {
      tipo,
      proprietario: '',
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
        // Editar imóvel existente
        const updatedFields = getUpdatedFields();
        if (Object.keys(updatedFields).length > 0) {
          await editimob(imovelSelecionado.id, updatedFields);
          setImoveis(imoveis.map(imovel => imovel.id === imovelSelecionado.id ? { ...imovelSelecionado, ...updatedFields } : imovel));
        }
        setIsEditing(false);
      } else {
        // Adicionar novo imóvel
        const imovelCriado = await createImob(novoImovelData);
        setImoveis([...imoveis, imovelCriado]);
      }

      setNovoImovel({
        tipo: '',
        proprietario: '',
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
      alert('Erro ao adicionar/editar imóvel');
    }
  };

  const pedirSenhaParaExcluir = (id) => {
    setImovelAExcluir(id);
    setShowDeleteDialog(true);
  };

  const confirmarExcluirImovel = async () => {
    if (!senha) {
      setSenhaError('Por favor, insira sua senha para confirmar a exclusão.');
      return;
    }

    try {
      // Substitua 'senha' pelo campo correto se necessário
      const response = await deleteImob(imovelAExcluir, senha);
      alert('Imóvel excluído com sucesso.');
      setImoveis(imoveis.filter(imovel => imovel.id !== imovelAExcluir));
      setShowDeleteDialog(false);
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
    const imovel = imoveis.find(imovel => imovel.id === id);
    setNovoImovel({
      tipo: imovel.tipo,
      proprietario: imovel.proprietario,
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
    <div className="imoveis-container">
      <h2>Imóveis</h2>
      <div className="imoveis-list">
        {imoveis.length === 0 ? (
          <p>Nenhum imóvel encontrado.</p>
        ) : (
          imoveis.map(imovel => (
            <div key={imovel.id} className="imovel-item">
              <span>{imovel.tipo}</span>
              <span>{imovel.endereco}</span>
              <div className="imovel-actions">
                <button onClick={() => editarImovel(imovel.id)}>Editar</button>
                <button onClick={() => pedirSenhaParaExcluir(imovel.id)}>Excluir</button>
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
          <select
            name="proprietario"
            value={novoImovel.proprietario}
            onChange={handleChange}
          >
            <option value="">Selecione o Proprietário</option>
            {proprietarios.map(prop => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>

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

      {modalVisivel && (
        <Modal
          imovel={imovelSelecionado}
          onClose={() => setModalVisivel(false)}
        />
      )}

      {showDeleteDialog && (
        <div className="senha-modal">
          <div className="senha-modal-content">
            <h2>Confirme a Exclusão</h2>
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={handleSenhaChange}
            />
            {senhaError && <p className="error-message">{senhaError}</p>}
            <button onClick={confirmarExcluirImovel}>Confirmar Exclusão</button>
            <button onClick={() => setShowDeleteDialog(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({ imovel, onClose }) => {
  if (!imovel) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{imovel.tipo}</h2>
        <p>Tipo: {imovel.tipo}</p>
        <p>Proprietario: {imovel.proprietario.name}</p>
        <p>CEP: {imovel.cep}</p>
        <p>Endereço: {imovel.endereco}</p>
        <p>Cidade: {imovel.cidade}</p>
        <p>Estado: {imovel.estado}</p>
        <p>Quartos: {imovel.quartos}</p>
        <p>Banheiros: {imovel.banheiro}</p>
        <p>Tamanho: {imovel.tamanho} m²</p>
        <p>Valor do Aluguel: {imovel.aluguel}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Imoveis;
