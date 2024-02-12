import axios from "axios";

const restorantRoute = "/restorants";

const GetAllRestaurants = async () => {
    try {
        const response = await axios.get(restorantRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};

const GetRestourant = async (id) => {
    try {
        const response = await axios.get(`${restorantRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
};

const CreateRestorant = async (formData) => {
    try {
        const response = await axios.post(`${restorantRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const UpdateRestorant = async (id, formData) => {
    try {
        const response = await axios.post(`${restorantRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};


export {GetAllRestaurants, GetRestourant, CreateRestorant, UpdateRestorant}