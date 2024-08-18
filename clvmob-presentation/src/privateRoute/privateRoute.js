import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { userLogado } from '../services/user.service.js'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom';
import ContratosLocatario from '../components/perfil/ContratosLocatario.jsx';

export default function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await userLogado();
                console.log(response)
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    useEffect(() => {
        if (loading === false && !isAuthenticated) {
            navigate('/login'); // Redireciona o usuário após a verificação
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading) {
        return null; // Um indicador de carregamento
    }

    if (isAuthenticated) {
        return children; // Renderiza os filhos se o usuário estiver autenticado
    }

    return null; // Retorna nulo enquanto redireciona
}
