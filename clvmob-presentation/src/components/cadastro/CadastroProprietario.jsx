import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { cadastro } from '../../services/user.service';

export default function CadastroProprietario() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        estado:'',
        cidade:'',
        bairro:'',
        endereco:'',
        documento:'',
        data_nascimento:'',
        role:'proprietario',
        banco:'',
        agencia:'',
        conta:''
        
    });

    useEffect(() => {
        // Recupere as informações do localStorage
        const storedData = JSON.parse(localStorage.getItem('cadastroInfo'));

        if (storedData) {
            setFormData((prevData) => ({
                ...prevData,
                ...storedData,
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await cadastro(formData);
            console.log('Resposta do servidor:', response);
    
            if (response.status === 201) {
                localStorage.setItem('cadastroInfo', JSON.stringify(formData));
                navigate('/perfil/proprietario');
            } else {
                console.error("Erro ao cadastrar:", response);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }

    return (
        <form className="form-cadastro-propietario" onSubmit={handleSubmit}>
            <h1>Cadastro Proprietário</h1>

            <div className="campos-duplas">
                <div className="campos-formulario">
                    <label htmlFor="estado">Estado</label>
                    <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
                </div>

                <div className="campos-formulario">
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
                </div>
            </div>

            <div style={{ width: '100%' }} className="campos-formulario">
                <label htmlFor="bairro">Bairro</label>
                <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
            </div>

            <div style={{ width: '100%' }} className="campos-formulario">
                <label htmlFor="endereco">Endereço</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
            </div>

            <hr />

            <div className="campos-duplas">
                <div className="campos-formulario">
                    <label htmlFor="documento">Documento (CPF/CNPJ)</label>
                    <input type="text" name="documento" value={formData.documento} onChange={handleChange} />
                </div>

                <div className="campos-formulario">
                    <label htmlFor="data_nascimento">Data de Nascimento</label>
                    <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} />
                </div>
            </div>

            <hr />

            <h2>Dados Bancários</h2>
            <div className="campos-duplas">
                <div className="campos-formulario">
                    <label htmlFor="banco">Banco</label>
                    <input type="text" name="banco" value={formData.banco} onChange={handleChange} />
                </div>

                <div className="campos-formulario">
                    <label htmlFor="agencia">Agencia</label>
                    <input type="number" name="agencia" value={formData.agencia} onChange={handleChange} />
                </div>
            </div>

            <div className="campos-duplas">
                <div className="campos-formulario">
                    <label htmlFor="conta">Conta</label>
                    <input type="number" name="conta" value={formData.conta} onChange={handleChange} />
                </div>

                <button type="submit">Confirmar</button>
            </div>
        </form>
    );
}
