import {createContext, useContext, useEffect, useState} from 'react'
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AuthContext = createContext(null);

const AuthProvider = props => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserRole, setLoggedUserRole] = useState(null);

    useEffect(() => {
        let authData = JSON.parse(sessionStorage.getItem("authData"));
        if (authData) {
            let username = atob(authData.userCredential.split(" ")[1]).split(":")[0].trim();
            let role = authData.userRole;
            login(username, role);
        }
    }, [])

    const login = (username, role) => {
        setLoggedUser(username);
        setLoggedUserRole(role);
    }

    const logout = () => {
        sessionStorage.removeItem("authData");
        toast('Logged out')

        setLoggedUser(null);
        setLoggedUserRole(null);
    }

    const isAuthorized = (username) => {
        return username === loggedUser;
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