import {GetAllOrders} from "../services/order-service";
import {GetAllMenuItems} from "../services/menu-item-service";

export const menuItemLoader = async ({params}) => {
    const menuItems = await GetAllMenuItems();
    return {menuItems};
}