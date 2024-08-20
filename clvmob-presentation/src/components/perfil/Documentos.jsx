import React, { useState } from 'react';
import './Documentos.css';

const Documentos = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, nome: 'Contrato de Locação', tipo: 'PDF', data: '01/08/2024', locatario: 'João Silva', proprietario: 'Ana Souza' },
    { id: 2, nome: 'Laudo de Vistoria', tipo: 'PDF', data: '03/08/2024', locatario: 'Maria Oliveira', proprietario: 'Pedro Lima' },
    { id: 3, nome: 'Recibo de Pagamento', tipo: 'JPEG', data: '05/08/2024', locatario: 'Carlos Mendes', proprietario: 'Carlos Mendes' },
  ]);

  const [novoDocumento, setNovoDocumento] = useState({
    nome: '',
    tipo: '',
    data: '',
    locatario: '',
    proprietario: ''
  });

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoDocumento({
      ...novoDocumento,
      [name]: value,
    });
  };

  const adicionarDocumento = () => {
    const { nome, tipo, data, locatario, proprietario } = novoDocumento;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !tipo || !data || !locatario || !proprietario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Adiciona o novo documento
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
    console.log('Editar Documento:', id);
    // Adicionar a lógica para editar o documento
  };

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
              <button onClick={() => editarDocumento(documento.id)}>editar</button>
              <button onClick={() => excluirDocumento(documento.id)}>excluir</button>
              <button onClick={() => verDocumento(documento.id)}>ver</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário para Adicionar Novo Documento */}
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
          name="dataUpload"
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
        <p><strong>Data de Upload:</strong> {documento.data}</p>
        <p><strong>Locatário:</strong> {documento.locatario || 'Não disponível'}</p>
        <p><strong>Proprietário:</strong> {documento.proprietario || 'Não disponível'}</p>
        <button className='modal-button' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Documentos;
