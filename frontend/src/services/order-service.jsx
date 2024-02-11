import axios from "axios";

const orderRoute = "/orders";

const OrderStatus = {
    PendingUserApproval: 'PendingUserApproval',
    PendingAdminApproval: 'PendingAdminApproval',
    Approved: 'Approved',
    Delivering: 'Delivering',
    Finished: 'Finished',
    Terminated: 'Terminated'
}

const GetAllOrders = async (status) => {
    try {
        const response = await axios.get(`${orderRoute}`, {
            params: {
                status: status
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const CreateOrder = async (formData) => {
    try {
        const response = await axios.post(`${orderRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const UpdateOrder = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const DeleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${orderRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const AssignOrderDriver = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}/driver`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const AssignOrderAdmin = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}/admin`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export {GetAllOrders, CreateOrder, UpdateOrder, DeleteOrder, OrderStatus, AssignOrderDriver, AssignOrderAdmin}
