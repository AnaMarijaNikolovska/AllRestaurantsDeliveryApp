import {GetRestourant} from "../services/restoran-service";
import {GetActiveOrder} from "../services/order-service";
import {UserRole} from "../services/user-service";

export const restorantLoader = async ({request, loggedUserRole, ownershipChanges}) => {
    const restorant = await GetRestourant(request.params.restorantId);
    let activeOrder = null

    if (loggedUserRole?.role === UserRole.Potrosuvac && loggedUserRole?.activeOwnershipId) {
        activeOrder = await GetActiveOrder(loggedUserRole.roleId)

        if (!activeOrder) {
            ownershipChanges(null);
        }
    }

    return {restorant, activeOrder};
}