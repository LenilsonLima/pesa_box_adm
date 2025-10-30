import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from './RedefinirSenha.module.scss';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import ApiAxios from '../../../../apiAxios';

const RedefinirSenha = () => {
    const navigation = useNavigate();
    const { setLoading } = useOutletContext();
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const params = useParams();

    useEffect(() => {
        const handleVerificaTokenSenha = async () => {
            try {
                setLoading(true);
                const response = await ApiAxios.get(`usuario/token_senha?token_senha=${params?.token_senha}`);
                setLoading(false);
            } catch (error) {
                alert(error.response?.data.retorno.mensagem);
                localStorage.clear();
                navigation('/', { replace: true });
            }
        }
        handleVerificaTokenSenha();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('token_senha', params.token_senha);
        const formValues = Object.fromEntries(formData);

        if (formValues?.senha?.length < 4 || (formValues?.senha != formValues?.confirmar_senha)) {
            return alert('Os campos senha e confirmar senha devem ser preenchidos e conter ao menos 4 caracteres.')
        }

        try {
            setLoading(true);
            const response = await ApiAxios.put('/usuario/senha', formValues);
            alert(response.data.retorno.mensagem);
            navigation('/', { replace: true });
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.retorno.mensagem);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.area_form}>
                <div className={styles.input_form}>
                    <label>Senha</label>
                    <div className={styles.area_input}>
                        <input
                            type={senhaVisivel ? 'text' : 'password'}
                            placeholder='Informe sua senha aqui'
                            name='senha'
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
                <div className={styles.input_form}>
                    <label>Confirmar Senha</label>
                    <div className={styles.area_input}>
                        <input
                            type={senhaVisivel ? 'text' : 'password'}
                            placeholder='Confirmação de senha'
                            name='confirmar_senha'
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
                <button className={styles.conectar}>Alterar</button>
            </div>
        </form>
    )
}
export default RedefinirSenha;