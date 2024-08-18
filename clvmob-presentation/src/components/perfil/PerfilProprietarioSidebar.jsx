import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilSidebar.css';
import { FaChartPie, FaBuilding, FaUserFriends,FaCog, FaMoneyBillWave, FaFileAlt,FaUserTie,FaHandshake,FaTools  } from 'react-icons/fa';

export default function PerfilProprietarioSidebar() {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <h2>Proprietario</h2>
            <ul>
            <li><button className='button' onClick={()=> navigate('/perfil/proprietario/dashboard')}><FaChartPie className="icon" /> Dashboard</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/imoveis')}><FaBuilding className="icon" />Meus Imóveis</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/contratos')}><FaHandshake className="icon" /> Contratos</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/manutencao')}><FaTools className="icon" /> Manutenção</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/pagamentos')}><FaMoneyBillWave className="icon" /> Pagamentos</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/documentos')}><FaFileAlt className="icon" /> Documentos</button></li>
                <li><button className='button'onClick={()=> navigate('/perfil/proprietario/configuracao')}><FaCog className="icon" /> Configuração</button></li>
            </ul>
                <button className='button-sair'>Sair</button>
        </div>
    );
}
