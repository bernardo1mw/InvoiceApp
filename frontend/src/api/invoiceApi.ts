import axios from "axios";
import { Invoice } from "../interfaces/Invoice";

const API_URL = "http://localhost:8000/api"; // Ajuste a URL conforme necessário

// Função para fazer o upload de um arquivo XML
export const uploadInvoice = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/invoices/upload`, formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Lança um erro com a mensagem do backend
      throw new Error(error.response.data.message || "Internal Server Error");
    }
    // Lança um erro genérico se a resposta não for do axios
    throw error;
  }
};

// Função para obter todas as notas fiscais
export const fetchInvoices = async (
  page: number = 1,
  perPage: number = 10
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/invoices?page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { data: [], current_page: 1, last_page: 1 }; // Retorna uma estrutura de resposta padrão para evitar erros
  }
};

// Função para obter uma nota fiscal específica pelo ID
export const fetchInvoiceById = async (id: string): Promise<Invoice> => {
  try {
    const response = await axios.get(`${API_URL}/invoices/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Lança um erro com a mensagem do backend
      throw new Error(error.response.data.message || "Internal Server Error");
    }
    // Lança um erro genérico se a resposta não for do axios
    throw error;
  }
};

export const downloadInvoice = async (filename: string) => {
  try {
    const response = await axios.get(`${API_URL}/download/${filename}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // ou use o nome completo do arquivo
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Erro ao baixar arquivo:", error);
    alert("Erro ao baixar o arquivo.");
  }
};
