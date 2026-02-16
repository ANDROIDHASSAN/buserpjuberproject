
import axios from '../utils/axios';

const API_URL = '/reports/';

const getDashboardStats = async (token: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'stats', config);
    return response.data;
};

const getMonthlyCollection = async (token: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'collection', config);
    return response.data;
};

const getRouteDistribution = async (token: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'routes', config);
    return response.data;
};

const reportService = {
    getDashboardStats,
    getMonthlyCollection,
    getRouteDistribution
};

export default reportService;
