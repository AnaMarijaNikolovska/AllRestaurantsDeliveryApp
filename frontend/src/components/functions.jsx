import moment from "moment";

export const truncate = (str, truncateLength = 10, strLength = 15) => {
    return str.length > strLength ? str.substring(0, truncateLength) + "..." : str;
}

export const formatDate = (isoDateString) => {
    return moment(isoDateString).format('DD.MM.YYYY HH:mm');
};

export const calculateTotalPrice = (narackaMenuItems) => {
    let totalPrice = 0;

    if (!narackaMenuItems) {
        return totalPrice;
    }

    for (const narackaMenu of narackaMenuItems) {
        totalPrice += narackaMenu?.quantity * narackaMenu.menuItem?.cena;
    }
    return totalPrice;
};