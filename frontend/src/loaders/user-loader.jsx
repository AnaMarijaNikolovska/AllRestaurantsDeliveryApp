import {getRestourant} from "../services/restoran-service";
import {getUserById} from "../services/user-service";

export const userLoader = async ({params}) => {
    const user = await getUserById(params.userId);
    return {user};
}