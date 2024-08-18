import axios from "axios";
const baseURL = "http://localhost:10001";
// const baseURL = "https://api-clvimob.onrender.com";
import Cookies from "js-cookie";

export async function getContract() {
    try {
      const response = await axios.get(`${baseURL}/contract/byUser/`, {  
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