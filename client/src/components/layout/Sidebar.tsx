
import { Home, Users, Bus, CreditCard, PieChart, Settings, LogOut, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/' },
        { name: 'Students', icon: Users, path: '/students' },
        { name: 'Drivers', icon: User, path: '/drivers' },
        { name: 'Routes', icon: Bus, path: '/routes' },
        { name: 'Fees', icon: CreditCard, path: '/fees' },
        { name: 'Reports', icon: PieChart, path: '/reports' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text">
                    BusERP
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-slate-800 text-sky-400 border-l-4 border-sky-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
