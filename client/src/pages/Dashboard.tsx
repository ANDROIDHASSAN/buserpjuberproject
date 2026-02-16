
import { useEffect, useState } from 'react';
import {
    Users, Bus, CreditCard, TrendingUp, AlertTriangle,
    Calendar, MoreVertical, Search, Bell
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats, Alert } from '../services/dashboardService';

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [statsData, alertsData] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getAlerts()
                ]);
                setStats(statsData.stats);
                setAlerts(alertsData.alerts);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching dashboard data:', err);
                setError(err.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statsConfig = stats ? [
        {
            label: 'Total Students',
            value: stats.totalStudents.value,
            change: stats.totalStudents.change,
            icon: Users,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10'
        },
        {
            label: 'Active Routes',
            value: stats.activeRoutes.value.toString(),
            change: stats.activeRoutes.change,
            icon: Bus,
            color: 'text-sky-500',
            bg: 'bg-sky-500/10'
        },
        {
            label: 'Revenue (Feb)',
            value: stats.revenue.value,
            change: stats.revenue.change,
            icon: CreditCard,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        },
        {
            label: 'Fuel Expense',
            value: stats.fuelExpense.value,
            change: stats.fuelExpense.change,
            icon: TrendingUp,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10'
        },
    ] : [];

    if (loading) {
        return (
            <div className="p-2 space-y-6">
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                        <p className="text-slate-600">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-2 space-y-6">
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                        <p className="text-rose-600 font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm">Overview of your transport operations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                        <Search size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative">
                        <Bell size={20} />
                        {alerts.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                        A
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsConfig.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <button className="text-slate-300 hover:text-slate-500">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                                <span className={`text-xs font-medium mb-1 ${stat.change.includes('+') ? 'text-emerald-500' :
                                    stat.change.includes('-') ? 'text-rose-500' : 'text-sky-500'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic / Map Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Live Fleet Status</h2>
                        <button className="text-sky-500 text-sm font-medium hover:text-sky-600">View Map</button>
                    </div>
                    <div className="bg-slate-50 rounded-xl h-[300px] flex items-center justify-center border border-dashed border-slate-200">
                        <div className="text-center">
                            <Bus className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                            <span className="text-slate-400 font-medium">Map Integration Required</span>
                            <p className="text-slate-300 text-xs mt-1">Google Maps / OpenStreetMap API</p>
                        </div>
                    </div>
                </div>

                {/* Alerts / Activity */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recent Alerts</h2>
                        <button className="text-slate-400 hover:text-slate-600">
                            <Calendar size={18} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {alerts.length > 0 ? (
                            alerts.map((alert) => (
                                <div key={alert.id} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className={`p-2 rounded-full h-fit ${alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                        alert.type === 'error' ? 'bg-rose-100 text-rose-600' :
                                            'bg-sky-100 text-sky-600'
                                        }`}>
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800 text-sm line-clamp-1">{alert.title}</h4>
                                        <span className="text-xs text-slate-400">{alert.time}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-400">No alerts at the moment</p>
                            </div>
                        )}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-slate-500 font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        View All Notifications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
