
import { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import type { User } from '../types';
import authService from '../services/authService';

interface AuthContextType {
    user: User | null;
    login: (userData: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (userData: any) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await authService.login(userData);
            setUser(data);
        } catch (error: any) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isError, message }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
