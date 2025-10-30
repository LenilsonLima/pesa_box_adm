import ApiAxios from './apiAxios';

// BUSCAR DADOS
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

// REMOVER DADOS
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

// BLOQUEAR USUÁRIO
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

// ATUALIZAR USUÁRIO
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

// ATUALIZAR SENHA
export const updateSenha = async (url, body, setLoading, navigation) => {
    setLoading(true);

    try {
        const response = await ApiAxios.put(url, body);
        alert(response?.data?.retorno.mensagem);
        navigation('/', { replace: true });
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao alterar senha, tente novamente.');
    } finally {
        setLoading(false);
    }
}

// CRIAR REGISTRO
export const postDados = async (url, body, setLoading, navigation) => {
    setLoading(true);

    try {
        const response = await ApiAxios.post(url, body);
        alert(response?.data?.retorno.mensagem);
        navigation(-1);
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao criar registro, tente novamente.');
    } finally {
        setLoading(false);
    }
}

// LOGIN
export const loginPost = async (url, body, setLoading, navigation) => {
    setLoading(true);

    try {
        const response = await ApiAxios.post(url, body);
        localStorage.setItem('@pesabox_adm_nome', response.data.registros.nome);
        localStorage.setItem('@pesabox_adm_token', response.data.registros.token);
        localStorage.setItem('@pesabox_adm_email', response.data.registros.email);
        localStorage.setItem('@pesabox_adm_id', response.data.registros.id);
        navigation('/', { replace: true });
    } catch (error) {
        console.log(error.response.data);
        alert(error.response?.data?.retorno.mensagem || 'Erro ao realizar login, tente novamente.');
    } finally {
        setLoading(false);
    }
}