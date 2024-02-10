import {getAllRestaurants, getRestourant} from "../services/restoran-service";
import {GetAllUsers} from "../services/user-service";

export const restorantLoader = async ({params}) => {
    const restorant = await getRestourant(params.restorantId);
    return {restorant};
}