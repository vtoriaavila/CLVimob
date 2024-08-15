import './PerfilLayout.css'
import { Outlet } from 'react-router-dom'

export default function PerfilLayout(){
    return(
        <>
        <main className='perfil-main'>
            <Outlet />
        </main>
        </>
    )
}