import React, { useState, useEffect } from 'react';
import './ImoveisProprietario.css';
import { getImobs } from '../../services/imob.service';

const ImoveisProprietario = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const adicionarImovel = () => {
    const novoImovel = { id: imoveis.length + 1, nome: 'Novo Imóvel', endereco: 'Endereço' };
    setImoveis([...imoveis, novoImovel]);
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
              <span>{imovel.tipo}</span> {/* Use o atributo que representa o nome do imóvel */}
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
      <button className="add-imovel" onClick={adicionarImovel}>
        Adicionar Imóvel +
      </button>
    </div>
  );
};

export default ImoveisProprietario;
