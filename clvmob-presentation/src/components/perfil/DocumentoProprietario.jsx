import React, { useState } from 'react';
import './DocumentoProprietario.css';

const DocumentoProprietario = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, titulo: 'Certificado de Propriedade', data: '01/01/2024', tipo: 'Certificado' },
    { id: 2, titulo: 'Contrato de Compra e Venda', data: '15/03/2024', tipo: 'Contrato' },
    { id: 3, titulo: 'Registro de Imóvel', data: '20/05/2024', tipo: 'Registro' },
  ]);

  const adicionarDocumento = () => {
    const novoDocumento = { id: documentos.length + 1, titulo: 'Novo Documento', data: 'Data', tipo: 'Tipo' };
    setDocumentos([...documentos, novoDocumento]);
  };

  const excluirDocumento = (id) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
  };

  const verDocumento = (id) => {
    console.log('Ver Documento:', id);
    // Adicione a lógica para visualizar o documento
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
            <span>{doc.titulo}</span>
            <span>{doc.data}</span>
            <span>{doc.tipo}</span>
            <div className="documento-actions">
              <button onClick={() => editarDocumento(doc.id)}>Editar</button>
              <button onClick={() => excluirDocumento(doc.id)}>Excluir</button>
              <button onClick={() => verDocumento(doc.id)}>Ver</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-documento" onClick={adicionarDocumento}>
        Adicionar Documento +
      </button>
    </div>
  );
};

export default DocumentoProprietario;
