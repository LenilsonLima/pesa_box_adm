import { Outlet, useLocation } from 'react-router-dom';
import styles from './LayoutLogin.module.scss';
import { useState } from 'react';
import LoadingComponent from './LoadingComponent';

const LayoutLogin = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    return (
        <div className={styles.container_layout}>
            {
                loading &&
                <div className={styles.overlay}>
                    <LoadingComponent />
                </div>
            }
            <div className={styles.area_layout}>
                <div className={styles.left}>
                    <img src='https://cdn-icons-png.flaticon.com/512/15558/15558035.png' alt='Img logo' />
                    {/* <img src='https://cdn-icons-png.flaticon.com/512/18242/18242131.png' alt='Img logo' /> */}
                </div>
                <div className={styles.rigth}>
                    <h2>{location.pathname === '/login' ?
                        'Área Administrativa'
                        :
                        location.pathname === '/login/alterar/senha/solicitar'
                            ?
                            'Alteração de senha'
                            :
                            'Redefinir Sua Senha'
                    }</h2>
                    <div className={styles.area_form}>
                        <Outlet context={{ setLoading }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LayoutLogin;