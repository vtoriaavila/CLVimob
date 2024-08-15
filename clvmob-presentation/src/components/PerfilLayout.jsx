import './PerfilLayout.css'
import { Outlet } from 'react-router-dom'
import logo from './logo_branco.png'

export default function PerfilLayout(){
    return(
        <>
        <header className='perfil-header'>
        <div className='headerLinha'></div>
            <Outlet />
        </header>
        <main className='perfil-main'>
        <img src={logo} alt="logo" />
        </main>
        </>
    )
}