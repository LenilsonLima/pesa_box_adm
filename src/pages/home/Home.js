import styles from './Home.module.scss';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ModalAcoes from '../../components/ModalAcoes';
import ModalConfirmarCancelar from '../../components/ModalConfirmarCancelar';
import { bloquearUsuario, removerDados } from '../../funcoes';

const Home = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioClicado, setUsuarioClicado] = useState({});
    const [openCloseModalAcoes, setOpenCloseModalAcoes] = useState(false);
    const [openCloseModalConfirmar, setOpenCloseModalConfirmar] = useState(false);
    const [opcaoSelecionadaModalConfirmar, setOpcaoSelecionadaModalConfirmar] = useState();
    const { setLoading } = useOutletContext();

    const handleUsuarioClicado = (usuario) => {
        setUsuarioClicado(usuario);
        setOpenCloseModalAcoes(true);
    }
    const requestUsuarios = async () => {
        const token = localStorage.getItem('@pesabox_adm_token');
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            setLoading(true);
            setUsuarios([]);
            const response = await axios.get('https://api-pesagem-chi.vercel.app/adm', requestOptions);
            setUsuarios(response.data.registros);
        } catch (error) {
            alert(error.response.data.retorno.mensagem);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        requestUsuarios();
    }, []);


    const confirmarBloqueio = () => {
        setOpcaoSelecionadaModalConfirmar(1);
        setOpenCloseModalConfirmar(true);
        setOpenCloseModalAcoes(false);
    }

    const confirmarRemover = () => {
        setOpcaoSelecionadaModalConfirmar(2);
        setOpenCloseModalConfirmar(true);
        setOpenCloseModalAcoes(false);
    }
    return (
        <div className={styles.container_home}>
            {openCloseModalAcoes &&
                <ModalAcoes
                    titulo='Selecione uma ação'
                    textoBtn1={usuarioClicado?.status === 0 ? 'Desbloquear' : 'Bloquear'}
                    textoBtn2='Remover'
                    func1={confirmarBloqueio}
                    func2={confirmarRemover}
                    funcFechar={() => setOpenCloseModalAcoes(false)}
                />
            }
            {openCloseModalConfirmar &&
                <ModalConfirmarCancelar
                    titulo={
                        opcaoSelecionadaModalConfirmar === 1 ?
                            `Deseja ${usuarioClicado?.status === 0 ? 'desbloquear' : 'bloquear'} o usuário "${usuarioClicado?.nome}"?`
                            :
                            `Deseja remover o usuário "${usuarioClicado?.nome}"?`
                    }
                    funcConfirmar={() => opcaoSelecionadaModalConfirmar === 1 ?
                        bloquearUsuario(`https://api-pesagem-chi.vercel.app/adm`, { id: usuarioClicado?.id, status: usuarioClicado?.status === 0 ? 1 : 0 }, setLoading, setOpenCloseModalConfirmar, requestUsuarios)
                        :
                        removerDados(`https://api-pesagem-chi.vercel.app/adm?id=${usuarioClicado?.id}`, setLoading, setOpenCloseModalConfirmar, requestUsuarios)
                    }
                    funcCancelar={() => setOpenCloseModalConfirmar(false)}
                />
            }
            <div className={styles.area_table}>
                {usuarios?.length > 0 &&
                    <table cellSpacing={0}>
                        <tbody>
                            {usuarios?.map((usuario, index) => (
                                <tr key={usuario?.id}>
                                    <td style={{ borderBottomWidth: index === (usuarios?.length - 1) ? 0 : 1 }}>
                                        <div>
                                            <MdVerifiedUser style={{ backgroundColor: usuario?.status == 1 ? '#56a368ff' : '#cb2027' }} />
                                        </div>
                                    </td>
                                    <td style={{ borderBottomWidth: index === (usuarios?.length - 1) ? 0 : 1 }}>
                                        <div>
                                            <span style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }}>{usuario?.nome}</span>
                                            <span style={{ color: usuario?.status == 1 ? 'gray' : '#cb2027' }}>{usuario?.email}</span>
                                        </div>
                                    </td>
                                    <td style={{ borderBottomWidth: index === (usuarios?.length - 1) ? 0 : 1 }}>
                                        <div>
                                            <span style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }}>{usuario?.status == 1 ? 'Ativo' : 'Inativo'}</span>
                                        </div>
                                    </td>
                                    <td style={{ borderBottomWidth: index === (usuarios?.length - 1) ? 0 : 1 }}>
                                        <div>
                                            <GoKebabHorizontal onClick={() => handleUsuarioClicado(usuario)} style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
export default Home;