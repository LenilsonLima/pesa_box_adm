import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './AlterarUsuario.module.scss';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiUserLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import ModalConfirmarCancelar from '../../../components/ModalConfirmarCancelar';
import { bloquearUsuario, buscarDados, updateUsuario } from '../../../funcoes';

const AlterarUsuario = () => {
    const navigation = useNavigate();
    const { setLoading } = useOutletContext();
    const [usuario, setUsuario] = useState([]);
    const [openCloseModalConfirmar, setOpenCloseModalConfirmar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        if (!formValues?.email || !formValues?.nome) {
            return alert('Todos os campos devem ser preenchidos, tente novamente.')
        }

        updateUsuario('/usuario', formValues, setLoading);
    }

    const requestUsuario = async () => {
        buscarDados('/usuario', setUsuario, setLoading);
    }

    useEffect(() => {
        requestUsuario();
    }, []);

    const desativarUsuario = async () => {
        await bloquearUsuario('/usuario/block', setLoading, setOpenCloseModalConfirmar, requestUsuario);
        localStorage.clear();
        navigation('/login');
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
                            defaultValue={usuario[0]?.nome}
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
                            defaultValue={usuario[0]?.email}
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