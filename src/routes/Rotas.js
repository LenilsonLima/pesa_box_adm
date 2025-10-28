import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import RotasPrivadas from "./RotasPrivadas";
import RotasPublicas from "./RotasPublicas";
import SolicitarAlterarSenha from "../pages/alterar/senha/solicitar_alterar_senha/SolicitarAlterarSenha";
import LayoutLogin from "../components/LayoutLogin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RotasPrivadas />,
        children: [
            {
                path: '',
                element: <LayoutLogin />,
                children: [
                    {
                        path: '',
                        element: <Home />,
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <RotasPublicas />,
        children: [
            {
                path: '',
                element: <LayoutLogin />,
                children: [
                    {
                        path: '',
                        element: <Login />,
                    },
                    {
                        path: 'alterar/senha/solicitar',
                        element: <SolicitarAlterarSenha />,
                    }
                ]
            }
        ]
    }
])
const Rotas = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default Rotas;