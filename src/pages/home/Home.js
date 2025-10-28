import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    const navigation = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigation('/login');
    }
    return (
        <div className={styles.container_home}>
            <div className={styles.card}>
                <span>Total de Usuários</span>
                <span>385</span>
            </div>
            <div className={styles.card}>
                <span>Usuários Ativos</span>
                <span>385</span>
            </div>
            <div className={styles.card}>
                <span>Usuários Inatvos</span>
                <span>385</span>
            </div>
            <div onClick={handleLogout} className={styles.card}>
                <span>Sair</span>
            </div>
        </div>
    )
}
export default Home;