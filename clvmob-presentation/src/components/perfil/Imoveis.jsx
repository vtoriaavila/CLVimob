import React, { useEffect, useState } from 'react';
import './Imoveis.css';
import { createImob, getAllImobs } from '../../services/imob.service'; // Importe as funções da API

const Imoveis = () => {
  const [imoveis, setImoveis] = useState([]);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
        const response = await getAllImobs();
        const data = response.data.results; // Acessando o array de imóveis na resposta
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

    const novoImovelData = {
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
      setShowForm(false);
    } catch (error) {
      alert('Erro ao adicionar imóvel');
    }
  };

  const excluirImovel = async (id) => {
    try {
      // Adicione a lógica para excluir o imóvel da API aqui
      // await deleteImob(id); // Supondo que você tenha uma função para deletar imóveis
      setImoveis(imoveis.filter(imovel => imovel.id !== id));
    } catch (err) {
      console.error('Erro ao excluir imóvel:', err);
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
                <button onClick={() => excluirImovel(imovel.id)}>Excluir</button>
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
        />
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
