import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import TipoUsuario from "./components/TipoUsuario";
import CadastroLayout from "./components/CadastroLayout";
import CadastroAdm from './components/cadastro/CadastroAdm';
import CadastroLocatario from './components/cadastro/CadastroLocatario';
import CadastroPropietario from './components/cadastro/CadastroProprietario';
import PerfilLayout from "./components/PerfilLayout";
import PerfilAdm from "./components/perfil/PerfilAdm";
import PerfilLocatario from "./components/perfil/PerfilLocatario";
import PerfilProprietario from "./components/perfil/PerfilProprietario";
import Dashboard from "./components/perfil/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/cadastro-opcoes',
        element: <Cadastro />
    },
    {
        path: '/tipo-usuario',
        element: <TipoUsuario />
    },
    {
        path: '/cadastro',
        element: <CadastroLayout />,
        children: [
            {
                path: 'administrador',
                element: <CadastroAdm />
            },
            {
                path: 'proprietario',
                element: <CadastroPropietario />
            },
            {
                path: 'locatario',
                element: <CadastroLocatario />
            }
        ]
    },
    {
        path: '/perfil',
        element: <PerfilLayout />,
        children: [
            {
                path: 'administrador',
                element: <PerfilAdm />,
                props: { profileType: 'administrador' },
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                    },
                    // Outras rotas para administrador podem ir aqui
                ]
            },
            {
                path: 'proprietario',
                element: <PerfilProprietario />,
                props: { profileType: 'proprietario' }
            },
            {
                path: 'locatario',
                element: <PerfilLocatario />,
                props: { profileType: 'locatario' }
            }
        ]
    }
]);

export default router;
