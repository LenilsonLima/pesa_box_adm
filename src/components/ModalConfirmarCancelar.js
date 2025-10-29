import { CgClose } from 'react-icons/cg';
import styles from './ModalConfirmarCancelar.module.scss';

const ModalConfirmarCancelar = ({ titulo, funcConfirmar, funcCancelar }) => {
    return (
        <div className={styles.container_modal_confirmar}>
            <div className={styles.fechar_modal_confirmar} onClick={funcCancelar}></div>
            <div
                className={styles.area_modal_confirmar}
            >
                <div className={styles.area_texto}>
                    <p>{titulo}</p>
                </div>
                <CgClose onClick={funcCancelar} />
                <div className={styles.dividir}></div>
                <div className={styles.area_btn}>
                    <button type='button' onClick={funcConfirmar}>confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmarCancelar;
