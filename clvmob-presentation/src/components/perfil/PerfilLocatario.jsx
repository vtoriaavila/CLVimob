import { Outlet } from 'react-router-dom';
export default function PerfilLocatario() {
    return (
        <div>
            <h1>Página do Locatário</h1>
            <p>Bem-vindo, Locatário!</p>
            <Outlet/>
        </div>
    );
}
