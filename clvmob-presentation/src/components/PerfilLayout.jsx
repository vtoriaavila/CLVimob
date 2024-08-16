import './PerfilLayout.css';
import { Outlet, useLocation } from 'react-router-dom';
import logo from './logo_branco.png';
import PerfilLocatarioSidebar from './perfil/PerfilLocatarioSidebar';
import PerfilAdmSidebar from './perfil/PerfilAdmSidebar';
import PerfilProprietarioSidebar from './perfil/PerfilProprietarioSidebar';

const DefaultSidebar = () => <div>No sidebar available</div>;

export default function PerfilLayout() {
    const location = useLocation();
    const profileType = location.pathname.split('/')[2]; // Capture 'administrador', 'proprietario', 'locatario' from URL
    
    let Sidebar;

    console.log('Profile Type:', profileType); // Debugging

    switch (profileType) {
        case 'administrador':
            Sidebar = PerfilAdmSidebar;
            break;
        case 'locatario':
            Sidebar = PerfilLocatarioSidebar;
            break;
        case 'proprietario':
            Sidebar = PerfilProprietarioSidebar;
            break;
        default:
            Sidebar = DefaultSidebar;
            break;
    }

    return (
        <>
            <header className='perfil-header'>
                <div className='headerLinha'></div>
            </header>
            <main className='perfil-main'>
                <img src={logo} alt="logo" className="logo" />
                <div className="layout-container">
                    <Sidebar />
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
}
