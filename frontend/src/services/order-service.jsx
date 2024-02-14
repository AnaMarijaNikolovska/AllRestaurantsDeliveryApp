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

const GetAllOrders = async (statuses) => {
    try {
        const response = await axios.get(`${orderRoute}`, {
            params: {
                statuses: statuses
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const CreateOrder = async (formData) => {
    try {
        const response = await axios.post(`${orderRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const UpdateOrder = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const DeleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${orderRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const GetOrder = async (id) => {
    try {
        const response = await axios.get(`${orderRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const AssignOrderDriver = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}/driver`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const AssignOrderAdmin = async (id, formData) => {
    try {
        const response = await axios.post(`${orderRoute}/${id}/admin`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const GetMyOrders = async (id) => {
    try {
        const response = await axios.get(`${orderRoute}/customer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

const OrderDomainToDtoMapper = (order) => {
    if (!order)
        return null;

    return {
        potrosuvacId: order.potrosuvac?.id,
        status: order.status,
        menuItems: order.narackaMenuItems?.map(nmp => ({menuItemId: nmp?.menuItem?.id, quantity: nmp.quantity})) ?? []
    }
}

const GetActiveOrder = async (id) => {
    try {
        const response = await axios.get(`${orderRoute}/customer/${id}/active`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
    }
};

export {
    GetAllOrders,
    GetOrder,
    CreateOrder,
    UpdateOrder,
    DeleteOrder,
    OrderStatus,
    AssignOrderDriver,
    AssignOrderAdmin,
    GetMyOrders,
    GetActiveOrder,
    OrderDomainToDtoMapper
}
