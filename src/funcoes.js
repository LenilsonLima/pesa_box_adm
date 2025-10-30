import ApiAxios from './apiAxios';
export const buscarDados = async (url, setDados, setLoading) => {
    setLoading(true);
    try {
        const response = await ApiAxios.get(url);
        setDados(response.data.registros || []);
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao buscar dados, tente novamente.');
    } finally {
        setLoading(false);
    }
}

export const removerDados = async (url, setLoading, setOpenCloseModal, requestDados) => {
    setLoading(true);
    setOpenCloseModal(false);
    try {
        const response = await ApiAxios.delete(url);
        alert(response?.data?.retorno.mensagem);
        requestDados();
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao remover registro, tente novamente.');
        setLoading(false);
    }
}

export const bloquearUsuario = async (url, setLoading, setOpenCloseModal, requestDados) => {
    setLoading(true);
    setOpenCloseModal(false);

    try {
        const response = await ApiAxios.put(url);
        alert(response?.data?.retorno.mensagem);
        requestDados();
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao alterar registro, tente novamente.');
        setLoading(false);
    }
}

export const updateUsuario = async (url, body, setLoading) => {
    setLoading(true);

    try {
        const response = await ApiAxios.put(url, body);
        alert(response?.data?.retorno.mensagem);
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao alterar registro, tente novamente.');
    } finally {
        setLoading(false);
    }
}

export const updateSenha = async (url, body, setLoading, navigation) => {
    setLoading(true);

    try {
        const response = await ApiAxios.put(url, body);
        alert(response?.data?.retorno.mensagem);
        navigation('/', { replace: true });
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao alterar registro, tente novamente.');
    } finally {
        setLoading(false);
    }
}