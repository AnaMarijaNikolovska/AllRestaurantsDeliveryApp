import axios from "axios";

const vehicleRoute = "/vehicles";

const GetAllVehicles = async () => {
    try {
        const response = await axios.get(vehicleRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
    }
};

const GetVehicle = async (id) => {
    try {
        const response = await axios.get(`${vehicleRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
    }
};

const GetVehicleByDriverId = async (driverId) => {
    try {
        const response = await axios.get(`${vehicleRoute}/driver/${driverId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
    }
};

const CreateVehicle = async (formData) => {
    try {
        const response = await axios.post(`${vehicleRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const UpdateVehicle = async (id, formData) => {
    try {
        const response = await axios.post(`${vehicleRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const DeleteVehicle = async (id) => {
    try {
        const response = await axios.delete(`${vehicleRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};


export {GetAllVehicles, GetVehicle, GetVehicleByDriverId, CreateVehicle, UpdateVehicle, DeleteVehicle}