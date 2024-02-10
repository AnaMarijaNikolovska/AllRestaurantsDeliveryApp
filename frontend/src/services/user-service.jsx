import axios from "axios";

const usersRoute = "/users";

const UserRole = {
    Potrosuvac: 'Potrosuvac',
    Vozac: 'Vozac',
    Admin: 'Admin',
    Menager: 'Menager'
}

const BasicAuth = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

const LoginUser = (loginForm) => {
    return axios.post(`${usersRoute}/login`, loginForm)
}

const RegisterUser = (userForm) => {
    return axios.post(`${usersRoute}`, userForm);
}

const GetUser = (username) => {
    return axios.get(`${usersRoute}/${username}`);
}

const GetAllUsers = () => {
    return axios.get(`${usersRoute}`);
}

export {UserRole, LoginUser, RegisterUser, GetUser, GetAllUsers, BasicAuth}