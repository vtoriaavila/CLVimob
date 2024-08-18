import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { userLogado } from '../services/user.service.js'; // Ajuste o caminho conforme necessário

export default function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // if (loading) {
    //     return <div>Loading...</div>; // Um indicador de carregamento
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    return children;
}
