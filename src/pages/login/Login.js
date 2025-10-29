import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './Login.module.scss';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from 'axios';
import ApiUrl from '../../apiUrl';

const Login = () => {
    const navigation = useNavigate();
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const { setLoading } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        if (!formValues?.email || !formValues?.senha) {
            return alert('Todos os campos devem ser preenchidos, tente novamente.')
        }

        try {
            setLoading(true);
            const response = await axios.post(ApiUrl.urlLogin, formValues, { headers: { 'Content-Type': 'application/json' } });
            localStorage.setItem('@pesabox_adm_nome', response.data.registros.nome);
            localStorage.setItem('@pesabox_adm_token', response.data.registros.token);
            localStorage.setItem('@pesabox_adm_email', response.data.registros.email);
            navigation('/');
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.retorno.mensagem);
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.area_form}>
                <div className={styles.input_form}>
                    <label>E-mail</label>
                    <div className={styles.area_input}>
                        <input
                            type='email'
                            placeholder='Informe seu e-mail aqui'
                            name='email'
                            autoComplete='username'
                        />
                        <MdOutlineAlternateEmail />
                    </div>
                </div>
                <div className={styles.input_form}>
                    <label>Senha</label>
                    <div className={styles.area_input}>
                        <input
                            type={senhaVisivel ? 'text' : 'password'}
                            placeholder='Informe sua senha aqui'
                            name='senha'
                            autoComplete='current-password'
                        />
                        {senhaVisivel ? (
                            <IoEyeOffOutline
                                onClick={() => setSenhaVisivel(false)}
                            />
                        ) : (
                            <IoEyeOutline
                                onClick={() => setSenhaVisivel(true)}
                            />
                        )}
                    </div>
                </div>
                <button className={styles.conectar}>Conectar-se</button>
                <a onClick={() => navigation('/login/alterar/senha/solicitar')}>Esqueceu a senha?</a>
            </div>
        </form>
    )
}
export default Login;