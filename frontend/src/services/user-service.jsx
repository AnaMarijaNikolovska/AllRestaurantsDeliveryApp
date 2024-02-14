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

const LoginUser = async (loginForm) => {
    try {
        const response = await axios.post(`${usersRoute}/login`, loginForm);
        axios.defaults.headers.common['Authorization'] = BasicAuth(response.data.username, response.data.password);

        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

const RegisterUser = (userForm) => {
    return axios.post(`${usersRoute}`, userForm);
}

const UpdateUser = async (id, loginForm) => {
    try {
        const response = await axios.post(`${usersRoute}/${id}`, loginForm);
        return response.data;
    } catch (error) {
        console.error("An Error Occured:", error);
    }
}

const GetUser = (username) => {
    return axios.get(`${usersRoute}/${username}`);
}

const GetAllUsers = () => {
    return axios.get(`${usersRoute}`);
}

const GetUserById = async (id) => {
    try {
        const response = await axios.get(`${usersRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

const GetInactiveManagers = async () => {
    try {
        const response = await axios.get(`${usersRoute}/managers/inactive`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

export {
    UserRole,
    LoginUser,
    RegisterUser,
    GetUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    GetInactiveManagers,
    BasicAuth
}