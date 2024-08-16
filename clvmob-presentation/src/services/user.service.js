import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";


export function cadastro(data){
    const response = axios.post(`${baseURL}/user/`,data)
    return response;

}

export function login(data){
    const response = axios.post(`${baseURL}/auth`,data)
    return response
}


