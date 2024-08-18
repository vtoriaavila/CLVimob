import React, { useState } from 'react';
import './DocumentosLocatario.css';

const DocumentosLocatario = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, titulo: 'Contrato de Locação', tipo: 'PDF', data: '10/01/24' },
    { id: 2, titulo: 'Comprovante de Pagamento', tipo: 'Imagem', data: '15/02/24' },
  ]);

  const [novoDocumento, setNovoDocumento] = useState({
    titulo: '',
    tipo: '',
    data: '',
  });

  
  const excluirDocumento = (id) => {
    const novosDocumentos = documentos.filter((doc) => doc.id !== id);
    setDocumentos(novosDocumentos);
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoDocumento({ ...novoDocumento, [name]: value });
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
    }
  };

  return (
    <div className="documentos-container">
      <h2>Documentos</h2>

      <table className="documentos-table">
        <thead>
          <tr>
            <th>Título da Contratação</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.titulo}</td>
              <td>{doc.tipo}</td>
              <td>{doc.data}</td>
              <td>
                <button className="btn-excluir" onClick={() => excluirDocumento(doc.id)}>
                  Excluir
                </button>
                <button className="btn-ver">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="adicionar-documento-form">
        <h3>Adicionar Novo Documento</h3>
        <input
          type="text"
          name="titulo"
          placeholder="Título da Contratação"
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
          Adicionar Novo Documento +
        </button>
      </div>
    </div>
  );
};

export default DocumentosLocatario;
