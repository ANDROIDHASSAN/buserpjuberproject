
import axios from '../utils/axios';
import type { Route } from '../types';

const API_URL = '/routes/';

const getRoutes = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createRoute = async (routeData: Partial<Route>, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, routeData, config);
    return response.data;
};

const deleteRoute = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const routeService = {
    getRoutes,
    createRoute,
    deleteRoute,
};

export default routeService;
