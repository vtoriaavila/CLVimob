import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";
import Cookies from "js-cookie";

export async function getDespesa() {
    try {
      const response = await axios.get(`${baseURL}/despesa/byUser`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }

  export async function getAllDespesa() {
    try {
      const response = await axios.get(`${baseURL}/despesa/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }