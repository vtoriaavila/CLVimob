import React, { useState, useEffect } from 'react';
import './DocumentosLocatario.css';

const DocumentosLocatario = () => {
  const [documentos, setDocumentos] = useState([]);
  const [formVisivel, setFormVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
  const [documentoEditado, setDocumentoEditado] = useState(null);
  const [novoDocumento, setNovoDocumento] = useState({
    titulo: '',
    tipo: '',
    data: '',
  });
  const [editarDocumento, setEditarDocumento] = useState({
    id: null,
    titulo: '',
    tipo: '',
    data: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      try {
        // Dados simulados
        const dadosDocumentos = [
          { id: 1, titulo: 'Contrato de Locação', tipo: 'PDF', data: '10/01/24' },
          { id: 2, titulo: 'Comprovante de Pagamento', tipo: 'Imagem', data: '15/02/24' },
        ];
        setDocumentos(dadosDocumentos);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar documentos.');
        setLoading(false);
      }
    }, 1000); // Simulação de delay no carregamento
  }, []);

  const excluirDocumento = (id) => {
    const novosDocumentos = documentos.filter((doc) => doc.id !== id);
    setDocumentos(novosDocumentos);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoDocumento({ ...novoDocumento, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditarDocumento({ ...editarDocumento, [name]: value });
  };

  const adicionarDocumento = () => {
    if (novoDocumento.titulo && novoDocumento.tipo && novoDocumento.data) {
      const novoId = documentos.length ? documentos[documentos.length - 1].id + 1 : 1;
      const documentoParaAdicionar = {
        id: novoId,
        ...novoDocumento,
      };
      setDocumentos([...documentos, documentoParaAdicionar]);
      setNovoDocumento({ titulo: '', tipo: '', data: '' });
      setFormVisivel(false);
    }
  };

  const editarDocumentoClick = (id) => {
    const docParaEditar = documentos.find(doc => doc.id === id);
    setEditarDocumento(docParaEditar);
    setFormVisivel(true);
  };

  const salvarEdicao = () => {
    setDocumentos(documentos.map(doc =>
      doc.id === editarDocumento.id ? editarDocumento : doc
    ));
    setEditarDocumento({ id: null, titulo: '', tipo: '', data: '' });
    setFormVisivel(false);
  };

  const cancelarDocumento = () => {
    setFormVisivel(false);
    setEditarDocumento({ id: null, titulo: '', tipo: '', data: '' });
  };

  const verDocumento = (doc) => {
    setDocumentoSelecionado(doc);
    setModalVisivel(true);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="documentos-container">
      <h2>Documentos</h2>

      <div className="documentos-list">
        {documentos.map(doc => (
          <div key={doc.id} className="documentos-item-loc">
            <span>{doc.titulo}</span>
            <span>{doc.tipo}</span>
            <span>{new Date(doc.data).toLocaleDateString('pt-BR')}</span>
            <div className="documentos-actions">
              <button className='btn-editar' onClick={() => editarDocumentoClick(doc.id)}>Editar</button>
              <button className="btn-ver" onClick={() => verDocumento(doc)}>Ver</button>
              <button className="btn-excluir" onClick={() => excluirDocumento(doc.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {!formVisivel && (
        <button className="add-documento" onClick={() => setFormVisivel(true)}>
          Adicionar Documento +
        </button>
      )}

      {(formVisivel && editarDocumento.id !== null) && (
        <div className="novo-documento-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título do Documento"
            value={editarDocumento.titulo}
            onChange={handleEditInputChange}
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={editarDocumento.tipo}
            onChange={handleEditInputChange}
          />
          <input
            type="date"
            name="data"
            value={editarDocumento.data}
            onChange={handleEditInputChange}
          />
          <button className="btn-adicionar" onClick={salvarEdicao}>
            Salvar Edição
          </button>
          <button className="cancelar" onClick={cancelarDocumento}>
            Cancelar
          </button>
        </div>
      )}

      {(formVisivel && editarDocumento.id === null) && (
        <div className="novo-documento-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título do Documento"
            value={novoDocumento.titulo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={novoDocumento.tipo}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="data"
            value={novoDocumento.data}
            onChange={handleInputChange}
          />
          <button className="btn-adicionar" onClick={adicionarDocumento}>
            Adicionar Novo Documento
          </button>
          <button className="cancelar" onClick={cancelarDocumento}>
            Cancelar
          </button>
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
        <p><strong>Título:</strong> {documento.titulo}</p>
        <p><strong>Tipo:</strong> {documento.tipo}</p>
        <p><strong>Data:</strong> {new Date(documento.data).toLocaleDateString('pt-BR')}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default DocumentosLocatario;
