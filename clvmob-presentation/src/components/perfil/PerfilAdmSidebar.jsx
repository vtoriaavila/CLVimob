import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChartPie, FaBuilding, FaUserFriends, FaCog, FaMoneyBillWave, FaFileAlt, FaUserTie, FaHandshake, FaTools } from 'react-icons/fa';
import './PerfilSidebar.css'; 

export default function PerfilAdmSidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a localização atual

    return (
        <div className="sidebar">
            <h2>Administração</h2>
            <ul>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/dashboard' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/dashboard')}
                    >
                        <FaChartPie className="icon" /> Dashboard
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/imoveis' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/imoveis')}
                    >
                        <FaBuilding className="icon" /> Imóveis
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/locatarios' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/locatarios')}
                    >
                        <FaUserFriends className="icon" /> Locatários
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/contratoslocacao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/contratoslocacao')}
                    >
                        <FaHandshake className="icon" /> Contratos de Locação
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/manutencao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/manutencao')}
                    >
                        <FaTools className="icon" /> Manutenção
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/pagamentos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/pagamentos')}
                    >
                        <FaMoneyBillWave className="icon" /> Pagamentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/documentos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/documentos')}
                    >
                        <FaFileAlt className="icon" /> Documentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/administrador/proprietarios' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/administrador/proprietarios')}
                    >
                        <FaUserTie className="icon" /> Proprietários
                    </button>
                </li>
            </ul>
            <button className='button-sair' onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}
