import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setNavigate } from "../navigationService";

function NavigationProvider() {
    const navigate = useNavigate();
    setNavigate(navigate);
    return null;
}

const RotasPrivadas = () => {
    const token = localStorage.getItem("@pesabox_adm_token");
    return token ? (
        <>
            <NavigationProvider />
            <Outlet />
        </>
    ) : <Navigate to="/login" />;
};

export default RotasPrivadas;
