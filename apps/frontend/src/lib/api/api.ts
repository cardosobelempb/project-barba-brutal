// Importação das dependências necessárias
import axios, { AxiosInstance } from "axios"; // Importação do axios e tipagem para instância do axios
import { parseCookies } from "nookies"; // Função para obter cookies, útil tanto no lado do cliente quanto no lado do servidor

// URL base da API. Utiliza a variável de ambiente para definir o URL ou um valor padrão para desenvolvimento.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/**
 * Função responsável por configurar e criar a instância do cliente da API
 * @param ctx - Contexto para parseCookies no servidor, necessário para SSR (Server Side Rendering).
 * @returns Instância do axios configurada com os headers e URL base.
 */
export function setupAPIClient(ctx?: undefined): AxiosInstance {
  // Obtém os cookies do contexto, caso esteja disponível (útil no SSR)
  const cookies = parseCookies(ctx);

  // Criação da instância do axios com o baseURL configurado e o token de autenticação no header
  const api = axios.create({
    baseURL: BASE_URL, // Define a URL base para todas as requisições
    headers: {
      Authorization: `Bearer ${cookies["belezixaadmin.accessToken"]}`, // Adiciona o token de acesso nos headers para autenticação
    },
  });

  return api; // Retorna a instância configurada do axios
}

// Instância padrão da API, sem contexto (padrão para uso no cliente)
export const api = setupAPIClient(); // Instancia a API com os cookies do cliente, sem contexto
