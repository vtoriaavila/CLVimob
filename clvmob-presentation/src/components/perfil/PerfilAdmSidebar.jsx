import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaBuilding, FaUserFriends, FaCog, FaMoneyBillWave, FaFileAlt, FaUserTie, FaHandshake, FaTools } from 'react-icons/fa';
import './PerfilSidebar.css'; 

export default function PerfilAdmSidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h2>Administração</h2>
            <ul>
                <li><button className='button' onClick={() => navigate('/perfil/administrador/dashboard')}><FaChartPie className="icon" /> Dashboard</button></li>
                <li><button className='button' onClick={() => navigate('/perfil/administrador/imoveis')}><FaBuilding className="icon" /> Imóveis</button></li>
                <li><button className='button' onClick={() => navigate('/perfil/administrador/locatarios')}><FaUserFriends className="icon" /> Locatários</button></li>
                <li><button className='button'onClick={() => navigate('/perfil/administrador/contratoslocacao')}><FaHandshake className="icon" /> Contratos de Locação</button></li>
                <li><button className='button'onClick={() => navigate('/perfil/administrador/manutencao')}><FaTools className="icon" /> Manutenção</button></li>
                <li><button className='button'onClick={() => navigate('/perfil/administrador/pagamentos')}><FaMoneyBillWave className="icon" /> Pagamentos</button></li>
                <li><button className='button'onClick={() => navigate('/perfil/administrador/documentos')}><FaFileAlt className="icon" /> Documentos</button></li>
                <li><button className='button'onClick={() => navigate('/perfil/administrador/proprietarios')}><FaUserTie className="icon"onClick={() => navigate('/perfil/administrador/proprietarios')} /> Proprietários</button></li>
            </ul>
            <button className='button-sair'>Sair</button>
        </div>
    );
}
