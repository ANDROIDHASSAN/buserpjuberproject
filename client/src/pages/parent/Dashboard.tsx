
import { useAuth } from '../../context/AuthContext';
import { MapPin, Bus, User, Phone, LogOut } from 'lucide-react';

const ParentDashboard = () => {
    const { user, logout } = useAuth();

    // Mock Data
    const child = {
        name: "Aarav Sharma",
        class: "5-A",
        status: "On Board",
        busLocation: "Near Blue Ridge Circle",
        eta: "15 mins",
        lastUpdate: "Just now"
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm border-b border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Child</h1>
                        <p className="text-slate-500 text-sm">Welcome, {user?.name}</p>
                    </div>
                    <button onClick={logout} className="text-slate-400 hover:text-red-500">
                        <LogOut size={24} />
                    </button>
                </div>

                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-sm">
                            {child.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">{child.name}</h2>
                            <p className="text-white/80 text-sm">Class {child.class}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 relative z-10">
                        <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                            <Bus size={12} /> {child.status}
                        </div>
                        <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                            ETA: {child.eta}
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Tracking Map Placeholder */}
            <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="text-red-500" size={20} />
                    Live Location
                </h3>
                <div className="bg-slate-200 h-64 rounded-2xl w-full flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="text-slate-400 text-sm font-medium">Map Interface Loading...</div>

                    {/* Mock Bus Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 animate-bounce">
                        <Bus className="text-violet-600" size={24} />
                    </div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-slate-500 px-2">
                    <span>{child.busLocation}</span>
                    <span>Updated: {child.lastUpdate}</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 grid grid-cols-2 gap-4">
                <button className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                        <Phone size={20} />
                    </div>
                    <span className="font-medium text-slate-700 text-sm">Call Driver</span>
                </button>
                <button className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
                    <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                        <User size={20} />
                    </div>
                    <span className="font-medium text-slate-700 text-sm">Profile</span>
                </button>
            </div>
        </div>
    );
};

export default ParentDashboard;
