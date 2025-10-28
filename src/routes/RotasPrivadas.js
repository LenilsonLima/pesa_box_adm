import { Navigate, Outlet } from "react-router-dom";

const RotasPrivadas = () => {
    const token = localStorage.getItem("@pesabox_adm_token");
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default RotasPrivadas;
