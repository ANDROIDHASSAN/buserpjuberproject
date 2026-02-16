
import axios from '../utils/axios';
import type { Driver } from '../types';

const API_URL = '/drivers/';

const getDrivers = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createDriver = async (driverData: Partial<Driver>, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, driverData, config);
    return response.data;
};

const deleteDriver = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const driverService = {
    getDrivers,
    createDriver,
    deleteDriver,
};

export default driverService;
