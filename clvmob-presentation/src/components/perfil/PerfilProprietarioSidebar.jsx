import React from 'react';
import './PerfilSidebar.css';
import { FaChartPie, FaBuilding, FaUserFriends,FaCog, FaMoneyBillWave, FaFileAlt,FaUserTie,FaHandshake,FaTools  } from 'react-icons/fa';

export default function PerfilProprietarioSidebar() {
    return (
        <div className="sidebar">
            <h2>Proprietario</h2>
            <ul>
            <li><button className='button'><FaChartPie className="icon" /> Dashboard</button></li>
                <li><button className='button'><FaBuilding className="icon" />Meus Imóveis</button></li>
                <li><button className='button'><FaHandshake className="icon" /> Contratos</button></li>
                <li><button className='button'><FaTools className="icon" /> Manutenção</button></li>
                <li><button className='button'><FaMoneyBillWave className="icon" /> Pagamentos</button></li>
                <li><button className='button'><FaFileAlt className="icon" /> Documentos</button></li>
                <li><button className='button'><FaCog className="icon" /> Configuração</button></li>
            </ul>
                <button className='button-sair'>Sair</button>
        </div>
    );
}
