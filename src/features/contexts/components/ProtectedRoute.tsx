import {useAuth} from "./AuthProvider.tsx";
import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();
    console.log('test:::',isAuthenticated);
    console.log('test:::==>',isAuthenticated);
    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
    )
}
export default ProtectedRoute;