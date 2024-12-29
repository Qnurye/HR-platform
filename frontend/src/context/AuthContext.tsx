import {createContext} from 'react';

const AuthContext = createContext<{
    isAuthenticated: boolean;
}>({isAuthenticated: false});

export default AuthContext;
