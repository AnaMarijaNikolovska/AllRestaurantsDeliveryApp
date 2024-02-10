import {GetRestourant} from "../services/restoran-service";

export const restorantLoader = async ({params}) => {
    const restorant = await GetRestourant(params.restorantId);
    return {restorant};
}