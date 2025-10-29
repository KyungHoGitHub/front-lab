import {useAuth} from "./AuthProvider.tsx";
import {Navigate, Outlet, useLoaderData} from "react-router";
import {useEffect, useState} from "react";
import {validationToken} from "../api/conxext.ts";
import {TokenStatus} from "../type/Status.ts";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

interface Decode {
    exp: number;
    role: string;
    sub: string;
    userId: string;
    userIdx: string;
}


const ProtectedRoute = () => {
    const { allowedRoles } = useLoaderData() as { allowedRoles: string[] };
    console.log("로더 데이터 확인", allowedRoles);
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

    if (!token || typeof token !== "string") {
        return <Navigate to="/login" replace />;
    }

    const decoded = jwtDecode<Decode>(token);


    // if (!decoded.role || !allowedRoles.includes(decoded.role)) {
    //     return <Navigate to="/login" replace/>;
    // }
    return <Outlet/>
}
export default ProtectedRoute;