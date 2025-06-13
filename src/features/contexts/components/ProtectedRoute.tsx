import {useAuth} from "./AuthProvider.tsx";
import {Navigate, Outlet, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {validationToken} from "../api/conxext.ts";
import {TokenStatus} from "../type/Status.ts";
import {toast} from "react-toastify";

const ProtectedRoute = () => {
    const {token, logout, isAuthenticated} = useAuth();
    // 유효 여부 값
    const [isVerified, setIsVerified] = useState<boolean>(false);


    const location = useLocation();
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
                    console.log("여기 1번")
                    toast.warning("유효한 접근이 아닙니다.");
                }
            } catch (e) {
                setIsVerified(false);
                console.log("여기 2번", e)
                logout();
                toast.warning("유효한 접근이 아닙니다.");
            }
        }
        checkToken();
    }, []);

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
    )
}
export default ProtectedRoute;