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
import Imoveis from "./components/perfil/Imoveis";
import Locatarios from "./components/perfil/Locatarios";
import ContratosDeLoc from "./components/perfil/ContratosDeLoc";
import Manutencao from "./components/perfil/Manutencao";
import Pagamentos from "./components/perfil/Pagamentos";
import Documentos from "./components/perfil/Documentos";
import Proprietarios from "./components/perfil/Proprietarios";

import PrivateRoute from './privateRoute/privateRoute.js'; // Ajuste o caminho conforme necessário

import DashboardProprietario from "./components/perfil/DashboardProprietario";
import ImoveisProprietario from "./components/perfil/ImoveisProprietario";
import ContratosProprietario from "./components/perfil/ContratosProprietario";
import ManutencaoProprietario from "./components/perfil/ManutencaoProprietario";
import PagamentoProprietario from "./components/perfil/PagamentoProprietario";
import DocumentoProprietario from "./components/perfil/DocumentoProprietario";
import ConfiguracaoProprietario from "./components/perfil/ConfiguracaoProprietario";
import ConfiguracaoLocatario from "./components/perfil/ConfiguracaoLocatario";
import ContratosLocatario from './components/perfil/ContratosLocatario'
import ManutencaoLocatario from "./components/perfil/ManutencaoLocatario";
import PagamentosLocatario from "./components/perfil/PagamentosLocatarios";
import DocumentosLocatario from "./components/perfil/DocumentosLocatario";


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
        element: <PrivateRoute><PerfilLayout /></PrivateRoute>,
        children: [
            {
                path: 'administrador',
                element: <PrivateRoute><PerfilAdm /></PrivateRoute>,
                children: [
                    {
                        path: 'dashboard',
                        element: <PrivateRoute><Dashboard /></PrivateRoute>,
                    },
                    {
                        path:'imoveis',
                        element:<PrivateRoute><Imoveis /></PrivateRoute>
                    },
                    {
                        path:'locatarios',
                        element:<PrivateRoute><Locatarios /></PrivateRoute>
                    },
                    {
                        path:'contratoslocacao',
                        element:<PrivateRoute><ContratosDeLoc /></PrivateRoute>
                    },
                    {
                        path:'manutencao',
                        element:<PrivateRoute><Manutencao /></PrivateRoute>
                    },
                    {
                        path:'pagamentos',
                        element:<PrivateRoute><Pagamentos /></PrivateRoute>
                    },
                    {
                        path:'documentos',
                        element:<PrivateRoute><Documentos /></PrivateRoute>
                    },
                    {
                        path:'proprietarios',
                        element:<PrivateRoute><Proprietarios /></PrivateRoute>
                    }
                ]
            },
            {
                path: 'proprietario',
                element: <PrivateRoute><PerfilProprietario /></PrivateRoute>,
                props: { profileType: 'proprietario' },
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardProprietario />,
                    },
                    {
                        path: 'imoveis',
                        element: <ImoveisProprietario />,
                    },
                    {
                        path:'contratos',
                        element:<ContratosProprietario/>
                    },
                    {
                        path:'manutencao',
                        element:<ManutencaoProprietario/>
                    },{
                        path:'pagamentos',
                        element:<PagamentoProprietario/>
                    },{
                        path:'documentos',
                        element:<DocumentoProprietario/>
                    },{
                        path:'configuracao',
                        element:<ConfiguracaoProprietario/>
                    }
                ]

            },
            {
                path: 'locatario',
                element: <PrivateRoute><PerfilLocatario /></PrivateRoute>,
                props: { profileType: 'proprietario' },
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardProprietario />,
                    },
                    {
                        path: 'imoveis',
                        element: <ImoveisProprietario />,
                    },
                    {
                        path:'contratos',
                        element:<ContratosProprietario/>
                    },
                    {
                        path:'manutencao',
                        element:<ManutencaoProprietario/>
                    },{
                        path:'pagamentos',
                        element:<PagamentoProprietario/>
                    },{
                        path:'documentos',
                        element:<DocumentoProprietario/>
                    },{
                        path:'configuracao',
                        element:<ConfiguracaoProprietario/>
                    }
                ]
            },
            {
                path: 'locatario',
                element: <PerfilLocatario />,
                props: { profileType: 'locatario' },
                children: [
                    {
                        path: 'meusContratos',
                        element: <ContratosLocatario />,
                    },
                    {
                        path: 'manutencao',
                        element: <ManutencaoLocatario />,
                    },
                    {
                        path: 'pagamento',
                        element: <PagamentosLocatario />,
                    },
                    {
                        path: 'documentos',
                        element: <DocumentosLocatario/>,
                    },
                    {
                        path: 'configuracao',
                        element: <ConfiguracaoLocatario />,
                    }
                ]
            }
        ]
    }
]);

export default router;
