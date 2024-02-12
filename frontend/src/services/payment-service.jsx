import axios from "axios";

const paymentRoute = "/payments";

const PaymentType = {
    Cash: 'Cash',
    DebitCard: 'DebitCard',
    CreditCard: 'CreditCard',
}

const PublishableStripeKey = 'pk_test_51HCrb4D91Y2Imm1bXKM17hthwdzbY5W8r3e2bCXFQY0ifZHPnbptfL2hEHL1g4EoxBu3SRU2E5W0yVg8sewXHBsQ00fRpqLFzM';

const GetAllPayments = async () => {
    try {
        const response = await axios.get(paymentRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const GetPayment = async (id) => {
    try {
        const response = await axios.get(`${paymentRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const GetCustomerPayments = async (id) => {
    try {
        const response = await axios.get(`${paymentRoute}/customer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const CreatePayment = async (formData) => {
    try {
        const response = await axios.post(`${paymentRoute}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const UpdatePayment = async (id, formData) => {
    try {
        const response = await axios.post(`${paymentRoute}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const DeletePayment = async (id) => {
    try {
        const response = await axios.delete(`${paymentRoute}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error occured", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export {GetAllPayments, GetPayment, CreatePayment, UpdatePayment, DeletePayment, PaymentType, PublishableStripeKey, GetCustomerPayments}