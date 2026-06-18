import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: number,
    token: string,
    name: string;
    email: string;
    phone: string; 
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    update: (newFields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = sessionStorage.getItem('user_session');
        return saved ? JSON.parse(saved) : null;
    });
    const navigate = useNavigate();

    const login = (userData: User) =>{
        setUser(userData);
        sessionStorage.setItem('user_session', JSON.stringify(userData));
    }   

    const logout = () => { 
        setUser(null); 
        navigate('/');
        sessionStorage.removeItem('user_session');
    }

    const update = (newFields: Partial<User>) => {

        if (user) {
            const updatedUser = {...user, ...newFields}; //unpacks user and newFields and merges them

            setUser(updatedUser);

            sessionStorage.setItem('user_session', JSON.stringify(updatedUser));
        }

    }

    return (
        <AuthContext.Provider value={{user, login, logout, update}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}

