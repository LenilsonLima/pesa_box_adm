import axios from 'axios';
import { navigate } from './navigationService';

const ApiAxios = axios.create({
    baseURL: 'https://api-pesagem-chi.vercel.app',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' } // sem Authorization aqui
});

// Adiciona token em todos os requests
ApiAxios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('@pesabox_adm_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para tratar 401 e 403
ApiAxios.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.data?.retorno.status === 401 || error.response.data?.retorno.status === 403) {
            localStorage.clear();
            navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default ApiAxios;
