import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";
import Cookies from "js-cookie";


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

export function userLogado(){
    console.log(Cookies.get('token'));
    const response = axios.get(`${baseURL}/user/cookie`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,

        }
    })
    return response
}


