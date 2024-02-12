import axios from "axios";
import {toast} from 'react-toastify';

const usersRoute = "/users";

const UserRole = {
    Potrosuvac: 'USER',
    Vozac: 'DRIVER',
    Admin: 'ADMIN',
    Menager: 'MANAGER'
}

const BasicAuth = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

// const LoginUser = (loginForm) => {
//     return axios.post(`${usersRoute}/login`, loginForm)
// }

const LoginUser = async (loginForm) => {
    try {
        const response = await axios.post(`${usersRoute}/login`, loginForm);
        axios.defaults.headers.common['Authorization'] = BasicAuth(response.data.username, response.data.password);

        toast.success("Welcome back");
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
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

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${usersRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

export {UserRole, LoginUser, RegisterUser, GetUser, GetAllUsers, getUserById, BasicAuth}