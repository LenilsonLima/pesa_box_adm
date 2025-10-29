import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './AlterarUsuario.module.scss';
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from 'axios';
import { RiUserLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import ModalConfirmarCancelar from '../../../components/ModalConfirmarCancelar';

const AlterarUsuario = () => {
    const navigation = useNavigate();
    const { setLoading } = useOutletContext();
    const [usuario, setUsuario] = useState({});
    const [openCloseModalConfirmar, setOpenCloseModalConfirmar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        if (!formValues?.email || !formValues?.nome) {
            return alert('Todos os campos devem ser preenchidos, tente novamente.')
        }

        const token = localStorage.getItem('@pesabox_adm_token');
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            setLoading(true);
            const response = await axios.put('https://api-pesagem-chi.vercel.app/usuario', formValues, requestOptions);
            alert(response.data.retorno.mensagem);
            navigation(-1);
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.retorno.mensagem);
        } finally {
            setLoading(false);
        }
    }

    const requestUsuario = async () => {
        const token = localStorage.getItem('@pesabox_adm_token');
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            setLoading(true);
            const response = await axios.get('https://api-pesagem-chi.vercel.app/usuario', requestOptions);
            setUsuario(response.data.registros[0] || {});
        } catch (error) {
            alert(error.response.data.retorno.mensagem);
            console.log(error.response.data);
            navigation(-1);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        requestUsuario();
    }, []);

    const desativarUsuario = async () => {
            setOpenCloseModalConfirmar(false);
        const token = localStorage.getItem('@pesabox_adm_token');
        const id = localStorage.getItem('@pesabox_adm_id');
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            setLoading(true);
            const body = { id: id, status: 0 };
            const response = await axios.put('https://api-pesagem-chi.vercel.app/adm', body, requestOptions);
            alert(response.data.retorno.mensagem);
            localStorage.clear();
            navigation('/login');
        } catch (error) {
            alert(error.response.data.retorno.mensagem);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {openCloseModalConfirmar &&
                <ModalConfirmarCancelar
                    titulo={'Deseja desativar seu usuário? Você perderá todo o acesso ao sistema.'}
                    funcConfirmar={() => desativarUsuario()}
                    funcCancelar={() => setOpenCloseModalConfirmar(false)}
                />
            }
            <div className={styles.area_form}>
                <div className={styles.input_form}>
                    <label>Nome</label>
                    <div className={styles.area_input}>
                        <input
                            type='text'
                            defaultValue={usuario?.nome}
                            placeholder='Informe seu nome aqui'
                            name='nome'
                        />
                        <RiUserLine />
                    </div>
                </div>
                <div className={styles.input_form}>
                    <label>E-mail</label>
                    <div className={styles.area_input}>
                        <input
                            type='email'
                            defaultValue={usuario?.email}
                            placeholder='Informe seu email aqui'
                            name='email'
                        />
                        <MdOutlineAlternateEmail />
                    </div>
                </div>
                <button className={styles.conectar}>Salvar Alteração</button>
                <a onClick={() => setOpenCloseModalConfirmar(true)}>Desativar usuário</a>
            </div>
        </form>
    )
}
export default AlterarUsuario;