import { MdLogout, MdOutlineClose } from 'react-icons/md';
import styles from './MenuComponent.module.scss';
import { useNavigate } from 'react-router-dom';
import { LuUsers } from 'react-icons/lu';
import { RiUserSettingsLine } from 'react-icons/ri';

const MenuComponent = ({ setOpenCloseMenu }) => {
    const navigation = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        navigation('/login');
    }

    return (
        <div className={styles.container_menu}>
            <div className={styles.body_menu}>
                <div className={styles.area_menu}>
                    <div className={styles.menu}>
                        <div className={styles.area_close}>
                            <span>MENU</span>
                            <MdOutlineClose onClick={() => setOpenCloseMenu(false)} />
                        </div>
                        <ul>
                            <li onClick={() => {
                                navigation('/alterar/usuario');
                                setOpenCloseMenu(false);
                            }}>
                                <span>Perfil</span>
                                <RiUserSettingsLine />
                            </li>
                            <li onClick={() => {
                                navigation('/');
                                setOpenCloseMenu(false);
                            }}>
                                <span>Usuários</span>
                                <LuUsers />
                            </li>
                            <li onClick={handleLogout}>
                                <span>Sair</span>
                                <MdLogout />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MenuComponent;