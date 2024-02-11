import {getRestourant} from "../services/restoran-service";
import {getUserById, UserRole} from "../services/user-service";
import {GetVehicleByDriverId} from "../services/vehicle-service";

export const userLoader = async ({params}) => {
    const user = await getUserById(params.userId);

    let vehicle = undefined;
    if (user.role === UserRole.Vozac) {
        vehicle = await GetVehicleByDriverId(user.roleId)
    }

    return {user, vehicle};
}