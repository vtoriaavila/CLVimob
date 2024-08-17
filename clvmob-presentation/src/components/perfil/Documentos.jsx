import React, { useState } from 'react';
import './Documentos.css';

const Documentos = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, nome: 'Contrato de Locação', tipo: 'PDF', dataUpload: '01/08/2024', locatario: 'João Silva', proprietario: 'Ana Souza' },
    { id: 2, nome: 'Laudo de Vistoria', tipo: 'PDF', dataUpload: '03/08/2024', locatario: 'Maria Oliveira', proprietario: 'Pedro Lima' },
    { id: 3, nome: 'Recibo de Pagamento', tipo: 'JPEG', dataUpload: '05/08/2024', locatario: 'Carlos Mendes', proprietario: 'Carlos Mendes' },
  ]);

  const adicionarDocumento = () => {
    const novoDocumento = {
      id: documentos.length + 1,
      nome: 'Novo Documento',
      tipo: 'Tipo',
      dataUpload: 'Data de Upload',
      locatario: 'Locatário',
      proprietario: 'Proprietário',
    };
    setDocumentos([...documentos, novoDocumento]);
  };

  const excluirDocumento = (id) => {
    setDocumentos(documentos.filter(documento => documento.id !== id));
  };

  const verDocumento = (id) => {
    console.log('Ver Documento:', id);
    // adc a lógica ainda
  };

  const editarDocumento = (id) => {
    console.log('Editar Documento:', id);
    // adc a lógica ainda
  };

  return (
    <div className="documentos-container">
      <h2>Documentos</h2>
      <div className="documentos-headers">
        <span>Locatário</span>
        <span>Proprietário</span>
      </div>
      <div className="documentos-list">
        {documentos.map(documento => (
          <div key={documento.id} className="documento-item">
            <span>{documento.nome}</span>
            <span>{documento.tipo}</span>
            <span>{documento.dataUpload}</span>
            <span>{documento.locatario}</span>
            <span>{documento.proprietario}</span>
            <div className="documento-actions">
              <button onClick={() => editarDocumento(documento.id)}>editar</button>
              <button onClick={() => excluirDocumento(documento.id)}>excluir</button>
              <button onClick={() => verDocumento(documento.id)}>ver</button>
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

export default Documentos;
