import React, { useState, useEffect } from 'react';
import './Documentos.css';

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
    // Simulação de carregamento
    setTimeout(() => {
      try {
        // Simulação de documentos carregados
        setDocumentos([
          { id: 1, nome: 'Contrato de Locação', tipo: 'PDF', data: '01/08/2024', locatario: 'João Silva', proprietario: 'Ana Souza' },
          { id: 2, nome: 'Laudo de Vistoria', tipo: 'PDF', data: '03/08/2024', locatario: 'Maria Oliveira', proprietario: 'Pedro Lima' },
          { id: 3, nome: 'Recibo de Pagamento', tipo: 'JPEG', data: '05/08/2024', locatario: 'Carlos Mendes', proprietario: 'Carlos Mendes' },
        ]);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar documentos.');
        setLoading(false);
      }
    }, 2000); // Simula um carregamento de 2 segundos
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
    const documento = documentos.find(documento => documento.id === id);
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
        {documentos.map(documento => (
          <div key={documento.id} className="documento-item">
            <span>{documento.nome}</span>
            <span>{documento.tipo}</span>
            <span>{documento.data}</span>
            <span>{documento.locatario}</span>
            <span>{documento.proprietario}</span>
            <div className="documento-actions">
              <button onClick={() => editarDocumento(documento.id)}>Editar</button>
              <button onClick={() => excluirDocumento(documento.id)}>Excluir</button>
              <button onClick={() => verDocumento(documento.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário para Adicionar Novo Documento */}
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

      {/* Formulário para Editar Documento */}
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

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Documento</h2>
        <p><strong>Nome:</strong> {documento.nome || 'Não disponível'}</p>
        <p><strong>Tipo:</strong> {documento.tipo || 'Não disponível'}</p>
        <p><strong>Data de Upload:</strong> {documento.data || 'Não disponível'}</p>
        <p><strong>Locatário:</strong> {documento.locatario || 'Não disponível'}</p>
        <p><strong>Proprietário:</strong> {documento.proprietario || 'Não disponível'}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Documentos;
