import axios from "axios";

const restorantRoute = "/restorants";

const getAllRestaurants = async () => {
    try {
        const response = await axios.get(restorantRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const getRestourant = async (id) => {
    try {
        const response = await axios.get(`${restorantRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export {getAllRestaurants, getRestourant}