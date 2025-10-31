import styles from './Home.module.scss';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ModalAcoes from '../../components/ModalAcoes';
import ModalConfirmarCancelar from '../../components/ModalConfirmarCancelar';
import { bloquearUsuario, buscarDados, removerDados } from '../../funcoes';
import { IoIosSearch, IoMdArrowDropdown } from 'react-icons/io';

const Home = () => {
    const [pesquisar, setPesquisar] = useState('');
    const [status, setStatus] = useState(3);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
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
        buscarDados('/adm', setUsuarios, setLoading);
    }

    useEffect(() => {
        requestUsuarios();
    }, []);

    const handleFiltro = () => {
        const termo = pesquisar?.toLowerCase() || "";
        const usuariosFiltradostemp = usuarios?.filter((item) => {
            const nomeMatch = item.nome?.toLowerCase().includes(termo);
            const emailMatch = item.email?.toLowerCase().includes(termo);
            const statusMatch = status == 3 ? true : String(item.status) === String(status);

            return (nomeMatch || emailMatch) && statusMatch;
        });

        setUsuariosFiltrados(usuariosFiltradostemp);
    };

    useEffect(() => {
        handleFiltro();
    }, [pesquisar, status, usuarios]);

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

    const bloquear = () => {
        bloquearUsuario(
            `/usuario/block?id=${usuarioClicado?.id || 0}`,
            setLoading,
            setOpenCloseModalConfirmar,
            requestUsuarios
        );
    }
    const remover = () => {
        removerDados(
            `${'/adm'}?id=${usuarioClicado?.id}`,
            setLoading,
            setOpenCloseModalConfirmar,
            requestUsuarios
        );
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
                    funcConfirmar={() => opcaoSelecionadaModalConfirmar === 1 ? bloquear() : remover()}
                    funcCancelar={() => setOpenCloseModalConfirmar(false)}
                />
            }
            {usuarios?.length > 0 &&
                <div className={styles.area_filtro}>
                    <div className={styles.label_filtro}>
                        <input type='text' placeholder='Nome ou e-mail' value={pesquisar} onChange={(e) => setPesquisar(e.target.value)} />
                        <IoIosSearch />
                    </div>
                    <div className={styles.label_filtro}>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="3">- mostrar todos -</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </select>
                        <IoMdArrowDropdown />
                    </div>
                </div>
            }
            {usuariosFiltrados?.length > 0 &&
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>##</th>
                            <th style={{ textAlign: 'left' }}>Info</th>
                            <th>Status</th>
                            <th>Tipo</th>
                            <th>##</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados?.map((usuario, index) => (
                            <tr onClick={() => handleUsuarioClicado(usuario)} key={usuario?.id}>
                                <td style={{ borderBottomWidth: index === (usuariosFiltrados?.length - 1) ? 0 : 1 }}>
                                    <div>
                                        <MdVerifiedUser style={{ backgroundColor: usuario?.status == 1 ? '#56a368ff' : '#cb2027' }} />
                                    </div>
                                </td>
                                <td style={{ borderBottomWidth: index === (usuariosFiltrados?.length - 1) ? 0 : 1 }}>
                                    <div>
                                        <span style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }}>{usuario?.nome}</span>
                                        <span style={{ color: usuario?.status == 1 ? 'gray' : '#cb2027' }}>{usuario?.email}</span>
                                    </div>
                                </td>
                                <td style={{ borderBottomWidth: index === (usuariosFiltrados?.length - 1) ? 0 : 1 }}>
                                    <div>
                                        <span style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }}>{usuario?.status == 1 ? 'Ativo' : 'Inativo'}</span>
                                    </div>
                                </td>
                                <td style={{ borderBottomWidth: index === (usuariosFiltrados?.length - 1) ? 0 : 1 }}>
                                    <div>
                                        <span style={{ color: usuario?.status == 1 ? '#000' : '#cb2027' }}>{usuario?.tipo == 1 ? 'ADM' : 'Apicultor'}</span>
                                    </div>
                                </td>
                                <td style={{ borderBottomWidth: index === (usuariosFiltrados?.length - 1) ? 0 : 1 }}>
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
    )
}
export default Home;