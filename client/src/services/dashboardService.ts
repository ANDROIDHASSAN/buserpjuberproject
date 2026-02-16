import axios from '../utils/axios';

export interface DashboardStats {
    totalStudents: {
        value: string;
        change: string;
    };
    activeRoutes: {
        value: number;
        change: string;
    };
    revenue: {
        value: string;
        change: string;
    };
    fuelExpense: {
        value: string;
        change: string;
    };
}

export interface Alert {
    id: string;
    title: string;
    type: 'warning' | 'error' | 'info';
    time: string;
}

export const dashboardService = {
    async getStats(): Promise<{ stats: DashboardStats }> {
        const response = await axios.get('/dashboard/stats');
        return response.data;
    },

    async getAlerts(): Promise<{ alerts: Alert[] }> {
        const response = await axios.get('/dashboard/alerts');
        return response.data;
    }
};
