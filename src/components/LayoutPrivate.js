import { Outlet, useLocation } from 'react-router-dom';
import styles from './LayoutPrivate.module.scss';
import { useState } from 'react';
import LoadingComponent from './LoadingComponent';

const LayoutPrivate = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    return (
        <div className={styles.container_layout}>
            {loading ?
                <LoadingComponent />
                :
                <div className={styles.area_layout}>
                    <div className={styles.left}>
                        <img src='https://cdn-icons-png.flaticon.com/512/15558/15558035.png' alt='Img logo' />
                    </div>
                    <div className={styles.rigth}>
                        <div className={styles.area_form}>
                            <Outlet context={{ setLoading }} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default LayoutPrivate;