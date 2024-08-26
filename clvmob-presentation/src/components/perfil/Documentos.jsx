import React, { useState, useEffect } from 'react';
import './Documentos.css';
import { getAllDocuments } from '../../services/documento.service'; // Importando a função da API

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [novoDocumento, setNovoDocumento] = useState({
    nome: '',
    tipo: '',
    data: '',
    locatario: '',
    proprietario: ''
  });

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [formEdicaoVisivel, setFormEdicaoVisivel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await getAllDocuments();
        console.log(response)
        setDocumentos(response.data);
      } catch (error) {
        setError('Erro ao carregar documentos.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (documentoSelecionado) {
      setDocumentoSelecionado({
        ...documentoSelecionado,
        [name]: value,
      });
    } else {
      setNovoDocumento({
        ...novoDocumento,
        [name]: value,
      });
    }
  };

  const adicionarDocumento = () => {
    const { nome, tipo, data, locatario, proprietario } = novoDocumento;

    if (!nome || !tipo || !data || !locatario || !proprietario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoDocumentoData = {
      id: documentos.length + 1,
      nome,
      tipo,
      data,
      locatario,
      proprietario
    };

    setDocumentos([...documentos, novoDocumentoData]);
    setNovoDocumento({
      nome: '',
      tipo: '',
      data: '',
      locatario: '',
      proprietario: ''
    });
  };

  const excluirDocumento = (id) => {
    setDocumentos(documentos.filter(documento => documento.id !== id));
  };

  const verDocumento = (id) => {
    const documento = documentos.find(documento => documento._id === id);
    setDocumentoSelecionado(documento);
    setModalVisivel(true);
};


  const editarDocumento = (id) => {
    const documento = documentos.find(documento => documento.id === id);
    setDocumentoSelecionado(documento);
    setFormEdicaoVisivel(true);
  };

  const salvarEdicao = async () => {
    const { id, nome, tipo, data, locatario, proprietario } = documentoSelecionado;

    if (!nome || !tipo || !data || !locatario || !proprietario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const documentoAtualizado = {
      id,
      nome,
      tipo,
      data,
      locatario,
      proprietario
    };

    try {
      // Simulação de chamada à API para atualizar o documento
      const response = { data: documentoAtualizado };

      const documentoAtualizadoData = response.data;

      setDocumentos(documentos.map(doc =>
        doc.id === documentoAtualizadoData.id ? documentoAtualizadoData : doc
      ));
      setDocumentoSelecionado(null);
      setFormEdicaoVisivel(false);
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      alert('Erro ao atualizar documento');
    }
  };

  const cancelarEdicao = () => {
    setDocumentoSelecionado(null);
    setFormEdicaoVisivel(false);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="documentos-container">
      <h2>Documentos</h2>
      <div className="documentos-list">
      {documentos.map(documento => {
      // Formata a data para o formato 'pt-BR'
      const dataFormatada = documento.data ? new Date(documento.data).toLocaleDateString('pt-BR') : 'Não disponível';
      
      return (
        <div key={documento._id} className="documento-item">
          <span>{documento.titulo}</span>
          <span>{documento.tipo}</span>
          <span>{dataFormatada}</span>
          <span>{documento.imob.tipo}</span>
          <div className="documento-actions">
            <button onClick={() => editarDocumento(documento._id)}>Editar</button>
            <button onClick={() => excluirDocumento(documento._id)}>Excluir</button>
            <button onClick={() => verDocumento(documento._id)}>Ver</button>
          </div>
        </div>
      );
    })}
      </div>

      {!formEdicaoVisivel && (
        <div className="novo-documento-form">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Documento"
            value={novoDocumento.nome}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={novoDocumento.tipo}
            onChange={handleChange}
          />
          <input
            type="date"
            name="data"
            placeholder="Data de Upload"
            value={novoDocumento.data}
            onChange={handleChange}
          />
          <input
            type="text"
            name="locatario"
            placeholder="Locatário"
            value={novoDocumento.locatario}
            onChange={handleChange}
          />
          <input
            type="text"
            name="proprietario"
            placeholder="Proprietário"
            value={novoDocumento.proprietario}
            onChange={handleChange}
          />
          <button className="add-documento" onClick={adicionarDocumento}>
            Adicionar Documento +
          </button>
        </div>
      )}

      {formEdicaoVisivel && (
        <div className="edicao-documento-form">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Documento"
            value={documentoSelecionado.nome}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={documentoSelecionado.tipo}
            onChange={handleChange}
          />
          <input
            type="date"
            name="data"
            placeholder="Data de Upload"
            value={documentoSelecionado.data}
            onChange={handleChange}
          />
          <input
            type="text"
            name="locatario"
            placeholder="Locatário"
            value={documentoSelecionado.locatario}
            onChange={handleChange}
          />
          <input
            type="text"
            name="proprietario"
            placeholder="Proprietário"
            value={documentoSelecionado.proprietario}
            onChange={handleChange}
          />
          <button className='save-doc' onClick={salvarEdicao}>Salvar</button>
          <button className='cancel-doc' onClick={cancelarEdicao}>Cancelar</button>
        </div>
      )}

      {modalVisivel && (
        <Modal 
          documento={documentoSelecionado} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
};

const Modal = ({ documento, onClose }) => {
  if (!documento) return null;

  const dataFormatada = documento.data ? new Date(documento.data).toLocaleDateString('pt-BR') : 'Não disponível';

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Documento</h2>
        <p><strong>Nome:</strong> {documento.titulo || 'Não disponível'}</p>
        <p><strong>Tipo:</strong> {documento.tipo || 'Não disponível'}</p>
        <p><strong>Data de Upload:</strong> {dataFormatada}</p>
        <p><strong>Imóvel:</strong> {documento.imob.tipo || 'Não disponível'}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Documentos;
