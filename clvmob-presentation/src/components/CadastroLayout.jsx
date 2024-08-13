import logo from './logo_azl.png'
import './CadastroLayout.css'
import { Outlet } from 'react-router-dom'


export default function CadastroLayout(){


    return(
        <>
        <header className='cadastro-header'>
            <img src={logo} alt="logo" />
        </header>
        <main className='cadastro-main'>
            <Outlet />
        </main>
        </>
    )
}