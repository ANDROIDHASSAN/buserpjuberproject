
import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { Download, Printer } from 'lucide-react';
import reportService from '../services/reportService';
import { useAuth } from '../context/AuthContext';

const Reports = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [collectionData, setCollectionData] = useState<any[]>([]);
    const [routeData, setRouteData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.token) {
                try {
                    const statsData = await reportService.getDashboardStats(user.token);
                    const colData = await reportService.getMonthlyCollection(user.token);
                    const rData = await reportService.getRouteDistribution(user.token);

                    setStats(statsData);
                    setCollectionData(colData);
                    setRouteData(rData);
                } catch (error) {
                    console.error("Failed to fetch reports", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Report Data...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
                    <p className="text-slate-500 text-sm">Financial and Operational Insights</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50">
                        <Printer size={18} /> Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">₹{stats?.totalRevenue?.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">Pending Collections</h3>
                    <p className="text-2xl font-bold text-amber-500 mt-2">{stats?.pendingFeesCount} Students</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">Active Students</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{stats?.totalStudents}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">Active Routes</h3>
                    <p className="text-2xl font-bold text-sky-600 mt-2">{stats?.totalRoutes}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Collection Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Fee Collection</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={collectionData || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Route Distribution Pie Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Students per Route</h3>
                    <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={routeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                >
                                    {routeData?.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
