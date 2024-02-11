import {GetAllOrders} from "../services/order-service";

export const orderLoader = async ({params}) => {
    const orders = await GetAllOrders(params);
    return {orders};
}