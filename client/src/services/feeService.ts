
import axios from '../utils/axios';
// import type { Payment } from '../types';

const API_URL = '/fees/';

const getAllPayments = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const recordPayment = async (paymentData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, paymentData, config);
    return response.data;
};

const feeService = {
    getAllPayments,
    recordPayment,
};

export default feeService;
