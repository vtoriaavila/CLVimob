import React from 'react';
import './PerfilSidebar.css';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaBuilding, FaUserFriends,FaCog, FaMoneyBillWave, FaFileAlt,FaUserTie,FaHandshake,FaTools  } from 'react-icons/fa';
import Dashboard from './Dashboard';

export default function PerfilAdmSidebar() {

    const navigate =useNavigate();
    
    return (
        <div className="sidebar">
            <h2>Administração</h2>
            <ul>
            <li><button className='button' onClick={() => navigate('/perfil/administrador/dashboard')}><FaChartPie className="icon" /> Dashboard</button></li>
                <li><button className='button'><FaBuilding className="icon" /> Imóveis</button></li>
                <li><button className='button'><FaUserFriends className="icon" /> Locatários</button></li>
                <li><button className='button'><FaHandshake className="icon" /> Contratos de Locação</button></li>
                <li><button className='button'><FaTools className="icon" /> Manutenção</button></li>
                <li><button className='button'><FaMoneyBillWave className="icon" /> Pagamentos</button></li>
                <li><button className='button'><FaFileAlt className="icon" /> Documentos</button></li>
                <li><button className='button'><FaUserTie className="icon" /> Proprietários</button></li>
            </ul>
                <button className='button-sair'>Sair</button>
        </div>
    );
}
