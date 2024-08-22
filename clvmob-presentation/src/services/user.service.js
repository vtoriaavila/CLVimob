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

export async function userLogado(){
    const response =await axios.get(`${baseURL}/user/cookie`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,

        }
    })
    return response
}

export async function userEdit(data) {
    try {
        console.log('Dados enviados para atualização:', data);
        const response = await axios.patch(`${baseURL}/user/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error.message);
        if (error.response) {
            console.error('Resposta do erro:', error.response.data);
            console.error('Status do erro:', error.response.status);
            console.error('Cabeçalhos do erro:', error.response.headers);
        } else if (error.request) {
            console.error('Solicitação feita, mas sem resposta recebida:', error.request);
        } else {
            console.error('Erro na configuração da solicitação:', error.message);
        }
        console.error('Configuração da requisição:', error.config);
        console.error('Stack trace:', error.stack);
        throw error;
    }
}



export async function getAllUsers() {
    try {
      const response = await axios.get(`${baseURL}/user/`, {  
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }


  export async function getAllUsersProp() {
    try {
      const response = await axios.get(`${baseURL}/user/prop`, {  
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }

  export async function getAllUsersLoc() {
    try {
      const response = await axios.get(`${baseURL}/user/loc`, {  
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }
  
