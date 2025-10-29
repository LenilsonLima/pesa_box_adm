import axios from "axios";

const token = localStorage.getItem('@pesabox_adm_token');

export const removerDados = async (url, setRecarregar, setOpenCloseModal, requestDados) => {
    setRecarregar(true);
    setOpenCloseModal(false);
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await axios.delete(url, requestOptions);
        alert(response?.data?.retorno.mensagem);
        console.log(response.data);
        requestDados();
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao remover registro, tente novamente.');
        setRecarregar(false);
    }
}

export const bloquearUsuario = async (url, body, setRecarregar, setOpenCloseModal, requestDados) => {
    setRecarregar(true);
    setOpenCloseModal(false);

    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await axios.put(url, body, requestOptions);
        alert(response?.data?.retorno.mensagem);
        requestDados();
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao alterar registro, tente novamente.');
        setRecarregar(false);
    }
}