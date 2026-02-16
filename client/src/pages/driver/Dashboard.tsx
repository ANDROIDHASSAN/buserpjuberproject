
import { useAuth } from '../../context/AuthContext';
import { Bus, CheckCircle, Navigation } from 'lucide-react';

const DriverDashboard = () => {
    const { user, logout } = useAuth();

    // Mock Data for MVP
    const todayTrip = {
        route: "R1 - North Zone",
        stops: [
            { name: "Sector 14 Main Gate", time: "07:30 AM", status: "completed" },
            { name: "Blue Ridge Circle", time: "07:45 AM", status: "current" },
            { name: "Hinjewadi Phase 1", time: "08:15 AM", status: "pending" },
        ],
        students: [
            { name: "Aarav Sharma", stop: "Blue Ridge Circle", status: "pending" },
            { name: "Vihaan Gupta", stop: "Blue Ridge Circle", status: "pending" },
        ]
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-20">
            {/* Header */}
            <div className="p-6 bg-slate-800 rounded-b-3xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold">Good Morning,</h1>
                        <p className="text-slate-400">{user?.name}</p>
                    </div>
                    <button onClick={logout} className="bg-slate-700 p-2 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                    </button>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl backdrop-blur-sm border border-slate-600">
                    <div className="flex items-center gap-3 mb-2">
                        <Bus className="text-sky-400" />
                        <span className="font-semibold">{todayTrip.route}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 py-2 rounded-lg font-medium text-sm transition-colors">
                            Start Trip
                        </button>
                        <button className="flex-1 bg-slate-600 hover:bg-slate-500 py-2 rounded-lg font-medium text-sm transition-colors">
                            View Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Current Stop */}
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-slate-300">Current Stop</h2>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 rounded-2xl shadow-xl transform scale-105 active:scale-100 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold">Blue Ridge Circle</h3>
                            <p className="text-sky-100">07:45 AM • 2 Students</p>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                            <Navigation className="text-white" size={24} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {todayTrip.students.map((student, idx) => (
                            <div key={idx} className="bg-white/10 p-3 rounded-xl flex justify-between items-center border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                                        {student.name.charAt(0)}
                                    </div>
                                    <span className="font-medium">{student.name}</span>
                                </div>
                                <button className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors">
                                    <CheckCircle size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="px-6">
                <h2 className="text-lg font-semibold mb-4 text-slate-300">Upcoming Stops</h2>
                <div className="space-y-6 border-l-2 border-slate-700 pl-6 ml-3 relative">
                    {todayTrip.stops.map((stop, index) => (
                        <div key={index} className="relative">
                            <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 ${stop.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                                stop.status === 'current' ? 'bg-sky-500 border-sky-500 animate-pulse' :
                                    'bg-slate-900 border-slate-600'
                                }`}></div>
                            <div>
                                <h4 className={`font-medium ${stop.status === 'current' ? 'text-sky-400' : 'text-slate-400'}`}>
                                    {stop.name}
                                </h4>
                                <p className="text-xs text-slate-500">{stop.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
