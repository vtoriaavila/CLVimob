import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PerfilSidebar.css';
import { FaHandshake, FaTools, FaMoneyBillWave, FaFileAlt, FaCog } from 'react-icons/fa';

export default function PerfilLocatarioSidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a localização atual

    return (
        <div className="sidebar">
            <h2>Locatário</h2>
            <ul>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/locatario/meusContratos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/locatario/meusContratos')}
                    >
                        <FaHandshake className="icon" /> Meu Contrato de Locação
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/locatario/manutencao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/locatario/manutencao')}
                    >
                        <FaTools className="icon" /> Manutenção
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/locatario/pagamento' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/locatario/pagamento')}
                    >
                        <FaMoneyBillWave className="icon" /> Pagamentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/locatario/documentos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/locatario/documentos')}
                    >
                        <FaFileAlt className="icon" /> Documentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/locatario/configuracao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/locatario/configuracao')}
                    >
                        <FaCog className="icon" /> Configuração
                    </button>
                </li>
            </ul>
            <button className='button-sair'>Sair</button>
        </div>
    );
}
