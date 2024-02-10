import axios from "axios";

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

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${usersRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export {UserRole, LoginUser, RegisterUser, GetUser, GetAllUsers, getUserById, BasicAuth}