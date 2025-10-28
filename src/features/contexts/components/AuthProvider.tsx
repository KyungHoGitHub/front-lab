import React, {createContext, ReactNode, useContext, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useUserStore} from "../../../storage/userStore.ts";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    user: string;
    logout: () => void;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<{ role: string } | null>(

        token ? jwtDecode(token) : null
    );

    const login = (newToken: string) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        setUser(jwtDecode(newToken));
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        useUserStore.getState().clearUser();
        setToken(null);
        window.location.href = '/login';
    };

    if (isLoading) {
        return <div>Loading...</div>; // 초기 검증 중 로딩 UI
    }

    return (
        <AuthContext.Provider value={{token, user, login, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('use auth must not');
    }
    return context;
}