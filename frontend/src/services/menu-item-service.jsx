import axios from "axios";

const menuItemRoute = "/menu-items";

const GetAllMenuItems = async () => {
    try {
        const response = await axios.get(menuItemRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};

const GetMenuItem = async (id) => {
    try {
        const response = await axios.get(`${menuItemRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};

const CreateMenuItem = async (formData) => {
    try {
        const response = await axios.post(`${menuItemRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const UpdateMenuItem = async (id, formData) => {
    try {
        const response = await axios.post(`${menuItemRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const DeleteMenuItem = async (id) => {
    try {
        const response = await axios.delete(`${menuItemRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};



export {GetAllMenuItems, GetMenuItem, CreateMenuItem, UpdateMenuItem, DeleteMenuItem}