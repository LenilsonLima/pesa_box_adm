import { Outlet, useLocation } from 'react-router-dom';
import styles from './LayoutPrivate.module.scss';
import { useState } from 'react';
import LoadingComponent from './LoadingComponent';
import { IoMdMenu } from 'react-icons/io';
import MenuComponent from '../components/MenuComponent';

const LayoutPrivate = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [openCloseMenu, setOpenCloseMenu] = useState(false);

    return (
        <div className={styles.container_layout}>
            {openCloseMenu &&
                <MenuComponent setOpenCloseMenu={setOpenCloseMenu} />
            }

            {
                loading &&
                <div className={styles.overlay}>
                    <LoadingComponent />
                </div>
            }
            <div className={styles.area_layout}>
                <div className={styles.header}>
                    <span>Bem Vindo ao PesaBox</span>
                    <IoMdMenu onClick={() => setOpenCloseMenu(true)} />
                </div>
                <div className={styles.area_form}>
                    <Outlet context={{ setLoading }} />
                </div>
            </div>
        </div >
    )
}
export default LayoutPrivate;