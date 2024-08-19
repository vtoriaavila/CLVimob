import React, { useState, useEffect } from 'react';
import './ImoveisProprietario.css';
import { getImobs } from '../../services/imob.service';

const ImoveisProprietario = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [novoImovel, setNovoImovel] =useState({
    nome: '',
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
        const response =  await getImobs();
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

  const adicionarImovel = () => {
    const { nome, tipo, cep, endereco, cidade, estado, quartos, banheiro, tamanho, aluguel } = novoImovel;

    if (!nome || !tipo || !cep || !endereco || !cidade || !estado || !quartos || !banheiro || !tamanho || !aluguel) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoImovelData = {
      id: imoveis.length + 1,
      nome,
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

    setImoveis([...imoveis, novoImovelData]);
    setNovoImovel({
      nome: '',
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
  };

  const excluirImovel = async (id) => {
    try {
      // Adicione a lógica para excluir o imóvel da API aqui
      setImoveis(imoveis.filter(imovel => imovel.id !== id));
    } catch (err) {
      console.error('Erro ao excluir imóvel:', err);
    }
  };

  const verImovel = (id) => {
    console.log('Ver Imóvel:', id);
    // Adicione a lógica para visualizar o imóvel
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
                <button onClick={() => excluirImovel(imovel.id)}>Excluir</button>
                <button onClick={() => verImovel(imovel.id)}>Ver</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="novo-imovel-form">
        <h3 className='adc-novo'>Adicionar Novo Imóvel</h3>
        <input className='text-nome'
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={novoImovel.tipo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoImovel.nome}
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
    </div>
  );
};

export default ImoveisProprietario;
