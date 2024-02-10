import axios from "axios";

const restorantRoute = "/restorants";

const GetAllRestaurants = async () => {
    try {
        const response = await axios.get(restorantRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const GetRestourant = async (id) => {
    try {
        const response = await axios.get(`${restorantRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const CreateRestorant = async (formData) => {
    try {
        const response = await axios.post(`${restorantRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const UpdateRestorant = async (id, formData) => {
    try {
        const response = await axios.post(`${restorantRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export {GetAllRestaurants, GetRestourant, CreateRestorant, UpdateRestorant}