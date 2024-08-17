import { Outlet } from 'react-router-dom';
export default function PerfilProprietario() {
    return (
        <div>
            <h1>Página do Proprietário</h1>
            <p>Bem-vindo, Proprietário!</p>
            <Outlet/>
        </div>
    );
}
