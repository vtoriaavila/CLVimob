import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PerfilSidebar.css';
import { FaChartPie, FaBuilding, FaUserFriends, FaCog, FaMoneyBillWave, FaFileAlt, FaUserTie, FaHandshake, FaTools } from 'react-icons/fa';

export default function PerfilProprietarioSidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a localização atual

    return (
        <div className="sidebar">
            <h2>Proprietário</h2>
            <ul>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/dashboard' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/dashboard')}>
                        <FaChartPie className="icon" /> Dashboard
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/imoveis' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/imoveis')}>
                        <FaBuilding className="icon" /> Meus Imóveis
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/contratos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/contratos')}>
                        <FaHandshake className="icon" /> Contratos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/manutencao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/manutencao')}>
                        <FaTools className="icon" /> Manutenção
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/pagamentos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/pagamentos')}>
                        <FaMoneyBillWave className="icon" /> Pagamentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/documentos' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/documentos')}>
                        <FaFileAlt className="icon" /> Documentos
                    </button>
                </li>
                <li>
                    <button 
                        className={`button ${location.pathname === '/perfil/proprietario/configuracao' ? 'button-selected' : ''}`} 
                        onClick={() => navigate('/perfil/proprietario/configuracao')}>
                        <FaCog className="icon" /> Configuração
                    </button>
                </li>
            </ul>
            <button className='button-sair'>Sair</button>
        </div>
    );
}
