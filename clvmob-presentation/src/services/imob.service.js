import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-clvimob.onrender.com";

export async function getImobs() {
  try {
    const response = await axios.get(`${baseURL}/imob/byUser`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
}

export async function createImob(novoImovel) {
  try {
    const response = await axios.post(`${baseURL}/imob/`, novoImovel, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    console.log('Imóvel criado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar imóvel:', error);
    throw error;
  }
}

export async function deleteImob(idImovel) {
  try {
    const response = await axios.delete(`${baseURL}/imob/${idImovel}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    console.log('Imóvel deletado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar imóvel:', error);
    throw error;
  }
}

export async function idImovel(idImovel) {
  try {
    const response = await axios.get(`${baseURL}/imob/${idImovel}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    console.log('Imóvel achado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar imóvel:', error);
    throw error;
  }
}
