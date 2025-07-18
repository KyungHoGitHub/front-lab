import {useAuth} from "./AuthProvider.tsx";
import {Navigate, Outlet, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {validationToken} from "../api/conxext.ts";
import {TokenStatus} from "../type/Status.ts";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

interface ProtectedRouteProps {
    allowedRoles : string[];
}

const ProtectedRoute = ({allowesRoles}) => {
    const {token, logout, isAuthenticated} = useAuth();
    // 유효 여부 값
    const [isVerified, setIsVerified] = useState<boolean>(false);


    // 값 싱태갑 변경에 따른 체크 하기 위해
    useEffect(() => {
        // 토큰 유효 체크 api 함수 (비동기) 선언
        const checkToken = async () => {
            if (!token) {
                setIsVerified(false);
                return;
            }
            try {
                const res = await validationToken(token);
                if (res.data === TokenStatus.VALID) {
                    setIsVerified(true);
                } else {
                    logout();
                    toast.warning("유효한 접근이 아닙니다.");
                }
            } catch (e) {
                setIsVerified(false);
                logout();
                toast.warning("유효한 접근이 아닙니다.");
            }
        }
        checkToken();
    }, []);

    const decoded = jwtDecode(token);
    console.log('디코딩 된 토큰값-->',decoded);
    const location = useLocation();
    if (!decoded.role || !allowesRoles.includes(decoded.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet/>
}
export default ProtectedRoute;