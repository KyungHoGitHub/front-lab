import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
    token: string | null;
    login : (token:string) => void;
    user:string;
    logout: ()=> void;
    isAuthenticated: boolean;
}
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>{
    // const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<{ role: string } | null>(
        token ? jwtDecode(token) : null
    );

    const login = (newToken: string) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        setUser(jwtDecode(newToken));
        // navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
        window.location.href = '/login';
        // navigate('/login');
    };

    if (isLoading) {
        return <div>Loading...</div>; // 초기 검증 중 로딩 UI
    }




    return(
        <AuthContext.Provider value={{token, user,login, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useauth must not');
    }
    return context;
}