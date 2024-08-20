import React, { useState } from 'react';
import './DocumentoProprietario.css';

const DocumentoProprietario = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, titulo: 'Certificado de Propriedade', data: '01/01/2024', tipo: 'Certificado' },
    { id: 2, titulo: 'Contrato de Compra e Venda', data: '15/03/2024', tipo: 'Contrato' },
    { id: 3, titulo: 'Registro de Imóvel', data: '20/05/2024', tipo: 'Registro' },
  ]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
  const [novoDocumento, setNovoDocumento] = useState({
    titulo: '',
    data: '',
    tipo: ''
  });

  const handleChange = (e) => {
    setNovoDocumento({
      ...novoDocumento,
      [e.target.name]: e.target.value
    });
  };

  const adicionarDocumento = () => {
    const { titulo, data, tipo } = novoDocumento;

    if (!titulo || !data || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoDocumentoData = {
      id: documentos.length + 1,
      titulo,
      data,
      tipo
    };

    setDocumentos([...documentos, novoDocumentoData]);
    setNovoDocumento({
      titulo: '',
      data: '',
      tipo: ''
    });
  };

  const excluirDocumento = (id) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
  };

  const verDocumento = (id) => {
    const documento = documentos.find((doc) => doc.id === id);
    setDocumentoSelecionado(documento);
    setModalVisivel(true);
  };

  const editarDocumento = (id) => {
    console.log('Editar Documento:', id);
    // Adicione a lógica para editar o documento
  };

  return (
    <div className="documento-proprietario-container">
      <h2>Documentos</h2>
      <div className="documento-proprietario-list">
        {documentos.map(doc => (
          <div key={doc.id} className="documento-item">
            <span><strong>Título:</strong> {doc.titulo}</span>
            <span><strong>Data:</strong> {doc.data}</span>
            <span><strong>Tipo:</strong> {doc.tipo}</span>
            <div className="documento-actions">
              <button onClick={() => editarDocumento(doc.id)}>Editar</button>
              <button onClick={() => excluirDocumento(doc.id)}>Excluir</button>
              <button onClick={() => verDocumento(doc.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>

      {modalVisivel && (
        <Modal 
          documento={documentoSelecionado} 
          onClose={() => setModalVisivel(false)} 
        />
      )}
      
      <div className="novo-documento-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={novoDocumento.titulo}
          onChange={handleChange}
        />
        <input
          type="date"
          name="data"
          placeholder="Data"
          value={novoDocumento.data}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={novoDocumento.tipo}
          onChange={handleChange}
        />
        <button className="add-documento" onClick={adicionarDocumento}>
          Adicionar Documento +
        </button>
      </div>
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
        <p><strong>Data:</strong> {documento.data}</p>
        <p><strong>Tipo:</strong> {documento.tipo}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default DocumentoProprietario;
