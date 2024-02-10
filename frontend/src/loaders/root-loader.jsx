import {getAllRestaurants} from "../services/restoran-service";
import {GetAllUsers} from "../services/user-service";

export const rootLoader = async () => {
    const restorants = await getAllRestaurants();
    const users = await GetAllUsers()
    return {restorants, users};
}