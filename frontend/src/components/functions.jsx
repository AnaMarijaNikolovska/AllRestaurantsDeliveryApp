import moment from "moment";

export const truncate = (str, truncateLength = 10, strLength = 15) => {
    return str.length > strLength ? str.substring(0, truncateLength) + "..." : str;
}

export const formatDate = (isoDateString) => {
    return moment(isoDateString).format('DD.MM.YYYY HH:mm');
};
