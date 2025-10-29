import { CgClose } from 'react-icons/cg';
import styles from './ModalAcoes.module.scss';

const ModalAcoes = ({ titulo, funcFechar, func1, func2, textoBtn1, textoBtn2 }) => {
    return (
        <div className={styles.container_modal_acoes}>
            <div className={styles.fechar_modal_acoes} onClick={funcFechar}></div>
            <div
                className={styles.area_modal_acoes}
            >
                <div className={styles.area_texto}>
                    <p>{titulo}</p>
                </div>
                <CgClose onClick={funcFechar}/>
                <div className={styles.dividir}></div>
                <div className={styles.area_btn}>
                    <button type='button' onClick={func1}>{textoBtn1}</button>
                    <button type='button' onClick={func2}>{textoBtn2}</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAcoes;
