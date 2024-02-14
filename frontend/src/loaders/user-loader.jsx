import {getRestourant} from "../services/restoran-service";
import {GetInactiveManagers, GetUserById, UserRole} from "../services/user-service";
import {GetVehicleByDriverId} from "../services/vehicle-service";
import {GetAllOrders, GetMyOrders} from "../services/order-service";
import {GetCustomerPayments} from "../services/payment-service";

export const userLoader = async ({params}) => {
    const user = await GetUserById(params.userId);

    let vehicle = undefined;
    if (user.role === UserRole.Vozac) {
        vehicle = await GetVehicleByDriverId(user.roleId)
    }

    return {user, vehicle};
}

export const userOrderLoader = async ({params}) => {
    const orders = await GetMyOrders(params.userId);
    return {orders};
}

export const userPaymentLoader = async ({params}) => {
    const payments = await GetCustomerPayments(params.userId);
    return {payments};
}

export const inactiveMenagerLoader = async () => {
    const inactiveMenagers = await GetInactiveManagers();
    return {inactiveMenagers}
}
