import { useNavigate } from 'react-router-dom';

export default function CadastroProprietario(){
    const navigate = useNavigate();
    const handlePerfilProprietarioClick = () => {
        navigate('/perfil/proprietario');
      };


    return(
        <>
            <form className="form-cadastro-propietario">
                <h1>Cadastro Proprietário</h1>

                <div className="campos-duplas">
                    <div className="campos-formulario">
                        <label htmlFor="estado">Estado</label>
                        <input type="text" name="estato" />
                    </div>

                    <div className="campos-formulario">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" name="cidade" />
                    </div>
                </div>

                <div style={{width: '100%'}} className="campos-formulario">
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" name="bairro" />
                </div>

                <div style={{width: '100%'}} className="campos-formulario">
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" name="endereco" />
                </div>

                <hr/>

                <div className="campos-duplas">
                    <div className="campos-formulario">
                        <label htmlFor="documento">Documento (CPF/CNPJ)</label>
                        <input type="text" name="documento" />
                    </div>

                    <div className="campos-formulario">
                        <label htmlFor="data-nascimento">Data de Nascimento</label>
                        <input type="date" name="data-nascimento" />
                    </div>
                </div>

                <hr/>

                <h2>Dados Bancários</h2>
                <div className="campos-duplas">
                    <div className="campos-formulario">
                        <label htmlFor="banco">Banco</label>
                        <input type="text" name="banco" />
                    </div>

                    <div className="campos-formulario">
                        <label htmlFor="agencia">Agencia</label>
                        <input type="number" name="agencia" />
                    </div>
                </div>

                <div className="campos-duplas">
                    <div className="campos-formulario">
                        <label htmlFor="conta">Conta</label>
                        <input type="number" name="conta" />
                    </div>

                    <button type='submit' onClick={handlePerfilProprietarioClick }>Confirmar</button>
                </div>
            </form>
        </>
    )
}