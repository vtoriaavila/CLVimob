import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";


export async function cadastro(data) {
    try {
        const response = await axios.post(`${baseURL}/user`, data);
        return response;
    } catch (error) {
        console.error('Erro ao fazer o cadastro:', error);
        throw error; // Propaga o erro para ser capturado pelo handleSubmit
    }
}


export function login(data){
    const response = axios.post(`${baseURL}/auth`,data)
    return response
}


