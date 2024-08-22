import axios from "axios";
// const baseURL = "http://localhost:10001";
const baseURL = "https://api-clvimob.onrender.com";
import Cookies from "js-cookie";

export async function getManutencao() {
  try {
    const response = await axios.get(`${baseURL}/manutencao/byUser`, {
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


export async function getAllManutencao() {
  try {
    const response = await axios.get(`${baseURL}/manutencao/`, {
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

export async function createManutencao(newManutencao) {
  try {
    const response = await axios.post(`${baseURL}/manutencao/`, newManutencao, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
}


export async function deleteManutencao(IdManutencao) {
  try {
    const response = await axios.delete(`${baseURL}/manutencao/${IdManutencao}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Erro ao excluir manutenção:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
}


export async function editManutencao(id, data) {
  try {
    const response = await axios.put(`${baseURL}/manutencao/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Erro ao atualizar manutenção:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
}