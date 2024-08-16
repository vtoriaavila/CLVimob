import React from 'react';
import './PerfilSidebar.css';
import { FaChartPie, FaBuilding, FaUserFriends,FaCog, FaMoneyBillWave, FaFileAlt,FaUserTie,FaHandshake,FaTools  } from 'react-icons/fa';

export default function PerfilAdmSidebar() {
    return (
        <div className="sidebar">
            <h2>Locatário</h2>
            <ul>
                <li><button className='button'><FaHandshake className="icon" />Meus Contratos de Locação</button></li>
                <li><button className='button'><FaTools className="icon" /> Manutenção</button></li>
                <li><button className='button'><FaMoneyBillWave className="icon" /> Pagamentos</button></li>
                <li><button className='button'><FaFileAlt className="icon" /> Documentos</button></li>
                <li><button className='button'><FaCog className="icon" /> Configuração</button></li>
            </ul>
                <button className='button-sair'>Sair</button>
        </div>
    );
}
