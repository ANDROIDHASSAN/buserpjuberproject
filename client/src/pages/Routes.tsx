
import { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin } from 'lucide-react';
import routeService from '../services/routeService';
import driverService from '../services/driverService';
import type { Route, Driver } from '../types';
import { useAuth } from '../context/AuthContext';

const RoutesPage = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        startPoint: '',
        endPoint: '',
        capacity: 40,
        driver: '',
    });
    const { user } = useAuth();

    useEffect(() => {
        fetchRoutes();
        fetchDrivers();
    }, []);

    const fetchRoutes = async () => {
        if (user?.token) {
            const data = await routeService.getRoutes(user.token);
            setRoutes(data);
        }
    };

    const fetchDrivers = async () => {
        if (user?.token) {
            const data = await driverService.getDrivers(user.token);
            setDrivers(data);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?') && user?.token) {
            await routeService.deleteRoute(id, user.token);
            fetchRoutes();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.token) {
            await routeService.createRoute({
                ...formData,
                stops: [], // Initialize with empty stops for MVP
            }, user.token);
            setIsModalOpen(false);
            setFormData({ name: '', startPoint: '', endPoint: '', capacity: 40, driver: '' });
            fetchRoutes();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Route Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Create Route
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                    <div key={route._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900">{route.name}</h3>
                                <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
                                    <MapPin size={12} />
                                    {route.startPoint} ➝ {route.endPoint}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(route._id)}
                                className="text-red-400 hover:text-red-600 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-slate-50 mt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Capacity</span>
                                <span className="font-medium">{route.capacity} Seats</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Driver</span>
                                <span className="font-medium text-sky-600">
                                    {typeof route.driver === 'object' && route.driver ? route.driver.name : 'Unassigned'}
                                </span>
                            </div>
                            <div className="mt-3">
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>0/{route.capacity} Students</span>
                                    <span>0% Full</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create New Route</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
                                <input
                                    required
                                    placeholder="e.g. R1 - North Zone"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Point</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                        value={formData.startPoint}
                                        onChange={(e) => setFormData({ ...formData, startPoint: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">End Point</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                        value={formData.endPoint}
                                        onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Capacity</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Driver</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.driver}
                                    onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                                >
                                    <option value="">Select a driver</option>
                                    {drivers.map(d => (
                                        <option key={d._id} value={d._id}>{d.name} ({d.status})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Create Route
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoutesPage;
