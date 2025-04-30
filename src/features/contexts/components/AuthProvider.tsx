import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

interface AuthContextType {
    token: string | null;
    login : (token:string) => void;
    logout: ()=> void;
    isAuthenticated: boolean;
}
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>{
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();


    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        // navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // navigate('/login');
    };

    if (isLoading) {
        return <div>Loading...</div>; // 초기 검증 중 로딩 UI
    }

    console.log('toekn ---------->', token)
    console.log('toekn ---------->', localStorage.getItem('token'))


    return(
        <AuthContext.Provider value={{token, login, logout, isAuthenticated: !!token}}>
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