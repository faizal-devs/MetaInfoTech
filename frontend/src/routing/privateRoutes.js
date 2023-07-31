import { Navigate } from "react-router-dom";

export const privateRoutes = ({ children })=> {
    const getTokenFromLocalStorage =JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to='login' replace={true} />)
}