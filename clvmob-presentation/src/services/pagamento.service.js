import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";
import Cookies from "js-cookie";

export async function getPagamento() {  
    try {
      const response = await axios.get(`${baseURL}/pagamento/user`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }

  export async function getPagamentoAdmin() {
    try {
      const response = await axios.get(`${baseURL}/pagamento/admin/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
      return response
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  }

