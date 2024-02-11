import {createContext, useContext, useEffect, useState} from 'react'
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {BasicAuth} from "../services/user-service";

const AuthContext = createContext(null);

const AuthProvider = props => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserRole, setLoggedUserRole] = useState(null);

    useEffect(() => {
        let authData = JSON.parse(sessionStorage.getItem("authData"));
        if (authData) {
            let roleUser = {
                roleId: authData.userRoleId,
                role: authData.userRole
            }

            login(authData.userId, roleUser);
        }
    }, [])

    const login = (id, role) => {
        setLoggedUser(id);
        setLoggedUserRole(role);
    }

    const logout = () => {
        sessionStorage.removeItem("authData");
        toast('Logged out');

        setLoggedUser(null);
        setLoggedUserRole(null);
        axios.defaults.headers.common['Authorization'] = null;
    }

    const isAuthorized = (id) => {
        return id === loggedUserRole?.roleId;
    }

    return (
        <AuthContext.Provider
            value={{
                loggedUser: loggedUser,
                loggedUserRole: loggedUserRole,
                login: login,
                logout: logout,
                isAuthorized: isAuthorized,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('authContext must be used within a AuthProvider')
    }
    return context
}

const RequireAuth = ({children}) => {
    let auth = useAuthContext();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

const SkipAuth = ({children}) => {
    let auth = useAuthContext();
    let location = useLocation();

    if (auth.user) {
        return <Navigate to={location} replace/>;
    }

    return children;
}

export {AuthProvider, useAuthContext, RequireAuth, SkipAuth, AuthConsumer}