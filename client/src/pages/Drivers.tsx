
import { useState, useEffect } from 'react';
import { Plus, Trash2, Phone, CreditCard, User } from 'lucide-react';
import driverService from '../services/driverService';
import type { Driver } from '../types';
import { useAuth } from '../context/AuthContext';

const Drivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        licenseNumber: '',
        upiId: '',
    });
    const { user } = useAuth();

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        if (user?.token) {
            const data = await driverService.getDrivers(user.token);
            setDrivers(data);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?') && user?.token) {
            await driverService.deleteDriver(id, user.token);
            fetchDrivers();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.token) {
            await driverService.createDriver(formData, user.token);
            setIsModalOpen(false);
            setFormData({ name: '', phone: '', licenseNumber: '', upiId: '' });
            fetchDrivers();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Driver Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add Driver
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 p-3 rounded-full">
                                    <User className="text-slate-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-900">{driver.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${driver.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {driver.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(driver._id)}
                                className="text-red-400 hover:text-red-600 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                {driver.phone}
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard size={16} />
                                {driver.licenseNumber}
                            </div>
                            {driver.upiId && (
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <span className="font-medium">UPI:</span> {driver.upiId}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Register New Driver</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.licenseNumber}
                                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID (Optional)</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={formData.upiId}
                                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                />
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
                                    Save Driver
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drivers;
