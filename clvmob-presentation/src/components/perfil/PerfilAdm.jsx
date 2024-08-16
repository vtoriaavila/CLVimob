import React from 'react';
import Dashboard from './Dashboard';
import Imoveis from './Imoveis';
import { Outlet } from 'react-router-dom';


export default function PerfilAdm() {
    return (
        <div>
            <h1>Página de Administração</h1>
            <p>Bem-vindo, Administrador!</p>
            <Outlet/>
            {/* <Dashboard/>
            <Imoveis/> */}
        </div>

    );
}
