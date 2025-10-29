import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './SolicitarAlterarSenha.module.scss';
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from 'axios';
import ApiUrl from '../../../../apiUrl';

const SolicitarAlterarSenha = () => {
    const navigation = useNavigate();
    const { setLoading } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        if (!formValues?.email) {
            return alert('Todos os campos devem ser preenchidos, tente novamente.')
        }

        try {
            setLoading(true);
            const response = await axios.post(ApiUrl.urlSolicitarLinkSenha, formValues, { headers: { 'Content-Type': 'application/json' } });
            alert(response.data.retorno.mensagem);

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
                    <label>E-mail</label>
                    <div className={styles.area_input}>
                        <input
                            type='email'
                            placeholder='Informe o e-mail para receber o link'
                            name='email'
                        />
                        <MdOutlineAlternateEmail />
                    </div>
                </div>
                <button className={styles.conectar}>Solicitar Link</button>
                <a onClick={() => navigation(-1)}>Voltar ao login</a>
            </div>
        </form>
    )
}
export default SolicitarAlterarSenha;