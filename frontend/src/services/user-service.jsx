import axios from "axios";

const usersRoute = "/users";

const UserRole = {
    Potrosuvac: 'Potrosuvac',
    Vozac: 'Vozac',
    Admin: 'Admin',
    Menager: 'Menager'
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

export {UserRole, LoginUser, RegisterUser, GetUser}