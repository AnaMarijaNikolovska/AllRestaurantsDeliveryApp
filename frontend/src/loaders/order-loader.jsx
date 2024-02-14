import {GetAllOrders, OrderStatus} from "../services/order-service";

export const orderLoader = async ({request}) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("active");
    let statuses = null;

    if (searchTerm) {
        if (searchTerm === "true") {
            statuses = [OrderStatus.PendingAdminApproval, OrderStatus.Approved, OrderStatus.Delivering]
        } else {
            statuses = [OrderStatus.Finished, OrderStatus.Terminated]
        }
    }

    const orders = await GetAllOrders(statuses?.join(','));
    return {orders};
}